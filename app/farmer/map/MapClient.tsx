"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";
import {
  ArrowLeft,
  X,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Leaf,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { MAP_MARKERS, MapMarker } from "@/lib/mock-data/map-markers";
import { cn, formatRelativeTime, getSeverityColor } from "@/lib/utils";

// Fix leaflet default icon
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom colored marker
function createCustomIcon(color: string, severity: string): L.DivIcon {
  const pulse = severity === "critical" || severity === "high"
    ? `<div style="position:absolute;inset:-6px;border-radius:50%;border:2px solid ${color};opacity:0.4;animation:ping 2s cubic-bezier(0,0,0.2,1) infinite;"></div>`
    : "";
  return L.divIcon({
    className: "",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    html: `
      <div style="position:relative;width:24px;height:24px;">
        ${pulse}
        <div style="
          width:24px;height:24px;border-radius:50%;
          background:${color};
          border:3px solid rgba(255,255,255,0.2);
          box-shadow:0 0 12px ${color}70, 0 2px 6px rgba(0,0,0,0.4);
          display:flex;align-items:center;justify-content:center;
          font-size:10px;font-weight:700;color:#fff;
        ">●</div>
      </div>
    `,
  });
}

function MapStyler() {
  const map = useMap();
  useEffect(() => {
    // Inject pulse keyframe
    const style = document.createElement("style");
    style.textContent = `
      @keyframes ping {
        75%, 100% { transform: scale(2); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }, []);
  return null;
}

function MarkerDetailPanel({
  marker,
  onClose,
}: {
  marker: MapMarker;
  onClose: () => void;
}) {
  const color = getSeverityColor(marker.severity);
  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="absolute bottom-0 left-0 right-0 z-[1000] glass-card rounded-t-3xl p-6 border-t border-forest-600/30 max-h-[60vh] overflow-y-auto"
      style={{ boxShadow: "0 -8px 40px rgba(0,0,0,0.5)" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
          />
          <span className="font-mono text-2xs text-pearl-dim uppercase">
            {marker.severity} risk
          </span>
        </div>
        <button onClick={onClose} className="text-pearl-muted hover:text-pearl transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <h2 className="font-display font-bold text-xl text-pearl mb-1">
        {marker.diseaseName}
      </h2>
      <p className="text-pearl-muted text-sm mb-4">
        {marker.diseaseType === "pest" ? "🦟 Pest" : "🦠 Disease"} in{" "}
        <span className="text-jade-400">{marker.cropName}</span>
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { icon: MapPin, label: "Location", value: `${marker.village}, ${marker.district}` },
          { icon: FileText, label: "Reports", value: `${marker.reportsCount} total` },
          { icon: CheckCircle, label: "Verified", value: `${marker.verifiedCount} confirmed` },
          { icon: Clock, label: "Last Report", value: formatRelativeTime(marker.lastReported) },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-forest-700/40 rounded-xl p-3">
              <Icon className="w-3.5 h-3.5 text-jade-400 mb-1.5" />
              <div className="font-semibold text-pearl text-sm">{stat.value}</div>
              <div className="text-pearl-dim text-2xs">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mb-4">
        {marker.verified ? (
          <span className="badge-jade text-xs">
            <CheckCircle className="w-3 h-3" />
            Officer Verified
          </span>
        ) : (
          <span className="badge-amber text-xs">
            <AlertTriangle className="w-3 h-3" />
            Pending Verification
          </span>
        )}
      </div>

      <Link href="/farmer/result">
        <button className="w-full py-3 bg-jade-500 hover:bg-jade-400 text-forest-900 font-bold text-sm rounded-xl transition-all">
          View Detection Report →
        </button>
      </Link>
    </motion.div>
  );
}

const SEVERITY_LEGEND = [
  { label: "Critical", color: "#EF4444" },
  { label: "High", color: "#F59E0B" },
  { label: "Moderate", color: "#FBBF24" },
  { label: "Low", color: "#00E5A0" },
];

export default function MapClient() {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string | null>(null);

  const filtered = MAP_MARKERS.filter(
    (m) => !severityFilter || m.severity === severityFilter
  );

  return (
    <div className="min-h-screen bg-forest-900 relative flex flex-col">
      <Navbar />

      {/* Map header overlay */}
      <div className="absolute top-16 left-0 right-0 z-[500] pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
          <div className="pointer-events-auto">
            <div className="glass-card p-3 inline-flex items-center gap-3">
              <Link href="/farmer" className="flex items-center gap-1.5 text-pearl-muted hover:text-pearl text-sm transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                Dashboard
              </Link>
              <span className="text-forest-600/50">|</span>
              <div className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-jade-400" />
                <span className="text-pearl text-sm font-medium">GIS Risk Intelligence Map</span>
              </div>
              <span className="badge-jade text-2xs">{MAP_MARKERS.length} Hotspots</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leaflet map */}
      <div className="flex-1 pt-16 relative">
        <MapContainer
          center={[19.7515, 75.7139]}
          zoom={7}
          style={{ width: "100%", height: "calc(100vh - 64px)" }}
          zoomControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <MapStyler />

          {filtered.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={createCustomIcon(getSeverityColor(marker.severity), marker.severity)}
              eventHandlers={{
                click: () => setSelectedMarker(marker),
              }}
            />
          ))}
        </MapContainer>

        {/* Severity filter legend */}
        <div className="absolute bottom-4 left-4 z-[500] glass-card p-3 space-y-2">
          <div className="text-pearl-muted text-2xs font-medium uppercase mb-2">Filter by Severity</div>
          <button
            onClick={() => setSeverityFilter(null)}
            className={cn(
              "block w-full text-left text-xs px-2 py-1 rounded-lg transition-all",
              !severityFilter ? "text-jade-400 bg-jade-500/10" : "text-pearl-muted hover:text-pearl"
            )}
          >
            All ({MAP_MARKERS.length})
          </button>
          {SEVERITY_LEGEND.map((item) => {
            const count = MAP_MARKERS.filter((m) => m.severity === item.label.toLowerCase()).length;
            return (
              <button
                key={item.label}
                onClick={() => setSeverityFilter(item.label.toLowerCase())}
                className={cn(
                  "flex items-center gap-2 w-full text-left text-xs px-2 py-1 rounded-lg transition-all",
                  severityFilter === item.label.toLowerCase()
                    ? "bg-forest-700/60"
                    : "hover:bg-forest-700/30"
                )}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-pearl-muted">{item.label}</span>
                <span className="text-pearl-dim ml-auto">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="absolute bottom-0 left-0 right-0 z-[600]">
          <AnimatePresence>
            {selectedMarker && (
              <MarkerDetailPanel
                marker={selectedMarker}
                onClose={() => setSelectedMarker(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
