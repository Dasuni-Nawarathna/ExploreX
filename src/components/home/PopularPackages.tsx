"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { packagesData } from "@/data/packages";
import { useCurrency } from "@/context/CurrencyContext";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { WaveLine } from "@/components/motifs/WaveLine";
import { XMark } from "@/components/motifs/XMark";
import { ArrowRight, MessageCircle, Clock, MapPin } from "lucide-react";

export function PopularPackages() {
  const { formatPrice } = useCurrency();
  const { openWhatsAppModal } = useWhatsAppModal();

  const featured = packagesData.slice(0, 3);

  const handleBook = (pkg: typeof packagesData[0]) => {
    openWhatsAppModal({
      itemType: "package",
      itemId: pkg.id,
      itemName: pkg.name,
      refCode: pkg.refCode,
      travelersCount: 2,
      vehicleType: "Private AC Vehicle with Dedicated Chauffeur",
      guideOption: "With Licensed Tourist Chauffeur-Guide",
      customDetails: {
        destinations: pkg.route.map((r) => r.name),
        days: pkg.durationDays,
        tier: "Boutique & Heritage",
        estimatedPriceUSD: pkg.startingPriceUSD
      }
    });
  };

  return (
    <section className="py-24 sm:py-32 bg-brand-paper text-brand-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-ink-border">
          <div className="space-y-2 max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-terracotta font-semibold">
              03 · CURATED EXPEDITION ITINERARIES
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight leading-snug">
              Journeys paced for <span className="italic font-light text-brand-terracotta">real memory</span>.
            </h2>
            <p className="font-sans text-sm sm:text-base text-brand-ink-muted leading-relaxed">
              Every itinerary is completely private and flexible. Handcrafted day-by-day routes through ancient citadels, tea estates, and wild southern coastlines.
            </p>
          </div>

          <Link
            href="/packages"
            className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-ink hover:text-brand-terracotta transition-colors flex items-center gap-1.5 self-start md:self-auto py-1.5 border-b border-brand-ink"
          >
            <span>Browse All {packagesData.length} Journeys</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Itinerary Ticket Stubs Grid (3 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featured.map((pkg, idx) => (
            <div
              key={pkg.id}
              className="bg-white border border-brand-ink-border rounded-lg overflow-hidden flex flex-col justify-between shadow-xs hover:border-brand-terracotta transition-all duration-300 group"
            >
              {/* Upper Section: Photo with Arch cut + Meta */}
              <div>
                <div className="relative h-64 w-full overflow-hidden border-b border-brand-ink-border bg-brand-sand">
                  <Image
                    src={pkg.heroImage}
                    alt={pkg.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-[#F6F5F0]/10 mix-blend-multiply pointer-events-none" />
                </div>

                {/* Ticket Details */}
                <div className="p-6 space-y-3.5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono text-brand-terracotta pb-0.5">
                      <span className="uppercase tracking-widest font-semibold">{pkg.refCode}</span>
                      <span className="font-semibold">{pkg.durationDays} DAYS / {pkg.durationDays - 1} NIGHTS</span>
                    </div>
                    <Link href={`/packages/${pkg.slug}`}>
                      <h3 className="font-serif text-xl sm:text-2xl font-normal text-brand-ink group-hover:text-brand-terracotta transition-colors leading-snug">
                        {pkg.name}
                      </h3>
                    </Link>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-brand-ink-muted leading-relaxed line-clamp-3">
                    {pkg.overview}
                  </p>

                  {/* Route Stops / Dotted Line */}
                  <div className="pt-2.5 border-t border-brand-ink-border/60 space-y-1.5">
                    <span className="font-mono text-[11px] text-brand-ink-faint uppercase tracking-widest block font-medium">
                      STOPS ALONG THE ROUTE:
                    </span>
                    <div className="flex items-center flex-wrap gap-1.5 text-xs font-mono text-brand-ink font-medium">
                      {pkg.route.slice(0, 4).map((pt, i) => (
                        <React.Fragment key={pt.name}>
                          <span>{pt.name}</span>
                          {i < Math.min(pkg.route.length, 4) - 1 && (
                            <span className="text-brand-terracotta font-bold">→</span>
                          )}
                        </React.Fragment>
                      ))}
                      {pkg.route.length > 4 && (
                        <span className="text-brand-ink-faint">+{pkg.route.length - 4} more</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Perforated Dotted Tear Line */}
              <div className="relative border-b-2 border-dashed border-brand-ink-border mx-2">
                <div className="absolute -left-4 -top-2.5 w-5 h-5 rounded-full bg-brand-paper border border-brand-ink-border" />
                <div className="absolute -right-4 -top-2.5 w-5 h-5 rounded-full bg-brand-paper border border-brand-ink-border" />
              </div>

              {/* Lower Stub: Price & Refined WhatsApp Inquiry Button */}
              <div className="p-6 bg-[#FAF9F5] flex items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[11px] text-brand-ink-faint uppercase tracking-widest block font-medium">
                    STARTING AT
                  </span>
                  <div className="font-serif text-xl sm:text-2xl font-bold text-brand-ink">
                    {formatPrice(pkg.startingPriceUSD)}{" "}
                    <span className="text-xs font-mono font-normal text-brand-ink-faint">/ pax</span>
                  </div>
                </div>

                {/* Refined WhatsApp CTA Button: Deep Ink with Green Indicator Dot */}
                <button
                  onClick={() => handleBook(pkg)}
                  className="px-4 py-2.5 rounded-full bg-brand-ink hover:bg-brand-teal text-brand-paper font-sans text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 shadow-xs active:scale-98"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366] shrink-0" />
                  <MessageCircle className="w-4 h-4" />
                  <span>Inquire</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
