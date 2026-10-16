import { NextResponse } from "next/server";
import { clearSessionCookie, getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function POST() {
  const session = await getSession();
  if (session) {
    await db.auditLogs.create({
      userId: session.userId,
      userEmail: session.email,
      action: "LOGOUT",
      resource: "auth",
      details: "User logged out cleanly",
    });
  }
  await clearSessionCookie();
  return NextResponse.json({ success: true });
}

