import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session || !assertPermission(session, "moderate:reviews")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const list = await db.reviews.findMany();
  return NextResponse.json({ reviews: list });
}

export async function PATCH(request: Request) {
  const session = await getSession();
  if (!session || !assertPermission(session, "moderate:reviews")) {
    return NextResponse.json({ error: "Forbidden: only Managers and Super Admins can moderate reviews" }, { status: 403 });
  }

  try {
    const { id, isApproved } = await request.json();
    if (!id || typeof isApproved !== "boolean") {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updated = await db.reviews.updateApproval(id, isApproved);
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      resource: "review",
      resourceId: id,
      details: `${isApproved ? "Approved" : "Rejected"} review by "${updated?.customerName}"`,
    });

    return NextResponse.json({ success: true, review: updated });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

