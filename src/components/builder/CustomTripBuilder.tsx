"use client";

import React, { useState, useMemo } from "react";
import { destinationsData } from "@/data/destinations";
import { vehiclesData } from "@/data/vehicles";
import { useCurrency } from "@/context/CurrencyContext";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { WaveLine, WaveUnderline } from "@/components/motifs/WaveLine";
import { XMark } from "@/components/motifs/XMark";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Hotel as HotelIcon, 
  Car, 
  ShieldCheck, 
  MessageCircle,
  Languages,
  ArrowRight,
  Check
} from "lucide-react";

export function CustomTripBuilder() {
  const { formatPrice, currency } = useCurrency();
  const { openWhatsAppModal } = useWhatsAppModal();

  const [activeTab, setActiveTab] = useState<number>(1);

  // Selection states
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([
    "Sigiriya",
    "Kandy",
    "Ella",
    "Galle"
  ]);
  const [days, setDays] = useState(8);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [accommodationTier, setAccommodationTier] = useState<"standard" | "deluxe" | "luxury">("deluxe");
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("veh-van");
  const [withGuide, setWithGuide] = useState(true);
  const [guideLanguage, setGuideLanguage] = useState("English");
  const [specialRequests, setSpecialRequests] = useState("");

  const toggleDestination = (name: string) => {
    if (selectedDestinations.includes(name)) {
      if (selectedDestinations.length > 1) {
        setSelectedDestinations(selectedDestinations.filter((d) => d !== name));
      }
    } else {
      setSelectedDestinations([...selectedDestinations, name]);
    }
  };

  // Estimate price dynamically
  const estimatedPriceUSD = useMemo(() => {
    const totalTravelers = adults + children;
    const rooms = Math.max(1, Math.ceil(adults / 2));
    
    const tierRates: Record<string, number> = {
      standard: 80,
      deluxe: 170,
      luxury: 340,
    };
    const hotelCost = (days - 1) * rooms * (tierRates[accommodationTier] || 170);

    const veh = vehiclesData.find((v) => v.id === selectedVehicleId) || vehiclesData[1];
    const vehicleCost = days * veh.pricePerDayUSD;
    const guideCost = withGuide ? days * veh.guideOptionSurchargeUSD : 0;

    const activitiesBuffer = selectedDestinations.length * 35 * totalTravelers;

    const totalEstimate = hotelCost + vehicleCost + guideCost + activitiesBuffer;
    return Math.round(totalEstimate);
  }, [selectedDestinations, days, adults, children, accommodationTier, selectedVehicleId, withGuide]);

  const selectedVehicle = vehiclesData.find((v) => v.id === selectedVehicleId) || vehiclesData[1];

  const handleLaunchWhatsApp = () => {
    openWhatsAppModal({
      itemType: "custom_trip",
      itemName: `Bespoke Sri Lanka Tour (${days} Days)`,
      refCode: "CUST-TRIP",
      travelersCount: adults + children,
      vehicleType: `${selectedVehicle.name} (${selectedVehicle.category})`,
      guideOption: withGuide ? `With Chauffeur + Licensed ${guideLanguage}-Speaking Guide` : "Chauffeur Only",
      notes: specialRequests,
      customDetails: {
        destinations: selectedDestinations,
        days,
        tier: accommodationTier === "luxury" ? "Ultra-Luxury Boutique 5★" : accommodationTier === "deluxe" ? "Superior 4★" : "Comfort 3★",
        estimatedPriceUSD
      }
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 text-brand-ink">
      
      {/* Editorial Header */}
      <div className="border-b border-brand-ink-border pb-8 space-y-4">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-brand-terracotta">
          CONVERSATIONAL EXPEDITION DESIGNER · LIVE TARIFF CALCULATOR
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-brand-ink leading-[1.08] max-w-4xl">
          Author your own <span className="italic font-light text-brand-terracotta">Sri Lankan passage</span>.
        </h1>
        <p className="font-sans text-base sm:text-lg text-brand-ink-muted max-w-2xl leading-relaxed">
          Select each waypoint, hotel style, and private vehicle. We compute live realistic private tour rates including dedicated chauffeur and fuel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Conversational Steps */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Step Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-brand-ink-border font-mono text-xs no-scrollbar">
            {[
              { num: 1, title: "01. DESTINATIONS" },
              { num: 2, title: "02. DURATION & PARTY" },
              { num: 3, title: "03. LODGING TIER" },
              { num: 4, title: "04. FLEET & GUIDE" },
            ].map((tab) => (
              <button
                key={tab.num}
                type="button"
                onClick={() => setActiveTab(tab.num)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all uppercase tracking-wider ${
                  activeTab === tab.num
                    ? "bg-brand-ink text-[#F6F5F0]"
                    : "bg-white border border-brand-ink-border text-brand-ink-muted hover:text-brand-ink"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Section 1: Destinations */}
          {(activeTab === 1 || activeTab === 0) && (
            <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-lg border border-brand-ink-border space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-brand-ink-border/60 pb-3">
                <div>
                  <span className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">STEP 01</span>
                  <h2 className="font-serif text-2xl font-normal text-brand-ink">
                    Where would you like to drop your pins?
                  </h2>
                </div>
                <span className="font-mono text-xs text-brand-ink-muted">
                  {selectedDestinations.length} localities circled
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {destinationsData.map((dest) => {
                  const isSelected = selectedDestinations.includes(dest.name);
                  return (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => toggleDestination(dest.name)}
                      className={`p-3 rounded-md border text-center transition-all flex flex-col items-center justify-between gap-2 ${
                        isSelected
                          ? "bg-white border-brand-ink ring-2 ring-brand-ink/20 shadow-xs"
                          : "bg-white border-brand-ink-border hover:border-brand-ink-muted opacity-80 hover:opacity-100"
                      }`}
                    >
                      <div className="w-full h-14 rounded-sm overflow-hidden relative bg-stone-100">
                        <img
                          src={dest.heroImage}
                          alt={dest.name}
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute top-1 right-1 bg-brand-ink text-[#F6F5F0] rounded-full p-0.5">
                            <XMark className="w-3 h-3 text-[#F6F5F0]" />
                          </div>
                        )}
                      </div>
                      <span className="font-serif text-xs text-brand-ink font-medium leading-tight">
                        {dest.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 2: Duration & Travelers */}
          {(activeTab === 2 || activeTab === 0) && (
            <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-lg border border-brand-ink-border space-y-6">
              <div className="border-b border-brand-ink-border/60 pb-3">
                <span className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">STEP 02</span>
                <h2 className="font-serif text-2xl font-normal text-brand-ink">
                  How many sunrises and who is traveling?
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-mono text-xs text-brand-ink uppercase tracking-wider">
                      Trip Duration
                    </label>
                    <span className="font-mono text-sm font-bold text-brand-ink">
                      {days} Days / {days - 1} Nights
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={21}
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full accent-[#1F3F3B] cursor-pointer"
                  />
                  <div className="flex justify-between font-mono text-[10px] text-brand-ink-muted mt-1">
                    <span>03 Days (Short focus)</span>
                    <span>10 Days (Classic)</span>
                    <span>21 Days (Grand loop)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-ink-border/50">
                  <div>
                    <label className="block font-mono text-xs text-brand-ink uppercase tracking-wider mb-2">
                      Adult Explorers (12+ yrs)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={25}
                      value={adults}
                      onChange={(e) => setAdults(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border font-mono text-sm focus:outline-none focus:border-brand-ink"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-brand-ink uppercase tracking-wider mb-2">
                      Children (under 12 yrs)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={15}
                      value={children}
                      onChange={(e) => setChildren(Math.max(0, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border font-mono text-sm focus:outline-none focus:border-brand-ink"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Accommodation Tier */}
          {(activeTab === 3 || activeTab === 0) && (
            <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-lg border border-brand-ink-border space-y-6">
              <div className="border-b border-brand-ink-border/60 pb-3">
                <span className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">STEP 03</span>
                <h2 className="font-serif text-2xl font-normal text-brand-ink">
                  Lodging Character &amp; Aesthetic
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "standard", title: "Character & Boutique 3★-4★", desc: "Heritage homes, plantation bungalows & scenic eco lodges." },
                  { id: "deluxe", title: "Superior Luxury 4★-5★", desc: "Iconic tea factories, beachfront suites, high-end safari lodges." },
                  { id: "luxury", title: "Signature Ultra-Luxury", desc: "Private pool estates, Relais & Châteaux residences, dedicated butler." }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setAccommodationTier(tier.id as any)}
                    className={`p-5 rounded-md border text-left transition-all flex flex-col gap-2 ${
                      accommodationTier === tier.id
                        ? "bg-white border-brand-ink ring-2 ring-brand-ink/20 shadow-xs"
                        : "bg-white border-brand-ink-border hover:border-brand-ink-muted"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-base text-brand-ink font-medium">{tier.title}</span>
                      {accommodationTier === tier.id && <XMark className="w-3.5 h-3.5 text-brand-terracotta" />}
                    </div>
                    <span className="font-sans text-xs text-brand-ink-muted leading-relaxed">{tier.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Fleet & Guide */}
          {(activeTab === 4 || activeTab === 0) && (
            <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-lg border border-brand-ink-border space-y-6">
              <div className="border-b border-brand-ink-border/60 pb-3">
                <span className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">STEP 04</span>
                <h2 className="font-serif text-2xl font-normal text-brand-ink">
                  Dedicated Fleet &amp; National Guide
                </h2>
              </div>

              {/* Vehicle Options */}
              <div className="space-y-3">
                <span className="font-mono text-xs text-brand-ink uppercase tracking-wider block">
                  Select Private Vehicle Model:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {vehiclesData.map((veh) => (
                    <button
                      key={veh.id}
                      type="button"
                      onClick={() => setSelectedVehicleId(veh.id)}
                      className={`p-4 rounded-md border text-left transition-all flex flex-col justify-between gap-2 ${
                        selectedVehicleId === veh.id
                          ? "bg-white border-brand-ink ring-2 ring-brand-ink/20 shadow-xs"
                          : "bg-white border-brand-ink-border hover:border-brand-ink-muted"
                      }`}
                    >
                      <div>
                        <span className="font-serif text-sm font-medium text-brand-ink block">{veh.name}</span>
                        <span className="font-mono text-[10px] text-brand-ink-muted block">{veh.model}</span>
                      </div>
                      <div className="font-mono text-xs text-brand-ink pt-2 border-t border-brand-ink-border/50 flex justify-between">
                        <span>Max {veh.passengerCapacity} pax</span>
                        <span className="font-bold">{formatPrice(veh.pricePerDayUSD)}/day</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guide Option */}
              <div className="pt-4 border-t border-brand-ink-border/60 space-y-3">
                <span className="font-mono text-xs text-brand-ink uppercase tracking-wider block">
                  Guide Services:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    onClick={() => setWithGuide(false)}
                    className={`p-4 rounded-md border cursor-pointer flex items-start gap-3 transition-all ${
                      !withGuide ? "bg-white border-brand-ink ring-2 ring-brand-ink/20" : "bg-white border-brand-ink-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="guideOption"
                      checked={!withGuide}
                      onChange={() => setWithGuide(false)}
                      className="mt-1 text-brand-ink focus:ring-brand-ink"
                    />
                    <div>
                      <span className="font-serif text-sm text-brand-ink font-medium block">Dedicated Chauffeur Only</span>
                      <span className="font-sans text-xs text-brand-ink-muted leading-relaxed">
                        Experienced tourist chauffeur for smooth road travel and local navigation.
                      </span>
                    </div>
                  </label>

                  <label
                    onClick={() => setWithGuide(true)}
                    className={`p-4 rounded-md border cursor-pointer flex items-start gap-3 transition-all ${
                      withGuide ? "bg-white border-brand-ink ring-2 ring-brand-ink/20" : "bg-white border-brand-ink-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="guideOption"
                      checked={withGuide}
                      onChange={() => setWithGuide(true)}
                      className="mt-1 text-brand-ink focus:ring-brand-ink"
                    />
                    <div className="space-y-2 w-full">
                      <div>
                        <span className="font-serif text-sm text-brand-ink font-medium block">Chauffeur + Licensed National Guide</span>
                        <span className="font-sans text-xs text-brand-ink-muted leading-relaxed">
                          SLTDA-certified national tour guide lecturer for deep temple and wildlife commentary.
                        </span>
                      </div>
                      {withGuide && (
                        <select
                          value={guideLanguage}
                          onChange={(e) => setGuideLanguage(e.target.value)}
                          className="font-mono text-xs py-1 px-2.5 rounded-sm bg-white border border-brand-ink-border text-brand-ink"
                        >
                          <option value="English">Language: English</option>
                          <option value="German">Language: German (Deutsch)</option>
                          <option value="French">Language: French (Français)</option>
                          <option value="Russian">Language: Russian (Русский)</option>
                          <option value="Spanish">Language: Spanish (Español)</option>
                        </select>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Live Journey Ticket Stub */}
        <div className="lg:col-span-4 sticky top-28 bg-[#FAF9F5] rounded-lg border border-brand-ink-border p-6 sm:p-7 space-y-6 shadow-xs">
          <div className="space-y-1 pb-4 border-b border-brand-ink-border">
            <span className="font-mono text-[10px] text-brand-terracotta uppercase tracking-[0.2em] block">
              LIVE ITINERARY SUMMARY
            </span>
            <h3 className="font-serif text-2xl font-normal text-brand-ink">
              Your Custom Journey
            </h3>
          </div>

          <div className="space-y-3 font-mono text-xs text-brand-ink">
            <div className="flex justify-between py-1 border-b border-brand-ink-border/50">
              <span className="text-brand-ink-muted">Duration:</span>
              <span className="font-medium">{days} Days / {days - 1} Nights</span>
            </div>

            <div className="flex justify-between py-1 border-b border-brand-ink-border/50">
              <span className="text-brand-ink-muted">Party:</span>
              <span className="font-medium">{adults + children} Traveler(s)</span>
            </div>

            <div className="flex justify-between py-1 border-b border-brand-ink-border/50">
              <span className="text-brand-ink-muted">Waypoints:</span>
              <span className="font-medium text-right truncate max-w-[150px]">{selectedDestinations.join(", ")}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-brand-ink-border/50">
              <span className="text-brand-ink-muted">Lodging:</span>
              <span className="font-medium capitalize">{accommodationTier}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-brand-ink-border/50">
              <span className="text-brand-ink-muted">Vehicle:</span>
              <span className="font-medium truncate max-w-[150px]">{selectedVehicle.name}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-brand-ink-border/50">
              <span className="text-brand-ink-muted">Guide:</span>
              <span className="font-medium">{withGuide ? `${guideLanguage} Guide` : "Chauffeur Only"}</span>
            </div>
          </div>

          {/* Computed Estimate */}
          <div className="p-4 rounded-md bg-white border border-brand-ink-border space-y-1.5">
            <div className="flex items-center justify-between font-mono text-xs text-brand-ink-muted">
              <span>INDICATIVE TOTAL</span>
              <span>~{formatPrice(Math.round(estimatedPriceUSD / (adults + children || 1)))}/pax</span>
            </div>
            <div className="font-mono text-3xl font-bold text-brand-ink">
              {formatPrice(estimatedPriceUSD)}
            </div>
            <p className="font-sans text-[11px] text-brand-ink-muted leading-relaxed">
              Includes boutique lodging, private vehicle, fuel, highway tolls, and driver allowances.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleLaunchWhatsApp}
            className="w-full py-3.5 px-5 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#25D366]" />
            <MessageCircle className="w-4 h-4" />
            <span>Generate WhatsApp Proposal</span>
          </button>

          <p className="font-sans text-[11px] text-brand-ink-muted text-center leading-relaxed">
            Zero commitment. Our Colombo team reviews routing efficiency and responds with an itemized proposal.
          </p>
        </div>
      </div>
    </div>
  );
}
