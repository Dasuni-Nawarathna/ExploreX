"use client";

import React, { useEffect, useRef, useState } from "react";
import { destinationsData } from "@/data/destinations";
import { hotelsData } from "@/data/hotels";
import { packagesData } from "@/data/packages";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { useCurrency } from "@/context/CurrencyContext";
import { XMark } from "@/components/motifs/XMark";
import { 
  MapPin, 
  Hotel as HotelIcon, 
  Compass, 
  Layers, 
  MessageCircle,
  ArrowRight,
  X
} from "lucide-react";

export function SriLankaMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const layersGroupRef = useRef<any>(null);
  const polylineGroupRef = useRef<any>(null);

  const { openWhatsAppModal } = useWhatsAppModal();
  const { formatPrice } = useCurrency();

  const [activeFilter, setActiveFilter] = useState<"all" | "destinations" | "hotels" | "packages">("all");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedRoutePackage, setSelectedRoutePackage] = useState<string>("pkg-island-odyssey");

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let isMounted = true;

    async function initMap() {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (!isMounted || !mapContainerRef.current) return;

      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [7.8731, 80.7718],
          zoom: 8,
          minZoom: 7,
          maxZoom: 16,
          scrollWheelZoom: true,
        });

        // OpenStreetMap Tile Layer: 100% free, reliable, no API key required, zero watermarks
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
          maxZoom: 19,
          className: "map-tiles-vintage",
        }).addTo(map);

        layersGroupRef.current = L.layerGroup().addTo(map);
        polylineGroupRef.current = L.layerGroup().addTo(map);
        mapInstanceRef.current = map;
      }

      renderMarkers(L);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !mapInstanceRef.current) return;
    import("leaflet").then((LModule) => {
      renderMarkers(LModule.default);
    });
  }, [activeFilter, selectedRoutePackage]);

  const renderMarkers = (L: any) => {
    if (!layersGroupRef.current || !polylineGroupRef.current) return;

    layersGroupRef.current.clearLayers();
    polylineGroupRef.current.clearLayers();

    // 1. Destinations Markers (Teal Palm Seal)
    if (activeFilter === "all" || activeFilter === "destinations") {
      destinationsData.forEach((dest) => {
        const destIcon = L.divIcon({
          className: "custom-dest-pin",
          html: `
            <div style="background-color: #1F3F3B; color: #F6F5F0; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(31,63,59,0.35); border: 2px solid #F6F5F0; cursor: pointer;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], { icon: destIcon });
        marker.on("click", () => {
          setSelectedItem({ type: "destination", data: dest });
        });
        marker.addTo(layersGroupRef.current);
      });
    }

    // 2. Hotel Markers (Terracotta Pin)
    if (activeFilter === "all" || activeFilter === "hotels") {
      hotelsData.forEach((hotel) => {
        const hotelIcon = L.divIcon({
          className: "custom-hotel-pin",
          html: `
            <div style="background-color: #C46A4A; color: #FFFFFF; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(196,106,74,0.4); border: 2px solid #FFFFFF; cursor: pointer;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 22v-6.57"/><path d="M12 11h.01"/><path d="M14 15.43V22"/><path d="M16 16h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/><path d="M4 12V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5"/>
              </svg>
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        });

        const marker = L.marker([hotel.coordinates.lat, hotel.coordinates.lng], { icon: hotelIcon });
        marker.on("click", () => {
          setSelectedItem({ type: "hotel", data: hotel });
        });
        marker.addTo(layersGroupRef.current);
      });
    }

    // 3. Tour Package Route Lines (Terracotta dashed line)
    if (activeFilter === "all" || activeFilter === "packages") {
      const activePkg = packagesData.find((p) => p.id === selectedRoutePackage) || packagesData[0];
      if (activePkg && activePkg.route.length > 1) {
        const latlngs = activePkg.route.map((pt) => [pt.lat, pt.lng]);
        
        const polyline = L.polyline(latlngs, {
          color: "#C46A4A",
          weight: 3.5,
          opacity: 0.9,
          dashArray: "6, 6",
          lineJoin: "round",
        }).addTo(polylineGroupRef.current);

        activePkg.route.forEach((stop, idx) => {
          const stopIcon = L.divIcon({
            className: "route-stop-pin",
            html: `
              <div style="background-color: #1F3F3B; color: #F6F5F0; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: monospace; font-size: 10px; font-weight: 700; border: 2px solid #FFFFFF; box-shadow: 0 2px 8px rgba(0,0,0,0.25);">
                ${idx + 1}
              </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          });

          const stopMarker = L.marker([stop.lat, stop.lng], { icon: stopIcon });
          stopMarker.bindTooltip(`<b>Waypoint ${idx + 1}:</b> ${stop.name}`, { direction: "top", offset: [0, -10] });
          stopMarker.addTo(polylineGroupRef.current);
        });
      }
    }
  };

  const handleBookSelectedItem = () => {
    if (!selectedItem) return;
    if (selectedItem.type === "hotel") {
      openWhatsAppModal({
        itemType: "hotel",
        itemId: selectedItem.data.id,
        itemName: selectedItem.data.name,
        refCode: selectedItem.data.refCode,
        hotelSelection: selectedItem.data.name,
        travelersCount: 2,
        roomsCount: 1,
      });
    } else if (selectedItem.type === "destination") {
      openWhatsAppModal({
        itemType: "general",
        itemName: `Holiday to ${selectedItem.data.name}`,
        travelersCount: 2,
        notes: `I'm interested in visiting ${selectedItem.data.name} and nearby highlights.`
      });
    }
  };

  return (
    <div className="relative w-full h-[620px] sm:h-[700px] rounded-lg overflow-hidden border border-brand-ink-border bg-[#F6F5F0] text-brand-ink">
      
      {/* Map Filter Controls Bar (Top Left) */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 max-w-[90%] sm:max-w-none font-mono text-xs">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            activeFilter === "all"
              ? "bg-brand-ink text-[#F6F5F0] shadow-xs"
              : "bg-white/95 border border-brand-ink-border text-brand-ink hover:bg-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Cartography</span>
        </button>

        <button
          onClick={() => setActiveFilter("destinations")}
          className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            activeFilter === "destinations"
              ? "bg-brand-ink text-[#F6F5F0] shadow-xs"
              : "bg-white/95 border border-brand-ink-border text-brand-ink hover:bg-white"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-brand-ink" />
          <span>Localities</span>
        </button>

        <button
          onClick={() => setActiveFilter("hotels")}
          className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            activeFilter === "hotels"
              ? "bg-brand-terracotta text-[#F6F5F0] shadow-xs"
              : "bg-white/95 border border-brand-ink-border text-brand-ink hover:bg-white"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-brand-terracotta" />
          <span>Curated Stays</span>
        </button>

        <button
          onClick={() => setActiveFilter("packages")}
          className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-all flex items-center gap-1.5 ${
            activeFilter === "packages"
              ? "bg-brand-ink text-[#F6F5F0] shadow-xs"
              : "bg-white/95 border border-brand-ink-border text-brand-ink hover:bg-white"
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-brand-terracotta" />
          <span>Itinerary Routes</span>
        </button>
      </div>

      {/* Tour Route Selector Dropdown (Top Right when Routes enabled) */}
      {(activeFilter === "all" || activeFilter === "packages") && (
        <div className="absolute top-4 right-4 z-20 hidden sm:block bg-white/95 backdrop-blur-md rounded-md p-2 shadow-xs border border-brand-ink-border font-mono text-xs">
          <label className="block text-[10px] uppercase tracking-wider text-brand-ink-muted px-2 mb-1">
            Display Route:
          </label>
          <select
            value={selectedRoutePackage}
            onChange={(e) => setSelectedRoutePackage(e.target.value)}
            className="text-xs bg-[#FAF9F5] border border-brand-ink-border rounded-sm px-2.5 py-1.5 text-brand-ink focus:outline-none focus:border-brand-ink"
          >
            {packagesData.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.durationDays}D · {pkg.name.slice(0, 30)}...
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Leaflet Container */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Map Legend (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-20 hidden md:flex items-center gap-4 bg-white/95 backdrop-blur-xs px-4 py-2 rounded-md shadow-xs border border-brand-ink-border font-mono text-[11px] text-brand-ink">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-brand-ink inline-block" />
          <span>Locality Pin</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-brand-terracotta inline-block" />
          <span>Boutique Stay</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 border-t border-dashed border-brand-terracotta inline-block" />
          <span>Expedition Route</span>
        </div>
      </div>

      {/* Postcard Preview Card Drawer */}
      {selectedItem && (
        <div className="absolute bottom-4 right-4 z-30 w-[92%] sm:w-80 bg-white rounded-lg shadow-xl border border-brand-ink-border overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
          <div className="relative h-32 w-full bg-stone-100">
            <img
              src={selectedItem.data.heroImage}
              alt={selectedItem.data.name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black text-xs"
              aria-label="Close card"
            >
              ✕
            </button>
            <div className="absolute top-2 left-2">
              <span className="px-2 py-0.5 rounded-sm bg-[#1F3F3B]/90 text-[#F6F5F0] font-mono text-[9px] uppercase tracking-wider">
                {selectedItem.type === "hotel" ? selectedItem.data.type : selectedItem.data.region}
              </span>
            </div>
          </div>

          <div className="p-4 space-y-3 bg-[#FAF9F5]">
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-base font-medium text-brand-ink">{selectedItem.data.name}</h4>
                {selectedItem.type === "hotel" && (
                  <span className="font-mono text-xs text-brand-terracotta">
                    {"★".repeat(selectedItem.data.starRating)}
                  </span>
                )}
              </div>
              <p className="font-sans text-xs text-brand-ink-muted line-clamp-2 mt-1 leading-relaxed">
                {selectedItem.type === "hotel" ? selectedItem.data.description : selectedItem.data.summary}
              </p>
            </div>

            {selectedItem.type === "hotel" && (
              <div className="font-mono text-xs text-brand-ink flex items-center justify-between pt-2 border-t border-brand-ink-border/50">
                <span className="text-brand-ink-muted">Rate From:</span>
                <span className="font-bold">{formatPrice(selectedItem.data.pricePerNightUSD)} / night</span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleBookSelectedItem}
                className="flex-1 py-2 px-3 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 active:scale-98"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enquire</span>
              </button>
              <a
                href={selectedItem.type === "hotel" ? `/hotels/${selectedItem.data.slug}` : `/destinations/${selectedItem.data.slug}`}
                className="px-3 py-2 rounded-full border border-brand-ink-border bg-white text-brand-ink hover:border-brand-ink font-mono text-xs transition-colors"
              >
                Inspect
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
