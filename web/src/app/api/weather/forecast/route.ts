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
  const days = parseInt(req.nextUrl.searchParams.get('days') ?? '7');
  if (!q) return NextResponse.json({ error: 'Query required' }, { status: 400 });
  if (!WEATHER_API_KEY) {
    return NextResponse.json({ error: 'Weather API key not configured' }, { status: 500 });
  }

  try {
    const location = await getCoordinates(q);
    
    // Fetch current weather, forecast, and air quality
    const [currentRes, forecastRes, airRes] = await Promise.all([
      axios.get(`${BASE}/weather`, {
        params: { lat: location.lat, lon: location.lon, appid: WEATHER_API_KEY, units: 'metric' },
      }),
      axios.get(`${BASE}/forecast`, {
        params: { lat: location.lat, lon: location.lon, appid: WEATHER_API_KEY, units: 'metric', cnt: days * 8 },
      }),
      axios.get(`${BASE}/air_pollution`, {
        params: { lat: location.lat, lon: location.lon, appid: WEATHER_API_KEY },
      }).catch(() => null),
    ]);

    const current = currentRes.data;
    const forecast = forecastRes.data;
    const air = airRes?.data;

    // Group forecast by day
    const dailyForecasts: Record<string, any[]> = {};
    forecast.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyForecasts[date]) dailyForecasts[date] = [];
      dailyForecasts[date].push(item);
    });

    // Transform to WeatherAPI format
    const forecastDays = Object.entries(dailyForecasts).slice(0, days).map(([date, items]) => {
      const temps = items.map((i: any) => i.main.temp);
      const maxTemp = Math.max(...temps);
      const minTemp = Math.min(...temps);
      const rainChance = Math.max(...items.map((i: any) => (i.pop || 0) * 100));
      const avgHumidity = items.reduce((sum: number, i: any) => sum + i.main.humidity, 0) / items.length;
      
      // Get midday weather for condition
      const middayItem = items[Math.floor(items.length / 2)] || items[0];
      
      // Calculate sunrise/sunset (approximate)
      const sunrise = new Date(items[0].dt * 1000);
      sunrise.setHours(6, 0, 0);
      const sunset = new Date(items[0].dt * 1000);
      sunset.setHours(18, 0, 0);

      return {
        date,
        day: {
          maxtemp_c: maxTemp,
          mintemp_c: minTemp,
          maxtemp_f: (maxTemp * 9/5) + 32,
          mintemp_f: (minTemp * 9/5) + 32,
          condition: {
            text: middayItem.weather[0].description,
            icon: `//openweathermap.org/img/wn/${middayItem.weather[0].icon}@2x.png`,
            code: middayItem.weather[0].id,
          },
          daily_chance_of_rain: Math.round(rainChance),
          avghumidity: Math.round(avgHumidity),
        },
        astro: {
          sunrise: sunrise.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          sunset: sunset.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        },
        hour: items.map((item: any) => ({
          time: item.dt_txt,
          temp_c: item.main.temp,
          temp_f: (item.main.temp * 9/5) + 32,
          condition: {
            text: item.weather[0].description,
            icon: `//openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
            code: item.weather[0].id,
          },
          chance_of_rain: Math.round((item.pop || 0) * 100),
          humidity: item.main.humidity,
          wind_kph: item.wind.speed * 3.6,
        })),
      };
    });

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
        wind_mph: current.wind.speed * 2.237,
        pressure_mb: current.main.pressure,
        vis_km: current.visibility ? current.visibility / 1000 : 10,
        uv: 0,
        is_day: current.weather[0].icon.includes('d') ? 1 : 0,
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
      forecast: {
        forecastday: forecastDays,
      },
    };

    return NextResponse.json(transformed);
  } catch (err: unknown) {
    const message = axios.isAxiosError(err)
      ? err.response?.data?.message ?? 'Forecast fetch failed'
      : err instanceof Error ? err.message : 'Forecast fetch failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
