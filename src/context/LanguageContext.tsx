"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { LanguageCode, LanguageConfig } from "@/types";

export const LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  en: { code: "en", label: "English", nativeName: "English", flag: "🇬🇧" },
  si: { code: "si", label: "Sinhala", nativeName: "සිංහල", flag: "🇱🇰" },
  ta: { code: "ta", label: "Tamil", nativeName: "தமிழ்", flag: "🇱🇰" },
  de: { code: "de", label: "German", nativeName: "Deutsch", flag: "🇩🇪" },
};

const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.destinations": "Destinations",
    "nav.packages": "Tour Packages",
    "nav.hotels": "Hotels & Stays",
    "nav.map": "Interactive Map",
    "nav.builder": "Custom Trip Builder",
    "nav.vehicles": "Transport & Fleet",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.faq": "FAQ",
    "nav.blog": "Travel Blog",
    "cta.book_whatsapp": "Enquire via WhatsApp",
    "cta.explore_now": "Explore Packages",
    "cta.plan_custom": "Plan Custom Trip",
    "hero.badge": "★ Sri Lanka's Premier Tailor-Made Travel Specialists",
    "hero.title": "Discover the Soul of Sri Lanka",
    "hero.subtitle": "Private chauffeured journeys, hand-picked boutique villas, and unforgettable tropical adventures curated with local warmth.",
    "search.destination": "Where in Sri Lanka?",
    "search.destination_placeholder": "Sigiriya, Ella, Galle, Yala...",
    "search.dates": "Travel Month",
    "search.dates_placeholder": "Select month / season",
    "search.travelers": "Travelers",
    "search.btn": "Search Tours",
    "common.from": "From",
    "common.per_person": "per person",
    "common.per_night": "per night",
    "common.view_details": "View Details",
    "common.ref": "Ref",
    "whatsapp.floating": "Chat on WhatsApp",
    "whatsapp.online": "Travel Specialists Online"
  },
  si: {
    "nav.home": "මුල් පිටුව",
    "nav.destinations": "ගමනාන්ත",
    "nav.packages": "සංචාර පැකේජ",
    "nav.hotels": "හෝටල්",
    "nav.map": "සිතියම",
    "nav.builder": "අභිරුචි සංචාරය",
    "nav.vehicles": "වාහන සේවාව",
    "nav.about": "අප ගැන",
    "nav.contact": "අමතන්න",
    "nav.faq": "නිතර අසන පැන",
    "nav.blog": "සංචාරක බ්ලොග්",
    "cta.book_whatsapp": "WhatsApp මගින් විමසන්න",
    "cta.explore_now": "පැකේජ ගවේෂණය",
    "cta.plan_custom": "සංචාරයක් සැලසුම් කරන්න",
    "hero.badge": "★ ශ්‍රී ලංකාවේ ප්‍රමුඛතම සංචාරක නියෝජිතායතනය",
    "hero.title": "විශ්මිත ශ්‍රී ලංකාව ගවේෂණය කරන්න",
    "hero.subtitle": "පෞද්ගලික රියදුරු සමග සුඛෝපභෝගී සංචාර, සුන්දර හෝටල් සහ අමතක නොවන අත්දැකීම්.",
    "search.destination": "ගමනාන්තය?",
    "search.destination_placeholder": "සීගිරිය, ඇල්ල, ගාල්ල, යාල...",
    "search.dates": "සංචාරක මාසය",
    "search.dates_placeholder": "මාසය තෝරන්න",
    "search.travelers": "සංචාරකයින් ගණන",
    "search.btn": "සොයන්න",
    "common.from": "සිට",
    "common.per_person": "පුද්ගලයෙකුට",
    "common.per_night": "රාත්‍රියකට",
    "common.view_details": "තොරතුරු බලන්න",
    "common.ref": "අංකය",
    "whatsapp.floating": "WhatsApp මගින් කතාබස් කරන්න",
    "whatsapp.online": "සංචාරක උපදේශකයින් සූදානම්"
  },
  ta: {
    "nav.home": "முகப்பு",
    "nav.destinations": "சேருமிடங்கள்",
    "nav.packages": "சுற்றுலா தொகுப்புகள்",
    "nav.hotels": "விடுதிகள்",
    "nav.map": "ஊடாடும் வரைபடம்",
    "nav.builder": "தனிப்பயன் பயணம்",
    "nav.vehicles": "வாகனங்கள்",
    "nav.about": "எங்களை பற்றி",
    "nav.contact": "தொடர்பு",
    "nav.faq": "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    "nav.blog": "வலைப்பதிவு",
    "cta.book_whatsapp": "WhatsApp மூலம் விசாரிக்கவும்",
    "cta.explore_now": "தொகுப்புகளை ஆராயுங்கள்",
    "cta.plan_custom": "பயணத்தை திட்டமிடுங்கள்",
    "hero.badge": "★ இலங்கையின் முதன்மை சுற்றுலா நிறுவனம்",
    "hero.title": "அழகிய இலங்கையை கண்டறியுங்கள்",
    "hero.subtitle": "தனிப்பயனாக்கப்பட்ட ஆடம்பர பயணங்கள் மற்றும் மறக்க முடியாத அனுபவங்கள்.",
    "search.destination": "எங்கு செல்ல விரும்புகிறீர்கள்?",
    "search.destination_placeholder": "சிகிரியா, கண்டி, காலி...",
    "search.dates": "பயண மாதம்",
    "search.dates_placeholder": "மாதத்தை தேர்ந்தெடுக்கவும்",
    "search.travelers": "பயணிகள்",
    "search.btn": "தேடுங்கள்",
    "common.from": "இருந்து",
    "common.per_person": "ஒரு நபருக்கு",
    "common.per_night": "ஒரு இரவுக்கு",
    "common.view_details": "விவரங்களை பார்க்க",
    "common.ref": "குறிப்பு",
    "whatsapp.floating": "WhatsApp தொடர்பு",
    "whatsapp.online": "உதவியாளர்கள் தயார்"
  },
  de: {
    "nav.home": "Startseite",
    "nav.destinations": "Reiseziele",
    "nav.packages": "Rundreisen",
    "nav.hotels": "Hotels & Lodges",
    "nav.map": "Interaktive Karte",
    "nav.builder": "Reise Planen",
    "nav.vehicles": "Fahrzeuge",
    "nav.about": "Über Uns",
    "nav.contact": "Kontakt",
    "nav.faq": "FAQ",
    "nav.blog": "Reiseblog",
    "cta.book_whatsapp": "Über WhatsApp Anfragen",
    "cta.explore_now": "Reisen Entdecken",
    "cta.plan_custom": "Individuelle Reise",
    "hero.badge": "★ Sri Lankas Spezialist für Maßgeschneiderte Reisen",
    "hero.title": "Entdecken Sie die Seele Sri Lankas",
    "hero.subtitle": "Private Rundreisen mit Chauffeur, handverlesene Boutique-Villen und erstklassige Erlebnisse.",
    "search.destination": "Wohin in Sri Lanka?",
    "search.destination_placeholder": "Sigiriya, Ella, Galle, Yala...",
    "search.dates": "Reisemonat",
    "search.dates_placeholder": "Monat wählen",
    "search.travelers": "Reisende",
    "search.btn": "Touren Suchen",
    "common.from": "Ab",
    "common.per_person": "pro Person",
    "common.per_night": "pro Nacht",
    "common.view_details": "Details Ansehen",
    "common.ref": "Ref",
    "whatsapp.floating": "WhatsApp Chat",
    "whatsapp.online": "Reiseberater Online"
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (key: string) => string;
  languages: Record<LanguageCode, LanguageConfig>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  useEffect(() => {
    const saved = localStorage.getItem("explorex_language") as LanguageCode | null;
    if (saved && LANGUAGES[saved]) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (code: LanguageCode) => {
    setLanguageState(code);
    if (typeof window !== "undefined") {
      localStorage.setItem("explorex_language", code);
    }
  };

  const t = (key: string): string => {
    const dict = translations[language] || translations.en;
    return dict[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

