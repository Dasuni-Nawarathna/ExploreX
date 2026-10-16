import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { enquiryStatusSchema } from "@/lib/validation";

export async function GET() {
  const session = await getSession();
  if (!session || !assertPermission(session, "view:enquiries")) {
    return NextResponse.json({ error: "Forbidden: unauthorized to view enquiries" }, { status: 403 });
  }

  const list = await db.enquiries.findMany();
  return NextResponse.json({ enquiries: list });
}

export async function PATCH(request: Request) {
  const session = await getSession();
  // Support agent cannot modify status; manager and super admin can
  if (!session || !assertPermission(session, "manage:enquiries")) {
    return NextResponse.json({ error: "Forbidden: only Managers and Admins can update enquiry status" }, { status: 403 });
  }

  try {
    const json = await request.json();
    const { id, status, adminNotes } = json;
    if (!id) return NextResponse.json({ error: "Enquiry ID required" }, { status: 400 });

    const result = enquiryStatusSchema.safeParse({ status, adminNotes });
    if (!result.success) {
      return NextResponse.json({ error: "Invalid status payload", details: result.error.format() }, { status: 400 });
    }

    const updated = await db.enquiries.updateStatus(id, result.data.status, result.data.adminNotes);
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "STATUS_CHANGE",
      resource: "enquiry",
      resourceId: id,
      details: `Changed enquiry status to ${result.data.status}. Note: "${result.data.adminNotes || "None"}"`,
    });

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update enquiry status" }, { status: 500 });
  }
}

