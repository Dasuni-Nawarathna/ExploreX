import React from "react";
import { WaveLine } from "@/components/motifs/WaveLine";
import { XMark } from "@/components/motifs/XMark";
import { CircularStamp } from "@/components/motifs/CircularStamp";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function WhyChooseUs() {
  const commitments = [
    {
      num: "01",
      title: "Licensed Chauffeur-Naturalists, Not App Drivers",
      detail: "Our drivers are licensed tourist guides registered with the Sri Lanka Tourism Development Authority (SLTDA). They read weather over Nuwara Eliya passes, spot leopards in tree boughs, and handle all police and highway paperwork quietly."
    },
    {
      num: "02",
      title: "Observation Class Train Seats Pre-Reserved",
      detail: "Tickets for the iconic Kandy-to-Ella blue train sell out within minutes of opening 30 days prior. We secure physical 1st-class observation or 2nd-class reserved window seats in advance through our Colombo station liaison."
    },
    {
      num: "03",
      title: "Direct Hotel Contracts, No Resellers",
      detail: "We work directly with boutique family properties and Geoffrey Bawa landmarks like Heritance Kandalama and Amangalla. No OTA markups, guaranteed late check-outs, and room allocations with the finest valley views."
    },
    {
      num: "04",
      title: "Real Road Distance Pacing",
      detail: "Sri Lankan mountain roads wind through dramatic elevation drops. We cap driving days at 3 to 4 hours maximum, ensuring you arrive in time for plantation afternoon tea, not at dusk exhausted."
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#1F3F3B] text-[#F6F5F0] relative overflow-hidden">
      {/* Background Decorative Faint Logo Circle Motif */}
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-[32rem] h-[32rem] rounded-full border border-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">

        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-8 border-b border-white/15">
          <div className="lg:col-span-8 space-y-2">
            <div className="font-mono text-xs uppercase tracking-widest text-[#E8C1B3] font-semibold">
              04 · THE EXPEDITION PHILOSOPHY
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal leading-snug tracking-tight text-white">
              Tell us the pace. <br />
              <span className="italic font-light text-teal-200">We&apos;ll plan the rest.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 space-y-2">
            <p className="font-sans text-sm sm:text-base text-[#D2DEDC] leading-relaxed">
              Based on the Galle Face promenade in Colombo, our operations desk monitors road closures, monsoon shifts, and wildlife movements daily.
            </p>
          </div>
        </div>

        {/* 4 Concrete Commitments (Editorial 2-Column List with Hairline Rules) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {commitments.map((item) => (
            <div key={item.num} className="space-y-3 border-t border-white/15 pt-5">
              <div className="flex items-center justify-between font-mono text-xs text-[#E8C1B3] font-semibold">
                <span>COMMITMENT NO. {item.num}</span>
                <XMark size={14} color="#E8C1B3" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white leading-snug">
                {item.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#D2DEDC] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Sign-off Callout */}
        <div className="pt-10 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="font-mono text-xs sm:text-sm text-[#D2DEDC] tracking-wider text-center sm:text-left font-medium">
            SLTDA REGISTERED TRAVEL AGENT · LICENSE: TS/DMC/2026/048
          </div>
          <Link
            href="/builder"
            className="px-7 py-3.5 rounded-full border border-white text-white hover:bg-white hover:text-brand-ink font-sans text-sm font-semibold tracking-wider uppercase transition-colors"
          >
            Design a Custom Itinerary →
          </Link>
        </div>

      </div>
    </section>
  );
}
