"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Scan,
  ArrowRight,
  Zap,
  Map,
  BarChart3,
  Bell,
  Shield,
  Leaf,
  ChevronDown,
  Cpu,
  TrendingUp,
  Users,
  Globe,
  CheckCircle,
  AlertTriangle,
  Star,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { useCounter } from "@/lib/hooks/useCounter";

// Dynamic import for Three.js (SSR-safe)
const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => null },
);


const IMPACT_STATS = [
  { value: 50000, suffix: "+", label: "Farmers Protected", icon: Users },
  { value: 96, suffix: "%", label: "Detection Accuracy", icon: Cpu },
  { value: 36, suffix: "", label: "States & UTs Covered", icon: Globe },
  { value: 3.2, suffix: "×", label: "Faster Response", icon: TrendingUp },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: Scan,
    title: "Capture & Upload",
    desc: "Photograph affected crop leaves or stems. Our AI-optimized uploader accepts any smartphone photo.",
    color: "#00E5A0",
  },
  {
    step: "02",
    icon: Cpu,
    title: "AI Detection",
    desc: "Our deep learning model analyzes visual patterns, cross-referencing 200+ disease signatures.",
    color: "#3B82F6",
  },
  {
    step: "03",
    icon: BarChart3,
    title: "Risk Intelligence",
    desc: "Real-time risk scoring using weather data, crop stage, regional outbreak patterns.",
    color: "#F59E0B",
  },
  {
    step: "04",
    icon: Bell,
    title: "Actionable Advisory",
    desc: "Prioritized IPM action plan delivered in your language with approved chemical inputs and timings.",
    color: "#00E5A0",
  },
];

const FEATURES = [
  {
    icon: Scan,
    title: "AI Detection Engine",
    desc: "Multi-spectral deep learning model trained on 500,000+ crop disease images across Indian agro-climatic zones.",
    badge: "94.7% Accuracy",
    image: "/Images/aiDetaction.jpg",
    color: "#00E5A0",
  },
  {
    icon: Map,
    title: "Risk Intelligence Map",
    desc: "Live GIS dashboard showing disease outbreak clusters, spread vectors, and high-risk zone forecasting.",
    badge: "Real-time GIS",
    image: "/Images/map.jpg",
    color: "#3B82F6",
  },
  {
    icon: Bell,
    title: "Farmer Advisory",
    desc: "Personalized, language-aware IPM advisory with safe input recommendations and extension officer referrals.",
    badge: "3 Languages",
    image: "/Images/farmer advisary.jpg",
    color: "#F59E0B",
  },
  {
    icon: Shield,
    title: "Officer Command Center",
    desc: "District-level intelligence dashboard for agriculture officers — verify reports, spot outbreaks, deploy advisories.",
    badge: "Gov. Grade",
    image: "/Images/command centre.jpg",
    color: "#8B5CF6",
  },
];

