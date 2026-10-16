import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { phoneVerificationSchema } from "@/lib/validation";
import { getSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const rate = checkRateLimit(`phone_code_send:${ip}`, 6, 10 * 60 * 1000);
  if (!rate.success) {
    return NextResponse.json(
      { error: "Too many verification attempts. Please wait 10 minutes." },
      { status: 429 }
    );
  }

  try {
    const json = await request.json();
    const result = phoneVerificationSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json(
        { error: "Please enter a valid international phone number (e.g. +94 77 123 4567 or +44 7911 123456)." },
        { status: 400 }
      );
    }

    // Clean phone number: keep leading + and digits only
    const rawPhone = result.data.phone.trim();
    const cleanPhone = (rawPhone.startsWith("+") ? "+" : "+") + rawPhone.replace(/\D/g, "");

    if (cleanPhone.length < 9 || cleanPhone.length > 16) {
      return NextResponse.json(
        { error: "Invalid phone number length. Include your country code." },
        { status: 400 }
      );
    }

    // Generate secure 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Save in database repository with 10-minute expiry
    await db.phoneVerifications.saveCode(cleanPhone, code);

    const session = await getSession();
    if (session) {
      await db.auditLogs.create({
        userId: session.userId,
        userEmail: session.email,
        action: "REQUEST_PHONE_VERIFICATION",
        resource: "auth",
        resourceId: session.userId,
        details: `Requested WhatsApp verification code for ${cleanPhone}`,
        ipAddress: ip,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Verification code sent to WhatsApp ${cleanPhone}.`,
      phone: cleanPhone,
      demoCode: code, // Provided for sandbox/live demonstration
      expiresInMinutes: 10,
    });
  } catch (err) {
    console.error("Phone send-code error:", err);
    return NextResponse.json(
      { error: "Failed to dispatch verification code." },
      { status: 500 }
    );
  }
}

