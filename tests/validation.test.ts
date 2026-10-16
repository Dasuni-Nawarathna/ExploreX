import test from "node:test";
import assert from "node:assert/strict";
import { 
  loginSchema, 
  registerSchema, 
  totpVerifySchema, 
  enquiryStatusSchema, 
  packageSchema,
  hotelSchema,
  vehicleSchema 
} from "../src/lib/validation/index.ts";

test("Validation - Login schema verifies email & password length", () => {
  // Valid
  const valid = loginSchema.safeParse({ email: "admin@explorex.lk", password: "SecretPassword123" });
  assert.equal(valid.success, true);

  // Invalid email
  const badEmail = loginSchema.safeParse({ email: "invalid-email", password: "SecretPassword123" });
  assert.equal(badEmail.success, false);

  // Short password (<8 chars)
  const shortPass = loginSchema.safeParse({ email: "admin@explorex.lk", password: "short" });
  assert.equal(shortPass.success, false);
});

test("Validation - Registration password complexity enforcement", () => {
  // Missing uppercase
  const noUpper = registerSchema.safeParse({
    name: "Traveler",
    email: "user@test.com",
    password: "password123",
  });
  assert.equal(noUpper.success, false);

  // Missing number
  const noNumber = registerSchema.safeParse({
    name: "Traveler",
    email: "user@test.com",
    password: "PasswordWithoutNumber",
  });
  assert.equal(noNumber.success, false);

  // Strong password
  const strong = registerSchema.safeParse({
    name: "Kasun Perera",
    email: "kasun@explorex.lk",
    password: "CeylonExplore2026!",
  });
  assert.equal(strong.success, true);
});

test("Validation - TOTP code format must be exactly 6 digits", () => {
  assert.equal(totpVerifySchema.safeParse({ code: "123456" }).success, true);
  assert.equal(totpVerifySchema.safeParse({ code: "12345" }).success, false);
  assert.equal(totpVerifySchema.safeParse({ code: "1234567" }).success, false);
  assert.equal(totpVerifySchema.safeParse({ code: "12345a" }).success, false);
});

test("Validation - Enquiry status transition validation", () => {
  assert.equal(enquiryStatusSchema.safeParse({ status: "NEW" }).success, true);
  assert.equal(enquiryStatusSchema.safeParse({ status: "CONTACTED", adminNotes: "Called guest" }).success, true);
  assert.equal(enquiryStatusSchema.safeParse({ status: "CONFIRMED" }).success, true);
  assert.equal(enquiryStatusSchema.safeParse({ status: "CANCELLED" }).success, true);
  // Invalid status
  assert.equal(enquiryStatusSchema.safeParse({ status: "UNKNOWN_STATUS" }).success, false);
});

test("Validation - Tour Package schema requires itinerary and valid price", () => {
  const validPackage = {
    name: "7-Day Cultural Triangle & Hill Country Classic",
    refCode: "PKG-001",
    tagline: "Ancient Citadels & Tea Hills",
    durationDays: 7,
    startingPriceUSD: 890,
    difficulty: "Easy",
    tags: ["Culture", "UNESCO"],
    heroImage: "https://images.unsplash.com/photo-1588598198321-9735fd52455b",
    overview: "Comprehensive cultural tour through the historic heartland of Sri Lanka.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Colombo",
        destination: "Colombo",
        description: "Airport meet and greet and transfer to hotel.",
        activities: ["Airport Pickup", "Welcome Dinner"],
        meals: "Dinner Included",
        overnight: "Jetwing Colombo",
      },
    ],
  };

  assert.equal(packageSchema.safeParse(validPackage).success, true);

  // Empty itinerary should fail
  const noItinerary = { ...validPackage, itinerary: [] };
  assert.equal(packageSchema.safeParse(noItinerary).success, false);

  // Negative price should fail
  const negativePrice = { ...validPackage, startingPriceUSD: -100 };
  assert.equal(packageSchema.safeParse(negativePrice).success, false);
});

test("Validation - Hotel and Vehicle schemas", () => {
  const validHotel = {
    name: "Jetwing Vil Uyana",
    refCode: "HTL-001",
    destinationId: "dest-sigiriya",
    destinationName: "Sigiriya",
    type: "Boutique Villa",
    starRating: 5,
    pricePerNightUSD: 240,
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    description: "Eco-luxury chalets set amongst paddy fields and water gardens.",
    address: "Sigiriya, Sri Lanka",
  };
  assert.equal(hotelSchema.safeParse(validHotel).success, true);

  const validVehicle = {
    name: "Luxury Van",
    model: "Toyota KDH HiAce",
    category: "Van",
    passengerCapacity: 6,
    luggageCapacity: 5,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341",
    description: "Spacious luxury air-conditioned touring van.",
    pricePerDayUSD: 85,
    pricePerKmUSD: 0.45,
  };
  assert.equal(vehicleSchema.safeParse(validVehicle).success, true);
});
