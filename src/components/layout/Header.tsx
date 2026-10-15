"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";
import { useWhatsAppModal } from "@/context/WhatsAppModalContext";
import { useAuth } from "@/context/AuthContext";
import { CurrencyCode, LanguageCode } from "@/types";
import { WaveLine, WaveUnderline } from "@/components/motifs/WaveLine";
import { XMark } from "@/components/motifs/XMark";
import { 
  Menu, 
  MapPin, 
  Compass, 
  Car, 
  Hotel as HotelIcon, 
  Sparkles,
  MessageCircle,
  Globe,
  ArrowRight,
  BookOpen,
  User,
  LogOut,
  ShieldCheck
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { currency, setCurrency, currencies } = useCurrency();
  const { language, setLanguage, languages, t } = useLanguage();
  const { openWhatsAppModal } = useWhatsAppModal();
  const { user, logout } = useAuth();

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close overlay on path change
  useEffect(() => {
    setOverlayOpen(false);
  }, [pathname]);

  // Lock background scroll when overlay is open
  useEffect(() => {
    if (overlayOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [overlayOpen]);

  // Primary 5 clean links on desktop
  const primaryNavLinks = [
    { href: "/destinations", label: "Destinations" },
    { href: "/packages", label: "Packages" },
    { href: "/hotels", label: "Stays" },
    { href: "/builder", label: "Plan Your Trip" },
    { href: "/blog", label: "Journal" },
  ];

  const handleQuickWhatsApp = () => {
    openWhatsAppModal({
      itemType: "general",
      itemName: "Private Tour Consultation",
      travelersCount: 2,
      notes: "Hello ExploreX! I would like to plan a bespoke, chauffeured journey in Sri Lanka."
    });
  };

  const isDarkHero = !scrolled && pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#F6F5F0]/95 backdrop-blur-md border-b border-[#D2DEDC] py-3.5 shadow-xs text-brand-ink"
            : isDarkHero
            ? "bg-gradient-to-b from-[#162E2B]/95 via-[#1F3F3B]/60 to-transparent py-5 text-white"
            : "bg-transparent py-5 text-brand-ink"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            
            {/* Logo: switches dynamically to white on dark hero */}
            <div className="shrink-0">
              <Logo size="md" variant={isDarkHero ? "white" : "dark"} />
            </div>

            {/* Desktop 5 Primary Navigation Links */}
            <nav
              className={`hidden lg:flex items-center gap-7 text-sm font-sans font-medium ${
                isDarkHero ? "text-white/90" : "text-brand-ink"
              }`}
            >
              {primaryNavLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-1 transition-colors ${
                      isDarkHero
                        ? isActive
                          ? "text-white font-bold"
                          : "text-white/80 hover:text-white"
                        : isActive
                        ? "text-brand-ink font-bold"
                        : "text-brand-ink/85 hover:text-brand-terracotta"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0">
                        <WaveUnderline width="100%" color={isDarkHero ? "#E88B6A" : "#C46A4A"} />
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Bar */}
            <div className="flex items-center gap-3">
              
              {/* Customer Account Pill or Sign In Button */}
              {user ? (
                <Link
                  href="/account"
                  className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-sans font-medium transition-colors shadow-xs ${
                    isDarkHero
                      ? "border-white/30 bg-white/15 hover:bg-white/25 text-white backdrop-blur-md"
                      : "border-brand-ink-border bg-white/80 hover:bg-white text-brand-ink"
                  }`}
                  title="My Account Profile & Bookings"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold truncate max-w-[120px]">{user.name.split(" ")[0]}</span>
                  {user.isPhoneVerified && <span className="text-xs text-emerald-300">✓</span>}
                </Link>
              ) : (
                <Link
                  href="/login"
                  className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-sans font-semibold tracking-wide transition-colors shadow-xs ${
                    isDarkHero
                      ? "border-white/30 bg-white/15 hover:bg-white/25 text-white backdrop-blur-md"
                      : "border-brand-ink-border bg-white/80 hover:bg-white text-brand-ink"
                  }`}
                >
                  <User className={`w-4 h-4 ${isDarkHero ? "text-white/90" : "text-brand-terracotta"}`} />
                  <span>Sign In</span>
                </Link>
              )}

              {/* Refined Brand WhatsApp Consultation CTA (Orange/Terracotta like reference Book Now) */}
              <button
                onClick={handleQuickWhatsApp}
                className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm font-semibold tracking-wide transition-all active:scale-98 shadow-md ${
                  isDarkHero
                    ? "bg-brand-terracotta hover:bg-[#A95436] text-white shadow-brand-terracotta/30"
                    : "bg-brand-ink text-brand-paper hover:bg-brand-teal"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                <MessageCircle className="w-4 h-4" />
                <span>Consultation</span>
              </button>

              {/* Hamburger "Menu" Toggle */}
              <button
                type="button"
                onClick={() => setOverlayOpen(true)}
                aria-label="Open exploration menu"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-sans font-semibold tracking-wide transition-colors ${
                  isDarkHero
                    ? "border-white/30 bg-white/15 hover:bg-white/25 text-white backdrop-blur-md"
                    : "border-brand-ink-border bg-white/70 hover:bg-white text-brand-ink"
                }`}
              >
                <Menu className={`w-4 h-4 ${isDarkHero ? "text-white" : "text-brand-ink"}`} />
                <span className="font-semibold">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================
       * FULL-SCREEN REFINED OVERLAY MENU
       * Houses: Interactive Map, Fleet, About, Contact, Currency, Language, Account
       * ======================================================== */}
      {overlayOpen && (
        <div className="fixed inset-0 z-50 bg-[#F6F5F0] overflow-y-auto animate-in fade-in duration-200 text-brand-ink">
          <div className="min-h-full flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between border-b border-brand-ink-border pb-6">
              <Logo size="md" />
              <button
                onClick={() => setOverlayOpen(false)}
                aria-label="Close menu"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-ink text-brand-ink font-mono text-xs uppercase tracking-wider hover:bg-brand-ink hover:text-white transition-colors"
              >
                <span>Close</span>
                <XMark size={14} />
              </button>
            </div>

            {/* Menu Body: 2-Column Editorial Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-12 items-start">
              
              {/* Left Column: Primary & Extended Site Links */}
              <div className="lg:col-span-7 space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-terracotta block">
                  EXPLORATION INDEX
                </span>
                <div className="space-y-3 font-serif text-3xl sm:text-5xl font-normal leading-tight">
                  <div>
                    <Link
                      href="/destinations"
                      onClick={() => setOverlayOpen(false)}
                      className="hover:text-brand-terracotta hover:italic transition-all flex items-baseline justify-between group"
                    >
                      <span>01. Island Destinations</span>
                      <span className="font-mono text-xs font-normal text-brand-ink-faint not-italic">10 UNESCO &amp; COASTAL</span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/packages"
                      onClick={() => setOverlayOpen(false)}
                      className="hover:text-brand-terracotta hover:italic transition-all flex items-baseline justify-between group"
                    >
                      <span>02. Tour Packages</span>
                      <span className="font-mono text-xs font-normal text-brand-ink-faint not-italic">08 CURATED EXPEDITIONS</span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/hotels"
                      onClick={() => setOverlayOpen(false)}
                      className="hover:text-brand-terracotta hover:italic transition-all flex items-baseline justify-between group"
                    >
                      <span>03. Boutique Stays &amp; Villas</span>
                      <span className="font-mono text-xs font-normal text-brand-ink-faint not-italic">12 RESORTS</span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/map"
                      onClick={() => setOverlayOpen(false)}
                      className="hover:text-brand-terracotta hover:italic transition-all flex items-baseline justify-between group"
                    >
                      <span>04. Interactive Map</span>
                      <span className="font-mono text-xs font-normal text-brand-ink-faint not-italic">CARTOGRAPHY</span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/builder"
                      onClick={() => setOverlayOpen(false)}
                      className="hover:text-brand-terracotta hover:italic transition-all flex items-baseline justify-between group"
                    >
                      <span>05. Custom Trip Builder</span>
                      <span className="font-mono text-xs font-normal text-brand-ink-faint not-italic">BESPOKE</span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/vehicles"
                      onClick={() => setOverlayOpen(false)}
                      className="hover:text-brand-terracotta hover:italic transition-all flex items-baseline justify-between group"
                    >
                      <span>06. Transport &amp; Chauffeur Fleet</span>
                      <span className="font-mono text-xs font-normal text-brand-ink-faint not-italic">PRIVATE CARS &amp; VANS</span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="/blog"
                      onClick={() => setOverlayOpen(false)}
                      className="hover:text-brand-terracotta hover:italic transition-all flex items-baseline justify-between group"
                    >
                      <span>07. Travel Journal &amp; Tips</span>
                      <span className="font-mono text-xs font-normal text-brand-ink-faint not-italic">FIELD NOTES</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Account Portal, Currency, Language & WhatsApp */}
              <div className="lg:col-span-5 space-y-6 bg-white p-7 sm:p-8 rounded-lg border border-brand-ink-border">
                
                {/* Explorer Account Portal Section */}
                <div className="space-y-3 pb-5 border-b border-brand-ink-border/60">
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-terracotta block">
                    EXPLORER ACCOUNT
                  </span>

                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <strong className="block font-serif text-lg text-brand-ink">{user.name}</strong>
                          <span className="font-mono text-xs text-brand-ink-muted">{user.email}</span>
                        </div>
                        <span className="font-mono text-[10px] uppercase bg-[#FAF9F5] px-2 py-0.5 rounded-sm border border-brand-ink-border">
                          {user.role}
                        </span>
                      </div>

                      {user.phone && (
                        <div className="flex items-center gap-1.5 font-mono text-xs text-brand-ink">
                          <span className="text-brand-ink-muted">WhatsApp:</span>
                          <span>{user.phone}</span>
                          {user.isPhoneVerified && (
                            <span className="text-emerald-700 font-bold ml-1">✓ Verified</span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-1 font-mono text-xs">
                        <Link
                          href="/account"
                          onClick={() => setOverlayOpen(false)}
                          className="flex-1 py-2 text-center rounded-full bg-brand-ink text-[#F6F5F0] hover:bg-brand-teal transition-colors"
                        >
                          My Account &amp; Bookings
                        </Link>
                        {user.role !== "CUSTOMER" && (
                          <Link
                            href="/admin"
                            onClick={() => setOverlayOpen(false)}
                            className="py-2 px-3 rounded-full border border-brand-ink text-brand-ink hover:bg-[#FAF9F5] transition-colors"
                          >
                            Admin
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setOverlayOpen(false);
                            logout();
                          }}
                          className="p-2 rounded-full border border-brand-ink-border hover:border-brand-ink text-brand-ink transition-colors"
                          title="Sign Out"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <p className="font-sans text-xs text-brand-ink-muted leading-relaxed">
                        Sign in to reserve tour packages, track bespoke enquiries, and verify your WhatsApp concierge.
                      </p>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <Link
                          href="/login"
                          onClick={() => setOverlayOpen(false)}
                          className="flex-1 py-2 text-center rounded-full bg-brand-ink text-[#F6F5F0] hover:bg-brand-teal transition-colors"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setOverlayOpen(false)}
                          className="flex-1 py-2 text-center rounded-full border border-brand-ink text-brand-ink hover:bg-[#FAF9F5] transition-colors"
                        >
                          Create Account
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Currency & Language Controls */}
                <div className="space-y-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-terracotta block">
                    PREFERENCES
                  </span>

                  {/* Currency selector tabs */}
                  <div className="space-y-1.5">
                    <span className="font-sans text-xs font-semibold text-brand-ink-muted block">Currency</span>
                    <div className="grid grid-cols-4 gap-2">
                      {(Object.keys(currencies) as CurrencyCode[]).map((cCode) => (
                        <button
                          key={cCode}
                          onClick={() => setCurrency(cCode)}
                          className={`py-1.5 rounded-md font-mono text-xs font-semibold border transition-all ${
                            currency === cCode
                              ? "bg-brand-ink text-brand-paper border-brand-ink"
                              : "bg-[#FAF9F5] text-brand-ink border-brand-ink-border hover:border-brand-ink"
                          }`}
                        >
                          {cCode} ({currencies[cCode].symbol})
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Language selection */}
                  <div className="space-y-1.5 pt-1">
                    <span className="font-sans text-xs font-semibold text-brand-ink-muted block">Language</span>
                    <div className="grid grid-cols-2 gap-2">
                      {(Object.keys(languages) as LanguageCode[]).map((lCode) => (
                        <button
                          key={lCode}
                          onClick={() => setLanguage(lCode)}
                          className={`p-2 rounded-md text-xs flex items-center justify-between border transition-all ${
                            language === lCode
                              ? "bg-brand-ink text-brand-paper border-brand-ink font-semibold"
                              : "bg-[#FAF9F5] text-brand-ink border-brand-ink-border hover:border-brand-ink"
                          }`}
                        >
                          <span>{languages[lCode].flag} {languages[lCode].nativeName}</span>
                          <span className="font-mono text-[10px] uppercase opacity-70">{lCode}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Concierge Block */}
                <div className="pt-4 border-t border-brand-ink-border/60 space-y-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-terracotta block">
                    WHATSAPP CONCIERGE
                  </span>
                  <p className="font-sans text-xs text-brand-ink-muted leading-relaxed">
                    Chat directly with our senior destination designers in Colombo. Inquiries answered within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setOverlayOpen(false);
                      handleQuickWhatsApp();
                    }}
                    className="w-full py-3 rounded-full bg-brand-ink hover:bg-brand-teal text-brand-paper font-sans text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire via WhatsApp (+94 77 123 4567)</span>
                  </button>
                </div>

                {/* Secondary Site Links */}
                <div className="pt-4 border-t border-brand-ink-border/60 flex flex-wrap gap-4 text-xs font-sans text-brand-ink-muted">
                  <Link href="/about" onClick={() => setOverlayOpen(false)} className="hover:text-brand-ink underline">About ExploreX</Link>
                  <Link href="/contact" onClick={() => setOverlayOpen(false)} className="hover:text-brand-ink underline">Contact &amp; Offices</Link>
                  <Link href="/faq" onClick={() => setOverlayOpen(false)} className="hover:text-brand-ink underline">FAQs</Link>
                  <Link href="/style-guide" onClick={() => setOverlayOpen(false)} className="hover:text-brand-terracotta underline font-mono">Style Guide</Link>
                </div>
              </div>

            </div>

            {/* Bottom Footer Note */}
            <div className="pt-6 border-t border-brand-ink-border flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-brand-ink-faint">
              <div>EXPLOREX TRAVEL AGENCY · COLOMBO, SRI LANKA</div>
              <div>07° 57&apos; N · 80° 45&apos; E · LICENSED SLTDA DMC</div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
