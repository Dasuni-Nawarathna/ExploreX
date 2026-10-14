import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "white";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ variant = "dark", className = "", size = "md" }: LogoProps) {
  const dimensions = {
    sm: { width: 140, height: 35 },
    md: { width: 180, height: 45 },
    lg: { width: 220, height: 55 },
  }[size];

  const logoSrc = variant === "white" ? "/logo-white.svg" : "/logo.svg";

  return (
    <Link href="/" className={`inline-flex items-center gap-2 group ${className}`}>
      <Image
        src={logoSrc}
        alt="ExploreX Travel Agency"
        width={dimensions.width}
        height={dimensions.height}
        priority
        className="h-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
      />
    </Link>
  );
}

