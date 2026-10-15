import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { 
  Award, 
  ShieldCheck, 
  HeartHandshake, 
  Users, 
  MapPin, 
  Sparkles,
  CheckCircle2,
  Compass
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | ExploreX Sri Lanka Travel Agency",
  description: "Learn about ExploreX, Sri Lanka's dedicated tailor-made tour operator. Meet our local team of destination specialists, chauffeurs, and conservation partners."
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 text-brand-teal text-xs font-bold tracking-wide">
          <Compass className="w-3.5 h-3.5" />
          <span>Our Heritage & Vision</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Crafting the Finest Island Memories Since 2014
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          ExploreX was founded by a passionate collective of Sri Lankan naturalists, cultural historians, and logistics specialists with a single mission: to reveal the authentic, untamed soul of Ceylon.
        </p>
      </div>

      {/* Story & Image Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-stone-900">
              The ExploreX Story
            </h2>
            <div className="space-y-4 text-sm text-stone-600 leading-relaxed">
              <p>
                From the misty green ridges of the high tea country to the golden ocean ramparts of Galle Fort, Sri Lanka is a land of staggering contrasts and genuine human warmth. But too often, visitors find themselves trapped in rigid, impersonal tour buses.
              </p>
              <p>
                ExploreX was born to redefine island travel. We believe your holiday should be as unique as you are. Whether you dream of tracking leopards through the thorny scrublands of Yala with a veteran tracker, sipping single-estate tea in a 1930s converted factory, or taking the iconic blue passenger train to Ella with your luggage taken care of ahead — our team delivers perfection.
              </p>
              <p>
                Today, ExploreX is officially licensed and bonded with the Sri Lanka Tourism Development Authority (SLTDA), operating our own fleet of modern luxury vehicles with offices in Colombo and Kandy.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100">
                <span className="text-3xl font-extrabold text-brand-teal block">850+</span>
                <span className="text-xs text-stone-600 font-semibold">Tours Completed</span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                <span className="text-3xl font-extrabold text-amber-700 block">4.9 / 5</span>
                <span className="text-xs text-stone-600 font-semibold">Average Rating</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-96 sm:h-[460px]">
            <img
              src="https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80"
              alt="Sri Lanka tea trails and highlands"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white space-y-1">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                Local Expertise
              </span>
              <h4 className="text-lg font-bold">100% Sri Lankan Owned & Operated</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              Our Guiding Principles
            </h3>
            <p className="text-xs sm:text-sm text-stone-500">
              Responsible, respectful, and relentlessly customer-centric.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-3xl bg-[#FAF9F6] border border-stone-200/80 space-y-3">
              <div className="p-3 w-fit rounded-xl bg-teal-100 text-brand-teal">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-stone-900">Uncompromising Safety</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Modern insured vehicles, seatbelts for all passengers, and strictly licensed chauffeurs with continuous defensive driving training.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#FAF9F6] border border-stone-200/80 space-y-3">
              <div className="p-3 w-fit rounded-xl bg-teal-100 text-brand-teal">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-stone-900">Ethical Wildlife Tourism</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                We boycott elephant riding camps and only take our travelers to ethical open-habitat national parks and registered transit orphanages.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#FAF9F6] border border-stone-200/80 space-y-3">
              <div className="p-3 w-fit rounded-xl bg-teal-100 text-brand-teal">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-stone-900">Direct Local Empowerment</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Over 90% of your holiday expenditure stays within Sri Lankan communities, supporting local village families, farmers, and naturalists.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

