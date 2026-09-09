// Mock data: Scan Results
import type { SeverityLevel, RiskLevel } from "./diseases";

export interface ScanResult {
  id: string;
  timestamp: string;
  cropId: string;
  cropName: string;
  diseaseId: string;
  diseaseName: string;
  diseaseType: "disease" | "pest";
  confidence: number; // 0-100
  severity: SeverityLevel;
  riskLevel: RiskLevel;
  affectedArea: number; // percentage
  uploadedImage: string;
  referenceImage: string;
  location: string;
  district: string;
  farmerId: string;
  verified: boolean;
  weatherContext: {
    temp: number;
    humidity: number;
    rainfall: number;
    condition: string;
  };
  riskFactors: {
    label: string;
    score: number; // 0-100
    description: string;
  }[];
  whyResult: string;
}

export const SCAN_RESULTS: ScanResult[] = [
  {
    id: "scan-001",
    timestamp: "2026-09-09T10:23:00Z",
    cropId: "cotton",
    cropName: "Cotton (Bt Cotton)",
    diseaseId: "cotton-bollworm",
    diseaseName: "Pink Bollworm",
    diseaseType: "pest",
    confidence: 94.7,
    severity: "critical",
    riskLevel: "critical",
    affectedArea: 62,
    uploadedImage:
      "https://images.unsplash.com/photo-1628352081506-83c43123a6b9?w=800&q=80",
    referenceImage:
      "https://images.unsplash.com/photo-1628352081506-83c43123a6b9?w=800&q=80",
    location: "Wardha, Maharashtra",
    district: "Wardha",
    farmerId: "farmer-001",
    verified: true,
    weatherContext: {
      temp: 34,
      humidity: 78,
      rainfall: 12,
      condition: "Partly Cloudy",
    },
    riskFactors: [
      {
        label: "Visual Evidence",
        score: 94,
        description: "AI detected characteristic boll entry holes and frass",
      },
      {
        label: "Weather Conditions",
        score: 82,
        description: "High humidity (78%) and warmth favor pest reproduction",
      },
      {
        label: "Crop Stage",
        score: 90,
        description: "Boll-development stage is peak vulnerability period",
      },
      {
        label: "Regional Activity",
        score: 88,
        description: "3 confirmed cases within 15 km radius this season",
      },
    ],
    whyResult:
      "The AI model identified Pink Bollworm with high confidence based on characteristic circular entry holes at the base of cotton bolls, visible frass deposits, and the pale pink larval coloration detected in the image. This pattern is distinct from mechanical damage — the entry holes are perfectly round (1.5–2mm diameter) and surrounded by dark-stained tissue. Combined with current weather conditions (temperature 34°C, 78% relative humidity) which are optimal for Pectinophora gossypiella development, and confirmed regional outbreak reports from neighboring fields in Wardha district, the system rates confidence at 94.7%.",
  },
  {
    id: "scan-002",
    timestamp: "2026-09-08T14:45:00Z",
    cropId: "soybean",
    cropName: "Soybean (JS-335)",
    diseaseId: "soybean-yellow-mosaic",
    diseaseName: "Yellow Mosaic Virus",
    diseaseType: "disease",
    confidence: 89.2,
    severity: "high",
    riskLevel: "high",
    affectedArea: 45,
    uploadedImage:
      "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=800&q=80",
    referenceImage:
      "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=800&q=80",
    location: "Latur, Maharashtra",
    district: "Latur",
    farmerId: "farmer-002",
    verified: false,
    weatherContext: {
      temp: 31,
      humidity: 65,
      rainfall: 0,
      condition: "Sunny",
    },
    riskFactors: [
      {
        label: "Visual Evidence",
        score: 89,
        description:
          "Bright yellow mosaic pattern consistent with MYMV infection",
      },
      {
        label: "Weather Conditions",
        score: 68,
        description: "Dry, warm conditions favor whitefly vector populations",
      },
      {
        label: "Crop Stage",
        score: 75,
        description: "Vegetative stage — infection now will reduce pod set",
      },
      {
        label: "Regional Activity",
        score: 72,
        description: "Moderate whitefly pressure reported in district",
      },
    ],
    whyResult:
      "Yellow Mosaic Virus was detected based on the distinctive bright yellow-to-golden mosaic patterning on trifoliate leaves, with sharp boundaries between healthy green tissue and yellowed patches — a signature of viral, not nutritional, origin. The interveinal pattern and leaf distortion align with MYMV pathotype signatures in the model's training database. Whitefly (Bemisia tabaci) populations are currently active in Latur district, providing the transmission pathway.",
  },
  {
    id: "scan-003",
    timestamp: "2026-09-07T09:10:00Z",
    cropId: "wheat",
    cropName: "Wheat (GW-496)",
    diseaseId: "aphid-infestation",
    diseaseName: "Aphid Infestation",
    diseaseType: "pest",
    confidence: 76.4,
    severity: "moderate",
    riskLevel: "medium",
    affectedArea: 28,
    uploadedImage:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80",
    referenceImage:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80",
    location: "Nashik, Maharashtra",
    district: "Nashik",
    farmerId: "farmer-001",
    verified: false,
    weatherContext: {
      temp: 26,
      humidity: 55,
      rainfall: 0,
      condition: "Clear",
    },
    riskFactors: [
      {
        label: "Visual Evidence",
        score: 76,
        description: "Colonies visible on stems with honeydew and sooty mold",
      },
      {
        label: "Weather Conditions",
        score: 55,
        description: "Mild, dry conditions are moderate risk for aphids",
      },
      {
        label: "Crop Stage",
        score: 60,
        description: "Tillering stage; aphid pressure manageable at this level",
      },
      {
        label: "Regional Activity",
        score: 48,
        description: "Low regional outbreak pressure this season",
      },
    ],
    whyResult:
      "The image shows soft-bodied aphid colonies aggregating on stems near the flag leaf junction, with characteristic honeydew deposits and incipient sooty mold. The density appears moderate — approximately 50–80 aphids per tiller, which is approaching economic threshold (>100 per tiller). The confidence is moderate (76.4%) because image resolution partially limits individual insect identification at this zoom level.",
  },
];

export const LATEST_SCAN = SCAN_RESULTS[0];
