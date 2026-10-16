import { NextResponse } from "next/server";
import { hotelsData } from "@/data/hotels";

export async function GET() {
  return NextResponse.json({ hotels: hotelsData });
}

