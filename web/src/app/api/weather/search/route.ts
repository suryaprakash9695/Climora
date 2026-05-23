import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const GEO_BASE = 'https://api.openweathermap.org/geo/1.0';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q');
  if (!q) return NextResponse.json({ error: 'Query required' }, { status: 400 });
  if (!WEATHER_API_KEY) {
    return NextResponse.json({ error: 'Weather API key not configured' }, { status: 500 });
  }

  try {
    const { data } = await axios.get(`${GEO_BASE}/direct`, {
      params: { q, limit: 5, appid: WEATHER_API_KEY },
    });

    // Transform to WeatherAPI format
    const transformed = data.map((item: any, index: number) => ({
      id: index + 1,
      name: item.name,
      region: item.state || '',
      country: item.country,
      lat: item.lat,
      lon: item.lon,
      url: `${item.name}-${item.country}`.toLowerCase().replace(/\s+/g, '-'),
    }));

    return NextResponse.json(transformed);
  } catch (err: unknown) {
    const message = axios.isAxiosError(err)
      ? err.response?.data?.message ?? 'Search failed'
      : 'Search failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
