"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { destinationsData } from "@/data/destinations";
import { MapPin, Calendar, Users, Search } from "lucide-react";

export function SearchBar() {
  const router = useRouter();
  const [selectedDest, setSelectedDest] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [travelers, setTravelers] = useState(2);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDest) {
      router.push(`/destinations/${selectedDest}`);
    } else {
      router.push("/packages");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl p-3 sm:p-5 shadow-2xl border border-white/70 flex flex-col md:flex-row items-center gap-2 sm:gap-4 ring-1 ring-black/5"
    >
      {/* Destination Select */}
      <div className="w-full md:flex-1 px-4 py-2.5 hover:bg-stone-50 rounded-2xl transition-colors">
        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
          <MapPin className="w-4 h-4 text-brand-teal" />
          Where in Sri Lanka?
        </label>
        <select
          value={selectedDest}
          onChange={(e) => setSelectedDest(e.target.value)}
          className="w-full bg-transparent text-sm sm:text-base font-bold text-stone-900 focus:outline-none cursor-pointer"
        >
          <option value="">All Sri Lankan Highlights</option>
          {destinationsData.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.name} ({d.region})
            </option>
          ))}
        </select>
      </div>

      <div className="hidden md:block w-px h-12 bg-stone-200" />

      {/* Season / Dates */}
      <div className="w-full md:flex-1 px-4 py-2.5 hover:bg-stone-50 rounded-2xl transition-colors">
        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
          <Calendar className="w-4 h-4 text-brand-teal" />
          When are you traveling?
        </label>
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
          className="w-full bg-transparent text-sm sm:text-base font-bold text-stone-900 focus:outline-none cursor-pointer"
        >
          <option value="">Any Time of Year</option>
          <option value="nov-apr">Nov - Apr (South & West Coast Peak)</option>
          <option value="may-oct">May - Oct (East Coast & Safari Peak)</option>
          <option value="dec-jan">Dec - Jan (Festive Holidays)</option>
          <option value="jul-aug">Jul - Aug (Summer Safari & Perahera)</option>
        </select>
      </div>

      <div className="hidden md:block w-px h-12 bg-stone-200" />

      {/* Travelers */}
      <div className="w-full md:w-48 px-4 py-2.5 hover:bg-stone-50 rounded-2xl transition-colors">
        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
          <Users className="w-4 h-4 text-brand-teal" />
          Travelers
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            max={30}
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
            className="w-16 bg-transparent text-sm sm:text-base font-bold text-stone-900 focus:outline-none"
          />
          <span className="text-sm font-medium text-stone-500">guest(s)</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full md:w-auto px-8 py-4 sm:py-4.5 rounded-2xl bg-brand-gold hover:bg-brand-gold-hover text-stone-950 font-extrabold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 active:scale-95 shrink-0"
      >
        <Search className="w-5 h-5 stroke-[2.5]" />
        <span>Explore Tours</span>
      </button>
    </form>
  );
}
