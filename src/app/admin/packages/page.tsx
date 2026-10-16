"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TourPackage, DayItinerary } from "@/types";
import { 
  Compass, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Check, 
  X, 
  Calendar, 
  DollarSign, 
  MapPin, 
  AlertCircle,
  Clock,
  Layers,
  Sparkles
} from "lucide-react";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<Partial<TourPackage> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/packages");
      if (res.ok) {
        const data = await res.json();
        setPackages(data.packages || []);
      }
    } catch (err) {
      console.error("Failed to load packages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const openNewPackageModal = () => {
    setEditingPkg({
      name: "",
      refCode: `PKG-${String(packages.length + 1).padStart(3, "0")}`,
      tagline: "",
      durationDays: 7,
      durationNights: 6,
      durationText: "7 Days / 6 Nights",
      startingPriceUSD: 850,
      difficulty: "Easy",
      groupSize: "Private Tour (2-8 travelers)",
      tags: ["Culture", "UNESCO"],
      heroImage: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80",
      overview: "",
      itinerary: [
        {
          day: 1,
          title: "Arrival in Sri Lanka & Welcome",
          destination: "Colombo / Negombo",
          description: "VIP Airport Meet & Greet, transfer to coastal hotel for relaxation.",
          activities: ["Airport Pickup", "Welcome Drink", "Beach Sunset"],
          meals: "Dinner Included",
          overnight: "Negombo Boutique Hotel",
        },
      ],
      inclusions: ["Private AC Vehicle with chauffeur guide", "Accommodation on Half Board", "Monument entrance tickets"],
      exclusions: ["International flights", "Lunch", "Personal tips"],
      recommendedVehicles: ["Sedan Car", "Luxury KDH Van"],
      featured: false,
    });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const openEditPackageModal = (pkg: TourPackage) => {
    setEditingPkg({ ...pkg });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleDeletePackage = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/packages?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSuccessMsg(`Package "${name}" deleted.`);
        setTimeout(() => setSuccessMsg(""), 3000);
        fetchPackages();
      } else {
        alert("Failed to delete package.");
      }
    } catch {
      alert("Error deleting package.");
    }
  };

  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPkg) return;

    setSaving(true);
    setErrorMsg("");

    try {
      const isNew = !editingPkg.id;
      const url = "/api/admin/packages";
      const method = isNew ? "POST" : "PUT";

      // Ensure durationText matches durationDays
      const days = Number(editingPkg.durationDays) || 1;
      const payload = {
        ...editingPkg,
        durationDays: days,
        durationNights: Math.max(0, days - 1),
        durationText: `${days} Days / ${Math.max(0, days - 1)} Nights`,
        startingPriceUSD: Number(editingPkg.startingPriceUSD) || 500,
        itinerary: (editingPkg.itinerary || []).map((item, idx) => ({
          ...item,
          day: idx + 1,
        })),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to save tour package.");
      } else {
        setIsModalOpen(false);
        setEditingPkg(null);
        setSuccessMsg(isNew ? "New package created!" : "Package updated successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchPackages();
      }
    } catch {
      setErrorMsg("Network error saving package.");
    } finally {
      setSaving(false);
    }
  };

  // Itinerary helper handlers
  const addItineraryDay = () => {
    if (!editingPkg) return;
    const current = editingPkg.itinerary || [];
    const nextDay = current.length + 1;
    const newDay: DayItinerary = {
      day: nextDay,
      title: `Day ${nextDay} Exploration`,
      destination: "Sri Lanka",
      description: "Enjoy guided sightseeing, scenic travel, and cultural highlights.",
      activities: ["Sightseeing", "Scenic drive"],
      meals: "Breakfast & Dinner",
      overnight: "Boutique Hotel",
    };
    setEditingPkg({
      ...editingPkg,
      durationDays: nextDay,
      durationNights: nextDay - 1,
      durationText: `${nextDay} Days / ${nextDay - 1} Nights`,
      itinerary: [...current, newDay],
    });
  };

  const removeItineraryDay = (index: number) => {
    if (!editingPkg) return;
    const current = editingPkg.itinerary || [];
    if (current.length <= 1) {
      alert("A tour package must have at least one day in its itinerary.");
      return;
    }
    const updated = current
      .filter((_, i) => i !== index)
      .map((item, i) => ({ ...item, day: i + 1 }));
    setEditingPkg({
      ...editingPkg,
      durationDays: updated.length,
      durationNights: Math.max(0, updated.length - 1),
      durationText: `${updated.length} Days / ${Math.max(0, updated.length - 1)} Nights`,
      itinerary: updated,
    });
  };

  const updateItineraryField = (index: number, field: keyof DayItinerary, value: any) => {
    if (!editingPkg) return;
    const current = [...(editingPkg.itinerary || [])];
    current[index] = { ...current[index], [field]: value };
    setEditingPkg({ ...editingPkg, itinerary: current });
  };

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = 
      pkg.name.toLowerCase().includes(search.toLowerCase()) ||
      pkg.refCode.toLowerCase().includes(search.toLowerCase()) ||
      pkg.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchesDifficulty =
      filterDifficulty === "ALL" || pkg.difficulty.toUpperCase() === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-brand-darkTeal" />
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              Tour Packages & Itineraries
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Manage curated Sri Lanka tour packages, day-by-day itineraries, pricing, and hotel tiers.
          </p>
        </div>
        <button
          onClick={openNewPackageModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold text-stone-950 text-xs font-bold shadow-sm hover:bg-amber-400 transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Tour Package</span>
        </button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by package name, tag, or PKG code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-brand-darkTeal"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {["ALL", "EASY", "MODERATE", "ACTIVE"].map((diff) => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterDifficulty === diff
                  ? "bg-brand-darkTeal text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Packages Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-stone-400">Loading tour packages...</div>
      ) : filteredPackages.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-stone-200 text-stone-500 text-xs">
          No tour packages match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={pkg.heroImage}
                    alt={pkg.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-bold">
                      {pkg.refCode}
                    </span>
                    {pkg.featured && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 text-[10px] font-extrabold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-stone-900 text-[11px] font-bold">
                    ${pkg.startingPriceUSD} <span className="text-[9px] font-normal text-stone-500">/ person</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-stone-500">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{pkg.durationText}</span>
                    <span>•</span>
                    <span className="font-semibold text-brand-darkTeal">{pkg.difficulty}</span>
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm leading-snug line-clamp-2">
                    {pkg.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-2">
                    {pkg.tagline || pkg.overview}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {pkg.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[10px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {pkg.tags.length > 3 && (
                      <span className="text-[10px] text-stone-400">+{pkg.tags.length - 3}</span>
                    )}
                  </div>

                  {/* Itinerary Summary */}
                  <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-stone-400" />
                      {pkg.itinerary?.length || 0} itinerary stops
                    </span>
                    <span className="text-stone-400">Max {pkg.groupSize}</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                <Link
                  href={`/packages/${pkg.slug}`}
                  target="_blank"
                  className="text-stone-500 hover:text-stone-900 flex items-center gap-1 text-[11px] font-semibold"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Public Page</span>
                </Link>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditPackageModal(pkg)}
                    className="p-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition"
                    title="Edit Package & Itinerary"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeletePackage(pkg.id, pkg.name)}
                    className="p-1.5 rounded-lg bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 transition"
                    title="Delete Package"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Package Form & Itinerary Editor Modal */}
      {isModalOpen && editingPkg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col my-8">
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50 rounded-t-3xl">
              <div>
                <h3 className="font-bold text-stone-900 text-base">
                  {editingPkg.id ? "Edit Tour Package & Itinerary" : "Create New Tour Package"}
                </h3>
                <p className="text-xs text-stone-500">
                  Fill in package overview, pricing, inclusions, and day-by-day itinerary schedule.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl hover:bg-stone-200 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSavePackage} className="flex-1 overflow-y-auto p-6 space-y-6">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Section 1: Basic Information */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-darkTeal">
                  1. Overview & Pricing
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Package Title *</label>
                    <input
                      type="text"
                      required
                      value={editingPkg.name || ""}
                      onChange={(e) => setEditingPkg({ ...editingPkg, name: e.target.value })}
                      placeholder="e.g. 7-Day Cultural Triangle & Hill Country Classic"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Ref Code *</label>
                    <input
                      type="text"
                      required
                      value={editingPkg.refCode || ""}
                      onChange={(e) => setEditingPkg({ ...editingPkg, refCode: e.target.value })}
                      placeholder="PKG-001"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Tagline / Subtitle</label>
                  <input
                    type="text"
                    value={editingPkg.tagline || ""}
                    onChange={(e) => setEditingPkg({ ...editingPkg, tagline: e.target.value })}
                    placeholder="Ancient Citadels, Sacred Relics & High-Grown Ceylon Tea Estates"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Duration Days *</label>
                    <input
                      type="number"
                      min={1}
                      required
                      value={editingPkg.durationDays || 7}
                      onChange={(e) => setEditingPkg({ ...editingPkg, durationDays: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Price USD (Starting) *</label>
                    <input
                      type="number"
                      min={50}
                      required
                      value={editingPkg.startingPriceUSD || 500}
                      onChange={(e) => setEditingPkg({ ...editingPkg, startingPriceUSD: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Difficulty</label>
                    <select
                      value={editingPkg.difficulty || "Easy"}
                      onChange={(e) => setEditingPkg({ ...editingPkg, difficulty: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Active">Active</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Group Size</label>
                    <input
                      type="text"
                      value={editingPkg.groupSize || "Private Tour"}
                      onChange={(e) => setEditingPkg({ ...editingPkg, groupSize: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Hero Image URL *</label>
                  <input
                    type="url"
                    required
                    value={editingPkg.heroImage || ""}
                    onChange={(e) => setEditingPkg({ ...editingPkg, heroImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Overview Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={editingPkg.overview || ""}
                    onChange={(e) => setEditingPkg({ ...editingPkg, overview: e.target.value })}
                    placeholder="Detailed introduction to this Sri Lanka travel experience..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={(editingPkg.tags || []).join(", ")}
                      onChange={(e) =>
                        setEditingPkg({
                          ...editingPkg,
                          tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                        })
                      }
                      placeholder="Culture, UNESCO, Tea Hills"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Recommended Vehicles</label>
                    <input
                      type="text"
                      value={(editingPkg.recommendedVehicles || []).join(", ")}
                      onChange={(e) =>
                        setEditingPkg({
                          ...editingPkg,
                          recommendedVehicles: e.target.value.split(",").map((v) => v.trim()).filter(Boolean),
                        })
                      }
                      placeholder="Sedan Car, Luxury KDH Van"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="featured-checkbox"
                    checked={Boolean(editingPkg.featured)}
                    onChange={(e) => setEditingPkg({ ...editingPkg, featured: e.target.checked })}
                    className="rounded text-brand-darkTeal"
                  />
                  <label htmlFor="featured-checkbox" className="text-xs font-semibold text-stone-800">
                    Feature on Homepage Carousel & Recommendations
                  </label>
                </div>
              </div>

              {/* Section 2: Inclusions & Exclusions */}
              <div className="pt-4 border-t border-stone-200 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-darkTeal">
                  2. Inclusions & Exclusions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Inclusions (one per line)</label>
                    <textarea
                      rows={4}
                      value={(editingPkg.inclusions || []).join("\n")}
                      onChange={(e) =>
                        setEditingPkg({
                          ...editingPkg,
                          inclusions: e.target.value.split("\n").filter((l) => l.trim().length > 0),
                        })
                      }
                      placeholder="All 6 nights luxury accommodation&#10;Private AC vehicle with chauffeur&#10;Daily breakfast & dinner"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-stone-700">Exclusions (one per line)</label>
                    <textarea
                      rows={4}
                      value={(editingPkg.exclusions || []).join("\n")}
                      onChange={(e) =>
                        setEditingPkg({
                          ...editingPkg,
                          exclusions: e.target.value.split("\n").filter((l) => l.trim().length > 0),
                        })
                      }
                      placeholder="International flights and visa&#10;Lunches&#10;Gratuities & tips"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Day-by-Day Itinerary Editor */}
              <div className="pt-4 border-t border-stone-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-darkTeal">
                      3. Day-by-Day Itinerary Editor ({editingPkg.itinerary?.length || 0} Days)
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Configure day title, destination stop, detailed descriptions, activities, meals, and overnight stay.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addItineraryDay}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-brand-darkTeal text-xs font-bold hover:bg-teal-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Day</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {(editingPkg.itinerary || []).map((day, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-brand-darkTeal text-white text-xs font-bold">
                          Day {idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItineraryDay(idx)}
                          className="p-1 rounded-md text-stone-400 hover:text-rose-600 hover:bg-rose-50"
                          title="Remove Day"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-stone-600">Day Title *</label>
                          <input
                            type="text"
                            required
                            value={day.title}
                            onChange={(e) => updateItineraryField(idx, "title", e.target.value)}
                            placeholder="e.g. Sigiriya Rock & Minneriya Safari"
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-stone-600">Destination *</label>
                          <input
                            type="text"
                            required
                            value={day.destination}
                            onChange={(e) => updateItineraryField(idx, "destination", e.target.value)}
                            placeholder="e.g. Sigiriya & Minneriya"
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs bg-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-stone-600">Description *</label>
                        <textarea
                          rows={2}
                          required
                          value={day.description}
                          onChange={(e) => updateItineraryField(idx, "description", e.target.value)}
                          placeholder="Day's experience, morning activities, afternoon plans..."
                          className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-stone-600">Activities (comma separated)</label>
                          <input
                            type="text"
                            value={(day.activities || []).join(", ")}
                            onChange={(e) =>
                              updateItineraryField(
                                idx,
                                "activities",
                                e.target.value.split(",").map((a) => a.trim()).filter(Boolean)
                              )
                            }
                            placeholder="Fortress climb, Village lunch"
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-stone-600">Meals</label>
                          <input
                            type="text"
                            value={day.meals}
                            onChange={(e) => updateItineraryField(idx, "meals", e.target.value)}
                            placeholder="Breakfast & Dinner"
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs bg-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-stone-600">Overnight Stay</label>
                          <input
                            type="text"
                            value={day.overnight}
                            onChange={(e) => updateItineraryField(idx, "overnight", e.target.value)}
                            placeholder="Jetwing Vil Uyana (Sigiriya)"
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-200 text-xs bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-brand-gold text-stone-950 text-xs font-bold shadow-md hover:bg-amber-400 disabled:opacity-50"
                >
                  {saving ? "Saving Package..." : editingPkg.id ? "Update Package" : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

