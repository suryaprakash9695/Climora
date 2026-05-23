'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { formatTime } from '@/utils/weather';
import Image from 'next/image';
import type { ForecastHour } from '@/types';
import { useThemeStore } from '@/store/themeStore';
import { formatTemp } from '@/utils/weather';

interface Props {
  hours: ForecastHour[];
}

export function HourlyForecast({ hours }: Props) {
  const unit = useThemeStore((s) => s.temperatureUnit);

  return (
    <GlassCard>
      <h2 className="mb-4 font-semibold text-white">Hourly Forecast</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {hours.slice(0, 24).map((hour, index) => {
          const temp = unit === 'fahrenheit' ? hour.temp_f : hour.temp_c;
          return (
            <div
              key={index}
              className="flex min-w-[80px] flex-col items-center gap-2 rounded-xl bg-white/5 p-3"
            >
              <p className="text-xs text-white/60">{formatTime(hour.time)}</p>
              <Image
                src={`https:${hour.condition.icon}`}
                alt={hour.condition.text}
                width={40}
                height={40}
                unoptimized
              />
              <p className="text-lg font-semibold text-white">
                {formatTemp(temp, unit)}
              </p>
              <p className="text-xs text-cyan-400">{hour.chance_of_rain}%</p>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}
