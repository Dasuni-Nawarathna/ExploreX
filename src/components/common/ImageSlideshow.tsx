"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface ImageSlideshowProps {
  images: string[];
  alt: string;
  aspectRatio?: string; // e.g., "aspect-[16/10]", "aspect-[4/3]"
  autoPlay?: boolean;
  interval?: number; // ms
  showThumbnails?: boolean;
  className?: string;
}

export function ImageSlideshow({
  images,
  alt,
  aspectRatio = "aspect-[16/10]",
  autoPlay = false,
  interval = 5000,
  showThumbnails = true,
  className = "",
}: ImageSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const safeImages = images && images.length > 0 ? images : ["https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80"];

  useEffect(() => {
    if (!autoPlay || isHovered || safeImages.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeImages.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovered, safeImages.length, interval]);

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % safeImages.length);
  };

  return (
    <div
      className={`relative w-full overflow-hidden select-none group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Slide Container */}
      <div className={`relative w-full ${aspectRatio} rounded-3xl overflow-hidden bg-stone-900 shadow-md`}>
        {safeImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={src}
              alt={`${alt} slide ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1200px"
              className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Gradient shadow for text / controls */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Counter Badge */}
        {safeImages.length > 1 && (
          <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold tracking-wider">
            {currentIndex + 1} / {safeImages.length}
          </div>
        )}

        {/* Fullscreen Preview Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLightboxOpen(true);
          }}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          title="View Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Left / Right Arrow Controls */}
        {safeImages.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-900 shadow-lg backdrop-blur-sm opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-900 shadow-lg backdrop-blur-sm opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Slide Indicators Dots */}
        {safeImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {safeImages.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-7 h-2 bg-amber-400"
                    : "w-2 h-2 bg-white/70 hover:bg-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {showThumbnails && safeImages.length > 1 && (
        <div className="flex items-center gap-2.5 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {safeImages.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                idx === currentIndex
                  ? "border-brand-gold shadow-md scale-105"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Fullscreen Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-[75vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={safeImages[currentIndex]}
              alt={`${alt} fullscreen ${currentIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          {safeImages.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
