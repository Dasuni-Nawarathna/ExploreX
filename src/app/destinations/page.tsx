"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { destinationsData } from "@/data/destinations";
import { DestinationCategory, RegionType } from "@/types";
import { WaveLine } from "@/components/motifs/WaveLine";
import { XMark } from "@/components/motifs/XMark";
import { Search, ArrowRight, Compass } from "lucide-react";

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const regions: (string | RegionType)[] = [
    "All",
    "Cultural Triangle",
    "Central Highlands",
    "Southern Coast",
    "Eastern Coast",
    "Northern Peninsula"
  ];

  const categories: (string | DestinationCategory)[] = [
    "All",
    "Culture",
    "Beach",
    "Wildlife",
    "Hill Country",
    "Adventure"
  ];

  const filteredDestinations = useMemo(() => {
    return destinationsData.filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.region.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion =
        selectedRegion === "All" || dest.region === selectedRegion;

      const matchesCategory =
        selectedCategory === "All" ||
        dest.category.includes(selectedCategory as DestinationCategory);

      return matchesSearch && matchesRegion && matchesCategory;
    });
  }, [searchQuery, selectedRegion, selectedCategory]);

  return (
    <div className="py-16 sm:py-24 space-y-16 bg-[#F6F5F0] min-h-screen text-brand-ink">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-brand-ink-border pb-8">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-brand-terracotta mb-3">
            CARTOGRAPHIC INDEX · ISLAND LOCALITIES
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-brand-ink leading-[1.08] max-w-4xl">
            From misty cloud forests to the <br />
            <span className="italic font-light text-brand-terracotta">warm southern ocean rim</span>.
          </h1>
          <p className="font-sans text-base sm:text-lg text-brand-ink-muted max-w-2xl mt-4 leading-relaxed">
            Ten distinct bioclimatic zones within four hours of driving. Historical kingdoms, sacred highland summits, and undisturbed coastal lagoons.
          </p>
        </div>

        {/* Minimal Search & Filter Index */}
        <div className="bg-[#FAF9F5] p-5 sm:p-6 rounded-lg border border-brand-ink-border space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-brand-ink-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by locality, province, or keyword (e.g. Sigiriya, Ella, Galle, Yala)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-brand-ink-border rounded-md text-brand-ink placeholder:text-brand-ink-faint text-xs font-sans focus:outline-none focus:border-brand-ink"
            />
          </div>

          {/* Region Tabs */}
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-brand-ink-muted block">
              REGIONAL ZONES:
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {regions.map((reg) => {
                const active = selectedRegion === reg;
                return (
                  <button
                    key={reg}
                    onClick={() => setSelectedRegion(reg)}
                    className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-all ${
                      active
                        ? "bg-brand-ink text-[#F6F5F0]"
                        : "bg-white border border-brand-ink-border text-brand-ink-muted hover:text-brand-ink hover:border-brand-ink"
                    }`}
                  >
                    {reg}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="space-y-1.5 pt-2 border-t border-brand-ink-border/50">
            <span className="font-mono text-[10px] uppercase tracking-wider text-brand-ink-muted block">
              EXPERIENCE CATEGORY:
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-all ${
                      active
                        ? "bg-brand-terracotta text-[#F6F5F0]"
                        : "bg-white border border-brand-ink-border text-brand-ink-muted hover:text-brand-ink hover:border-brand-ink"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Cartographic Destination Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between font-mono text-xs text-brand-ink-muted pb-2 border-b border-brand-ink-border">
          <span>
            RECORDED LOCALITIES: <strong className="text-brand-ink">{filteredDestinations.length}</strong>
          </span>
          {(selectedRegion !== "All" || selectedCategory !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setSelectedRegion("All");
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-brand-terracotta hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest, i) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="bg-white border border-brand-ink-border rounded-lg overflow-hidden shadow-xs hover:border-brand-ink transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 w-full overflow-hidden bg-stone-100">
                    <img
                      src={dest.heroImage}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#1F3F3B]/90 backdrop-blur-xs text-[#F6F5F0] px-3 py-1 rounded-sm font-mono text-[10px] uppercase tracking-wider">
                      {dest.region}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 text-brand-ink px-2.5 py-1 rounded-sm font-mono text-[10px] tracking-wider border border-brand-ink-border">
                      {dest.bestSeason}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="space-y-1">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-terracotta">
                        {dest.coordinates.lat.toFixed(4)}° N · {dest.coordinates.lng.toFixed(4)}° E
                      </div>
                      <h2 className="font-serif text-2xl font-normal text-brand-ink group-hover:text-brand-terracotta transition-colors">
                        {dest.name}
                      </h2>
                      <p className="font-sans text-xs text-brand-ink-muted italic">
                        {dest.subtitle}
                      </p>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-brand-ink-muted line-clamp-3 leading-relaxed">
                      {dest.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {dest.category.map((c) => (
                        <span
                          key={c}
                          className="px-2 py-0.5 rounded-sm bg-[#FAF9F5] border border-brand-ink-border text-brand-ink font-mono text-[10px]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-3 border-t border-brand-ink-border/60 flex items-center justify-between font-mono text-xs text-brand-ink group-hover:text-brand-terracotta bg-[#FAF9F5]">
                  <span>Field Coordinates &amp; Guides</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-brand-ink-border rounded-lg space-y-3">
            <p className="font-sans text-sm text-brand-ink-muted">No localities matched your active search query.</p>
            <button
              onClick={() => {
                setSelectedRegion("All");
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-full bg-brand-ink text-[#F6F5F0] font-sans text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
