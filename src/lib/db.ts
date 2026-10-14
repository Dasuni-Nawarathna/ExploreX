import fs from "fs";
import path from "path";
import { 
  destinationsData as initialDestinations 
} from "@/data/destinations";
import { hotelsData as initialHotels } from "@/data/hotels";
import { packagesData as initialPackages } from "@/data/packages";
import { vehiclesData as initialVehicles } from "@/data/vehicles";
import { blogsData as initialBlogs } from "@/data/blogs";
import { defaultSettings } from "@/data/settings";
import { 
  seedUsers, 
  seedAuditLogs, 
  seedReviews 
} from "@/data/seed-data";
import { 
  Destination, 
  Hotel, 
  TourPackage, 
  Vehicle, 
  SiteSettings, 
  StoredEnquiry 
} from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");

function readJsonFile<T>(filename: string, fallback: T): T {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const filepath = path.join(DATA_DIR, filename);
    if (fs.existsSync(filepath)) {
      const data = fs.readFileSync(filepath, "utf-8");
      return JSON.parse(data);
    }
    // initialize file with fallback
    fs.writeFileSync(filepath, JSON.stringify(fallback, null, 2), "utf-8");
    return fallback;
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return fallback;
  }
}

function writeJsonFile<T>(filename: string, data: T) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const filepath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
  }
}

