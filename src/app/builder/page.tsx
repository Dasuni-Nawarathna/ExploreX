import React from "react";
import { Metadata } from "next";
import { CustomTripBuilder } from "@/components/builder/CustomTripBuilder";

export const metadata: Metadata = {
  title: "Custom Trip Builder | Tailor-Made Sri Lanka Holiday Itinerary",
  description: "Design your bespoke Sri Lanka private tour. Choose destinations, hotel tier, vehicle type, and guide. Get instant live pricing and direct WhatsApp enquiry."
};

export default function BuilderPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CustomTripBuilder />
      </div>
    </div>
  );
}

