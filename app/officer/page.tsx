"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  XCircle,
  Eye,
  BarChart3,
  Map as MapIcon,
  Shield,
  Leaf,
} from "lucide-react";
import Image from "next/image";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
} from "recharts";
import { Navbar } from "@/components/layout/Navbar";
import {
  OFFICER_KPIS,
  DISEASE_TREND,
  PEST_TREND,
  REPORT_DENSITY,
  OFFICER_REPORTS,
  type ReportItem,
} from "@/lib/mock-data/officer-stats";
import { cn, formatRelativeTime, getSeverityColor } from "@/lib/utils";

// KPI card with animated counter
function KPICard({ kpi, index }: { kpi: typeof OFFICER_KPIS[0]; index: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const TrendIcon = kpi.trend === "up" ? TrendingUp : kpi.trend === "down" ? TrendingDown : Minus;
  const trendColor = kpi.trend === "up" ? "#00E5A0" : kpi.trend === "down" ? "#EF4444" : "#7A9E8A";

  useEffect(() => {
    const timer = setTimeout(() => {
      const start = 0;
      const end = kpi.value;
      const duration = 1500;
      const startTime = Date.now();
      const frame = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(start + (end - start) * eased));
        if (progress < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }, index * 120);
    return () => clearTimeout(timer);
  }, [kpi.value, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-pearl-muted text-xs font-medium">{kpi.label}</span>
        <div className="flex items-center gap-1" style={{ color: trendColor }}>
          <TrendIcon className="w-3 h-3" />
          <span className="text-2xs font-medium">{Math.abs(kpi.change)}%</span>
        </div>
      </div>
      <div
        className="font-display font-black text-3xl mb-0.5"
        style={{ color: kpi.color }}
      >
        {displayValue.toLocaleString()}
      </div>
      <div className="text-pearl-dim text-xs">vs last month</div>
    </motion.div>
  );
}

// Report row with action buttons
function ReportRow({
  report,
  onAction,
}: {
  report: ReportItem;
  onAction: (id: string, action: "confirmed" | "rejected" | "needs_review") => void;
}) {
  const severityColor = getSeverityColor(report.severity);
  const statusConfig = {
    pending: { label: "Pending", class: "badge-amber" },
    confirmed: { label: "Confirmed", class: "badge-jade" },
    rejected: { label: "Rejected", class: "badge-crimson" },
    needs_review: { label: "Review", class: "badge-amber" },
  };
  const status = statusConfig[report.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-forest-700/30 transition-all"
    >
      {/* Thumbnail */}
      <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
        <Image src={report.thumbnail} alt={report.farmerName} fill className="object-cover" sizes="40px" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-pearl text-xs font-semibold truncate">{report.threat}</span>
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: severityColor }}
          />
        </div>
        <p className="text-pearl-dim text-2xs truncate">
          {report.farmerName} • {report.village}, {report.district}
        </p>
        <p className="text-jade-400 text-2xs">{report.confidence}% conf • {report.crop}</p>
      </div>

      {/* Status badge */}
      <span className={cn(status.class, "text-2xs flex-shrink-0 hidden sm:inline-flex")}>
        {status.label}
      </span>

      {/* Actions */}
      {report.status === "pending" || report.status === "needs_review" ? (
        <div className="flex gap-1 flex-shrink-0">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onAction(report.id, "confirmed")}
            className="w-7 h-7 bg-jade-500/10 hover:bg-jade-500/25 text-jade-400 rounded-lg flex items-center justify-center transition-all"
            title="Confirm"
          >
            <CheckCircle className="w-3.5 h-3.5" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onAction(report.id, "needs_review")}
            className="w-7 h-7 bg-amber-500/10 hover:bg-amber-500/25 text-amber-fire rounded-lg flex items-center justify-center transition-all"
            title="Flag for Review"
          >
            <Eye className="w-3.5 h-3.5" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onAction(report.id, "rejected")}
            className="w-7 h-7 bg-red-500/10 hover:bg-red-500/25 text-crimson-light rounded-lg flex items-center justify-center transition-all"
            title="Reject"
          >
            <XCircle className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      ) : (
        <div className="flex-shrink-0 text-pearl-dim">
          {report.status === "confirmed" ? (
            <CheckCircle className="w-4 h-4 text-jade-400" />
          ) : (
            <XCircle className="w-4 h-4 text-crimson-light" />
          )}
        </div>
      )}
    </motion.div>
  );
}

const CHART_TOOLTIP_STYLE = {
  backgroundColor: "rgba(17,28,22,0.95)",
  border: "1px solid rgba(0,229,160,0.2)",
  borderRadius: "8px",
  color: "#F0F4F0",
  fontSize: "12px",
};

