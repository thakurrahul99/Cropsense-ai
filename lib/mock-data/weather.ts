// Mock data: Weather
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

export const WEATHER: WeatherData = {
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
};
