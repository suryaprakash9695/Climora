export const APP_NAME = 'Climora';
export const APP_TAGLINE = 'Smart Weather. Smarter Living.';
export const APP_DESCRIPTION =
  'An AI-powered weather platform delivering real-time forecasts, smart climate insights, and personalized recommendations for everyday life.';

export const TRENDING_CITIES = [
  'London',
  'New York',
  'Tokyo',
  'Paris',
  'Dubai',
  'Sydney',
  'Singapore',
  'Mumbai',
];

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'ja', label: '日本語' },
];

export const AQI_LEVELS = [
  { min: 0, max: 50, label: 'Good', color: '#22c55e' },
  { min: 51, max: 100, label: 'Moderate', color: '#eab308' },
  { min: 101, max: 150, label: 'Unhealthy for Sensitive', color: '#f97316' },
  { min: 151, max: 200, label: 'Unhealthy', color: '#ef4444' },
  { min: 201, max: 300, label: 'Very Unhealthy', color: '#a855f7' },
  { min: 301, max: 500, label: 'Hazardous', color: '#7f1d1d' },
];

export const CACHE_TTL_MS = 10 * 60 * 1000;

export const FEATURES = [
  {
    title: 'Real-Time Forecasts',
    description: 'Hyper-accurate weather data updated every minute from global stations.',
    icon: 'cloud-sun',
  },
  {
    title: 'AI Climate Intelligence',
    description: 'Groq-powered insights for outfits, fitness, travel, and daily planning.',
    icon: 'brain',
  },
  {
    title: 'Air Quality Monitoring',
    description: 'Track AQI, pollutants, and health recommendations in real time.',
    icon: 'wind',
  },
  {
    title: 'Smart Notifications',
    description: 'Rain alerts, storm warnings, and personalized daily summaries.',
    icon: 'bell',
  },
  {
    title: 'Multi-City Tracking',
    description: 'Save favorites, recent searches, and trending destinations.',
    icon: 'map-pin',
  },
  {
    title: 'Cross-Platform',
    description: 'Seamless experience on web and mobile with synced preferences.',
    icon: 'smartphone',
  },
];
