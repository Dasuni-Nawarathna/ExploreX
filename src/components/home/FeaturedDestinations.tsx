import React from "react";
import Link from "next/link";
import Image from "next/image";
import { destinationsData } from "@/data/destinations";
import { WaveLine, WaveUnderline } from "@/components/motifs/WaveLine";
import { ArrowRight } from "lucide-react";

export function FeaturedDestinations() {
  const destinations = destinationsData.slice(0, 6);

  // Formatting coordinates helper
  const formatCoords = (lat: number, lng: number) => {
    return `${lat.toFixed(4)}° N · ${lng.toFixed(4)}° E`;
  };

  return (
    <section className="py-24 sm:py-32 bg-[#ECE8DD] text-brand-ink border-y border-brand-ink-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-ink-border">
          <div className="space-y-2 max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-terracotta font-semibold">
              02 · CARTOGRAPHY &amp; PROVINCES
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight leading-snug">
              Places worth <span className="italic font-light text-brand-terracotta">slowing down</span> for.
            </h2>
            <p className="font-sans text-sm sm:text-base text-brand-ink-muted leading-relaxed">
              From dawn climbs on 5th-century rock ramparts to solitary tea valley train platforms and southern ocean whale grounds.
            </p>
          </div>

          <Link
            href="/destinations"
            className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-ink hover:text-brand-terracotta transition-colors flex items-center gap-1.5 self-start md:self-auto py-1.5 border-b border-brand-ink"
          >
            <span>View All {destinationsData.length} Destinations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Asymmetric Staggered Grid (Varied heights & architectural masks) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {destinations.map((dest, idx) => {
            // Asymmetric layout span rules to break the template
            // Card 0: Col-span 7 (Doorway Arch), Card 1: Col-span 5 (Taller doorway)
            // Card 2: Col-span 4, Card 3: Col-span 4, Card 4: Col-span 4
            // Card 5: Col-span 12 (Panorama)
            const colSpan =
              idx === 0
                ? "md:col-span-7"
                : idx === 1
                ? "md:col-span-5"
                : idx === 2
                ? "md:col-span-4"
                : idx === 3
                ? "md:col-span-4"
                : idx === 4
                ? "md:col-span-4"
                : "md:col-span-12";

            const heightClass =
              idx === 0
                ? "h-[440px] rounded-t-[140px] rounded-b-[4px]"
                : idx === 1
                ? "h-[500px] rounded-t-[180px] rounded-b-[4px]"
                : idx === 5
                ? "h-[360px] rounded-[4px]"
                : "h-[380px] rounded-t-[90px] rounded-b-[4px]";

            return (
              <div key={dest.id} className={`${colSpan} space-y-3 group`}>
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="block relative overflow-hidden"
                >
                  {/* Image Container with Custom Architectural Arch */}
                  <div
                    className={`relative w-full ${heightClass} overflow-hidden border border-brand-ink-border bg-white shadow-xs`}
                  >
                    <Image
                      src={dest.heroImage}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Subtle warm archival tint */}
                    <div className="absolute inset-0 bg-[#F6F5F0]/15 mix-blend-multiply pointer-events-none" />
                  </div>
                </Link>

                {/* Editorial Metadata Block Below Card */}
                <div className="pt-1.5 space-y-1.5">
                  <div className="flex items-baseline justify-between text-xs font-mono text-brand-terracotta">
                    <span className="uppercase tracking-widest font-semibold">{dest.region} · {dest.bestSeason}</span>
                    <span className="tracking-wide text-brand-ink-faint text-[11px]">
                      {formatCoords(dest.coordinates.lat, dest.coordinates.lng)}
                    </span>
                  </div>

                  <Link href={`/destinations/${dest.slug}`} className="block">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-brand-ink group-hover:text-brand-terracotta transition-colors flex items-center gap-2 leading-snug">
                      <span>{dest.name}</span>
                      <span className="text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </h3>
                  </Link>

                  <p className="font-sans text-xs sm:text-sm text-brand-ink-muted leading-relaxed line-clamp-2">
                    {dest.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
