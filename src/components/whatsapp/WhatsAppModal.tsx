"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { WaveLine } from "@/components/motifs/WaveLine";
import { XMark } from "@/components/motifs/XMark";
import { 
  X, 
  Send, 
  Calendar, 
  Users, 
  Car, 
  Check, 
  ShieldCheck, 
  MessageSquare,
  Lock,
  Phone,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ArrowRight,
  UserCheck
} from "lucide-react";

export function WhatsAppModal() {
  const { isOpen, payload, agencyWhatsAppNumber, closeWhatsAppModal } = useWhatsAppModal();
  const { formatPrice } = useCurrency();
  const { user, login, register, sendPhoneVerificationCode, verifyPhoneCode } = useAuth();

  // Authentication Gate State (for packages when not logged in)
  const [authMode, setAuthMode] = useState<"signin" | "register">("signin");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Form states
  const [travelDate, setTravelDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [vehicle, setVehicle] = useState("High-Roof Luxury Van (Toyota KDH)");
  const [guideOption, setGuideOption] = useState("With Licensed English-Speaking National Guide");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(true);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Phone Verification States
  const [verificationStep, setVerificationStep] = useState<"idle" | "code_sent" | "verified">("idle");
  const [otpCode, setOtpCode] = useState("");
  const [otpNotice, setOtpNotice] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpLoading, setOtpLoading] = useState(false);

  // Sync user state on load
  useEffect(() => {
    if (user) {
      if (!customerName) setCustomerName(user.name);
      if (user.phone) {
        setCustomerPhone(user.phone);
        if (user.isPhoneVerified) {
          setVerificationStep("verified");
        }
      }
    }
  }, [user]);

  // Initialize and construct default message whenever payload changes
  useEffect(() => {
    if (!payload) return;

    const defaultDate = payload.travelDate || new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0];
    const defaultOutDate = payload.checkOutDate || new Date(Date.now() + 17 * 86400000).toISOString().split("T")[0];
    
    setTravelDate(defaultDate);
    setCheckOutDate(defaultOutDate);
    setTravelers(payload.travelersCount || 2);
    setRooms(payload.roomsCount || 1);
    setVehicle(payload.vehicleType || "High-Roof Luxury Van (Toyota KDH)");
    setGuideOption(payload.guideOption || "With Licensed English-Speaking National Guide");
    setNotes(payload.notes || "");
    setConsent(true);

    if (user) {
      setCustomerName(user.name);
      if (user.phone) {
        setCustomerPhone(user.phone);
        if (user.isPhoneVerified) {
          setVerificationStep("verified");
        }
      }
    }

    generateMessageText({
      ...payload,
      travelDate: defaultDate,
      checkOutDate: defaultOutDate,
      travelersCount: payload.travelersCount || 2,
      roomsCount: payload.roomsCount || 1,
      vehicleType: payload.vehicleType || "High-Roof Luxury Van (Toyota KDH)",
      guideOption: payload.guideOption || "With Licensed English-Speaking National Guide",
      notes: payload.notes || ""
    });
  }, [payload, user]);

  const generateMessageText = (p: typeof payload & {
    travelDate: string;
    checkOutDate: string;
    travelersCount: number;
    roomsCount: number;
    vehicleType: string;
    guideOption: string;
    notes: string;
  }) => {
    if (!p) return;

    const priceFormatted = p.customDetails?.estimatedPriceUSD
      ? formatPrice(p.customDetails.estimatedPriceUSD)
      : undefined;

    const text = buildWhatsAppMessage({
      ...p,
      travelDate: p.travelDate,
      checkOutDate: p.checkOutDate,
      travelersCount: p.travelersCount,
      roomsCount: p.roomsCount,
      vehicleType: p.vehicleType,
      guideOption: p.guideOption,
      notes: p.notes,
      priceFormatted,
    });

    setMessage(text);
  };

  const handleInputChange = (field: string, value: string | number) => {
    let nextDate = travelDate;
    let nextOutDate = checkOutDate;
    let nextTravelers = travelers;
    let nextRooms = rooms;
    let nextVehicle = vehicle;
    let nextGuide = guideOption;
    let nextNotes = notes;

    if (field === "travelDate") { nextDate = value as string; setTravelDate(nextDate); }
    if (field === "checkOutDate") { nextOutDate = value as string; setCheckOutDate(nextOutDate); }
    if (field === "travelers") { nextTravelers = Number(value); setTravelers(nextTravelers); }
    if (field === "rooms") { nextRooms = Number(value); setRooms(nextRooms); }
    if (field === "vehicle") { nextVehicle = value as string; setVehicle(nextVehicle); }
    if (field === "guideOption") { nextGuide = value as string; setGuideOption(nextGuide); }
    if (field === "notes") { nextNotes = value as string; setNotes(nextNotes); }

    if (payload) {
      generateMessageText({
        ...payload,
        travelDate: nextDate,
        checkOutDate: nextOutDate,
        travelersCount: nextTravelers,
        roomsCount: nextRooms,
        vehicleType: nextVehicle,
        guideOption: nextGuide,
        notes: nextNotes
      });
    }
  };

  // WhatsApp OTP Verification Handlers
  const handleRequestVerificationCode = async () => {
    if (!customerPhone || customerPhone.trim().length < 8) {
      setOtpError("Please enter a valid international WhatsApp number (e.g. +94 77 123 4567 or +44 7911 123456).");
      return;
    }
    setOtpLoading(true);
    setOtpError(null);
    setOtpNotice(null);

    const res = await sendPhoneVerificationCode(customerPhone.trim());
    setOtpLoading(false);

    if (res.error) {
      setOtpError(res.error);
      return;
    }

    setVerificationStep("code_sent");
    if (res.demoCode) {
      setOtpNotice(`Sandbox Demo Code: ${res.demoCode} (Enter this code to verify)`);
    } else {
      setOtpNotice(`Verification code dispatched to ${customerPhone}.`);
    }
  };

  const handleConfirmVerificationCode = async () => {
    if (!otpCode || otpCode.trim().length !== 6) {
      setOtpError("Please enter the 6-digit verification code.");
      return;
    }
    setOtpLoading(true);
    setOtpError(null);

    const res = await verifyPhoneCode(customerPhone.trim(), otpCode.trim());
    setOtpLoading(false);

    if (res.error) {
      setOtpError(res.error);
      return;
    }

    setVerificationStep("verified");
    setOtpNotice("WhatsApp number verified successfully!");
  };

  // Handle Inline Auth
  const handleInlineAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    if (authMode === "signin") {
      const result = await login({ email: authEmail, password: authPassword });
      setAuthLoading(false);
      if (result.error) {
        setAuthError(result.error);
        return;
      }
    } else {
      const result = await register({
        name: authName,
        email: authEmail,
        password: authPassword,
        phone: authPhone || undefined,
      });
      setAuthLoading(false);
      if (result.error) {
        setAuthError(result.error);
        return;
      }
    }
  };

  const handleDemoSignIn = async () => {
    setAuthLoading(true);
    setAuthError("");
    const result = await login({ email: "customer@example.com", password: "Customer@2026!" });
    setAuthLoading(false);
    if (result.error) {
      setAuthError(result.error);
    }
  };

  const handleSendToWhatsApp = async () => {
    if (!payload) return;

    // Safety checks: Package requires customer login
    if (payload.itemType === "package" && !user) {
      return;
    }

    // WhatsApp verification check for packages
    if (payload.itemType === "package" && verificationStep !== "verified") {
      setOtpError("Please verify your traveler WhatsApp number before confirming your expedition reservation.");
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          travelDate,
          checkOutDate: payload.itemType === "hotel" ? checkOutDate : undefined,
          travelersCount: travelers,
          roomsCount: payload.itemType === "hotel" ? rooms : undefined,
          vehicleType: vehicle,
          guideOption,
          customerName: customerName.trim() || user?.name || "Traveler",
          customerContact: user?.email || customerPhone.trim(),
          customerPhone: customerPhone.trim(),
          isPhoneVerified: verificationStep === "verified",
          notes,
          consentGiven: consent,
          customMessage: message
        })
      });
    } catch (err) {
      console.error("Enquiry log error:", err);
    } finally {
      setIsSubmitting(false);
      closeWhatsAppModal();

      const url = buildWhatsAppUrl(agencyWhatsAppNumber, message);
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  if (!isOpen || !payload) return null;

  const isPackage = payload.itemType === "package";
  const requiresLogin = isPackage && !user;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-lg border border-brand-ink-border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-brand-ink"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1F3F3B] text-[#F6F5F0] p-6 flex items-start justify-between border-b border-brand-ink">
          <div className="space-y-1.5 pr-6">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-terracotta">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
              <span>DIRECT WHATSAPP CONCIERGE</span>
              {payload.refCode && (
                <>
                  <span>·</span>
                  <span className="bg-white/20 text-[#F6F5F0] px-1.5 py-0.5 rounded-sm">
                    {payload.refCode}
                  </span>
                </>
              )}
            </div>
            <h2 className="font-serif text-2xl font-normal leading-tight">
              {payload.itemName}
            </h2>
            <p className="font-sans text-xs text-[#F6F5F0]/80">
              {isPackage 
                ? "Private chauffeured expedition reservation with dedicated traveler verification." 
                : "Customize your request details below before starting direct WhatsApp conversation."}
            </p>
          </div>
          <button
            onClick={closeWhatsAppModal}
            aria-label="Close modal"
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F6F5F0] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[#FAF9F5]">
          
          {/* ========================================================
           * GATE: Customer Login Required for Tour Packages
           * ======================================================== */}
          {requiresLogin ? (
            <div className="space-y-6 bg-white p-6 rounded-lg border border-brand-ink-border shadow-xs animate-in fade-in">
              <div className="flex items-start gap-3 border-b border-brand-ink-border/60 pb-4">
                <div className="p-2.5 rounded-full bg-[#1F3F3B] text-[#F6F5F0] shrink-0 mt-0.5">
                  <Lock className="w-4 h-4 text-brand-terracotta" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-brand-terracotta">
                    CUSTOMER ACCOUNT REQUIRED
                  </div>
                  <h3 className="font-serif text-xl font-normal text-brand-ink">
                    Sign in to place this tour package
                  </h3>
                  <p className="font-sans text-xs text-brand-ink-muted mt-1 leading-relaxed">
                    To reserve bespoke chauffeured itineraries, arrange pre-booked train observation seats, and verify traveler WhatsApp concierge, an active customer account is required.
                  </p>
                </div>
              </div>

              {/* Mode Toggle Tabs */}
              <div className="flex border-b border-brand-ink-border font-mono text-xs">
                <button
                  type="button"
                  onClick={() => { setAuthMode("signin"); setAuthError(""); }}
                  className={`flex-1 py-2 text-center uppercase tracking-wider transition-colors ${
                    authMode === "signin"
                      ? "border-b-2 border-brand-ink text-brand-ink font-bold"
                      : "text-brand-ink-muted hover:text-brand-ink"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode("register"); setAuthError(""); }}
                  className={`flex-1 py-2 text-center uppercase tracking-wider transition-colors ${
                    authMode === "register"
                      ? "border-b-2 border-brand-ink text-brand-ink font-bold"
                      : "text-brand-ink-muted hover:text-brand-ink"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {authError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-sm flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Inline Form */}
              <form onSubmit={handleInlineAuthSubmit} className="space-y-3">
                {authMode === "register" && (
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF9F5] border border-brand-ink-border rounded-sm text-xs font-sans focus:outline-none focus:border-brand-ink"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. eleanor@example.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-brand-ink-border rounded-sm text-xs font-sans focus:outline-none focus:border-brand-ink"
                  />
                </div>

                {authMode === "register" && (
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1 flex items-center justify-between">
                      <span>Traveler WhatsApp Number</span>
                      <span className="text-[10px] text-brand-ink-muted">Include country code</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +94 77 123 4567 or +44 7911 123456"
                      value={authPhone}
                      onChange={(e) => setAuthPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF9F5] border border-brand-ink-border rounded-sm text-xs font-sans focus:outline-none focus:border-brand-ink"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F5] border border-brand-ink-border rounded-sm text-xs font-sans focus:outline-none focus:border-brand-ink"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 px-4 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs disabled:opacity-50 mt-1"
                >
                  <span>{authLoading ? "Processing..." : authMode === "signin" ? "Sign In & Unlock Package" : "Create Account & Unlock"}</span>
                  <ArrowRight className="w-4 h-4 text-brand-terracotta" />
                </button>
              </form>

              {/* Fast 1-click test button */}
              <div className="pt-2 border-t border-dashed border-brand-ink-border/80 flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-brand-ink-muted uppercase">Testing Sandbox:</span>
                <button
                  type="button"
                  onClick={handleDemoSignIn}
                  disabled={authLoading}
                  className="font-mono text-xs text-brand-terracotta hover:underline font-semibold flex items-center gap-1"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>1-Click Sign In as Demo Customer</span>
                </button>
              </div>
            </div>
          ) : (
            /* ========================================================
             * NORMAL / LOGGED-IN BOOKING VIEW
             * ======================================================== */
            <>
              {/* Authenticated Customer Banner */}
              {user && (
                <div className="p-3 bg-white border border-brand-ink-border rounded-md flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-brand-terracotta" />
                    <span>Logged in as: <strong className="text-brand-ink">{user.name}</strong> ({user.email})</span>
                  </div>
                  <span className="text-[10px] uppercase bg-[#FAF9F5] px-2 py-0.5 rounded-sm border border-brand-ink-border text-brand-ink">
                    {user.role}
                  </span>
                </div>
              )}

              {/* Dates & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-terracotta" />
                    {payload.itemType === "hotel" ? "Check-in Date" : "Target Travel Date"}
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => handleInputChange("travelDate", e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink font-mono text-xs focus:outline-none focus:border-brand-ink"
                  />
                </div>

                {payload.itemType === "hotel" ? (
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-brand-terracotta" />
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => handleInputChange("checkOutDate", e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink font-mono text-xs focus:outline-none focus:border-brand-ink"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-brand-terracotta" />
                      Travelers / Explorers
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={travelers}
                      onChange={(e) => handleInputChange("travelers", e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink font-mono text-xs focus:outline-none focus:border-brand-ink"
                    />
                  </div>
                )}
              </div>

              {/* Hotel Rooms */}
              {payload.itemType === "hotel" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1.5 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-brand-terracotta" />
                      Total Guests
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={40}
                      value={travelers}
                      onChange={(e) => handleInputChange("travelers", e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink font-mono text-xs focus:outline-none focus:border-brand-ink"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1.5">
                      Rooms Required
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={rooms}
                      onChange={(e) => handleInputChange("rooms", e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink font-mono text-xs focus:outline-none focus:border-brand-ink"
                    />
                  </div>
                </div>
              )}

              {/* Vehicle & Guide Options */}
              {payload.itemType !== "hotel" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1.5 flex items-center gap-1.5">
                      <Car className="w-3.5 h-3.5 text-brand-terracotta" />
                      Dedicated Vehicle
                    </label>
                    <select
                      value={vehicle}
                      onChange={(e) => handleInputChange("vehicle", e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink font-sans text-xs focus:outline-none focus:border-brand-ink"
                    >
                      <option value="High-Roof Luxury Van (Toyota KDH)">High-Roof Luxury Van (KDH, 4-7 pax)</option>
                      <option value="Sedan Car (Toyota Axio / Prius)">Sedan Car (Toyota Axio, 1-3 pax)</option>
                      <option value="Executive Mini-Coach (Coaster)">Mini-Coach (Coaster, 8-15 pax)</option>
                      <option value="4x4 Raised Safari Jeep">4x4 Raised Safari Jeep (1-6 pax)</option>
                      <option value="Luxury VIP SUV (Toyota Prado)">Luxury VIP SUV (Prado, 1-4 pax)</option>
                      <option value="Authentic Tuk-Tuk">Authentic Sri Lankan Tuk-Tuk</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1.5">
                      Chauffeur &amp; Guide Option
                    </label>
                    <select
                      value={guideOption}
                      onChange={(e) => handleInputChange("guideOption", e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink font-sans text-xs focus:outline-none focus:border-brand-ink"
                    >
                      <option value="With Dedicated Professional Chauffeur Only">Dedicated Chauffeur Only</option>
                      <option value="With Licensed English-Speaking National Guide">Chauffeur + English National Guide</option>
                      <option value="With German-Speaking National Tour Guide">Chauffeur + German Guide</option>
                      <option value="With French-Speaking National Tour Guide">Chauffeur + French Guide</option>
                    </select>
                  </div>
                </div>
              )}

              {/* ========================================================
               * TRAVELER WHATSAPP NUMBER & VERIFICATION SECTION
               * ======================================================== */}
              <div className="bg-white p-5 rounded-md border border-brand-ink-border space-y-4">
                <div className="flex items-center justify-between border-b border-brand-ink-border/50 pb-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-brand-ink flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-brand-terracotta" />
                    <span>Traveler WhatsApp Number Verification *</span>
                  </span>
                  {verificationStep === "verified" ? (
                    <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <span className="font-mono text-[10px] text-brand-terracotta">
                      Verification Required
                    </span>
                  )}
                </div>

                {otpNotice && (
                  <div className="p-3 bg-[#FAF9F5] border border-brand-terracotta/40 text-xs font-mono text-brand-ink rounded-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                    <span>{otpNotice}</span>
                  </div>
                )}

                {otpError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-xs text-rose-700 rounded-sm flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{otpError}</span>
                  </div>
                )}

                {/* Verification View States */}
                {verificationStep === "verified" ? (
                  <div className="flex items-center justify-between p-3 bg-[#FAF9F5] border border-brand-ink-border rounded-sm">
                    <div className="space-y-0.5">
                      <div className="font-mono text-xs font-bold text-brand-ink flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{customerPhone}</span>
                      </div>
                      <span className="font-sans text-[11px] text-brand-ink-muted">
                        Verified WhatsApp contact for itinerary updates &amp; chauffeur coordination.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVerificationStep("idle")}
                      className="font-mono text-[10px] text-brand-ink-muted hover:text-brand-ink underline"
                    >
                      Change Number
                    </button>
                  </div>
                ) : verificationStep === "code_sent" ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-brand-ink">
                        Enter 6-digit code sent to <strong>{customerPhone}</strong>:
                      </span>
                      <button
                        type="button"
                        onClick={() => setVerificationStep("idle")}
                        className="font-mono text-[10px] text-brand-ink-muted hover:text-brand-ink underline"
                      >
                        Edit Number
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="flex-1 px-3 py-2 bg-[#FAF9F5] border border-brand-ink-border rounded-sm font-mono text-center tracking-widest text-base focus:outline-none focus:border-brand-ink"
                      />
                      <button
                        type="button"
                        onClick={handleConfirmVerificationCode}
                        disabled={otpLoading}
                        className="px-5 py-2.5 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50"
                      >
                        {otpLoading ? "Verifying..." : "Confirm Code"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="tel"
                        placeholder="e.g. +94 77 123 4567 or +44 7911 123456"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="flex-1 px-3 py-2 bg-[#FAF9F5] border border-brand-ink-border rounded-sm font-sans text-xs focus:outline-none focus:border-brand-ink"
                      />
                      <button
                        type="button"
                        onClick={handleRequestVerificationCode}
                        disabled={otpLoading}
                        className="px-4 py-2.5 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50 shrink-0"
                      >
                        {otpLoading ? "Sending..." : "Verify WhatsApp"}
                      </button>
                    </div>
                    <span className="font-sans text-[11px] text-brand-ink-muted block">
                      Include country code. A 6-digit confirmation code will be dispatched to verify your traveler contact.
                    </span>
                  </div>
                )}
              </div>

              {/* Traveler Full Name */}
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1.5">
                  Traveler Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-md border border-brand-ink-border text-brand-ink font-sans text-xs focus:outline-none focus:border-brand-ink"
                />
              </div>

              {/* Live WhatsApp Message Preview */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-brand-ink flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-brand-terracotta" />
                    <span>WhatsApp Message Preview (Editable)</span>
                  </label>
                  <span className="font-mono text-[10px] text-brand-ink-muted">You can edit text directly</span>
                </div>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 bg-white rounded-md border border-brand-ink-border font-mono text-xs text-brand-ink focus:outline-none focus:border-brand-ink leading-relaxed"
                />
              </div>

              {/* Privacy Consent */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="consent-checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-3.5 w-3.5 rounded border-brand-ink-border text-brand-ink focus:ring-brand-ink"
                />
                <label htmlFor="consent-checkbox" className="font-sans text-xs text-brand-ink-muted leading-relaxed cursor-pointer select-none">
                  I agree to share these travel parameters with ExploreX senior planners for availability checks and bespoke itinerary proposals. Data is strictly confidential.
                </label>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer with Send Action */}
        <div className="p-4 sm:p-5 bg-white border-t border-brand-ink-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-ink-muted">
            <ShieldCheck className="w-4 h-4 text-brand-terracotta shrink-0" />
            <span>Direct Colombo Operator · Response within 15–30 mins</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={closeWhatsAppModal}
              className="px-5 py-2.5 rounded-full border border-brand-ink-border text-brand-ink font-sans text-xs font-medium hover:bg-[#FAF9F5] transition-colors"
            >
              Cancel
            </button>

            {!requiresLogin && (
              <button
                type="button"
                onClick={handleSendToWhatsApp}
                disabled={isSubmitting || (isPackage && verificationStep !== "verified")}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-98 shadow-xs ${
                  isPackage && verificationStep !== "verified"
                    ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                    : "bg-brand-ink hover:bg-brand-teal text-[#F6F5F0]"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                <MessageSquare className="w-3.5 h-3.5" />
                <span>
                  {isSubmitting 
                    ? "Transmitting..." 
                    : isPackage && verificationStep !== "verified"
                    ? "Verify WhatsApp First" 
                    : "Confirm & Open in WhatsApp"}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
