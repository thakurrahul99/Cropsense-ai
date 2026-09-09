// Mock data: Advisory / IPM Steps
export interface AdvisoryStep {
  id: string;
  priority: "immediate" | "short-term" | "preventive";
  category: "chemical" | "biological" | "cultural" | "mechanical";
  title: string;
  titleHi: string;
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
        title: "Set up Pheromone Traps",
        titleHi: "फेरोमोन ट्रैप लगाएं",
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
        title: "Spinosad Spray — First Flush",
        titleHi: "स्पिनोसेड स्प्रे — प्रथम फ्लश",
        description:
          "Apply Spinosad 45 SC @ 100 ml/acre or Emamectin Benzoate 5% SG @ 80 g/acre. Target young bolls and flower buds where larvae enter.",
        timing: "Immediate (within 2 days)",
        safetyNotes:
          "Use PPE — gloves, mask, goggles. Do not spray during flowering to protect pollinators. Pre-harvest interval: 7 days.",
        cost: "medium",
        followedUp: false,
      },
      {
        id: "step-003",
        priority: "short-term",
        category: "biological",
        title: "Release Trichogramma Cards",
        titleHi: "ट्राइकोग्रामा कार्ड जारी करें",
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
        title: "Remove Infested Bolls",
        titleHi: "संक्रमित बॉल हटाएं",
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
        title: "Crop Rotation Planning",
        titleHi: "फसल चक्र योजना",
        description:
          "Plan non-host crop rotation (soybean, gram) for next season to break the bollworm life cycle.",
        timing: "Next season",
        cost: "low",
        followedUp: false,
      },
    ],
    referralInfo: {
      nearestKVK: "Krishi Vigyan Kendra, Wardha",
      contact: "+91-7152-241122",
      labAddress: "PDKV Regional Research Station, Akola, 444104",
    },
    inputRecommendations: [
      {
        product: "Spinosad 45 SC",
        dose: "100 ml per acre in 200L water",
        timing: "Early morning or evening",
        safetyInterval: "7 days before harvest",
        alternateProduct: "Emamectin Benzoate 5% SG @ 80g/acre",
      },
      {
        product: "Chlorantraniliprole 18.5 SC (Coragen)",
        dose: "60 ml per acre",
        timing: "When larval count exceeds 5 per 100 bolls",
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
        title: "Remove Infected Plants",
        titleHi: "संक्रमित पौधे हटाएं",
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
        title: "Whitefly Vector Control",
        titleHi: "सफेद मक्खी वेक्टर नियंत्रण",
        description:
          "Spray Imidacloprid 17.8 SL @ 150 ml/acre or Thiamethoxam 25 WG @ 40 g/acre to suppress whitefly populations and reduce virus spread.",
        timing: "Within 24 hours",
        safetyNotes:
          "Avoid spraying during bee activity hours (8am–12pm). Rotate insecticide classes to prevent resistance.",
        cost: "medium",
        followedUp: false,
      },
      {
        id: "step-103",
        priority: "short-term",
        category: "mechanical",
        title: "Yellow Sticky Traps",
        titleHi: "पीले चिपचिपे ट्रैप",
        description:
          "Install yellow sticky traps @ 10 per acre at crop canopy height for monitoring and mass capture of whitefly adults.",
        timing: "Within 2 days",
        cost: "low",
        followedUp: false,
      },
    ],
    referralInfo: {
      nearestKVK: "Krishi Vigyan Kendra, Latur",
      contact: "+91-2382-250244",
      labAddress: "VNMKV, Parbhani, 431402",
    },
    inputRecommendations: [
      {
        product: "Imidacloprid 17.8 SL",
        dose: "150 ml per acre in 200L water",
        timing: "Early morning",
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
};
