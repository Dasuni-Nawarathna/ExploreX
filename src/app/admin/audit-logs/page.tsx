"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Activity, 
  Lock, 
  User, 
  Database, 
  Clock,
  ArrowUpDown
} from "lucide-react";

interface AuditLog {
  id: string;
  userId?: string;
  userEmail?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  timestamp: string;
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterAction, setFilterAction] = useState("ALL");

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/audit-logs");
      if (res.ok) {
        const data = await res.json();
        setLogs(data.auditLogs || []);
      }
    } catch (err) {
      console.error("Failed to fetch audit logs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const getActionBadge = (action: string) => {
    switch (action.toUpperCase()) {
      case "CREATE":
        return (
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
            CREATE
          </span>
        );
      case "UPDATE":
        return (
          <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold">
            UPDATE
          </span>
        );
      case "DELETE":
        return (
          <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold">
            DELETE
          </span>
        );
      case "STATUS_CHANGE":
        return (
          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
            STATUS
          </span>
        );
      case "LOGIN":
        return (
          <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-bold">
            LOGIN
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-bold">
            {action}
          </span>
        );
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      (log.userEmail || "").toLowerCase().includes(search.toLowerCase()) ||
      (log.resource || "").toLowerCase().includes(search.toLowerCase()) ||
      (log.details || "").toLowerCase().includes(search.toLowerCase());
    const matchesAction = filterAction === "ALL" || log.action.toUpperCase() === filterAction;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-brand-darkTeal" />
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">
              Security Audit Logs
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Immutable tracking stream of all administrative actions, data modifications, and staff logins.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-500 bg-white px-3 py-2 rounded-xl border border-stone-200">
          <Lock className="w-4 h-4 text-brand-darkTeal" />
          <span>SOC-2 & GDPR Audit Ready</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by actor email, resource, details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 focus:outline-none focus:border-brand-darkTeal"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {["ALL", "CREATE", "UPDATE", "DELETE", "STATUS_CHANGE", "LOGIN"].map((act) => (
            <button
              key={act}
              onClick={() => setFilterAction(act)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filterAction === act
                  ? "bg-brand-darkTeal text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {act}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-xs text-stone-400">Loading audit trail...</div>
        ) : filteredLogs.length === 0 ? (
          <div className="py-16 text-center text-xs text-stone-500">
            No audit records match your query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Resource</th>
                  <th className="py-3 px-4">Modification Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredLogs.map((log) => {
                  const dateObj = new Date(log.timestamp);
                  const formattedDate = dateObj.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });
                  const formattedTime = dateObj.toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  });
                  return (
                    <tr key={log.id} className="hover:bg-stone-50/80 transition font-mono">
                      <td className="py-3 px-4 text-stone-500 text-[11px] whitespace-nowrap">
                        <span className="block font-semibold text-stone-700">{formattedDate}</span>
                        <span className="text-[10px] text-stone-400">{formattedTime}</span>
                      </td>

                      <td className="py-3 px-4">{getActionBadge(log.action)}</td>

                      <td className="py-3 px-4">
                        <span className="font-semibold text-stone-900 block truncate max-w-[180px]">
                          {log.userEmail || "System Automation"}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-bold uppercase">
                          {log.resource}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-stone-700 text-[11px] font-sans">
                        {log.details || "Administrative event logged"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

