import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const user = await db.users.findById(session.userId);
  return NextResponse.json({
    authenticated: true,
    user: {
      id: session.userId,
      email: session.email,
      name: session.name,
      role: session.role,
      phone: user?.phone || null,
      isPhoneVerified: user?.isPhoneVerified || false,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    },
  });
}

