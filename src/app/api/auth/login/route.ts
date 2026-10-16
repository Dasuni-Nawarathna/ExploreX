import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { setSessionCookie } from "@/lib/auth/session";
import { verifyTOTPToken } from "@/lib/auth/totp";
import { checkRateLimit } from "@/lib/rate-limit";
import { loginSchema } from "@/lib/validation";

export async function POST(request: Request) {
  // 1. Rate Limiting by IP (max 6 login attempts per minute)
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const rateCheck = checkRateLimit(`login:${ip}`, 6, 60 * 1000);
  if (!rateCheck.success) {
    return NextResponse.json(
      { error: "Too many login attempts. Please wait 60 seconds before retrying." },
      { status: 429 }
    );
  }

  try {
    const json = await request.json();
    const result = loginSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form input", details: result.error.format() },
        { status: 400 }
      );
    }

    const { email, password, totpCode } = result.data;
    const user = await db.users.findByEmail(email);

    if (!user) {
      // Intentionally generic response to prevent user enumeration
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 2. Account Lockout Check
    if (user.lockoutUntil && new Date(user.lockoutUntil) > new Date()) {
      const waitMin = Math.ceil((new Date(user.lockoutUntil).getTime() - Date.now()) / 60000);
      return NextResponse.json(
        { error: `Account temporarily locked due to failed attempts. Try again in ${waitMin} minutes.` },
        { status: 423 }
      );
    }

    // 3. Password Verification
    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      const attempts = (user.failedLoginAttempts || 0) + 1;
      const updates: any = { failedLoginAttempts: attempts };
      if (attempts >= 5) {
        updates.lockoutUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 min lockout
        await db.auditLogs.create({
          userId: user.id,
          userEmail: user.email,
          action: "LOCKOUT",
          resource: "user",
          resourceId: user.id,
          details: `Account locked after ${attempts} consecutive failed login attempts`,
          ipAddress: ip,
        });
      }
      await db.users.update(user.id, updates);
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Reset failed login count on success
    await db.users.update(user.id, { failedLoginAttempts: 0, lockoutUntil: null });

    // 4. Two-Factor Authentication Check (if enabled on user)
    if (user.isTwoFactorEnabled && user.twoFactorSecret) {
      if (!totpCode) {
        return NextResponse.json({
          requires2FA: true,
          message: "Please enter your 6-digit TOTP code from Google Authenticator",
        });
      }

      const is2FAValid = verifyTOTPToken(totpCode, user.twoFactorSecret);
      if (!is2FAValid) {
        return NextResponse.json({ error: "Invalid 2FA authentication code" }, { status: 401 });
      }
    }

    // 5. Establish Secure HTTP-Only Cookie Session
    await setSessionCookie({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      is2FAVerified: Boolean(user.isTwoFactorEnabled),
    });

    // 6. Security Audit Log
    await db.auditLogs.create({
      userId: user.id,
      userEmail: user.email,
      action: "LOGIN",
      resource: "auth",
      resourceId: user.id,
      details: `Successful login as ${user.role}`,
      ipAddress: ip,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone || null,
        isPhoneVerified: user.isPhoneVerified || false,
      },
    });
  } catch (err) {
    console.error("Login route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

