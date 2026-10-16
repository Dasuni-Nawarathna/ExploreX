import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { vehicleSchema } from "@/lib/validation";

export async function GET() {
  const list = await db.vehicles.findMany();
  return NextResponse.json({ vehicles: list });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !assertPermission(session, "manage:catalog")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const json = await request.json();
    const result = vehicleSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 });
    }

    const created = await db.vehicles.create(result.data as any);
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "CREATE",
      resource: "vehicle",
      resourceId: created.id,
      details: `Created vehicle "${created.name}"`,
    });

    return NextResponse.json({ success: true, vehicle: created });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create vehicle" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session || !assertPermission(session, "manage:catalog")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const json = await request.json();
    const { id, ...data } = json;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const updated = await db.vehicles.update(id, data);
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      resource: "vehicle",
      resourceId: id,
      details: `Updated vehicle "${updated?.name}"`,
    });

    return NextResponse.json({ success: true, vehicle: updated });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update vehicle" }, { status: 500 });
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

    await db.vehicles.delete(id);
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      resource: "vehicle",
      resourceId: id,
      details: `Deleted vehicle with ID ${id}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete vehicle" }, { status: 500 });
  }
}

