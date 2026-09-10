// Mock data: Crop types
export interface Crop {
  id: string;
  name: string;
  nameHi: string;
  variety: string;
  icon: string;
  season: "Kharif" | "Rabi" | "Zaid";
  image: string;
}

export const CROPS: Crop[] = [
  {
    id: "cotton",
    name: "Cotton",
    nameHi: "कपास",
    variety: "Bt Cotton",
    icon: "🌿",
    season: "Kharif",
    image: "https://images.unsplash.com/photo-1628352081506-83c43123a6b9?w=400&q=80",
  },
  {
    id: "soybean",
    name: "Soybean",
    nameHi: "सोयाबीन",
    variety: "JS-335",
    icon: "🫘",
    season: "Kharif",
    image: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=400&q=80",
  },
  {
    id: "wheat",
    name: "Wheat",
    nameHi: "गेहूं",
    variety: "GW-496",
    icon: "🌾",
    season: "Rabi",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80",
  },
  {
    id: "rice",
    name: "Rice",
    nameHi: "चावल",
    variety: "Sona Masuri / Basmati",
    icon: "🌾",
    season: "Kharif",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&q=80",
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    nameHi: "गन्ना",
    variety: "Co-86032",
    icon: "🎋",
    season: "Zaid",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
  {
    id: "tomato",
    name: "Tomato",
    nameHi: "टमाटर",
    variety: "Hybrid",
    icon: "🍅",
    season: "Rabi",
    image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&q=80",
  },
  {
    id: "onion",
    name: "Onion",
    nameHi: "प्याज",
    variety: "Nasik Red",
    icon: "🧅",
    season: "Rabi",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&q=80",
  },
  {
    id: "grape",
    name: "Grape",
    nameHi: "अंगूर",
    variety: "Thompson Seedless",
    icon: "🍇",
    season: "Rabi",
    image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&q=80",
  },
  {
    id: "orange",
    name: "Orange",
    nameHi: "संतरा",
    variety: "Nagpur Mandarin",
    icon: "🍊",
    season: "Rabi",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=400&q=80",
  },
];
