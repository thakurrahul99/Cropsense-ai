"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Menu,
  X,
  Bell,
  Globe,
  ChevronDown,
  Scan,
  LayoutDashboard,
  Map,
  AlertTriangle,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ALERTS } from "@/lib/mock-data/alerts";

const NAV_LINKS = [
  { href: "/farmer", label: "Dashboard", icon: LayoutDashboard },
  { href: "/farmer/scan", label: "Scan Crop", icon: Scan },
  { href: "/farmer/map", label: "Risk Map", icon: Map },
  { href: "/farmer/alerts", label: "Alerts", icon: AlertTriangle },
  { href: "/officer", label: "Officer View", icon: Shield },
];

const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
  { code: "mr", label: "Marathi", native: "मराठी" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(LANGUAGES[0]);
  const pathname = usePathname();
  const unreadAlerts = ALERTS.filter((a) => !a.isRead).length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isLanding = pathname === "/";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isLanding
          ? "bg-forest-900/95 backdrop-blur-xl border-b border-forest-600/30 shadow-card-elevated"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-9 h-9 bg-jade-500/10 border border-jade-500/30 rounded-xl flex items-center justify-center group-hover:bg-jade-500/20 transition-colors"
            >
              <Leaf className="w-5 h-5 text-jade-400" />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-pearl text-base tracking-tight">
                CropSense
              </span>
              <span className="text-jade-400 text-2xs font-mono font-medium tracking-widest uppercase">
                AI Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    whileHover={{ y: -1 }}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-jade-500/15 text-jade-400 border border-jade-500/20"
                        : "text-pearl-muted hover:text-pearl hover:bg-forest-700/50"
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {link.label}
                    {link.label === "Alerts" && unreadAlerts > 0 && (
                      <span className="w-4 h-4 bg-crimson text-white text-2xs font-bold rounded-full flex items-center justify-center">
                        {unreadAlerts}
                      </span>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative hidden sm:block">
              <motion.button
                whileHover={{ y: -1 }}
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-pearl-muted hover:text-pearl hover:bg-forest-700/50 transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{activeLang.code.toUpperCase()}</span>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform",
                    langOpen && "rotate-180"
                  )}
                />
              </motion.button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1 w-40 glass-card py-1 border border-forest-600/30"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setActiveLang(lang);
                          setLangOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-forest-700/50 transition-colors",
                          activeLang.code === lang.code
                            ? "text-jade-400"
                            : "text-pearl-muted hover:text-pearl"
                        )}
                      >
                        <span>{lang.label}</span>
                        <span className="text-xs opacity-60">{lang.native}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Alert bell */}
            <Link href="/farmer/alerts">
              <motion.div
                whileHover={{ y: -1 }}
                className="relative p-2 rounded-lg text-pearl-muted hover:text-pearl hover:bg-forest-700/50 transition-all"
              >
                <Bell className="w-4 h-4" />
                {unreadAlerts > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-crimson text-white text-2xs font-bold rounded-full flex items-center justify-center"
                  >
                    {unreadAlerts}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Scan CTA */}
            <Link href="/farmer/scan" className="hidden sm:block">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 bg-jade-500 hover:bg-jade-400 text-forest-900 font-semibold text-sm rounded-lg transition-all duration-200 shadow-glow-jade"
              >
                <Scan className="w-3.5 h-3.5" />
                Scan Crop
              </motion.button>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-pearl-muted hover:text-pearl hover:bg-forest-700/50 transition-all"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-forest-600/30 bg-forest-900/98 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link, i) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all",
                        isActive
                          ? "bg-jade-500/15 text-jade-400"
                          : "text-pearl-muted hover:text-pearl hover:bg-forest-700/50"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                      {link.label === "Alerts" && unreadAlerts > 0 && (
                        <span className="ml-auto w-5 h-5 bg-crimson text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {unreadAlerts}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
              <Link href="/farmer/scan" className="block mt-2">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-jade-500 text-forest-900 font-semibold text-sm rounded-lg">
                  <Scan className="w-4 h-4" />
                  Scan Crop Now
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
