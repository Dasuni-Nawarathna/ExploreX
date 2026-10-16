"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { packagesData } from "@/data/packages";
import { hotelsData } from "@/data/hotels";
import { useCurrency } from "@/context/CurrencyContext";
import { WaveLine } from "@/components/motifs/WaveLine";
import { XMark } from "@/components/motifs/XMark";
import { 
  Heart, 
  Clock, 
  User, 
  LogOut, 
  Compass, 
  Hotel as HotelIcon, 
  MessageCircle, 
  Star,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Phone,
  KeyRound,
  ArrowRight,
  ExternalLink,
  Sparkles
} from "lucide-react";

export default function AccountPage() {
  const { user, loading, logout, sendPhoneVerificationCode, verifyPhoneCode } = useAuth();
  const router = useRouter();
  const { formatPrice } = useCurrency();

  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"enquiries" | "verification" | "wishlist" | "review">("enquiries");

  // Phone verification state
  const [phoneInput, setPhoneInput] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpStep, setOtpStep] = useState<"idle" | "code_sent" | "success">("idle");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpNotice, setOtpNotice] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);

  // Review form state
  const [reviewType, setReviewType] = useState<"package" | "hotel">("package");
  const [reviewTargetId, setReviewTargetId] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/account");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.phone) {
      setPhoneInput(user.phone);
    }
  }, [user?.phone]);

  useEffect(() => {
    if (user) {
      // Fetch wishlist
      fetch("/api/customer/wishlist")
        .then((res) => res.json())
        .then((data) => setWishlistIds(data.wishlist || []))
        .catch(console.error);

      // Fetch user's enquiries
      fetch("/api/enquiries")
        .then((res) => res.json())
        .then((data) => {
          const userEnqs = (data.enquiries || []).filter(
            (e: any) => e.customerContact?.includes(user.email) || 
                        e.customerName?.toLowerCase() === user.name.toLowerCase() ||
                        (user.phone && e.customerPhone === user.phone)
          );
          setEnquiries(userEnqs.length ? userEnqs : data.enquiries?.slice(0, 3) || []);
        })
        .catch(console.error);
    }
  }, [user]);

  const handleSendCode = async () => {
    if (!phoneInput || phoneInput.trim().length < 8) {
      setOtpError("Please enter a valid international mobile phone number (e.g. +94 77 123 4567 or +44 7911 123456).");
      return;
    }
    setOtpLoading(true);
    setOtpError(null);
    setOtpNotice(null);

    const res = await sendPhoneVerificationCode(phoneInput.trim());
    setOtpLoading(false);

    if (res.error) {
      setOtpError(res.error);
      return;
    }

    setOtpStep("code_sent");
    if (res.demoCode) {
      setOtpNotice(`Sandbox Demo Code: ${res.demoCode} (Enter this code to verify immediately)`);
    } else {
      setOtpNotice(`Verification 6-digit passcode dispatched to ${phoneInput}.`);
    }
  };

  const handleVerifyCode = async () => {
    if (!otpCode || otpCode.trim().length !== 6) {
      setOtpError("Please enter the 6-digit confirmation code.");
      return;
    }
    setOtpLoading(true);
    setOtpError(null);

    const res = await verifyPhoneCode(phoneInput.trim(), otpCode.trim());
    setOtpLoading(false);

    if (res.error) {
      setOtpError(res.error);
      return;
    }

    setOtpStep("success");
    setOtpNotice("Your WhatsApp number has been successfully verified and linked to your ExploreX travel dossier.");
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/customer/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetType: reviewType,
          targetId: reviewTargetId || (reviewType === "package" ? packagesData[0].id : hotelsData[0].id),
          customerName: user?.name,
          rating,
          comment,
        }),
      });
      if (res.ok) {
        setReviewSuccess(true);
        setComment("");
        setTimeout(() => setReviewSuccess(false), 5000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F6F5F0]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#2F5D58] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-mono text-xs uppercase tracking-widest text-[#4F6D69]">
            Loading traveler dossier...
          </p>
        </div>
      </div>
    );
  }

  const wishlistPackages = packagesData.filter((p) => wishlistIds.includes(p.id));
  const wishlistHotels = hotelsData.filter((h) => wishlistIds.includes(h.id));

  return (
    <div className="min-h-screen bg-[#F6F5F0] pt-28 pb-24 text-[#1F3F3B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Breadcrumb / Section Label */}
        <div className="flex items-center justify-between border-b border-[#D2DEDC] pb-4">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#4F6D69]">
            <Link href="/" className="hover:text-[#1F3F3B] transition-colors">ExploreX</Link>
            <span>/</span>
            <span className="text-[#1F3F3B] font-semibold">Traveler Dossier</span>
          </div>

          <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#E3ECEA] text-[#1F3F3B] border border-[#B9CFCB]">
            ID: {user.id.slice(0, 8)}
          </span>
        </div>

        {/* Profile Dossier Header */}
        <div className="bg-[#FAF9F5] p-6 sm:p-8 rounded-3xl border border-[#D2DEDC] shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3ECEA]/40 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#2F5D58] text-[#F6F5F0] flex items-center justify-center font-serif text-2xl sm:text-3xl font-normal shadow-sm border border-[#1F3F3B]/10">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-serif text-[#1F3F3B] font-normal tracking-tight">
                    {user.name}
                  </h1>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#E3ECEA] text-[#2F5D58] font-medium border border-[#B9CFCB]">
                    {user.role}
                  </span>
                </div>
                <p className="font-mono text-xs text-[#4F6D69]">{user.email}</p>
                
                {/* Verification Quick Pill */}
                <div className="pt-1 flex items-center gap-2">
                  {user.isPhoneVerified && user.phone ? (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified WhatsApp: {user.phone}</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                      <span>WhatsApp Unverified — Required to place tour packages</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              {["SUPER_ADMIN", "MANAGER", "CONTENT_EDITOR", "SUPPORT_AGENT"].includes(user.role) && (
                <Link
                  href="/admin"
                  className="px-4 py-2.5 rounded-xl bg-[#2F5D58] text-[#F6F5F0] text-xs font-semibold hover:bg-[#1F3F3B] transition-colors shadow-xs inline-flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Admin Console</span>
                </Link>
              )}
              <button
                onClick={() => logout()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#D2DEDC] bg-[#F6F5F0] text-[#1F3F3B] hover:bg-[#E3ECEA] text-xs font-medium transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-[#4F6D69]" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* WhatsApp Verification Notice Banner (if unverified) */}
        {!user.isPhoneVerified && (
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-base text-[#1F3F3B] font-medium">
                  Verify your WhatsApp number to unlock package reservations
                </h3>
                <p className="text-xs text-[#4F6D69] max-w-2xl leading-relaxed">
                  In accordance with ExploreX booking security, all multi-day tour packages require a confirmed WhatsApp mobile number to dispatch custom chauffeur itineraries and booking vouchers.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab("verification")}
              className="px-4 py-2 rounded-xl bg-[#2F5D58] text-[#F6F5F0] text-xs font-semibold hover:bg-[#1F3F3B] transition-colors shrink-0"
            >
              Verify Number Now →
            </button>
          </div>
        )}

        {/* Dossier Tabs */}
        <div className="flex items-center gap-2 border-b border-[#D2DEDC] pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("enquiries")}
            className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "enquiries"
                ? "bg-[#2F5D58] text-[#F6F5F0] font-semibold shadow-xs"
                : "text-[#4F6D69] hover:bg-[#E3ECEA] hover:text-[#1F3F3B]"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>My Bookings & Enquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("verification")}
            className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "verification"
                ? "bg-[#2F5D58] text-[#F6F5F0] font-semibold shadow-xs"
                : "text-[#4F6D69] hover:bg-[#E3ECEA] hover:text-[#1F3F3B]"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>WhatsApp Verification</span>
            {user.isPhoneVerified && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "wishlist"
                ? "bg-[#2F5D58] text-[#F6F5F0] font-semibold shadow-xs"
                : "text-[#4F6D69] hover:bg-[#E3ECEA] hover:text-[#1F3F3B]"
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Saved Wishlist ({wishlistPackages.length + wishlistHotels.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("review")}
            className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "review"
                ? "bg-[#2F5D58] text-[#F6F5F0] font-semibold shadow-xs"
                : "text-[#4F6D69] hover:bg-[#E3ECEA] hover:text-[#1F3F3B]"
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Share Feedback</span>
          </button>
        </div>

        {/* Tab 1: Enquiries & Bookings */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#1F3F3B]">Travel Enquiries & Reservations</h2>
                <p className="text-xs text-[#4F6D69] mt-0.5">
                  Real-time record of all itinerary requests submitted to your private travel specialist.
                </p>
              </div>
              <Link
                href="/packages"
                className="font-mono text-xs text-[#2F5D58] hover:underline hidden sm:inline-block"
              >
                + Browse More Packages
              </Link>
            </div>

            {enquiries.length === 0 ? (
              <div className="bg-[#FAF9F5] p-12 rounded-3xl border border-[#D2DEDC] text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#E3ECEA] text-[#2F5D58] flex items-center justify-center mx-auto">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg text-[#1F3F3B]">No Travel Inquiries Yet</h3>
                <p className="text-xs text-[#4F6D69] max-w-md mx-auto leading-relaxed">
                  Ready to explore ancient citadels, misty tea hills, or tranquil coastlines? Browse our hand-curated tour packages to place your first reservation request.
                </p>
                <div className="pt-2">
                  <Link
                    href="/packages"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2F5D58] text-[#F6F5F0] text-xs font-semibold hover:bg-[#1F3F3B] transition-colors"
                  >
                    <span>Explore Tour Packages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="bg-[#FAF9F5] p-5 sm:p-6 rounded-2xl border border-[#D2DEDC] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-[#B9CFCB]"
                  >
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#E3ECEA] text-[#2F5D58] font-bold border border-[#B9CFCB]">
                          {enq.itemType?.toUpperCase() || "PACKAGE"}
                        </span>
                        {enq.refCode && (
                          <span className="font-mono text-[10px] tracking-wider text-[#C46A4A] font-semibold">
                            {enq.refCode}
                          </span>
                        )}
                        <h4 className="font-serif text-base sm:text-lg text-[#1F3F3B] font-medium">
                          {enq.itemName}
                        </h4>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-[#4F6D69] flex-wrap">
                        <span>📅 Date: <strong className="text-[#1F3F3B]">{enq.travelDate || "Flexible"}</strong></span>
                        <span>👥 Travelers: <strong className="text-[#1F3F3B]">{enq.travelersCount}</strong></span>
                        {enq.vehicleType && (
                          <span>🚗 <strong className="text-[#1F3F3B]">{enq.vehicleType.split("(")[0]}</strong></span>
                        )}
                        {enq.customerPhone && (
                          <span>📱 <strong className="text-[#1F3F3B]">{enq.customerPhone}</strong></span>
                        )}
                      </div>

                      {enq.notes && (
                        <p className="text-xs text-[#4F6D69] italic bg-[#F6F5F0] p-2.5 rounded-xl border border-[#D2DEDC]/60">
                          &ldquo;{enq.notes}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-[#D2DEDC]">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border ${
                        enq.status === "confirmed" 
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : enq.status === "contacted"
                          ? "bg-blue-50 text-blue-800 border-blue-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          enq.status === "confirmed" ? "bg-emerald-500" :
                          enq.status === "contacted" ? "bg-blue-500" : "bg-amber-500"
                        }`} />
                        Status: {enq.status || "New"}
                      </span>

                      <span className="font-mono text-[10px] text-[#7E9995]">
                        {enq.timestamp ? new Date(enq.timestamp).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        }) : "Recent"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: WhatsApp Phone Verification */}
        {activeTab === "verification" && (
          <div className="bg-[#FAF9F5] p-6 sm:p-10 rounded-3xl border border-[#D2DEDC] shadow-xs max-w-2xl mx-auto space-y-8">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#E3ECEA] text-[#2F5D58] flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl text-[#1F3F3B]">Traveler WhatsApp Verification</h2>
              <p className="text-xs text-[#4F6D69] max-w-md mx-auto leading-relaxed">
                Connect and confirm your WhatsApp mobile number. Tour packages are confirmed via direct agent coordination on WhatsApp.
              </p>
            </div>

            <WaveLine className="text-[#D2DEDC] max-w-xs mx-auto" />

            {/* Current Status Card */}
            <div className={`p-5 rounded-2xl border ${
              user.isPhoneVerified && user.phone 
                ? "bg-emerald-50/70 border-emerald-200" 
                : "bg-amber-50/70 border-amber-200"
            }`}>
              <div className="flex items-center gap-3">
                {user.isPhoneVerified && user.phone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                )}
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#1F3F3B]">
                    {user.isPhoneVerified && user.phone 
                      ? "WhatsApp Verified & Active" 
                      : "WhatsApp Not Yet Verified"}
                  </h4>
                  <p className="font-mono text-xs text-[#4F6D69] mt-0.5">
                    {user.isPhoneVerified && user.phone 
                      ? `Linked number: ${user.phone}`
                      : "You must complete 6-digit code verification to place tour package inquiries."}
                  </p>
                </div>
              </div>
            </div>

            {/* Verification Form */}
            <div className="space-y-5">
              {otpError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              {otpNotice && (
                <div className="p-3.5 rounded-xl bg-[#E3ECEA] border border-[#B9CFCB] text-[#1F3F3B] text-xs font-mono">
                  {otpNotice}
                </div>
              )}

              {/* Phone Input */}
              <div className="space-y-1.5">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#1F3F3B] font-semibold">
                  WhatsApp Number (with Country Code)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4F6D69]" />
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      placeholder="+94 77 123 4567"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D2DEDC] bg-[#F6F5F0] text-xs font-mono text-[#1F3F3B] placeholder-[#7E9995] focus:outline-none focus:ring-2 focus:ring-[#2F5D58]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={otpLoading}
                    className="px-4 py-2.5 rounded-xl bg-[#2F5D58] hover:bg-[#1F3F3B] text-[#F6F5F0] text-xs font-semibold disabled:opacity-50 transition-colors shrink-0"
                  >
                    {otpLoading ? "Sending..." : "Request Code"}
                  </button>
                </div>
                <p className="font-mono text-[10px] text-[#7E9995]">
                  Example formats: +94 77 123 4567 (Sri Lanka), +44 7911 123456 (UK), +1 415 555 2671 (US)
                </p>
              </div>

              {/* 6-Digit Code Input (when code requested) */}
              {otpStep === "code_sent" && (
                <div className="space-y-3 pt-3 border-t border-[#D2DEDC]">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#1F3F3B] font-semibold">
                      Enter 6-Digit Passcode
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4F6D69]" />
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                          placeholder="123456"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D2DEDC] bg-[#F6F5F0] text-sm font-mono tracking-widest text-[#1F3F3B] focus:outline-none focus:ring-2 focus:ring-[#2F5D58]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleVerifyCode}
                        disabled={otpLoading || otpCode.length !== 6}
                        className="px-5 py-2.5 rounded-xl bg-[#C46A4A] hover:bg-[#A95436] text-[#F6F5F0] text-xs font-semibold disabled:opacity-50 transition-colors shrink-0"
                      >
                        {otpLoading ? "Verifying..." : "Verify Code"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Wishlist */}
        {activeTab === "wishlist" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#1F3F3B]">Saved Journeys & Retreats</h2>
              <p className="text-xs text-[#4F6D69] mt-0.5">
                Curated collection of packages and boutique hotels saved to your travel wishlist.
              </p>
            </div>

            {wishlistPackages.length === 0 && wishlistHotels.length === 0 ? (
              <div className="bg-[#FAF9F5] p-12 rounded-3xl border border-[#D2DEDC] text-center space-y-4">
                <Heart className="w-8 h-8 text-[#7E9995] mx-auto" />
                <h3 className="font-serif text-lg text-[#1F3F3B]">Your Wishlist is Empty</h3>
                <p className="text-xs text-[#4F6D69] max-w-sm mx-auto leading-relaxed">
                  Click the heart icon on any tour package or boutique villa to save items for future itinerary planning.
                </p>
                <div className="pt-2">
                  <Link
                    href="/packages"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2F5D58] text-[#F6F5F0] text-xs font-semibold hover:bg-[#1F3F3B] transition-colors"
                  >
                    <span>Browse Packages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-[#FAF9F5] rounded-2xl border border-[#D2DEDC] overflow-hidden shadow-xs p-4 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="relative h-40 rounded-xl overflow-hidden">
                        <img
                          src={pkg.heroImage}
                          alt={pkg.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <span className="absolute top-2.5 left-2.5 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F6F5F0]/90 text-[#1F3F3B] backdrop-blur-xs font-semibold">
                          {pkg.durationText}
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[#C46A4A] tracking-wider block font-semibold">
                          {pkg.refCode}
                        </span>
                        <h4 className="font-serif text-base text-[#1F3F3B] line-clamp-1 mt-0.5">
                          {pkg.name}
                        </h4>
                        <span className="font-mono text-xs text-[#2F5D58] font-semibold mt-1 block">
                          From {formatPrice(pkg.startingPriceUSD)} / person
                        </span>
                      </div>
                    </div>
                    
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="block text-center py-2.5 rounded-xl bg-[#E3ECEA] hover:bg-[#2F5D58] text-[#2F5D58] hover:text-[#F6F5F0] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                    >
                      View Package Dossier →
                    </Link>
                  </div>
                ))}

                {wishlistHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-[#FAF9F5] rounded-2xl border border-[#D2DEDC] overflow-hidden shadow-xs p-4 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="relative h-40 rounded-xl overflow-hidden">
                        <img
                          src={hotel.heroImage}
                          alt={hotel.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <span className="absolute top-2.5 left-2.5 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F6F5F0]/90 text-[#1F3F3B] backdrop-blur-xs font-semibold">
                          {hotel.destinationName}
                        </span>
                      </div>
                      <div>
                        <span className="font-mono text-[10px] uppercase text-[#C46A4A] tracking-wider block font-semibold">
                          {hotel.type} • {hotel.starRating} Stars
                        </span>
                        <h4 className="font-serif text-base text-[#1F3F3B] line-clamp-1 mt-0.5">
                          {hotel.name}
                        </h4>
                        <span className="font-mono text-xs text-[#2F5D58] font-semibold mt-1 block">
                          From {formatPrice(hotel.pricePerNightUSD)} / night
                        </span>
                      </div>
                    </div>
                    
                    <Link
                      href={`/hotels/${hotel.slug}`}
                      className="block text-center py-2.5 rounded-xl bg-[#E3ECEA] hover:bg-[#2F5D58] text-[#2F5D58] hover:text-[#F6F5F0] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                    >
                      View Villa Details →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Review Form */}
        {activeTab === "review" && (
          <div className="bg-[#FAF9F5] p-6 sm:p-10 rounded-3xl border border-[#D2DEDC] shadow-xs max-w-xl mx-auto space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="font-serif text-2xl text-[#1F3F3B]">Field Journal traveler notes</h2>
              <p className="text-xs text-[#4F6D69] leading-relaxed">
                Share authentic impressions of your chauffeured journey, stays, and hospitality to guide fellow travelers.
              </p>
            </div>

            <WaveLine className="text-[#D2DEDC] max-w-xs mx-auto" />

            {reviewSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Thank you! Your feedback has been submitted to the ExploreX editorial team for moderation.</span>
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setReviewType("package")}
                  className={`py-2 px-3 rounded-xl font-mono text-xs font-semibold border ${
                    reviewType === "package"
                      ? "bg-[#2F5D58] text-[#F6F5F0] border-[#2F5D58]"
                      : "bg-[#F6F5F0] text-[#4F6D69] border-[#D2DEDC]"
                  }`}
                >
                  Tour Package
                </button>
                <button
                  type="button"
                  onClick={() => setReviewType("hotel")}
                  className={`py-2 px-3 rounded-xl font-mono text-xs font-semibold border ${
                    reviewType === "hotel"
                      ? "bg-[#2F5D58] text-[#F6F5F0] border-[#2F5D58]"
                      : "bg-[#F6F5F0] text-[#4F6D69] border-[#D2DEDC]"
                  }`}
                >
                  Hotel / Villa
                </button>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#1F3F3B] font-semibold mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-2xl text-[#C46A4A] hover:scale-110 transition-transform"
                    >
                      {star <= rating ? "★" : "☆"}
                    </button>
                  ))}
                  <span className="font-mono text-xs text-[#4F6D69] ml-2 font-semibold">
                    {rating} of 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-[#1F3F3B] font-semibold mb-1.5">
                  Notes & Highlights
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details about your chauffeur guide, scenic routes, hotel comfort..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-[#D2DEDC] bg-[#F6F5F0] text-xs text-[#1F3F3B] placeholder-[#7E9995] focus:outline-none focus:ring-2 focus:ring-[#2F5D58]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#2F5D58] hover:bg-[#1F3F3B] text-[#F6F5F0] font-mono text-xs uppercase tracking-wider font-semibold transition-colors shadow-xs"
              >
                Submit Feedback for Moderation
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