export default function OfficerPage() {
  const [reports, setReports] = useState(OFFICER_REPORTS);
  const [activeChart, setActiveChart] = useState<"disease" | "pest" | "density">("disease");

  const handleAction = (id: string, action: "confirmed" | "rejected" | "needs_review") => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
  };

  return (
    <div className="min-h-screen bg-forest-900">
      <Navbar />
      <div className="pt-16">
        {/* Header */}
        <div className="border-b border-forest-600/30 bg-forest-900/80 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl text-pearl">
                  Officer Command Center
                </h1>
                <p className="text-pearl-muted text-sm">
                  Maharashtra Agricultural Intelligence Dashboard — Kharif 2026
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="badge-jade text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-jade-400 animate-pulse" />
                  Live
                </span>
                <span className="text-pearl-dim text-xs hidden sm:block">
                  Last updated: {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* KPI Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {OFFICER_KPIS.map((kpi, i) => (
              <KPICard key={kpi.label} kpi={kpi} index={i} />
            ))}
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Charts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Chart switcher */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold text-pearl flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-jade-400" />
                    Trend Analysis
                  </h2>
                  <div className="flex gap-2">
                    {(["disease", "pest", "density"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setActiveChart(t)}
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium transition-all border",
                          activeChart === t
                            ? "bg-jade-500/20 text-jade-400 border-jade-500/30"
                            : "bg-forest-700/30 text-pearl-muted border-forest-600/30 hover:text-pearl"
                        )}
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ height: 240 }}>
                  {activeChart === "disease" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={DISEASE_TREND}>
                        <defs>
                          {["cotton", "soybean", "wheat", "grape"].map((crop, i) => {
                            const colors = ["#00E5A0", "#3B82F6", "#F59E0B", "#8B5CF6"];
                            return (
                              <linearGradient key={crop} id={`grad-${crop}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={colors[i]} stopOpacity={0.25} />
                                <stop offset="95%" stopColor={colors[i]} stopOpacity={0} />
                              </linearGradient>
                            );
                          })}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(122,158,138,0.1)" />
                        <XAxis dataKey="week" tick={{ fill: "#7A9E8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "#7A9E8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                        <Legend wrapperStyle={{ color: "#7A9E8A", fontSize: "11px" }} />
                        {[
                          { key: "cotton", color: "#00E5A0" },
                          { key: "soybean", color: "#3B82F6" },
                          { key: "wheat", color: "#F59E0B" },
                          { key: "grape", color: "#8B5CF6" },
                        ].map(({ key, color }) => (
                          <Area key={key} type="monotone" dataKey={key} stroke={color} strokeWidth={2} fill={`url(#grad-${key})`} dot={false} />
                        ))}
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                  {activeChart === "pest" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={PEST_TREND}>
                        <defs>
                          {["bollworm", "aphid", "stemBorer", "whitefly"].map((pest, i) => {
                            const colors = ["#EF4444", "#F59E0B", "#8B5CF6", "#06B6D4"];
                            return (
                              <linearGradient key={pest} id={`pg-${pest}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={colors[i]} stopOpacity={0.25} />
                                <stop offset="95%" stopColor={colors[i]} stopOpacity={0} />
                              </linearGradient>
                            );
                          })}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(122,158,138,0.1)" />
                        <XAxis dataKey="week" tick={{ fill: "#7A9E8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: "#7A9E8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                        <Legend wrapperStyle={{ color: "#7A9E8A", fontSize: "11px" }} />
                        {[
                          { key: "bollworm", color: "#EF4444" },
                          { key: "aphid", color: "#F59E0B" },
                          { key: "stemBorer", color: "#8B5CF6" },
                          { key: "whitefly", color: "#06B6D4" },
                        ].map(({ key, color }) => (
                          <Area key={key} type="monotone" dataKey={key} stroke={color} strokeWidth={2} fill={`url(#pg-${key})`} dot={false} />
                        ))}
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                  {activeChart === "density" && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={REPORT_DENSITY} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(122,158,138,0.1)" horizontal={false} />
                        <XAxis type="number" tick={{ fill: "#7A9E8A", fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="district" tick={{ fill: "#7A9E8A", fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                        <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                        <Bar dataKey="reports" fill="#00E5A0" fillOpacity={0.7} radius={[0, 4, 4, 0]} />
                        <Bar dataKey="critical" fill="#EF4444" fillOpacity={0.7} radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Mini map placeholder */}
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold text-pearl flex items-center gap-2">
                    <MapIcon className="w-4 h-4 text-jade-400" />
                    Hotspot Overview
                  </h2>
                  <a href="/farmer/map" className="text-jade-400 text-sm hover:text-jade-300">
                    Full Map →
                  </a>
                </div>
                <div className="rounded-xl overflow-hidden h-40 relative bg-forest-800">
                  <Image
                    src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=60"
                    alt="Maharashtra map overview"
                    fill
                    className="object-cover opacity-30"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <a href="/farmer/map">
                      <button className="px-6 py-2.5 bg-jade-500/80 hover:bg-jade-500 text-forest-900 font-semibold text-sm rounded-xl backdrop-blur-sm transition-all">
                        Open Live GIS Map
                      </button>
                    </a>
                  </div>
                  {/* Mock hotspot dots */}
                  {[
                    { top: "30%", left: "65%", color: "#EF4444" },
                    { top: "55%", left: "40%", color: "#F59E0B" },
                    { top: "70%", left: "30%", color: "#F59E0B" },
                    { top: "45%", left: "70%", color: "#EF4444" },
                    { top: "60%", left: "55%", color: "#00E5A0" },
                  ].map((dot, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      style={{ top: dot.top, left: dot.left, backgroundColor: dot.color, boxShadow: `0 0 10px ${dot.color}` }}
                      className="absolute w-3 h-3 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Report Validation panel */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-pearl text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-jade-400" />
                  Report Validation
                </h2>
                <span className="badge-amber text-2xs">
                  {reports.filter((r) => r.status === "pending").length} pending
                </span>
              </div>

              <div className="space-y-1 max-h-[600px] overflow-y-auto">
                {reports.map((report) => (
                  <ReportRow key={report.id} report={report} onAction={handleAction} />
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-forest-600/20">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {[
                    { label: "Confirmed", value: reports.filter((r) => r.status === "confirmed").length, color: "text-jade-400" },
                    { label: "Pending", value: reports.filter((r) => r.status === "pending").length, color: "text-amber-fire" },
                    { label: "Rejected", value: reports.filter((r) => r.status === "rejected").length, color: "text-crimson-light" },
                  ].map((s) => (
                    <div key={s.label} className="bg-forest-700/30 rounded-lg py-2">
                      <div className={cn("font-bold text-lg", s.color)}>{s.value}</div>
                      <div className="text-pearl-dim text-2xs">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
