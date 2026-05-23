import axios from 'axios';
import api from '@/api/axios';
import type { SearchResult, WeatherData } from '@/types';

const WEATHER_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const BASE = 'https://api.openweathermap.org/data/2.5';
const GEO_BASE = 'https://api.openweathermap.org/geo/1.0';

async function getCoordinates(q: string) {
  // Check if q is already coordinates (lat,lon)
  if (/^-?\d+\.?\d*,-?\d+\.?\d*$/.test(q)) {
    const [lat, lon] = q.split(',').map(Number);
    return { lat, lon, name: 'Current Location', country: '' };
  }

  // Geocode city name
  const { data } = await axios.get(`${GEO_BASE}/direct`, {
    params: { q, limit: 1, appid: WEATHER_KEY },
  });
  
  if (!data || data.length === 0) {
    throw new Error('Location not found');
  }

  return {
    lat: data[0].lat,
    lon: data[0].lon,
    name: data[0].name,
    country: data[0].country,
    state: data[0].state,
  };
}

async function directFetchCurrent(q: string): Promise<WeatherData> {
  if (!WEATHER_KEY) throw new Error('Weather API key not configured');
  
  const location = await getCoordinates(q);
  
  const [weatherRes, airRes] = await Promise.all([
    axios.get(`${BASE}/weather`, {
      params: { lat: location.lat, lon: location.lon, appid: WEATHER_KEY, units: 'metric' },
    }),
    axios.get(`${BASE}/air_pollution`, {
      params: { lat: location.lat, lon: location.lon, appid: WEATHER_KEY },
    }).catch(() => null),
  ]);

  const weather = weatherRes.data;
  const air = airRes?.data;

  return {
    location: {
      name: location.name,
      region: location.state || '',
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      localtime: new Date().toISOString(),
    },
    current: {
      temp_c: weather.main.temp,
      temp_f: (weather.main.temp * 9/5) + 32,
      feelslike_c: weather.main.feels_like,
      feelslike_f: (weather.main.feels_like * 9/5) + 32,
      condition: {
        text: weather.weather[0].description,
        icon: `//openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
        code: weather.weather[0].id,
      },
      humidity: weather.main.humidity,
      wind_kph: weather.wind.speed * 3.6,
      pressure_mb: weather.main.pressure,
      vis_km: weather.visibility ? weather.visibility / 1000 : 10,
      uv: 0,
      air_quality: air ? {
        'us-epa-index': air.list[0].main.aqi,
        pm2_5: air.list[0].components.pm2_5,
        pm10: air.list[0].components.pm10,
        o3: air.list[0].components.o3,
      } : undefined,
    },
  };
}

async function directFetchForecast(q: string): Promise<WeatherData> {
  if (!WEATHER_KEY) throw new Error('Weather API key not configured');
  
  const location = await getCoordinates(q);
  
  const [currentRes, forecastRes, airRes] = await Promise.all([
    axios.get(`${BASE}/weather`, {
      params: { lat: location.lat, lon: location.lon, appid: WEATHER_KEY, units: 'metric' },
    }),
    axios.get(`${BASE}/forecast`, {
      params: { lat: location.lat, lon: location.lon, appid: WEATHER_KEY, units: 'metric', cnt: 56 },
    }),
    axios.get(`${BASE}/air_pollution`, {
      params: { lat: location.lat, lon: location.lon, appid: WEATHER_KEY },
    }).catch(() => null),
  ]);

  const current = currentRes.data;
  const forecast = forecastRes.data;
  const air = airRes?.data;

  // Group forecast by day
  const dailyForecasts: Record<string, any[]> = {};
  forecast.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000).toISOString().split('T')[0];
    if (!dailyForecasts[date]) dailyForecasts[date] = [];
    dailyForecasts[date].push(item);
  });

  const forecastDays = Object.entries(dailyForecasts).slice(0, 7).map(([date, items]) => {
    const temps = items.map((i: any) => i.main.temp);
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    const rainChance = Math.max(...items.map((i: any) => (i.pop || 0) * 100));
    
    const middayItem = items[Math.floor(items.length / 2)] || items[0];

    return {
      date,
      day: {
        maxtemp_c: maxTemp,
        mintemp_c: minTemp,
        condition: {
          text: middayItem.weather[0].description,
          icon: `//openweathermap.org/img/wn/${middayItem.weather[0].icon}@2x.png`,
          code: middayItem.weather[0].id,
        },
        daily_chance_of_rain: Math.round(rainChance),
      },
      astro: {
        sunrise: '06:00 AM',
        sunset: '06:00 PM',
      },
    };
  });

  return {
    location: {
      name: location.name,
      region: location.state || '',
      country: location.country,
      lat: location.lat,
      lon: location.lon,
      localtime: new Date().toISOString(),
    },
    current: {
      temp_c: current.main.temp,
      temp_f: (current.main.temp * 9/5) + 32,
      feelslike_c: current.main.feels_like,
      feelslike_f: (current.main.feels_like * 9/5) + 32,
      condition: {
        text: current.weather[0].description,
        icon: `//openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
        code: current.weather[0].id,
      },
      humidity: current.main.humidity,
      wind_kph: current.wind.speed * 3.6,
      pressure_mb: current.main.pressure,
      vis_km: current.visibility ? current.visibility / 1000 : 10,
      uv: 0,
      air_quality: air ? {
        'us-epa-index': air.list[0].main.aqi,
        pm2_5: air.list[0].components.pm2_5,
        pm10: air.list[0].components.pm10,
        o3: air.list[0].components.o3,
      } : undefined,
    },
    forecast: {
      forecastday: forecastDays,
    },
  };
}

export async function fetchCurrentWeather(q: string): Promise<WeatherData> {
  try {
    const { data } = await api.get<WeatherData>('/api/weather/current', { params: { q } });
    return data;
  } catch {
    return directFetchCurrent(q);
  }
}

export async function fetchForecast(q: string): Promise<WeatherData> {
  try {
    const { data } = await api.get<WeatherData>('/api/weather/forecast', {
      params: { q, days: 7 },
    });
    return data;
  } catch {
    return directFetchForecast(q);
  }
}

export async function searchCities(q: string): Promise<SearchResult[]> {
  try {
    const { data } = await api.get<SearchResult[]>('/api/weather/search', { params: { q } });
    return data;
  } catch {
    if (!WEATHER_KEY) throw new Error('Weather API key not configured');
    const { data } = await axios.get(`${GEO_BASE}/direct`, {
      params: { q, limit: 5, appid: WEATHER_KEY },
    });
    return data.map((item: any, index: number) => ({
      id: index + 1,
      name: item.name,
      region: item.state || '',
      country: item.country,
    }));
  }
}
