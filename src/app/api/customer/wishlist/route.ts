import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";

// GET user's saved wishlist items
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ wishlist: [] });
  }

  const items = await db.wishlists.getForUser(session.userId);
  return NextResponse.json({ wishlist: items });
}

// POST: toggle saved item
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Please log in to save items to your wishlist" }, { status: 401 });
  }

  try {
    const { itemId } = await request.json();
    if (!itemId) {
      return NextResponse.json({ error: "Item ID required" }, { status: 400 });
    }

    const result = await db.wishlists.toggle(session.userId, itemId);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
  }
}

