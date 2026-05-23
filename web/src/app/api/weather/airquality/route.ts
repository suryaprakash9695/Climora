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
    
    const { data } = await axios.get(`${BASE}/air_pollution`, {
      params: { lat: location.lat, lon: location.lon, appid: WEATHER_API_KEY },
    });

    const air = data.list[0];

    return NextResponse.json({
      air_quality: {
        'us-epa-index': air.main.aqi,
        pm2_5: air.components.pm2_5,
        pm10: air.components.pm10,
        o3: air.components.o3,
        co: air.components.co,
        no2: air.components.no2,
        so2: air.components.so2,
      },
      location: {
        name: location.name,
        region: location.state || '',
        country: location.country,
        lat: location.lat,
        lon: location.lon,
      },
    });
  } catch (err: unknown) {
    const message = axios.isAxiosError(err)
      ? err.response?.data?.message ?? 'AQI fetch failed'
      : err instanceof Error ? err.message : 'AQI fetch failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
