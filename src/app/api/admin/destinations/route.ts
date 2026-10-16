import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { destinationSchema } from "@/lib/validation";

export async function GET() {
  const list = await db.destinations.findMany();
  return NextResponse.json({ destinations: list });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || (!assertPermission(session, "manage:catalog") && !assertPermission(session, "manage:content"))) {
    return NextResponse.json({ error: "Forbidden: insufficient permissions" }, { status: 403 });
  }

  try {
    const json = await request.json();
    const result = destinationSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ error: "Validation failed", details: result.error.format() }, { status: 400 });
    }

    const created = await db.destinations.create(result.data as any);
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "CREATE",
      resource: "destination",
      resourceId: created.id,
      details: `Created destination "${created.name}"`,
    });

    return NextResponse.json({ success: true, destination: created });
  } catch (err) {
    console.error("Create destination error:", err);
    return NextResponse.json({ error: "Failed to create destination" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSession();
  if (!session || (!assertPermission(session, "manage:catalog") && !assertPermission(session, "manage:content"))) {
    return NextResponse.json({ error: "Forbidden: insufficient permissions" }, { status: 403 });
  }

  try {
    const json = await request.json();
    const { id, ...data } = json;
    if (!id) return NextResponse.json({ error: "Destination ID required" }, { status: 400 });

    const updated = await db.destinations.update(id, data);
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      resource: "destination",
      resourceId: id,
      details: `Updated destination "${updated?.name}"`,
    });

    return NextResponse.json({ success: true, destination: updated });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update destination" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || (!assertPermission(session, "manage:catalog") && !assertPermission(session, "manage:content"))) {
    return NextResponse.json({ error: "Forbidden: insufficient permissions" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID parameter required" }, { status: 400 });

    await db.destinations.delete(id);
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      resource: "destination",
      resourceId: id,
      details: `Deleted destination with ID ${id}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete destination" }, { status: 500 });
  }
}

