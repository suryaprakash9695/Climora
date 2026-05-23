'use client';

import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { formatDate, getWeatherIconUrl } from '@/utils/weather';
import type { ForecastDay } from '@/types';

interface Props {
  days: ForecastDay[];
}

export function ForecastCards({ days }: Props) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {days.map((day, i) => (
        <GlassCard
          key={day.date}
          className="min-w-[140px] flex-shrink-0 text-center"
          delay={i * 0.05}
        >
          <p className="text-sm text-white/60">{formatDate(day.date)}</p>
          <Image
            src={getWeatherIconUrl(day.day.condition.icon)}
            alt=""
            width={48}
            height={48}
            className="mx-auto my-2"
            unoptimized
          />
          <p className="text-lg font-semibold text-white">
            {Math.round(day.day.maxtemp_c)}°
          </p>
          <p className="text-sm text-white/50">{Math.round(day.day.mintemp_c)}°</p>
          <p className="mt-1 text-xs text-cyan-400">
            {day.day.daily_chance_of_rain}% rain
          </p>
        </GlassCard>
      ))}
    </div>
  );
}
