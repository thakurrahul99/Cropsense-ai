"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Scan,
  AlertTriangle,
  Thermometer,
  Droplets,
  Wind,
  TrendingUp,
  Clock,
  ChevronRight,
  Shield,
  Leaf,
  MapPin,
  Bell,
  CheckCircle,
  Cpu,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { HISTORY } from "@/lib/mock-data/history";
import { ALERTS } from "@/lib/mock-data/alerts";
import { getWeatherForDistrict } from "@/lib/mock-data/weather";
import { formatRelativeTime, getSeverityColor, getStatusBadgeClass } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/lib/context/AppContext";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function SeverityDot({ level }: { level: string }) {
  const color = getSeverityColor(level);
  return (
    <span
      className="w-2 h-2 rounded-full inline-block flex-shrink-0"
      style={{ backgroundColor: color }}
    />
  );
}

export default function FarmerDashboard() {
  const { selectedState, selectedStateInfo } = useAppContext();
  const district = selectedStateInfo?.districts[0] ?? "Wardha";
  const weather = getWeatherForDistrict(district);

  const filteredAlerts = selectedState
    ? ALERTS.filter((a) => a.state === selectedState)
    : ALERTS;
  const filteredHistory = selectedState
    ? HISTORY.filter((h) => h.state === selectedState)
    : HISTORY;

  const unreadAlerts = filteredAlerts.filter((a) => !a.isRead).length;
  const criticalAlerts = filteredAlerts.filter((a) => a.severity === "critical").length;
  const recentScans = filteredHistory.slice(0, 3);
  const latestScan = filteredHistory[0] ?? HISTORY[0];

  return (
    <div className="min-h-screen bg-forest-900">
      <Navbar />
      <div className="pt-16">
        {/* Page header */}
        <div className="border-b border-forest-600/30 bg-forest-900/80 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="w-4 h-4 text-jade-400" />
                  <span className="text-pearl-muted text-sm">Farmer Portal</span>
                </div>
                <h1 className="font-display font-bold text-2xl sm:text-3xl text-pearl">
                  Good Morning, Ramesh 🌱
                </h1>
                <p className="text-pearl-muted text-sm mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Wardha, Maharashtra • Season: Kharif 2026
                </p>
              </div>
              <Link href="/farmer/scan">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2.5 px-6 py-3 bg-jade-500 hover:bg-jade-400 text-forest-900 font-bold rounded-xl shadow-glow-jade transition-all"
                >
                  <Scan className="w-4 h-4" />
                  Scan Crop Now
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* ── Left column (main) ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* KPI row */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    label: "Crop Health",
                    value: "72%",
                    sub: "Moderate",
                    icon: Leaf,
                    color: "#F59E0B",
                    bg: "bg-amber-500/10",
                    border: "border-amber-500/20",
                  },
                  {
                    label: "Risk Level",
                    value: "High",
                    sub: "Pink Bollworm",
                    icon: AlertTriangle,
                    color: "#EF4444",
                    bg: "bg-red-500/10",
                    border: "border-red-500/20",
                  },
                  {
                    label: "Active Alerts",
                    value: unreadAlerts.toString(),
                    sub: `${criticalAlerts} critical`,
                    icon: Bell,
                    color: "#EF4444",
                    bg: "bg-red-500/10",
                    border: "border-red-500/20",
                  },
                  {
                    label: "Scans Done",
                    value: HISTORY.length.toString(),
                    sub: "This season",
                    icon: Cpu,
                    color: "#00E5A0",
                    bg: "bg-jade-500/10",
                    border: "border-jade-500/20",
                  },
                ].map((kpi, i) => {
                  const Icon = kpi.icon;
                  return (
                    <div
                      key={kpi.label}
                      className={cn("glass-card p-4 flex flex-col gap-1 border", kpi.border)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-pearl-muted text-xs font-medium">{kpi.label}</span>
                        <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", kpi.bg)}>
                          <Icon className="w-3.5 h-3.5" style={{ color: kpi.color }} />
                        </div>
                      </div>
                      <div className="font-display font-bold text-xl text-pearl">{kpi.value}</div>
                      <div className="text-xs" style={{ color: kpi.color }}>{kpi.sub}</div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Latest detection */}
              <motion.div variants={itemVariants} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold text-pearl text-lg">Latest Detection</h2>
                  <Link href="/farmer/result" className="flex items-center gap-1 text-jade-400 text-sm hover:text-jade-300 transition-colors">
                    View Full Report <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={latestScan.thumbnail}
                      alt={latestScan.cropName}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap mb-1">
                      <h3 className="font-display font-semibold text-pearl">{latestScan.diseaseName}</h3>
                      <span className="badge-crimson text-2xs">Critical</span>
                    </div>
                    <p className="text-pearl-muted text-sm mb-2">{latestScan.cropName} • {latestScan.location}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 text-jade-400">
                        <Cpu className="w-3 h-3" />
                        {latestScan.confidence}% confidence
                      </div>
                      <div className="text-pearl-dim flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatRelativeTime(latestScan.timestamp)}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-pearl-muted">Affected Area</span>
                        <span className="text-crimson-light font-medium">62%</span>
                      </div>
                      <div className="h-1.5 bg-forest-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "62%" }}
                          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                          className="h-full bg-crimson rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href="/farmer/advisory" className="flex-1">
                    <button className="w-full py-2 text-sm font-medium text-jade-400 bg-jade-500/10 border border-jade-500/20 rounded-lg hover:bg-jade-500/20 transition-colors">
                      View Advisory
                    </button>
                  </Link>
                  <Link href="/farmer/risk" className="flex-1">
                    <button className="w-full py-2 text-sm font-medium text-amber-fire bg-amber-500/10 border border-amber-500/20 rounded-lg hover:bg-amber-500/20 transition-colors">
                      Risk Breakdown
                    </button>
                  </Link>
                </div>
              </motion.div>

              {/* Recent scans */}
              <motion.div variants={itemVariants} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold text-pearl text-lg">Recent Scans</h2>
                  <Link href="/farmer/history" className="flex items-center gap-1 text-jade-400 text-sm hover:text-jade-300">
                    View All <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {HISTORY.slice(0, 4).map((item, i) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <Link href="/farmer/result" className="flex items-center gap-3 p-3 rounded-xl hover:bg-forest-700/40 transition-colors group">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={item.thumbnail} alt={item.cropName} fill className="object-cover" sizes="48px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <SeverityDot level={item.severity} />
                            <span className="text-pearl text-sm font-medium truncate">{item.diseaseName}</span>
                          </div>
                          <p className="text-pearl-muted text-xs truncate">{item.cropName} • {item.location}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className={cn(getStatusBadgeClass(item.status), "text-2xs mb-1")}>
                            {item.status}
                          </div>
                          <div className="text-pearl-dim text-2xs">{formatRelativeTime(item.timestamp)}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-pearl-dim group-hover:text-jade-400 transition-colors" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Right column (weather + alerts) ── */}
            <div className="space-y-6">
              {/* Weather card */}
              <motion.div variants={itemVariants} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold text-pearl">Weather</h2>
                  <span className="badge-neutral text-2xs">{weather.district}</span>
                </div>
                <div className="text-center mb-4">
                  <div className="font-display font-bold text-5xl text-pearl mb-1">
                    {weather.temp}°
                  </div>
                  <div className="text-pearl-muted text-sm">{weather.condition}</div>
                  <div className="text-pearl-dim text-xs mt-1">Feels like {weather.feelsLike}°C</div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { icon: Droplets, label: "Humidity", value: `${weather.humidity}%`, color: "#3B82F6" },
                    { icon: Wind, label: "Wind", value: `${weather.windSpeed} km/h`, color: "#00E5A0" },
                    { icon: TrendingUp, label: "Rain", value: `${weather.rainfall}mm`, color: "#F59E0B" },
                  ].map((w) => {
                    const Icon = w.icon;
                    return (
                      <div key={w.label} className="bg-forest-700/40 rounded-lg p-2 text-center">
                        <Icon className="w-3.5 h-3.5 mx-auto mb-1" style={{ color: w.color }} />
                        <div className="text-pearl text-xs font-medium">{w.value}</div>
                        <div className="text-pearl-dim text-2xs">{w.label}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-1 overflow-x-auto pb-1">
                  {weather.weekForecast.slice(0, 5).map((day) => (
                    <div key={day.day} className="flex-1 min-w-0 bg-forest-700/30 rounded-lg p-2 text-center">
                      <div className="text-pearl-dim text-2xs">{day.day}</div>
                      <div className="text-lg my-1">
                        {day.condition.includes("Rain") ? "🌧️" : day.condition.includes("Cloudy") ? "⛅" : "☀️"}
                      </div>
                      <div className="text-pearl text-xs font-medium">{day.high}°</div>
                    </div>
                  ))}
                </div>
                {weather.soilMoisture > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-pearl-muted">Soil Moisture</span>
                      <span className="text-blue-400">{weather.soilMoisture}%</span>
                    </div>
                    <div className="h-1.5 bg-forest-700 rounded-full">
                      <div
                        className="h-full bg-blue-400/70 rounded-full"
                        style={{ width: `${weather.soilMoisture}%` }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Active alerts */}
              <motion.div variants={itemVariants} className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold text-pearl flex items-center gap-2">
                    <Bell className="w-4 h-4 text-crimson" />
                    Active Alerts
                    {unreadAlerts > 0 && (
                      <span className="w-5 h-5 bg-crimson text-white text-2xs font-bold rounded-full flex items-center justify-center">
                        {unreadAlerts}
                      </span>
                    )}
                  </h2>
                  <Link href="/farmer/alerts" className="text-jade-400 text-sm hover:text-jade-300">
                    All
                  </Link>
                </div>
                <div className="space-y-3">
                  {filteredAlerts.filter((a) => !a.isRead).slice(0, 3).map((alert) => (
                    <div
                      key={alert.id}
                      className={cn(
                        "p-3 rounded-xl border-l-2",
                        alert.severity === "critical"
                          ? "bg-red-500/5 border-crimson"
                          : alert.severity === "danger"
                          ? "bg-orange-500/5 border-orange-500"
                          : "bg-amber-500/5 border-amber-fire"
                      )}
                    >
                      <div className="text-pearl text-xs font-medium mb-0.5 line-clamp-2">
                        {alert.title.en}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-pearl-dim text-2xs">{alert.district}</span>
                        <span
                          className={cn(
                            "text-2xs font-medium",
                            alert.severity === "critical" ? "text-crimson-light" : "text-amber-warm"
                          )}
                        >
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/farmer/alerts">
                  <button className="w-full mt-4 py-2 text-xs font-medium text-pearl-muted hover:text-pearl bg-forest-700/30 hover:bg-forest-700/50 rounded-lg transition-colors">
                    View All {ALERTS.length} Alerts
                  </button>
                </Link>
              </motion.div>

              {/* Quick actions */}
              <motion.div variants={itemVariants} className="glass-card p-6">
                <h2 className="font-display font-semibold text-pearl mb-3">Quick Actions</h2>
                <div className="space-y-2">
                  {[
                    { href: "/farmer/map", icon: MapPin, label: "View Risk Map", color: "#3B82F6" },
                    { href: "/farmer/advisory", icon: Shield, label: "Latest Advisory", color: "#F59E0B" },
                    { href: "/farmer/history", icon: Clock, label: "Scan History", color: "#00E5A0" },
                  ].map((action) => {
                    const Icon = action.icon;
                    return (
                      <Link key={action.href} href={action.href}>
                        <motion.div
                          whileHover={{ x: 4 }}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-forest-700/40 transition-colors cursor-pointer group"
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${action.color}15` }}
                          >
                            <Icon className="w-4 h-4" style={{ color: action.color }} />
                          </div>
                          <span className="text-pearl text-sm font-medium">{action.label}</span>
                          <ChevronRight className="w-4 h-4 text-pearl-dim ml-auto group-hover:text-jade-400 transition-colors" />
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
