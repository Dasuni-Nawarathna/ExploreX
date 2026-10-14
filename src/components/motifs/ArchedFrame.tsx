"use client";

import React from "react";
import Image from "next/image";

interface ArchedFrameProps {
  src: string;
  alt: string;
  caption?: string;
  coordinates?: string;
  className?: string;
  variant?: "doorway" | "circle" | "arch-subtle";
  aspectRatio?: string;
  priority?: boolean;
}

export function ArchedFrame({
  src,
  alt,
  caption,
  coordinates,
  className = "",
  variant = "doorway",
  aspectRatio = "aspect-[3/4]",
  priority = false,
}: ArchedFrameProps) {
  // Shape masking classes:
  // "doorway" = architectural temple doorway: large top arch (rounded-t-[140px] sm:rounded-t-[180px]) with squared 4px bottom
  // "circle" = pure circle
  // "arch-subtle" = softly arched top (rounded-t-[60px])
  const shapeClass = {
    doorway: "rounded-t-[140px] sm:rounded-t-[180px] rounded-b-[4px]",
    circle: "rounded-full aspect-square",
    "arch-subtle": "rounded-t-[48px] rounded-b-[4px]",
  }[variant];

  return (
    <figure className={`relative group ${className}`}>
      {/* Outer frame container with hairline border */}
      <div
        className={`relative w-full overflow-hidden bg-brand-sand/40 border border-brand-ink-border ${shapeClass} ${aspectRatio}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:contrast-[1.03]"
        />

        {/* Subtle warm archival photo overlay */}
        <div className="absolute inset-0 bg-[#F6F5F0]/10 mix-blend-multiply pointer-events-none" />
      </div>

      {/* Editorial caption annotation */}
      {(caption || coordinates) && (
        <figcaption className="mt-3 flex items-baseline justify-between text-brand-ink-muted text-xs">
          {caption && (
            <span className="font-serif italic text-brand-ink text-sm">
              {caption}
            </span>
          )}
          {coordinates && (
            <span className="font-mono text-[11px] tracking-widest text-brand-terracotta uppercase ml-auto">
              {coordinates}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

