import { z } from "zod";

// --- AUTH SCHEMAS ---
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  totpCode: z.string().optional(),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  phone: z
    .string()
    .regex(/^\+[1-9][0-9\s\-()]{6,19}$/, "Please enter a valid international phone number starting with + (e.g. +94...)")
    .optional()
    .or(z.literal("")),
});

export const phoneVerificationSchema = z.object({
  phone: z
    .string()
    .min(8, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(/^\+[1-9][0-9\s\-()]{6,19}$/, "Please enter a valid international phone number starting with + (e.g. +94...)"),
});

export const phoneCodeVerifySchema = z.object({
  phone: z
    .string()
    .min(8)
    .max(20)
    .regex(/^\+[1-9][0-9\s\-()]{6,19}$/, "Invalid phone format"),
  code: z.string().regex(/^\d{6}$/, "Verification code must be exactly 6 digits"),
});

export const totpVerifySchema = z.object({
  code: z.string().regex(/^\d{6}$/, "TOTP code must be exactly 6 digits"),
});

// --- DESTINATION SCHEMA ---
export const destinationSchema = z.object({
  name: z.string().min(2).max(100),
  subtitle: z.string().min(3).max(150),
  region: z.string(),
  category: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  bestSeason: z.string().min(3),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  heroImage: z.string().url("Hero image must be a valid URL"),
  gallery: z.array(z.string()).default([]),
  tag: z.string().default("Featured Destination"),
  summary: z.string().min(10),
  fullDescription: z.string().min(20),
  highlights: z.array(z.string()).default([]),
  bestTimeToVisit: z.string().default("All year round"),
  weatherTips: z.string().default("Tropical climate, light cotton recommended"),
  nearbyAttractions: z.array(z.string()).default([]),
  relatedPackageIds: z.array(z.string()).default([]),
  relatedHotelIds: z.array(z.string()).default([]),
  published: z.boolean().default(true),
});

// --- HOTEL SCHEMA ---
export const hotelSchema = z.object({
  name: z.string().min(2).max(100),
  refCode: z.string().min(3),
  destinationId: z.string(),
  destinationName: z.string(),
  type: z.string(),
  starRating: z.number().min(1).max(5),
  pricePerNightUSD: z.number().positive(),
  priceRange: z.enum(["$", "$$", "$$$", "$$$$"]).default("$$$"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
  heroImage: z.string().url(),
  gallery: z.array(z.string()).default([]),
  amenities: z.array(z.string()).default([]),
  description: z.string().min(10),
  address: z.string().min(3),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  roomTypes: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
        priceUSD: z.number(),
      })
    )
    .default([]),
});

// --- PACKAGE SCHEMA ---
export const packageDaySchema = z.object({
  day: z.number().int().min(1).optional(),
  dayNumber: z.number().int().min(1).optional(),
  title: z.string().min(2),
  destination: z.string().min(2),
  description: z.string().min(5),
  activities: z.array(z.string()).default([]),
  meals: z.string().default("Breakfast Included"),
  overnight: z.string().optional(),
  overnightStay: z.string().optional(),
});

export const packageSchema = z.object({
  name: z.string().min(3).max(120),
  refCode: z.string().min(3),
  tagline: z.string().min(3),
  durationDays: z.number().int().positive(),
  durationNights: z.number().int().nonnegative().optional(),
  durationText: z.string().optional(),
  startingPriceUSD: z.number().positive(),
  difficulty: z.enum(["Easy", "Moderate", "Active"]).default("Easy"),
  groupSize: z.string().default("Private Tour"),
  tags: z.array(z.string()).min(1),
  heroImage: z.string().url(),
  gallery: z.array(z.string()).default([]),
  overview: z.string().min(10),
  route: z
    .array(
      z.object({
        name: z.string(),
        lat: z.number(),
        lng: z.number(),
      })
    )
    .optional(),
  routeJson: z.string().optional(),
  inclusions: z.array(z.string()).default([]),
  exclusions: z.array(z.string()).default([]),
  hotelsIncluded: z
    .array(
      z.object({
        tier: z.string(),
        description: z.string(),
      })
    )
    .default([]),
  recommendedVehicles: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  itinerary: z.array(packageDaySchema).min(1, "At least one day itinerary is required"),
});

// --- VEHICLE SCHEMA ---
export const vehicleSchema = z.object({
  name: z.string().min(2),
  model: z.string().min(2),
  category: z.enum(["Car", "Van", "Mini-coach", "Tuk-tuk", "SUV / Jeep"]),
  passengerCapacity: z.number().int().positive(),
  luggageCapacity: z.number().int().nonnegative(),
  airConditioned: z.boolean().default(true),
  image: z.string().url(),
  description: z.string().min(5),
  features: z.array(z.string()).default([]),
  pricePerDayUSD: z.number().positive(),
  pricePerKmUSD: z.number().positive(),
  guideOptionSurchargeUSD: z.number().nonnegative().default(35),
  idealFor: z.string().default("Private Travelers"),
  available: z.boolean().default(true),
});

// --- ENQUIRY SCHEMA ---
export const enquiryStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "CONFIRMED", "CANCELLED", "new", "contacted", "confirmed", "cancelled"]),
  adminNotes: z.string().optional(),
});

// --- REVIEW SCHEMA ---
export const reviewSchema = z.object({
  targetType: z.enum(["package", "hotel", "general"]).default("general"),
  targetId: z.string().optional(),
  customerName: z.string().min(2).max(50),
  customerLocation: z.string().optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5).max(500),
});
