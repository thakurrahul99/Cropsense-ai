// Mock data: Advisory / IPM Steps
import type { LocalizedText } from "@/lib/i18n";

export interface AdvisoryStep {
  id: string;
  priority: "immediate" | "short-term" | "preventive";
  category: "chemical" | "biological" | "cultural" | "mechanical";
  title: LocalizedText;
  description: string;
  timing: string;
  safetyNotes?: string;
  cost: "low" | "medium" | "high";
  followedUp: boolean;
}

export interface Advisory {
  diseaseId: string;
  diseaseName: string;
  cropName: string;
  ipmSteps: AdvisoryStep[];
  referralInfo: {
    nearestKVK: string;
    contact: string;
    labAddress: string;
  };
  inputRecommendations: {
    product: string;
    dose: string;
    timing: string;
    safetyInterval: string;
    alternateProduct?: string;
  }[];
  preventionTips: string[];
}

/**
 * KVK lookup keyed by district (lowercase).
 * Sources: ICAR KVK Network directory (icar.org.in/kvk).
 */
export const KVK_BY_DISTRICT: Record<
  string,
  { nearestKVK: string; contact: string; labAddress: string }
> = {
  // Maharashtra
  wardha: {
    nearestKVK: "Krishi Vigyan Kendra, Wardha",
    contact: "+91-7152-241122",
    labAddress: "PDKV Regional Research Station, Akola, 444104",
  },
  latur: {
    nearestKVK: "Krishi Vigyan Kendra, Latur",
    contact: "+91-2382-250244",
    labAddress: "VNMKV, Parbhani, 431402",
  },
  nashik: {
    nearestKVK: "Krishi Vigyan Kendra, Nashik",
    contact: "+91-253-2302388",
    labAddress: "MCAER, Pune, 411016",
  },
  akola: {
    nearestKVK: "Krishi Vigyan Kendra, Akola",
    contact: "+91-724-2421251",
    labAddress: "PDKV, Akola, 444104",
  },
  buldhana: {
    nearestKVK: "Krishi Vigyan Kendra, Buldhana",
    contact: "+91-7262-241071",
    labAddress: "PDKV Regional Research Station, Akola, 444104",
  },
  sangli: {
    nearestKVK: "Krishi Vigyan Kendra, Sangli",
    contact: "+91-233-2300059",
    labAddress: "MCAER Regional Research Station, Solapur, 413001",
  },
  pune: {
    nearestKVK: "Krishi Vigyan Kendra, Baramati (Pune)",
    contact: "+91-2112-222013",
    labAddress: "MCAER, Pune, 411016",
  },
  nagpur: {
    nearestKVK: "Krishi Vigyan Kendra, Nagpur",
    contact: "+91-712-2580491",
    labAddress: "PDKV, Nagpur Campus, 440010",
  },
  // Punjab
  ludhiana: {
    nearestKVK: "Krishi Vigyan Kendra, Ludhiana",
    contact: "+91-161-2404581",
    labAddress: "Punjab Agricultural University, Ludhiana, 141004",
  },
  amritsar: {
    nearestKVK: "Krishi Vigyan Kendra, Amritsar",
    contact: "+91-183-2501100",
    labAddress: "PAU Regional Research Station, Gurdaspur, 143521",
  },
  bathinda: {
    nearestKVK: "Krishi Vigyan Kendra, Bathinda",
    contact: "+91-164-2240024",
    labAddress: "PAU Regional Research Station, Bathinda, 151001",
  },
  // West Bengal
  burdwan: {
    nearestKVK: "Krishi Vigyan Kendra, Burdwan",
    contact: "+91-342-2560480",
    labAddress: "Bidhan Chandra Krishi Viswavidyalaya, Mohanpur, 741252",
  },
  murshidabad: {
    nearestKVK: "Krishi Vigyan Kendra, Murshidabad",
    contact: "+91-3482-270031",
    labAddress: "BCKV Regional Research Station, Berhampur, 742101",
  },
  // Karnataka
  belagavi: {
    nearestKVK: "Krishi Vigyan Kendra, Belagavi",
    contact: "+91-831-2407290",
    labAddress: "University of Agricultural Sciences, Dharwad, 580005",
  },
  // Tamil Nadu
  thanjavur: {
    nearestKVK: "Krishi Vigyan Kendra, Thanjavur",
    contact: "+91-4362-228477",
    labAddress: "Tamil Nadu Agricultural University, Coimbatore, 641003",
  },
  tiruvarur: {
    nearestKVK: "Krishi Vigyan Kendra, Tiruvarur",
    contact: "+91-4366-224240",
    labAddress: "TNAU, Regional Research Station, Tiruchirappalli, 620009",
  },
};

