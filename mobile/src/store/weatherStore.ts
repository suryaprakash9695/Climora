import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AIInsight, WeatherData } from '@/types';

interface WeatherState {
  current: WeatherData | null;
  forecast: WeatherData | null;
  aiInsights: AIInsight | null;
  recentSearches: string[];
  activeCity: string;
  temperatureUnit: 'celsius' | 'fahrenheit';
  theme: 'dark' | 'light';
  loading: boolean;
  setCurrent: (d: WeatherData | null) => void;
  setForecast: (d: WeatherData | null) => void;
  setAIInsights: (i: AIInsight | null) => void;
  addRecent: (city: string) => void;
  setActiveCity: (city: string) => void;
  setLoading: (l: boolean) => void;
  setTemperatureUnit: (u: 'celsius' | 'fahrenheit') => void;
  setTheme: (t: 'dark' | 'light') => void;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      current: null,
      forecast: null,
      aiInsights: null,
      recentSearches: [],
      activeCity: 'London',
      temperatureUnit: 'celsius',
      theme: 'dark',
      loading: false,
      setCurrent: (current) => set({ current }),
      setForecast: (forecast) => set({ forecast }),
      setAIInsights: (aiInsights) => set({ aiInsights }),
      addRecent: (city) =>
        set({
          recentSearches: [city, ...get().recentSearches.filter((c) => c !== city)].slice(0, 10),
        }),
      setActiveCity: (activeCity) => set({ activeCity }),
      setLoading: (loading) => set({ loading }),
      setTemperatureUnit: (temperatureUnit) => set({ temperatureUnit }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'climora-mobile',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({
        recentSearches: s.recentSearches,
        activeCity: s.activeCity,
        temperatureUnit: s.temperatureUnit,
        theme: s.theme,
      }),
    }
  )
);
