'use client';

import { useEffect } from 'react';
import { RefreshCw, MapPin } from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';
import { CurrentWeatherCard } from '@/components/weather/CurrentWeatherCard';
import { ForecastCards } from '@/components/weather/ForecastCards';
import { ForecastChart } from '@/components/weather/ForecastChart';
import { AQICard } from '@/components/weather/AQICard';
import { AIInsightsCard } from '@/components/weather/AIInsightsCard';
import { WeatherChatbot } from '@/components/weather/WeatherChatbot';
import { HourlyForecast } from '@/components/weather/HourlyForecast';
import { WeatherAlerts } from '@/components/weather/WeatherAlerts';
import { ShareWeather } from '@/components/weather/ShareWeather';
import { FavoriteCities } from '@/components/weather/FavoriteCities';
import { SunMoonTimes } from '@/components/weather/SunMoonTimes';
import { WeatherComparison } from '@/components/weather/WeatherComparison';
import { WeatherWidget } from '@/components/weather/WeatherWidget';
import { Skeleton } from '@/components/ui/Skeleton';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const { current, forecast, aiInsights, loading, error, loadWeather } = useWeather();

  useEffect(() => {
    // Auto-fetch location on mount
    handleLocation();
  }, []);

  const handleLocation = () => {
    if (!navigator.geolocation) {
      loadWeather('London'); // Fallback to London
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => loadWeather(`${pos.coords.latitude},${pos.coords.longitude}`),
      () => loadWeather('London') // Fallback to London on error
    );
  };

  if (loading && !current) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-80 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Weather Dashboard</h1>
        <div className="flex flex-wrap gap-2">
          {current && <ShareWeather weather={current} />}
          <Button variant="secondary" size="sm" onClick={handleLocation}>
            <MapPin className="h-4 w-4" />
            My Location
          </Button>
          <Button variant="secondary" size="sm" onClick={() => loadWeather()} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <p className="rounded-xl bg-red-500/10 px-4 py-3 text-red-400">{error}</p>
      )}

      {current && (
        <>
          {/* Weather Alerts */}
          <WeatherAlerts current={current.current} />

          {/* Main Weather Card */}
          <CurrentWeatherCard data={current} />

          {/* Favorite Cities */}
          <FavoriteCities
            currentCity={current.location.name}
            currentCountry={current.location.country}
            onCitySelect={(city) => loadWeather(city)}
          />

          {/* AQI and AI Insights */}
          <div className="grid gap-6 lg:grid-cols-2">
            <AQICard aqi={current.current?.air_quality as never} />
            {aiInsights && <AIInsightsCard insights={aiInsights} />}
          </div>

          {/* Sun & Moon Times */}
          {forecast?.forecast?.forecastday?.[0] && (
            <div className="grid gap-6 lg:grid-cols-2">
              <SunMoonTimes
                forecastDay={forecast.forecast.forecastday[0]}
                isDay={current.current.is_day}
              />
              {forecast.forecast.forecastday.length > 1 && (
                <WeatherComparison forecastDays={forecast.forecast.forecastday} />
              )}
            </div>
          )}
        </>
      )}

      {/* Hourly Forecast */}
      {forecast?.forecast?.forecastday?.[0]?.hour && (
        <HourlyForecast hours={forecast.forecast.forecastday[0].hour} />
      )}

      {/* 7-Day Forecast */}
      {forecast?.forecast?.forecastday && (
        <>
          <ForecastCards days={forecast.forecast.forecastday} />
          <ForecastChart days={forecast.forecast.forecastday} />
        </>
      )}

      {/* Weather Widget */}
      {current && <WeatherWidget weather={current} />}

      {/* Weather Chatbot */}
      <WeatherChatbot weather={forecast ?? current} />
    </div>
  );
}
