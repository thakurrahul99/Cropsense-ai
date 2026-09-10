// Mock data: All Indian States and Union Territories
// ISO 3166-2:IN codes used as id

export interface StateInfo {
  id: string;          // ISO 3166-2:IN code e.g. "MH", "PB"
  name: string;        // English name
  nameLocal: string;   // Primary local language name
  districts: string[];
  primaryCrops: string[];   // crop ids matching lib/mock-data/crops.ts
  languageCode: string;     // default UI locale for that state e.g. "mr", "pa", "hi"
}

export const STATES: StateInfo[] = [
  // ── MAHARASHTRA ──
  {
    id: "MH",
    name: "Maharashtra",
    nameLocal: "महाराष्ट्र",
    districts: [
      "Wardha", "Nagpur", "Amravati", "Akola", "Buldhana", "Washim",
      "Yavatmal", "Latur", "Nanded", "Osmanabad", "Beed", "Hingoli",
      "Parbhani", "Aurangabad", "Jalna", "Nashik", "Pune", "Satara",
      "Sangli", "Solapur", "Kolhapur", "Raigad", "Thane", "Mumbai",
    ],
    primaryCrops: ["cotton", "soybean", "sugarcane", "onion", "grape", "orange"],
    languageCode: "mr",
  },

  // ── PUNJAB ──
  {
    id: "PB",
    name: "Punjab",
    nameLocal: "ਪੰਜਾਬ",
    districts: [
      "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda",
      "Hoshiarpur", "Gurdaspur", "Firozpur", "Moga", "Rupnagar",
      "Sangrur", "Mansa", "Fazilka", "Tarn Taran",
    ],
    primaryCrops: ["wheat", "rice", "cotton"],
    languageCode: "pa",
  },

  // ── UTTAR PRADESH ──
  {
    id: "UP",
    name: "Uttar Pradesh",
    nameLocal: "उत्तर प्रदेश",
    districts: [
      "Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Prayagraj",
      "Bareilly", "Aligarh", "Moradabad", "Gorakhpur", "Saharanpur",
      "Muzaffarnagar", "Ghaziabad", "Mathura", "Firozabad",
    ],
    primaryCrops: ["wheat", "sugarcane", "rice", "potato"],
    languageCode: "hi",
  },

  // ── WEST BENGAL ──
  {
    id: "WB",
    name: "West Bengal",
    nameLocal: "পশ্চিমবঙ্গ",
    districts: [
      "Kolkata", "Howrah", "Burdwan", "Murshidabad", "Nadia", "North 24 Parganas",
      "South 24 Parganas", "Jalpaiguri", "Cooch Behar", "Darjeeling",
      "Birbhum", "Bankura", "Purulia", "Midnapore",
    ],
    primaryCrops: ["rice", "jute", "potato", "tomato"],
    languageCode: "hi",
  },

  // ── KARNATAKA ──
  {
    id: "KA",
    name: "Karnataka",
    nameLocal: "ಕರ್ನಾಟಕ",
    districts: [
      "Bengaluru", "Mysuru", "Hubli-Dharwad", "Mangaluru", "Belagavi",
      "Ballari", "Vijayapura", "Shivamogga", "Tumakuru", "Raichur",
      "Kalaburagi", "Hassan", "Chikkamagaluru", "Kodagu", "Bagalkot",
    ],
    primaryCrops: ["rice", "sugarcane", "cotton", "grape", "coffee"],
    languageCode: "hi",
  },

  // ── TAMIL NADU ──
  {
    id: "TN",
    name: "Tamil Nadu",
    nameLocal: "தமிழ்நாடு",
    districts: [
      "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem",
      "Tirunelveli", "Vellore", "Erode", "Thanjavur", "Dindigul",
      "Cuddalore", "Tiruvarur", "Nagapattinam", "Virudhunagar",
    ],
    primaryCrops: ["rice", "cotton", "sugarcane", "banana", "tomato"],
    languageCode: "hi",
  },

  // ── ANDHRA PRADESH ──
  {
    id: "AP",
    name: "Andhra Pradesh",
    nameLocal: "ఆంధ్రప్రదేశ్",
    districts: [
      "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool",
      "Tirupati", "Kadapa", "Anantapur", "Srikakulam", "Vizianagaram",
    ],
    primaryCrops: ["rice", "cotton", "sugarcane", "chilli", "tomato"],
    languageCode: "hi",
  },

  // ── TELANGANA ──
  {
    id: "TS",
    name: "Telangana",
    nameLocal: "తెలంగాణ",
    districts: [
      "Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar",
      "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet",
    ],
    primaryCrops: ["rice", "cotton", "soybean", "sugarcane"],
    languageCode: "hi",
  },

  // ── GUJARAT ──
  {
    id: "GJ",
    name: "Gujarat",
    nameLocal: "ગુજરાત",
    districts: [
      "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar",
      "Junagadh", "Jamnagar", "Gandhinagar", "Anand", "Kheda",
      "Amreli", "Kutch", "Surendranagar", "Patan",
    ],
    primaryCrops: ["cotton", "groundnut", "wheat", "tobacco", "sugarcane"],
    languageCode: "hi",
  },

  // ── RAJASTHAN ──
  {
    id: "RJ",
    name: "Rajasthan",
    nameLocal: "राजस्थान",
    districts: [
      "Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur",
      "Bhilwara", "Alwar", "Sikar", "Sri Ganganagar", "Barmer", "Pali",
    ],
    primaryCrops: ["wheat", "mustard", "cotton", "groundnut", "soybean"],
    languageCode: "hi",
  },

  // ── MADHYA PRADESH ──
  {
    id: "MP",
    name: "Madhya Pradesh",
    nameLocal: "मध्य प्रदेश",
    districts: [
      "Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar",
      "Dewas", "Satna", "Ratlam", "Rewa", "Chhindwara", "Vidisha",
    ],
    primaryCrops: ["wheat", "soybean", "cotton", "sugarcane", "rice"],
    languageCode: "hi",
  },

  // ── BIHAR ──
  {
    id: "BR",
    name: "Bihar",
    nameLocal: "बिहार",
    districts: [
      "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga",
      "Purnia", "Arrah", "Samastipur", "Munger", "Sitamarhi",
    ],
    primaryCrops: ["rice", "wheat", "sugarcane", "maize", "potato"],
    languageCode: "hi",
  },

  // ── ODISHA ──
  {
    id: "OR",
    name: "Odisha",
    nameLocal: "ଓଡ଼ିଶା",
    districts: [
      "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur",
      "Puri", "Balasore", "Bhadrak", "Koraput", "Mayurbhanj",
    ],
    primaryCrops: ["rice", "groundnut", "mustard", "sugarcane"],
    languageCode: "hi",
  },

  // ── KERALA ──
  {
    id: "KL",
    name: "Kerala",
    nameLocal: "കേരളം",
    districts: [
      "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Malappuram",
      "Kannur", "Kollam", "Palakkad", "Alappuzha", "Idukki",
    ],
    primaryCrops: ["rice", "coconut", "rubber", "banana", "pepper"],
    languageCode: "hi",
  },

  // ── ASSAM ──
  {
    id: "AS",
    name: "Assam",
    nameLocal: "অসম",
    districts: [
      "Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Nagaon",
      "Tinsukia", "Barpeta", "Dhubri", "Goalpara", "Lakhimpur",
    ],
    primaryCrops: ["rice", "tea", "jute", "sugarcane"],
    languageCode: "hi",
  },

  // ── HARYANA ──
  {
    id: "HR",
    name: "Haryana",
    nameLocal: "हरियाणा",
    districts: [
      "Ambala", "Hisar", "Rohtak", "Sonipat", "Gurugram", "Faridabad",
      "Panipat", "Karnal", "Yamunanagar", "Kurukshetra", "Bhiwani",
    ],
    primaryCrops: ["wheat", "rice", "sugarcane", "cotton", "mustard"],
    languageCode: "hi",
  },

  // ── HIMACHAL PRADESH ──
  {
    id: "HP",
    name: "Himachal Pradesh",
    nameLocal: "हिमाचल प्रदेश",
    districts: [
      "Shimla", "Mandi", "Kangra", "Solan", "Kullu", "Sirmaur", "Hamirpur",
    ],
    primaryCrops: ["wheat", "rice", "apple", "potato", "tomato"],
    languageCode: "hi",
  },

  // ── UTTARAKHAND ──
  {
    id: "UK",
    name: "Uttarakhand",
    nameLocal: "उत्तराखण्ड",
    districts: [
      "Dehradun", "Haridwar", "Nainital", "Udham Singh Nagar",
      "Almora", "Tehri Garhwal", "Pauri Garhwal",
    ],
    primaryCrops: ["wheat", "rice", "sugarcane", "soybean"],
    languageCode: "hi",
  },

  // ── JHARKHAND ──
  {
    id: "JH",
    name: "Jharkhand",
    nameLocal: "झारखण्ड",
    districts: [
      "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh",
      "Giridih", "Deoghar", "Dumka",
    ],
    primaryCrops: ["rice", "wheat", "maize", "potato"],
    languageCode: "hi",
  },

  // ── CHHATTISGARH ──
  {
    id: "CG",
    name: "Chhattisgarh",
    nameLocal: "छत्तीसगढ़",
    districts: [
      "Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon",
      "Durg", "Jagdalpur", "Raigarh",
    ],
    primaryCrops: ["rice", "wheat", "soybean", "sugarcane"],
    languageCode: "hi",
  },

  // ── GOA ──
  {
    id: "GA",
    name: "Goa",
    nameLocal: "गोवा",
    districts: ["North Goa", "South Goa"],
    primaryCrops: ["rice", "coconut", "cashew", "banana"],
    languageCode: "hi",
  },

  // ── ARUNACHAL PRADESH ──
  {
    id: "AR",
    name: "Arunachal Pradesh",
    nameLocal: "अरुणाचल प्रदेश",
    districts: ["Itanagar", "Naharlagun", "Tawang", "Pasighat", "Ziro"],
    primaryCrops: ["rice", "maize", "millet"],
    languageCode: "hi",
  },

  // ── MANIPUR ──
  {
    id: "MN",
    name: "Manipur",
    nameLocal: "মণিপুর",
    districts: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Senapati"],
    primaryCrops: ["rice", "maize", "mustard", "ginger"],
    languageCode: "hi",
  },

  // ── MEGHALAYA ──
  {
    id: "ML",
    name: "Meghalaya",
    nameLocal: "মেঘালয়",
    districts: ["Shillong", "Tura", "Jowai", "Baghmara", "Nongpoh"],
    primaryCrops: ["rice", "potato", "ginger", "turmeric"],
    languageCode: "hi",
  },

  // ── MIZORAM ──
  {
    id: "MZ",
    name: "Mizoram",
    nameLocal: "Mizoram",
    districts: ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
    primaryCrops: ["rice", "maize", "ginger", "turmeric"],
    languageCode: "hi",
  },

  // ── NAGALAND ──
  {
    id: "NL",
    name: "Nagaland",
    nameLocal: "Nagaland",
    districts: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha"],
    primaryCrops: ["rice", "maize", "millet", "potato"],
    languageCode: "hi",
  },

  // ── SIKKIM ──
  {
    id: "SK",
    name: "Sikkim",
    nameLocal: "Sikkim",
    districts: ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
    primaryCrops: ["rice", "maize", "cardamom", "ginger"],
    languageCode: "hi",
  },

  // ── TRIPURA ──
  {
    id: "TR",
    name: "Tripura",
    nameLocal: "ত্রিপুরা",
    districts: ["Agartala", "Udaipur", "Dharmanagar", "Ambassa", "Sabroom"],
    primaryCrops: ["rice", "jute", "tea", "rubber"],
    languageCode: "hi",
  },

  // ── UNION TERRITORIES ──

  // Delhi
  {
    id: "DL",
    name: "Delhi",
    nameLocal: "दिल्ली",
    districts: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "South Delhi", "West Delhi"],
    primaryCrops: ["wheat", "rice", "vegetable"],
    languageCode: "hi",
  },

  // Jammu & Kashmir
  {
    id: "JK",
    name: "Jammu & Kashmir",
    nameLocal: "जम्मू और कश्मीर",
    districts: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Pulwama", "Kupwara"],
    primaryCrops: ["rice", "wheat", "apple", "saffron"],
    languageCode: "hi",
  },

  // Ladakh
  {
    id: "LA",
    name: "Ladakh",
    nameLocal: "लद्दाख",
    districts: ["Leh", "Kargil"],
    primaryCrops: ["barley", "wheat", "pea", "apple"],
    languageCode: "hi",
  },

  // Chandigarh
  {
    id: "CH",
    name: "Chandigarh",
    nameLocal: "ਚੰਡੀਗੜ੍ਹ",
    districts: ["Chandigarh"],
    primaryCrops: ["wheat", "rice"],
    languageCode: "pa",
  },

  // Puducherry
  {
    id: "PY",
    name: "Puducherry",
    nameLocal: "புதுச்சேரி",
    districts: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    primaryCrops: ["rice", "sugarcane", "groundnut", "cotton"],
    languageCode: "hi",
  },

  // Andaman & Nicobar Islands
  {
    id: "AN",
    name: "Andaman & Nicobar Islands",
    nameLocal: "अंडमान और निकोबार द्वीपसमूह",
    districts: ["Port Blair", "North & Middle Andaman", "South Andaman"],
    primaryCrops: ["rice", "coconut", "banana", "pepper"],
    languageCode: "hi",
  },

  // Dadra & Nagar Haveli and Daman & Diu
  {
    id: "DD",
    name: "Dadra & Nagar Haveli and Daman & Diu",
    nameLocal: "दादरा और नगर हवेली और दमन और दीव",
    districts: ["Daman", "Diu", "Dadra & Nagar Haveli"],
    primaryCrops: ["rice", "wheat", "sugarcane"],
    languageCode: "hi",
  },

  // Lakshadweep
  {
    id: "LD",
    name: "Lakshadweep",
    nameLocal: "லட்சத்தீவுகள்",
    districts: ["Kavaratti"],
    primaryCrops: ["coconut", "banana"],
    languageCode: "hi",
  },
];

/** Lookup a state by its ISO id */
export function getStateById(id: string): StateInfo | undefined {
  return STATES.find((s) => s.id === id);
}

/** Lookup a state by a district name */
export function getStateByDistrict(district: string): StateInfo | undefined {
  return STATES.find((s) =>
    s.districts.some((d) => d.toLowerCase() === district.toLowerCase())
  );
}
