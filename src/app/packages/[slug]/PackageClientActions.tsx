"use client";

import React, { useState } from "react";
import { TourPackage } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { ShareButtons } from "@/components/common/ShareButtons";
import { 
  MessageCircle, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Car, 
  Sparkles,
  ArrowRight
} from "lucide-react";

export function PackageClientActions({ pkg }: { pkg: TourPackage }) {
  const { formatPrice } = useCurrency();
  const { openWhatsAppModal } = useWhatsAppModal();

  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [vehicle, setVehicle] = useState("High-Roof Luxury Van (Toyota KDH)");
  const [withGuide, setWithGuide] = useState(true);

  const handleBookViaWhatsApp = () => {
    openWhatsAppModal({
      itemType: "package",
      itemId: pkg.id,
      itemName: pkg.name,
      refCode: pkg.refCode,
      travelDate: travelDate || undefined,
      travelersCount: travelers,
      vehicleType: vehicle,
      guideOption: withGuide ? "With Licensed English-Speaking National Guide" : "Chauffeur Only",
      customDetails: {
        destinations: pkg.route.map((r) => r.name),
        days: pkg.durationDays,
        tier: "Superior 4★ - 5★",
        estimatedPriceUSD: pkg.startingPriceUSD
      }
    });
  };

  return (
    <>
      {/* Desktop Sticky Ticket Side Panel */}
      <div className="bg-[#FAF9F5] rounded-lg border border-brand-ink-border p-6 sm:p-7 space-y-6 sticky top-28 shadow-xs text-brand-ink">
        <div className="space-y-1 pb-4 border-b border-brand-ink-border">
          <div className="font-mono text-[10px] text-brand-terracotta uppercase tracking-[0.2em]">
            INDICATIVE PRIVATE EXPEDITION FARE
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold text-brand-ink">
              {formatPrice(pkg.startingPriceUSD)}
            </span>
            <span className="font-mono text-xs text-brand-ink-muted">/ person (twin-sharing)</span>
          </div>
          <p className="font-sans text-[11px] text-brand-ink-muted pt-1">
            Includes private air-conditioned vehicle, dedicated chauffeur, boutique stays, and daily breakfast.
          </p>
        </div>

        {/* Tailoring Parameters */}
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-[11px] text-brand-ink uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-terracotta" />
              Target Travel Date
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink text-xs font-mono focus:outline-none focus:border-brand-ink"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] text-brand-ink uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-brand-terracotta" />
              Number of Explorers
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink text-xs font-mono focus:outline-none focus:border-brand-ink"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] text-brand-ink uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-brand-terracotta" />
              Dedicated Vehicle
            </label>
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink text-xs font-sans focus:outline-none focus:border-brand-ink"
            >
              <option value="High-Roof Luxury Van (Toyota KDH)">High-Roof Luxury Van (Toyota KDH, 4-7 pax)</option>
              <option value="Sedan Car (Toyota Axio / Prius)">Sedan Car (1-3 pax)</option>
              <option value="Executive Mini-Coach">Mini-Coach (8-15 pax)</option>
              <option value="Luxury SUV (Toyota Prado)">Luxury SUV (Toyota Prado)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="guide-check"
              checked={withGuide}
              onChange={(e) => setWithGuide(e.target.checked)}
              className="h-4 w-4 rounded border-brand-ink-border text-brand-ink focus:ring-brand-ink"
            />
            <label htmlFor="guide-check" className="font-sans text-xs text-brand-ink cursor-pointer">
              Accompany with Licensed National Tour Guide
            </label>
          </div>
        </div>

        {/* WhatsApp Reservation Button */}
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={handleBookViaWhatsApp}
            className="w-full py-3.5 px-5 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366]" />
            <MessageCircle className="w-4 h-4" />
            <span>Inquire via WhatsApp ({pkg.refCode})</span>
          </button>
          <p className="font-mono text-[10px] text-center text-brand-ink-muted">
            🔒 Customer account & verified WhatsApp required to place reservations
          </p>
        </div>

        {/* Share buttons */}
        <div className="pt-3 border-t border-brand-ink-border/60 flex justify-center">
          <ShareButtons title={`${pkg.name} (${pkg.durationText})`} />
        </div>

        <div className="space-y-2 pt-2 border-t border-brand-ink-border/60 text-[11px] font-sans text-brand-ink-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-terracotta shrink-0" />
            <span>Direct Colombo operator · Zero hidden booking commissions</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-terracotta shrink-0" />
            <span>Itinerary fully adaptable to your flight schedules</span>
          </div>
        </div>
      </div>

      {/* Mobile Slim Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-t border-brand-ink-border p-3 px-4 flex items-center justify-between shadow-lg">
        <div>
          <div className="font-mono text-[9px] text-brand-terracotta uppercase">
            {pkg.refCode} · {pkg.durationDays}D
          </div>
          <div className="font-mono text-sm font-bold text-brand-ink">
            {formatPrice(pkg.startingPriceUSD)} <span className="text-[10px] font-normal text-brand-ink-muted">/ pax</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleBookViaWhatsApp}
          className="py-2.5 px-4 rounded-full bg-brand-ink text-[#F6F5F0] font-sans text-xs font-semibold flex items-center gap-2 shadow-xs active:scale-98"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Book via WhatsApp</span>
        </button>
      </div>
    </>
  );
}
