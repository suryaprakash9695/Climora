export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

export interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  condition: WeatherCondition;
  humidity: number;
  wind_kph: number;
  wind_mph: number;
  pressure_mb: number;
  vis_km: number;
  uv: number;
  is_day: number;
  air_quality?: AirQuality;
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    maxtemp_f: number;
    mintemp_f: number;
    condition: WeatherCondition;
    daily_chance_of_rain: number;
    avghumidity: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
  hour: ForecastHour[];
}

export interface ForecastHour {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  chance_of_rain: number;
  humidity: number;
  wind_kph: number;
}

export interface AirQuality {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  'us-epa-index': number;
  'gb-defra-index': number;
}

export interface WeatherData {
  location: WeatherLocation;
  current: CurrentWeather;
  forecast?: { forecastday: ForecastDay[] };
  air_quality?: AirQuality;
}

export interface SearchResult {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

export interface SavedCity {
  id: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  addedAt: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  temperatureUnit: 'celsius' | 'fahrenheit';
  language: string;
  notifications: {
    rainAlerts: boolean;
    stormWarnings: boolean;
    extremeWeather: boolean;
    dailySummary: boolean;
  };
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  preferences: UserPreferences;
}

export interface AIInsight {
  summary: string;
  outfit: string;
  fitness: string;
  travel: string;
  alerts: string[];
  hydration: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
