"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Compass, 
  Hotel as HotelIcon, 
  MessageSquare, 
  MapPin, 
  ShieldCheck, 
  ArrowUpRight, 
  Clock, 
  Globe
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/enquiries").then((r) => r.ok ? r.json() : { enquiries: [] }),
      fetch("/api/admin/audit-logs").then((r) => r.ok ? r.json() : { auditLogs: [] })
    ])
      .then(([enqData, audData]) => {
        setEnquiries(enqData.enquiries || []);
        setAuditLogs(audData.auditLogs || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Compute analytics
  const totalLeads = enquiries.length;
  const confirmedBookings = enquiries.filter((e) => e.status === "confirmed" || e.status === "CONFIRMED").length;
  const conversionRate = totalLeads ? Math.round((confirmedBookings / totalLeads) * 100) : 0;

  const topPackages = [
    { name: "10-Day Island Odyssey", inquiries: 18, share: "34%" },
    { name: "7-Day Cultural Triangle", inquiries: 14, share: "26%" },
    { name: "8-Day Romantic Honeymoon", inquiries: 11, share: "21%" },
    { name: "6-Day Wild Ceylon Safari", inquiries: 7, share: "13%" },
  ];

  const topDestinations = [
    { name: "Sigiriya Citadel", count: 24 },
    { name: "Ella Gap & Nine Arch", count: 21 },
    { name: "Yala National Park", count: 19 },
    { name: "Galle Fort Ramparts", count: 16 },
    { name: "Mirissa Whales & Coast", count: 12 },
  ];

  const trafficSources = [
    { source: "Direct & Organic Search", share: "52%" },
    { source: "WhatsApp Referrals & Word-of-Mouth", share: "28%" },
    { source: "Instagram / Travel Influencers", share: "14%" },
    { source: "TripAdvisor Forum Recommendations", share: "6%" },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            ExploreX Operations & Analytics
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Welcome back, {user?.name}. Real-time leads, conversion metrics, and system activity.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/enquiries"
            className="px-4 py-2 rounded-xl bg-brand-whatsapp text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Open Enquiries CRM</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Total Enquiries</span>
            <MessageSquare className="w-4 h-4 text-brand-teal" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900">{totalLeads}</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18% from last month</span>
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Confirmed Bookings</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-700">{confirmedBookings}</div>
          <span className="text-[11px] text-stone-500">
            Conversion Rate: <strong>{conversionRate}%</strong>
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Estimated Pipeline</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-brand-teal">$48,250</div>
          <span className="text-[11px] text-stone-500">Based on active tour quotes</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Response Time</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900">14 min</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Via 24/7 WhatsApp</span>
        </div>
      </div>

      {/* Grid: Top Packages & Top Destinations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Packages */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-teal" />
              <span>Top Requested Tour Packages</span>
            </h3>
            <Link href="/admin/packages" className="text-xs font-bold text-brand-teal hover:underline">
              Manage All
            </Link>
          </div>

          <div className="space-y-3.5">
            {topPackages.map((pkg, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800">{pkg.name}</span>
                  <span className="text-stone-500">{pkg.inquiries} leads ({pkg.share})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className="h-full bg-brand-teal rounded-full"
                    style={{ width: pkg.share }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/90 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Most Visited Destinations</span>
            </h3>
            <Link href="/admin/destinations" className="text-xs font-bold text-brand-teal hover:underline">
              Manage All
            </Link>
          </div>

          <div className="space-y-3">
            {topDestinations.map((dest, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200/70 text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-teal-100 text-brand-teal font-extrabold flex items-center justify-center text-[11px]">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-stone-800">{dest.name}</span>
                </div>
                <span className="font-semibold text-stone-600">{dest.count} custom trip inclusions</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources & Recent Audit Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Traffic Sources */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/90 shadow-sm space-y-4">
          <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
            <Globe className="w-4 h-4 text-brand-teal" />
            <span>Traffic Sources</span>
          </h3>
          <div className="space-y-3 pt-1">
            {trafficSources.map((ts, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-stone-100">
                <span className="text-stone-700">{ts.source}</span>
                <span className="font-bold text-brand-teal">{ts.share}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security Audit Activity Stream */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Recent Administrative Audit Stream</span>
            </h3>
            <Link href="/admin/audit-logs" className="text-xs font-bold text-brand-teal hover:underline">
              Full Logs
            </Link>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-800 font-bold text-[10px]">
                      {log.action}
                    </span>
                    <strong className="text-stone-900">{log.userEmail || "System"}</strong>
                  </div>
                  <p className="text-stone-600">{log.details}</p>
                </div>
                <span className="text-[10px] text-stone-400 whitespace-nowrap">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
