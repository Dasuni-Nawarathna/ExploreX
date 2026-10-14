import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { WhatsAppModalProvider } from "@/context/WhatsAppModalContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppModal } from "@/components/whatsapp/WhatsAppModal";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { CookieConsent } from "@/components/common/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL("https://explorex.lk"),
  title: {
    default: "ExploreX | Travel Agency — Tailor-Made Sri Lanka Tours & Stays",
    template: "%s | ExploreX Travel Agency"
  },
  description: "Experience the magic of Sri Lanka with ExploreX. Private chauffeured journeys, curated tour packages, luxury boutique hotels, wildlife safaris, and 24/7 direct WhatsApp booking.",
  keywords: [
    "Sri Lanka travel agency",
    "ExploreX",
    "Sri Lanka tours",
    "private chauffeur Sri Lanka",
    "Sigiriya tours",
    "Ella train tickets",
    "Yala leopard safari",
    "Galle Fort hotels",
    "Sri Lanka tailor made holidays",
    "Sri Lanka honeymoon packages"
  ],
  authors: [{ name: "ExploreX Travel Agency" }],
  creator: "ExploreX",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://explorex.lk",
    siteName: "ExploreX Travel Agency",
    title: "ExploreX | Premier Sri Lankan Tailor-Made Tours & Chauffeur Services",
    description: "Discover ancient citadels, misty tea hills, untamed wildlife, and tropical beaches. Direct bookings via WhatsApp.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Sigiriya Lion Rock Sri Lanka - ExploreX"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ExploreX — Sri Lankan Travel Agency",
    description: "Bespoke chauffeured tours, boutique hotels & wildlife safaris in Sri Lanka.",
    images: ["https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80"]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD structured data for TravelAgency schema
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "ExploreX Travel Agency",
    "alternateName": "ExploreX",
    "description": "Premier Sri Lankan destination management agency offering bespoke private tours, chauffeured transport, boutique hotels, and wildlife safaris.",
    "url": "https://explorex.lk",
    "logo": "https://explorex.lk/logo.svg",
    "image": "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80",
    "telephone": "+94 11 234 5678",
    "email": "hello@explorex.lk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No. 42, Galle Face Promenade",
      "addressLocality": "Colombo",
      "postalCode": "00300",
      "addressCountry": "LK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.9271,
      "longitude": 79.8612
    },
    "priceRange": "$$ - $$$$",
    "openingHours": "Mo-Su 08:00-22:00"
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F6F5F0] text-[#1F3F3B] font-sans antialiased selection:bg-[#2F5D58] selection:text-[#F6F5F0]">
        <AuthProvider>
          <CurrencyProvider>
            <LanguageProvider>
              <WhatsAppModalProvider>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
                <WhatsAppModal />
                <FloatingWhatsAppButton />
                <CookieConsent />
              </WhatsAppModalProvider>
            </LanguageProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
