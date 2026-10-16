import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session || !assertPermission(session, "view:audit_logs")) {
    return NextResponse.json({ error: "Forbidden: Super Admin & Managers only" }, { status: 403 });
  }

  const logs = await db.auditLogs.findMany();
  return NextResponse.json({ auditLogs: logs });
}

