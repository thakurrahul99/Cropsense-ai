"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Filter,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Cpu,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { HISTORY } from "@/lib/mock-data/history";
import { cn, formatRelativeTime, getSeverityColor, getStatusBadgeClass } from "@/lib/utils";

const STATUS_FILTERS = ["All", "Verified", "Pending", "Resolved", "Flagged"];
const SEVERITY_FILTERS = ["All Severity", "Critical", "High", "Moderate", "Low"];

export default function HistoryPage() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All Severity");

  const filtered = HISTORY.filter((item) => {
    const matchStatus =
      statusFilter === "All" ||
      item.status.toLowerCase() === statusFilter.toLowerCase();
    const matchSeverity =
      severityFilter === "All Severity" ||
      item.severity.toLowerCase() === severityFilter.toLowerCase();
    return matchStatus && matchSeverity;
  });

  return (
    <div className="min-h-screen bg-forest-900">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <Link href="/farmer" className="inline-flex items-center gap-1.5 text-pearl-muted hover:text-pearl text-sm mb-6 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-pearl mb-1">
                Scan History
              </h1>
              <p className="text-pearl-muted text-sm">{HISTORY.length} scans this season</p>
            </div>
            <Link href="/farmer/scan">
              <button className="px-4 py-2 bg-jade-500 hover:bg-jade-400 text-forest-900 font-semibold text-sm rounded-xl transition-all">
                + New Scan
              </button>
            </Link>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border",
                    statusFilter === f
                      ? "bg-jade-500/20 text-jade-400 border-jade-500/30"
                      : "bg-forest-700/30 text-pearl-muted border-forest-600/30 hover:text-pearl"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-forest-800 border border-forest-600/50 text-pearl-muted text-xs rounded-lg px-3 py-1.5 ml-auto"
            >
              {SEVERITY_FILTERS.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Timeline list */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-forest-600/30" />

            <div className="space-y-4">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="relative pl-14"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-4 top-4 w-4 h-4 rounded-full border-2 border-forest-900 flex items-center justify-center -translate-x-1/2"
                    style={{ backgroundColor: getSeverityColor(item.severity) }}
                  />

                  <Link href="/farmer/result">
                    <div className="glass-card p-4 hover:border-jade-500/30 transition-all cursor-pointer group">
                      <div className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={item.thumbnail}
                            alt={item.cropName}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-display font-semibold text-pearl text-sm">
                              {item.diseaseName}
                            </h3>
                            <span className={cn(getStatusBadgeClass(item.status), "text-2xs flex-shrink-0")}>
                              {item.status}
                            </span>
                          </div>
                          <p className="text-pearl-muted text-xs mb-2">
                            {item.cropName} • {item.location}
                          </p>
                          <div className="flex items-center gap-3 text-2xs">
                            <span className="flex items-center gap-1 text-jade-400">
                              <Cpu className="w-3 h-3" />
                              {item.confidence}%
                            </span>
                            <span
                              className="font-medium"
                              style={{ color: getSeverityColor(item.severity) }}
                            >
                              {item.severity}
                            </span>
                            <span className="text-pearl-dim flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatRelativeTime(item.timestamp)}
                            </span>
                            {item.followedAdvisory && (
                              <span className="text-jade-400 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Advisory followed
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-pearl-dim group-hover:text-jade-400 transition-colors flex-shrink-0 mt-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <div className="pl-14 py-12 text-center">
                  <AlertTriangle className="w-10 h-10 text-pearl-dim mx-auto mb-3" />
                  <p className="text-pearl-muted">No scans match the selected filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
