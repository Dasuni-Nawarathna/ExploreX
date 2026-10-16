import React from "react";
import { WaveLine } from "@/components/motifs/WaveLine";
import { XMark } from "@/components/motifs/XMark";

export function Testimonials() {
  const reviews = [
    {
      name: "Marcus & Charlotte Davies",
      origin: "London, UK",
      route: "10-Day Island Odyssey",
      date: "October 2026",
      quote:
        "Bandara, our chauffeur-guide, was extraordinary. He steered clear of tour buses, found wild elephant herds grazing by roadside lakes, and our Ella blue train seats were waiting with our luggage already checked into the tea chalet. Truly calm, faultless travel."
    },
    {
      name: "Dr. Stefan & Eva Weber",
      origin: "Munich, Germany",
      route: "Cultural Triangle & Highlands",
      date: "September 2026",
      quote:
        "ExploreX arranged a German-speaking archaeological specialist for the dawn climb at Sigiriya. The depth of historical insight was remarkable. Jetwing Vil Uyana and Heritance Tea Factory exceeded every expectation."
    },
    {
      name: "Liam & Jessica O'Connor",
      origin: "Sydney, Australia",
      route: "Romantic Ceylon Honeymoon",
      date: "August 2026",
      quote:
        "Private plunge pools overlooking the Ella valley mist, seafood dinners on Galle Fort ramparts, and constant, quiet support on WhatsApp whenever we wanted to change our evening plans. An authentic, unforgettable honeymoon."
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-brand-paper text-brand-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-ink-border">
          <div className="space-y-3 max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-terracotta font-semibold">
              05 · LETTERS FROM THE ROAD
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight leading-snug">
              Dispatches from <span className="italic font-light text-brand-terracotta">our guests</span>.
            </h2>
          </div>
          <div className="font-mono text-xs text-brand-ink-faint font-medium">
            VERIFIED PRIVATE CHAUFFEUR REVIEWS · 4.9 / 5.0
          </div>
        </div>

        {/* 3 Editorial Postcard Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="p-8 sm:p-9 rounded-lg bg-white border border-brand-ink-border shadow-xs flex flex-col justify-between space-y-6 relative"
            >
              {/* Postal stamp effect in top right */}
              <div className="flex items-center justify-between font-mono text-xs text-brand-terracotta border-b border-brand-ink-border/60 pb-3 font-semibold">
                <span>POSTMARK NO. 0{i + 1}</span>
                <span className="text-brand-ink-faint uppercase font-medium">{r.origin}</span>
              </div>

              {/* Quote */}
              <blockquote className="font-serif italic text-base sm:text-lg text-brand-ink font-normal leading-relaxed">
                &ldquo;{r.quote}&rdquo;
              </blockquote>

              {/* Traveler Metadata */}
              <div className="pt-4 border-t border-brand-ink-border/60 space-y-1">
                <div className="font-sans font-semibold text-sm sm:text-base text-brand-ink">
                  {r.name}
                </div>
                <div className="font-mono text-xs text-brand-ink-faint">
                  {r.route} · {r.date}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
