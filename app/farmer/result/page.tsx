"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useSpring, useMotionValue, animate } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Cpu,
  Leaf,
  MapPin,
  Clock,
  ChevronRight,
  Info,
  Shield,
  Share2,
  Download,
  CheckCircle,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { SCAN_RESULTS } from "@/lib/mock-data/scan-results";
import { cn, getSeverityColor, formatRelativeTime } from "@/lib/utils";

const result = SCAN_RESULTS[0];

// Animated radial progress ring
function ConfidenceRing({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayValue / 100) * circumference;

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplayValue(Math.round(v * 10) / 10),
    });
    return controls.stop;
  }, [value]);

  return (
    <div className="relative flex items-center justify-center w-36 h-36">
      <svg width="140" height="140" className="-rotate-90">
        {/* Background track */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="rgba(0,229,160,0.1)"
          strokeWidth="10"
        />
        {/* Progress */}
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#00E5A0"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
          filter="drop-shadow(0 0 8px rgba(0,229,160,0.6))"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display font-bold text-2xl text-pearl">{displayValue.toFixed(1)}%</div>
        <div className="text-jade-400 text-xs font-medium">Confidence</div>
      </div>
    </div>
  );
}

// Animated severity bar
function SeverityBar({ label, score, description, delay: d }: { label: string; score: number; description: string; delay: number }) {
  const color = score >= 80 ? "#EF4444" : score >= 60 ? "#F59E0B" : "#00E5A0";
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: d, duration: 0.5 }}
      className="space-y-1.5"
    >
      <div className="flex items-center justify-between text-sm">
        <span className="text-pearl font-medium">{label}</span>
        <span className="font-mono font-bold" style={{ color }}>{score}</span>
      </div>
      <div className="h-2 bg-forest-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: d + 0.2, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}60` }}
        />
      </div>
      <p className="text-pearl-dim text-xs">{description}</p>
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ResultPage() {
  const [showWhyResult, setShowWhyResult] = useState(false);

  const severityColor = getSeverityColor(result.severity);
  const riskBg =
    result.riskLevel === "critical"
      ? "from-red-900/30 to-red-900/10 border-red-500/30"
      : result.riskLevel === "high"
      ? "from-amber-900/30 to-amber-900/10 border-amber-500/30"
      : "from-jade-900/30 to-jade-900/10 border-jade-500/30";

  return (
    <div className="min-h-screen bg-forest-900">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link href="/farmer/scan" className="inline-flex items-center gap-1.5 text-pearl-muted hover:text-pearl text-sm mb-3 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                New Scan
              </Link>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-pearl">
                Detection Result
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 glass-card rounded-lg text-pearl-muted hover:text-pearl transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 glass-card rounded-lg text-pearl-muted hover:text-pearl transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* ── Primary Detection Card ── */}
            <motion.div
              variants={itemVariants}
              className={cn(
                "glass-card p-6 bg-gradient-to-br border",
                riskBg
              )}
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Confidence ring */}
                <div className="flex flex-col items-center gap-3 flex-shrink-0">
                  <ConfidenceRing value={result.confidence} />
                  <div className="text-center">
                    <div className="text-xs text-pearl-muted mb-1">Detection</div>
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border"
                      style={{
                        color: severityColor,
                        borderColor: `${severityColor}40`,
                        backgroundColor: `${severityColor}12`,
                      }}
                    >
                      {result.severity.toUpperCase()} SEVERITY
                    </span>
                  </div>
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap mb-2">
                    <span className="text-pearl-muted text-sm">
                      {result.diseaseType === "pest" ? "🦟 Pest" : "🦠 Disease"}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-pearl mb-1">
                    {result.diseaseName}
                  </h2>
                  <p className="text-pearl-muted text-sm mb-4">
                    Detected in {result.cropName}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "Affected Area", value: `${result.affectedArea}%`, icon: Leaf, color: severityColor },
                      { label: "Risk Level", value: result.riskLevel.toUpperCase(), icon: AlertTriangle, color: severityColor },
                      { label: "Location", value: result.district, icon: MapPin, color: "#7A9E8A" },
                      { label: "Scanned", value: formatRelativeTime(result.timestamp), icon: Clock, color: "#7A9E8A" },
                    ].map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div key={stat.label} className="bg-forest-900/40 rounded-xl p-3">
                          <Icon className="w-3.5 h-3.5 mb-1.5" style={{ color: stat.color }} />
                          <div className="font-semibold text-sm text-pearl leading-tight">{stat.value}</div>
                          <div className="text-pearl-dim text-2xs mt-0.5">{stat.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Image Comparison ── */}
            <motion.div variants={itemVariants} className="glass-card p-6">
              <h3 className="font-display font-semibold text-pearl mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-jade-400" />
                Image Analysis
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-pearl-muted text-xs font-medium mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-jade-400 rounded-full" />
                    Uploaded Photo
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={result.uploadedImage}
                      alt="Uploaded crop photo"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 280px"
                    />
                    {/* Annotation overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute top-[35%] left-[40%] w-16 h-16 border-2 border-crimson rounded-lg"
                        style={{ boxShadow: "0 0 20px rgba(239,68,68,0.4)" }}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute top-[30%] left-[38%] bg-crimson/90 text-white text-2xs px-1.5 py-0.5 rounded font-bold"
                      >
                        DETECTED
                      </motion.div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-pearl-muted text-xs font-medium mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-amber-fire rounded-full" />
                    Reference Image
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={result.referenceImage}
                      alt="Reference disease image"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 280px"
                    />
                    <div className="absolute inset-0 bg-amber-900/20" />
                    <div className="absolute bottom-2 left-2">
                      <span className="bg-amber-900/80 text-amber-warm text-2xs px-2 py-0.5 rounded font-medium">
                        Reference: {result.diseaseName}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Risk Factors ── */}
            <motion.div variants={itemVariants} className="glass-card p-6">
              <h3 className="font-display font-semibold text-pearl mb-5 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-fire" />
                Risk Factor Analysis
              </h3>
              <div className="space-y-5">
                {result.riskFactors.map((factor, i) => (
                  <SeverityBar
                    key={factor.label}
                    label={factor.label}
                    score={factor.score}
                    description={factor.description}
                    delay={0.3 + i * 0.15}
                  />
                ))}
              </div>
            </motion.div>

            {/* ── Why This Result ── */}
            <motion.div variants={itemVariants} className="glass-card p-6">
              <button
                onClick={() => setShowWhyResult(!showWhyResult)}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="font-display font-semibold text-pearl flex items-center gap-2">
                  <Info className="w-4 h-4 text-jade-400" />
                  Why This Result?
                </h3>
                <motion.div
                  animate={{ rotate: showWhyResult ? 90 : 0 }}
                  className="text-pearl-muted"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: showWhyResult ? "auto" : 0, opacity: showWhyResult ? 1 : 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-forest-600/30">
                  <p className="text-pearl-muted text-sm leading-relaxed">
                    {result.whyResult}
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-jade-400" />
                    <span className="text-pearl-dim text-xs">
                      Generated by CropSense AI v2.4 — ResNet-152 + Vision Transformer ensemble
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Action Buttons ── */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/farmer/advisory" className="col-span-1 sm:col-span-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-jade-500 hover:bg-jade-400 text-forest-900 font-bold rounded-xl shadow-glow-jade transition-all"
                >
                  <Shield className="w-5 h-5" />
                  View IPM Advisory
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link href="/farmer/risk">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-4 glass-card text-amber-fire font-semibold rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all"
                >
                  <Zap className="w-4 h-4" />
                  Risk Details
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
