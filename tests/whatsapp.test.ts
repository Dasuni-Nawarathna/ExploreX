import test from "node:test";
import assert from "node:assert/strict";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "../src/lib/whatsapp.ts";

test("WhatsApp Message Builder - Tour Package", () => {
  const message = buildWhatsAppMessage({
    itemType: "package",
    itemName: "7-Day Cultural Triangle & Hill Country Classic",
    refCode: "PKG-001",
    travelDate: "2026-12-15",
    travelersCount: 4,
    vehicleType: "High-Roof Luxury Van (Toyota KDH)",
    guideOption: "With Licensed English-Speaking Guide",
    notes: "Request vegetarian meals for 2 pax",
    priceFormatted: "$890",
  });

  assert.ok(message.includes("7-Day Cultural Triangle"), "Should contain package name");
  assert.ok(message.includes("PKG-001"), "Should contain refCode");
  assert.ok(message.includes("4 guest(s)"), "Should contain traveler count");
  assert.ok(message.includes("2026-12-15"), "Should contain preferred travel date");
  assert.ok(message.includes("Toyota KDH"), "Should contain vehicle type");
  assert.ok(message.includes("Request vegetarian meals"), "Should include user notes");
});

test("WhatsApp Message Builder - Hotel Reservation", () => {
  const message = buildWhatsAppMessage({
    itemType: "hotel",
    itemName: "Jetwing Vil Uyana",
    refCode: "HTL-001",
    travelDate: "2026-11-20",
    checkOutDate: "2026-11-24",
    travelersCount: 2,
    roomsCount: 1,
    notes: "Paddy field villa preferred",
  });

  assert.ok(message.includes("Jetwing Vil Uyana"), "Should contain hotel name");
  assert.ok(message.includes("from 2026-11-20 to 2026-11-24"), "Should contain stay dates");
  assert.ok(message.includes("1 room(s)"), "Should contain room count");
  assert.ok(message.includes("HTL-001"), "Should contain hotel reference code");
});

test("WhatsApp Message Builder - Custom Trip", () => {
  const message = buildWhatsAppMessage({
    itemType: "custom_trip",
    itemName: "Custom Sri Lanka Route",
    travelersCount: 3,
    customDetails: {
      destinations: ["Sigiriya", "Kandy", "Nuwara Eliya", "Galle"],
      days: 8,
      tier: "Superior 4★",
      estimatedPriceUSD: 1250,
    },
    vehicleType: "Toyota HiAce Van",
    guideOption: "Chauffeur Only",
  });

  assert.ok(message.includes("Sigiriya, Kandy, Nuwara Eliya, Galle"), "Should list destinations");
  assert.ok(message.includes("8 Days"), "Should contain duration");
  assert.ok(message.includes("Superior 4★"), "Should contain hotel tier");
});

test("WhatsApp URL Builder - wa.me schema and character encoding", () => {
  const agencyPhone = "+94 77 123 4567";
  const rawText = "Hello ExploreX! I'm interested in *PKG-001* & Sigiriya.";
  const url = buildWhatsAppUrl(agencyPhone, rawText);

  assert.ok(url.startsWith("https://wa.me/94771234567?text="), "Should sanitize phone number without + or spaces");
  assert.ok(!url.includes(" "), "URL must not contain raw spaces");
  assert.ok(url.includes(encodeURIComponent("Hello ExploreX!")), "Text should be properly URL encoded");
});
