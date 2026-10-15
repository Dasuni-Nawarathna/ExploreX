import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ChevronDown, MessageCircle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | ExploreX Sri Lanka",
  description: "Answers to common questions about traveling to Sri Lanka: visa ETA, best travel seasons, chauffeur services, tipping, currency, and WhatsApp booking."
};

export default function FAQPage() {
  const faqs = [
    {
      q: "Do I need a visa to travel to Sri Lanka?",
      a: "Yes, most international travelers require an Electronic Travel Authorization (ETA) before arriving in Sri Lanka. The tourist visa can easily be obtained online via the official Sri Lankan government portal (srilankaevisa.lk) prior to your departure. It usually grants a 30-day double-entry stay and takes 24-48 hours to be approved."
    },
    {
      q: "When is the best time of year to visit Sri Lanka?",
      a: "Because Sri Lanka is influenced by two distinct monsoon systems, it is a true year-round paradise! From November to April, the South and West coasts (Galle, Mirissa, Colombo, Bentota) and the Cultural Triangle experience calm turquoise seas and glorious sunshine. From May to October, the East coast (Trincomalee, Nilaveli, Pasikudah, Arugam Bay) enjoys peak dry sunny weather and pristine coral diving."
    },
    {
      q: "Do I have to pay for the chauffeur's hotel and meals?",
      a: "No! When you book a private tour or vehicle with ExploreX, your chauffeur's accommodation, daily food allowance, fuel, highway tolls, and parking fees are 100% covered in our quoted rate. Most Sri Lankan hotels provide complimentary driver quarters; in places where they do not, our agency pays for nearby driver accommodation directly."
    },
    {
      q: "How does the ExploreX WhatsApp booking flow work?",
      a: "We believe travel planning should be human, conversational, and effortless. When you find a package or hotel on our website, clicking 'Book via WhatsApp' opens a quick customization modal where you can select your travel dates and passenger count. This formats a WhatsApp message with the exact reference code. Once sent, our destination specialist confirms availability, customizes the itinerary to your wishes, and provides a formal quote."
    },
    {
      q: "What is the tipping etiquette for drivers and safari guides in Sri Lanka?",
      a: "While tipping is discretionary, it is customary in Sri Lanka to reward attentive service. As a general benchmark, travelers typically tip their private chauffeur between $15 to $25 USD per day for the entire group if satisfied. For a 4x4 national park safari driver and wildlife tracker, a tip of $10 to $15 USD per game drive is customary."
    },
    {
      q: "Are credit cards widely accepted in Sri Lanka?",
      a: "Major credit cards (Visa and Mastercard) are widely accepted across luxury hotels, boutique restaurants, and supermarkets in Colombo, Kandy, Galle, and major tourist hubs. However, for tea shops, local street fruit stalls, tuk-tuk rides, and temple entrance donation boxes, having cash in Sri Lankan Rupees (LKR) is essential. ATMs are readily available across all towns."
    },
    {
      q: "What is your cancellation and deposit policy?",
      a: "To confirm a bespoke multi-day private tour, a small refundable deposit of 20% is typically required to secure hotel allocations and train reservations. The remaining balance can be settled 14 days before arrival or upon arrival in Sri Lanka. Full refunds are provided for cancellations made up to 21 days prior to travel."
    }
  ];

  return (
    <div className="py-12 sm:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 text-brand-teal text-xs font-bold tracking-wide">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Travel Advice & Clarifications</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about planning a seamless, stress-free holiday to Sri Lanka with ExploreX.
        </p>
      </div>

      {/* Accordion FAQ Cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm open:ring-2 open:ring-brand-teal/20 transition-all duration-200"
          >
            <summary className="flex items-center justify-between font-bold text-stone-900 text-base sm:text-lg cursor-pointer list-none select-none">
              <span>{faq.q}</span>
              <span className="p-1 rounded-full bg-stone-100 text-stone-500 group-open:rotate-180 transition-transform duration-200 shrink-0 ml-4">
                <ChevronDown className="w-4 h-4" />
              </span>
            </summary>
            <p className="mt-4 pt-4 border-t border-stone-100 text-xs sm:text-sm text-stone-600 leading-relaxed">
              {faq.a}
            </p>
          </details>
        ))}
      </div>

      {/* Help Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-teal-50 border border-teal-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-stone-900 text-base">Have a question not listed here?</h4>
            <p className="text-xs text-stone-600">Our local island specialists are happy to answer any personal query on WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/94771234567?text=Hello%20ExploreX!%20I%20have%20a%20question%20about%20traveling%20to%20Sri%20Lanka."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-2xl bg-brand-whatsapp hover:bg-brand-whatsapp-dark text-white font-bold text-xs shadow-md flex items-center gap-2 shrink-0 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

