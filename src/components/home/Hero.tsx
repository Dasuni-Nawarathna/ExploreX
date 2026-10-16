"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  MessageCircle,
  Eye,
  ShieldCheck,
  Car
} from "lucide-react";

interface DestinationFlashCard {
  id: string;
  name: string;
  title: string;
  country: string;
  tagline: string;
  region: string;
  image: string;
  slug: string;
  rating: string;
}

// 100% Authentic, real Sri Lankan destinations & photography
const destinationCards: DestinationFlashCard[] = [
  {
    id: "sigiriya",
    name: "Sigiriya Rock",
    title: "SIGIRIYA CITADEL",
    country: "SRI LANKA",
    tagline: "5th-century royal palace in the sky & lion fortress",
    region: "CULTURAL TRIANGLE · 370M ASL",
    image: "/images/destinations/sigiriya-rock.jpg",
    slug: "sigiriya",
    rating: "UNESCO WORLD WONDER"
  },
  {
    id: "temple-tooth",
    name: "Temple of the Tooth",
    title: "SRI DALADA MALIGAWA",
    country: "SRI LANKA",
    tagline: "Sacred tooth relic & tranquil waters of Kandy Lake",
    region: "SACRED CITY OF KANDY",
    image: "/images/destinations/kandy-temple-tooth.jpg",
    slug: "kandy",
    rating: "SACRED BUDDHIST HERITAGE"
  },
  {
    id: "ella",
    name: "Nine Arch Bridge",
    title: "NINE ARCH BRIDGE",
    country: "SRI LANKA",
    tagline: "Colonial stone viaduct amidst misty tea valleys",
    region: "DEMODARA VALLEY · ELLA",
    image: "/images/destinations/ella-nine-arch.jpg",
    slug: "ella",
    rating: "ICONIC HIGHLAND RAIL"
  },
  {
    id: "galle",
    name: "Galle Fort",
    title: "GALLE DUTCH FORT",
    country: "SRI LANKA",
    tagline: "17th-century ocean ramparts, bastions & lighthouse",
    region: "SOUTHERN COAST",
    image: "/images/destinations/galle-fort-lighthouse.jpg",
    slug: "galle",
    rating: "LIVING FORTIFIED CITY"
  },
  {
    id: "yala",
    name: "Yala National Park",
    title: "YALA LEOPARD WILDS",
    country: "SRI LANKA",
    tagline: "Highest wild leopard density on earth & dry scrublands",
    region: "SOUTHERN ARID SANCTUARY",
    image: "/images/destinations/yala-leopard.jpg",
    slug: "yala",
    rating: "APEX WILDLIFE SAFARI"
  },
  {
    id: "nuwara-eliya",
    name: "Tea Highlands",
    title: "CEYLON TEA ESTATES",
    country: "SRI LANKA",
    tagline: "Emerald high-grown tea terraces & alpine mist",
    region: "CENTRAL HIGHLANDS · 1,868M",
    image: "/images/destinations/ceylon-tea-plantations.jpg",
    slug: "nuwara-eliya",
    rating: "LITTLE ENGLAND"
  },
  {
    id: "mirissa",
    name: "Mirissa Coast",
    title: "COCONUT TREE HILL",
    country: "SRI LANKA",
    tagline: "Sunset palm bluff, blue whales & turquoise ocean",
    region: "SOUTHERN TROPICAL COAST",
    image: "/images/destinations/mirissa-coconut-hill.jpg",
    slug: "mirissa",
    rating: "COASTAL PARADISE"
  },
  {
    id: "udawalawe",
    name: "Wild Elephants",
    title: "UDAWALAWE SANCTUARY",
    country: "SRI LANKA",
    tagline: "Free-roaming Asian elephant herds & wilderness",
    region: "SOUTHERN SAVANNAH",
    image: "/images/destinations/udawalawe-elephants.jpg",
    slug: "yala",
    rating: "WILD ELEPHANT REALM"
  }
];

