import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { packageSchema } from "@/lib/validation";

export async function GET() {
  const list = await db.packages.findMany();
  return NextResponse.json({ packages: list });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !assertPermission(session, "manage:catalog")) {
    return NextResponse.json({ error: "Forbidden: Manager or Super Admin only" }, { status: 403 });
  }

  try {
    const json = await request.json();
    const result = packageSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 });
    }

    const created = await db.packages.create(result.data as any);
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "CREATE",
      resource: "package",
      resourceId: created.id,
      details: `Created package "${created.name}" (${created.refCode}) with ${created.itinerary.length} days`,
    });

    return NextResponse.json({ success: true, package: created });
  } catch (err) {
    console.error("Package create error:", err);
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
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
    if (!id) return NextResponse.json({ error: "Package ID required" }, { status: 400 });

    const updated = await db.packages.update(id, data);
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      resource: "package",
      resourceId: id,
      details: `Updated package "${updated?.name}"`,
    });

    return NextResponse.json({ success: true, package: updated });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
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

    await db.packages.delete(id);
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      resource: "package",
      resourceId: id,
      details: `Deleted tour package with ID ${id}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }
}

