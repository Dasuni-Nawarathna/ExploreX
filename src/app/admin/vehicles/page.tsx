"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Vehicle } from "@/types";
import { 
  Car, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Check, 
  X, 
  Users, 
  Luggage, 
  DollarSign, 
  AlertCircle,
  Wind,
  Shield
} from "lucide-react";

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Partial<Vehicle> | null>(null);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/vehicles");
      if (res.ok) {
        const data = await res.json();
        setVehicles(data.vehicles || []);
      }
    } catch (err) {
      console.error("Failed to fetch vehicles", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const openNewVehicleModal = () => {
    setEditingVehicle({
      name: "",
      model: "",
      category: "Van",
      passengerCapacity: 6,
      luggageCapacity: 5,
      airConditioned: true,
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      description: "Comfortable air-conditioned transport for island journeys.",
      features: ["Full Climate Control AC", "High-Roof Comfort Seating", "Onboard Free Wi-Fi", "Passenger Liability Insurance"],
      pricePerDayUSD: 85,
      pricePerKmUSD: 0.45,
      guideOptionSurchargeUSD: 35,
      idealFor: "Families & groups up to 6 pax",
    });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const openEditVehicleModal = (v: Vehicle) => {
    setEditingVehicle({ ...v });
    setErrorMsg("");
    setIsModalOpen(true);
  };

  const handleDeleteVehicle = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete vehicle "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/vehicles?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setSuccessMsg(`Vehicle "${name}" deleted.`);
        setTimeout(() => setSuccessMsg(""), 3000);
        fetchVehicles();
      } else {
        alert("Failed to delete vehicle.");
      }
    } catch {
      alert("Error deleting vehicle.");
    }
  };

  const handleSaveVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;

    setSaving(true);
    setErrorMsg("");

    try {
      const isNew = !editingVehicle.id;
      const url = "/api/admin/vehicles";
      const method = isNew ? "POST" : "PUT";

      const payload = {
        ...editingVehicle,
        passengerCapacity: Number(editingVehicle.passengerCapacity) || 4,
        luggageCapacity: Number(editingVehicle.luggageCapacity) || 3,
        pricePerDayUSD: Number(editingVehicle.pricePerDayUSD) || 60,
        pricePerKmUSD: Number(editingVehicle.pricePerKmUSD) || 0.4,
        guideOptionSurchargeUSD: Number(editingVehicle.guideOptionSurchargeUSD) || 35,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Failed to save vehicle.");
      } else {
        setIsModalOpen(false);
        setEditingVehicle(null);
        setSuccessMsg(isNew ? "New vehicle added to fleet!" : "Vehicle updated!");
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchVehicles();
      }
    } catch {
      setErrorMsg("Network error saving vehicle.");
    } finally {
      setSaving(false);
    }
  };

  const categories = ["ALL", "Car", "Van", "Mini-coach", "Tuk-tuk", "SUV / Jeep"];

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      v.idealFor.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "ALL" || v.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Car className="w-6 h-6 text-brand-darkTeal" />
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              Vehicle Fleet & Chauffeur Rates
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Manage private touring vehicles, passenger & luggage capacities, daily rates, and driver guide surcharges.
          </p>
        </div>
        <button
          onClick={openNewVehicleModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-gold text-stone-950 text-xs font-bold shadow-sm hover:bg-amber-400 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vehicle</span>
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
            placeholder="Search by vehicle name, model, capacity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-brand-darkTeal"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filterCategory === cat
                  ? "bg-brand-darkTeal text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs text-stone-400">Loading vehicle fleet...</div>
      ) : filteredVehicles.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-stone-200 text-stone-500 text-xs">
          No vehicles found in fleet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="group bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-bold">
                      {vehicle.category}
                    </span>
                    {vehicle.airConditioned && (
                      <span className="px-2 py-0.5 rounded-md bg-teal-800/90 backdrop-blur-sm text-teal-100 text-[10px] font-semibold flex items-center gap-1">
                        <Wind className="w-3 h-3" /> AC
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-sm text-stone-900 text-[11px] font-bold">
                    ${vehicle.pricePerDayUSD} <span className="text-[9px] font-normal text-stone-500">/ day</span>
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <h3 className="font-bold text-stone-900 text-sm leading-snug">
                    {vehicle.name}
                  </h3>
                  <p className="text-[11px] text-stone-500 font-medium">
                    {vehicle.model} • {vehicle.idealFor}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      <span>{vehicle.passengerCapacity} seats</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Luggage className="w-3.5 h-3.5 text-stone-400" />
                      <span>{vehicle.luggageCapacity} bags</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {vehicle.features.slice(0, 3).map((feat, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[9px] font-medium"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-stone-100 text-[10px] text-stone-500 flex items-center justify-between">
                    <span>${vehicle.pricePerKmUSD} / km rate</span>
                    <span className="font-semibold text-brand-darkTeal">
                      +${vehicle.guideOptionSurchargeUSD}/day Guide
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center justify-between text-xs">
                <Link
                  href="/vehicles"
                  target="_blank"
                  className="text-stone-500 hover:text-stone-900 flex items-center gap-1 text-[11px] font-semibold"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Fleet Page</span>
                </Link>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditVehicleModal(vehicle)}
                    className="p-1.5 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition"
                    title="Edit Vehicle"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id, vehicle.name)}
                    className="p-1.5 rounded-lg bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 transition"
                    title="Delete Vehicle"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vehicle Form Modal */}
      {isModalOpen && editingVehicle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col my-8">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50 rounded-t-3xl">
              <div>
                <h3 className="font-bold text-stone-900 text-base">
                  {editingVehicle.id ? "Edit Vehicle" : "Add New Vehicle to Fleet"}
                </h3>
                <p className="text-xs text-stone-500">
                  Update model, capacity specs, daily rates, and features.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl hover:bg-stone-200 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVehicle} className="flex-1 overflow-y-auto p-6 space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Vehicle Title *</label>
                  <input
                    type="text"
                    required
                    value={editingVehicle.name || ""}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, name: e.target.value })}
                    placeholder="e.g. High-Roof Luxury Van"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Make & Model *</label>
                  <input
                    type="text"
                    required
                    value={editingVehicle.model || ""}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, model: e.target.value })}
                    placeholder="Toyota HiAce KDH Super GL"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Category *</label>
                  <select
                    value={editingVehicle.category || "Van"}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  >
                    <option value="Car">Car</option>
                    <option value="Van">Van</option>
                    <option value="Mini-coach">Mini-coach</option>
                    <option value="Tuk-tuk">Tuk-tuk</option>
                    <option value="SUV / Jeep">SUV / Jeep</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Passenger Capacity</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={editingVehicle.passengerCapacity || 4}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, passengerCapacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Luggage Bags Capacity</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={editingVehicle.luggageCapacity || 3}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, luggageCapacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Price Per Day (USD) *</label>
                  <input
                    type="number"
                    min={20}
                    required
                    value={editingVehicle.pricePerDayUSD || 75}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, pricePerDayUSD: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Price Per Km (USD)</label>
                  <input
                    type="number"
                    step="0.05"
                    min={0.1}
                    required
                    value={editingVehicle.pricePerKmUSD || 0.4}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, pricePerKmUSD: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-stone-700">Guide Surcharge (USD/day)</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={editingVehicle.guideOptionSurchargeUSD || 35}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, guideOptionSurchargeUSD: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Photo URL *</label>
                <input
                  type="url"
                  required
                  value={editingVehicle.image || ""}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Ideal For</label>
                <input
                  type="text"
                  value={editingVehicle.idealFor || ""}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, idealFor: e.target.value })}
                  placeholder="Couples, honeymooners, or solo travelers"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Features (comma separated)</label>
                <input
                  type="text"
                  value={(editingVehicle.features || []).join(", ")}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      features: e.target.value.split(",").map((f) => f.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Air Conditioning, Free Wi-Fi, Passenger Insurance"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="veh-ac-cb"
                  checked={Boolean(editingVehicle.airConditioned)}
                  onChange={(e) => setEditingVehicle({ ...editingVehicle, airConditioned: e.target.checked })}
                  className="rounded text-brand-darkTeal"
                />
                <label htmlFor="veh-ac-cb" className="text-xs font-semibold text-stone-800">
                  Fully Air-Conditioned Vehicle
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
                  {saving ? "Saving Vehicle..." : editingVehicle.id ? "Update Vehicle" : "Add Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

