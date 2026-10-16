import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { 
  generateTOTPSecret, 
  generateQRCodeDataUrl, 
  verifyTOTPToken, 
  generateRecoveryCodes 
} from "@/lib/auth/totp";
import { totpVerifySchema } from "@/lib/validation";

// GET: Start 2FA setup (returns secret, otpauth URI, and QR code Data URL)
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { secret, uri } = generateTOTPSecret(session.email);
  const qrCodeDataUrl = await generateQRCodeDataUrl(uri);
  const recoveryCodes = generateRecoveryCodes();

  return NextResponse.json({
    secret,
    qrCodeDataUrl,
    recoveryCodes,
  });
}

// POST: Verify code and activate 2FA
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await request.json();
    const result = totpVerifySchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid 6-digit verification code" }, { status: 400 });
    }

    const { code } = result.data;
    const { secret, recoveryCodes } = json;

    if (!secret) {
      return NextResponse.json({ error: "Secret is required to enable 2FA" }, { status: 400 });
    }

    const isValid = verifyTOTPToken(code, secret);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid code. Please ensure your clock is synced." }, { status: 400 });
    }

    // Persist 2FA in user profile
    await db.users.update(session.userId, {
      isTwoFactorEnabled: true,
      twoFactorSecret: secret,
      recoveryCodesJson: JSON.stringify(recoveryCodes || []),
    });

    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      resource: "security",
      details: "Two-Factor Authentication (TOTP) successfully enabled",
    });

    return NextResponse.json({ success: true, message: "Two-Factor Authentication is now enabled!" });
  } catch (err) {
    console.error("2FA activation error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

