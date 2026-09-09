// Mock data: Officer dashboard stats and charts
export interface OfficerKPI {
  label: string;
  value: number;
  change: number; // percentage change
  trend: "up" | "down" | "stable";
  color: string;
  icon: string;
}

export interface ReportItem {
  id: string;
  farmerName: string;
  village: string;
  district: string;
  crop: string;
  threat: string;
  severity: "low" | "moderate" | "high" | "critical";
  submittedAt: string;
  confidence: number;
  status: "pending" | "confirmed" | "rejected" | "needs_review";
  thumbnail: string;
}

export interface TrendDataPoint {
  week: string;
  cotton: number;
  soybean: number;
  wheat: number;
  grape: number;
  other: number;
}

export interface PestTrendPoint {
  week: string;
  bollworm: number;
  aphid: number;
  stemBorer: number;
  whitefly: number;
}

export interface ReportDensityPoint {
  district: string;
  reports: number;
  verified: number;
  critical: number;
}

export const OFFICER_KPIS: OfficerKPI[] = [
  {
    label: "Total Reports",
    value: 847,
    change: 12.4,
    trend: "up",
    color: "#00E5A0",
    icon: "FileText",
  },
  {
    label: "Verified Cases",
    value: 612,
    change: 8.1,
    trend: "up",
    color: "#3B82F6",
    icon: "ShieldCheck",
  },
  {
    label: "High-Risk Areas",
    value: 23,
    change: -5.2,
    trend: "down",
    color: "#F59E0B",
    icon: "AlertTriangle",
  },
  {
    label: "Active Threats",
    value: 7,
    change: 16.7,
    trend: "up",
    color: "#EF4444",
    icon: "Zap",
  },
  {
    label: "Pending Referrals",
    value: 34,
    change: -3.1,
    trend: "down",
    color: "#8B5CF6",
    icon: "Clock",
  },
];

export const DISEASE_TREND: TrendDataPoint[] = [
  { week: "Aug W1", cotton: 45, soybean: 32, wheat: 10, grape: 18, other: 8 },
  { week: "Aug W2", cotton: 52, soybean: 38, wheat: 12, grape: 22, other: 10 },
  { week: "Aug W3", cotton: 61, soybean: 45, wheat: 14, grape: 19, other: 13 },
  { week: "Aug W4", cotton: 78, soybean: 55, wheat: 11, grape: 25, other: 15 },
  { week: "Sep W1", cotton: 94, soybean: 67, wheat: 13, grape: 28, other: 18 },
  { week: "Sep W2", cotton: 102, soybean: 71, wheat: 16, grape: 31, other: 20 },
];

export const PEST_TREND: PestTrendPoint[] = [
  { week: "Aug W1", bollworm: 28, aphid: 15, stemBorer: 9, whitefly: 12 },
  { week: "Aug W2", bollworm: 35, aphid: 18, stemBorer: 11, whitefly: 16 },
  { week: "Aug W3", bollworm: 48, aphid: 22, stemBorer: 14, whitefly: 19 },
  { week: "Aug W4", bollworm: 62, aphid: 19, stemBorer: 18, whitefly: 23 },
  { week: "Sep W1", bollworm: 79, aphid: 24, stemBorer: 22, whitefly: 27 },
  { week: "Sep W2", bollworm: 91, aphid: 21, stemBorer: 25, whitefly: 29 },
];

export const REPORT_DENSITY: ReportDensityPoint[] = [
  { district: "Wardha", reports: 127, verified: 98, critical: 14 },
  { district: "Latur", reports: 94, verified: 71, critical: 9 },
  { district: "Akola", reports: 88, verified: 65, critical: 12 },
  { district: "Nashik", reports: 76, verified: 52, critical: 5 },
  { district: "Sangli", reports: 68, verified: 54, critical: 7 },
  { district: "Buldhana", reports: 62, verified: 48, critical: 6 },
  { district: "Nagpur", reports: 55, verified: 41, critical: 3 },
  { district: "Aurangabad", reports: 51, verified: 38, critical: 4 },
];

export const OFFICER_REPORTS: ReportItem[] = [
  {
    id: "rep-001",
    farmerName: "Ramesh Patil",
    village: "Arvi",
    district: "Wardha",
    crop: "Cotton",
    threat: "Pink Bollworm",
    severity: "critical",
    submittedAt: "2026-09-09T10:23:00Z",
    confidence: 94.7,
    status: "confirmed",
    thumbnail:
      "https://images.unsplash.com/photo-1628352081506-83c43123a6b9?w=120&q=80",
  },
  {
    id: "rep-002",
    farmerName: "Sunita Deshmukh",
    village: "Udgir",
    district: "Latur",
    crop: "Soybean",
    threat: "Yellow Mosaic Virus",
    severity: "high",
    submittedAt: "2026-09-08T14:45:00Z",
    confidence: 89.2,
    status: "pending",
    thumbnail:
      "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=120&q=80",
  },
  {
    id: "rep-003",
    farmerName: "Kiran Bhosale",
    village: "Barshitakli",
    district: "Akola",
    crop: "Sugarcane",
    threat: "Stem Borer",
    severity: "critical",
    submittedAt: "2026-09-09T06:45:00Z",
    confidence: 91.3,
    status: "confirmed",
    thumbnail:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&q=80",
  },
  {
    id: "rep-004",
    farmerName: "Priya Kulkarni",
    village: "Tasgaon",
    district: "Sangli",
    crop: "Grape",
    threat: "Downy Mildew",
    severity: "high",
    submittedAt: "2026-09-06T16:20:00Z",
    confidence: 87.6,
    status: "needs_review",
    thumbnail:
      "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=120&q=80",
  },
  {
    id: "rep-005",
    farmerName: "Vijay Shinde",
    village: "Dindori",
    district: "Nashik",
    crop: "Wheat",
    threat: "Aphid Infestation",
    severity: "moderate",
    submittedAt: "2026-09-07T09:10:00Z",
    confidence: 76.4,
    status: "pending",
    thumbnail:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&q=80",
  },
  {
    id: "rep-006",
    farmerName: "Meena Jadhav",
    village: "Chikhli",
    district: "Buldhana",
    crop: "Cotton",
    threat: "Root Rot",
    severity: "high",
    submittedAt: "2026-09-08T09:30:00Z",
    confidence: 83.2,
    status: "rejected",
    thumbnail:
      "https://images.unsplash.com/photo-1628352081506-83c43123a6b9?w=120&q=80",
  },
];
