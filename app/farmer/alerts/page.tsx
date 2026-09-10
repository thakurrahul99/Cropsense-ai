"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Info,
  Shield,
  MapPin,
  Clock,
  X,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { ALERTS } from "@/lib/mock-data/alerts";
import { Alert } from "@/lib/mock-data/alerts";
import { cn, formatRelativeTime } from "@/lib/utils";
import { useAppContext } from "@/lib/context/AppContext";

const SEVERITY_CONFIG = {
  critical: {
    bg: "bg-red-500/8 border-red-500/25",
    iconBg: "bg-red-500/15",
    iconColor: "text-crimson-light",
    badge: "badge-crimson",
    icon: AlertTriangle,
    label: "Critical",
  },
  danger: {
    bg: "bg-orange-500/8 border-orange-500/25",
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
    badge: "badge-amber",
    icon: AlertTriangle,
    label: "Danger",
  },
  warning: {
    bg: "bg-amber-500/8 border-amber-500/25",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-fire",
    badge: "badge-amber",
    icon: AlertTriangle,
    label: "Warning",
  },
  info: {
    bg: "bg-blue-500/8 border-blue-500/25",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    badge: "badge-neutral",
    icon: Info,
    label: "Info",
  },
};

function AlertCard({ alert, onDismiss }: { alert: Alert; onDismiss: (id: string) => void }) {
  const config = SEVERITY_CONFIG[alert.severity];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={cn("glass-card p-5 border", config.bg, !alert.isRead && "ring-1 ring-inset", alert.severity === "critical" && !alert.isRead && "ring-red-500/20")}
    >
      <div className="flex items-start gap-3">
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", config.iconBg)}>
          <Icon className={cn("w-4 h-4", config.iconColor)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={cn("font-display font-semibold text-sm", alert.isRead ? "text-pearl-muted" : "text-pearl")}>
              {alert.title.en}
            </h3>
            <button
              onClick={() => onDismiss(alert.id)}
              className="text-pearl-dim hover:text-pearl transition-colors flex-shrink-0 mt-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-pearl-muted text-xs leading-relaxed mb-3">{alert.description}</p>
          <div className="flex flex-wrap items-center gap-3 text-2xs text-pearl-dim">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {alert.district}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatRelativeTime(alert.timestamp)}
            </span>
            <span className={cn(config.badge, "text-2xs")}>
              {config.label}
            </span>
            <span className="badge-neutral text-2xs">{alert.source}</span>
          </div>
          {alert.actionRequired && (
            <div className="mt-3 flex gap-2">
              <Link href="/farmer/advisory" className="flex-1">
                <button className="w-full py-1.5 text-xs font-medium text-jade-400 bg-jade-500/10 border border-jade-500/20 rounded-lg hover:bg-jade-500/20 transition-colors">
                  View Advisory
                </button>
              </Link>
              <Link href="/farmer/map" className="flex-1">
                <button className="w-full py-1.5 text-xs font-medium text-pearl-muted bg-forest-700/40 border border-forest-600/30 rounded-lg hover:text-pearl transition-colors">
                  See on Map
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function AlertsPage() {
  const { selectedState } = useAppContext();
  const baseAlerts = selectedState ? ALERTS.filter((a) => a.state === selectedState) : ALERTS;
  const [alerts, setAlerts] = useState(baseAlerts);
  const [filter, setFilter] = useState("all");

  const dismiss = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const markAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, isRead: true })));
  };

  const filtered = alerts.filter((a) => {
    if (filter === "unread") return !a.isRead;
    if (filter === "critical") return a.severity === "critical";
    if (filter === "action") return a.actionRequired;
    return true;
  });

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  return (
    <div className="min-h-screen bg-forest-900">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <Link href="/farmer" className="inline-flex items-center gap-1.5 text-pearl-muted hover:text-pearl text-sm mb-6 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-pearl flex items-center gap-2">
                <Bell className="w-6 h-6 text-jade-400" />
                Alerts
                {unreadCount > 0 && (
                  <span className="w-6 h-6 bg-crimson text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </h1>
              <p className="text-pearl-muted text-sm mt-1">
                {alerts.length} alerts • {unreadCount} unread
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 text-jade-400 text-sm hover:text-jade-300 transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Mark All Read
              </button>
            )}
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {[
              { key: "all", label: "All" },
              { key: "unread", label: "Unread" },
              { key: "critical", label: "Critical" },
              { key: "action", label: "Action Required" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border",
                  filter === key
                    ? "bg-jade-500/20 text-jade-400 border-jade-500/30"
                    : "bg-forest-700/30 text-pearl-muted border-forest-600/30 hover:text-pearl"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Alert feed */}
          <motion.div layout className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((alert, i) => (
                <AlertCard key={alert.id} alert={alert} onDismiss={dismiss} />
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Shield className="w-12 h-12 text-jade-400 mx-auto mb-3" />
                <h3 className="font-display font-semibold text-pearl mb-1">All Clear!</h3>
                <p className="text-pearl-muted text-sm">No alerts match the current filter.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
