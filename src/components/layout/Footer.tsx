"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { WaveLine } from "@/components/motifs/WaveLine";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { 
  MessageCircle, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight,
  Check
} from "lucide-react";

export function Footer() {
  const { openWhatsAppModal } = useWhatsAppModal();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleGeneralWhatsApp = () => {
    openWhatsAppModal({
      itemType: "general",
      itemName: "Direct Holiday Consultation",
      travelersCount: 2,
      notes: "Hello ExploreX! I would like to speak to an island tour designer."
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus("submitting");
    setTimeout(() => {
      setNewsletterStatus("success");
      setNewsletterEmail("");
    }, 800);
  };

  return (
    <footer className="bg-[#1F3F3B] text-[#F6F5F0] relative overflow-hidden">
      
      {/* Wave Line at the Very Top Edge */}
      <div className="w-full overflow-hidden text-[#2F5D58]">
        <WaveLine width="100%" height={16} strokeWidth={1.5} color="currentColor" />
      </div>

      {/* Very Large Faint Wordmark / Circular Emblem Partially Cropped in Background */}
      <div className="absolute right-[-80px] bottom-[-80px] w-[500px] h-[500px] rounded-full border border-white/[0.04] pointer-events-none flex items-center justify-center">
        <div className="w-[380px] h-[380px] rounded-full border border-white/[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 space-y-16 relative z-10">
        
        {/* Top Section: Newsletter Field Note Sign-off */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-12 border-b border-white/10">
          <div className="lg:col-span-7 space-y-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#C46A4A] block">
              CEYLON FIELD JOURNAL · DISPATCHES
            </span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-normal text-white leading-snug">
              Receive seasonal road notes, monsoons, &amp; quiet tea valley stays.
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#D2DEDC] max-w-lg leading-relaxed">
              Sent once monthly from our Colombo desk. Double opt-in verified; zero spam, unsubscribe anytime.
            </p>
          </div>

          <div className="lg:col-span-5 w-full">
            {newsletterStatus === "success" ? (
              <div className="p-4 rounded-lg bg-teal-950/80 border border-teal-500/40 text-xs font-mono text-teal-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verification email dispatched. Please confirm your subscription.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your personal email..."
                  className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs sm:text-sm font-sans focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "submitting"}
                  className="px-6 py-3 rounded-full bg-white text-brand-ink hover:bg-brand-paper font-sans text-xs font-semibold tracking-wider uppercase transition-colors shrink-0"
                >
                  {newsletterStatus === "submitting" ? "Sending..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Section: Editorial Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Colombo Office */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="white" size="md" />
            <p className="font-sans text-xs text-[#D2DEDC] leading-relaxed max-w-sm pt-2">
              ExploreX is a licensed Sri Lankan Destination Management Company (DMC) crafting bespoke private journeys, high-altitude tea trails, and coastal retreats.
            </p>
            <div className="pt-2">
              <button
                onClick={handleGeneralWhatsApp}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-sans text-xs font-semibold tracking-wide transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Concierge</span>
              </button>
            </div>
          </div>

          {/* Column 2: Journeys */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#C46A4A]">
              CURATED EXPEDITIONS
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#D2DEDC]">
              <li>
                <Link href="/packages/7-day-cultural-triangle-hill-country" className="hover:text-white transition-colors">
                  07-Day Cultural Triangle &amp; Tea
                </Link>
              </li>
              <li>
                <Link href="/packages/10-day-island-odyssey-wildlife-tea-beaches" className="hover:text-white transition-colors">
                  10-Day Island Odyssey Classic
                </Link>
              </li>
              <li>
                <Link href="/packages/8-day-romantic-ceylon-honeymoon" className="hover:text-white transition-colors">
                  08-Day Romantic Ceylon Honeymoon
                </Link>
              </li>
              <li>
                <Link href="/packages/6-day-wild-ceylon-safari-expedition" className="hover:text-white transition-colors">
                  06-Day Wild Ceylon Leopard Safari
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-white text-teal-300 transition-colors flex items-center gap-1 font-semibold">
                  <span>Custom Trip Builder</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Provinces */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#C46A4A]">
              PROVINCES
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#D2DEDC]">
              <li><Link href="/destinations/sigiriya" className="hover:text-white transition-colors">Sigiriya Fortress</Link></li>
              <li><Link href="/destinations/ella" className="hover:text-white transition-colors">Ella &amp; Nine Arch</Link></li>
              <li><Link href="/destinations/galle" className="hover:text-white transition-colors">Galle Dutch Fort</Link></li>
              <li><Link href="/destinations/yala" className="hover:text-white transition-colors">Yala Leopard Park</Link></li>
              <li><Link href="/destinations/nuwara-eliya" className="hover:text-white transition-colors">Nuwara Eliya Tea</Link></li>
              <li><Link href="/map" className="hover:text-white text-teal-300 font-semibold transition-colors">Island Cartography →</Link></li>
            </ul>
          </div>

          {/* Column 4: Colombo Operations */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#C46A4A]">
              COLOMBO DESK
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#D2DEDC]">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C46A4A] shrink-0 mt-0.5" />
                <span>Galle Face Promenade, Colombo 03</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C46A4A] shrink-0" />
                <span>+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C46A4A] shrink-0" />
                <span>hello@explorex.lk</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C46A4A] shrink-0 mt-0.5" />
                <span>Operations: 08:00 - 22:00 IST (24/7 WhatsApp on tour)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Sign-off & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#A2B8B5]">
          <div>
            © {new Date().getFullYear()} EXPLOREX TRAVEL AGENCY · SLTDA TS/DMC/2026/048
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/style-guide" className="hover:text-white text-[#C46A4A] transition-colors">Style Guide</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
