# Climora

**Smart Weather. Smarter Living.**

An AI-powered weather platform delivering real-time forecasts, smart climate insights, and personalized recommendations for everyday life.

## Project Structure

```
Climora/
├── web/          # Next.js 15 web application
├── mobile/       # React Native (Expo) mobile application
└── README.md
```

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Web | Next.js 15, TypeScript, Tailwind CSS, Framer Motion |
| Mobile | Expo, React Native, TypeScript, NativeWind, Reanimated |
| APIs | OpenWeatherMap, Groq AI |
| State | Zustand |
| Deploy | Vercel (web), EAS Build (mobile) |

## Features

- Real-time weather & 7-day forecasts
- Air quality (AQI) monitoring
- AI insights (outfit, fitness, travel, alerts)
- AI weather chatbot
- City search with autocomplete
- GPS location weather (auto-detect on launch)
- Favorite cities with quick switching
- Recent searches
- Weather alerts (heat, cold, wind, UV, visibility, humidity)
- Hourly forecast (24-hour timeline)
- Sun & Moon times with day length
- Weather comparison (today vs tomorrow)
- Share weather (native share & clipboard)
- Weather widget generator (web only)
- Dark/light theme, unit preferences
- Premium glassmorphism UI

---

## Prerequisites

- Node.js 20+
- npm
- [OpenWeatherMap](https://openweathermap.org/api) API key
- [Groq](https://console.groq.com/) API key

---

## Environment Variables

### Web (`web/.env.local`)

Copy `web/.env.example` to `web/.env.local`:

```env
OPENWEATHER_API_KEY=your_openweather_api_key
GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Mobile (`mobile/.env`)

Copy `mobile/.env.example` to `mobile/.env`:

```env
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3000
EXPO_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
```

> Use your machine's LAN IP for `EXPO_PUBLIC_API_URL` so the mobile app can reach the Next.js API routes during development.

---

## API Setup

### OpenWeatherMap

1. Sign up at [openweathermap.org](https://openweathermap.org/api)
2. Get a free API key (One Call API 3.0)
3. Copy your API key to `OPENWEATHER_API_KEY` (web) and `EXPO_PUBLIC_OPENWEATHER_API_KEY` (mobile)

### Groq AI

1. Sign up at [console.groq.com](https://console.groq.com/)
2. Create an API key → `GROQ_API_KEY` in web `.env.local`
3. AI routes: `/api/ai/insights`, `/api/ai/chat`

---

## Installation & Development

### Web

```bash
cd web
npm install
cp .env.example .env.local
# Fill in your API keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Mobile

```bash
cd mobile
npm install
cp .env.example .env
# Fill in your API keys
npm start
```

Press `a` for Android emulator or scan QR with Expo Go.

---

## Web Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page (redirects to dashboard) |
| `/dashboard` | Weather home (auto-detects location) |
| `/search` | City search |
| `/weather/[city]` | Weather details |
| `/settings` | Preferences |

## Mobile Screens

Splash → Home (auto-location), Search, Forecast, Settings

---

