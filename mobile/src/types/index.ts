export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  condition: WeatherCondition;
  humidity: number;
  wind_kph: number;
  pressure_mb: number;
  vis_km: number;
  uv: number;
  is_day?: number;
  air_quality?: AirQuality;
}

export interface AirQuality {
  'us-epa-index': number;
  pm2_5: number;
  pm10: number;
  o3: number;
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

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: WeatherCondition;
    daily_chance_of_rain: number;
  };
  astro: { sunrise: string; sunset: string };
  hour?: ForecastHour[];
}

export interface WeatherData {
  location: WeatherLocation;
  current: CurrentWeather;
  forecast?: { forecastday: ForecastDay[] };
}

export interface SearchResult {
  id: number;
  name: string;
  region: string;
  country: string;
}

export interface AIInsight {
  summary: string;
  outfit: string;
  fitness: string;
  travel: string;
  alerts: string[];
  hydration: string;
}

export interface SavedCity {
  id: string;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}
