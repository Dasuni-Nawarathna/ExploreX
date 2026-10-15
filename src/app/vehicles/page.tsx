"use client";

import React, { useState } from "react";
import { vehiclesData } from "@/data/vehicles";
import { useCurrency } from "@/context/CurrencyContext";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { Vehicle } from "@/types";
import { WaveLine } from "@/components/motifs/WaveLine";
import { XMark } from "@/components/motifs/XMark";
import { 
  Car, 
  Users, 
  Briefcase, 
  Wind, 
  MessageCircle, 
  ShieldCheck, 
  Sparkles,
  Languages
} from "lucide-react";

export default function VehiclesPage() {
  const { formatPrice } = useCurrency();
  const { openWhatsAppModal } = useWhatsAppModal();

  const [guidePreference, setGuidePreference] = useState<Record<string, boolean>>({
    "veh-sedan": false,
    "veh-van": true,
    "veh-mini-coach": true,
    "veh-tuktuk": false,
    "veh-safari-jeep": true,
    "veh-suv-prado": true,
  });

  const toggleGuide = (vehId: string) => {
    setGuidePreference({
      ...guidePreference,
      [vehId]: !guidePreference[vehId]
    });
  };

  const handleBookVehicle = (veh: Vehicle) => {
    const withGuide = guidePreference[veh.id] ?? false;
    openWhatsAppModal({
      itemType: "vehicle",
      itemId: veh.id,
      itemName: `${veh.name} (${veh.model})`,
      refCode: `VEH-${veh.category.toUpperCase().slice(0, 3)}`,
      travelersCount: veh.passengerCapacity,
      vehicleType: `${veh.name} (${veh.category})`,
      guideOption: withGuide ? "With Licensed Tour Guide" : "Dedicated Chauffeur Only",
      notes: `Interested in private chauffeur hire: ${veh.name}. With guide: ${withGuide ? "Yes" : "No"}.`
    });
  };

  return (
    <div className="py-16 sm:py-24 space-y-16 bg-[#F6F5F0] min-h-screen text-brand-ink">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-brand-ink-border pb-8">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-brand-terracotta mb-3">
            PRIVATE CHAUFFEURED FLEET · REGULATED TRANSPORT
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-brand-ink leading-[1.08] max-w-4xl">
            Island highways, scenic tracks, <br />
            <span className="italic font-light text-brand-terracotta">&amp; national park safaris</span>.
          </h1>
          <p className="font-sans text-base sm:text-lg text-brand-ink-muted max-w-2xl mt-4 leading-relaxed">
            Every ExploreX journey is accompanied by a dedicated, vetted chauffeur licensed by the Sri Lanka Tourism Development Authority (SLTDA). Fully insured, air-conditioned, and fuel-inclusive.
          </p>
        </div>
      </div>

      {/* Fleet Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehiclesData.map((veh) => {
            const hasGuide = guidePreference[veh.id] ?? false;
            const currentDailyPrice = veh.pricePerDayUSD + (hasGuide ? veh.guideOptionSurchargeUSD : 0);

            return (
              <article
                key={veh.id}
                className="bg-white border border-brand-ink-border rounded-lg overflow-hidden shadow-xs hover:border-brand-ink transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Vehicle Image */}
                  <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                    <img
                      src={veh.image}
                      alt={veh.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#1F3F3B]/90 backdrop-blur-xs text-[#F6F5F0] px-3 py-1 rounded-sm font-mono text-[10px] uppercase tracking-wider">
                      {veh.category}
                    </div>
                    {veh.airConditioned && (
                      <div className="absolute top-3 right-3 bg-white/95 text-brand-ink px-2.5 py-1 rounded-sm font-mono text-[10px] tracking-wider border border-brand-ink-border flex items-center gap-1">
                        <Wind className="w-3 h-3 text-brand-terracotta" />
                        <span>CLIMATE AC</span>
                      </div>
                    )}
                  </div>

                  {/* Specifications */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-brand-terracotta">
                        {veh.model}
                      </div>
                      <h2 className="font-serif text-2xl font-normal text-brand-ink leading-snug">
                        {veh.name}
                      </h2>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-brand-ink-muted leading-relaxed">
                      {veh.description}
                    </p>

                    {/* Monospace Capacity Bar */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-brand-ink-border/50 font-mono text-xs text-brand-ink">
                      <div className="flex items-center gap-2 p-2 bg-[#FAF9F5] border border-brand-ink-border rounded-sm">
                        <Users className="w-3.5 h-3.5 text-brand-terracotta" />
                        <span>Up to {veh.passengerCapacity} pax</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-[#FAF9F5] border border-brand-ink-border rounded-sm">
                        <Briefcase className="w-3.5 h-3.5 text-brand-terracotta" />
                        <span>{veh.luggageCapacity} suitcases</span>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {veh.features.map((feat) => (
                        <span
                          key={feat}
                          className="px-2 py-0.5 rounded-sm bg-[#FAF9F5] border border-brand-ink-border font-mono text-[10px] text-brand-ink"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Guide Toggle */}
                    <div className="pt-2 border-t border-brand-ink-border/50">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasGuide}
                          onChange={() => toggleGuide(veh.id)}
                          className="mt-1 h-3.5 w-3.5 rounded border-brand-ink-border text-brand-ink focus:ring-brand-ink"
                        />
                        <div className="font-sans text-xs">
                          <span className="font-medium text-brand-ink block">
                            Add National Tour Guide Lecturer
                          </span>
                          <span className="text-[11px] text-brand-ink-muted">
                            +{formatPrice(veh.guideOptionSurchargeUSD)}/day · English / German / French
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Perforated Stub Footer */}
                <div className="p-6 pt-4 border-t border-dashed border-brand-ink-border bg-[#FAF9F5] space-y-3.5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[10px] text-brand-ink-muted uppercase">
                      DAILY CHAUFFEUR TARIFF
                    </span>
                    <div className="text-right">
                      <span className="font-mono text-xl font-bold text-brand-ink">
                        {formatPrice(currentDailyPrice)}
                      </span>
                      <span className="font-mono text-[10px] text-brand-ink-muted ml-1">/ day</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookVehicle(veh)}
                    className="w-full py-2.5 px-4 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire Vehicle on WhatsApp</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
