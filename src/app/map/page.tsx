import React from "react";
import { Metadata } from "next";
import { SriLankaMap } from "@/components/map/SriLankaMap";

export const metadata: Metadata = {
  title: "Interactive Cartography & Map | ExploreX Sri Lanka",
  description: "Explore Sri Lanka's geography with our interactive cartography map. Filter ancient cultural cities, golden beaches, national wildlife parks, boutique hotels, and tour routes."
};

export default function MapPage() {
  return (
    <div className="py-16 sm:py-24 space-y-12 bg-[#F6F5F0] min-h-screen text-brand-ink">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="border-b border-brand-ink-border pb-8">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-brand-terracotta mb-3">
            CARTOGRAPHIC INDEX · ISLAND GEOGRAPHY
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-brand-ink leading-[1.08] max-w-4xl">
            Interactive island <span className="italic font-light text-brand-terracotta">cartography</span>.
          </h1>
          <p className="font-sans text-base sm:text-lg text-brand-ink-muted max-w-2xl mt-4 leading-relaxed">
            Click any pin to inspect local field notes, coordinates, and nearby boutique stays. Select any expedition route to trace day-by-day highways and mountain passes.
          </p>
        </div>
      </div>

      {/* Map Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-3 sm:p-4 rounded-lg border border-brand-ink-border shadow-xs">
          <SriLankaMap />
        </div>
      </div>
    </div>
  );
}
