'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useWeather } from '@/hooks/useWeather';
import { CurrentWeatherCard } from '@/components/weather/CurrentWeatherCard';
import { ForecastCards } from '@/components/weather/ForecastCards';
import { ForecastChart } from '@/components/weather/ForecastChart';
import { AQICard } from '@/components/weather/AQICard';
import { AIInsightsCard } from '@/components/weather/AIInsightsCard';
import { Skeleton } from '@/components/ui/Skeleton';

export default function WeatherDetailsPage() {
  const params = useParams();
  const city = decodeURIComponent(params.city as string);
  const { current, forecast, aiInsights, loading, error, loadWeather } = useWeather();

  useEffect(() => {
    if (city) loadWeather(city);
  }, [city, loadWeather]);

  if (loading && !current) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-48" />
        <Skeleton className="h-80 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Weather Details</h1>
      {error && (
        <p className="rounded-xl bg-red-500/10 px-4 py-3 text-red-400">{error}</p>
      )}
      {current && <CurrentWeatherCard data={current} />}
      {current?.current?.air_quality && (
        <AQICard aqi={current.current.air_quality as never} />
      )}
      {aiInsights && <AIInsightsCard insights={aiInsights} />}
      {forecast?.forecast?.forecastday && (
        <>
          <ForecastCards days={forecast.forecast.forecastday} />
          <ForecastChart days={forecast.forecast.forecastday} />
        </>
      )}
    </div>
  );
}
