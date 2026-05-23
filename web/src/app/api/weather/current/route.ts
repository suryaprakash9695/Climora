import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
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
    params: { q, limit: 1, appid: WEATHER_API_KEY },
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

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q');
  if (!q) return NextResponse.json({ error: 'Query required' }, { status: 400 });
  if (!WEATHER_API_KEY) {
    return NextResponse.json({ error: 'Weather API key not configured' }, { status: 500 });
  }

  try {
    const location = await getCoordinates(q);
    
    // Fetch current weather and air quality
    const [weatherRes, airRes] = await Promise.all([
      axios.get(`${BASE}/weather`, {
        params: { lat: location.lat, lon: location.lon, appid: WEATHER_API_KEY, units: 'metric' },
      }),
      axios.get(`${BASE}/air_pollution`, {
        params: { lat: location.lat, lon: location.lon, appid: WEATHER_API_KEY },
      }).catch(() => null),
    ]);

    const weather = weatherRes.data;
    const air = airRes?.data;

    // Transform to WeatherAPI format
    const transformed = {
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
        wind_mph: weather.wind.speed * 2.237,
        pressure_mb: weather.main.pressure,
        vis_km: weather.visibility ? weather.visibility / 1000 : 10,
        uv: 0, // OpenWeather doesn't provide UV in free tier
        is_day: weather.weather[0].icon.includes('d') ? 1 : 0,
        air_quality: air ? {
          'us-epa-index': air.list[0].main.aqi,
          pm2_5: air.list[0].components.pm2_5,
          pm10: air.list[0].components.pm10,
          o3: air.list[0].components.o3,
          co: air.list[0].components.co,
          no2: air.list[0].components.no2,
          so2: air.list[0].components.so2,
        } : undefined,
      },
    };

    return NextResponse.json(transformed);
  } catch (err: unknown) {
    const message = axios.isAxiosError(err)
      ? err.response?.data?.message ?? 'Weather fetch failed'
      : err instanceof Error ? err.message : 'Weather fetch failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
