"use client";

import React from "react";

interface CircularStampProps {
  text?: string;
  subtext?: string;
  size?: number;
  className?: string;
  spinning?: boolean;
}

export function CircularStamp({
  text = "EXPLORE SRI LANKA · FIELD JOURNAL · EST. 2026 ·",
  subtext = "07° 57' N · 80° 45' E",
  size = 140,
  className = "",
  spinning = true,
}: CircularStampProps) {
  const pathId = React.useId();

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      {/* Outer rotating text ring */}
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full text-brand-ink/80 ${spinning ? "animate-spin-slow" : ""}`}
      >
        <defs>
          <path
            id={pathId}
            d="M 100, 100 m -74, 0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
          />
        </defs>

        {/* Outer hairline circle */}
        <circle
          cx="100"
          cy="100"
          r="94"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.5"
        />

        {/* Secondary inner circle */}
        <circle
          cx="100"
          cy="100"
          r="54"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />

        {/* Circular text along path */}
        <text
          fill="currentColor"
          className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em]"
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center stationary emblem */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-4">
        {/* Minimal Palm Silhouette */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-5 h-5 text-brand-ink mb-0.5"
        >
          {/* Palm trunk */}
          <path
            d="M12 21 C 12 16, 11 12, 10 9 C 11 9, 12 14, 13 21 Z"
            fill="currentColor"
          />
          {/* Palm leaves */}
          <path
            d="M10 9 C 8 7, 5 7, 4 9 C 6 10, 8 9, 10 9 Z"
            fill="currentColor"
          />
          <path
            d="M10 9 C 8 5, 6 4, 5 5 C 6 7, 8 8, 10 9 Z"
            fill="currentColor"
          />
          <path
            d="M10 9 C 10 5, 11 4, 12 4 C 12 6, 11 8, 10 9 Z"
            fill="currentColor"
          />
          <path
            d="M10 9 C 12 5, 15 5, 16 7 C 14 8, 12 8, 10 9 Z"
            fill="currentColor"
          />
          <path
            d="M10 9 C 14 8, 16 10, 17 12 C 15 12, 13 11, 10 9 Z"
            fill="currentColor"
          />
        </svg>
        <span className="font-mono text-[8.5px] uppercase tracking-wider text-brand-terracotta font-semibold leading-tight">
          {subtext}
        </span>
      </div>
    </div>
  );
}

