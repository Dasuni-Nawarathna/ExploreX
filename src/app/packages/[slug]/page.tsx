import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { packagesData } from "@/data/packages";
import { PackageClientActions } from "./PackageClientActions";
import { ImageSlideshow } from "@/components/common/ImageSlideshow";
import { WaveLine } from "@/components/motifs/WaveLine";
import { XMark } from "@/components/motifs/XMark";
import { 
  ArrowLeft, 
  MapPin, 
  ShieldCheck, 
  Car,
  Compass,
  Check,
  X
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return packagesData.map((p) => ({ slug: p.slug }));
}

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = packagesData.find((p) => p.slug === slug);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-20 space-y-12 bg-[#F6F5F0] min-h-screen text-brand-ink">
      
      {/* Top Breadcrumb & Return Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/packages"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-ink-muted hover:text-brand-ink transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Field Archive</span>
        </Link>
      </div>

      {/* Editorial Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-brand-ink-border pb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-brand-terracotta uppercase tracking-[0.2em]">
            <span>{pkg.refCode}</span>
            <span>·</span>
            <span>{pkg.durationDays} DAYS / {pkg.durationDays - 1} NIGHTS</span>
            <span>·</span>
            <span>{pkg.groupSize}</span>
            <span>·</span>
            <span>{pkg.difficulty}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-brand-ink leading-[1.08] max-w-4xl">
            {pkg.name}
          </h1>

          <p className="font-sans text-lg sm:text-xl text-brand-ink-muted max-w-3xl leading-relaxed italic">
            &ldquo;{pkg.tagline}&rdquo;
          </p>

          {/* Arched Hero Feature Image */}
          <div className="relative w-full h-[400px] sm:h-[520px] rounded-2xl overflow-hidden border border-brand-ink-border mt-8">
            <img
              src={pkg.heroImage}
              alt={pkg.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#1F3F3B]/90 backdrop-blur-xs text-[#F6F5F0] px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wider">
              {pkg.route.map((r) => r.name).join(" → ")}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Sticky Sidebar Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left 2 Columns: Itinerary Field Notes */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-lg border border-brand-ink-border space-y-4">
              <div className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">
                EXPEDITION OVERVIEW
              </div>
              <p className="font-sans text-base sm:text-lg text-brand-ink leading-relaxed">
                {pkg.overview}
              </p>

              {/* Route stop points badge trail */}
              <div className="pt-4 border-t border-brand-ink-border/60 space-y-2">
                <span className="font-mono text-xs text-brand-ink-muted uppercase tracking-wider block">
                  ROUTE STOPS &amp; WAYPOINTS:
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  {pkg.route.map((stop, i) => (
                    <React.Fragment key={stop.name}>
                      <span className="px-3 py-1 bg-white border border-brand-ink-border rounded-sm text-brand-ink">
                        {String(i + 1).padStart(2, "0")}. {stop.name}
                      </span>
                      {i < pkg.route.length - 1 && (
                        <span className="text-brand-terracotta">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Vertical Day-by-Day Timeline */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-brand-ink-border space-y-8">
              <div className="space-y-1 border-b border-brand-ink-border pb-4">
                <div className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">
                  FIELD LOG · DAY-BY-DAY
                </div>
                <h2 className="font-serif text-3xl font-normal text-brand-ink">
                  Itinerary &amp; Milestones
                </h2>
                <p className="font-sans text-xs text-brand-ink-muted">
                  Private chauffeur driving times are paced to avoid rushed schedules (max 3-4 hours on the road per day).
                </p>
              </div>

              {/* Vertical line with XMark checkpoints */}
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-px before:bg-brand-ink-border">
                {pkg.itinerary.map((day) => (
                  <div key={day.day} className="relative pl-9 space-y-2">
                    {/* Checkpoint with X mark */}
                    <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-[#1F3F3B] text-[#F6F5F0] flex items-center justify-center font-mono text-xs ring-4 ring-white shadow-xs">
                      {String(day.day).padStart(2, "0")}
                    </div>

                    <div className="bg-[#FAF9F5] p-6 rounded-lg border border-brand-ink-border space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-ink-border/50 pb-3">
                        <h3 className="font-serif text-xl text-brand-ink font-normal">
                          {day.title}
                        </h3>
                        <span className="font-mono text-xs text-brand-terracotta bg-white border border-brand-ink-border px-2.5 py-0.5 rounded-sm uppercase tracking-wider self-start sm:self-auto">
                          {day.destination}
                        </span>
                      </div>

                      <p className="font-sans text-sm text-brand-ink-muted leading-relaxed">
                        {day.description}
                      </p>

                      {/* Activities Highlights */}
                      <div className="space-y-1.5 pt-2">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-brand-ink-muted">
                          PLANNED ENCOUNTERS:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {day.activities.map((act, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-white border border-brand-ink-border text-brand-ink font-sans text-xs flex items-center gap-1.5"
                            >
                              <span className="text-brand-terracotta font-bold text-xs">·</span>
                              <span>{act}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-brand-ink-border/50 font-mono text-xs text-brand-ink-muted">
                        <span>Meals: <strong className="text-brand-ink">{day.meals}</strong></span>
                        <span>Overnight: <strong className="text-brand-ink">{day.overnight}</strong></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions and Exclusions (Clean Editorial Split) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Inclusions */}
              <div className="bg-white p-6 sm:p-7 rounded-lg border border-brand-ink-border space-y-4">
                <div className="font-mono text-xs text-brand-ink uppercase tracking-wider flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-terracotta" />
                  <span>EXPEDITION INCLUSIONS</span>
                </div>
                <ul className="space-y-2 text-xs font-sans text-brand-ink-muted leading-relaxed">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-brand-terracotta font-bold mt-0.5">·</span>
                      <span className="text-brand-ink">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-white p-6 sm:p-7 rounded-lg border border-brand-ink-border space-y-4">
                <div className="font-mono text-xs text-brand-ink uppercase tracking-wider flex items-center gap-2">
                  <X className="w-4 h-4 text-brand-ink-muted" />
                  <span>NOT INCLUDED</span>
                </div>
                <ul className="space-y-2 text-xs font-sans text-brand-ink-muted leading-relaxed">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-brand-ink-muted mt-0.5">✕</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Accommodation Tiers */}
            <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-lg border border-brand-ink-border space-y-4">
              <div className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">
                HAND-PICKED LODGING
              </div>
              <h3 className="font-serif text-2xl font-normal text-brand-ink">
                Boutique Stays &amp; Heritage Estates
              </h3>
              <div className="space-y-3 pt-2">
                {pkg.hotelsIncluded.map((tier, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-md bg-white border border-brand-ink-border space-y-1"
                  >
                    <span className="font-serif text-base text-brand-ink font-medium">{tier.tier}</span>
                    <p className="font-sans text-xs text-brand-ink-muted leading-relaxed">{tier.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Slideshow */}
            <div className="space-y-4 pt-4">
              <div className="flex items-baseline justify-between border-b border-brand-ink-border pb-3">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-brand-ink">
                  Island Field Photography
                </h3>
                <span className="font-mono text-xs text-brand-ink-muted">
                  Full resolution archive
                </span>
              </div>
              <ImageSlideshow 
                images={[pkg.heroImage, ...(pkg.gallery || [])]} 
                alt={pkg.name} 
                autoPlay={true}
                interval={5000}
                showThumbnails={true}
                aspectRatio="aspect-[16/10]"
              />
            </div>
          </div>

          {/* Right Column: Sticky Ticket Side Panel */}
          <div className="space-y-6">
            <PackageClientActions pkg={pkg} />
          </div>
        </div>
      </div>
    </div>
  );
}
