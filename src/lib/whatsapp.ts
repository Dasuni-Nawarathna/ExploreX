import type { WhatsAppEnquiryPayload } from "../types";

export interface WhatsAppMessageOptions extends WhatsAppEnquiryPayload {
  travelDate?: string;
  checkOutDate?: string;
  travelersCount?: number;
  roomsCount?: number;
  vehicleType?: string;
  guideOption?: string;
  notes?: string;
  priceFormatted?: string;
}

/**
 * Builds a standardized, human-readable WhatsApp message string
 * formatted for Sri Lanka tourism bookings.
 */
export function buildWhatsAppMessage(payload: WhatsAppMessageOptions): string {
  const {
    itemType,
    itemName,
    refCode,
    travelDate = "Flexible",
    checkOutDate,
    travelersCount = 2,
    roomsCount = 1,
    vehicleType = "High-Roof Luxury Van",
    guideOption = "With Licensed English-Speaking Guide",
    notes = "",
    priceFormatted,
    customDetails,
  } = payload;

  switch (itemType) {
    case "package": {
      const priceText = priceFormatted ? ` priced from ${priceFormatted}` : "";
      return (
        `Hello ExploreX! I'm interested in the *${itemName}*${priceText}.\n\n` +
        `• Preferred Travel Date: ${travelDate}\n` +
        `• Travelers: ${travelersCount} guest(s)\n` +
        `• Preferred Vehicle: ${vehicleType}\n` +
        `• Guide Preference: ${guideOption}\n` +
        (notes ? `• Special Requests: ${notes}\n` : "") +
        `\nPlease share current availability and tailored package details. (Ref: ${refCode || "PKG-GEN"})`
      );
    }

    case "hotel": {
      const outText = checkOutDate ? ` to ${checkOutDate}` : "";
      return (
        `Hello ExploreX! I'd like to book *${itemName}* from ${travelDate}${outText}.\n\n` +
        `• Guests: ${travelersCount}\n` +
        `• Rooms: ${roomsCount} room(s)\n` +
        (notes ? `• Room preference / notes: ${notes}\n` : "") +
        `\nPlease confirm rates and room availability. (Ref: ${refCode || "HTL-GEN"})`
      );
    }

    case "vehicle": {
      return (
        `Hello ExploreX! I would like to reserve the *${itemName}*.\n\n` +
        `• Start Date: ${travelDate}\n` +
        `• Passenger Count: ${travelersCount}\n` +
        `• Driver & Guide Service: ${guideOption}\n` +
        (notes ? `• Planned Route / Notes: ${notes}\n` : "") +
        `\nPlease provide vehicle quote and chauffeur availability. (Ref: ${refCode || "VEH-GEN"})`
      );
    }

    case "custom_trip": {
      const destList = customDetails?.destinations?.length
        ? customDetails.destinations.join(", ")
        : "Custom Route";
      const quoteText = priceFormatted || (customDetails?.estimatedPriceUSD ? `$${customDetails.estimatedPriceUSD}` : "Flexible");

      return (
        `Hello ExploreX! I built a custom Sri Lanka trip on your website:\n\n` +
        `• Destinations: ${destList}\n` +
        `• Duration: ${customDetails?.days || 7} Days\n` +
        `• Travelers: ${travelersCount} guest(s)\n` +
        `• Accommodation Tier: ${customDetails?.tier || "Deluxe"}\n` +
        `• Vehicle: ${vehicleType}\n` +
        `• Guide: ${guideOption}\n` +
        `• Estimated Quote: ${quoteText}\n` +
        `• Start Date: ${travelDate}\n` +
        (notes ? `• Extra Requests: ${notes}\n` : "") +
        `\nPlease review my custom selection and share a formal itinerary. (Ref: EXPLOREX-CUSTOM)`
      );
    }

    case "general":
    default: {
      return (
        `Hello ExploreX! Regarding *${itemName}*:\n\n` +
        `• Planned Dates: ${travelDate}\n` +
        `• Travelers: ${travelersCount}\n` +
        (notes ? `• Notes: ${notes}\n` : "") +
        `\nCould you please connect me with a holiday travel consultant?`
      );
    }
  }
}

/**
 * Builds the complete wa.me click-to-chat URL with URL-encoded query.
 */
export function buildWhatsAppUrl(agencyNumber: string, messageText: string): string {
  const cleanNumber = agencyNumber.replace(/\D/g, "");
  const encodedText = encodeURIComponent(messageText);
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}
