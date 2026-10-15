"use client";

import React from "react";
import Link from "next/link";
import { Destination } from "@/types";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { WeatherWidget } from "@/components/common/WeatherWidget";
import { ShareButtons } from "@/components/common/ShareButtons";
import { MessageCircle, MapPin, Compass, ArrowRight } from "lucide-react";

export function DestinationClientActions({ destination }: { destination: Destination }) {
  const { openWhatsAppModal } = useWhatsAppModal();

  const handleWhatsAppEnquire = () => {
    openWhatsAppModal({
      itemType: "general",
      itemName: `Private Tour to ${destination.name}`,
      notes: `Hello ExploreX! I am planning to visit ${destination.name} (${destination.region}). Please share recommended private chauffeur routes and curated stays.`
    });
  };

  return (
    <div className="space-y-6 sticky top-28">
      {/* Weather Widget */}
      <WeatherWidget destinationName={destination.name} region={destination.region} />

      {/* Field Snapshot Ticket Card */}
      <div className="bg-[#FAF9F5] rounded-lg border border-brand-ink-border p-6 sm:p-7 space-y-6 shadow-xs text-brand-ink">
        <div className="space-y-1 pb-4 border-b border-brand-ink-border">
          <span className="font-mono text-[10px] text-brand-terracotta uppercase tracking-[0.2em] block">
            LOCALITY SNAPSHOT
          </span>
          <h3 className="font-serif text-2xl font-normal text-brand-ink">
            {destination.name}
          </h3>
        </div>

        <div className="space-y-3 font-mono text-xs text-brand-ink">
          <div className="flex justify-between py-1.5 border-b border-brand-ink-border/50">
            <span className="text-brand-ink-muted">Region:</span>
            <span className="font-medium">{destination.region}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-brand-ink-border/50">
            <span className="text-brand-ink-muted">Ideal Season:</span>
            <span className="font-medium text-brand-terracotta">{destination.bestSeason}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-brand-ink-border/50">
            <span className="text-brand-ink-muted">Coordinates:</span>
            <span className="text-[11px]">
              {destination.coordinates.lat.toFixed(4)}° N, {destination.coordinates.lng.toFixed(4)}° E
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-brand-ink-border/50">
            <span className="text-brand-ink-muted">Landscape:</span>
            <span className="font-medium">{destination.category.join(", ")}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleWhatsAppEnquire}
            className="w-full py-3.5 px-5 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366]" />
            <MessageCircle className="w-4 h-4" />
            <span>Consult on WhatsApp</span>
          </button>

          <Link
            href={`/builder`}
            className="w-full py-3 px-5 rounded-full bg-white hover:bg-[#F6F5F0] text-brand-ink font-sans text-xs font-semibold border border-brand-ink-border transition-colors flex items-center justify-center gap-2"
          >
            <span>Include in Custom Trip Builder</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Social Share Buttons */}
        <div className="pt-4 border-t border-brand-ink-border/60 flex justify-center">
          <ShareButtons title={`Explore ${destination.name}, Sri Lanka`} />
        </div>
      </div>
    </div>
  );
}
