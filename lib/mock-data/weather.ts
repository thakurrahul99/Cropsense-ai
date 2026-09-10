// Mock data: Weather — district-aware lookup
export interface WeatherData {
  location: string;
  district: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  windDir: string;
  condition: string;
  conditionCode: "sunny" | "cloudy" | "rain" | "storm" | "partly-cloudy" | "foggy";
  uvIndex: number;
  soilMoisture: number;
  nextRainForecast: string;
  weekForecast: {
    day: string;
    high: number;
    low: number;
    condition: string;
    rainfall: number;
  }[];
}

// Small lookup table keyed by district name (case-insensitive)
const DISTRICT_WEATHER: Record<string, WeatherData> = {
  // ── Maharashtra ──
  wardha: {
    location: "Wardha, Maharashtra",
    district: "Wardha",
    temp: 34,
    feelsLike: 38,
    humidity: 78,
    rainfall: 12,
    windSpeed: 14,
    windDir: "SW",
    condition: "Partly Cloudy",
    conditionCode: "partly-cloudy",
    uvIndex: 7,
    soilMoisture: 65,
    nextRainForecast: "Tomorrow, 60% chance",
    weekForecast: [
      { day: "Today", high: 34, low: 26, condition: "Partly Cloudy", rainfall: 12 },
      { day: "Thu", high: 32, low: 25, condition: "Rain", rainfall: 24 },
      { day: "Fri", high: 30, low: 24, condition: "Heavy Rain", rainfall: 38 },
      { day: "Sat", high: 31, low: 25, condition: "Cloudy", rainfall: 8 },
      { day: "Sun", high: 33, low: 26, condition: "Partly Cloudy", rainfall: 2 },
      { day: "Mon", high: 35, low: 27, condition: "Sunny", rainfall: 0 },
      { day: "Tue", high: 36, low: 28, condition: "Sunny", rainfall: 0 },
    ],
  },
  latur: {
    location: "Latur, Maharashtra",
    district: "Latur",
    temp: 31,
    feelsLike: 34,
    humidity: 65,
    rainfall: 0,
    windSpeed: 10,
    windDir: "NW",
    condition: "Sunny",
    conditionCode: "sunny",
    uvIndex: 8,
    soilMoisture: 42,
    nextRainForecast: "In 3 days, 40% chance",
    weekForecast: [
      { day: "Today", high: 31, low: 23, condition: "Sunny", rainfall: 0 },
      { day: "Thu", high: 32, low: 24, condition: "Sunny", rainfall: 0 },
      { day: "Fri", high: 33, low: 24, condition: "Partly Cloudy", rainfall: 2 },
      { day: "Sat", high: 30, low: 22, condition: "Rain", rainfall: 18 },
      { day: "Sun", high: 29, low: 22, condition: "Cloudy", rainfall: 6 },
      { day: "Mon", high: 31, low: 23, condition: "Partly Cloudy", rainfall: 0 },
      { day: "Tue", high: 32, low: 24, condition: "Sunny", rainfall: 0 },
    ],
  },
  nashik: {
    location: "Nashik, Maharashtra",
    district: "Nashik",
    temp: 28,
    feelsLike: 30,
    humidity: 58,
    rainfall: 0,
    windSpeed: 12,
    windDir: "W",
    condition: "Partly Cloudy",
    conditionCode: "partly-cloudy",
    uvIndex: 6,
    soilMoisture: 50,
    nextRainForecast: "Day after tomorrow, 55% chance",
    weekForecast: [
      { day: "Today", high: 28, low: 20, condition: "Partly Cloudy", rainfall: 0 },
      { day: "Thu", high: 27, low: 19, condition: "Cloudy", rainfall: 4 },
      { day: "Fri", high: 26, low: 18, condition: "Rain", rainfall: 22 },
      { day: "Sat", high: 28, low: 20, condition: "Partly Cloudy", rainfall: 3 },
      { day: "Sun", high: 30, low: 21, condition: "Sunny", rainfall: 0 },
      { day: "Mon", high: 31, low: 22, condition: "Sunny", rainfall: 0 },
      { day: "Tue", high: 29, low: 21, condition: "Partly Cloudy", rainfall: 1 },
    ],
  },

  // ── Punjab ──
  ludhiana: {
    location: "Ludhiana, Punjab",
    district: "Ludhiana",
    temp: 30,
    feelsLike: 33,
    humidity: 60,
    rainfall: 0,
    windSpeed: 16,
    windDir: "NW",
    condition: "Sunny",
    conditionCode: "sunny",
    uvIndex: 9,
    soilMoisture: 48,
    nextRainForecast: "In 4 days, 30% chance",
    weekForecast: [
      { day: "Today", high: 30, low: 20, condition: "Sunny", rainfall: 0 },
      { day: "Thu", high: 31, low: 21, condition: "Sunny", rainfall: 0 },
      { day: "Fri", high: 32, low: 22, condition: "Partly Cloudy", rainfall: 0 },
      { day: "Sat", high: 30, low: 21, condition: "Partly Cloudy", rainfall: 5 },
      { day: "Sun", high: 28, low: 19, condition: "Rain", rainfall: 15 },
      { day: "Mon", high: 29, low: 20, condition: "Cloudy", rainfall: 3 },
      { day: "Tue", high: 31, low: 21, condition: "Sunny", rainfall: 0 },
    ],
  },
  amritsar: {
    location: "Amritsar, Punjab",
    district: "Amritsar",
    temp: 29,
    feelsLike: 32,
    humidity: 55,
    rainfall: 0,
    windSpeed: 14,
    windDir: "N",
    condition: "Sunny",
    conditionCode: "sunny",
    uvIndex: 8,
    soilMoisture: 45,
    nextRainForecast: "In 5 days, 25% chance",
    weekForecast: [
      { day: "Today", high: 29, low: 18, condition: "Sunny", rainfall: 0 },
      { day: "Thu", high: 30, low: 19, condition: "Sunny", rainfall: 0 },
      { day: "Fri", high: 31, low: 20, condition: "Partly Cloudy", rainfall: 0 },
      { day: "Sat", high: 29, low: 19, condition: "Cloudy", rainfall: 4 },
      { day: "Sun", high: 27, low: 17, condition: "Rain", rainfall: 12 },
      { day: "Mon", high: 28, low: 18, condition: "Partly Cloudy", rainfall: 2 },
      { day: "Tue", high: 30, low: 19, condition: "Sunny", rainfall: 0 },
    ],
  },

  // ── West Bengal ──
  burdwan: {
    location: "Burdwan, West Bengal",
    district: "Burdwan",
    temp: 33,
    feelsLike: 38,
    humidity: 82,
    rainfall: 18,
    windSpeed: 8,
    windDir: "SW",
    condition: "Rain",
    conditionCode: "rain",
    uvIndex: 4,
    soilMoisture: 78,
    nextRainForecast: "Today evening, 85% chance",
    weekForecast: [
      { day: "Today", high: 33, low: 26, condition: "Rain", rainfall: 28 },
      { day: "Thu", high: 31, low: 25, condition: "Heavy Rain", rainfall: 45 },
      { day: "Fri", high: 30, low: 25, condition: "Rain", rainfall: 32 },
      { day: "Sat", high: 32, low: 25, condition: "Partly Cloudy", rainfall: 8 },
      { day: "Sun", high: 34, low: 26, condition: "Partly Cloudy", rainfall: 4 },
      { day: "Mon", high: 35, low: 27, condition: "Sunny", rainfall: 0 },
      { day: "Tue", high: 33, low: 26, condition: "Partly Cloudy", rainfall: 2 },
    ],
  },
  murshidabad: {
    location: "Murshidabad, West Bengal",
    district: "Murshidabad",
    temp: 34,
    feelsLike: 40,
    humidity: 84,
    rainfall: 22,
    windSpeed: 7,
    windDir: "S",
    condition: "Rain",
    conditionCode: "rain",
    uvIndex: 3,
    soilMoisture: 82,
    nextRainForecast: "Tonight, 90% chance",
    weekForecast: [
      { day: "Today", high: 34, low: 27, condition: "Heavy Rain", rainfall: 42 },
      { day: "Thu", high: 32, low: 26, condition: "Rain", rainfall: 30 },
      { day: "Fri", high: 31, low: 25, condition: "Cloudy", rainfall: 12 },
      { day: "Sat", high: 33, low: 25, condition: "Partly Cloudy", rainfall: 5 },
      { day: "Sun", high: 35, low: 27, condition: "Partly Cloudy", rainfall: 2 },
      { day: "Mon", high: 36, low: 28, condition: "Sunny", rainfall: 0 },
      { day: "Tue", high: 35, low: 27, condition: "Partly Cloudy", rainfall: 3 },
    ],
  },

  // ── Karnataka ──
  belagavi: {
    location: "Belagavi, Karnataka",
    district: "Belagavi",
    temp: 27,
    feelsLike: 29,
    humidity: 70,
    rainfall: 8,
    windSpeed: 11,
    windDir: "W",
    condition: "Partly Cloudy",
    conditionCode: "partly-cloudy",
    uvIndex: 6,
    soilMoisture: 60,
    nextRainForecast: "Tomorrow, 65% chance",
    weekForecast: [
      { day: "Today", high: 27, low: 20, condition: "Partly Cloudy", rainfall: 8 },
      { day: "Thu", high: 26, low: 19, condition: "Rain", rainfall: 20 },
      { day: "Fri", high: 25, low: 18, condition: "Rain", rainfall: 28 },
      { day: "Sat", high: 27, low: 20, condition: "Cloudy", rainfall: 10 },
      { day: "Sun", high: 28, low: 21, condition: "Partly Cloudy", rainfall: 3 },
      { day: "Mon", high: 29, low: 21, condition: "Sunny", rainfall: 0 },
      { day: "Tue", high: 28, low: 20, condition: "Partly Cloudy", rainfall: 2 },
    ],
  },

  // ── Tamil Nadu ──
  thanjavur: {
    location: "Thanjavur, Tamil Nadu",
    district: "Thanjavur",
    temp: 36,
    feelsLike: 42,
    humidity: 76,
    rainfall: 0,
    windSpeed: 9,
    windDir: "SE",
    condition: "Sunny",
    conditionCode: "sunny",
    uvIndex: 10,
    soilMoisture: 55,
    nextRainForecast: "In 2 days, 45% chance",
    weekForecast: [
      { day: "Today", high: 36, low: 26, condition: "Sunny", rainfall: 0 },
      { day: "Thu", high: 37, low: 27, condition: "Sunny", rainfall: 0 },
      { day: "Fri", high: 35, low: 26, condition: "Partly Cloudy", rainfall: 6 },
      { day: "Sat", high: 33, low: 25, condition: "Rain", rainfall: 22 },
      { day: "Sun", high: 34, low: 25, condition: "Partly Cloudy", rainfall: 4 },
      { day: "Mon", high: 36, low: 26, condition: "Sunny", rainfall: 0 },
      { day: "Tue", high: 37, low: 27, condition: "Sunny", rainfall: 0 },
    ],
  },
};

