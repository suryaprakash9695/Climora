'use client';

import { useCallback } from 'react';
import { fetchCurrentWeather, fetchForecast } from '@/services/weather';
import { fetchAIInsights } from '@/services/ai';
import { useWeatherStore } from '@/store/weatherStore';

export function useWeather() {
  const {
    current,
    forecast,
    aiInsights,
    loading,
    error,
    activeCity,
    setCurrent,
    setForecast,
    setAIInsights,
    setLoading,
    setError,
    setActiveCity,
    addRecentSearch,
  } = useWeatherStore();

  const loadWeather = useCallback(
    async (city?: string) => {
      const q = city ?? activeCity;
      setLoading(true);
      setError(null);
      try {
        const [currentData, forecastData] = await Promise.all([
          fetchCurrentWeather(q),
          fetchForecast(q),
        ]);
        setCurrent(currentData);
        setForecast(forecastData);
        setActiveCity(q);
        addRecentSearch(q);

        try {
          const insights = await fetchAIInsights(forecastData);
          setAIInsights(insights);
        } catch {
          setAIInsights(null);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load weather');
      } finally {
        setLoading(false);
      }
    },
    [
      activeCity,
      setCurrent,
      setForecast,
      setAIInsights,
      setLoading,
      setError,
      setActiveCity,
      addRecentSearch,
    ]
  );

  return {
    current,
    forecast,
    aiInsights,
    loading,
    error,
    activeCity,
    loadWeather,
  };
}