/** Get KVK referral info for a district, with a generic national fallback. */
export function getKVKForDistrict(district: string): {
  nearestKVK: string;
  contact: string;
  labAddress: string;
} {
  const key = district.toLowerCase().trim();
  return (
    KVK_BY_DISTRICT[key] ?? {
      nearestKVK: "Nearest Krishi Vigyan Kendra",
      contact: "1800-180-1551 (ICAR Helpline, Toll-free)",
      labAddress: "Contact your district agriculture office for the nearest ICAR lab",
    }
  );
}

export const ADVISORIES: Record<string, Advisory> = {
  "cotton-bollworm": {
    diseaseId: "cotton-bollworm",
    diseaseName: "Pink Bollworm",
    cropName: "Cotton (Bt Cotton)",
    ipmSteps: [
      {
        id: "step-001",
        priority: "immediate",
        category: "mechanical",
        title: {
          en: "Set up Pheromone Traps",
          hi: "फेरोमोन ट्रैप लगाएं",
          mr: "फेरोमोन सापळे लावा",
          pa: "ਫੇਰੋਮੋਨ ਟਰੈਪ ਲਗਾਓ",
        },
        description:
          "Install Pink Bollworm pheromone traps at 5 per acre to monitor and mass-trap adult moths. Replace lures every 3 weeks.",
        timing: "Within 24 hours",
        cost: "low",
        followedUp: false,
      },
      {
        id: "step-002",
        priority: "immediate",
        category: "chemical",
        title: {
          en: "Spinosad Spray — First Flush",
          hi: "स्पिनोसेड स्प्रे — प्रथम फ्लश",
          mr: "स्पिनोसेड फवारणी — पहिला फ्लश",
          pa: "ਸਪਿਨੋਸੈਡ ਸਪ੍ਰੇ — ਪਹਿਲੀ ਫਲੱਸ਼",
        },
        description:
          "Apply Spinosad 45 SC @ 100 ml/acre or Emamectin Benzoate 5% SG @ 80 g/acre. Target young bolls and flower buds where larvae enter.",
        timing: "Immediate (within 2 days)",
        // TODO: TRANSLATION_UNREVIEWED — safetyNotes must be reviewed by a qualified
        // agricultural safety expert before translation into hi/mr/pa for production use.
        // Mistranslated PPE or pre-harvest interval information is a real safety risk.
        safetyNotes:
          "Use PPE — gloves, mask, goggles. Do not spray during flowering to protect pollinators. Pre-harvest interval: 7 days.",
        cost: "medium",
        followedUp: false,
      },
      {
        id: "step-003",
        priority: "short-term",
        category: "biological",
        title: {
          en: "Release Trichogramma Cards",
          hi: "ट्राइकोग्रामा कार्ड जारी करें",
          mr: "ट्रायकोग्रामा कार्ड सोडा",
          pa: "ਟ੍ਰਾਈਕੋਗ੍ਰਾਮਾ ਕਾਰਡ ਛੱਡੋ",
        },
        description:
          "Release Trichogramma chilonis egg parasitoid cards @ 50,000 eggs/acre at 10-day intervals for 3 releases.",
        timing: "Within 1 week",
        cost: "low",
        followedUp: false,
      },
      {
        id: "step-004",
        priority: "short-term",
        category: "cultural",
        title: {
          en: "Remove Infested Bolls",
          hi: "संक्रमित बॉल हटाएं",
          mr: "बाधित बोंडे काढा",
          pa: "ਸੰਕ੍ਰਮਿਤ ਬੋਲ ਹਟਾਓ",
        },
        description:
          "Hand-pick and destroy fallen / damaged bolls. Do not leave infested bolls on the ground as larvae will pupate in soil.",
        timing: "Within 3 days, then weekly",
        cost: "low",
        followedUp: false,
      },
      {
        id: "step-005",
        priority: "preventive",
        category: "cultural",
        title: {
          en: "Crop Rotation Planning",
          hi: "फसल चक्र योजना",
          mr: "पीक फेरपालट नियोजन",
          pa: "ਫ਼ਸਲ ਚੱਕਰ ਯੋਜਨਾ",
        },
        description:
          "Plan non-host crop rotation (soybean, gram) for next season to break the bollworm life cycle.",
        timing: "Next season",
        cost: "low",
        followedUp: false,
      },
    ],
    referralInfo: getKVKForDistrict("wardha"),
    inputRecommendations: [
      {
        product: "Spinosad 45 SC",
        dose: "100 ml per acre in 200L water",
        timing: "Early morning or evening",
        // TODO: TRANSLATION_UNREVIEWED — safetyInterval and dose must be reviewed
        // by a qualified agrochemical expert before translating to hi/mr/pa.
        safetyInterval: "7 days before harvest",
        alternateProduct: "Emamectin Benzoate 5% SG @ 80g/acre",
      },
      {
        product: "Chlorantraniliprole 18.5 SC (Coragen)",
        dose: "60 ml per acre",
        timing: "When larval count exceeds 5 per 100 bolls",
        // TODO: TRANSLATION_UNREVIEWED
        safetyInterval: "14 days before harvest",
      },
    ],
    preventionTips: [
      "Early sowing (June 15–30) to avoid peak bollworm season",
      "Destroy cotton stalks immediately after harvest",
      "Avoid excess nitrogen which promotes lush growth attractive to pests",
      "Monitor pheromone trap catches weekly throughout season",
    ],
  },
  "soybean-yellow-mosaic": {
    diseaseId: "soybean-yellow-mosaic",
    diseaseName: "Yellow Mosaic Virus",
    cropName: "Soybean (JS-335)",
    ipmSteps: [
      {
        id: "step-101",
        priority: "immediate",
        category: "cultural",
        title: {
          en: "Remove Infected Plants",
          hi: "संक्रमित पौधे हटाएं",
          mr: "बाधित झाडे काढा",
          pa: "ਸੰਕ੍ਰਮਿਤ ਪੌਦੇ ਹਟਾਓ",
        },
        description:
          "Uproot and destroy all visibly infected plants immediately. Bag and burn — do not compost. This prevents whitefly from acquiring the virus from infected reservoirs.",
        timing: "Immediate",
        cost: "low",
        followedUp: false,
      },
      {
        id: "step-102",
        priority: "immediate",
        category: "chemical",
        title: {
          en: "Whitefly Vector Control",
          hi: "सफेद मक्खी वेक्टर नियंत्रण",
          mr: "पांढरी माशी वेक्टर नियंत्रण",
          pa: "ਚਿੱਟੀ ਮੱਖੀ ਵੈਕਟਰ ਕੰਟਰੋਲ",
        },
        description:
          "Spray Imidacloprid 17.8 SL @ 150 ml/acre or Thiamethoxam 25 WG @ 40 g/acre to suppress whitefly populations and reduce virus spread.",
        timing: "Within 24 hours",
        // TODO: TRANSLATION_UNREVIEWED — safety notes for chemical applications
        // require agricultural expert review before translation.
        safetyNotes:
          "Avoid spraying during bee activity hours (8am–12pm). Rotate insecticide classes to prevent resistance.",
        cost: "medium",
        followedUp: false,
      },
      {
        id: "step-103",
        priority: "short-term",
        category: "mechanical",
        title: {
          en: "Yellow Sticky Traps",
          hi: "पीले चिपचिपे ट्रैप",
          mr: "पिवळे चिकट सापळे",
          pa: "ਪੀਲੇ ਚਿਪਚਿਪੇ ਟਰੈਪ",
        },
        description:
          "Install yellow sticky traps @ 10 per acre at crop canopy height for monitoring and mass capture of whitefly adults.",
        timing: "Within 2 days",
        cost: "low",
        followedUp: false,
      },
    ],
    referralInfo: getKVKForDistrict("latur"),
    inputRecommendations: [
      {
        product: "Imidacloprid 17.8 SL",
        dose: "150 ml per acre in 200L water",
        timing: "Early morning",
        // TODO: TRANSLATION_UNREVIEWED
        safetyInterval: "7 days",
        alternateProduct: "Thiamethoxam 25 WG @ 40g/acre",
      },
    ],
    preventionTips: [
      "Use MYMV-tolerant varieties: MACS 1407, NRC 7",
      "Seed treatment with Imidacloprid 70 WS @ 10g/kg seed",
      "Maintain field hygiene — remove weed hosts",
      "Plant border crops like maize to reduce whitefly movement",
    ],
  },
  "rice-blast": {
    diseaseId: "rice-blast",
    diseaseName: "Rice Blast",
    cropName: "Rice (Sona Masuri / Basmati)",
    ipmSteps: [
      {
        id: "step-201",
        priority: "immediate",
        category: "chemical",
        title: {
          en: "Tricyclazole Spray — Emergency",
          hi: "ट्राइसाइक्लाज़ोल स्प्रे — आपातकाल",
          mr: "ट्रायसायक्लाझोल फवारणी — आणीबाणी",
          pa: "ਟ੍ਰਾਈਸਾਈਕਲਾਜ਼ੋਲ ਸਪ੍ਰੇ — ਐਮਰਜੈਂਸੀ",
        },
        description:
          "Apply Tricyclazole 75 WP @ 200g/acre or Isoprothiolane 40 EC @ 400ml/acre at first sign of leaf blast. Repeat after 10–14 days.",
        timing: "Immediate — within 24 hours of detection",
        // TODO: TRANSLATION_UNREVIEWED — chemical doses and safety intervals
        // must be reviewed by a qualified plant protection expert before
        // translating to hi/mr/pa for production deployment.
        safetyNotes:
          "Wear gloves, mask, and eye protection. Pre-harvest interval: 14 days. Do not apply near water bodies.",
        cost: "medium",
        followedUp: false,
      },
      {
        id: "step-202",
        priority: "immediate",
        category: "cultural",
        title: {
          en: "Reduce Nitrogen Application",
          hi: "नाइट्रोजन उर्वरक कम करें",
          mr: "नायट्रोजन खताचा वापर कमी करा",
          pa: "ਨਾਈਟ੍ਰੋਜਨ ਖਾਦ ਘਟਾਓ",
        },
        description:
          "Immediately stop or reduce nitrogen (urea) top-dressing. Excess nitrogen causes lush leaf growth that is highly susceptible to blast.",
        timing: "Immediate",
        cost: "low",
        followedUp: false,
      },
      {
        id: "step-203",
        priority: "short-term",
        category: "biological",
        title: {
          en: "Apply Pseudomonas fluorescens",
          hi: "स्यूडोमोनास फ्लोरेसेंस लगाएं",
          mr: "सुडोमोनास फ्लोरेसेन्स वापरा",
          pa: "ਸੂਡੋਮੋਨਾਸ ਫਲੋਰੇਸੈਂਸ ਲਗਾਓ",
        },
        description:
          "Foliar spray with Pseudomonas fluorescens @ 5g/L water as a bioagent to suppress blast spore germination and systemic resistance induction.",
        timing: "Within 1 week",
        cost: "low",
        followedUp: false,
      },
      {
        id: "step-204",
        priority: "preventive",
        category: "cultural",
        title: {
          en: "Use Blast-Resistant Varieties",
          hi: "ब्लास्ट-रोधी किस्में लगाएं",
          mr: "ब्लास्ट-प्रतिरोधी वाण लावा",
          pa: "ਬਲਾਸਟ-ਰੋਧੀ ਕਿਸਮਾਂ ਬੀਜੋ",
        },
        description:
          "For next season, switch to blast-resistant varieties: MTU 1010, IR 64, or Improved Samba Mahsuri (for TN/WB), or BPT-5204. Consult your KVK for region-specific variety recommendations.",
        timing: "Next season planning",
        cost: "low",
        followedUp: false,
      },
    ],
    referralInfo: getKVKForDistrict("burdwan"),
    inputRecommendations: [
      {
        product: "Tricyclazole 75 WP",
        dose: "200g per acre in 200L water",
        timing: "At first sign of infection; repeat after 10–14 days",
        // TODO: TRANSLATION_UNREVIEWED
        safetyInterval: "14 days before harvest",
        alternateProduct: "Isoprothiolane 40 EC @ 400ml/acre",
      },
      {
        product: "Hexaconazole 5 EC",
        dose: "200ml per acre",
        timing: "Preventive — at panicle initiation stage",
        // TODO: TRANSLATION_UNREVIEWED
        safetyInterval: "21 days before harvest",
      },
    ],
    preventionTips: [
      "Use certified blast-resistant seed varieties",
      "Seed treatment with Carbendazim or Tricyclazole before sowing",
      "Maintain balanced fertilization — avoid excess nitrogen",
      "Maintain field drainage — standing water in humid weather worsens blast",
      "Monitor for leaf blast lesions weekly during tillering–heading stage",
    ],
  },
};
