import { SiteSettings } from "@/types";

export const defaultSettings: SiteSettings = {
  agencyName: "ExploreX",
  tagline: "Travel Agency",
  agencyPhone: "+94 11 234 5678",
  agencyWhatsAppNumber: process.env.NEXT_PUBLIC_AGENCY_WHATSAPP || "94771234567", // Sri Lanka (+94) WhatsApp
  agencyEmail: "hello@explorex.lk",
  colomboOfficeAddress: "No. 42, Galle Face Promenade, Colombo 03, Sri Lanka",
  kandyOfficeAddress: "No. 18, Temple Square, Kandy 20000, Sri Lanka",
  operatingHours: "Monday - Sunday: 08:00 AM - 10:00 PM (IST) / 24/7 WhatsApp On-Tour Support"
};

