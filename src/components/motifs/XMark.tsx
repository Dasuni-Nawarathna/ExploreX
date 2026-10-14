"use client";

import React from "react";

interface XMarkProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export function XMark({
  className = "",
  size = 20,
  strokeWidth = 2,
  color = "currentColor",
}: XMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size }}
      className={`inline-block shrink-0 ${className}`}
    >
      {/* Down-right stroke with subtle calligraphic taper */}
      <path
        d="M4.5 4.5 C 8 8, 16 16, 19.5 19.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Up-right stroke with elegant flared swoosh tip */}
      <path
        d="M19.5 4.5 C 16.5 8.5, 7.5 15.5, 4.5 19.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Tiny subtle center knot or serif flare */}
      <circle cx="12" cy="12" r="1.2" fill={color} />
    </svg>
  );
}

/**
 * "X marks the spot" map pin and coordinate marker
 */
export function XSpotPin({
  className = "",
  size = 28,
  active = false,
}: {
  className?: string;
  size?: number;
  active?: boolean;
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 ${
        active
          ? "bg-brand-ink text-brand-paper shadow-md"
          : "bg-brand-paper text-brand-ink border border-brand-ink-border hover:border-brand-terracotta"
      } ${className}`}
    >
      <XMark size={size * 0.55} color="currentColor" strokeWidth={2.2} />
    </div>
  );
}

