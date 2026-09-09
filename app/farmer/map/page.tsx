"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-forest-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-jade-500/30 border-t-jade-400 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-pearl-muted text-sm">Loading GIS Intelligence Map...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  return <MapClient />;
}
