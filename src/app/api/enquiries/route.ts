import { NextResponse } from "next/server";
import { getEnquiries, saveEnquiry } from "@/lib/storage";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  const enquiries = getEnquiries();
  return NextResponse.json({ enquiries });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await getSession();

    // Mandatory Security Check: Tour packages require customer authentication
    if (body.itemType === "package" && !session) {
      return NextResponse.json(
        { error: "Customer account required to reserve tour packages. Please sign in or create an account." },
        { status: 401 }
      );
    }
    
    // Only persist if user granted consent, otherwise create ephemeral/anonymized log
    const saved = saveEnquiry({
      itemType: body.itemType || "general",
      itemId: body.itemId,
      itemName: body.itemName || "General Inquiry",
      refCode: body.refCode,
      travelDate: body.travelDate,
      travelersCount: body.travelersCount || 2,
      vehicleType: body.vehicleType,
      guideOption: body.guideOption,
      guideLanguage: body.guideLanguage,
      hotelSelection: body.hotelSelection,
      checkInDate: body.checkInDate,
      checkOutDate: body.checkOutDate,
      roomsCount: body.roomsCount,
      customDetails: body.customDetails,
      customerName: body.consentGiven ? (body.customerName || session?.name || "Traveler") : "Anonymized Traveler",
      customerContact: body.consentGiven ? (body.customerContact || session?.email || "") : "[Masked - No Consent]",
      customerPhone: body.customerPhone || undefined,
      isPhoneVerified: Boolean(body.isPhoneVerified),
      notes: body.notes,
      consentGiven: Boolean(body.consentGiven),
      customMessage: body.customMessage
    });

    return NextResponse.json({ success: true, enquiry: saved });
  } catch (err) {
    console.error("Failed to log enquiry:", err);
    return NextResponse.json({ error: "Failed to record enquiry" }, { status: 500 });
  }
}

