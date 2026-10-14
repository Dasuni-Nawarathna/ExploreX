"use client";

import React from "react";

interface WaveLineProps {
  className?: string;
  width?: number | string;
  height?: number;
  strokeWidth?: number;
  color?: string;
  animated?: boolean;
}

export function WaveLine({
  className = "",
  width = "100%",
  height = 20,
  strokeWidth = 1.5,
  color = "currentColor",
  animated = false,
}: WaveLineProps) {
  return (
    <svg
      viewBox="0 0 600 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      style={{ width, height }}
      className={`overflow-visible ${animated ? "animate-wave-draw" : ""} ${className}`}
    >
      {/* Primary elegant flowing wave derived directly from the ExploreX logo */}
      <path
        d="M0 12 C 40 4, 80 20, 120 12 C 160 4, 200 20, 240 12 C 280 4, 320 20, 360 12 C 400 4, 440 20, 480 12 C 520 4, 560 20, 600 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Compact wave underline used specifically under italic words or small section titles
 */
export function WaveUnderline({
  className = "",
  width = 90,
  color = "currentColor",
}: {
  className?: string;
  width?: number | string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height: 10 }}
      className={`inline-block ${className}`}
    >
      <path
        d="M2 6 C 18 1, 32 11, 48 6 C 64 1, 78 11, 94 6 C 104 2, 114 8, 118 6"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

