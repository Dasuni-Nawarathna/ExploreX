import test from "node:test";
import assert from "node:assert/strict";
import { phoneVerificationSchema, phoneCodeVerifySchema, registerSchema, loginSchema } from "../src/lib/validation/index.ts";

test("Phone Validation - International E.164 phone format validation", () => {
  // Valid international numbers
  const validSriLanka = phoneVerificationSchema.safeParse({ phone: "+94771234567" });
  assert.ok(validSriLanka.success, "Should accept valid Sri Lankan international number");

  const validUK = phoneVerificationSchema.safeParse({ phone: "+447911123456" });
  assert.ok(validUK.success, "Should accept valid UK international number");

  const validUS = phoneVerificationSchema.safeParse({ phone: "+14155552671" });
  assert.ok(validUS.success, "Should accept valid US international number");

  // Invalid numbers
  const missingPlus = phoneVerificationSchema.safeParse({ phone: "0771234567" });
  assert.strictEqual(missingPlus.success, false, "Should reject numbers without + country code prefix");

  const tooShort = phoneVerificationSchema.safeParse({ phone: "+123" });
  assert.strictEqual(tooShort.success, false, "Should reject too short phone numbers");

  const lettersInPhone = phoneVerificationSchema.safeParse({ phone: "+9477abc4567" });
  assert.strictEqual(lettersInPhone.success, false, "Should reject phone numbers with alphabetic characters");
});

test("Phone Code Verification Schema - Exactly 6 digits", () => {
  const validCode = phoneCodeVerifySchema.safeParse({ phone: "+94771234567", code: "123456" });
  assert.ok(validCode.success, "Should accept exactly 6 digit code");

  const shortCode = phoneCodeVerifySchema.safeParse({ phone: "+94771234567", code: "12345" });
  assert.strictEqual(shortCode.success, false, "Should reject 5-digit code");

  const longCode = phoneCodeVerifySchema.safeParse({ phone: "+94771234567", code: "1234567" });
  assert.strictEqual(longCode.success, false, "Should reject 7-digit code");

  const alphaCode = phoneCodeVerifySchema.safeParse({ phone: "+94771234567", code: "12AB56" });
  assert.strictEqual(alphaCode.success, false, "Should reject non-numeric characters");
});

test("Phone Verification Expiry & Attempts Logic", () => {
  // Unit test for OTP verification logic
  interface VerificationRecord {
    phone: string;
    code: string;
    expiresAt: string;
    attempts: number;
  }

  function verifyOtp(record: VerificationRecord, inputCode: string, now: Date) {
    if (now > new Date(record.expiresAt)) {
      return { valid: false, error: "Verification code has expired" };
    }
    if (record.attempts >= 5) {
      return { valid: false, error: "Too many incorrect attempts" };
    }
    if (record.code !== inputCode) {
      record.attempts += 1;
      return { valid: false, error: "Invalid code" };
    }
    return { valid: true };
  }

  const record: VerificationRecord = {
    phone: "+94771234567",
    code: "654321",
    expiresAt: new Date(Date.now() + 600000).toISOString(),
    attempts: 0
  };

  // Test 1: Wrong code increments attempt count
  const failRes = verifyOtp(record, "000000", new Date());
  assert.strictEqual(failRes.valid, false);
  assert.strictEqual(record.attempts, 1);

  // Test 2: Correct code validates successfully
  const successRes = verifyOtp(record, "654321", new Date());
  assert.strictEqual(successRes.valid, true);

  // Test 3: Expired code fails
  const expiredRes = verifyOtp(record, "654321", new Date(Date.now() + 700000));
  assert.strictEqual(expiredRes.valid, false);
  assert.strictEqual(expiredRes.error, "Verification code has expired");
});

test("Registration Schema - Phone number field is optional but validated", () => {
  const withPhone = registerSchema.safeParse({
    name: "Kasun Perera",
    email: "kasun@example.com",
    password: "Password123!",
    phone: "+94779876543"
  });
  assert.ok(withPhone.success, "Should accept valid phone in registration");

  const withInvalidPhone = registerSchema.safeParse({
    name: "Kasun Perera",
    email: "kasun@example.com",
    password: "Password123!",
    phone: "not-a-phone"
  });
  assert.strictEqual(withInvalidPhone.success, false, "Should reject invalid phone during registration");

  const withoutPhone = registerSchema.safeParse({
    name: "Kasun Perera",
    email: "kasun@example.com",
    password: "Password123!"
  });
  assert.ok(withoutPhone.success, "Phone should be optional during account registration");
});
