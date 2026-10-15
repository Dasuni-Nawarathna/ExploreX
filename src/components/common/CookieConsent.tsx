"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { XMark } from "@/components/motifs/XMark";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("explorex_cookie_consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("explorex_cookie_consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("explorex_cookie_consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 z-30 max-w-sm sm:max-w-md bg-[#F6F5F0] border border-brand-ink-border p-4 rounded-lg shadow-md animate-in fade-in duration-300">
      <div className="space-y-2.5">
        <div className="flex items-center justify-between font-mono text-[11px] text-brand-terracotta">
          <span>PRIVACY &amp; ESSENTIAL COOKIES</span>
          <button
            onClick={decline}
            aria-label="Dismiss cookie notice"
            className="text-brand-ink-faint hover:text-brand-ink"
          >
            <XMark size={13} />
          </button>
        </div>
        <p className="font-sans text-xs text-brand-ink-muted leading-relaxed">
          We use functional cookies to preserve your currency selection and travel preferences. Read our{" "}
          <Link href="/privacy" className="text-brand-ink underline">
            Privacy Policy
          </Link>.
        </p>
        <div className="flex items-center gap-2 pt-0.5">
          <button
            onClick={accept}
            className="px-3.5 py-1.5 rounded-full bg-brand-ink text-brand-paper hover:bg-brand-teal font-sans text-xs font-semibold transition-colors"
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="px-3.5 py-1.5 rounded-full border border-brand-ink-border text-brand-ink hover:bg-white font-sans text-xs font-medium transition-colors"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}
