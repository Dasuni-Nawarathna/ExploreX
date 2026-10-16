import { NextResponse } from "next/server";
import { packagesData } from "@/data/packages";

export async function GET() {
  return NextResponse.json({ packages: packagesData });
}

