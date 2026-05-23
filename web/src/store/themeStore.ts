import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TemperatureUnit, UserPreferences } from '@/types';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  temperatureUnit: TemperatureUnit;
  language: string;
  notifications: UserPreferences['notifications'];
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setLanguage: (language: string) => void;
  setNotifications: (n: Partial<UserPreferences['notifications']>) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      temperatureUnit: 'celsius',
      language: 'en',
      notifications: {
        rainAlerts: true,
        stormWarnings: true,
        extremeWeather: true,
        dailySummary: true,
      },
      setTheme: (theme) => set({ theme }),
      setTemperatureUnit: (temperatureUnit) => set({ temperatureUnit }),
      setLanguage: (language) => set({ language }),
      setNotifications: (n) =>
        set({ notifications: { ...get().notifications, ...n } }),
    }),
    { name: 'climora-theme' }
  )
);
