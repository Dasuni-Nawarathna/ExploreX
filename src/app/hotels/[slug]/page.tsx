import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hotelsData } from "@/data/hotels";
import { HotelClientActions } from "./HotelClientActions";
import { ImageSlideshow } from "@/components/common/ImageSlideshow";
import { 
  ArrowLeft, 
  MapPin, 
  Check,
  Sparkles
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return hotelsData.map((h) => ({ slug: h.slug }));
}

export default async function HotelDetailPage({ params }: Props) {
  const { slug } = await params;
  const hotel = hotelsData.find((h) => h.slug === slug);

  if (!hotel) {
    notFound();
  }

  return (
    <div className="py-12 sm:py-20 space-y-12 bg-[#F6F5F0] min-h-screen text-brand-ink">
      
      {/* Return to Stays Archive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/hotels"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-brand-ink-muted hover:text-brand-ink transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Stays Archive</span>
        </Link>
      </div>

      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-brand-ink-border pb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-brand-terracotta uppercase tracking-[0.2em]">
            <span>{hotel.refCode}</span>
            <span>·</span>
            <span>{hotel.type}</span>
            <span>·</span>
            <span>{"★".repeat(hotel.starRating)} {hotel.starRating}.0 Rating</span>
            <span>·</span>
            <span>{hotel.destinationName}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-brand-ink leading-[1.08] max-w-4xl">
            {hotel.name}
          </h1>

          <p className="font-sans text-base sm:text-lg text-brand-ink-muted flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-terracotta shrink-0" />
            <span>{hotel.address}</span>
          </p>

          {/* Feature Image Frame */}
          <div className="relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border border-brand-ink-border mt-8">
            <img
              src={hotel.heroImage}
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#1F3F3B]/90 backdrop-blur-xs text-[#F6F5F0] px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-wider">
              {hotel.destinationName} · {hotel.type}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left 2 Columns: Description, Amenities, Room Types, Gallery */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-lg border border-brand-ink-border space-y-4">
              <div className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">
                SANCTUARY FIELD NOTES
              </div>
              <p className="font-sans text-base sm:text-lg text-brand-ink leading-relaxed">
                {hotel.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-brand-ink-border space-y-6">
              <div className="border-b border-brand-ink-border pb-3">
                <div className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">
                  SERVICES &amp; COMFORTS
                </div>
                <h2 className="font-serif text-2xl font-normal text-brand-ink">
                  Property Highlights
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {hotel.amenities.map((amenity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-3 rounded-md bg-[#FAF9F5] border border-brand-ink-border text-xs font-sans text-brand-ink"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Categories */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-brand-ink-border space-y-6">
              <div className="border-b border-brand-ink-border pb-3">
                <div className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">
                  ACCOMMODATION TIERS
                </div>
                <h2 className="font-serif text-2xl font-normal text-brand-ink">
                  Available Suites &amp; Residences
                </h2>
              </div>

              <div className="space-y-4">
                {hotel.roomTypes.map((room, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-md bg-[#FAF9F5] border border-brand-ink-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-medium text-brand-ink">{room.name}</h3>
                      <p className="font-sans text-xs text-brand-ink-muted max-w-md leading-relaxed">{room.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono text-[10px] text-brand-ink-muted uppercase block">Nightly Rate</span>
                      <span className="font-mono text-xl font-bold text-brand-ink">${room.priceUSD}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Slideshow */}
            <div className="space-y-4 pt-2">
              <div className="flex items-baseline justify-between border-b border-brand-ink-border pb-3">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-brand-ink">
                  Property Experience Gallery
                </h3>
                <span className="font-mono text-xs text-brand-ink-muted">
                  Full resolution archive
                </span>
              </div>
              <ImageSlideshow 
                images={[hotel.heroImage, ...(hotel.gallery || [])]} 
                alt={hotel.name}
                autoPlay={true}
                interval={5000}
                showThumbnails={true}
                aspectRatio="aspect-[16/10]"
              />
            </div>
          </div>

          {/* Right Column: Sticky Ticket Reservation Side Panel */}
          <div className="space-y-6">
            <HotelClientActions hotel={hotel} />
          </div>
        </div>
      </div>
    </div>
  );
}
