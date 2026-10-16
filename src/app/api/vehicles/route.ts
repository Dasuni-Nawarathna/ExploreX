import { NextResponse } from "next/server";
import { vehiclesData } from "@/data/vehicles";

export async function GET() {
  return NextResponse.json({ vehicles: vehiclesData });
}

