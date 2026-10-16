"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/brand/Logo";
import { hasPermission, isStaff } from "@/lib/auth/rbac";
import { 
  BarChart3, 
  Compass, 
  Hotel as HotelIcon, 
  MapPin, 
  Car, 
  MessageSquare, 
  Star, 
  BookOpen, 
  Users, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Lock
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || !isStaff(user.role))) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user || !isStaff(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100 text-xs text-stone-500">
        Verifying administrative authorization...
      </div>
    );
  }

  // Navigation items based on RBAC permissions
  const navItems = [
    {
      href: "/admin",
      label: "Analytics & Overview",
      icon: BarChart3,
      visible: true,
    },
    {
      href: "/admin/packages",
      label: "Tour Packages & Itineraries",
      icon: Compass,
      visible: hasPermission(user.role, "manage:catalog"),
    },
    {
      href: "/admin/hotels",
      label: "Hotels & Stays",
      icon: HotelIcon,
      visible: hasPermission(user.role, "manage:catalog"),
    },
    {
      href: "/admin/destinations",
      label: "Destinations",
      icon: MapPin,
      visible: hasPermission(user.role, "manage:catalog") || hasPermission(user.role, "manage:content"),
    },
    {
      href: "/admin/vehicles",
      label: "Vehicle Fleet & Rates",
      icon: Car,
      visible: hasPermission(user.role, "manage:catalog"),
    },
    {
      href: "/admin/enquiries",
      label: "Enquiry CRM & Bookings",
      icon: MessageSquare,
      visible: hasPermission(user.role, "view:enquiries"),
    },
    {
      href: "/admin/reviews",
      label: "Review Moderation",
      icon: Star,
      visible: hasPermission(user.role, "moderate:reviews"),
    },
    {
      href: "/admin/users",
      label: "User & Role Management",
      icon: Users,
      visible: hasPermission(user.role, "manage:users"),
      badge: "Super Admin",
    },
    {
      href: "/admin/audit-logs",
      label: "Security Audit Logs",
      icon: ShieldCheck,
      visible: hasPermission(user.role, "view:audit_logs"),
    },
    {
      href: "/admin/settings",
      label: "WhatsApp & Site Settings",
      icon: Settings,
      visible: hasPermission(user.role, "manage:settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F3ED] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#193330] text-stone-200 flex flex-col justify-between shrink-0 p-5 space-y-6">
        <div className="space-y-6">
          <div className="pb-4 border-b border-teal-800/60 flex items-center justify-between">
            <Logo variant="white" size="sm" />
            <Link
              href="/"
              target="_blank"
              className="p-1.5 rounded-lg bg-teal-800/40 text-teal-300 hover:text-white text-xs"
              title="Open Live Public Site"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* User Profile Card */}
          <div className="p-3.5 rounded-2xl bg-teal-900/40 border border-teal-800/50 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                Staff Portal
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <h4 className="text-sm font-bold text-white truncate">{user.name}</h4>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.2 rounded-md bg-teal-800 text-teal-200 text-[10px] font-semibold">
                {user.role.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems
              .filter((item) => item.visible)
              .map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-brand-gold text-stone-950 font-bold shadow-md"
                        : "text-teal-100/80 hover:bg-teal-900/50 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-teal-800/60 flex items-center justify-between">
          <Link href="/" className="text-xs text-teal-300/80 hover:text-white flex items-center gap-1">
            <span>← View Site</span>
          </Link>
          <button
            onClick={() => logout()}
            className="flex items-center gap-1.5 text-xs text-rose-300 hover:text-rose-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Working Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}

