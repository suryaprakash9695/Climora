import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AIInsight, SavedCity, WeatherData } from '@/types';

interface WeatherState {
  current: WeatherData | null;
  forecast: WeatherData | null;
  aiInsights: AIInsight | null;
  savedCities: SavedCity[];
  recentSearches: string[];
  loading: boolean;
  error: string | null;
  activeCity: string;
  setCurrent: (data: WeatherData | null) => void;
  setForecast: (data: WeatherData | null) => void;
  setAIInsights: (insights: AIInsight | null) => void;
  setSavedCities: (cities: SavedCity[]) => void;
  addRecentSearch: (city: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setActiveCity: (city: string) => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      current: null,
      forecast: null,
      aiInsights: null,
      savedCities: [],
      recentSearches: [],
      loading: false,
      error: null,
      activeCity: 'London',
      setCurrent: (current) => set({ current }),
      setForecast: (forecast) => set({ forecast }),
      setAIInsights: (aiInsights) => set({ aiInsights }),
      setSavedCities: (savedCities) => set({ savedCities }),
      addRecentSearch: (city) => {
        const recent = [city, ...get().recentSearches.filter((c) => c !== city)].slice(0, 10);
        set({ recentSearches: recent });
      },
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setActiveCity: (activeCity) => set({ activeCity }),
    }),
    {
      name: 'climora-weather',
      partialize: (s) => ({
        recentSearches: s.recentSearches,
        activeCity: s.activeCity,
        savedCities: s.savedCities,
      }),
    }
  )
);
