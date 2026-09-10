// Mock data: Diseases and Pests
import type { LocalizedText } from "@/lib/i18n";

export type ThreatType = "disease" | "pest";
export type SeverityLevel = "low" | "moderate" | "high" | "critical";
export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface Disease {
  id: string;
  name: LocalizedText;
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
    name: {
      en: "Pink Bollworm",
      hi: "गुलाबी बॉलवर्म",
      mr: "गुलाबी बोंड अळी",
      pa: "ਗੁਲਾਬੀ ਬੋਲਵਰਮ",
    },
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
    name: {
      en: "Wheat Blast",
      hi: "गेहूं ब्लास्ट",
      mr: "गहू ब्लास्ट",
      pa: "ਕਣਕ ਬਲਾਸਟ",
    },
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
    name: {
      en: "Yellow Mosaic Virus",
      hi: "पीला मोज़ेक वायरस",
      mr: "पिवळा मोझॅक विषाणू",
      pa: "ਪੀਲਾ ਮੋਜ਼ੇਕ ਵਾਇਰਸ",
    },
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
    name: {
      en: "Downy Mildew",
      hi: "डाउनी फफूंदी",
      mr: "केवडा रोग",
      pa: "ਡਾਊਨੀ ਮਿਲਡਿਊ",
    },
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
    name: {
      en: "Late Blight",
      hi: "लेट ब्लाइट",
      mr: "उशिरा करपा",
      pa: "ਲੇਟ ਬਲਾਈਟ",
    },
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
    name: {
      en: "Aphid Infestation",
      hi: "माहू का प्रकोप",
      mr: "माव्याचा प्रादुर्भाव",
      pa: "ਚੇਪੇ ਦਾ ਹਮਲਾ",
    },
    type: "pest",
    affectedCrops: ["wheat", "cotton", "soybean", "tomato", "rice"],
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
    name: {
      en: "Powdery Mildew",
      hi: "पाउडरी फफूंदी",
      mr: "भुरी बुरशी",
      pa: "ਪਾਊਡਰੀ ਮਿਲਡਿਊ",
    },
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
  // ── RICE DISEASES / PESTS ──
  {
    id: "rice-blast",
    name: {
      en: "Rice Blast",
      hi: "धान का झोंका रोग",
      mr: "भात करपा",
      pa: "ਝੋਨੇ ਦਾ ਬਲਾਸਟ",
    },
    type: "disease",
    affectedCrops: ["rice"],
    severity: "critical",
    symptoms: [
      "Diamond-shaped lesions with gray centers on leaves",
      "Dark brown to reddish-brown leaf spots",
      "Node blast — dark shrivelled neck node (neck rot)",
      "Completely blasted panicle with whitish empty grains",
    ],
    cause: "Magnaporthe oryzae (Ascomycete fungus)",
    spread:
      "Wind-dispersed conidia; favored by high humidity, night dew, and nitrogen-rich soils",
    referenceImage:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&q=80",
    annotatedImage:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&q=80",
    color: "#EF4444",
  },
  {
    id: "brown-planthopper",
    name: {
      en: "Brown Planthopper",
      hi: "भूरा फुदका",
      mr: "तपकिरी तुडतुडा",
      pa: "ਭੂਰਾ ਫੁਦਕਾ",
    },
    type: "pest",
    affectedCrops: ["rice"],
    severity: "high",
    symptoms: [
      "Circular yellowing patches in field (hopperburn)",
      "Plants wilt and collapse from center outward",
      "Brown insects visible at stem base near water level",
      "Honeydew deposits causing sooty mold on stems",
    ],
    cause: "Nilaparvata lugens (Hemiptera: Delphacidae)",
    spread:
      "Migrates via wind currents; explosive population buildup favored by dense planting and high nitrogen",
    referenceImage:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&q=80",
    annotatedImage:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&q=80",
    color: "#F59E0B",
  },
];

/** Convenience: look up by id */
export function getDiseaseById(id: string): Disease | undefined {
  return DISEASES.find((d) => d.id === id);
}
