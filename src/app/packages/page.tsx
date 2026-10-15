"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { packagesData } from "@/data/packages";
import { useCurrency } from "@/context/CurrencyContext";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { CardImageCarousel } from "@/components/common/CardImageCarousel";
import { TourPackage } from "@/types";
import { WaveLine, WaveUnderline } from "@/components/motifs/WaveLine";
import { XMark } from "@/components/motifs/XMark";
import { 
  ArrowRight, 
  MessageCircle, 
  Search,
  Compass
} from "lucide-react";

export default function PackagesPage() {
  const { formatPrice } = useCurrency();
  const { openWhatsAppModal } = useWhatsAppModal();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const tags = [
    "All",
    "Culture",
    "Wildlife",
    "Honeymoon",
    "Beaches",
    "UNESCO",
    "Scenic Train"
  ];

  const filteredPackages = useMemo(() => {
    return packagesData.filter((pkg) => {
      const matchesSearch =
        pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.refCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag =
        selectedTag === "All" || pkg.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  const handleBook = (pkg: TourPackage) => {
    openWhatsAppModal({
      itemType: "package",
      itemId: pkg.id,
      itemName: pkg.name,
      refCode: pkg.refCode,
      travelersCount: 2,
      vehicleType: "High-Roof Luxury Van (Toyota KDH)",
      guideOption: "With Licensed English-Speaking National Guide",
      customDetails: {
        destinations: pkg.route.map((r) => r.name),
        days: pkg.durationDays,
        tier: "Superior 4★ - 5★",
        estimatedPriceUSD: pkg.startingPriceUSD
      }
    });
  };

  return (
    <div className="py-16 sm:py-24 space-y-16 bg-[#F6F5F0] min-h-screen text-brand-ink">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-brand-ink-border pb-8">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-brand-terracotta mb-3">
            FIELD ARCHIVE · BESPOKE EXPEDITIONS
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-brand-ink leading-[1.08] max-w-4xl">
            Sri Lanka, through an <br />
            <span className="italic font-light text-brand-terracotta">unhurried lens</span>.
          </h1>
          <p className="font-sans text-base sm:text-lg text-brand-ink-muted max-w-2xl mt-4 leading-relaxed">
            Every itinerary is private, chauffeured, and customized to your arrival flight. Hand-selected boutique stays, pre-reserved observation train seats, and personal chauffeur-guides.
          </p>
        </div>

        {/* Minimal Search & Filter Index */}
        <div className="bg-[#FAF9F5] p-5 sm:p-6 rounded-lg border border-brand-ink-border space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-brand-ink-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search expeditions by region, wildlife, citadel or ticket code (e.g. Yala, Ella, PKG-001)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-brand-ink-border rounded-md text-brand-ink placeholder:text-brand-ink-faint font-sans text-sm focus:outline-none focus:border-brand-ink transition-colors"
            />
          </div>

          {/* Monospace Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs font-mono">
            {tags.map((tag) => {
              const active = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full transition-all uppercase tracking-wider whitespace-nowrap ${
                    active
                      ? "bg-brand-ink text-[#F6F5F0]"
                      : "bg-white border border-brand-ink-border text-brand-ink-muted hover:text-brand-ink hover:border-brand-ink"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Perforated Ticket Stub Itinerary Collection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg, idx) => (
            <article
              key={pkg.id}
              className="bg-white border border-brand-ink-border rounded-lg overflow-hidden flex flex-col justify-between shadow-xs hover:border-brand-ink transition-all duration-300 group"
            >
              <div>
                {/* Photo Carousel with Top Monospace Metadata */}
                <div className="relative">
                  <CardImageCarousel 
                    images={[pkg.heroImage, ...(pkg.gallery || [])]} 
                    alt={pkg.name}
                    aspectRatio="h-64" 
                  />

                  {/* Stamp & Mono Duration */}
                  <div className="absolute top-3 left-3 z-20 bg-[#1F3F3B]/90 backdrop-blur-xs text-[#F6F5F0] px-3 py-1 rounded-sm font-mono text-[11px] uppercase tracking-wider">
                    {pkg.durationDays} DAYS · {pkg.durationDays - 1} NIGHTS
                  </div>
                  <div className="absolute top-3 right-3 z-20 bg-white/95 text-brand-ink px-3 py-1 rounded-sm font-mono text-[11px] tracking-wider border border-brand-ink-border">
                    {pkg.refCode}
                  </div>
                </div>

                {/* Itinerary Notes */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1.5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-terracotta">
                      {pkg.groupSize} · {pkg.difficulty}
                    </div>
                    <Link href={`/packages/${pkg.slug}`}>
                      <h2 className="font-serif text-2xl font-normal text-brand-ink leading-snug group-hover:text-brand-terracotta transition-colors">
                        {pkg.name}
                      </h2>
                    </Link>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-brand-ink-muted line-clamp-3 leading-relaxed">
                    {pkg.overview}
                  </p>

                  {/* Dotted Route Line with Stops */}
                  <div className="pt-3 border-t border-brand-ink-border/60">
                    <span className="font-mono text-[10px] text-brand-ink-muted uppercase tracking-wider block mb-1.5">
                      ROUTE TIMELINE
                    </span>
                    <div className="font-mono text-xs text-brand-ink flex flex-wrap items-center gap-1.5">
                      {pkg.route.map((pt, i) => (
                        <React.Fragment key={pt.name}>
                          <span className="font-medium">{pt.name}</span>
                          {i < pkg.route.length - 1 && (
                            <span className="text-brand-terracotta font-bold">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Perforated Tear-off Booking Stub */}
              <div className="p-6 pt-4 border-t border-dashed border-brand-ink-border bg-[#FAF9F5] space-y-3.5">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase text-brand-ink-muted tracking-wider">
                    INDICATIVE RATE
                  </span>
                  <div className="text-right">
                    <span className="font-mono text-lg font-bold text-brand-ink">
                      {formatPrice(pkg.startingPriceUSD)}
                    </span>
                    <span className="font-mono text-[10px] text-brand-ink-muted ml-1">/ person</span>
                  </div>
                </div>

                {/* Actions: Direct WhatsApp Booking + Itinerary View */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => handleBook(pkg)}
                    className="flex-1 py-2.5 px-4 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire via WhatsApp</span>
                  </button>

                  <Link
                    href={`/packages/${pkg.slug}`}
                    className="p-2.5 rounded-full border border-brand-ink-border hover:border-brand-ink text-brand-ink transition-colors flex items-center justify-center"
                    title="Read Day-by-Day Field Itinerary"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
