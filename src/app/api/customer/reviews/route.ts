import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { reviewSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = reviewSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 });
    }

    const session = await getSession();
    const created = await db.reviews.create({
      ...result.data,
      userId: session?.userId || null,
      customerName: session?.name || result.data.customerName,
      isApproved: false, // Moderated by default
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your review has been submitted for review moderation.",
      review: created,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}