// In-Memory & File-Backed Persistent Database Repository
export const db = {
  users: {
    findMany: async () => readJsonFile("users.json", seedUsers),
    findByEmail: async (email: string) => {
      const users = await db.users.findMany();
      return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
    },
    findById: async (id: string) => {
      const users = await db.users.findMany();
      return users.find((u) => u.id === id) || null;
    },
    create: async (user: any) => {
      const users = await db.users.findMany();
      const newUser = {
        id: `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        createdAt: new Date().toISOString(),
        emailVerified: false,
        isTwoFactorEnabled: false,
        twoFactorSecret: null,
        failedLoginAttempts: 0,
        lockoutUntil: null,
        ...user,
      };
      users.push(newUser);
      writeJsonFile("users.json", users);
      return newUser;
    },
    update: async (id: string, updates: any) => {
      const users = await db.users.findMany();
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) return null;
      users[index] = { ...users[index], ...updates };
      writeJsonFile("users.json", users);
      return users[index];
    },
    delete: async (id: string) => {
      const users = await db.users.findMany();
      const filtered = users.filter((u) => u.id !== id);
      writeJsonFile("users.json", filtered);
      return true;
    }
  },

  destinations: {
    findMany: async () => readJsonFile("destinations.json", initialDestinations),
    findBySlug: async (slug: string) => {
      const list = await db.destinations.findMany();
      return list.find((d) => d.slug === slug) || null;
    },
    create: async (dest: Partial<Destination>) => {
      const list = await db.destinations.findMany();
      const slug = dest.name?.toLowerCase().replace(/\s+/g, "-") || `dest-${Date.now()}`;
      const newDest: Destination = {
        id: `dest-${Date.now()}`,
        slug,
        name: dest.name || "New Destination",
        subtitle: dest.subtitle || "",
        region: dest.region || "Cultural Triangle",
        category: dest.category || ["Culture"],
        bestSeason: dest.bestSeason || "Nov - Apr",
        coordinates: dest.coordinates || { lat: 7.8731, lng: 80.7718 },
        heroImage: dest.heroImage || "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80",
        gallery: dest.gallery || [],
        tag: dest.tag || "Featured Destination",
        summary: dest.summary || "",
        fullDescription: dest.fullDescription || "",
        highlights: dest.highlights || [],
        bestTimeToVisit: dest.bestTimeToVisit || "",
        weatherTips: dest.weatherTips || "",
        nearbyAttractions: dest.nearbyAttractions || [],
        relatedPackageIds: dest.relatedPackageIds || [],
        relatedHotelIds: dest.relatedHotelIds || [],
      };
      list.unshift(newDest);
      writeJsonFile("destinations.json", list);
      return newDest;
    },
    update: async (id: string, updates: Partial<Destination>) => {
      const list = await db.destinations.findMany();
      const idx = list.findIndex((d) => d.id === id);
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...updates };
      writeJsonFile("destinations.json", list);
      return list[idx];
    },
    delete: async (id: string) => {
      const list = await db.destinations.findMany();
      const filtered = list.filter((d) => d.id !== id);
      writeJsonFile("destinations.json", filtered);
      return true;
    }
  },

  hotels: {
    findMany: async () => readJsonFile("hotels.json", initialHotels),
    findBySlug: async (slug: string) => {
      const list = await db.hotels.findMany();
      return list.find((h) => h.slug === slug) || null;
    },
    create: async (hotel: Partial<Hotel>) => {
      const list = await db.hotels.findMany();
      const slug = hotel.name?.toLowerCase().replace(/\s+/g, "-") || `hotel-${Date.now()}`;
      const newHotel: Hotel = {
        id: `htl-${Date.now()}`,
        slug,
        name: hotel.name || "New Hotel",
        refCode: hotel.refCode || `HTL-${String(list.length + 1).padStart(3, "0")}`,
        destinationId: hotel.destinationId || "dest-sigiriya",
        destinationName: hotel.destinationName || "Sigiriya",
        type: hotel.type || "Boutique Villa",
        starRating: hotel.starRating || 5,
        pricePerNightUSD: hotel.pricePerNightUSD || 200,
        priceRange: hotel.priceRange || "$$$",
        coordinates: hotel.coordinates || { lat: 7.8731, lng: 80.7718 },
        heroImage: hotel.heroImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
        gallery: hotel.gallery || [],
        amenities: hotel.amenities || ["Free Wi-Fi", "Swimming Pool", "Spa"],
        description: hotel.description || "",
        address: hotel.address || "Sri Lanka",
        featured: Boolean(hotel.featured),
        roomTypes: hotel.roomTypes || [{ name: "Deluxe Room", description: "Spacious luxury room", priceUSD: hotel.pricePerNightUSD || 200 }]
      };
      list.unshift(newHotel);
      writeJsonFile("hotels.json", list);
      return newHotel;
    },
    update: async (id: string, updates: Partial<Hotel>) => {
      const list = await db.hotels.findMany();
      const idx = list.findIndex((h) => h.id === id);
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...updates };
      writeJsonFile("hotels.json", list);
      return list[idx];
    },
    delete: async (id: string) => {
      const list = await db.hotels.findMany();
      const filtered = list.filter((h) => h.id !== id);
      writeJsonFile("hotels.json", filtered);
      return true;
    }
  },

  packages: {
    findMany: async () => readJsonFile("packages.json", initialPackages),
    findBySlug: async (slug: string) => {
      const list = await db.packages.findMany();
      return list.find((p) => p.slug === slug) || null;
    },
    create: async (pkg: Partial<TourPackage>) => {
      const list = await db.packages.findMany();
      const slug = pkg.name?.toLowerCase().replace(/\s+/g, "-") || `pkg-${Date.now()}`;
      const newPkg: TourPackage = {
        id: `pkg-${Date.now()}`,
        slug,
        name: pkg.name || "New Tour Package",
        refCode: pkg.refCode || `PKG-${String(list.length + 1).padStart(3, "0")}`,
        tagline: pkg.tagline || "",
        durationDays: pkg.durationDays || 7,
        durationNights: (pkg.durationDays || 7) - 1,
        durationText: `${pkg.durationDays || 7} Days / ${(pkg.durationDays || 7) - 1} Nights`,
        startingPriceUSD: pkg.startingPriceUSD || 800,
        difficulty: pkg.difficulty || "Easy",
        groupSize: pkg.groupSize || "Private Tour",
        tags: pkg.tags || ["Culture", "Private"],
        heroImage: pkg.heroImage || "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80",
        gallery: pkg.gallery || [],
        overview: pkg.overview || "",
        route: pkg.route || [],
        itinerary: pkg.itinerary || [],
        inclusions: pkg.inclusions || ["Breakfast & Dinner", "Private AC Vehicle", "Chauffeur Guide"],
        exclusions: pkg.exclusions || ["Flights", "Visa", "Tips"],
        hotelsIncluded: pkg.hotelsIncluded || [{ tier: "Superior 4★", description: "Boutique hand-picked hotels" }],
        recommendedVehicles: pkg.recommendedVehicles || ["High-Roof Luxury Van"],
        featured: Boolean(pkg.featured)
      };
      list.unshift(newPkg);
      writeJsonFile("packages.json", list);
      return newPkg;
    },
    update: async (id: string, updates: Partial<TourPackage>) => {
      const list = await db.packages.findMany();
      const idx = list.findIndex((p) => p.id === id);
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...updates };
      writeJsonFile("packages.json", list);
      return list[idx];
    },
    delete: async (id: string) => {
      const list = await db.packages.findMany();
      const filtered = list.filter((p) => p.id !== id);
      writeJsonFile("packages.json", filtered);
      return true;
    }
  },

  vehicles: {
    findMany: async () => readJsonFile("vehicles.json", initialVehicles),
    create: async (veh: Partial<Vehicle>) => {
      const list = await db.vehicles.findMany();
      const slug = veh.name?.toLowerCase().replace(/\s+/g, "-") || `veh-${Date.now()}`;
      const newVeh: Vehicle = {
        id: `veh-${Date.now()}`,
        slug,
        name: veh.name || "New Vehicle",
        model: veh.model || "",
        category: veh.category || "Van",
        passengerCapacity: veh.passengerCapacity || 4,
        luggageCapacity: veh.luggageCapacity || 4,
        airConditioned: veh.airConditioned ?? true,
        image: veh.image || "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
        description: veh.description || "",
        features: veh.features || ["Air Conditioning", "Wi-Fi", "Passenger Insurance"],
        pricePerDayUSD: veh.pricePerDayUSD || 75,
        pricePerKmUSD: veh.pricePerKmUSD || 0.40,
        guideOptionSurchargeUSD: veh.guideOptionSurchargeUSD || 35,
        idealFor: veh.idealFor || "Private small groups"
      };
      list.push(newVeh);
      writeJsonFile("vehicles.json", list);
      return newVeh;
    },
    update: async (id: string, updates: Partial<Vehicle>) => {
      const list = await db.vehicles.findMany();
      const idx = list.findIndex((v) => v.id === id);
      if (idx === -1) return null;
      list[idx] = { ...list[idx], ...updates };
      writeJsonFile("vehicles.json", list);
      return list[idx];
    },
    delete: async (id: string) => {
      const list = await db.vehicles.findMany();
      const filtered = list.filter((v) => v.id !== id);
      writeJsonFile("vehicles.json", filtered);
      return true;
    }
  },

  enquiries: {
    findMany: async () => readJsonFile<StoredEnquiry[]>("enquiries.json", []),
    findById: async (id: string) => {
      const list = await db.enquiries.findMany();
      return list.find((e) => e.id === id) || null;
    },
    create: async (enquiry: any) => {
      const list = await db.enquiries.findMany();
      const newEnquiry: StoredEnquiry = {
        id: `ENQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        status: "new",
        ...enquiry,
      };
      list.unshift(newEnquiry);
      writeJsonFile("enquiries.json", list);
      return newEnquiry;
    },
    updateStatus: async (id: string, status: any, adminNotes?: string) => {
      const list = await db.enquiries.findMany();
      const idx = list.findIndex((e) => e.id === id);
      if (idx === -1) return null;
      list[idx].status = status;
      if (adminNotes !== undefined) {
        (list[idx] as any).adminNotes = adminNotes;
      }
      writeJsonFile("enquiries.json", list);
      return list[idx];
    }
  },

  reviews: {
    findMany: async () => readJsonFile("reviews.json", seedReviews),
    create: async (review: any) => {
      const list = await db.reviews.findMany();
      const newReview = {
        id: `rev-${Date.now()}`,
        createdAt: new Date().toISOString(),
        isApproved: false, // Default requires moderation
        ...review,
      };
      list.unshift(newReview);
      writeJsonFile("reviews.json", list);
      return newReview;
    },
    updateApproval: async (id: string, isApproved: boolean) => {
      const list = await db.reviews.findMany();
      const idx = list.findIndex((r) => r.id === id);
      if (idx === -1) return null;
      list[idx].isApproved = isApproved;
      writeJsonFile("reviews.json", list);
      return list[idx];
    }
  },

  auditLogs: {
    findMany: async () => readJsonFile("audit-logs.json", seedAuditLogs),
    create: async (entry: {
      userId?: string;
      userEmail?: string;
      action: string;
      resource: string;
      resourceId?: string;
      details?: string;
      ipAddress?: string;
      userAgent?: string;
    }) => {
      const list = await db.auditLogs.findMany();
      const newEntry = {
        id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date().toISOString(),
        userId: entry.userId || "system",
        userEmail: entry.userEmail || "system@explorex.lk",
        action: entry.action,
        resource: entry.resource,
        resourceId: entry.resourceId || "",
        details: entry.details || "",
        ipAddress: entry.ipAddress || "127.0.0.1",
        userAgent: entry.userAgent || "Internal Agent",
      };
      list.unshift(newEntry);
      // keep latest 200 logs
      writeJsonFile("audit-logs.json", list.slice(0, 200));
      return newEntry;
    }
  },

  settings: {
    get: async () => readJsonFile("settings.json", defaultSettings),
    update: async (updates: Partial<SiteSettings>) => {
      const current = await db.settings.get();
      const updated = { ...current, ...updates };
      writeJsonFile("settings.json", updated);
      return updated;
    }
  },

  wishlists: {
    getForUser: async (userId: string) => {
      const allWishlists = readJsonFile<Record<string, string[]>>("wishlists.json", {});
      return allWishlists[userId] || [];
    },
    toggle: async (userId: string, itemId: string) => {
      const allWishlists = readJsonFile<Record<string, string[]>>("wishlists.json", {});
      const userList = allWishlists[userId] || [];
      const exists = userList.includes(itemId);
      const updated = exists ? userList.filter((id) => id !== itemId) : [...userList, itemId];
      allWishlists[userId] = updated;
      writeJsonFile("wishlists.json", allWishlists);
      return { isSaved: !exists, items: updated };
    }
  },

  phoneVerifications: {
    findMany: async () => readJsonFile<{ phone: string; code: string; expiresAt: string; attempts: number }[]>("phone_verifications.json", []),
    saveCode: async (phone: string, code: string) => {
      const records = await db.phoneVerifications.findMany();
      const filtered = records.filter((r) => r.phone !== phone);
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes
      filtered.push({ phone, code, expiresAt, attempts: 0 });
      writeJsonFile("phone_verifications.json", filtered);
      return { phone, code, expiresAt };
    },
    verifyCode: async (phone: string, inputCode: string) => {
      const records = await db.phoneVerifications.findMany();
      const record = records.find((r) => r.phone === phone);
      if (!record) return { valid: false, error: "No verification request found for this WhatsApp number." };
      if (new Date() > new Date(record.expiresAt)) {
        return { valid: false, error: "Verification code has expired. Please request a new code." };
      }
      if (record.attempts >= 5) {
        return { valid: false, error: "Too many incorrect attempts. Please request a new code." };
      }
      if (record.code !== inputCode.trim()) {
        record.attempts += 1;
        writeJsonFile("phone_verifications.json", records);
        return { valid: false, error: "Invalid 6-digit verification code. Please check and try again." };
      }
      // Success: clean up
      const remaining = records.filter((r) => r.phone !== phone);
      writeJsonFile("phone_verifications.json", remaining);
      return { valid: true };
    }
  }
};
