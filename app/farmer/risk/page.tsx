"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CloudRain, Leaf, MapPin, ArrowLeft, TrendingUp, Thermometer, Droplets } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { SCAN_RESULTS } from "@/lib/mock-data/scan-results";
import { WEATHER } from "@/lib/mock-data/weather";
import { getSeverityColor } from "@/lib/utils";

const result = SCAN_RESULTS[0];

function RiskRing({ label, value, color, icon: Icon, delay: d }: {
  label: string; value: number; color: string; icon: React.ElementType; delay: number;
}) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg width="96" height="96" className="-rotate-90">
          <circle cx="48" cy="48" r={radius} fill="none" stroke={`${color}18`} strokeWidth="8" />
          <motion.circle
            cx="48" cy="48" r={radius}
            fill="none" stroke={color} strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, delay: d, ease: "easeOut" }}
            filter={`drop-shadow(0 0 6px ${color}70)`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="w-4 h-4 mb-0.5" style={{ color }} />
          <span className="font-display font-bold text-sm text-pearl">{value}</span>
        </div>
      </div>
      <span className="text-pearl-muted text-xs text-center">{label}</span>
    </div>
  );
}

export default function RiskPage() {
  const overallRisk = result.riskLevel;
  const riskScore = Math.round(result.riskFactors.reduce((a, b) => a + b.score, 0) / result.riskFactors.length);
  const riskColor = overallRisk === "critical" ? "#EF4444" : overallRisk === "high" ? "#F59E0B" : "#00E5A0";

  return (
    <div className="min-h-screen bg-forest-900">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <Link href="/farmer/result" className="inline-flex items-center gap-1.5 text-pearl-muted hover:text-pearl text-sm mb-6 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Result
          </Link>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-pearl mb-1">
            Risk Intelligence
          </h1>
          <p className="text-pearl-muted text-sm mb-8">
            Comprehensive risk analysis for {result.diseaseName} in {result.cropName}
          </p>

          <div className="space-y-6">
            {/* Overall risk score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
              style={{ borderColor: `${riskColor}30` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-pearl text-lg">Overall Risk Score</h2>
                <span
                  className="text-2xl font-display font-black"
                  style={{ color: riskColor }}
                >
                  {riskScore}/100
                </span>
              </div>
              <div className="h-3 bg-forest-700 rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${riskScore}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: riskColor,
                    boxShadow: `0 0 12px ${riskColor}60`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-pearl-muted">Low Risk</span>
                <span className="font-bold uppercase" style={{ color: riskColor }}>
                  {overallRisk} RISK
                </span>
                <span className="text-pearl-muted">Critical</span>
              </div>
            </motion.div>

            {/* Individual risk rings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <h2 className="font-display font-semibold text-pearl text-lg mb-6">Risk Factor Breakdown</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {result.riskFactors.map((factor, i) => (
                  <RiskRing
                    key={factor.label}
                    label={factor.label}
                    value={factor.score}
                    color={factor.score >= 80 ? "#EF4444" : factor.score >= 60 ? "#F59E0B" : "#00E5A0"}
                    icon={[AlertTriangle, CloudRain, Leaf, MapPin][i] ?? AlertTriangle}
                    delay={0.3 + i * 0.15}
                  />
                ))}
              </div>
              <div className="mt-6 space-y-3">
                {result.riskFactors.map((factor, i) => (
                  <motion.div
                    key={factor.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-forest-700/30 rounded-xl"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{
                        backgroundColor: factor.score >= 80 ? "#EF4444" : factor.score >= 60 ? "#F59E0B" : "#00E5A0",
                      }}
                    />
                    <div>
                      <span className="text-pearl text-sm font-medium">{factor.label}: </span>
                      <span className="text-pearl-muted text-sm">{factor.description}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Weather context */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h2 className="font-display font-semibold text-pearl text-lg mb-4 flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-blue-400" />
                Weather Risk Context
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Thermometer, label: "Temperature", value: `${result.weatherContext.temp}°C`, note: "Favorable for pest", color: "#F59E0B" },
                  { icon: Droplets, label: "Humidity", value: `${result.weatherContext.humidity}%`, note: "High — risk elevated", color: "#3B82F6" },
                  { icon: CloudRain, label: "Rainfall", value: `${result.weatherContext.rainfall}mm`, note: "Moderate moisture", color: "#06B6D4" },
                  { icon: TrendingUp, label: "Condition", value: result.weatherContext.condition, note: "Outbreak-favorable", color: "#8B5CF6" },
                ].map((w) => {
                  const Icon = w.icon;
                  return (
                    <div key={w.label} className="bg-forest-700/40 rounded-xl p-4 text-center">
                      <Icon className="w-5 h-5 mx-auto mb-2" style={{ color: w.color }} />
                      <div className="font-bold text-pearl text-lg">{w.value}</div>
                      <div className="text-pearl-muted text-xs">{w.label}</div>
                      <div className="text-xs mt-1" style={{ color: w.color }}>{w.note}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Recommended action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 border border-jade-500/20"
            >
              <h2 className="font-display font-semibold text-pearl text-lg mb-4">Recommended Action</h2>
              <p className="text-pearl-muted text-sm leading-relaxed mb-4">
                Given the {overallRisk} risk level, immediate intervention is recommended. Apply the IPM
                advisory within 48 hours to prevent further spread. Contact your nearest Agriculture
                Officer if field coverage exceeds 70%.
              </p>
              <Link href="/farmer/advisory">
                <button className="w-full py-3 bg-jade-500 hover:bg-jade-400 text-forest-900 font-bold rounded-xl transition-all">
                  View Full Advisory →
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
