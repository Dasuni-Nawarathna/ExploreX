import React from "react";
import Link from "next/link";
import { Compass, Home, Search, MapPin, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto text-brand-darkTeal shadow-sm">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
            404 • Destination Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Off the Beaten Path
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
            The page or island itinerary you are searching for might have relocated or is being updated by our travel planners.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold text-stone-950 text-xs font-bold shadow-md hover:bg-amber-400 transition"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            href="/packages"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-50 text-brand-darkTeal border border-teal-200 text-xs font-bold hover:bg-teal-100 transition"
          >
            <Compass className="w-4 h-4" />
            <span>Browse Tour Packages</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

