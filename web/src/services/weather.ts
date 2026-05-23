import api from '@/api/axios';
import type { SearchResult, WeatherData } from '@/types';

export async function fetchCurrentWeather(q: string): Promise<WeatherData> {
  const { data } = await api.get<WeatherData>('/api/weather/current', { params: { q } });
  return data;
}

export async function fetchForecast(q: string, days = 7): Promise<WeatherData> {
  const { data } = await api.get<WeatherData>('/api/weather/forecast', {
    params: { q, days },
  });
  return data;
}

export async function searchCities(q: string): Promise<SearchResult[]> {
  const { data } = await api.get<SearchResult[]>('/api/weather/search', { params: { q } });
  return data;
}

export async function fetchAirQuality(q: string) {
  const { data } = await api.get('/api/weather/airquality', { params: { q } });
  return data;
}
