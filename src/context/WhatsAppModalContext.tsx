"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { WhatsAppEnquiryPayload } from "@/types";

interface WhatsAppModalContextType {
  isOpen: boolean;
  payload: WhatsAppEnquiryPayload | null;
  agencyWhatsAppNumber: string;
  openWhatsAppModal: (payload: WhatsAppEnquiryPayload) => void;
  closeWhatsAppModal: () => void;
  refreshSettings: () => Promise<void>;
}

const WhatsAppModalContext = createContext<WhatsAppModalContextType | undefined>(undefined);

export function WhatsAppModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [payload, setPayload] = useState<WhatsAppEnquiryPayload | null>(null);
  const [agencyWhatsAppNumber, setAgencyWhatsAppNumber] = useState(
    process.env.NEXT_PUBLIC_AGENCY_WHATSAPP || "94771234567"
  );

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        if (data.agencyWhatsAppNumber) {
          setAgencyWhatsAppNumber(data.agencyWhatsAppNumber);
        }
      }
    } catch {
      // Use fallback
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const openWhatsAppModal = (newPayload: WhatsAppEnquiryPayload) => {
    setPayload(newPayload);
    setIsOpen(true);
  };

  const closeWhatsAppModal = () => {
    setIsOpen(false);
  };

  return (
    <WhatsAppModalContext.Provider
      value={{
        isOpen,
        payload,
        agencyWhatsAppNumber,
        openWhatsAppModal,
        closeWhatsAppModal,
        refreshSettings: fetchSettings
      }}
    >
      {children}
    </WhatsAppModalContext.Provider>
  );
}

export function useWhatsAppModal() {
  const context = useContext(WhatsAppModalContext);
  if (!context) {
    throw new Error("useWhatsAppModal must be used within a WhatsAppModalProvider");
  }
  return context;
}

