// Mock data: Alerts
export type AlertSeverity = "info" | "warning" | "danger" | "critical";

export interface Alert {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  severity: AlertSeverity;
  district: string;
  affectedCrop: string;
  threat: string;
  timestamp: string;
  isRead: boolean;
  source: "AI Detection" | "Officer Verified" | "ICAR Advisory" | "Weather Alert";
  actionRequired: boolean;
}

export const ALERTS: Alert[] = [
  {
    id: "alert-001",
    title: "Critical Pink Bollworm Outbreak — Wardha",
    titleHi: "गुलाबी बॉलवर्म का गंभीर प्रकोप — वर्धा",
    description:
      "14 reports confirmed in Wardha district. Immediate action required. Apply recommended pesticides and contact your nearest Krishi Vigyan Kendra.",
    severity: "critical",
    district: "Wardha",
    affectedCrop: "Cotton",
    threat: "Pink Bollworm",
    timestamp: "2026-09-09T10:30:00Z",
    isRead: false,
    source: "Officer Verified",
    actionRequired: true,
  },
  {
    id: "alert-002",
    title: "Stem Borer Alert — Akola Sugarcane Belt",
    titleHi: "तना छेदक चेतावनी — अकोला गन्ना क्षेत्र",
    description:
      "Sugarcane stem borer infestation spreading in Barshitakli and surrounding villages. Economic threshold breached in 12 farms.",
    severity: "critical",
    district: "Akola",
    affectedCrop: "Sugarcane",
    threat: "Stem Borer",
    timestamp: "2026-09-09T07:00:00Z",
    isRead: false,
    source: "Officer Verified",
    actionRequired: true,
  },
  {
    id: "alert-003",
    title: "Yellow Mosaic Virus — Latur Soybean Region",
    titleHi: "पीला मोज़ेक वायरस — लातूर सोयाबीन क्षेत्र",
    description:
      "Whitefly populations are elevated. Spray imidacloprid and use yellow sticky traps. Avoid late sowing of second crop.",
    severity: "warning",
    district: "Latur",
    affectedCrop: "Soybean",
    threat: "Yellow Mosaic Virus",
    timestamp: "2026-09-08T15:00:00Z",
    isRead: false,
    source: "AI Detection",
    actionRequired: true,
  },
  {
    id: "alert-004",
    title: "Downy Mildew Risk — Sangli Grape Season",
    titleHi: "डाउनी फफूंदी जोखिम — सांगली अंगूर सीज़न",
    description:
      "Pre-monsoon humidity levels may trigger downy mildew. Preventive copper-based fungicide application recommended before next rain.",
    severity: "warning",
    district: "Sangli",
    affectedCrop: "Grape",
    threat: "Downy Mildew",
    timestamp: "2026-09-07T09:00:00Z",
    isRead: true,
    source: "ICAR Advisory",
    actionRequired: false,
  },
  {
    id: "alert-005",
    title: "Rainfall Alert — Nashik Onion Crop",
    titleHi: "वर्षा चेतावनी — नासिक प्याज फसल",
    description:
      "Heavy rainfall forecast for next 48 hours. Ensure proper drainage and apply preventive fungicide to avoid basal rot.",
    severity: "info",
    district: "Nashik",
    affectedCrop: "Onion",
    threat: "Basal Rot Risk",
    timestamp: "2026-09-06T20:00:00Z",
    isRead: true,
    source: "Weather Alert",
    actionRequired: false,
  },
  {
    id: "alert-006",
    title: "Root Rot Confirmed — Buldhana Cotton",
    titleHi: "जड़ सड़न की पुष्टि — बुलढाणा कपास",
    description:
      "Fusarium root rot confirmed in Chikhli. Remove and destroy affected plants. Do not irrigate heavily. Soil drench with recommended fungicide.",
    severity: "danger",
    district: "Buldhana",
    affectedCrop: "Cotton",
    threat: "Root Rot",
    timestamp: "2026-09-08T10:30:00Z",
    isRead: false,
    source: "Officer Verified",
    actionRequired: true,
  },
];