// Section wrapper with scroll reveal
function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof IMPACT_STATS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const Icon = stat.icon;
  const count = useCounter(
    typeof stat.value === "number" && stat.value >= 1
      ? Math.floor(stat.value)
      : 0,
    2000,
    inView,
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="glass-card p-6 flex flex-col items-center text-center group hover:border-jade-500/30 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-jade-500/10 border border-jade-500/20 flex items-center justify-center mb-4 group-hover:bg-jade-500/20 transition-colors">
        <Icon className="w-6 h-6 text-jade-400" />
      </div>
      <div className="font-display font-bold text-4xl text-pearl mb-1">
        {stat.value < 10 ? stat.value.toFixed(1) : count}
        {stat.suffix}
      </div>
      <div className="text-pearl-muted text-sm font-medium">{stat.label}</div>
    </motion.div>
  );
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroY = useSpring(useTransform(scrollYProgress, [0, 0.75], [0, -140]), {
    stiffness: 120,
    damping: 28,
    mass: 0.7,
  });
  const heroOpacity = useSpring(
    useTransform(scrollYProgress, [0, 0.65], [1, 0]),
    { stiffness: 120, damping: 30, mass: 0.7 },
  );

  return (
    <div className="min-h-screen bg-forest-900 overflow-x-hidden">
      <Navbar />

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-28 sm:px-6 sm:pt-24 sm:pb-32"
      >
        {/* Three.js background — receives scroll progress for fade-out */}
        <HeroScene scrollYProgress={scrollYProgress} />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/20 via-transparent to-forest-900/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-radial from-jade-900/10 via-transparent to-transparent pointer-events-none" />

        {/* Hero content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="badge-jade text-xs">
              <Leaf className="w-3 h-3" />
              SIH 2026 — Maharashtra Agriculture
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-pearl leading-[1.05] tracking-tight mb-6"
          >
            Detect Earlier.
            <br />
            <span className="text-gradient-jade">Act Smarter.</span>
            <br />
            Protect Every Crop.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-pearl-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            AI-powered crop health intelligence for early disease detection,
            localized risk forecasting, and actionable agricultural advisories —
            built for every farmer in Maharashtra.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/farmer/scan">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(0,229,160,0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-8 py-4 bg-jade-500 hover:bg-jade-400 text-forest-900 font-bold text-base rounded-xl transition-all shadow-glow-jade"
              >
                <Scan className="w-5 h-5" />
                Scan a Crop
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <a href="#features">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-8 py-4 bg-forest-700/50 hover:bg-forest-700 text-pearl font-semibold text-base rounded-xl border border-forest-600/50 hover:border-jade-500/30 transition-all"
              >
                Explore Intelligence
                <ChevronDown className="w-4 h-4" />
              </motion.button>
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 text-pearl-dim text-xs font-medium"
          >
            {[
              "94.7% Accuracy",
              "50K+ Farmers",
              "34 Districts",
              "ICAR Validated",
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-jade-500" />
                {item}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-jade-500/40 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-2.5 bg-jade-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── PROBLEM ─── */}
      <Section className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="badge-amber mb-4 inline-flex">
            <AlertTriangle className="w-3 h-3" />
            The Problem
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-pearl mb-4">
            Crop Losses That Could Be Prevented
          </h2>
          <p className="text-pearl-muted max-w-2xl mx-auto">
            Late detection of diseases and pests costs Indian farmers ₹90,000
            crore annually. Maharashtra alone loses 15–30% of yield every season
            to preventable outbreaks.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: "⚠️",
              title: "Late Detection",
              desc: "Farmers notice disease symptoms only when 40-60% crop area is already affected — too late for economic recovery.",
              stat: "40-60%",
              statLabel: "average affected area at detection",
            },
            {
              icon: "🌧️",
              title: "No Weather Context",
              desc: "Disease risk decisions made without real-time weather data or regional outbreak intelligence.",
              stat: "3×",
              statLabel: "faster spread in unmonitored areas",
            },
            {
              icon: "📋",
              title: "Advisory Gaps",
              desc: "Generic advisories don't account for crop variety, local disease pressure, or safe-use chemical protocols.",
              stat: "₹90K Cr",
              statLabel: "annual crop loss in India",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-6"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-display font-semibold text-pearl text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-pearl-muted text-sm mb-4">{item.desc}</p>
              <div className="border-t border-forest-600/30 pt-4">
                <div className="font-display font-bold text-2xl text-amber-fire">
                  {item.stat}
                </div>
                <div className="text-pearl-dim text-xs">{item.statLabel}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ─── HOW IT WORKS ─── */}
      <Section className="section-padding bg-forest-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="badge-jade mb-4 inline-flex">
              <Zap className="w-3 h-3" />
              How It Works
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-pearl mb-4">
              From Capture to Action in Minutes
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -4 }}
                  className="glass-card p-6 relative group"
                >
                  <div
                    className="absolute top-4 right-4 font-mono text-4xl font-bold opacity-[0.06]"
                    style={{ color: step.color }}
                  >
                    {step.step}
                  </div>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 border"
                    style={{
                      backgroundColor: `${step.color}15`,
                      borderColor: `${step.color}30`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                  <h3 className="font-display font-semibold text-pearl text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-pearl-muted text-sm leading-relaxed">
                    {step.desc}
                  </p>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-5 h-5 text-jade-600" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ─── FEATURES SHOWCASE ─── */}
      <Section id="features" className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="badge-jade mb-4 inline-flex">
            <Star className="w-3 h-3" />
            Platform Features
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-pearl mb-4">
            Intelligence at Every Layer
          </h2>
          <p className="text-pearl-muted max-w-xl mx-auto">
            Every feature built specifically for Indian agricultural conditions,
            crop varieties, and farmer realities.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3 }}
                className="glass-card overflow-hidden group cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={feat.image}
                    alt={feat.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, ${feat.color}20 0%, ${feat.color}05 50%, rgba(10,31,20,0.9) 100%)`,
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
                      style={{
                        backgroundColor: `${feat.color}20`,
                        borderColor: `${feat.color}40`,
                        color: feat.color,
                      }}
                    >
                      {feat.badge}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: `${feat.color}15`,
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: feat.color }} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-pearl text-lg mb-1">
                        {feat.title}
                      </h3>
                      <p className="text-pearl-muted text-sm leading-relaxed">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ─── IMPACT STATS ─── */}
      <Section className="section-padding bg-forest-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-pearl mb-4">
              Measured Impact Across Maharashtra
            </h2>
            <p className="text-pearl-muted max-w-xl mx-auto">
              CropSense AI has been validated across 34 districts with
              measurable outcomes.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {IMPACT_STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ─── FINAL CTA ─── */}
      <Section className="section-padding max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-12 jade-glow-border relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-radial from-jade-900/20 via-transparent to-transparent" />
          <div className="relative z-10">
            <Leaf className="w-12 h-12 text-jade-400 mx-auto mb-4" />
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-pearl mb-4">
              Start Protecting Your Crop Today
            </h2>
            <p className="text-pearl-muted mb-8 max-w-lg mx-auto">
              Join 50,000+ farmers using CropSense AI to detect diseases
              earlier, act smarter, and protect every harvest.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/farmer/scan">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-4 bg-jade-500 hover:bg-jade-400 text-forest-900 font-bold rounded-xl shadow-glow-jade transition-all"
                >
                  <Scan className="w-5 h-5" />
                  Scan Your First Crop
                </motion.button>
              </Link>
              <Link href="/farmer">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-forest-700/50 text-pearl font-semibold rounded-xl border border-forest-600/50 hover:border-jade-500/30 transition-all"
                >
                  View Dashboard
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Section>

      <Footer />
    </div>
  );
}
