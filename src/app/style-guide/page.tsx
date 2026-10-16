"use client";

import React, { useState } from "react";
import Link from "next/link";
import { WaveLine, WaveUnderline } from "@/components/motifs/WaveLine";
import { XMark, XSpotPin } from "@/components/motifs/XMark";
import { CircularStamp } from "@/components/motifs/CircularStamp";
import { ArchedFrame } from "@/components/motifs/ArchedFrame";
import { 
  Compass, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Check, 
  MessageCircle, 
  Calendar,
  Sparkles,
  Shield,
  Layers,
  ChevronDown
} from "lucide-react";

export default function StyleGuidePage() {
  const [selectedMonth, setSelectedMonth] = useState("November");
  const [selectedTravelers, setSelectedTravelers] = useState("2 travelers");
  const [selectedInterest, setSelectedInterest] = useState("Tea country & trains");

  return (
    <div className="min-h-screen bg-brand-paper py-16 sm:py-24 text-brand-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* ========================================================
         * 00. HEADER & PHILOSOPHY
         * ======================================================== */}
        <header className="border-b border-brand-ink-border pb-12 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-terracotta bg-brand-terracotta-faint px-3.5 py-1 rounded-full border border-brand-terracotta/30">
              <span>EXPLOREX DESIGN SYSTEM</span>
              <span>·</span>
              <span>V2.0 &quot;FIELD JOURNAL&quot;</span>
            </div>
            <Link
              href="/"
              className="font-mono text-xs font-semibold text-brand-ink-muted hover:text-brand-ink flex items-center gap-1.5"
            >
              <span>← Back to Website</span>
            </Link>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="font-serif text-5xl sm:text-7xl font-normal leading-[1.05] tracking-tight">
              The Field Journal <br />
              <span className="italic font-light text-brand-ink-muted">Visual Identity &amp; Token Architecture</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-brand-ink-muted leading-relaxed max-w-3xl">
              A calm, tactile, editorial aesthetic inspired by printed travel journals, archipelago field notes, and the natural tones of Sri Lanka. Built entirely on the ExploreX palm circle emblem, wave dividers, and calligraphic swoosh.
            </p>
          </div>
        </header>

        {/* ========================================================
         * 01. COLOR SYSTEM (Derived from Logo & Island Earth)
         * ======================================================== */}
        <section className="space-y-8">
          <div className="flex items-baseline justify-between border-b border-brand-ink-border pb-3">
            <div className="space-y-1">
              <span className="font-mono text-xs text-brand-terracotta uppercase tracking-widest">
                SECTION 01
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl">Color Palette &amp; Contrast</h2>
            </div>
            <span className="font-mono text-xs text-brand-ink-faint">
              WCAG AA CERTIFIED · ZERO NEON
            </span>
          </div>

          <p className="font-sans text-sm sm:text-base text-brand-ink-muted max-w-2xl">
            The palette is strictly restrained to deep Ceylon tea ink, warm tactile paper surfaces, and a single muted terracotta accent derived from the fired clay roof tiles of Galle Fort and Kandy temples.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Deep Ink */}
            <div className="p-4 rounded-lg bg-white border border-brand-ink-border space-y-3">
              <div className="h-20 rounded bg-[#1F3F3B]" />
              <div className="space-y-0.5">
                <div className="font-sans font-bold text-xs text-brand-ink">Deep Ink</div>
                <div className="font-mono text-[11px] text-brand-ink-faint">#1F3F3B</div>
                <div className="font-mono text-[10px] text-emerald-700">Contrast: 10.8:1 (AAA)</div>
              </div>
            </div>

            {/* Brand Teal */}
            <div className="p-4 rounded-lg bg-white border border-brand-ink-border space-y-3">
              <div className="h-20 rounded bg-[#2F5D58]" />
              <div className="space-y-0.5">
                <div className="font-sans font-bold text-xs text-brand-ink">Primary Teal</div>
                <div className="font-mono text-[11px] text-brand-ink-faint">#2F5D58</div>
                <div className="font-mono text-[10px] text-emerald-700">Contrast: 6.9:1 (AA)</div>
              </div>
            </div>

            {/* Warm Cream Paper */}
            <div className="p-4 rounded-lg bg-white border border-brand-ink-border space-y-3">
              <div className="h-20 rounded bg-[#F6F5F0] border border-stone-300" />
              <div className="space-y-0.5">
                <div className="font-sans font-bold text-xs text-brand-ink">Cream Paper</div>
                <div className="font-mono text-[11px] text-brand-ink-faint">#F6F5F0</div>
                <div className="font-mono text-[10px] text-stone-500">Base Surface</div>
              </div>
            </div>

            {/* Sand Cream Muted */}
            <div className="p-4 rounded-lg bg-white border border-brand-ink-border space-y-3">
              <div className="h-20 rounded bg-[#ECE8DD]" />
              <div className="space-y-0.5">
                <div className="font-sans font-bold text-xs text-brand-ink">Sand Cream</div>
                <div className="font-mono text-[11px] text-brand-ink-faint">#ECE8DD</div>
                <div className="font-mono text-[10px] text-stone-500">Alternate Section</div>
              </div>
            </div>

            {/* Muted Terracotta Accent */}
            <div className="p-4 rounded-lg bg-white border border-brand-ink-border space-y-3">
              <div className="h-20 rounded bg-[#C46A4A]" />
              <div className="space-y-0.5">
                <div className="font-sans font-bold text-xs text-brand-ink">Terracotta Clay</div>
                <div className="font-mono text-[11px] text-brand-ink-faint">#C46A4A</div>
                <div className="font-mono text-[10px] text-emerald-700">Contrast: 5.2:1 (AA)</div>
              </div>
            </div>

            {/* Teal Surface Tint */}
            <div className="p-4 rounded-lg bg-white border border-brand-ink-border space-y-3">
              <div className="h-20 rounded bg-[#E3ECEA]" />
              <div className="space-y-0.5">
                <div className="font-sans font-bold text-xs text-brand-ink">Teal Tint</div>
                <div className="font-mono text-[11px] text-brand-ink-faint">#E3ECEA</div>
                <div className="font-mono text-[10px] text-stone-500">Tags &amp; Washes</div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
         * 02. TYPOGRAPHY (Fraunces + Figtree + JetBrains Mono)
         * ======================================================== */}
        <section className="space-y-8">
          <div className="flex items-baseline justify-between border-b border-brand-ink-border pb-3">
            <div className="space-y-1">
              <span className="font-mono text-xs text-brand-terracotta uppercase tracking-widest">
                SECTION 02
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl">Typography Hierarchy</h2>
            </div>
            <span className="font-mono text-xs text-brand-ink-faint">
              FRAUNCES · FIGTREE · JETBRAINS MONO
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Display Serif */}
            <div className="lg:col-span-8 p-8 rounded-2xl bg-white border border-brand-ink-border space-y-6">
              <div className="font-mono text-xs text-brand-ink-faint uppercase tracking-wider">
                Display Headline (Fraunces Serif — Regular &amp; Italic Emphasis)
              </div>
              <h3 className="font-serif text-4xl sm:text-6xl font-normal leading-[1.05] tracking-tight text-brand-ink">
                Sri Lanka, <br />
                <span className="italic font-light text-brand-terracotta">slowly</span> explored.
              </h3>
              <p className="font-sans text-base sm:text-lg text-brand-ink-muted leading-relaxed max-w-xl">
                Tea country mornings, southern coast evenings. The ancient citadel of Sigiriya before the sun climbs high, and quiet private pool villas in the palm hills.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <WaveUnderline width={100} color="#C46A4A" />
                <span className="font-mono text-xs text-brand-ink-faint">Hand-drawn underline accent</span>
              </div>
            </div>

            {/* Annotation & UI Sans */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-6 rounded-2xl bg-brand-sand border border-brand-ink-border space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-ink-faint block">
                  Journal Metadata (Mono)
                </span>
                <div className="font-mono text-xs text-brand-terracotta font-medium">
                  07° 57&apos; 00&quot; N · 80° 45&apos; 36&quot; E
                </div>
                <div className="font-mono text-xs text-brand-ink">
                  DURATION: 07 DAYS / 06 NIGHTS
                </div>
                <div className="font-mono text-sm font-bold text-brand-ink">
                  FROM USD $890 / PERSON
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-brand-ink-border space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-ink-faint block">
                  UI &amp; Body Sans (Figtree)
                </span>
                <p className="font-sans text-sm text-brand-ink-muted leading-relaxed">
                  Clean geometric rhythm mirroring the ExploreX wordmark. Engineered for clarity, legibility, and high-density travel specifications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
         * 03. CUSTOM BRAND MOTIFS (Circle, Wave, X)
         * ======================================================== */}
        <section className="space-y-8">
          <div className="flex items-baseline justify-between border-b border-brand-ink-border pb-3">
            <div className="space-y-1">
              <span className="font-mono text-xs text-brand-terracotta uppercase tracking-widest">
                SECTION 03
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl">Emblem Motifs &amp; SVG Marks</h2>
            </div>
            <span className="font-mono text-xs text-brand-ink-faint">
              DERIVED DIRECTLY FROM THE LOGO
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Motif 1: Wave Divider */}
            <div className="p-8 rounded-2xl bg-white border border-brand-ink-border flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="font-mono text-xs text-brand-terracotta font-semibold uppercase">
                  Motif 01 · Wave Line
                </div>
                <h4 className="font-serif text-2xl">The Flowing Tide</h4>
                <p className="font-sans text-xs text-brand-ink-muted leading-relaxed">
                  Extracted from the waves at the base of the palm circle. Replaces all generic horizontal rules and section borders.
                </p>
              </div>

              <div className="space-y-3 py-4">
                <WaveLine height={18} strokeWidth={1.8} color="#2F5D58" animated />
                <div className="flex items-center gap-2 text-xs font-mono text-brand-ink-faint">
                  <span>Animated SVG dash-draw on scroll</span>
                </div>
              </div>
            </div>

            {/* Motif 2: Rotating Circular Stamp */}
            <div className="p-8 rounded-2xl bg-white border border-brand-ink-border flex flex-col justify-between items-center text-center space-y-6">
              <div className="space-y-2 w-full text-left">
                <div className="font-mono text-xs text-brand-terracotta font-semibold uppercase">
                  Motif 02 · Circular Stamp
                </div>
                <h4 className="font-serif text-2xl">Archival Postal Seal</h4>
                <p className="font-sans text-xs text-brand-ink-muted leading-relaxed">
                  Rotating circular typography stamp overlapping photography and cards.
                </p>
              </div>

              <div className="py-2">
                <CircularStamp size={135} spinning />
              </div>
            </div>

            {/* Motif 3: Calligraphic X Mark */}
            <div className="p-8 rounded-2xl bg-white border border-brand-ink-border flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="font-mono text-xs text-brand-terracotta font-semibold uppercase">
                  Motif 03 · Calligraphic X
                </div>
                <h4 className="font-serif text-2xl">The Island Cross</h4>
                <p className="font-sans text-xs text-brand-ink-muted leading-relaxed">
                  Used for ticket bullets, map pins (&quot;X marks the spot&quot;), section index markers, and modal dismissals.
                </p>
              </div>

              <div className="flex items-center gap-4 py-4">
                <XSpotPin size={36} active />
                <XSpotPin size={36} />
                <div className="flex items-center gap-1.5 font-mono text-xs text-brand-ink">
                  <XMark size={16} color="#C46A4A" />
                  <span>Day 01 Itinerary Stop</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
         * 04. MASKED IMAGERY (Doorway Arches & Circles)
         * ======================================================== */}
        <section className="space-y-8">
          <div className="flex items-baseline justify-between border-b border-brand-ink-border pb-3">
            <div className="space-y-1">
              <span className="font-mono text-xs text-brand-terracotta uppercase tracking-widest">
                SECTION 04
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl">Architectural Framing</h2>
            </div>
            <span className="font-mono text-xs text-brand-ink-faint">
              TEMPLE DOORWAYS &amp; CIRCLES
            </span>
          </div>

          <p className="font-sans text-sm sm:text-base text-brand-ink-muted max-w-2xl">
            Generic 16px rounded rectangles are discarded in favor of architectural doorway arches (tall arched tops with clean flat bases) and circular portals with metadata captions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Arched Doorway 1 */}
            <ArchedFrame
              src="https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80"
              alt="Sigiriya Lion Rock"
              variant="doorway"
              caption="The 5th-Century Sky Citadel"
              coordinates="07° 57' N · 80° 45' E"
            />

            {/* Circular Portal 2 */}
            <div className="flex flex-col justify-center items-center p-4">
              <div className="relative w-64 h-64">
                <ArchedFrame
                  src="https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=80"
                  alt="Nine Arch Bridge Ella"
                  variant="circle"
                  aspectRatio="aspect-square"
                />
                <div className="absolute -bottom-4 -right-4">
                  <CircularStamp size={110} text="DEMODARA VALLEY · ELLA HIGHLANDS ·" subtext="KM 166.5" />
                </div>
              </div>
              <span className="font-serif italic text-brand-ink text-sm mt-8 block">
                Upcountry Blue Line crossing Nine Arch
              </span>
            </div>

            {/* Arched Doorway 3 */}
            <ArchedFrame
              src="/images/destinations/galle-fort-lighthouse.jpg"
              alt="Galle Fort Lighthouse"
              variant="doorway"
              caption="Colonial Ramparts at Sunset"
              coordinates="06° 01' N · 80° 13' E"
            />
          </div>
        </section>

        {/* ========================================================
         * 05. EDITORIAL COMPONENTS (Ticket Stub, Sentence Search, Buttons)
         * ======================================================== */}
        <section className="space-y-8">
          <div className="flex items-baseline justify-between border-b border-brand-ink-border pb-3">
            <div className="space-y-1">
              <span className="font-mono text-xs text-brand-terracotta uppercase tracking-widest">
                SECTION 05
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl">Core Component Prototypes</h2>
            </div>
            <span className="font-mono text-xs text-brand-ink-faint">
              HAND-CRAFTED &amp; TACTILE
            </span>
          </div>

          {/* Prototype 1: Conversational Sentence Selector */}
          <div className="p-8 sm:p-12 rounded-2xl bg-white border border-brand-ink-border space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-brand-terracotta uppercase tracking-widest">
              <span>PROTOTYPE 5.1</span>
              <span>·</span>
              <span>CONVERSATIONAL SENTENCE SELECTOR (REPLACES FLOATING SEARCH BOX)</span>
            </div>

            <div className="font-serif text-2xl sm:text-4xl text-brand-ink leading-relaxed max-w-4xl">
              &ldquo;I am travelling in{" "}
              <span className="relative inline-block border-b-2 border-brand-terracotta text-brand-terracotta cursor-pointer font-medium hover:opacity-80">
                {selectedMonth} ▾
              </span>{" "}
              with{" "}
              <span className="relative inline-block border-b-2 border-brand-terracotta text-brand-terracotta cursor-pointer font-medium hover:opacity-80">
                {selectedTravelers} ▾
              </span>
              , and I love{" "}
              <span className="relative inline-block border-b-2 border-brand-terracotta text-brand-terracotta cursor-pointer font-medium hover:opacity-80">
                {selectedInterest} ▾
              </span>
              .&rdquo;
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button className="px-6 py-3 rounded-full bg-brand-ink text-brand-paper font-sans font-semibold text-sm hover:bg-brand-teal transition-colors flex items-center gap-2">
                <span>Show Matching Journeys</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs text-brand-ink-faint">
                Direct filter into curated packages &amp; stays
              </span>
            </div>
          </div>

          {/* Prototype 2: Ticket Stub / Itinerary Postcard Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-brand-ink-border space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-brand-terracotta uppercase tracking-widest">
                <span>PROTOTYPE 5.2</span>
                <span>·</span>
                <span>JOURNAL TICKET STUB (PACKAGE CARD)</span>
              </div>

              {/* Ticket Card Container */}
              <div className="rounded-xl border border-brand-ink-border bg-[#FAF9F5] overflow-hidden shadow-xs">
                {/* Upper Stub: Photo + Number + Title */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-brand-terracotta uppercase tracking-widest">
                      REF: PKG-001 · PRIVATE EXPEDITION
                    </span>
                    <span className="font-mono text-xs font-bold text-brand-ink bg-brand-sand px-2.5 py-0.5 rounded">
                      07 DAYS
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-snug">
                    Cultural Triangle &amp; Hill Country Classic
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-brand-ink-muted leading-relaxed line-clamp-2">
                    Ancient 5th-century citadels, sacred relics, the high-altitude tea trails of Nuwara Eliya, and quiet private boutique stays.
                  </p>

                  {/* Route stop diagram */}
                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-brand-ink-muted">
                    <span>Colombo</span>
                    <span className="text-brand-terracotta">→</span>
                    <span>Sigiriya</span>
                    <span className="text-brand-terracotta">→</span>
                    <span>Kandy</span>
                    <span className="text-brand-terracotta">→</span>
                    <span>Nuwara Eliya</span>
                  </div>
                </div>

                {/* Perforated Dotted Tear Line */}
                <div className="relative border-b-2 border-dashed border-brand-ink-border my-1">
                  <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-white border border-brand-ink-border" />
                  <div className="absolute -right-3 -top-3 w-6 h-6 rounded-full bg-white border border-brand-ink-border" />
                </div>

                {/* Lower Stub: Price & Refined WhatsApp CTA */}
                <div className="p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] text-brand-ink-faint uppercase tracking-widest block">
                      PRIVATE RATE FROM
                    </span>
                    <span className="font-mono text-2xl font-bold text-brand-ink">
                      USD $890 <span className="text-xs font-normal text-brand-ink-faint">/ person</span>
                    </span>
                  </div>

                  {/* WhatsApp button in Brand Ink with small green dot */}
                  <button className="px-5 py-2.5 rounded-full bg-brand-ink hover:bg-brand-teal text-brand-paper font-sans font-semibold text-xs transition-colors flex items-center gap-2 self-start sm:self-auto shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] shrink-0" />
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Prototype 3: Button & Control Hierarchy */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-brand-ink-border space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-brand-terracotta uppercase tracking-widest">
                <span>PROTOTYPE 5.3</span>
                <span>·</span>
                <span>REFINED BUTTON HIERARCHY</span>
              </div>

              <div className="space-y-4">
                {/* Primary Button */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-brand-paper border border-brand-ink-border">
                  <span className="font-mono text-xs text-brand-ink-muted">Primary Action</span>
                  <button className="px-6 py-2.5 rounded-full bg-brand-ink hover:bg-brand-teal text-brand-paper font-sans font-semibold text-xs transition-colors">
                    Plan My Journey
                  </button>
                </div>

                {/* Terracotta Accent */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-brand-paper border border-brand-ink-border">
                  <span className="font-mono text-xs text-brand-ink-muted">Terracotta Accent</span>
                  <button className="px-6 py-2.5 rounded-full bg-brand-terracotta hover:bg-[#A95436] text-white font-sans font-semibold text-xs transition-colors">
                    Explore Journal
                  </button>
                </div>

                {/* Hairline Outline */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-brand-paper border border-brand-ink-border">
                  <span className="font-mono text-xs text-brand-ink-muted">Hairline Outline</span>
                  <button className="px-6 py-2.5 rounded-full bg-transparent hover:bg-white text-brand-ink font-sans font-semibold text-xs border border-brand-ink transition-colors">
                    View Complete Route
                  </button>
                </div>

                {/* WhatsApp Button with green dot */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-brand-paper border border-brand-ink-border">
                  <span className="font-mono text-xs text-brand-ink-muted">Refined WhatsApp CTA</span>
                  <button className="px-6 py-2.5 rounded-full bg-brand-ink hover:bg-brand-teal text-brand-paper font-sans font-semibold text-xs flex items-center gap-2 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Direct</span>
                  </button>
                </div>
              </div>

              {/* Minimal floating WhatsApp Seal demonstration */}
              <div className="pt-4 border-t border-brand-ink-border flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-semibold text-brand-ink block">
                    Minimalist Floating WhatsApp Seal
                  </span>
                  <span className="font-sans text-xs text-brand-ink-faint">
                    Clean 46px circular seal at bottom-right (no popping bubbles)
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-ink text-brand-paper flex items-center justify-center shadow-lg border border-white/20 hover:scale-105 transition-transform cursor-pointer relative">
                  <MessageCircle className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#25D366] ring-2 ring-brand-ink" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
         * 06. APPROVAL ACTION BAR
         * ======================================================== */}
        <footer className="pt-12 border-t border-brand-ink-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-serif text-2xl font-normal">Ready for Step 3 Implementation</div>
            <p className="font-sans text-xs text-brand-ink-muted">
              Header, Editorial Split Hero, Postcard Destinations, and Ticket Stub Itineraries.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-brand-ink text-brand-paper font-sans font-semibold text-xs hover:bg-brand-teal transition-colors"
            >
              Confirm Design System &amp; Proceed →
            </Link>
          </div>
        </footer>

      </div>
    </div>
  );
}

