"use client";

import React, { useState } from "react";
import Link from "next/link";
import { packagesData } from "@/data/packages";
import { useCurrency } from "@/context/CurrencyContext";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { TourPackage } from "@/types";
import { WaveLine, WaveUnderline } from "@/components/motifs/WaveLine";
import { XMark } from "@/components/motifs/XMark";
import { 
  ArrowRight, 
  RotateCcw, 
  Heart, 
  Users, 
  Compass, 
  MessageCircle,
  Clock,
  Sparkles,
  Check
} from "lucide-react";

interface QuestionnaireState {
  duration: "short" | "medium" | "long" | "epic";
  interest: "culture" | "wildlife" | "honeymoon" | "beach" | "all";
  travelers: "couple" | "family" | "solo" | "group";
  tier: "comfort" | "deluxe" | "luxury";
}

export function SmartPackageFinder() {
  const { formatPrice } = useCurrency();
  const { openWhatsAppModal } = useWhatsAppModal();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuestionnaireState>({
    duration: "medium",
    interest: "wildlife",
    travelers: "couple",
    tier: "deluxe"
  });
  const [hasCalculated, setHasCalculated] = useState(false);
  const [recommendations, setRecommendations] = useState<{ package: TourPackage; matchScore: number }[]>([]);

  const handleCalculate = () => {
    const scored = packagesData.map((pkg) => {
      let score = 70;

      if (answers.duration === "short" && pkg.durationDays <= 6) score += 20;
      else if (answers.duration === "medium" && pkg.durationDays >= 7 && pkg.durationDays <= 8) score += 20;
      else if (answers.duration === "long" && pkg.durationDays >= 9 && pkg.durationDays <= 11) score += 20;
      else if (answers.duration === "epic" && pkg.durationDays >= 12) score += 25;

      if (answers.interest === "culture" && (pkg.tags.includes("Culture") || pkg.id.includes("cultural"))) score += 25;
      if (answers.interest === "wildlife" && (pkg.tags.includes("Wildlife") || pkg.tags.includes("Leopards"))) score += 25;
      if (answers.interest === "honeymoon" && (pkg.tags.includes("Honeymoon") || pkg.tags.includes("Romantic"))) score += 25;
      if (answers.interest === "beach" && (pkg.tags.includes("Beaches") || pkg.tags.includes("Beach"))) score += 25;
      if (answers.interest === "all" && pkg.tags.includes("Complete Island")) score += 25;

      if (answers.travelers === "couple" && pkg.id === "pkg-honeymoon") score += 15;
      if (answers.travelers === "family" && pkg.id === "pkg-island-odyssey") score += 15;

      const finalScore = Math.min(99, score);
      return { package: pkg, matchScore: finalScore };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    setRecommendations(scored.slice(0, 3));
    setHasCalculated(true);
  };

  const resetFinder = () => {
    setStep(1);
    setHasCalculated(false);
  };

  const handleBook = (pkg: TourPackage) => {
    openWhatsAppModal({
      itemType: "package",
      itemId: pkg.id,
      itemName: pkg.name,
      refCode: pkg.refCode,
      travelersCount: answers.travelers === "couple" ? 2 : answers.travelers === "family" ? 4 : 2,
      vehicleType: "High-Roof Luxury Van (Toyota KDH)",
      guideOption: "With Licensed English-Speaking National Guide",
      customDetails: {
        destinations: pkg.route.map((r) => r.name),
        days: pkg.durationDays,
        tier: answers.tier,
        estimatedPriceUSD: pkg.startingPriceUSD
      }
    });
  };

  return (
    <div className="w-full bg-[#FAF9F5] border border-brand-ink-border rounded-xl p-8 sm:p-12 relative overflow-hidden shadow-xs">
      
      {/* Editorial Header */}
      <div className="relative max-w-3xl mx-auto text-center space-y-4 mb-10">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-terracotta">
          RECOMMENDED EXPEDITION FINDER · FIELD QUESTIONNAIRE
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-brand-ink leading-snug">
          Four questions to shape your <span className="italic font-light text-brand-terracotta">island chapter</span>.
        </h3>
        <p className="font-sans text-xs sm:text-sm text-brand-ink-muted max-w-xl mx-auto leading-relaxed">
          Tell us the pace and landscape you crave. We match your dates to a tailored private itinerary with vehicle and guide.
        </p>
      </div>

      {!hasCalculated ? (
        <div className="relative max-w-3xl mx-auto space-y-10">
          
          {/* Minimal Step Counter */}
          <div className="flex items-center justify-between border-b border-brand-ink-border pb-4">
            <span className="font-mono text-xs text-brand-ink-muted uppercase tracking-wider">
              Step {step} of 4
            </span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`w-6 h-1 rounded-full transition-all duration-300 ${
                    i === step
                      ? "bg-brand-ink w-10"
                      : i < step
                      ? "bg-brand-terracotta"
                      : "bg-brand-ink-border"
                  }`}
                />
              ))}
            </div>
            <span className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">
              {step === 1 && "Duration"}
              {step === 2 && "Focus"}
              {step === 3 && "Party"}
              {step === 4 && "Stays"}
            </span>
          </div>

          {/* Step 1: Duration */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="font-serif text-xl sm:text-2xl text-brand-ink">
                  How many days do you have on the island?
                </h4>
                <p className="font-sans text-xs text-brand-ink-muted">
                  Choose the approximate timeframe of your flight tickets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "short", label: "Short Break (4 – 6 Days)", desc: "Quick focus: Galle Fort, Mirissa or Sigiriya citadel." },
                  { id: "medium", label: "Classic Week (7 – 8 Days)", desc: "Cultural Triangle, Kandy tooth relic & Ella tea hills." },
                  { id: "long", label: "Signature Odyssey (9 – 11 Days)", desc: "Full island loop: Safari leopards, highlands & southern coast." },
                  { id: "epic", label: "Grand Expedition (12 – 14+ Days)", desc: "Comprehensive North-to-South Jaffna and coastline." },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setAnswers({ ...answers, duration: opt.id as any });
                      setStep(2);
                    }}
                    className={`p-5 rounded-lg border text-left transition-all duration-200 flex flex-col gap-1.5 ${
                      answers.duration === opt.id
                        ? "border-brand-ink bg-[#F6F5F0] shadow-xs"
                        : "border-brand-ink-border bg-white hover:border-brand-ink/50 hover:bg-[#F6F5F0]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base text-brand-ink font-medium">{opt.label}</span>
                      {answers.duration === opt.id && <XMark className="w-3.5 h-3.5 text-brand-terracotta" />}
                    </div>
                    <span className="font-sans text-xs text-brand-ink-muted leading-relaxed">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Primary Interest */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="font-serif text-xl sm:text-2xl text-brand-ink">
                  What landscape draws you most?
                </h4>
                <p className="font-sans text-xs text-brand-ink-muted">
                  We will prioritize driving routes and lodges according to this theme.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "wildlife", label: "Wild Safaris & Rainforests", desc: "Leopards in Yala, elephants in Minneriya, Horton Plains." },
                  { id: "culture", label: "Ancient Citadels & Sacred Art", desc: "Sigiriya rock fortress, Dambulla caves, Kandy heritage." },
                  { id: "honeymoon", label: "Intimate Couples & Honeymoons", desc: "Private plunge-pool villas, misty tea mornings & ocean sunsets." },
                  { id: "beach", label: "Coast, Waves & Stilt Fishermen", desc: "Mirissa, Weligama, whale expeditions & slow coastal dining." },
                  { id: "all", label: "Complete All-in-One Island Panorama", desc: "Balanced combination of ruins, tea hills, safaris & beach." },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setAnswers({ ...answers, interest: opt.id as any });
                      setStep(3);
                    }}
                    className={`p-5 rounded-lg border text-left transition-all duration-200 flex flex-col gap-1.5 ${
                      answers.interest === opt.id
                        ? "border-brand-ink bg-[#F6F5F0] shadow-xs"
                        : "border-brand-ink-border bg-white hover:border-brand-ink/50 hover:bg-[#F6F5F0]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base text-brand-ink font-medium">{opt.label}</span>
                      {answers.interest === opt.id && <XMark className="w-3.5 h-3.5 text-brand-terracotta" />}
                    </div>
                    <span className="font-sans text-xs text-brand-ink-muted leading-relaxed">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Travel Party */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="font-serif text-xl sm:text-2xl text-brand-ink">
                  Who is traveling with you?
                </h4>
                <p className="font-sans text-xs text-brand-ink-muted">
                  Dictates recommended private vehicle capacity and room layouts.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { id: "couple", label: "Couple / Duo", icon: Heart },
                  { id: "family", label: "Family with Children", icon: Users },
                  { id: "solo", label: "Solo Explorer", icon: Compass },
                  { id: "group", label: "Friends Group", icon: Users },
                ].map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setAnswers({ ...answers, travelers: opt.id as any });
                        setStep(4);
                      }}
                      className={`p-5 rounded-lg border text-center transition-all duration-200 flex flex-col items-center gap-2.5 ${
                        answers.travelers === opt.id
                          ? "border-brand-ink bg-[#F6F5F0] shadow-xs"
                          : "border-brand-ink-border bg-white hover:border-brand-ink/50 hover:bg-[#F6F5F0]/50"
                      }`}
                    >
                      <Icon className="w-5 h-5 text-brand-terracotta" />
                      <span className="font-serif text-sm text-brand-ink font-medium">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Accommodation Style */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="font-serif text-xl sm:text-2xl text-brand-ink">
                  Select your lodging character
                </h4>
                <p className="font-sans text-xs text-brand-ink-muted">
                  All properties are personally inspected by our Colombo team.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "comfort", label: "Character & Boutique", desc: "Hand-picked 3★–4★ heritage homes, plantation villas & eco lodges." },
                  { id: "deluxe", label: "Superior Luxury 4★–5★", desc: "Iconic tea factory resorts, beachfront suites, high-end safari camps." },
                  { id: "luxury", label: "Ultra-Luxury Villas", desc: "Private pool estates, Relais & Châteaux residences, dedicated butler." },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setAnswers({ ...answers, tier: opt.id as any });
                    }}
                    className={`p-5 rounded-lg border text-left transition-all duration-200 flex flex-col gap-1.5 ${
                      answers.tier === opt.id
                        ? "border-brand-ink bg-[#F6F5F0] shadow-xs"
                        : "border-brand-ink-border bg-white hover:border-brand-ink/50 hover:bg-[#F6F5F0]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base text-brand-ink font-medium">{opt.label}</span>
                      {answers.tier === opt.id && <XMark className="w-3.5 h-3.5 text-brand-terracotta" />}
                    </div>
                    <span className="font-sans text-xs text-brand-ink-muted leading-relaxed">{opt.desc}</span>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleCalculate}
                  className="px-8 py-3.5 rounded-full bg-brand-ink hover:bg-brand-teal text-brand-paper font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs"
                >
                  <span>Reveal Matching Itineraries</span>
                  <ArrowRight className="w-4 h-4 text-brand-terracotta" />
                </button>
              </div>
            </div>
          )}

          {/* Navigation link back */}
          {step > 1 && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="font-mono text-xs text-brand-ink-muted hover:text-brand-ink transition-colors flex items-center gap-1.5"
              >
                <span>← Previous question</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View: Perforated Ticket Stubs */
        <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-brand-ink-border">
            <div>
              <div className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">
                ITINERARY MATCH SUMMARY
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl font-normal text-brand-ink">
                Recommended for your pace &amp; party
              </h4>
            </div>
            <button
              onClick={resetFinder}
              className="inline-flex items-center gap-1.5 font-mono text-xs text-brand-ink hover:text-brand-terracotta transition-colors self-start sm:self-auto py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Modify Answers</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map(({ package: pkg, matchScore }) => (
              <div
                key={pkg.id}
                className="bg-white border border-brand-ink-border rounded-lg overflow-hidden flex flex-col justify-between shadow-xs hover:border-brand-ink transition-all group"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-stone-200">
                    <img
                      src={pkg.heroImage}
                      alt={pkg.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#1F3F3B]/90 backdrop-blur-xs text-[#F6F5F0] px-2.5 py-1 rounded-sm font-mono text-[10px] tracking-wider uppercase">
                      {pkg.durationDays} DAYS
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 text-brand-ink px-2.5 py-1 rounded-sm font-mono text-[10px] tracking-wider">
                      {matchScore}% MATCH
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="font-mono text-[10px] uppercase tracking-wider text-brand-terracotta">
                      {pkg.refCode}
                    </div>
                    <h5 className="font-serif text-lg text-brand-ink leading-snug font-medium">
                      {pkg.name}
                    </h5>
                    <p className="font-sans text-xs text-brand-ink-muted line-clamp-2 leading-relaxed">
                      {pkg.overview}
                    </p>

                    {/* Dotted Route */}
                    <div className="pt-2 border-t border-brand-ink-border/50">
                      <div className="font-mono text-[10px] text-brand-ink-muted uppercase tracking-wider mb-1">
                        ROUTE
                      </div>
                      <div className="font-mono text-xs text-brand-ink font-medium truncate">
                        {pkg.route.map((r) => r.name).join(" → ")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stub Footer */}
                <div className="p-5 pt-3 border-t border-dashed border-brand-ink-border bg-[#FAF9F5] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[10px] text-brand-ink-muted uppercase">From</span>
                    <span className="font-mono text-base text-brand-ink font-semibold">
                      {formatPrice(pkg.startingPriceUSD)} <span className="text-[10px] font-normal text-brand-ink-muted">/ person</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBook(pkg)}
                      className="flex-1 py-2.5 px-3 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 active:scale-98"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Book on WhatsApp</span>
                    </button>
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="p-2.5 rounded-full border border-brand-ink-border hover:border-brand-ink text-brand-ink transition-colors"
                      title="View Itinerary"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
