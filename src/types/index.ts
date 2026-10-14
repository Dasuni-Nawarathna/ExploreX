export type CurrencyCode = "USD" | "LKR" | "EUR" | "GBP";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateAgainstUSD: number; // 1 USD in this currency
}

export type LanguageCode = "en" | "si" | "ta" | "de";

export interface LanguageConfig {
  code: LanguageCode;
  label: string;
  nativeName: string;
  flag: string;
}

export type RegionType = 
  | "Cultural Triangle"
  | "Central Highlands"
  | "Southern Coast"
  | "Eastern Coast"
  | "Northern Peninsula"
  | "Northern Province"
  | "Western Coast"
  | "Wildlife & Nature";

export type DestinationCategory = 
  | "Culture"
  | "Beach"
  | "Wildlife"
  | "Hill Country"
  | "Adventure"
  | "UNESCO"
  | "Heritage";

export interface Destination {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  region: RegionType;
  category: DestinationCategory[];
  bestSeason: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  heroImage: string;
  gallery: string[];
  tag: string;
  summary: string;
  fullDescription: string;
  highlights: string[];
  bestTimeToVisit: string;
  weatherTips: string;
  nearbyAttractions: string[];
  relatedPackageIds: string[];
  relatedHotelIds: string[];
}

export type HotelType = 
  | "Boutique Villa"
  | "5-Star Resort"
  | "Eco Lodge"
  | "Heritage Hotel"
  | "Beachfront Guesthouse";

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  refCode: string;
  destinationId: string;
  destinationName: string;
  type: HotelType;
  starRating: number;
  pricePerNightUSD: number;
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  coordinates: {
    lat: number;
    lng: number;
  };
  heroImage: string;
  gallery: string[];
  amenities: string[];
  description: string;
  address: string;
  featured: boolean;
  roomTypes: {
    name: string;
    description: string;
    priceUSD: number;
  }[];
}

export interface DayItinerary {
  day: number;
  title: string;
  destination: string;
  description: string;
  activities: string[];
  meals: string;
  overnight: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  name: string;
  refCode: string;
  tagline: string;
  durationDays: number;
  durationNights: number;
  durationText: string;
  startingPriceUSD: number;
  difficulty: "Easy" | "Moderate" | "Active";
  groupSize: string;
  tags: string[];
  heroImage: string;
  gallery: string[];
  overview: string;
  route: {
    name: string;
    lat: number;
    lng: number;
  }[];
  itinerary: DayItinerary[];
  inclusions: string[];
  exclusions: string[];
  hotelsIncluded: {
    tier: string;
    description: string;
  }[];
  recommendedVehicles: string[];
  featured: boolean;
}

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  model: string;
  category: "Car" | "Van" | "Mini-coach" | "Tuk-tuk" | "SUV / Jeep";
  passengerCapacity: number;
  luggageCapacity: number;
  airConditioned: boolean;
  image: string;
  description: string;
  features: string[];
  pricePerDayUSD: number;
  pricePerKmUSD: number;
  guideOptionSurchargeUSD: number;
  idealFor: string;
}

export interface WhatsAppEnquiryPayload {
  itemType: "package" | "hotel" | "vehicle" | "custom_trip" | "general";
  itemId?: string;
  itemName: string;
  refCode?: string;
  travelDate?: string;
  travelersCount?: number;
  vehicleType?: string;
  guideOption?: string;
  guideLanguage?: string;
  hotelSelection?: string;
  destinationId?: string;
  checkInDate?: string;
  checkOutDate?: string;
  roomsCount?: number;
  customDetails?: {
    destinations: string[];
    days: number;
    tier: string;
    estimatedPriceUSD: number;
  };
  customerName?: string;
  customerContact?: string;
  customerPhone?: string;
  isPhoneVerified?: boolean;
  notes?: string;
  consentGiven?: boolean;
  customMessage?: string;
  messageText?: string;
  adminNotes?: string;
}

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "MANAGER" | "CONTENT_EDITOR" | "SUPPORT_AGENT" | "CUSTOMER";
  phone?: string;
  isPhoneVerified?: boolean;
  isTwoFactorEnabled?: boolean;
}

export interface StoredEnquiry extends WhatsAppEnquiryPayload {
  id: string;
  timestamp: string;
  status: "new" | "contacted" | "confirmed" | "cancelled" | "booked" | "archived" | string;
}

export interface SiteSettings {
  agencyName: string;
  tagline: string;
  agencyPhone: string;
  agencyWhatsAppNumber: string; // e.g. "94771234567"
  agencyEmail: string;
  colomboOfficeAddress: string;
  kandyOfficeAddress: string;
  operatingHours: string;
}
