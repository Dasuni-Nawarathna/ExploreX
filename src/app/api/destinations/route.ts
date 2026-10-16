import { NextResponse } from "next/server";
import { destinationsData } from "@/data/destinations";

export async function GET() {
  return NextResponse.json({ destinations: destinationsData });
}

