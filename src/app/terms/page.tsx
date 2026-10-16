import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | ExploreX Travel Agency",
  description: "Terms of service, booking policies, deposits, liability, and cancellation terms for ExploreX tours."
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Terms & Conditions of Booking
        </h1>
        <p className="text-xs text-stone-500">Last updated: November 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/90 shadow-sm space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-bold text-stone-900 text-base">1. Agreement to Terms</h2>
          <p>
            By booking a tour, private chauffeur vehicle, or accommodation service through ExploreX Travel Agency (referred to as &quot;ExploreX&quot;, &quot;we&quot;, &quot;us&quot;), you agree to be bound by these Terms and Conditions. ExploreX is an officially licensed Destination Management Company registered under the Sri Lanka Tourism Development Authority (SLTDA).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-stone-900 text-base">2. Booking, Quotations & Confirmation</h2>
          <p>
            All custom trip quotes provided via WhatsApp, email, or our Custom Trip Builder are valid for 14 calendar days from the date of issuance. A booking is considered confirmed once a mutually agreed deposit (typically 20%) is received and our formal booking voucher is issued.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-stone-900 text-base">3. Inclusions & Chauffeur Services</h2>
          <p>
            Private tour rates include vehicle hire, fuel, dedicated driver-guide daily allowances, parking fees, highway toll fees, and passenger insurance. Chauffeur accommodation is handled directly by ExploreX without additional charges to the client. Normal driving hours are up to 10 hours per day within safe daylight driving limits.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-stone-900 text-base">4. Cancellation & Refund Policy</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>21 days or more prior to arrival:</strong> Full refund of deposit minus transaction/banking charges.</li>
            <li><strong>14 to 20 days prior to arrival:</strong> 50% deposit refund.</li>
            <li><strong>Less than 14 days prior to arrival:</strong> Deposit is non-refundable due to immediate hotel allocation guarantees.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-bold text-stone-900 text-base">5. Travel Insurance & Health</h2>
          <p>
            Travelers are strongly advised to secure comprehensive international travel insurance covering medical expenses, emergency repatriation, trip cancellation, and baggage loss.
          </p>
        </section>
      </div>
    </div>
  );
}

