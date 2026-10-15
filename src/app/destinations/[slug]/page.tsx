import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinationsData } from "@/data/destinations";
import { hotelsData } from "@/data/hotels";
import { packagesData } from "@/data/packages";
import { DestinationClientActions } from "./DestinationClientActions";
import { ImageSlideshow } from "@/components/common/ImageSlideshow";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  CloudSun,
  Compass,
  ArrowRight
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return destinationsData.map((d) => ({ slug: d.slug }));
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const dest = destinationsData.find((d) => d.slug === slug);

  if (!dest) {
    notFound();
  }

  // Find related hotels and packages
  const nearbyHotels = hotelsData.filter(
    (h) => dest.relatedHotelIds.includes(h.id) || h.destinationId === dest.id
  );
  const relatedPackages = packagesData.filter(
    (p) => dest.relatedPackageIds.includes(p.id) || p.route.some((r) => r.name.toLowerCase().includes(dest.name.toLowerCase()))
  );

  return (
    <div className="py-12 sm:py-20 space-y-12 bg-[#F6F5F0] min-h-screen text-brand-ink">
      
      {/* Return to Cartographic Index */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-ink-muted hover:text-brand-ink transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Island Index</span>
        </Link>
      </div>

      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-brand-ink-border pb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-brand-terracotta uppercase tracking-[0.2em]">
            <span>{dest.region}</span>
            <span>·</span>
            <span>{dest.coordinates.lat.toFixed(4)}° N, {dest.coordinates.lng.toFixed(4)}° E</span>
            <span>·</span>
            <span>BEST: {dest.bestSeason}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-brand-ink leading-[1.08] max-w-4xl">
            {dest.name}
          </h1>

          <p className="font-sans text-lg sm:text-xl text-brand-ink-muted max-w-3xl leading-relaxed italic">
            &ldquo;{dest.subtitle}&rdquo;
          </p>

          {/* Arched Feature Image Frame */}
          <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border border-brand-ink-border mt-8">
            <img
              src={dest.heroImage}
              alt={dest.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#1F3F3B]/90 backdrop-blur-xs text-[#F6F5F0] px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wider">
              {dest.name} · {dest.region}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Details & Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left 2 Columns: Description, Highlights, Weather, Gallery */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-lg border border-brand-ink-border space-y-4">
              <div className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">
                FIELD ANNOTATION
              </div>
              <p className="font-sans text-base sm:text-lg text-brand-ink leading-relaxed">
                {dest.fullDescription}
              </p>
            </div>

            {/* Key Highlights */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-brand-ink-border space-y-6">
              <div className="border-b border-brand-ink-border pb-3">
                <div className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">
                  LOCAL EXPEDITION HIGHLIGHTS
                </div>
                <h2 className="font-serif text-2xl font-normal text-brand-ink">
                  Notable Landmarks &amp; Encounters
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {dest.highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-md bg-[#FAF9F5] border border-brand-ink-border"
                  >
                    <span className="w-2 h-2 rounded-full bg-brand-terracotta shrink-0 mt-1.5" />
                    <span className="font-sans text-xs sm:text-sm text-brand-ink leading-relaxed">
                      {hl}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Slideshow */}
            <div className="space-y-4 pt-2">
              <div className="flex items-baseline justify-between border-b border-brand-ink-border pb-3">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-brand-ink">
                  Visual Field Archive: {dest.name}
                </h3>
                <span className="font-mono text-xs text-brand-ink-muted">
                  Full resolution photos
                </span>
              </div>
              <ImageSlideshow 
                images={[dest.heroImage, ...(dest.gallery || [])]} 
                alt={dest.name}
                autoPlay={true}
                interval={5000}
                showThumbnails={true}
                aspectRatio="aspect-[16/10]"
              />
            </div>

            {/* Best Time to Visit & Weather Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-brand-ink-border space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-brand-ink flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-brand-terracotta" />
                  <span>SEASONAL TIMING</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-brand-ink-muted leading-relaxed">
                  {dest.bestTimeToVisit}
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-brand-ink-border space-y-2">
                <div className="font-mono text-xs uppercase tracking-wider text-brand-ink flex items-center gap-2">
                  <CloudSun className="w-3.5 h-3.5 text-brand-terracotta" />
                  <span>PACKING &amp; CLIMATE TIPS</span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-brand-ink-muted leading-relaxed">
                  {dest.weatherTips}
                </p>
              </div>
            </div>

            {/* Nearby Accommodations */}
            {nearbyHotels.length > 0 && (
              <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-lg border border-brand-ink-border space-y-6">
                <div className="flex items-center justify-between border-b border-brand-ink-border pb-3">
                  <div>
                    <div className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">
                      LODGING DIRECTORY
                    </div>
                    <h3 className="font-serif text-2xl font-normal text-brand-ink">
                      Curated Stays in {dest.name}
                    </h3>
                  </div>
                  <Link href="/hotels" className="font-mono text-xs text-brand-ink hover:text-brand-terracotta">
                    View All Stays →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {nearbyHotels.map((hotel) => (
                    <Link
                      key={hotel.id}
                      href={`/hotels/${hotel.slug}`}
                      className="bg-white rounded-md border border-brand-ink-border p-4 flex items-center gap-4 hover:border-brand-ink transition-colors"
                    >
                      <img
                        src={hotel.heroImage}
                        alt={hotel.name}
                        className="w-16 h-16 rounded-sm object-cover shrink-0"
                      />
                      <div className="space-y-1">
                        <span className="font-mono text-[10px] text-brand-terracotta uppercase">
                          {hotel.type}
                        </span>
                        <h4 className="font-serif text-sm font-medium text-brand-ink">{hotel.name}</h4>
                        <span className="font-mono text-xs text-brand-ink-muted block">
                          From ${hotel.pricePerNightUSD} / night
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Destination Client Actions & Related Tours */}
          <div className="space-y-6">
            <DestinationClientActions destination={dest} />

            {/* Related Itineraries */}
            {relatedPackages.length > 0 && (
              <div className="bg-white p-6 rounded-lg border border-brand-ink-border space-y-4">
                <div className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">
                  LINKED ITINERARIES
                </div>
                <h4 className="font-serif text-lg font-normal text-brand-ink">
                  Journeys That Traverse {dest.name}
                </h4>
                <div className="space-y-3 pt-1">
                  {relatedPackages.map((pkg) => (
                    <Link
                      key={pkg.id}
                      href={`/packages/${pkg.slug}`}
                      className="block p-3 rounded-md bg-[#FAF9F5] border border-brand-ink-border hover:border-brand-ink transition-colors space-y-1"
                    >
                      <span className="font-mono text-[10px] text-brand-terracotta uppercase">
                        {pkg.durationDays} DAYS · {pkg.refCode}
                      </span>
                      <h5 className="font-serif text-sm text-brand-ink font-medium leading-snug">
                        {pkg.name}
                      </h5>
                      <span className="font-mono text-xs text-brand-ink block">
                        From ${pkg.startingPriceUSD} / person
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
