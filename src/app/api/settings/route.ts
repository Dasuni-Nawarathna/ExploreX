import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { assertPermission } from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { getSiteSettings, saveSiteSettings } from "@/lib/storage";

export async function GET() {
  const settings = await db.settings.get();
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !assertPermission(session, "manage:settings")) {
    return NextResponse.json({ error: "Forbidden: Super Admin only" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const updated = await db.settings.update(body);
    saveSiteSettings(body);

    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      resource: "settings",
      details: "Updated agency contact and WhatsApp configuration settings",
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (err) {
    console.error("Settings update error:", err);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
