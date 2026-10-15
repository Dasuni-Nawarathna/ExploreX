"use client";

import React, { useState } from "react";
import { Hotel } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { 
  MessageCircle, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Sparkles,
  BedDouble
} from "lucide-react";

export function HotelClientActions({ hotel }: { hotel: Hotel }) {
  const { formatPrice } = useCurrency();
  const { openWhatsAppModal } = useWhatsAppModal();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [selectedRoomType, setSelectedRoomType] = useState(hotel.roomTypes[0]?.name || "Standard");

  const handleBookViaWhatsApp = () => {
    openWhatsAppModal({
      itemType: "hotel",
      itemId: hotel.id,
      itemName: hotel.name,
      refCode: hotel.refCode,
      destinationId: hotel.destinationId,
      hotelSelection: `${hotel.name} (${selectedRoomType})`,
      travelDate: checkIn || undefined,
      checkInDate: checkIn || undefined,
      checkOutDate: checkOut || undefined,
      travelersCount: guests,
      roomsCount: rooms,
      notes: `Preferred room: ${selectedRoomType}. Destination: ${hotel.destinationName}.`
    });
  };

  return (
    <>
      {/* Desktop Sticky Ticket Side Panel */}
      <div className="bg-[#FAF9F5] rounded-lg border border-brand-ink-border p-6 sm:p-7 space-y-6 sticky top-28 shadow-xs text-brand-ink">
        <div className="space-y-1 pb-4 border-b border-brand-ink-border">
          <span className="font-mono text-[10px] text-brand-terracotta uppercase tracking-[0.2em] block">
            DIRECT WHOLESALE TARIFF
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-3xl font-bold text-brand-ink">
              {formatPrice(hotel.pricePerNightUSD)}
            </span>
            <span className="font-mono text-xs text-brand-ink-muted">/ suite / night</span>
          </div>
          <p className="font-sans text-[11px] text-brand-ink-muted pt-1">
            Includes complimentary breakfast, all taxes, and direct concierge service.
          </p>
        </div>

        {/* Reservation Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-[11px] text-brand-ink uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-terracotta" />
              Check-in Date
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink text-xs font-mono focus:outline-none focus:border-brand-ink"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] text-brand-ink uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-terracotta" />
              Check-out Date
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink text-xs font-mono focus:outline-none focus:border-brand-ink"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-mono text-[11px] text-brand-ink uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-terracotta" />
                Guests
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink text-xs font-mono focus:outline-none focus:border-brand-ink"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] text-brand-ink uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5 text-brand-terracotta" />
                Suites
              </label>
              <input
                type="number"
                min={1}
                max={15}
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink text-xs font-mono focus:outline-none focus:border-brand-ink"
              />
            </div>
          </div>

          <div>
            <label className="block font-mono text-[11px] text-brand-ink uppercase tracking-wider mb-1.5">
              Selected Suite / Villa
            </label>
            <select
              value={selectedRoomType}
              onChange={(e) => setSelectedRoomType(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink text-xs font-sans focus:outline-none focus:border-brand-ink"
            >
              {hotel.roomTypes.map((r) => (
                <option key={r.name} value={r.name}>
                  {r.name} (${r.priceUSD}/night)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* WhatsApp Booking Button */}
        <button
          type="button"
          onClick={handleBookViaWhatsApp}
          className="w-full py-3.5 px-5 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-[#25D366]" />
          <MessageCircle className="w-4 h-4" />
          <span>Enquire via WhatsApp ({hotel.refCode})</span>
        </button>

        <div className="space-y-2 pt-2 border-t border-brand-ink-border/60 text-[11px] font-sans text-brand-ink-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-terracotta shrink-0" />
            <span>Direct contract rates with zero third-party commissions</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-terracotta shrink-0" />
            <span>Flexible cancellation &amp; date shifts via WhatsApp</span>
          </div>
        </div>
      </div>

      {/* Mobile Slim Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-t border-brand-ink-border p-3 px-4 flex items-center justify-between shadow-lg">
        <div>
          <div className="font-mono text-[9px] text-brand-terracotta uppercase">
            {hotel.refCode} · {hotel.destinationName}
          </div>
          <div className="font-mono text-sm font-bold text-brand-ink">
            {formatPrice(hotel.pricePerNightUSD)} <span className="text-[10px] font-normal text-brand-ink-muted">/ night</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleBookViaWhatsApp}
          className="py-2.5 px-4 rounded-full bg-brand-ink text-[#F6F5F0] font-sans text-xs font-semibold flex items-center gap-2 shadow-xs active:scale-98"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Enquire Stay</span>
        </button>
      </div>
    </>
  );
}
