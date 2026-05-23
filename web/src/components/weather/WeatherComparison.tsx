'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { ForecastDay } from '@/types';

interface Props {
  forecastDays: ForecastDay[];
}

export function WeatherComparison({ forecastDays }: Props) {
  if (!forecastDays || forecastDays.length < 2) return null;

  const today = forecastDays[0];
  const yesterday = forecastDays[1]; // In a real app, this would be historical data

  const comparisons = [
    {
      label: 'Max Temperature',
      today: Math.round(today.day.maxtemp_c),
      yesterday: Math.round(yesterday.day.maxtemp_c),
      unit: '°C',
    },
    {
      label: 'Min Temperature',
      today: Math.round(today.day.mintemp_c),
      yesterday: Math.round(yesterday.day.mintemp_c),
      unit: '°C',
    },
    {
      label: 'Rain Chance',
      today: today.day.daily_chance_of_rain,
      yesterday: yesterday.day.daily_chance_of_rain,
      unit: '%',
    },
    {
      label: 'Humidity',
      today: Math.round(today.day.avghumidity || 0),
      yesterday: Math.round(yesterday.day.avghumidity || 0),
      unit: '%',
    },
  ];

  const getTrend = (today: number, yesterday: number) => {
    const diff = today - yesterday;
    if (Math.abs(diff) < 1) return { icon: Minus, color: 'text-gray-400', text: 'Same' };
    if (diff > 0) return { icon: TrendingUp, color: 'text-green-400', text: `+${diff}` };
    return { icon: TrendingDown, color: 'text-blue-400', text: `${diff}` };
  };

  return (
    <GlassCard>
      <h2 className="mb-4 font-semibold text-white">Today vs Tomorrow</h2>
      <div className="space-y-3">
        {comparisons.map((item) => {
          const trend = getTrend(item.today, item.yesterday);
          return (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl bg-white/5 p-3"
            >
              <div>
                <p className="text-sm text-white/60">{item.label}</p>
                <p className="text-lg font-semibold text-white">
                  {item.today}
                  {item.unit}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <trend.icon className={`h-5 w-5 ${trend.color}`} />
                <span className={`text-sm ${trend.color}`}>
                  {trend.text}
                  {item.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
