"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { hotelsData } from "@/data/hotels";
import { destinationsData } from "@/data/destinations";
import { HotelType, Hotel } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { CardImageCarousel } from "@/components/common/CardImageCarousel";
import { WaveLine } from "@/components/motifs/WaveLine";
import { XMark } from "@/components/motifs/XMark";
import { 
  Search, 
  ArrowRight, 
  MessageCircle,
  Wifi,
  Waves,
  Coffee,
  Utensils,
  Sparkles,
  MapPin
} from "lucide-react";

export default function HotelsPage() {
  const { formatPrice } = useCurrency();
  const { openWhatsAppModal } = useWhatsAppModal();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedStar, setSelectedStar] = useState<number>(0);

  const types: (string | HotelType)[] = [
    "All",
    "Boutique Villa",
    "5-Star Resort",
    "Eco Lodge",
    "Heritage Hotel",
    "Beachfront Guesthouse"
  ];

  const filteredHotels = useMemo(() => {
    return hotelsData.filter((hotel) => {
      const matchesSearch =
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.refCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDest =
        selectedDestination === "All" || hotel.destinationId === selectedDestination;

      const matchesType =
        selectedType === "All" || hotel.type === selectedType;

      const matchesStar =
        selectedStar === 0 || hotel.starRating >= selectedStar;

      return matchesSearch && matchesDest && matchesType && matchesStar;
    });
  }, [searchQuery, selectedDestination, selectedType, selectedStar]);

  const handleBook = (hotel: Hotel) => {
    openWhatsAppModal({
      itemType: "hotel",
      itemId: hotel.id,
      itemName: hotel.name,
      refCode: hotel.refCode,
      destinationId: hotel.destinationId,
      hotelSelection: hotel.name,
      travelersCount: 2,
      roomsCount: 1,
      notes: `Interested in reserving ${hotel.name} in ${hotel.destinationName}.`
    });
  };

  return (
    <div className="py-16 sm:py-24 space-y-16 bg-[#F6F5F0] min-h-screen text-brand-ink">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-brand-ink-border pb-8">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-brand-terracotta mb-3">
            ARCHIVAL LODGING · BOUTIQUE RETREATS &amp; RESIDENCES
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-brand-ink leading-[1.08] max-w-4xl">
            Sanctuaries between the <br />
            <span className="italic font-light text-brand-terracotta">tea hills and the sea</span>.
          </h1>
          <p className="font-sans text-base sm:text-lg text-brand-ink-muted max-w-2xl mt-4 leading-relaxed">
            Restored Geoffrey Bawa estates, colonial planter bungalows, and secluded coastal pavilions. Directly contracted with private host rates for ExploreX travelers.
          </p>
        </div>

        {/* Slim Horizontal Filter Bar */}
        <div className="bg-[#FAF9F5] p-5 sm:p-6 rounded-lg border border-brand-ink-border space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-brand-ink-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search stay name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-brand-ink-border rounded-md text-brand-ink placeholder:text-brand-ink-faint text-xs font-sans focus:outline-none focus:border-brand-ink"
              />
            </div>

            {/* Destination Dropdown */}
            <div>
              <select
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-brand-ink-border rounded-md text-brand-ink text-xs font-sans focus:outline-none focus:border-brand-ink cursor-pointer"
              >
                <option value="All">All Island Locations</option>
                {destinationsData.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.region})
                  </option>
                ))}
              </select>
            </div>

            {/* Star Rating Filter */}
            <div>
              <select
                value={selectedStar}
                onChange={(e) => setSelectedStar(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-white border border-brand-ink-border rounded-md text-brand-ink text-xs font-sans focus:outline-none focus:border-brand-ink cursor-pointer"
              >
                <option value={0}>Any Rating</option>
                <option value={5}>5-Star Luxury Estates</option>
                <option value={4}>4-Star &amp; Above Boutique</option>
              </select>
            </div>
          </div>

          {/* Type Pills */}
          <div className="pt-2 border-t border-brand-ink-border/50 flex flex-wrap gap-2 text-xs font-mono">
            {types.map((t) => {
              const active = selectedType === t;
              return (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-all ${
                    active
                      ? "bg-brand-ink text-[#F6F5F0]"
                      : "bg-white border border-brand-ink-border text-brand-ink-muted hover:text-brand-ink hover:border-brand-ink"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Editorial Alternating List (Image Left / Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {filteredHotels.map((hotel, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <article
              key={hotel.id}
              className="bg-white border border-brand-ink-border rounded-lg overflow-hidden shadow-xs hover:border-brand-ink transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Image Carousel (Left or Right based on alternating index) */}
              <div
                className={`lg:col-span-6 relative overflow-hidden bg-stone-100 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <CardImageCarousel 
                  images={[hotel.heroImage, ...(hotel.gallery || [])]} 
                  alt={hotel.name}
                  aspectRatio="h-80 sm:h-96 lg:h-full" 
                />

                <div className="absolute top-4 left-4 z-20 bg-[#1F3F3B]/90 backdrop-blur-xs text-[#F6F5F0] px-3 py-1 rounded-sm font-mono text-[11px] uppercase tracking-wider">
                  {hotel.destinationName}
                </div>
                <div className="absolute top-4 right-4 z-20 bg-white/95 text-brand-ink px-2.5 py-1 rounded-sm font-mono text-[11px] tracking-wider border border-brand-ink-border">
                  {hotel.refCode}
                </div>
              </div>

              {/* Editorial Description Column */}
              <div
                className={`lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between space-y-6 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-terracotta">
                      {hotel.type}
                    </span>
                    <span className="font-mono text-xs text-brand-ink-muted">
                      {"★".repeat(hotel.starRating)} {hotel.starRating}.0 Rating
                    </span>
                  </div>

                  <Link href={`/hotels/${hotel.slug}`}>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-brand-ink leading-snug hover:text-brand-terracotta transition-colors">
                      {hotel.name}
                    </h2>
                  </Link>

                  <p className="font-sans text-sm text-brand-ink-muted leading-relaxed">
                    {hotel.description}
                  </p>

                  {/* Minimal Line Amenities with 1.5px stroke */}
                  <div className="pt-2 border-t border-brand-ink-border/50">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-brand-ink-muted block mb-2">
                      PROPERTY AMENITIES &amp; SERVICES
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2.5 py-1 bg-[#FAF9F5] border border-brand-ink-border/80 text-brand-ink text-xs font-sans rounded-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Perforated Stub Footer: Rate & WhatsApp Reservation */}
                <div className="pt-5 border-t border-dashed border-brand-ink-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] text-brand-ink-muted uppercase block">
                      Direct Wholesale Rate
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono text-2xl font-bold text-brand-ink">
                        {formatPrice(hotel.pricePerNightUSD)}
                      </span>
                      <span className="font-mono text-xs text-brand-ink-muted">/ night</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBook(hotel)}
                      className="py-2.5 px-4 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Enquire on WhatsApp</span>
                    </button>

                    <Link
                      href={`/hotels/${hotel.slug}`}
                      className="p-2.5 rounded-full border border-brand-ink-border hover:border-brand-ink text-brand-ink transition-colors flex items-center justify-center"
                      title="Inspect Available Suites"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