export function Hero() {
  const router = useRouter();
  const { openWhatsAppModal } = useWhatsAppModal();

  // Active slideshow index
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-play slideshow state
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Mobile touch coordinates
  const touchStartXRef = useRef<number | null>(null);

  // Search Curator State
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const [selectedDuration, setSelectedDuration] = useState("all");

  const total = destinationCards.length;

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Reliable, smooth auto-slide timer (3.5s per slide)
  // Only pauses when the user is hovering directly on a card to inspect it
  useEffect(() => {
    if (!isAutoPlay || hoveredCard !== null) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [isAutoPlay, hoveredCard, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartXRef.current - touchEndX;
    if (deltaX > 45) {
      handleNext();
    } else if (deltaX < -45) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  const handleCardClick = (index: number, slug: string) => {
    if (index === activeSlide) {
      router.push(`/destinations/${slug}`);
    } else {
      setActiveSlide(index);
    }
  };

  const handleSearchCurator = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedRegion !== "all") params.append("region", selectedRegion);
    if (selectedStyle !== "all") params.append("style", selectedStyle);
    if (selectedDuration !== "all") params.append("duration", selectedDuration);
    
    const query = params.toString();
    router.push(`/packages${query ? `?${query}` : ""}`);
  };

  const activeCard = destinationCards[activeSlide];

  // Helper to compute circular relative offset distance: -2, -1, 0, 1, 2
  const getOffset = (cardIndex: number) => {
    let diff = (cardIndex - activeSlide) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section 
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-[#1F3F3B] text-white select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ========================================================
       * 1. DYNAMIC CINEMATIC BACKDROP
       * High-resolution blurred projection in Ceylon Deep Green
       * ======================================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {destinationCards.map((card, idx) => (
          <div
            key={card.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeSlide ? "opacity-100 scale-105" : "opacity-0 scale-110"
            }`}
          >
            <Image
              src={card.image}
              alt={card.name}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover blur-2xl brightness-[0.4] saturate-[1.15] transition-transform duration-1000"
            />
          </div>
        ))}
        {/* Rich Ceylon green & atmospheric vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#142B28] via-[#1F3F3B]/80 to-[#162E2B]/90" />
        <div className="absolute inset-0 bg-[#1F3F3B]/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(20,43,40,0.65)_100%)]" />
      </div>

      {/* ========================================================
       * 2. MAIN 3D FLASH CARDS CAROUSEL (COVER FLOW)
       * Smooth 3D perspective slider with hover reaction
       * ======================================================== */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center relative z-10 my-4 sm:my-8">
        
        {/* Outer 3D Stage with perspective */}
        <div 
          className="relative w-full h-[460px] sm:h-[530px] md:h-[580px] lg:h-[620px] flex items-center justify-center"
          style={{ perspective: "1300px" }}
        >
          {destinationCards.map((card, idx) => {
            const offset = getOffset(idx);
            const isCenter = offset === 0;
            const isLeftOne = offset === -1;
            const isRightOne = offset === 1;
            const isLeftTwo = offset === -2;
            const isRightTwo = offset === 2;
            const isVisible = Math.abs(offset) <= 2;
            const isThisHovered = hoveredCard === idx;

            // Responsive 3D transform computation
            let transform = "";
            let zIndex = 0;
            let opacity = 0;
            let brightness = 1;

            if (isCenter) {
              zIndex = 30;
              opacity = 1;
              brightness = 1.02;
              transform = isThisHovered
                ? "translate3d(0px, -12px, 90px) rotateY(0deg) scale(1.13)"
                : "translate3d(0px, 0px, 70px) rotateY(0deg) scale(1.08)";
            } else if (isLeftOne) {
              zIndex = 20;
              opacity = 0.88;
              brightness = isThisHovered ? 0.95 : 0.72;
              transform = isThisHovered
                ? "translate3d(-275px, -8px, -20px) rotateY(24deg) scale(0.91)"
                : "translate3d(-270px, 0px, -40px) rotateY(24deg) scale(0.88)";
            } else if (isRightOne) {
              zIndex = 20;
              opacity = 0.88;
              brightness = isThisHovered ? 0.95 : 0.72;
              transform = isThisHovered
                ? "translate3d(275px, -8px, -20px) rotateY(-24deg) scale(0.91)"
                : "translate3d(270px, 0px, -40px) rotateY(-24deg) scale(0.88)";
            } else if (isLeftTwo) {
              zIndex = 10;
              opacity = 0.45;
              brightness = isThisHovered ? 0.85 : 0.5;
              transform = isThisHovered
                ? "translate3d(-485px, -6px, -80px) rotateY(36deg) scale(0.74)"
                : "translate3d(-480px, 0px, -100px) rotateY(36deg) scale(0.71)";
            } else if (isRightTwo) {
              zIndex = 10;
              opacity = 0.45;
              brightness = isThisHovered ? 0.85 : 0.5;
              transform = isThisHovered
                ? "translate3d(485px, -6px, -80px) rotateY(-36deg) scale(0.74)"
                : "translate3d(480px, 0px, -100px) rotateY(-36deg) scale(0.71)";
            } else {
              zIndex = 0;
              opacity = 0;
              transform = `translate3d(${offset > 0 ? 700 : -700}px, 0px, -200px) rotateY(${offset > 0 ? -45 : 45}deg) scale(0.5)`;
            }

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(idx, card.slug)}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`absolute w-[270px] sm:w-[320px] md:w-[360px] lg:w-[390px] aspect-[9/14] sm:aspect-[9/14.5] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer select-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  !isVisible ? "pointer-events-none" : ""
                }`}
                style={{
                  transform,
                  zIndex,
                  opacity,
                  filter: `brightness(${brightness})`,
                  boxShadow: isCenter
                    ? "0 28px 70px -15px rgba(10, 25, 23, 0.9), 0 0 50px rgba(47, 93, 88, 0.45)"
                    : "0 18px 45px -10px rgba(10, 25, 23, 0.8)"
                }}
              >
                {/* Card Background Photograph */}
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  priority={idx <= 1}
                  sizes="(max-width: 768px) 320px, 420px"
                  className={`object-cover object-center transition-transform duration-1000 ${
                    isThisHovered ? "scale-105" : "scale-100"
                  }`}
                />

                {/* Archival Mat & Vignette Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30 pointer-events-none" />
                <div className="absolute inset-0 border border-white/20 rounded-2xl sm:rounded-3xl pointer-events-none" />

                {/* Active Card Subtle Ambient Backlight Rim */}
                {isCenter && (
                  <div className="absolute -inset-px rounded-2xl sm:rounded-3xl ring-2 ring-white/30 pointer-events-none" />
                )}

                {/* Card Top Pill: Region / Category */}
                <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-6 flex items-center justify-between z-10 pointer-events-none">
                  <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90 font-medium">
                    {card.rating}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-terracotta shadow-xs" />
                </div>

                {/* Card Bottom Typography */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-8 flex flex-col items-center text-center z-10 pointer-events-none">
                  
                  {/* Region kicker */}
                  <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#E88B6A] font-semibold mb-1 sm:mb-2 drop-shadow">
                    {card.region}
                  </div>

                  {/* Big Bold Headline */}
                  <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-white leading-tight drop-shadow-lg">
                    {card.title} <br />
                    <span className="font-light tracking-widest text-xs sm:text-sm text-white/90">
                      - {card.country}
                    </span>
                  </h2>

                  {/* Poetic description / tagline */}
                  <p className="font-sans text-xs sm:text-sm text-white/85 mt-2 line-clamp-2 max-w-xs font-normal drop-shadow">
                    {card.tagline}
                  </p>

                  {/* Active Card CTA Pill */}
                  {isCenter && (
                    <div className="mt-4 pointer-events-auto inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-brand-ink backdrop-blur-md border border-white/40 font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-200 shadow-lg active:scale-98">
                      <span>Explore Destination</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {/* Flanking Card Click Indicator */}
                  {!isCenter && isVisible && (
                    <span className="mt-3 font-mono text-[10px] uppercase tracking-wider text-white/60">
                      Click to view
                    </span>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================
         * 3. LEFT & RIGHT SLEEK CAROUSEL ARROWS
         * Frosted glass circular controllers on the flanks
         * ======================================================== */}
        <button
          onClick={handlePrev}
          aria-label="Previous destination"
          className="absolute left-2 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#162E2B]/75 hover:bg-[#2F5D58] border border-white/25 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xl active:scale-95 group"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-white/90 group-hover:text-white" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next destination"
          className="absolute right-2 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#162E2B]/75 hover:bg-[#2F5D58] border border-white/25 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-xl active:scale-95 group"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-white/90 group-hover:text-white" />
        </button>

      </div>

      {/* ========================================================
       * 4. BOTTOM INTERACTION BAR: PROGRESS INDICATORS & CURATOR BAR
       * ======================================================== */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6 relative z-20">
        
        {/* Navigation Indicator Dots & Slide Counter */}
        <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
          
          {/* Active slide counter & Status */}
          <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-white/80">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-brand-terracotta">
                {String(activeSlide + 1).padStart(2, "0")}
              </span>
              <span className="text-white/40">/</span>
              <span className="text-white/60">
                {String(total).padStart(2, "0")}
              </span>
            </div>
            <span className="hidden sm:inline-block text-white/30">|</span>
            <span className="hidden sm:inline-block font-sans font-medium text-white/95 truncate max-w-xs">
              {activeCard.name}
            </span>
            <button
              onClick={() => setIsAutoPlay((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 text-[10px] font-mono transition-colors ml-2"
              title={isAutoPlay ? "Pause automatic slideshow" : "Resume automatic slideshow"}
            >
              {isAutoPlay && hoveredCard === null ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="tracking-wider">SLIDESHOW</span>
                </>
              ) : (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="tracking-wider">PAUSED</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Thumb Pill Dots with Animated Progress Timer */}
          <div className="flex items-center gap-2">
            {destinationCards.map((card, i) => (
              <button
                key={card.id}
                onClick={() => setActiveSlide(i)}
                aria-label={`Jump to ${card.name}`}
                className={`relative h-2 sm:h-2.5 rounded-full overflow-hidden transition-all duration-300 ${
                  i === activeSlide
                    ? "w-10 sm:w-14 bg-white/30"
                    : "w-2.5 sm:w-3 bg-white/25 hover:bg-white/50"
                }`}
              >
                {i === activeSlide && (
                  <span
                    key={`progress-${activeSlide}`}
                    className={`absolute inset-0 bg-brand-terracotta rounded-full ${
                      isAutoPlay && hoveredCard === null ? "animate-slide-progress" : "w-full"
                    }`}
                    style={{ animationDuration: "3500ms" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Direct WhatsApp Consultation Shortcut */}
          <button
            onClick={() => {
              openWhatsAppModal({
                itemType: "general",
                itemId: activeCard.id,
                itemName: activeCard.name,
                travelersCount: 2,
                notes: `Hello ExploreX! I want to plan a journey visiting ${activeCard.name}.`
              });
            }}
            className="hidden md:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/85 hover:text-white transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366]" />
            <span>Consult Island Specialist →</span>
          </button>
        </div>

        {/* Refined Glassmorphism Discovery Console in Ceylon Deep Forest Green */}
        <form
          onSubmit={handleSearchCurator}
          className="bg-[#162E2B]/85 backdrop-blur-xl rounded-2xl sm:rounded-full border border-[#3D7A73]/35 p-2.5 sm:p-3 shadow-[0_20px_50px_rgba(10,25,23,0.65)] hover:border-[#3D7A73]/60 transition-all"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-2 items-center">
            
            {/* Region Selector */}
            <div className="lg:col-span-4 px-4 py-2 hover:bg-white/10 rounded-xl sm:rounded-full transition-colors">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-terracotta font-semibold mb-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Region &amp; Highlights</span>
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-transparent font-sans text-xs sm:text-sm text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#1F3F3B] text-white">All Sri Lankan Highlights</option>
                <option value="cultural-triangle" className="bg-[#1F3F3B] text-white">Cultural Triangle (Sigiriya &amp; Kandy)</option>
                <option value="hill-country" className="bg-[#1F3F3B] text-white">Highland Tea Estates (Ella &amp; Nuwara Eliya)</option>
                <option value="wildlife" className="bg-[#1F3F3B] text-white">Wild Sanctuaries (Yala &amp; Udawalawe)</option>
                <option value="southern-coast" className="bg-[#1F3F3B] text-white">Southern Shores (Galle &amp; Mirissa)</option>
                <option value="east-coast" className="bg-[#1F3F3B] text-white">East Coast (Trincomalee &amp; Arugam Bay)</option>
              </select>
            </div>

            {/* Style Selector */}
            <div className="lg:col-span-3 px-4 py-2 border-t sm:border-t-0 sm:border-l border-white/15 hover:bg-white/10 rounded-xl sm:rounded-full transition-colors">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-terracotta font-semibold mb-0.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Travel Style</span>
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full bg-transparent font-sans text-xs sm:text-sm text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#1F3F3B] text-white">Any Expedition Style</option>
                <option value="Culture" className="bg-[#1F3F3B] text-white">Ancient Citadels &amp; UNESCO</option>
                <option value="Wildlife" className="bg-[#1F3F3B] text-white">Leopard &amp; Elephant Safaris</option>
                <option value="Honeymoon" className="bg-[#1F3F3B] text-white">Romantic Villa Escapes</option>
                <option value="Scenic Train" className="bg-[#1F3F3B] text-white">Scenic Highlands &amp; Rail</option>
                <option value="Beaches" className="bg-[#1F3F3B] text-white">Tropical Coast &amp; Ocean</option>
              </select>
            </div>

            {/* Duration Selector */}
            <div className="lg:col-span-2 px-4 py-2 border-t sm:border-t-0 sm:border-l border-white/15 hover:bg-white/10 rounded-xl sm:rounded-full transition-colors">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-terracotta font-semibold mb-0.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Duration</span>
              </label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full bg-transparent font-sans text-xs sm:text-sm text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-[#1F3F3B] text-white">Any Duration</option>
                <option value="short" className="bg-[#1F3F3B] text-white">5 – 7 Days</option>
                <option value="medium" className="bg-[#1F3F3B] text-white">8 – 10 Days</option>
                <option value="long" className="bg-[#1F3F3B] text-white">10 – 14 Days</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="lg:col-span-3 px-1">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-brand-terracotta hover:bg-[#A95436] text-white font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-98"
              >
                <span>Find Journeys</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </form>

      </div>
    </section>
  );
}
