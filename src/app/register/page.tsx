"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/brand/Logo";
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck,
  Phone,
  MessageCircle
} from "lucide-react";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";

  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await register({ 
      name, 
      email, 
      password,
      phone: phone.trim() || undefined
    });
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (redirectUrl) {
      router.push(redirectUrl);
    } else {
      router.push("/account");
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-lg border border-brand-ink-border shadow-xs animate-in fade-in duration-300 text-brand-ink">
      <div className="text-center space-y-3">
        <Logo size="md" className="mx-auto" />
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-terracotta pt-2">
          CLIENT REGISTRATION
        </div>
        <h1 className="font-serif text-3xl font-normal tracking-tight text-brand-ink">
          Create Explorer Account
        </h1>
        <p className="font-sans text-xs text-brand-ink-muted leading-relaxed">
          Register to reserve private tour packages, customize road itineraries, and unlock verified WhatsApp concierge support.
        </p>
      </div>

      {redirectUrl && (
        <div className="p-3 bg-[#FAF9F5] border border-brand-terracotta/40 rounded-sm text-xs font-sans text-brand-ink flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta shrink-0" />
          <span>Create your account to complete your selected tour package booking.</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-md bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in font-sans">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-brand-terracotta" />
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Eleanor Vance"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-brand-ink-border rounded-md text-brand-ink font-sans text-xs focus:outline-none focus:border-brand-ink"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-brand-terracotta" />
            Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="e.g. eleanor@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-brand-ink-border rounded-md text-brand-ink font-sans text-xs focus:outline-none focus:border-brand-ink"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-terracotta" />
              Traveler WhatsApp Number
            </span>
            <span className="text-[10px] text-brand-ink-muted">Country code included</span>
          </label>
          <input
            type="tel"
            placeholder="e.g. +44 7911 123456 or +94 77 123 4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-brand-ink-border rounded-md text-brand-ink font-sans text-xs focus:outline-none focus:border-brand-ink"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1.5 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-brand-terracotta" />
            Password *
          </label>
          <input
            type="password"
            required
            placeholder="Min 8 chars, 1 uppercase & 1 number"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-brand-ink-border rounded-md text-brand-ink font-sans text-xs focus:outline-none focus:border-brand-ink"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs disabled:opacity-50 mt-2"
        >
          <span>{loading ? "Registering..." : "Create Account & Continue"}</span>
          <ArrowRight className="w-4 h-4 text-brand-terracotta" />
        </button>
      </form>

      <div className="text-center pt-2 border-t border-brand-ink-border/60">
        <p className="font-sans text-xs text-brand-ink-muted">
          Already have an account?{" "}
          <Link
            href={redirectUrl ? `/login?redirect=${encodeURIComponent(redirectUrl)}` : "/login"}
            className="text-brand-ink font-semibold underline hover:text-brand-terracotta transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-brand-ink-muted pt-2 border-t border-dashed border-brand-ink-border">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-terracotta" />
        <span>Data strictly confidential · No advertising spam</span>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#F6F5F0]">
      <Suspense fallback={<div className="text-xs font-mono text-brand-ink">Loading registration...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
