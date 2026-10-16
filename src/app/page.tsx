import React from "react";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { FeaturedDestinations } from "@/components/home/FeaturedDestinations";
import { PopularPackages } from "@/components/home/PopularPackages";
import { SmartPackageFinder } from "@/components/home/SmartPackageFinder";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { SriLankaMap } from "@/components/map/SriLankaMap";
import { WaveLine } from "@/components/motifs/WaveLine";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-0 bg-brand-paper">
      {/* 1. Editorial Split Hero */}
      <Hero />

      {/* 2. Featured Destinations (Sand-Cream Alternating Section) */}
      <FeaturedDestinations />

      {/* 3. Tour Packages (Itinerary Ticket Stubs) */}
      <PopularPackages />

      {/* 4. The Expedition Philosophy (Full-Bleed Deep Teal Moment) */}
      <WhyChooseUs />

      {/* 5. Cartography & Interactive Map Preview */}
      <section className="py-24 sm:py-32 bg-[#ECE8DD] border-b border-brand-ink-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-ink-border">
            <div className="space-y-3 max-w-3xl">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-terracotta font-semibold">
                CARTOGRAPHY &amp; ELEVATION
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight leading-snug text-brand-ink">
                An archipelago <span className="italic font-light text-brand-terracotta">in scale</span>.
              </h2>
              <p className="font-sans text-sm sm:text-base text-brand-ink-muted leading-relaxed">
                From coastal sea-level palm fringes to 2,000-meter cloud forests in Horton Plains. Click any marker to open local field coordinates.
              </p>
            </div>

            <Link
              href="/map"
              className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-ink hover:text-brand-terracotta transition-colors flex items-center gap-2 self-start md:self-auto py-2 border-b border-brand-ink"
            >
              <span>Explore Island Map →</span>
            </Link>
          </div>

          {/* Interactive Map */}
          <div className="border border-brand-ink-border rounded-lg overflow-hidden bg-white p-2 shadow-xs">
            <SriLankaMap />
          </div>
        </div>
      </section>

      {/* 6. Smart Package Questionnaire */}
      <section className="py-24 sm:py-32 bg-brand-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SmartPackageFinder />
        </div>
      </section>

      {/* 7. Client Letters from the Road */}
      <Testimonials />

      {/* 8. Editorial Sign-off Invitation */}
      <section className="py-24 sm:py-32 bg-[#ECE8DD] border-t border-brand-ink-border text-brand-ink">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-terracotta font-semibold">
            BESPOKE CONSULTATIONS
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-snug tracking-tight">
            Have a date in mind? <br />
            <span className="italic font-light text-brand-terracotta">Let&apos;s talk about the journey.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-brand-ink-muted max-w-2xl mx-auto leading-relaxed">
            Send us your rough dates, how many travelers, and the places you&apos;ve circled in your mind. A senior destination designer in Colombo will outline a private itinerary within a few hours.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/94771234567?text=Hello%20ExploreX!%20I%20would%20like%20to%20plan%20a%20private%20chauffeured%20tour%20in%20Sri%20Lanka."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-brand-ink hover:bg-brand-teal text-brand-paper font-sans text-sm font-semibold tracking-wide transition-all duration-200 flex items-center gap-2.5 shadow-xs"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366]" />
              <MessageCircle className="w-5 h-5" />
              <span>Message on WhatsApp</span>
            </a>

            <Link
              href="/builder"
              className="px-6 py-3 rounded-full border border-brand-ink text-brand-ink hover:bg-white font-sans text-sm font-semibold tracking-wide transition-colors"
            >
              Open Custom Trip Builder →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
