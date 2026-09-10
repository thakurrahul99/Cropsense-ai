"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  FlaskConical,
  Leaf,
  Wrench,
  Sprout,
  Phone,
  MapPin,
  ChevronDown,
  Shield,
  Clock,
  CircleDollarSign,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { ADVISORIES, getKVKForDistrict } from "@/lib/mock-data/advisory";
import { SCAN_RESULTS } from "@/lib/mock-data/scan-results";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/lib/context/AppContext";

const result = SCAN_RESULTS[0];


const CATEGORY_ICONS: Record<string, React.ElementType> = {
  chemical: FlaskConical,
  biological: Leaf,
  cultural: Sprout,
  mechanical: Wrench,
};

const CATEGORY_COLORS: Record<string, string> = {
  chemical: "#EF4444",
  biological: "#00E5A0",
  cultural: "#F59E0B",
  mechanical: "#3B82F6",
};

const PRIORITY_ORDER = ["immediate", "short-term", "preventive"];

export default function AdvisoryPage() {
  const { selectedStateInfo } = useAppContext();
  const district = SCAN_RESULTS[0]?.district ?? selectedStateInfo?.districts[0] ?? "Wardha";
  const advisory = {
    ...ADVISORIES["cotton-bollworm"],
    referralInfo: getKVKForDistrict(district),
  };

  const [followedSteps, setFollowedSteps] = useState<Set<string>>(new Set());
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const toggleFollowed = (stepId: string) => {
    setFollowedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      return next;
    });
  };

  const filteredSteps = advisory.ipmSteps.filter(
    (s) => activeFilter === "all" || s.priority === activeFilter
  );

  const completedCount = followedSteps.size;
  const totalCount = advisory.ipmSteps.length;
  const completionPct = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-forest-900">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <Link href="/farmer/result" className="inline-flex items-center gap-1.5 text-pearl-muted hover:text-pearl text-sm mb-6 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Result
          </Link>

          {/* Header */}
          <div className="mb-6">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-pearl mb-1">
              IPM Advisory
            </h1>
            <p className="text-pearl-muted text-sm">
              Integrated Pest Management plan for{" "}
              <span className="text-jade-400 font-medium">{advisory.diseaseName}</span>
              {" "}in {advisory.cropName}
            </p>
          </div>

          {/* Progress bar */}
          <div className="glass-card p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-pearl text-sm font-medium">Advisory Progress</span>
              <span className="text-jade-400 text-sm font-bold">
                {completedCount}/{totalCount} steps
              </span>
            </div>
            <div className="h-2 bg-forest-700 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${completionPct}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-jade-400 rounded-full"
              />
            </div>
            {completedCount === totalCount && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1.5 mt-2 text-jade-400 text-xs"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                All advisory steps marked as followed!
              </motion.div>
            )}
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
            {["all", "immediate", "short-term", "preventive"].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border",
                  activeFilter === f
                    ? "bg-jade-500/20 text-jade-400 border-jade-500/30"
                    : "bg-forest-700/30 text-pearl-muted border-forest-600/30 hover:text-pearl"
                )}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* IPM Steps */}
          <div className="space-y-3 mb-6">
            <LayoutGroup>
            <AnimatePresence>
              {filteredSteps.map((step, i) => {
                const CategoryIcon = CATEGORY_ICONS[step.category] ?? Shield;
                const catColor = CATEGORY_COLORS[step.category] ?? "#00E5A0";
                const isFollowed = followedSteps.has(step.id);
                const isExpanded = expandedStep === step.id;

                return (
                  <motion.div
                    layout
                    key={step.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: i * 0.08 }}
                    className={cn(
                      "glass-card overflow-hidden transition-all border",
                      isFollowed
                        ? "border-jade-500/30 bg-jade-500/5"
                        : step.priority === "immediate"
                        ? "border-red-500/20"
                        : step.priority === "short-term"
                        ? "border-amber-500/20"
                        : "border-forest-600/30"
                    )}
                  >
                    <div
                      className="p-4 cursor-pointer"
                      onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Category icon */}
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: `${catColor}15`,
                            border: `1px solid ${catColor}30`,
                          }}
                        >
                          <CategoryIcon className="w-4 h-4" style={{ color: catColor }} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span
                              className="text-2xs font-bold uppercase px-2 py-0.5 rounded-full"
                              style={{
                                color: step.priority === "immediate" ? "#EF4444" : step.priority === "short-term" ? "#F59E0B" : "#7A9E8A",
                                backgroundColor: step.priority === "immediate" ? "#EF444415" : step.priority === "short-term" ? "#F59E0B15" : "#7A9E8A15",
                              }}
                            >
                              {step.priority}
                            </span>
                            <span className="text-pearl-dim text-2xs capitalize">{step.category}</span>
                          </div>
                          <h3 className={cn("font-display font-semibold text-sm", isFollowed ? "text-jade-400 line-through opacity-70" : "text-pearl")}>
                            {step.title.en}
                          </h3>
                          <div className="flex items-center gap-3 mt-1 text-2xs text-pearl-dim">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {step.timing}
                            </span>
                            <span className="flex items-center gap-1">
                              <CircleDollarSign className="w-3 h-3" />
                              {step.cost} cost
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                            <ChevronDown className="w-4 h-4 text-pearl-muted" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 border-t border-forest-600/20 pt-3 space-y-3">
                            <p className="text-pearl-muted text-sm leading-relaxed">{step.description}</p>
                            {step.safetyNotes && (
                              <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                <AlertCircle className="w-4 h-4 text-amber-fire flex-shrink-0 mt-0.5" />
                                <p className="text-amber-warm text-xs leading-relaxed">{step.safetyNotes}</p>
                              </div>
                            )}
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleFollowed(step.id); }}
                              className={cn(
                                "w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2",
                                isFollowed
                                  ? "bg-jade-500/20 text-jade-400 border border-jade-500/30"
                                  : "bg-forest-700/50 text-pearl border border-forest-600/30 hover:border-jade-500/30 hover:text-jade-400"
                              )}
                            >
                              <CheckCircle className="w-4 h-4" />
                              {isFollowed ? "Marked as Followed ✓" : "Mark as Followed"}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            </LayoutGroup>
          </div>

          {/* Input Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 mb-6"
          >
            <h2 className="font-display font-semibold text-pearl mb-4 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-red-400" />
              Safe Input Recommendations
            </h2>
            <div className="space-y-4">
              {advisory.inputRecommendations.map((rec, i) => (
                <div key={i} className="p-4 bg-forest-700/30 rounded-xl border border-forest-600/30">
                  <div className="font-semibold text-pearl text-sm mb-2">{rec.product}</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-pearl-muted">Dose: </span>
                      <span className="text-pearl">{rec.dose}</span>
                    </div>
                    <div>
                      <span className="text-pearl-muted">Timing: </span>
                      <span className="text-pearl">{rec.timing}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-pearl-muted">Safety Interval: </span>
                      <span className="text-amber-warm font-medium">{rec.safetyInterval}</span>
                    </div>
                    {rec.alternateProduct && (
                      <div className="col-span-2">
                        <span className="text-pearl-muted">Alternate: </span>
                        <span className="text-jade-400">{rec.alternateProduct}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Referral */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 border border-jade-500/20"
          >
            <h2 className="font-display font-semibold text-pearl mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-jade-400" />
              Refer to Extension Officer / Lab
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-jade-400" />
                <span className="text-pearl">{advisory.referralInfo.nearestKVK}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-jade-400" />
                <a href={`tel:${advisory.referralInfo.contact}`} className="text-jade-400 hover:text-jade-300">
                  {advisory.referralInfo.contact}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-pearl-muted flex-shrink-0 mt-0.5" />
                <span className="text-pearl-muted">{advisory.referralInfo.labAddress}</span>
              </div>
            </div>
            <button className="w-full mt-4 py-3 bg-jade-500/10 hover:bg-jade-500/20 text-jade-400 font-semibold text-sm rounded-xl border border-jade-500/20 hover:border-jade-500/40 transition-all flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" />
              Contact Extension Officer
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
