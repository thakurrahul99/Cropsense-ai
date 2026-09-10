// Mock data: Officer dashboard stats and charts — Pan-India
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
  state: string; // ISO 3166-2:IN code
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
  rice: number;
  grape: number;
  other: number;
}

export interface PestTrendPoint {
  week: string;
  bollworm: number;
  aphid: number;
  stemBorer: number;
  planthopper: number;
  whitefly: number;
}

export interface ReportDensityPoint {
  district: string;
  state: string; // ISO 3166-2:IN code
  reports: number;
  verified: number;
  critical: number;
}

export const OFFICER_KPIS: OfficerKPI[] = [
  {
    label: "Total Reports",
    value: 1247,
    change: 18.4,
    trend: "up",
    color: "#00E5A0",
    icon: "FileText",
  },
  {
    label: "Verified Cases",
    value: 892,
    change: 12.1,
    trend: "up",
    color: "#3B82F6",
    icon: "ShieldCheck",
  },
  {
    label: "High-Risk Areas",
    value: 31,
    change: -3.2,
    trend: "down",
    color: "#F59E0B",
    icon: "AlertTriangle",
  },
  {
    label: "Active Threats",
    value: 11,
    change: 22.7,
    trend: "up",
    color: "#EF4444",
    icon: "Zap",
  },
  {
    label: "Pending Referrals",
    value: 48,
    change: -5.1,
    trend: "down",
    color: "#8B5CF6",
    icon: "Clock",
  },
];

export const DISEASE_TREND: TrendDataPoint[] = [
  { week: "Aug W1", cotton: 45, soybean: 32, wheat: 18, rice: 22, grape: 18, other: 8 },
  { week: "Aug W2", cotton: 52, soybean: 38, wheat: 24, rice: 29, grape: 22, other: 10 },
  { week: "Aug W3", cotton: 61, soybean: 45, wheat: 21, rice: 38, grape: 19, other: 13 },
  { week: "Aug W4", cotton: 78, soybean: 55, wheat: 18, rice: 47, grape: 25, other: 15 },
  { week: "Sep W1", cotton: 94, soybean: 67, wheat: 22, rice: 61, grape: 28, other: 18 },
  { week: "Sep W2", cotton: 102, soybean: 71, wheat: 28, rice: 74, grape: 31, other: 20 },
];

export const PEST_TREND: PestTrendPoint[] = [
  { week: "Aug W1", bollworm: 28, aphid: 15, stemBorer: 9, planthopper: 14, whitefly: 12 },
  { week: "Aug W2", bollworm: 35, aphid: 18, stemBorer: 11, planthopper: 18, whitefly: 16 },
  { week: "Aug W3", bollworm: 48, aphid: 22, stemBorer: 14, planthopper: 26, whitefly: 19 },
  { week: "Aug W4", bollworm: 62, aphid: 19, stemBorer: 18, planthopper: 34, whitefly: 23 },
  { week: "Sep W1", bollworm: 79, aphid: 24, stemBorer: 22, planthopper: 45, whitefly: 27 },
  { week: "Sep W2", bollworm: 91, aphid: 21, stemBorer: 25, planthopper: 58, whitefly: 29 },
];

export const REPORT_DENSITY: ReportDensityPoint[] = [
  { district: "Wardha", state: "MH", reports: 127, verified: 98, critical: 14 },
  { district: "Burdwan", state: "WB", reports: 112, verified: 84, critical: 18 },
  { district: "Thanjavur", state: "TN", reports: 98, verified: 76, critical: 15 },
  { district: "Latur", state: "MH", reports: 94, verified: 71, critical: 9 },
  { district: "Ludhiana", state: "PB", reports: 91, verified: 68, critical: 11 },
  { district: "Akola", state: "MH", reports: 88, verified: 65, critical: 12 },
  { district: "Nashik", state: "MH", reports: 76, verified: 52, critical: 5 },
  { district: "Murshidabad", state: "WB", reports: 74, verified: 55, critical: 9 },
  { district: "Amritsar", state: "PB", reports: 71, verified: 54, critical: 7 },
  { district: "Sangli", state: "MH", reports: 68, verified: 54, critical: 7 },
  { district: "Belagavi", state: "KA", reports: 62, verified: 44, critical: 6 },
  { district: "Buldhana", state: "MH", reports: 62, verified: 48, critical: 6 },
];

export const OFFICER_REPORTS: ReportItem[] = [
  {
    id: "rep-001",
    farmerName: "Ramesh Patil",
    village: "Arvi",
    district: "Wardha",
    state: "MH",
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
    farmerName: "Amanjot Singh",
    village: "Jagraon",
    district: "Ludhiana",
    state: "PB",
    crop: "Wheat",
    threat: "Aphid Infestation",
    severity: "high",
    submittedAt: "2026-09-09T05:30:00Z",
    confidence: 82.4,
    status: "confirmed",
    thumbnail:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=120&q=80",
  },
  {
    id: "rep-003",
    farmerName: "Subhash Mondal",
    village: "Kalna",
    district: "Burdwan",
    state: "WB",
    crop: "Rice",
    threat: "Rice Blast",
    severity: "critical",
    submittedAt: "2026-09-09T04:15:00Z",
    confidence: 91.3,
    status: "confirmed",
    thumbnail:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=120&q=80",
  },
  {
    id: "rep-004",
    farmerName: "Sunita Deshmukh",
    village: "Udgir",
    district: "Latur",
    state: "MH",
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
    id: "rep-005",
    farmerName: "Murugan Rajan",
    village: "Papanasam",
    district: "Thanjavur",
    state: "TN",
    crop: "Rice",
    threat: "Brown Planthopper",
    severity: "critical",
    submittedAt: "2026-09-08T06:45:00Z",
    confidence: 87.5,
    status: "confirmed",
    thumbnail:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=120&q=80",
  },
  {
    id: "rep-006",
    farmerName: "Kiran Bhosale",
    village: "Barshitakli",
    district: "Akola",
    state: "MH",
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
    id: "rep-007",
    farmerName: "Priya Kulkarni",
    village: "Tasgaon",
    district: "Sangli",
    state: "MH",
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
    id: "rep-008",
    farmerName: "Vijay Shinde",
    village: "Dindori",
    district: "Nashik",
    state: "MH",
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
    id: "rep-009",
    farmerName: "Meena Jadhav",
    village: "Chikhli",
    district: "Buldhana",
    state: "MH",
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
