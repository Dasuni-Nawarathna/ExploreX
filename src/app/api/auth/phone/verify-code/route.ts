import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { phoneCodeVerifySchema } from "@/lib/validation";
import { getSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const rate = checkRateLimit(`phone_code_verify:${ip}`, 10, 10 * 60 * 1000);
  if (!rate.success) {
    return NextResponse.json(
      { error: "Too many verification attempts. Please wait." },
      { status: 429 }
    );
  }

  try {
    const json = await request.json();
    const result = phoneCodeVerifySchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json(
        { error: "Please enter the 6-digit verification code." },
        { status: 400 }
      );
    }

    const rawPhone = result.data.phone.trim();
    const cleanPhone = (rawPhone.startsWith("+") ? "+" : "+") + rawPhone.replace(/\D/g, "");
    const code = result.data.code.trim();

    // Verify in db store
    const verification = await db.phoneVerifications.verifyCode(cleanPhone, code);
    if (!verification.valid) {
      return NextResponse.json(
        { error: verification.error || "Invalid verification code." },
        { status: 400 }
      );
    }

    // If user is currently logged in, link verified phone to their account
    const session = await getSession();
    if (session) {
      await db.users.update(session.userId, {
        phone: cleanPhone,
        isPhoneVerified: true,
        phoneVerifiedAt: new Date().toISOString(),
      });

      await db.auditLogs.create({
        userId: session.userId,
        userEmail: session.email,
        action: "VERIFY_PHONE",
        resource: "user",
        resourceId: session.userId,
        details: `Successfully verified WhatsApp number ${cleanPhone}`,
        ipAddress: ip,
      });
    }

    return NextResponse.json({
      success: true,
      message: "WhatsApp number verified successfully!",
      phone: cleanPhone,
      isPhoneVerified: true,
    });
  } catch (err) {
    console.error("Phone verify-code error:", err);
    return NextResponse.json(
      { error: "Internal error during phone verification." },
      { status: 500 }
    );
  }
}

