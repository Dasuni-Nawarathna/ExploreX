"use client";

import React, { useState } from "react";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  Check,
  ShieldCheck
} from "lucide-react";

export default function ContactPage() {
  const { openWhatsAppModal } = useWhatsAppModal();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dates, setDates] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: "general",
          itemName: "Website Contact Form Submission",
          customerName: name,
          customerContact: `${phone} (${email})`,
          travelDate: dates,
          travelersCount: travelers,
          notes: message,
          consentGiven: true
        })
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLaunchWhatsApp = () => {
    openWhatsAppModal({
      itemType: "general",
      itemName: "Direct Holiday Consultation",
      customerName: name || undefined,
      travelersCount: travelers,
      notes: message || "Hello ExploreX! I would like to consult with an island travel expert."
    });
  };

  return (
    <div className="py-16 sm:py-24 space-y-16 bg-[#F6F5F0] min-h-screen text-brand-ink">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-brand-ink-border pb-8">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-brand-terracotta mb-3">
            COMMUNICATIONS &amp; BESPOKE CONSULTATION
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-brand-ink leading-[1.08] max-w-4xl">
            Start a conversation with our <br />
            <span className="italic font-light text-brand-terracotta">Colombo travel planners</span>.
          </h1>
          <p className="font-sans text-base sm:text-lg text-brand-ink-muted max-w-2xl mt-4 leading-relaxed">
            Whether you have specific flight dates or simply an open wish to visit the tea hills and southern reefs, we construct custom itineraries with personal chauffeur-guides.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: WhatsApp Highlight & Offices */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct WhatsApp Concierge Card */}
            <div className="bg-[#1F3F3B] text-[#F6F5F0] p-7 sm:p-8 rounded-lg shadow-sm space-y-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-terracotta flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span>DIRECT EXPEDITION CONCIERGE</span>
              </div>
              <h2 className="font-serif text-3xl font-normal leading-snug">
                Message Us Directly on WhatsApp
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#F6F5F0]/80 leading-relaxed">
                Connect directly with a licensed Sri Lankan destination designer. Fast answers on seasonal routing, driving durations, and train tickets.
              </p>
              <button
                type="button"
                onClick={handleLaunchWhatsApp}
                className="w-full py-3.5 px-5 rounded-full bg-white hover:bg-[#FAF9F5] text-brand-ink font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <MessageCircle className="w-4 h-4" />
                <span>Start WhatsApp Conversation</span>
              </button>
            </div>

            {/* Office Directory */}
            <div className="bg-[#FAF9F5] p-7 rounded-lg border border-brand-ink-border space-y-6">
              <div className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">
                REGIONAL OPERATIONS
              </div>

              <div className="space-y-4 font-sans text-xs text-brand-ink-muted">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-terracotta shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-ink block font-serif text-sm">Colombo Head Office</strong>
                    <span>No. 42, Galle Face Promenade, Colombo 03, Sri Lanka</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-terracotta shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-ink block font-serif text-sm">Kandy Operations Desk</strong>
                    <span>No. 18, Temple Square, Kandy 20000, Sri Lanka</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-terracotta shrink-0" />
                  <div>
                    <strong className="text-brand-ink block font-serif text-sm">Direct Phone Hotline</strong>
                    <span className="font-mono text-xs text-brand-ink">+94 11 234 5678</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-brand-terracotta shrink-0" />
                  <div>
                    <strong className="text-brand-ink block font-serif text-sm">Official Inquiries</strong>
                    <span className="font-mono text-xs text-brand-ink">hello@explorex.lk</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-brand-ink-border/50">
                  <Clock className="w-4 h-4 text-brand-terracotta shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-brand-ink block font-serif text-sm">Active Hours</strong>
                    <span>Daily: 08:00 AM – 10:00 PM IST<br />(24/7 dedicated chauffeur emergency support on-tour)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Web Inquiry Dispatch Form */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-lg border border-brand-ink-border shadow-xs">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#1F3F3B] text-[#F6F5F0] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-3xl font-normal text-brand-ink">
                  Your Dispatch is Received
                </h3>
                <p className="font-sans text-sm text-brand-ink-muted max-w-md mx-auto leading-relaxed">
                  An ExploreX travel specialist in Colombo has been assigned to your dates and will email or message you on WhatsApp within a few hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-mono text-xs text-brand-ink hover:text-brand-terracotta underline"
                  >
                    Send another message →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1 border-b border-brand-ink-border/60 pb-4">
                  <div className="font-mono text-xs text-brand-terracotta uppercase tracking-wider">
                    TRANSMISSION FORM
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-brand-ink">
                    Submit Travel Requirements
                  </h3>
                  <p className="font-sans text-xs text-brand-ink-muted">
                    We will respond with an initial draft itinerary and chauffeur options.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-brand-ink uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Eleanor Vance"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#FAF9F5] border border-brand-ink-border rounded-md text-brand-ink font-sans text-xs focus:outline-none focus:border-brand-ink"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-brand-ink uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. eleanor@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#FAF9F5] border border-brand-ink-border rounded-md text-brand-ink font-sans text-xs focus:outline-none focus:border-brand-ink"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] text-brand-ink uppercase tracking-wider mb-1.5">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+44 7700 900077"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#FAF9F5] border border-brand-ink-border rounded-md text-brand-ink font-sans text-xs focus:outline-none focus:border-brand-ink"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-brand-ink uppercase tracking-wider mb-1.5">
                      Estimated Dates
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Oct 2026 (2 weeks)"
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#FAF9F5] border border-brand-ink-border rounded-md text-brand-ink font-sans text-xs focus:outline-none focus:border-brand-ink"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] text-brand-ink uppercase tracking-wider mb-1.5">
                      Travelers
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={travelers}
                      onChange={(e) => setTravelers(Number(e.target.value))}
                      className="w-full px-3 py-2.5 bg-[#FAF9F5] border border-brand-ink-border rounded-md text-brand-ink font-mono text-xs focus:outline-none focus:border-brand-ink"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-brand-ink uppercase tracking-wider mb-1.5">
                    Your Trip Vision &amp; Places of Interest
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you love: wildlife safaris, boutique tea hills, surf coasts, pace of travel, or specific dates..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAF9F5] border border-brand-ink-border rounded-md text-brand-ink font-sans text-xs focus:outline-none focus:border-brand-ink"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="py-3 px-8 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? "Transmitting..." : "Send Expedition Inquiry"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
