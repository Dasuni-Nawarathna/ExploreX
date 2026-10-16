import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { setSessionCookie } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/rate-limit";
import { registerSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const rate = checkRateLimit(`register:${ip}`, 4, 60 * 1000);
  if (!rate.success) {
    return NextResponse.json({ error: "Too many registration attempts. Please wait." }, { status: 429 });
  }

  try {
    const json = await request.json();
    const result = registerSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 });
    }

    const { name, email, password, phone } = result.data;
    const existing = await db.users.findByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const newUser = await db.users.create({
      name,
      email,
      passwordHash,
      role: "CUSTOMER",
      phone: phone || null,
      isPhoneVerified: false,
      emailVerified: true, // auto-verified for demonstration
    });

    // Auto-login customer
    await setSessionCookie({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    await db.auditLogs.create({
      userId: newUser.id,
      userEmail: newUser.email,
      action: "REGISTER",
      resource: "user",
      resourceId: newUser.id,
      details: "Customer registered new account",
      ipAddress: ip,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        phone: newUser.phone,
        isPhoneVerified: newUser.isPhoneVerified,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ error: "Failed to register account" }, { status: 500 });
  }
}