/** Fallback weather used for unknown districts */
export const DEFAULT_WEATHER: WeatherData = {
  location: "India",
  district: "Default",
  temp: 32,
  feelsLike: 36,
  humidity: 68,
  rainfall: 5,
  windSpeed: 12,
  windDir: "SW",
  condition: "Partly Cloudy",
  conditionCode: "partly-cloudy",
  uvIndex: 7,
  soilMoisture: 55,
  nextRainForecast: "In 2 days, 50% chance",
  weekForecast: [
    { day: "Today", high: 32, low: 24, condition: "Partly Cloudy", rainfall: 5 },
    { day: "Thu", high: 31, low: 23, condition: "Rain", rainfall: 20 },
    { day: "Fri", high: 29, low: 22, condition: "Rain", rainfall: 35 },
    { day: "Sat", high: 30, low: 23, condition: "Cloudy", rainfall: 8 },
    { day: "Sun", high: 32, low: 24, condition: "Partly Cloudy", rainfall: 2 },
    { day: "Mon", high: 34, low: 25, condition: "Sunny", rainfall: 0 },
    { day: "Tue", high: 35, low: 26, condition: "Sunny", rainfall: 0 },
  ],
};

/**
 * Returns weather data for the given district.
 * Falls back to DEFAULT_WEATHER if the district is not in the lookup table.
 */
export function getWeatherForDistrict(district: string): WeatherData {
  const key = district.toLowerCase().trim();
  return DISTRICT_WEATHER[key] ?? DEFAULT_WEATHER;
}

/**
 * @deprecated Use getWeatherForDistrict() instead.
 * Kept for backward compatibility — points to Wardha (the original default).
 */
export const WEATHER = getWeatherForDistrict("wardha");
