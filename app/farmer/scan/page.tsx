"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Camera,
  ImageIcon,
  X,
  CheckCircle,
  Loader2,
  Scan,
  CloudUpload,
  Cpu,
  BarChart3,
  CloudRain,
  Map,
  ShieldCheck,
  Leaf,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { cn, delay } from "@/lib/utils";

// Stages of the analysis pipeline
const ANALYSIS_STAGES = [
  { id: "upload", label: "Uploading Image", icon: CloudUpload, duration: 800 },
  { id: "analyzing", label: "Analyzing Crop", icon: Scan, duration: 1200 },
  { id: "detecting", label: "Detecting Threats", icon: Cpu, duration: 1400 },
  { id: "assessing", label: "Assessing Severity", icon: BarChart3, duration: 1000 },
  { id: "weather", label: "Checking Weather Data", icon: CloudRain, duration: 900 },
  { id: "risk", label: "Calculating Risk Score", icon: Map, duration: 1100 },
  { id: "result", label: "Generating Report", icon: ShieldCheck, duration: 700 },
];

type UploadState = "idle" | "selected" | "analyzing" | "complete";

function DropZone({
  onSelect,
  isDragging,
  setIsDragging,
}: {
  onSelect: (file: File | null) => void;
  isDragging: boolean;
  setIsDragging: (v: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) onSelect(file);
    },
    [onSelect, setIsDragging]
  );

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300",
        isDragging
          ? "border-jade-400 bg-jade-500/10 scale-[1.02]"
          : "border-forest-600/50 hover:border-jade-500/50 hover:bg-forest-700/20"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onSelect(e.target.files?.[0] ?? null)}
      />
      <motion.div
        animate={{ y: isDragging ? -8 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-16 h-16 rounded-2xl bg-jade-500/10 border border-jade-500/20 flex items-center justify-center">
          <Upload className="w-8 h-8 text-jade-400" />
        </div>
        <div>
          <p className="text-pearl font-semibold text-lg mb-1">
            {isDragging ? "Drop image here" : "Drop crop image here"}
          </p>
          <p className="text-pearl-muted text-sm">
            or click to browse • JPEG, PNG, HEIC supported
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-pearl-dim">
          <span>Max 20MB</span>
          <span>•</span>
          <span>Minimum 720p recommended</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AnalysisOverlay({
  imageUrl,
  onComplete,
}: {
  imageUrl: string;
  onComplete: () => void;
}) {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  useEffect(() => {
    let stageIndex = 0;
    const runStages = async () => {
      for (const stage of ANALYSIS_STAGES) {
        setCurrentStage(stageIndex);
        await delay(stage.duration);
        setCompletedStages((prev) => [...prev, stageIndex]);
        stageIndex++;
      }
      await delay(300);
      onComplete();
    };
    runStages();
  }, [onComplete]);

  const CurrentIcon = ANALYSIS_STAGES[currentStage]?.icon ?? Scan;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Image with scan overlay */}
      <div className="relative rounded-2xl overflow-hidden aspect-video bg-forest-800">
        <Image
          src={imageUrl}
          alt="Crop being analyzed"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
        />
        {/* Dark overlay with scan effect */}
        <div className="absolute inset-0 bg-forest-900/60" />

        {/* Scan line animation */}
        <motion.div
          initial={{ top: "-4px" }}
          animate={{ top: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-1 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,229,160,0.8) 50%, transparent 100%)",
            boxShadow: "0 0 20px rgba(0,229,160,0.6), 0 0 40px rgba(0,229,160,0.3)",
          }}
        />

        {/* Corner brackets */}
        {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
          <div
            key={pos}
            className={cn(
              "absolute w-8 h-8 border-jade-400",
              pos.includes("top") ? "top-3" : "bottom-3",
              pos.includes("left") ? "left-3 border-l-2 border-t-2" : "right-3 border-r-2 border-t-2",
              pos.includes("bottom") && pos.includes("left") ? "border-l-2 border-b-2 border-t-0" : "",
              pos.includes("bottom") && pos.includes("right") ? "border-r-2 border-b-2 border-t-0" : ""
            )}
          />
        ))}

        {/* Animated grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,229,160,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Center pulsing indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-16 h-16 border-2 border-jade-400 rounded-full flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <CurrentIcon className="w-8 h-8 text-jade-400" />
            </motion.div>
          </motion.div>
        </div>

        {/* Stage label on image */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <motion.div
            key={currentStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-forest-900/80 backdrop-blur-sm border border-jade-500/30 rounded-full px-4 py-1.5 flex items-center gap-2"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-2 h-2 bg-jade-400 rounded-full"
            />
            <span className="text-jade-300 text-xs font-medium">
              {ANALYSIS_STAGES[currentStage]?.label}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Stage progress list */}
      <div className="glass-card p-5">
        <div className="space-y-3">
          {ANALYSIS_STAGES.map((stage, i) => {
            const Icon = stage.icon;
            const isCompleted = completedStages.includes(i);
            const isCurrent = currentStage === i;
            const isPending = i > currentStage;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <div
                  className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-500",
                    isCompleted
                      ? "bg-jade-500 text-forest-900"
                      : isCurrent
                      ? "bg-jade-500/20 border border-jade-500/50 text-jade-400"
                      : "bg-forest-700/50 text-pearl-dim"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : isCurrent ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}>
                      <Loader2 className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isCompleted ? "text-jade-400" : isCurrent ? "text-pearl" : "text-pearl-dim"
                  )}
                >
                  {stage.label}
                </span>
                {isCompleted && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-auto text-jade-400 text-xs"
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
        {/* Overall progress bar */}
        <div className="mt-4">
          <div className="h-1.5 bg-forest-700 rounded-full overflow-hidden">
            <motion.div
              animate={{
                width: `${((completedStages.length) / ANALYSIS_STAGES.length) * 100}%`,
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-jade-400 rounded-full"
            />
          </div>
          <div className="flex justify-between text-xs mt-1 text-pearl-dim">
            <span>Analyzing...</span>
            <span>{Math.round((completedStages.length / ANALYSIS_STAGES.length) * 100)}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ScanPage() {
  const [state, setState] = useState<UploadState>("idle");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const router = useRouter();

  // Demo image for the mock flow
  const DEMO_IMAGE =
    "https://images.unsplash.com/photo-1628352081506-83c43123a6b9?w=800&q=80";

  const handleSelect = useCallback((file: File | null) => {
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setState("selected");
    }
  }, []);

  const handleUseDemoImage = () => {
    setPreviewUrl(DEMO_IMAGE);
    setState("selected");
  };

  const handleAnalyze = () => {
    setState("analyzing");
  };

  const handleAnalysisComplete = () => {
    setState("complete");
    setTimeout(() => router.push("/farmer/result"), 600);
  };

  return (
    <div className="min-h-screen bg-forest-900">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/farmer" className="inline-flex items-center gap-1.5 text-pearl-muted hover:text-pearl text-sm mb-4 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Dashboard
            </Link>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-pearl mb-2">
              Scan Crop
            </h1>
            <p className="text-pearl-muted text-sm">
              Upload a photo of the affected area. Our AI will analyze it for diseases and pests.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* IDLE */}
            {state === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <DropZone
                  onSelect={handleSelect}
                  isDragging={isDragging}
                  setIsDragging={setIsDragging}
                />
                {/* Camera option */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      const input = document.querySelector<HTMLInputElement>('input[type="file"]');
                      if (input) {
                        input.setAttribute("capture", "environment");
                        input.click();
                      }
                    }}
                    className="flex items-center justify-center gap-2 py-3 glass-card text-pearl-muted hover:text-pearl text-sm font-medium rounded-xl border border-forest-600/30 hover:border-jade-500/30 transition-all"
                  >
                    <Camera className="w-4 h-4" />
                    Use Camera
                  </button>
                  <button
                    onClick={handleUseDemoImage}
                    className="flex items-center justify-center gap-2 py-3 glass-card text-jade-400 hover:text-jade-300 text-sm font-medium rounded-xl border border-jade-500/20 hover:border-jade-500/40 transition-all"
                  >
                    <Leaf className="w-4 h-4" />
                    Use Demo Image
                  </button>
                </div>
                {/* Tips */}
                <div className="glass-card p-4">
                  <h3 className="text-pearl text-sm font-semibold mb-2 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-jade-400" />
                    Photo Tips for Best Results
                  </h3>
                  <ul className="space-y-1.5 text-pearl-muted text-xs">
                    {[
                      "Photograph in natural daylight (avoid harsh shadows)",
                      "Include 3–5 affected leaves in the frame",
                      "Keep the camera steady — avoid motion blur",
                      "Capture both upper and lower leaf surfaces",
                    ].map((tip) => (
                      <li key={tip} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3 h-3 text-jade-500 flex-shrink-0 mt-0.5" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* SELECTED */}
            {state === "selected" && (
              <motion.div
                key="selected"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-forest-800">
                  <Image
                    src={previewUrl}
                    alt="Selected crop image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 600px"
                  />
                  <button
                    onClick={() => setState("idle")}
                    className="absolute top-3 right-3 w-8 h-8 bg-forest-900/80 rounded-full flex items-center justify-center hover:bg-forest-900 transition-colors"
                  >
                    <X className="w-4 h-4 text-pearl" />
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <span className="badge-jade text-xs">
                      <CheckCircle className="w-3 h-3" />
                      Image Ready
                    </span>
                  </div>
                </div>

                {/* Crop selection (mock) */}
                <div className="glass-card p-4">
                  <h3 className="text-pearl text-sm font-semibold mb-3">Crop Type</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {["Cotton 🌿", "Soybean 🫘", "Wheat 🌾", "Other"].map((crop, i) => (
                      <button
                        key={crop}
                        className={cn(
                          "py-2 px-2 rounded-lg text-xs font-medium transition-all border",
                          i === 0
                            ? "bg-jade-500/15 text-jade-400 border-jade-500/30"
                            : "bg-forest-700/30 text-pearl-muted border-forest-600/30 hover:border-jade-500/20"
                        )}
                      >
                        {crop}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAnalyze}
                  className="w-full py-4 bg-jade-500 hover:bg-jade-400 text-forest-900 font-bold text-base rounded-xl shadow-glow-jade transition-all flex items-center justify-center gap-2"
                >
                  <Scan className="w-5 h-5" />
                  Analyze Crop Image
                </motion.button>
              </motion.div>
            )}

            {/* ANALYZING */}
            {state === "analyzing" && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
              >
                <AnalysisOverlay
                  imageUrl={previewUrl}
                  onComplete={handleAnalysisComplete}
                />
              </motion.div>
            )}

            {/* COMPLETE */}
            {state === "complete" && (
              <motion.div
                key="complete"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-jade-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-10 h-10 text-forest-900" />
                </motion.div>
                <h2 className="font-display font-bold text-2xl text-pearl mb-2">
                  Analysis Complete!
                </h2>
                <p className="text-pearl-muted text-sm">Redirecting to results...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
