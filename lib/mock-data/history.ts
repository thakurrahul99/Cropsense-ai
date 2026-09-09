// Mock data: Scan history
import type { SeverityLevel, RiskLevel } from "./diseases";

export interface HistoryItem {
  id: string;
  timestamp: string;
  cropName: string;
  cropId: string;
  diseaseName: string;
  diseaseType: "disease" | "pest";
  confidence: number;
  severity: SeverityLevel;
  riskLevel: RiskLevel;
  thumbnail: string;
  location: string;
  status: "pending" | "verified" | "resolved" | "flagged";
  followedAdvisory: boolean;
}

export const HISTORY: HistoryItem[] = [
  {
    id: "hist-001",
    timestamp: "2026-09-09T10:23:00Z",
    cropName: "Cotton",
    cropId: "cotton",
    diseaseName: "Pink Bollworm",
    diseaseType: "pest",
    confidence: 94.7,
    severity: "critical",
    riskLevel: "critical",
    thumbnail:
      "https://images.unsplash.com/photo-1628352081506-83c43123a6b9?w=200&q=80",
    location: "Wardha",
    status: "verified",
    followedAdvisory: false,
  },
  {
    id: "hist-002",
    timestamp: "2026-09-08T14:45:00Z",
    cropName: "Soybean",
    cropId: "soybean",
    diseaseName: "Yellow Mosaic Virus",
    diseaseType: "disease",
    confidence: 89.2,
    severity: "high",
    riskLevel: "high",
    thumbnail:
      "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=200&q=80",
    location: "Latur",
    status: "pending",
    followedAdvisory: false,
  },
  {
    id: "hist-003",
    timestamp: "2026-09-07T09:10:00Z",
    cropName: "Wheat",
    cropId: "wheat",
    diseaseName: "Aphid Infestation",
    diseaseType: "pest",
    confidence: 76.4,
    severity: "moderate",
    riskLevel: "medium",
    thumbnail:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&q=80",
    location: "Nashik",
    status: "resolved",
    followedAdvisory: true,
  },
  {
    id: "hist-004",
    timestamp: "2026-09-04T11:30:00Z",
    cropName: "Grape",
    cropId: "grape",
    diseaseName: "Powdery Mildew",
    diseaseType: "disease",
    confidence: 82.1,
    severity: "low",
    riskLevel: "low",
    thumbnail:
      "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=200&q=80",
    location: "Nashik",
    status: "resolved",
    followedAdvisory: true,
  },
  {
    id: "hist-005",
    timestamp: "2026-08-28T08:15:00Z",
    cropName: "Tomato",
    cropId: "tomato",
    diseaseName: "Late Blight",
    diseaseType: "disease",
    confidence: 71.3,
    severity: "moderate",
    riskLevel: "medium",
    thumbnail:
      "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=200&q=80",
    location: "Pune",
    status: "flagged",
    followedAdvisory: false,
  },
  {
    id: "hist-006",
    timestamp: "2026-08-20T16:00:00Z",
    cropName: "Cotton",
    cropId: "cotton",
    diseaseName: "Whitefly",
    diseaseType: "pest",
    confidence: 68.9,
    severity: "low",
    riskLevel: "low",
    thumbnail:
      "https://images.unsplash.com/photo-1628352081506-83c43123a6b9?w=200&q=80",
    location: "Wardha",
    status: "resolved",
    followedAdvisory: true,
  },
];
