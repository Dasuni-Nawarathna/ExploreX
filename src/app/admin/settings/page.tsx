"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { SiteSettings } from "@/types";
import { 
  Settings, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Lock, 
  Check, 
  AlertCircle,
  QrCode,
  KeyRound,
  RefreshCw,
  Sparkles
} from "lucide-react";

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 2FA state
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [totpData, setTotpData] = useState<{
    secret: string;
    qrCodeDataUrl: string;
    recoveryCodes: string[];
  } | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [totpActivating, setTotpActivating] = useState(false);
  const [totpSuccess, setTotpSuccess] = useState(false);
  const [totpError, setTotpError] = useState("");

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error("Failed to fetch settings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setErrorMsg("");
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to save settings. Super Admin role required.");
      } else {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch {
      setErrorMsg("Network error saving configuration.");
    } finally {
      setSaving(false);
    }
  };

  // 2FA Start
  const start2FASetup = async () => {
    setShow2FAModal(true);
    setTotpError("");
    try {
      const res = await fetch("/api/auth/2fa");
      if (res.ok) {
        const data = await res.json();
        setTotpData(data);
      } else {
        setTotpError("Failed to initiate 2FA setup.");
      }
    } catch {
      setTotpError("Network error requesting 2FA secret.");
    }
  };

  // 2FA Confirm
  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!totpData) return;

    setTotpActivating(true);
    setTotpError("");

    try {
      const res = await fetch("/api/auth/2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: verificationCode.trim(),
          secret: totpData.secret,
          recoveryCodes: totpData.recoveryCodes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setTotpError(data.error || "Invalid 6-digit code. Check your authenticator app time.");
      } else {
        setTotpSuccess(true);
        setTimeout(() => {
          setShow2FAModal(false);
          setTotpSuccess(false);
        }, 3000);
      }
    } catch {
      setTotpError("Failed to verify TOTP token.");
    } finally {
      setTotpActivating(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="py-20 text-center text-xs text-stone-400">
        Loading ExploreX system configuration...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-brand-darkTeal" />
          <h1 className="text-2xl font-black text-stone-900 tracking-tight">
            WhatsApp & Agency System Settings
          </h1>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Manage live agency contact numbers, WhatsApp booking targets, office addresses, and account security.
        </p>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Agency settings updated successfully across ExploreX!</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* WhatsApp Core Section */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 text-sm">
                  WhatsApp Direct Booking Destination
                </h3>
                <p className="text-[11px] text-stone-500">
                  Target international phone number for all package, hotel, vehicle, and custom trip inquiries.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
              Core Channel
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">
                Agency WhatsApp Number (Digits only with country code) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={settings.agencyWhatsAppNumber}
                  onChange={(e) =>
                    setSettings({ ...settings, agencyWhatsAppNumber: e.target.value.replace(/\D/g, "") })
                  }
                  placeholder="94771234567"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono font-bold text-stone-900 focus:outline-none focus:border-brand-darkTeal"
                />
              </div>
              <p className="text-[10px] text-stone-400">
                Format: 94771234567 (94 is Sri Lanka country code, omit + or spaces)
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">
                Voice Phone / Emergency Hotline
              </label>
              <input
                type="text"
                value={settings.agencyPhone}
                onChange={(e) => setSettings({ ...settings, agencyPhone: e.target.value })}
                placeholder="+94 11 234 5678"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
              />
              <p className="text-[10px] text-stone-400">
                Displayed in website header, footer, and contact page
              </p>
            </div>
          </div>
        </div>

        {/* Brand & Contact Section */}
        <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
            <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">Brand & Headquarters</h3>
              <p className="text-[11px] text-stone-500">Official business information and physical offices.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Agency Name</label>
              <input
                type="text"
                value={settings.agencyName}
                onChange={(e) => setSettings({ ...settings, agencyName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700">Customer Support Email</label>
            <input
              type="email"
              value={settings.agencyEmail}
              onChange={(e) => setSettings({ ...settings, agencyEmail: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Colombo HQ Address</label>
              <textarea
                rows={2}
                value={settings.colomboOfficeAddress}
                onChange={(e) => setSettings({ ...settings, colomboOfficeAddress: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-700">Kandy Office Address</label>
              <textarea
                rows={2}
                value={settings.kandyOfficeAddress}
                onChange={(e) => setSettings({ ...settings, kandyOfficeAddress: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-700">Operating Hours & Hotline SLA</label>
            <input
              type="text"
              value={settings.operatingHours}
              onChange={(e) => setSettings({ ...settings, operatingHours: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-brand-gold text-stone-950 text-xs font-bold shadow-md hover:bg-amber-400 disabled:opacity-50 transition"
          >
            {saving ? "Saving Changes..." : "Save Settings"}
          </button>
        </div>
      </form>

      {/* Two-Factor Authentication Security Card */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm">Two-Factor Authentication (TOTP)</h3>
              <p className="text-[11px] text-stone-500">
                Hardware-backed 6-digit TOTP code compatible with Google Authenticator and Authy.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-800">
            OWASP Level 2
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200">
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-stone-800 block">
              Enroll Your Authenticator App
            </span>
            <p className="text-[11px] text-stone-500">
              Protect your administrative session from compromised passwords.
            </p>
          </div>
          <button
            type="button"
            onClick={start2FASetup}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-darkTeal text-white text-xs font-bold hover:bg-teal-900 shadow-sm transition whitespace-nowrap"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Setup 2FA Now</span>
          </button>
        </div>
      </div>

      {/* 2FA Modal */}
      {show2FAModal && totpData && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-brand-darkTeal" />
                <h3 className="font-bold text-stone-900 text-sm">Scan QR with Authenticator</h3>
              </div>
              <button
                onClick={() => setShow2FAModal(false)}
                className="text-stone-400 hover:text-stone-600 text-xs"
              >
                ✕
              </button>
            </div>

            {totpSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-sm">2FA Activated!</h4>
                <p className="text-xs text-emerald-700">
                  Your account is now protected with two-factor authentication.
                </p>
              </div>
            ) : (
              <form onSubmit={handleVerify2FA} className="space-y-4">
                {totpError && (
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs">
                    {totpError}
                  </div>
                )}

                <div className="flex justify-center p-3 bg-stone-50 rounded-2xl border border-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={totpData.qrCodeDataUrl}
                    alt="2FA QR Code"
                    width={180}
                    height={180}
                    className="rounded-lg shadow-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-stone-600">Manual Setup Secret Key</label>
                  <input
                    type="text"
                    readOnly
                    value={totpData.secret}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-stone-100 text-stone-700 font-mono text-xs text-center select-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-800">
                    Enter 6-Digit Code from App *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="123456"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-center font-mono font-bold text-lg tracking-widest text-stone-900 focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 space-y-1 text-[11px] text-amber-800">
                  <span className="font-bold block">One-Time Backup Recovery Codes:</span>
                  <div className="grid grid-cols-2 gap-1 font-mono text-[10px]">
                    {totpData.recoveryCodes.slice(0, 4).map((c, i) => (
                      <span key={i} className="bg-white/80 px-1 rounded">{c}</span>
                    ))}
                  </div>
                  <span className="text-[10px] text-amber-700">
                    Store these in a secure password manager.
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShow2FAModal(false)}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 text-stone-600 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={totpActivating || verificationCode.length < 6}
                    className="px-4 py-1.5 rounded-lg bg-brand-gold text-stone-950 text-xs font-bold hover:bg-amber-400 disabled:opacity-50"
                  >
                    {totpActivating ? "Verifying..." : "Verify & Enable"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

