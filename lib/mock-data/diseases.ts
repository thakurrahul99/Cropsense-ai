// Mock data: Diseases and Pests
export type ThreatType = "disease" | "pest";
export type SeverityLevel = "low" | "moderate" | "high" | "critical";
export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface Disease {
  id: string;
  name: string;
  nameHi: string;
  type: ThreatType;
  affectedCrops: string[];
  severity: SeverityLevel;
  symptoms: string[];
  cause: string;
  spread: string;
  referenceImage: string;
  annotatedImage: string;
  color: string;
}

export const DISEASES: Disease[] = [
  {
    id: "cotton-bollworm",
    name: "Pink Bollworm",
    nameHi: "गुलाबी बॉलवर्म",
    type: "pest",
    affectedCrops: ["cotton"],
    severity: "critical",
    symptoms: [
      "Circular entry holes on cotton bolls",
      "Pink-colored larvae inside bolls",
      "Premature boll shedding",
      "Reduced lint quality and quantity",
    ],
    cause: "Pectinophora gossypiella (Lepidoptera)",
    spread: "Adult moths lay eggs on young bolls; larvae bore inside",
    referenceImage:
      "https://images.unsplash.com/photo-1628352081506-83c43123a6b9?w=600&q=80",
    annotatedImage:
      "https://images.unsplash.com/photo-1628352081506-83c43123a6b9?w=600&q=80",
    color: "#EF4444",
  },
  {
    id: "blast-wheat",
    name: "Wheat Blast",
    nameHi: "गेहूं ब्लास्ट",
    type: "disease",
    affectedCrops: ["wheat"],
    severity: "critical",
    symptoms: [
      "Bleached spikes from flag leaf stage",
      "White to tan discoloration of heads",
      "Partially filled or shriveled grains",
      "Dark brown borders on lesions",
    ],
    cause: "Magnaporthe oryzae Triticum pathotype",
    spread: "Wind-dispersed conidia; thrives in warm, humid weather",
    referenceImage:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80",
    annotatedImage:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80",
    color: "#EF4444",
  },
  {
    id: "soybean-yellow-mosaic",
    name: "Yellow Mosaic Virus",
    nameHi: "पीला मोज़ेक वायरस",
    type: "disease",
    affectedCrops: ["soybean"],
    severity: "high",
    symptoms: [
      "Bright yellow mosaic patches on leaves",
      "Leaf distortion and stunting",
      "Reduced pod set",
      "Premature defoliation",
    ],
    cause: "Mungbean Yellow Mosaic Virus (MYMV) — transmitted by whitefly",
    spread: "Bemisia tabaci (whitefly) vector; spreads field-wide rapidly",
    referenceImage:
      "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=600&q=80",
    annotatedImage:
      "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=600&q=80",
    color: "#F59E0B",
  },
  {
    id: "grape-downy-mildew",
    name: "Downy Mildew",
    nameHi: "डाउनी फफूंदी",
    type: "disease",
    affectedCrops: ["grape"],
    severity: "high",
    symptoms: [
      "Oily, pale-green spots on upper leaf surface",
      "White cottony growth on undersides",
      "Berry shriveling and browning",
      "Shoot tip distortion",
    ],
    cause: "Plasmopara viticola (Oomycete)",
    spread: "Zoospores spread via rain splash and wind; peak in wet conditions",
    referenceImage:
      "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&q=80",
    annotatedImage:
      "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&q=80",
    color: "#F59E0B",
  },
  {
    id: "tomato-late-blight",
    name: "Late Blight",
    nameHi: "लेट ब्लाइट",
    type: "disease",
    affectedCrops: ["tomato"],
    severity: "moderate",
    symptoms: [
      "Dark brown, water-soaked lesions on leaves",
      "White mold on leaf undersides in humid weather",
      "Rapid collapse of affected tissue",
      "Dark, firm rot on fruit",
    ],
    cause: "Phytophthora infestans (Oomycete)",
    spread: "Air-borne sporangia; highly aggressive in cool, moist conditions",
    referenceImage:
      "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&q=80",
    annotatedImage:
      "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&q=80",
    color: "#F59E0B",
  },
  {
    id: "aphid-infestation",
    name: "Aphid Infestation",
    nameHi: "माहू का प्रकोप",
    type: "pest",
    affectedCrops: ["wheat", "cotton", "soybean", "tomato"],
    severity: "moderate",
    symptoms: [
      "Curling and yellowing of young leaves",
      "Sticky honeydew residue on plant surfaces",
      "Sooty mold growth on honeydew",
      "Colony of small, soft-bodied insects on stems",
    ],
    cause: "Aphis gossypii, Myzus persicae (various Aphididae species)",
    spread: "Winged forms disperse to new plants; ant activity aids spread",
    referenceImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    annotatedImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    color: "#10B981",
  },
  {
    id: "powdery-mildew",
    name: "Powdery Mildew",
    nameHi: "पाउडरी फफूंदी",
    type: "disease",
    affectedCrops: ["grape", "wheat", "onion"],
    severity: "low",
    symptoms: [
      "White powdery coating on leaf surfaces",
      "Distorted new growth",
      "Premature leaf drop",
      "Reduced photosynthesis",
    ],
    cause: "Erysiphe cichoracearum / Uncinula necator (Ascomycetes)",
    spread: "Wind-borne conidia; thrives in dry conditions with warm days",
    referenceImage:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&q=80",
    annotatedImage:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&q=80",
    color: "#10B981",
  },
];
