import { AQI_LEVELS } from '@/constants';
import type { TemperatureUnit } from '@/types';

export function formatTemp(value: number, unit: TemperatureUnit): string {
  return unit === 'fahrenheit' ? `${Math.round(value)}°F` : `${Math.round(value)}°C`;
}

export function convertTemp(celsius: number, unit: TemperatureUnit): number {
  return unit === 'fahrenheit' ? (celsius * 9) / 5 + 32 : celsius;
}

export function getAqiInfo(index: number) {
  return (
    AQI_LEVELS.find((l) => index >= l.min && index <= l.max) ?? {
      label: 'Unknown',
      color: '#94a3b8',
    }
  );
}

export function getWeatherIconUrl(icon: string): string {
  if (icon.startsWith('http')) return icon;
  return icon.startsWith('//') ? `https:${icon}` : `https:${icon}`;
}

export function formatTime(time: string): string {
  try {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return time;
  }
}

export function formatDate(date: string): string {
  try {
    return new Date(date).toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return date;
  }
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function cacheKey(prefix: string, query: string): string {
  return `climora_${prefix}_${query.toLowerCase().trim()}`;
}
