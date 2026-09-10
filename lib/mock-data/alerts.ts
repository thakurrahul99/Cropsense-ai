// Mock data: Alerts
import type { LocalizedText } from "@/lib/i18n";

export type AlertSeverity = "info" | "warning" | "danger" | "critical";

export interface Alert {
  id: string;
  title: LocalizedText;
  description: string;
  severity: AlertSeverity;
  district: string;
  state: string; // ISO 3166-2:IN code
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
    title: {
      en: "Critical Pink Bollworm Outbreak — Wardha",
      hi: "गुलाबी बॉलवर्म का गंभीर प्रकोप — वर्धा",
      mr: "गुलाबी बोंड अळीचा गंभीर उद्रेक — वर्धा",
      pa: "ਗੁਲਾਬੀ ਬੋਲਵਰਮ ਦਾ ਗੰਭੀਰ ਪ੍ਰਕੋਪ — ਵਰਧਾ",
    },
    description:
      "14 reports confirmed in Wardha district. Immediate action required. Apply recommended pesticides and contact your nearest Krishi Vigyan Kendra.",
    severity: "critical",
    district: "Wardha",
    state: "MH",
    affectedCrop: "Cotton",
    threat: "Pink Bollworm",
    timestamp: "2026-09-09T10:30:00Z",
    isRead: false,
    source: "Officer Verified",
    actionRequired: true,
  },
  {
    id: "alert-002",
    title: {
      en: "Stem Borer Alert — Akola Sugarcane Belt",
      hi: "तना छेदक चेतावनी — अकोला गन्ना क्षेत्र",
      mr: "खोडकिडा सूचना — अकोला उसाचा पट्टा",
      pa: "ਤਣਾ ਛੇਦਕ ਚੇਤਾਵਨੀ — ਅਕੋਲਾ ਗੰਨਾ ਖੇਤਰ",
    },
    description:
      "Sugarcane stem borer infestation spreading in Barshitakli and surrounding villages. Economic threshold breached in 12 farms.",
    severity: "critical",
    district: "Akola",
    state: "MH",
    affectedCrop: "Sugarcane",
    threat: "Stem Borer",
    timestamp: "2026-09-09T07:00:00Z",
    isRead: false,
    source: "Officer Verified",
    actionRequired: true,
  },
  {
    id: "alert-003",
    title: {
      en: "Yellow Mosaic Virus — Latur Soybean Region",
      hi: "पीला मोज़ेक वायरस — लातूर सोयाबीन क्षेत्र",
      mr: "पिवळा मोझॅक व्हायरस — लातूर सोयाबीन क्षेत्र",
      pa: "ਪੀਲਾ ਮੋਜ਼ੇਕ ਵਾਇਰਸ — ਲਾਤੂਰ ਸੋਇਆਬੀਨ ਖੇਤਰ",
    },
    description:
      "Whitefly populations are elevated. Spray imidacloprid and use yellow sticky traps. Avoid late sowing of second crop.",
    severity: "warning",
    district: "Latur",
    state: "MH",
    affectedCrop: "Soybean",
    threat: "Yellow Mosaic Virus",
    timestamp: "2026-09-08T15:00:00Z",
    isRead: false,
    source: "AI Detection",
    actionRequired: true,
  },
  {
    id: "alert-004",
    title: {
      en: "Downy Mildew Risk — Sangli Grape Season",
      hi: "डाउनी फफूंदी जोखिम — सांगली अंगूर सीज़न",
      mr: "केवडा धोका — सांगली द्राक्ष हंगाम",
      pa: "ਡਾਊਨੀ ਮਿਲਡਿਊ ਜੋਖਮ — ਸਾਂਗਲੀ ਅੰਗੂਰ ਸੀਜ਼ਨ",
    },
    description:
      "Pre-monsoon humidity levels may trigger downy mildew. Preventive copper-based fungicide application recommended before next rain.",
    severity: "warning",
    district: "Sangli",
    state: "MH",
    affectedCrop: "Grape",
    threat: "Downy Mildew",
    timestamp: "2026-09-07T09:00:00Z",
    isRead: true,
    source: "ICAR Advisory",
    actionRequired: false,
  },
  {
    id: "alert-005",
    title: {
      en: "Rainfall Alert — Nashik Onion Crop",
      hi: "वर्षा चेतावनी — नासिक प्याज फसल",
      mr: "पाऊस सूचना — नाशिक कांदा पीक",
      pa: "ਮੀਂਹ ਚੇਤਾਵਨੀ — ਨਾਸਿਕ ਪਿਆਜ਼ ਫ਼ਸਲ",
    },
    description:
      "Heavy rainfall forecast for next 48 hours. Ensure proper drainage and apply preventive fungicide to avoid basal rot.",
    severity: "info",
    district: "Nashik",
    state: "MH",
    affectedCrop: "Onion",
    threat: "Basal Rot Risk",
    timestamp: "2026-09-06T20:00:00Z",
    isRead: true,
    source: "Weather Alert",
    actionRequired: false,
  },
  {
    id: "alert-006",
    title: {
      en: "Root Rot Confirmed — Buldhana Cotton",
      hi: "जड़ सड़न की पुष्टि — बुलढाणा कपास",
      mr: "मुळकूज रोगाची पुष्टी — बुलढाणा कापूस",
      pa: "ਜੜ੍ਹ ਸੜਨ ਦੀ ਪੁਸ਼ਟੀ — ਬੁਲਢਾਨਾ ਕਪਾਹ",
    },
    description:
      "Fusarium root rot confirmed in Chikhli. Remove and destroy affected plants. Do not irrigate heavily. Soil drench with recommended fungicide.",
    severity: "danger",
    district: "Buldhana",
    state: "MH",
    affectedCrop: "Cotton",
    threat: "Root Rot",
    timestamp: "2026-09-08T10:30:00Z",
    isRead: false,
    source: "Officer Verified",
    actionRequired: true,
  },
  // ── Punjab alerts ──
  {
    id: "alert-007",
    title: {
      en: "Wheat Aphid Surge — Ludhiana & Amritsar",
      hi: "गेहूं में माहू का उछाल — लुधियाना और अमृतसर",
      mr: "गहू माव्याचा प्रादुर्भाव — लुधियाना आणि अमृतसर",
      pa: "ਕਣਕ ਵਿੱਚ ਚੇਪੇ ਦਾ ਵਾਧਾ — ਲੁਧਿਆਣਾ ਅਤੇ ਅੰਮ੍ਰਿਤਸਰ",
    },
    description:
      "Aphid colonies detected at tillering stage. Spray dimethoate 30 EC @ 300ml/acre. Monitor weekly. Avoid broad-spectrum sprays during beneficiary insect activity.",
    severity: "warning",
    district: "Ludhiana",
    state: "PB",
    affectedCrop: "Wheat",
    threat: "Aphid Infestation",
    timestamp: "2026-09-09T05:00:00Z",
    isRead: false,
    source: "AI Detection",
    actionRequired: true,
  },
  // ── West Bengal alerts ──
  {
    id: "alert-008",
    title: {
      en: "Rice Blast Emergency — Burdwan & Murshidabad",
      hi: "धान ब्लास्ट आपातकाल — बर्द्धमान और मुर्शिदाबाद",
      mr: "भात करपा आणीबाणी — बर्द्धमान व मुर्शिदाबाद",
      pa: "ਝੋਨੇ ਦਾ ਬਲਾਸਟ ਐਮਰਜੈਂਸੀ — ਬਰਦਵਾਨ ਅਤੇ ਮੁਰਸ਼ਿਦਾਬਾਦ",
    },
    description:
      "Neck blast at heading stage confirmed in 18 farms. Apply Tricyclazole 75 WP @ 200g/acre immediately. Do not delay — neck blast at this stage causes 100% yield loss in affected panicles.",
    severity: "critical",
    district: "Burdwan",
    state: "WB",
    affectedCrop: "Rice",
    threat: "Rice Blast",
    timestamp: "2026-09-09T04:00:00Z",
    isRead: false,
    source: "Officer Verified",
    actionRequired: true,
  },
  // ── Tamil Nadu alerts ──
  {
    id: "alert-009",
    title: {
      en: "Brown Planthopper Outbreak — Thanjavur Rice Belt",
      hi: "भूरा फुदका प्रकोप — तंजावुर धान क्षेत्र",
      mr: "तपकिरी तुडतुडा उद्रेक — थंजावूर भात पट्टा",
      pa: "ਭੂਰਾ ਫੁਦਕਾ ਪ੍ਰਕੋਪ — ਥੰਜਾਵੂਰ ਝੋਨਾ ਖੇਤਰ",
    },
    description:
      "BPH population exceeds 10 insects per hill across 4 blocks. Apply BPMC 50 EC @ 500ml/acre in shallow standing water. Drain field before spraying for maximum contact.",
    severity: "critical",
    district: "Thanjavur",
    state: "TN",
    affectedCrop: "Rice",
    threat: "Brown Planthopper",
    timestamp: "2026-09-08T06:00:00Z",
    isRead: false,
    source: "Officer Verified",
    actionRequired: true,
  },
];
