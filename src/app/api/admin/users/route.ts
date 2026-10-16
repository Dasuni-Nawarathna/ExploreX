import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";

export async function GET() {
  const session = await getSession();
  if (!session || !assertPermission(session, "manage:users")) {
    return NextResponse.json({ error: "Forbidden: Super Admin only" }, { status: 403 });
  }

  const users = await db.users.findMany();
  // Strip passwordHash before sending
  const sanitized = users.map(({ passwordHash, twoFactorSecret, recoveryCodesJson, ...rest }) => rest);
  return NextResponse.json({ users: sanitized });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !assertPermission(session, "manage:users")) {
    return NextResponse.json({ error: "Forbidden: Super Admin only" }, { status: 403 });
  }

  try {
    const { name, email, password, role } = await request.json();
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existing = await db.users.findByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 });
    }

    const passwordHash = await hashPassword(password);
    const created = await db.users.create({
      name,
      email,
      passwordHash,
      role,
      emailVerified: true,
    });

    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "CREATE",
      resource: "user",
      resourceId: created.id,
      details: `Created user ${created.name} (${created.email}) with role ${created.role}`,
    });

    const { passwordHash: _, ...userSafe } = created;
    return NextResponse.json({ success: true, user: userSafe });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session || !assertPermission(session, "manage:users")) {
    return NextResponse.json({ error: "Forbidden: Super Admin only" }, { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "User ID required" }, { status: 400 });

    if (id === session.userId) {
      return NextResponse.json({ error: "Cannot delete your own super admin account" }, { status: 400 });
    }

    await db.users.delete(id);
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      resource: "user",
      resourceId: id,
      details: `Deleted user account with ID ${id}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

