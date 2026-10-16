"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Destination } from "@/types";
import { 
  MapPin, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Check, 
  X, 
  Calendar, 
  AlertCircle,
  Compass,
  Sparkles
} from "lucide-react";

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRegion, setFilterRegion] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<Partial<Destination> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/destinations");
      if (res.ok) {
        const data = await res.json();
        setDestinations(data.destinations || []);
      }
    } catch (err) {
      console.error("Failed to fetch destinations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const openNewDestModal = () => {
    setEditingDest({
      name: "",
      subtitle: "",
      region: "Cultural Triangle",
      category: ["Culture", "UNESCO"],
      bestSeason: "Nov - Apr",
      coordinates: { lat: 7.8731, lng: 80.7718 },
      heroImage: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80",
      gallery: [],
      tag: "Must-Visit",
      summary: "",
      fullDescription: "",
      highlights: ["Ancient monuments", "Panoramic viewpoint", "Scenic landscape"],
      bestTimeToVisit: "November through April for sunny dry days.",
      weatherTips: "Warm tropical days; light cotton apparel and sun hats recommended.",
      nearbyAttractions: ["Dambulla Caves", "Minneriya National Park"],
    });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const openEditDestModal = (dest: Destination) => {
    setEditingDest({ ...dest });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleDeleteDest = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete destination "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/destinations?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSuccessMsg(`Destination "${name}" deleted.`);
        setTimeout(() => setSuccessMsg(""), 3000);
        fetchDestinations();
      } else {
        alert("Failed to delete destination.");
      }
    } catch {
      alert("Error deleting destination.");
    }
  };

  const handleSaveDest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDest) return;

    setSaving(true);
    setErrorMsg("");

    try {
      const isNew = !editingDest.id;
      const url = "/api/admin/destinations";
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingDest),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to save destination.");
      } else {
        setIsModalOpen(false);
        setEditingDest(null);
        setSuccessMsg(isNew ? "Destination created successfully!" : "Destination updated!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchDestinations();
      }
    } catch {
      setErrorMsg("Network error saving destination.");
    } finally {
      setSaving(false);
    }
  };

  const regions = [
    "ALL",
    "Cultural Triangle",
    "Central Highlands",
    "Southern Coast",
    "Eastern Coast",
    "Wildlife & Nature",
    "Northern Province",
    "Western Coast",
  ];

  const filteredDestinations = destinations.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.region.toLowerCase().includes(search.toLowerCase()) ||
      (d.category || []).some((c) => c.toLowerCase().includes(search.toLowerCase()));
    const matchesRegion = filterRegion === "ALL" || d.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-brand-darkTeal" />
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              Sri Lanka Destinations
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Manage regional guides, top highlights, best visiting seasons, and GPS map markers.
          </p>
        </div>
        <button
          onClick={openNewDestModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold text-stone-950 text-xs font-bold shadow-sm hover:bg-amber-400 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Destination</span>
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
            placeholder="Search by destination name, region, or vibe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-brand-darkTeal"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setFilterRegion(reg)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filterRegion === reg
                  ? "bg-brand-darkTeal text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-stone-400">Loading destinations...</div>
      ) : filteredDestinations.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-stone-200 text-stone-500 text-xs">
          No destinations found matching your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={dest.heroImage}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-bold">
                      {dest.region}
                    </span>
                    {dest.tag && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 text-[10px] font-extrabold">
                        {dest.tag}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-sm text-stone-900 text-[10px] font-bold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-brand-darkTeal" />
                    <span>{dest.bestSeason}</span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-stone-900 text-base leading-snug">
                    {dest.name}
                  </h3>
                  <p className="text-[11px] text-brand-darkTeal font-medium">
                    {dest.subtitle}
                  </p>
                  <p className="text-[11px] text-stone-500 line-clamp-2">
                    {dest.summary}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {(dest.category || []).map((cat, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[9px] font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 text-[10px] text-stone-400">
                    {dest.highlights?.length || 0} top highlights curated
                  </div>
                </div>
              </div>

              <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                <Link
                  href={`/destinations/${dest.slug}`}
                  target="_blank"
                  className="text-stone-500 hover:text-stone-900 flex items-center gap-1 text-[11px] font-semibold"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Public Page</span>
                </Link>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditDestModal(dest)}
                    className="p-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition"
                    title="Edit Destination"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteDest(dest.id, dest.name)}
                    className="p-1.5 rounded-lg bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 transition"
                    title="Delete Destination"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Destination Form Modal */}
      {isModalOpen && editingDest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col my-8">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50 rounded-t-3xl">
              <div>
                <h3 className="font-bold text-stone-900 text-base">
                  {editingDest.id ? "Edit Destination" : "Add New Destination"}
                </h3>
                <p className="text-xs text-stone-500">
                  Update travel guide copy, highlights, coordinates, and visiting seasons.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl hover:bg-stone-200 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDest} className="flex-1 overflow-y-auto p-6 space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Destination Name *</label>
                  <input
                    type="text"
                    required
                    value={editingDest.name || ""}
                    onChange={(e) => setEditingDest({ ...editingDest, name: e.target.value })}
                    placeholder="e.g. Sigiriya"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Subtitle / Descriptor</label>
                  <input
                    type="text"
                    value={editingDest.subtitle || ""}
                    onChange={(e) => setEditingDest({ ...editingDest, subtitle: e.target.value })}
                    placeholder="The Ancient Lion Rock Citadel"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Region *</label>
                  <select
                    value={editingDest.region || "Cultural Triangle"}
                    onChange={(e) => setEditingDest({ ...editingDest, region: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  >
                    <option value="Cultural Triangle">Cultural Triangle</option>
                    <option value="Central Highlands">Central Highlands</option>
                    <option value="Southern Coast">Southern Coast</option>
                    <option value="Eastern Coast">Eastern Coast</option>
                    <option value="Wildlife & Nature">Wildlife & Nature</option>
                    <option value="Northern Province">Northern Province</option>
                    <option value="Western Coast">Western Coast</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Best Season</label>
                  <input
                    type="text"
                    value={editingDest.bestSeason || ""}
                    onChange={(e) => setEditingDest({ ...editingDest, bestSeason: e.target.value })}
                    placeholder="Nov - Apr"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Badge / Tag</label>
                  <input
                    type="text"
                    value={editingDest.tag || ""}
                    onChange={(e) => setEditingDest({ ...editingDest, tag: e.target.value })}
                    placeholder="UNESCO World Heritage"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Hero Image URL *</label>
                <input
                  type="url"
                  required
                  value={editingDest.heroImage || ""}
                  onChange={(e) => setEditingDest({ ...editingDest, heroImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Short Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={editingDest.summary || ""}
                  onChange={(e) => setEditingDest({ ...editingDest, summary: e.target.value })}
                  placeholder="2-3 sentence overview of this destination..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Full In-Depth Description *</label>
                <textarea
                  rows={4}
                  required
                  value={editingDest.fullDescription || ""}
                  onChange={(e) => setEditingDest({ ...editingDest, fullDescription: e.target.value })}
                  placeholder="Comprehensive travel guide content, historical background, sights..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Key Highlights (comma separated)</label>
                  <input
                    type="text"
                    value={(editingDest.highlights || []).join(", ")}
                    onChange={(e) =>
                      setEditingDest({
                        ...editingDest,
                        highlights: e.target.value.split(",").map((h) => h.trim()).filter(Boolean),
                      })
                    }
                    placeholder="Lion Rock Citadel, Mirror Wall, Water Gardens"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Categories (comma separated)</label>
                  <input
                    type="text"
                    value={(editingDest.category || []).join(", ")}
                    onChange={(e) =>
                      setEditingDest({
                        ...editingDest,
                        category: e.target.value.split(",").map((c) => c.trim()).filter(Boolean) as any,
                      })
                    }
                    placeholder="Culture, UNESCO, Wildlife"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Latitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={editingDest.coordinates?.lat || 7.8731}
                    onChange={(e) =>
                      setEditingDest({
                        ...editingDest,
                        coordinates: {
                          lat: parseFloat(e.target.value),
                          lng: editingDest.coordinates?.lng || 80.7718,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Longitude</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={editingDest.coordinates?.lng || 80.7718}
                    onChange={(e) =>
                      setEditingDest({
                        ...editingDest,
                        coordinates: {
                          lat: editingDest.coordinates?.lat || 7.8731,
                          lng: parseFloat(e.target.value),
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs"
                  />
                </div>
              </div>

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
                  {saving ? "Saving Destination..." : editingDest.id ? "Update Destination" : "Add Destination"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

