"use client";

import Link from "next/link";
import { Leaf, ExternalLink, GitBranch, Send } from "lucide-react";
import { useAppContext } from "@/lib/context/AppContext";

export function Footer() {
  const { selectedStateInfo } = useAppContext();

  const govtBadge = selectedStateInfo
    ? `Govt. of ${selectedStateInfo.name}`
    : "Ministry of Agriculture & Farmers Welfare, Govt. of India";

  const description = selectedStateInfo
    ? `AI-powered crop health intelligence for early disease detection, localized risk forecasting, and actionable agricultural advisories across ${selectedStateInfo.name}.`
    : "AI-powered crop health intelligence for early disease detection, localized risk forecasting, and actionable agricultural advisories across all Indian states and union territories.";

  return (
    <footer className="border-t border-forest-600/30 bg-forest-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-jade-500/10 border border-jade-500/30 rounded-xl flex items-center justify-center">
                <Leaf className="w-4 h-4 text-jade-400" />
              </div>
              <div>
                <span className="font-display font-bold text-pearl text-base">CropSense AI</span>
              </div>
            </Link>
            <p className="text-pearl-muted text-sm leading-relaxed max-w-xs">
              {description}
            </p>
            <div className="mt-4 flex items-center gap-1">
              <span className="badge-jade text-2xs">SIH 2026 Project</span>
              <span className="badge-neutral text-2xs">{govtBadge}</span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-pearl font-semibold text-sm mb-3">Platform</h4>
            <ul className="space-y-2">
              {[
                { href: "/farmer", label: "Farmer Dashboard" },
                { href: "/farmer/scan", label: "Scan Crop" },
                { href: "/farmer/map", label: "Risk Map" },
                { href: "/farmer/history", label: "Scan History" },
                { href: "/officer", label: "Officer Center" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-pearl-muted text-sm hover:text-jade-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-pearl font-semibold text-sm mb-3">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: "ICAR Research Hub", href: "#" },
                { label: "Krishi Vigyan Kendras", href: "#" },
                { label: "India Agriculture Dept.", href: "#" },
                { label: "Disease Library", href: "#" },
                { label: "API Documentation", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-pearl-muted text-sm hover:text-jade-400 transition-colors flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-forest-600/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-pearl-dim text-xs">
            © 2026 CropSense AI — SIH Project #26131 — Early Detection &amp; Management of Crop Diseases
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-pearl-dim hover:text-jade-400 transition-colors">
              <GitBranch className="w-4 h-4" />
            </a>
            <a href="#" className="text-pearl-dim hover:text-jade-400 transition-colors">
              <Send className="w-4 h-4" />
            </a>
            <span className="text-pearl-dim text-xs">
              Built for India&apos;s Farmers 🌱
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
