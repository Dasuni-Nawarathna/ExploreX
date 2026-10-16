"use client";

import React, { useState, useEffect } from "react";
import { StoredEnquiry } from "@/types";
import { 
  MessageSquare, 
  Search, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  PhoneCall, 
  Send, 
  ExternalLink,
  Calendar,
  Users,
  Eye,
  X,
  FileText,
  ShieldCheck,
  Check
} from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedEnquiry, setSelectedEnquiry] = useState<StoredEnquiry | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/enquiries");
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus.toLowerCase() as any } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus.toLowerCase() as any });
        }
        setSuccessToast(`Enquiry marked as ${newStatus}`);
        setTimeout(() => setSuccessToast(""), 3000);
      } else {
        alert("Permission denied or failed to update enquiry status.");
      }
    } catch {
      alert("Error updating status.");
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setSavingNote(true);
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedEnquiry.id,
          status: (selectedEnquiry.status || "new").toUpperCase(),
          adminNotes: adminNoteInput,
        }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) =>
            e.id === selectedEnquiry.id ? { ...e, adminNotes: adminNoteInput } : e
          )
        );
        setSelectedEnquiry({ ...selectedEnquiry, adminNotes: adminNoteInput });
        setSuccessToast("Admin notes saved.");
        setTimeout(() => setSuccessToast(""), 3000);
      }
    } catch {
      alert("Failed to save admin notes.");
    } finally {
      setSavingNote(false);
    }
  };

  const openEnquiryDetail = (e: StoredEnquiry) => {
    setSelectedEnquiry(e);
    setAdminNoteInput(e.adminNotes || "");
  };

  const getStatusBadge = (status: string) => {
    const s = (status || "new").toLowerCase();
    switch (s) {
      case "new":
        return (
          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold inline-flex items-center gap-1">
            <Clock className="w-3 h-3" /> New
          </span>
        );
      case "contacted":
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold inline-flex items-center gap-1">
            <PhoneCall className="w-3 h-3" /> Contacted
          </span>
        );
      case "confirmed":
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold inline-flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Confirmed
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200 text-[10px] font-bold inline-flex items-center gap-1">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 text-[10px] font-bold">
            {status}
          </span>
        );
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      (e.customerName || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.itemName || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.refCode || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.id || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" || (e.status || "new").toUpperCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-brand-darkTeal" />
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              Enquiry CRM & WhatsApp Bookings
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Track inquiries dispatched via WhatsApp, customer booking preferences, follow-up status, and admin notes.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-500 bg-white px-3 py-2 rounded-xl border border-stone-200">
          <ShieldCheck className="w-4 h-4 text-brand-darkTeal" />
          <span>GDPR Compliant • Data minimization enforced</span>
        </div>
      </div>

      {/* Notifications */}
      {successToast && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Filters and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by customer name, ref code, or item..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-brand-darkTeal"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {["ALL", "NEW", "CONTACTED", "CONFIRMED", "CANCELLED"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                statusFilter === s
                  ? "bg-brand-darkTeal text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-stone-400">Loading enquiries...</div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="py-16 text-center text-xs text-stone-500">
            No customer enquiries match your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Ref / Timestamp</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Item & Type</th>
                  <th className="py-3 px-4">Travel Details</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredEnquiries.map((enq) => {
                  const dateStr = new Date(enq.timestamp).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <tr
                      key={enq.id}
                      className="hover:bg-stone-50/80 transition cursor-pointer"
                      onClick={() => openEnquiryDetail(enq)}
                    >
                      <td className="py-3 px-4">
                        <span className="font-mono font-bold text-stone-900 block">
                          {enq.refCode || enq.id.slice(0, 12)}
                        </span>
                        <span className="text-[10px] text-stone-400">{dateStr}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-stone-800 block">
                          {enq.customerName || "Traveler"}
                        </span>
                        {enq.customerPhone ? (
                          <span className="text-[11px] text-stone-500 font-mono">
                            {enq.customerPhone}
                          </span>
                        ) : (
                          <span className="text-[10px] text-stone-400 italic">WhatsApp Flow</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-stone-900 block truncate max-w-[200px]">
                          {enq.itemName}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-brand-darkTeal">
                          {enq.itemType}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1 text-stone-600">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          <span>{enq.travelDate || "Flexible"}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                          <Users className="w-3 h-3 text-stone-400" />
                          <span>{enq.travelersCount || 2} travelers</span>
                        </div>
                      </td>

                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={(enq.status || "new").toUpperCase()}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value)}
                          className="px-2 py-1 rounded-lg border border-stone-200 text-[11px] font-bold bg-white focus:outline-none"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </td>

                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {enq.customerPhone && (
                            <a
                              href={`https://wa.me/${enq.customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(
                                `Hello ${enq.customerName || "Traveler"}, thank you for your ExploreX enquiry (${enq.refCode || enq.itemName}). How may we assist your trip planning?`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
                              title="Chat with customer on WhatsApp"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => openEnquiryDetail(enq)}
                            className="p-1.5 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 transition"
                            title="Inspect Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Enquiry Detail Drawer / Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col my-8">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50 rounded-t-3xl">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-stone-900 text-base">
                    Enquiry {selectedEnquiry.refCode || selectedEnquiry.id.slice(0, 10)}
                  </h3>
                  {getStatusBadge(selectedEnquiry.status)}
                </div>
                <p className="text-xs text-stone-500">
                  Logged on {new Date(selectedEnquiry.timestamp).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-xl hover:bg-stone-200 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              {/* Item Info Card */}
              <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
                  Target Product
                </span>
                <h4 className="font-bold text-stone-900 text-sm">
                  {selectedEnquiry.itemName}
                </h4>
                <div className="grid grid-cols-2 gap-2 text-stone-600 text-[11px]">
                  <div>Type: <span className="font-semibold text-stone-800 uppercase">{selectedEnquiry.itemType}</span></div>
                  <div>Travelers: <span className="font-semibold text-stone-800">{selectedEnquiry.travelersCount || 2}</span></div>
                  <div>Date: <span className="font-semibold text-stone-800">{selectedEnquiry.travelDate || "Flexible"}</span></div>
                  <div>Vehicle: <span className="font-semibold text-stone-800">{selectedEnquiry.vehicleType || "Not specified"}</span></div>
                </div>
              </div>

              {/* Message Payload */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-700">Pre-filled WhatsApp Message</label>
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                  {selectedEnquiry.messageText || "No message body recorded."}
                </div>
              </div>

              {/* Admin Follow-up Notes */}
              <div className="space-y-2 pt-2 border-t border-stone-200">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-brand-darkTeal" />
                  <span>Internal Staff Notes</span>
                </label>
                <textarea
                  rows={3}
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="Record customer preferences, quote sent, hotel reservations, or special dietary requirements..."
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-brand-darkTeal"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotes}
                    disabled={savingNote}
                    className="px-3.5 py-1.5 rounded-lg bg-brand-darkTeal text-white text-xs font-semibold hover:bg-teal-900 disabled:opacity-50"
                  >
                    {savingNote ? "Saving..." : "Save Notes"}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between rounded-b-3xl">
              <span className="text-[11px] text-stone-400">
                User Consent: {selectedEnquiry.consentGiven ? "Verified" : "Implicit via WhatsApp"}
              </span>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

