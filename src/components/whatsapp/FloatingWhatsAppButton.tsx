"use client";

import React from "react";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsAppButton() {
  const { openWhatsAppModal } = useWhatsAppModal();

  const handleClick = () => {
    openWhatsAppModal({
      itemType: "general",
      itemName: "Custom Sri Lanka Journey",
      travelersCount: 2,
      notes: "Hello ExploreX! I am looking for travel ideas and expert advice for an upcoming holiday in Sri Lanka."
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={handleClick}
        aria-label="Contact ExploreX via WhatsApp"
        className="w-12 h-12 rounded-full bg-[#1F3F3B] hover:bg-[#2F5D58] text-[#F6F5F0] flex items-center justify-center shadow-lg border border-white/20 transition-transform duration-200 hover:scale-105 active:scale-95 relative group"
        title="Inquire via WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        {/* Subtle, non-pulsing quiet green dot indicating active WhatsApp channel */}
        <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#25D366] ring-2 ring-[#1F3F3B]" />
      </button>
    </div>
  );
}
