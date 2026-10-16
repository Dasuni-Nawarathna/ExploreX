import * as OTPAuth from "otpauth";
import QRCode from "qrcode";
import crypto from "crypto";

const ISSUER = "ExploreX Travel Agency";

/**
 * Creates a new TOTP key for a given user email.
 */
export function generateTOTPSecret(email: string) {
  const totp = new OTPAuth.TOTP({
    issuer: ISSUER,
    label: email,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: new OTPAuth.Secret({ size: 20 }),
  });

  return {
    secret: totp.secret.base32,
    uri: totp.toString(),
  };
}

/**
 * Generates QR Code data URL for scanning in Google Authenticator or Authy.
 */
export async function generateQRCodeDataUrl(otpauthUri: string): Promise<string> {
  return QRCode.toDataURL(otpauthUri, {
    width: 240,
    margin: 2,
    color: {
      dark: "#1E3E3A",
      light: "#FFFFFF",
    },
  });
}

/**
 * Validates a user-supplied 6-digit TOTP token against their secret.
 */
export function verifyTOTPToken(token: string, secretBase32: string): boolean {
  try {
    const totp = new OTPAuth.TOTP({
      issuer: ISSUER,
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(secretBase32),
    });

    // delta returns null if invalid, or an integer representing window offset
    const delta = totp.validate({ token, window: 1 });
    return delta !== null;
  } catch {
    return false;
  }
}

/**
 * Generates 8 random single-use recovery backup codes.
 */
export function generateRecoveryCodes(): string[] {
  const codes: string[] = [];
  for (let i = 0; i < 8; i++) {
    const code = crypto.randomBytes(4).toString("hex").toUpperCase();
    codes.push(`${code.slice(0, 4)}-${code.slice(4)}`);
  }
  return codes;
}

