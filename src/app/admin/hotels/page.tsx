"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Hotel, Destination } from "@/types";
import { 
  Hotel as HotelIcon, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Check, 
  X, 
  Star, 
  MapPin, 
  DollarSign, 
  AlertCircle,
  Sparkles,
  Wifi,
  Waves
} from "lucide-react";

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Partial<Hotel> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const [hotelsRes, destRes] = await Promise.all([
        fetch("/api/admin/hotels"),
        fetch("/api/destinations"),
      ]);
      if (hotelsRes.ok) {
        const data = await hotelsRes.json();
        setHotels(data.hotels || []);
      }
      if (destRes.ok) {
        const destData = await destRes.json();
        setDestinations(destData.destinations || []);
      }
    } catch (err) {
      console.error("Failed to fetch hotels or destinations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openNewHotelModal = () => {
    setEditingHotel({
      name: "",
      refCode: `HTL-${String(hotels.length + 1).padStart(3, "0")}`,
      destinationId: destinations[0]?.id || "dest-sigiriya",
      destinationName: destinations[0]?.name || "Sigiriya",
      type: "Boutique Villa",
      starRating: 5,
      pricePerNightUSD: 180,
      priceRange: "$$$",
      coordinates: { lat: 7.957, lng: 80.76 },
      heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      gallery: [],
      amenities: ["Free High-Speed Wi-Fi", "Infinity Swimming Pool", "Ayurvedic Spa", "Fine Dining Restaurant"],
      description: "",
      address: "Sri Lanka",
      featured: false,
    });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const openEditHotelModal = (hotel: Hotel) => {
    setEditingHotel({ ...hotel });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleDeleteHotel = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/hotels?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSuccessMsg(`Hotel "${name}" deleted.`);
        setTimeout(() => setSuccessMsg(""), 3000);
        fetchData();
      } else {
        alert("Failed to delete hotel.");
      }
    } catch {
      alert("Error deleting hotel.");
    }
  };

  const handleSaveHotel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHotel) return;

    setSaving(true);
    setErrorMsg("");

    try {
      const isNew = !editingHotel.id;
      const url = "/api/admin/hotels";
      const method = isNew ? "POST" : "PUT";

      // Match destinationName from selected destinationId
      const matchedDest = destinations.find((d) => d.id === editingHotel.destinationId);
      const destinationName = matchedDest ? matchedDest.name : editingHotel.destinationName || "Sri Lanka";

      const payload = {
        ...editingHotel,
        destinationName,
        starRating: Number(editingHotel.starRating) || 4,
        pricePerNightUSD: Number(editingHotel.pricePerNightUSD) || 150,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to save hotel.");
      } else {
        setIsModalOpen(false);
        setEditingHotel(null);
        setSuccessMsg(isNew ? "New hotel added!" : "Hotel updated successfully!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchData();
      }
    } catch {
      setErrorMsg("Network error saving hotel.");
    } finally {
      setSaving(false);
    }
  };

  const filteredHotels = hotels.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.refCode.toLowerCase().includes(search.toLowerCase()) ||
      h.destinationName.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "ALL" || h.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <HotelIcon className="w-6 h-6 text-brand-darkTeal" />
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              Hotels, Resorts & Stays
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Manage partner accommodations, star ratings, nightly rates, and direct WhatsApp booking references.
          </p>
        </div>
        <button
          onClick={openNewHotelModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold text-stone-950 text-xs font-bold shadow-sm hover:bg-amber-400 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Hotel</span>
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
            placeholder="Search by hotel name, location, or HTL code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-brand-darkTeal"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {["ALL", "Boutique Villa", "5-Star Resort", "Eco Lodge", "Heritage Hotel", "Beachfront Guesthouse"].map(
            (t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  filterType === t
                    ? "bg-brand-darkTeal text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {t}
              </button>
            )
          )}
        </div>
      </div>

      {/* Hotel Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-stone-400">Loading hotels catalog...</div>
      ) : filteredHotels.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-stone-200 text-stone-500 text-xs">
          No accommodations match your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={hotel.heroImage}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-bold">
                      {hotel.refCode}
                    </span>
                    {hotel.featured && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 text-[10px] font-extrabold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-sm text-stone-900 text-[11px] font-bold">
                    ${hotel.pricePerNightUSD} <span className="text-[9px] font-normal text-stone-500">/ night</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-brand-darkTeal flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {hotel.destinationName}
                    </span>
                    <div className="flex items-center text-amber-500">
                      {Array.from({ length: hotel.starRating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-bold text-stone-900 text-sm leading-snug line-clamp-1">
                    {hotel.name}
                  </h3>

                  <div className="flex items-center gap-2 text-[10px] text-stone-500">
                    <span className="px-2 py-0.5 rounded bg-stone-100 font-semibold">{hotel.type}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold">{hotel.priceRange}</span>
                  </div>

                  <p className="text-[11px] text-stone-500 line-clamp-2">
                    {hotel.description}
                  </p>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {hotel.amenities.slice(0, 3).map((amenity, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[9px] font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="text-[9px] text-stone-400">+{hotel.amenities.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                <Link
                  href={`/hotels/${hotel.slug}`}
                  target="_blank"
                  className="text-stone-500 hover:text-stone-900 flex items-center gap-1 text-[11px] font-semibold"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Public Page</span>
                </Link>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditHotelModal(hotel)}
                    className="p-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition"
                    title="Edit Hotel"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteHotel(hotel.id, hotel.name)}
                    className="p-1.5 rounded-lg bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 transition"
                    title="Delete Hotel"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hotel Create/Edit Modal */}
      {isModalOpen && editingHotel && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col my-8">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50 rounded-t-3xl">
              <div>
                <h3 className="font-bold text-stone-900 text-base">
                  {editingHotel.id ? "Edit Hotel / Stay" : "Add New Accommodation"}
                </h3>
                <p className="text-xs text-stone-500">
                  Update stay properties, pricing, star tier, and amenities.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl hover:bg-stone-200 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHotel} className="flex-1 overflow-y-auto p-6 space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Hotel Name *</label>
                  <input
                    type="text"
                    required
                    value={editingHotel.name || ""}
                    onChange={(e) => setEditingHotel({ ...editingHotel, name: e.target.value })}
                    placeholder="e.g. Jetwing Vil Uyana"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Ref Code *</label>
                  <input
                    type="text"
                    required
                    value={editingHotel.refCode || ""}
                    onChange={(e) => setEditingHotel({ ...editingHotel, refCode: e.target.value })}
                    placeholder="HTL-001"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Destination *</label>
                  <select
                    value={editingHotel.destinationId || ""}
                    onChange={(e) => setEditingHotel({ ...editingHotel, destinationId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  >
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.region})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Property Type</label>
                  <select
                    value={editingHotel.type || "Boutique Villa"}
                    onChange={(e) => setEditingHotel({ ...editingHotel, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  >
                    <option value="Boutique Villa">Boutique Villa</option>
                    <option value="5-Star Resort">5-Star Resort</option>
                    <option value="Eco Lodge">Eco Lodge</option>
                    <option value="Heritage Hotel">Heritage Hotel</option>
                    <option value="Beachfront Guesthouse">Beachfront Guesthouse</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Star Rating</label>
                  <select
                    value={editingHotel.starRating || 5}
                    onChange={(e) => setEditingHotel({ ...editingHotel, starRating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  >
                    <option value={3}>3 Star ★★★</option>
                    <option value={4}>4 Star ★★★★</option>
                    <option value={5}>5 Star Luxury ★★★★★</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Price Per Night (USD) *</label>
                  <input
                    type="number"
                    min={20}
                    required
                    value={editingHotel.pricePerNightUSD || 150}
                    onChange={(e) => setEditingHotel({ ...editingHotel, pricePerNightUSD: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Price Range</label>
                  <select
                    value={editingHotel.priceRange || "$$$"}
                    onChange={(e) => setEditingHotel({ ...editingHotel, priceRange: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  >
                    <option value="$">$ (Budget friendly)</option>
                    <option value="$$">$$ (Comfort)</option>
                    <option value="$$$">$$$ (Superior / Luxury)</option>
                    <option value="$$$$">$$$$ (Ultra Luxury)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Address / Location</label>
                  <input
                    type="text"
                    value={editingHotel.address || ""}
                    onChange={(e) => setEditingHotel({ ...editingHotel, address: e.target.value })}
                    placeholder="Sigiriya Road, Central Province"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Hero Image URL *</label>
                <input
                  type="url"
                  required
                  value={editingHotel.heroImage || ""}
                  onChange={(e) => setEditingHotel({ ...editingHotel, heroImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={editingHotel.description || ""}
                  onChange={(e) => setEditingHotel({ ...editingHotel, description: e.target.value })}
                  placeholder="Summary of guest experience, setting, culinary offerings..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Amenities (comma separated)</label>
                <input
                  type="text"
                  value={(editingHotel.amenities || []).join(", ")}
                  onChange={(e) =>
                    setEditingHotel({
                      ...editingHotel,
                      amenities: e.target.value.split(",").map((a) => a.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Free Wi-Fi, Infinity Pool, Ayurvedic Spa, Fine Dining"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="hotel-featured-cb"
                  checked={Boolean(editingHotel.featured)}
                  onChange={(e) => setEditingHotel({ ...editingHotel, featured: e.target.checked })}
                  className="rounded text-brand-darkTeal"
                />
                <label htmlFor="hotel-featured-cb" className="text-xs font-semibold text-stone-800">
                  Highlight this hotel as Featured Stay on the homepage
                </label>
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
                  {saving ? "Saving Hotel..." : editingHotel.id ? "Update Hotel" : "Add Hotel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

