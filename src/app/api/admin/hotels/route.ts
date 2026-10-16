import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { hotelSchema } from "@/lib/validation";

export async function GET() {
  const list = await db.hotels.findMany();
  return NextResponse.json({ hotels: list });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !assertPermission(session, "manage:catalog")) {
    return NextResponse.json({ error: "Forbidden: Manager or Super Admin only" }, { status: 403 });
  }

  try {
    const json = await request.json();
    const result = hotelSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 });
    }

    const created = await db.hotels.create(result.data as any);
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "CREATE",
      resource: "hotel",
      resourceId: created.id,
      details: `Created hotel "${created.name}" (${created.refCode})`,
    });

    return NextResponse.json({ success: true, hotel: created });
  } catch (err) {
    console.error("Hotel create error:", err);
    return NextResponse.json({ error: "Failed to create hotel" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session || !assertPermission(session, "manage:catalog")) {
    return NextResponse.json({ error: "Forbidden: Manager or Super Admin only" }, { status: 403 });
  }

  try {
    const json = await request.json();
    const { id, ...data } = json;
    if (!id) return NextResponse.json({ error: "Hotel ID required" }, { status: 400 });

    const updated = await db.hotels.update(id, data);
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      resource: "hotel",
      resourceId: id,
      details: `Updated hotel "${updated?.name}"`,
    });

    return NextResponse.json({ success: true, hotel: updated });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update hotel" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || !assertPermission(session, "manage:catalog")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await db.hotels.delete(id);
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      resource: "hotel",
      resourceId: id,
      details: `Deleted hotel with ID ${id}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete hotel" }, { status: 500 });
  }
}

