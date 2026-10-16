"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/brand/Logo";
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck, 
  KeyRound,
  UserCheck
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [requires2FA, setRequires2FA] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await login({ email, password, totpCode: totpCode || undefined });
    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    if (result.requires2FA) {
      setRequires2FA(true);
      return;
    }

    // Direct routing based on redirect or role
    if (redirectUrl) {
      router.push(redirectUrl);
    } else if (email.includes("admin") || email.includes("manager") || email.includes("editor") || email.includes("agent")) {
      router.push("/admin");
    } else {
      router.push("/account");
    }
  };

  const setDemoCredentials = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    setRequires2FA(false);
    setTotpCode("");
    setError("");
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-lg border border-brand-ink-border shadow-xs animate-in fade-in duration-300 text-brand-ink">
      <div className="text-center space-y-3">
        <Logo size="md" className="mx-auto" />
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand-terracotta pt-2">
          CLIENT &amp; EXPLORER PORTAL
        </div>
        <h1 className="font-serif text-3xl font-normal tracking-tight text-brand-ink">
          Sign In to ExploreX
        </h1>
        <p className="font-sans text-xs text-brand-ink-muted leading-relaxed">
          Log in as a registered customer to reserve tour packages, track custom journeys, and verify your WhatsApp concierge.
        </p>
      </div>

      {redirectUrl && (
        <div className="p-3 bg-[#FAF9F5] border border-brand-terracotta/40 rounded-sm text-xs font-sans text-brand-ink flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta shrink-0" />
          <span>Please sign in to complete your selected tour package reservation.</span>
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
            <Mail className="w-3.5 h-3.5 text-brand-terracotta" />
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="e.g. customer@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-brand-ink-border rounded-md text-brand-ink font-sans text-xs focus:outline-none focus:border-brand-ink"
          />
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1.5 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-brand-terracotta" />
            Password
          </label>
          <input
            type="password"
            required
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-brand-ink-border rounded-md text-brand-ink font-sans text-xs focus:outline-none focus:border-brand-ink"
          />
        </div>

        {requires2FA && (
          <div className="space-y-1 pt-1 animate-in fade-in">
            <label className="block font-mono text-[11px] uppercase tracking-wider text-brand-ink mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-brand-terracotta" />
              6-Digit Authenticator Code
            </label>
            <input
              type="text"
              maxLength={6}
              placeholder="000000"
              value={totpCode}
              onChange={(e) => setTotpCode(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-brand-ink-border rounded-md text-brand-ink font-mono text-center tracking-widest text-base focus:outline-none focus:border-brand-ink"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-full bg-brand-ink hover:bg-brand-teal text-[#F6F5F0] font-sans text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs disabled:opacity-50 mt-2"
        >
          <span>{loading ? "Authenticating..." : requires2FA ? "Verify & Sign In" : "Sign In to Account"}</span>
          <ArrowRight className="w-4 h-4 text-brand-terracotta" />
        </button>
      </form>

      {/* Registration switch */}
      <div className="text-center pt-2 border-t border-brand-ink-border/60">
        <p className="font-sans text-xs text-brand-ink-muted">
          New explorer on ExploreX?{" "}
          <Link
            href={redirectUrl ? `/register?redirect=${encodeURIComponent(redirectUrl)}` : "/register"}
            className="text-brand-ink font-semibold underline hover:text-brand-terracotta transition-colors"
          >
            Create an Account
          </Link>
        </p>
      </div>

      {/* Fast Demo Logins for Pair Review */}
      <div className="pt-2 border-t border-dashed border-brand-ink-border space-y-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-brand-ink-muted block text-center">
          QUICK DEMO ACCOUNTS (1-CLICK TEST)
        </span>
        <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
          <button
            type="button"
            onClick={() => setDemoCredentials("customer@example.com", "Customer@2026!")}
            className="p-2 bg-[#FAF9F5] border border-brand-ink-border rounded-sm text-left hover:border-brand-ink transition-colors flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5 text-brand-terracotta shrink-0" />
            <div className="truncate">
              <strong className="block text-brand-ink">Customer</strong>
              <span className="text-[9px] text-brand-ink-muted">customer@example.com</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setDemoCredentials("admin@explorex.lk", "ExploreX@2026!")}
            className="p-2 bg-[#FAF9F5] border border-brand-ink-border rounded-sm text-left hover:border-brand-ink transition-colors flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-brand-ink shrink-0" />
            <div className="truncate">
              <strong className="block text-brand-ink">Super Admin</strong>
              <span className="text-[9px] text-brand-ink-muted">admin@explorex.lk</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#F6F5F0]">
      <Suspense fallback={<div className="text-xs font-mono text-brand-ink">Loading portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
