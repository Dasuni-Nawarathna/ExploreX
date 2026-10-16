import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ExploreX Travel Agency",
  description: "ExploreX's privacy policy, data collection policies, user consent protocols, and cookie guidelines."
};

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Privacy Policy & Data Protection
        </h1>
        <p className="text-xs text-stone-500">Effective Date: November 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/90 shadow-sm space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-bold text-stone-900 text-base">1. Commitment to Privacy</h2>
          <p>
            ExploreX respects your personal privacy. We do not sell, rent, or trade your personal information with external marketers or third parties. Information provided during tour customization, WhatsApp inquiries, or website contact is strictly used for designing your travel itinerary.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-stone-900 text-base">2. Information We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Contact details:</strong> Name, WhatsApp number, email address, and country of residence.</li>
            <li><strong>Travel preferences:</strong> Chosen destinations, party size, dietary requirements, vehicle style, and dates.</li>
            <li><strong>WhatsApp Inquiry Logging:</strong> When you submit an enquiry via our pre-WhatsApp booking modal, with your explicit consent, details are stored in our secure database for tour consultant follow-up and analytics. If consent is declined, your details are fully masked and anonymized.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-stone-900 text-base">3. Cookie Usage</h2>
          <p>
            We use lightweight browser storage and essential cookies to remember your active currency selection (USD, LKR, EUR, GBP) and language preferences. No cross-site tracking or advertising cookies are deployed.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-stone-900 text-base">4. Contact Our Data Controller</h2>
          <p>
            To request deletion or review of your stored inquiry data, contact our team directly at <strong>privacy@explorex.lk</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}

