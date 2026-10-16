"use client";

import React, { useState, useEffect } from "react";
import { 
  Star, 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Check, 
  Filter, 
  ThumbsUp, 
  ThumbsDown,
  MessageSquare
} from "lucide-react";

interface AdminReview {
  id: string;
  customerName: string;
  customerLocation?: string;
  rating: number;
  comment: string;
  targetType: string;
  targetId?: string;
  isApproved: boolean;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "PENDING" | "APPROVED">("ALL");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState("");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/reviews");
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
      }
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleModeration = async (id: string, isApproved: boolean) => {
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isApproved }),
      });
      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, isApproved } : r))
        );
        setToastMsg(`Review by customer marked as ${isApproved ? "Approved" : "Pending/Rejected"}.`);
        setTimeout(() => setToastMsg(""), 3000);
      } else {
        alert("Permission denied or moderation error.");
      }
    } catch {
      alert("Error moderating review.");
    } finally {
      setActionLoading(null);
    }
  };

  const pendingCount = reviews.filter((r) => !r.isApproved).length;

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.customerName.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "ALL" ||
      (filterStatus === "PENDING" && !r.isApproved) ||
      (filterStatus === "APPROVED" && r.isApproved);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-brand-gold fill-current" />
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              Customer Reviews & Moderation
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Approve verified client feedback before displaying publicly on tour packages and the homepage.
          </p>
        </div>
        {pendingCount > 0 && (
          <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>{pendingCount} review(s) awaiting moderation</span>
          </div>
        )}
      </div>

      {/* Notifications */}
      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by customer name or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-brand-darkTeal"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setFilterStatus("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filterStatus === "ALL"
                ? "bg-brand-darkTeal text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            All ({reviews.length})
          </button>
          <button
            onClick={() => setFilterStatus("PENDING")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
              filterStatus === "PENDING"
                ? "bg-amber-600 text-white"
                : "bg-amber-50 text-amber-800 hover:bg-amber-100"
            }`}
          >
            <span>Pending Moderation</span>
            <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
              {pendingCount}
            </span>
          </button>
          <button
            onClick={() => setFilterStatus("APPROVED")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filterStatus === "APPROVED"
                ? "bg-emerald-600 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            Approved ({reviews.filter((r) => r.isApproved).length})
          </button>
        </div>
      </div>

      {/* Reviews Cards List */}
      {loading ? (
        <div className="py-20 text-center text-xs text-stone-400">Loading reviews queue...</div>
      ) : filteredReviews.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white border border-stone-200 text-stone-500 text-xs">
          No reviews match your selected filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((rev) => {
            const dateStr = new Date(rev.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });
            return (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? "fill-current" : "text-stone-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-stone-900 text-sm">
                      {rev.customerName}
                    </span>
                    {rev.customerLocation && (
                      <span className="text-[11px] text-stone-400">({rev.customerLocation})</span>
                    )}
                    <span className="text-[10px] text-stone-400">• {dateStr}</span>
                  </div>

                  <p className="text-xs text-stone-700 italic leading-relaxed">
                    "{rev.comment}"
                  </p>

                  <div className="flex items-center gap-2 pt-1 text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-semibold uppercase">
                      {rev.targetType}
                    </span>
                    {rev.isApproved ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold inline-flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Live on Public Site
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Pending Staff Moderation
                      </span>
                    )}
                  </div>
                </div>

                {/* Moderation Controls */}
                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
                  {rev.isApproved ? (
                    <button
                      onClick={() => handleModeration(rev.id, false)}
                      disabled={actionLoading === rev.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-100 transition disabled:opacity-50"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                      <span>Unapprove</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleModeration(rev.id, true)}
                      disabled={actionLoading === rev.id}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-sm transition disabled:opacity-50"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve Review</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

