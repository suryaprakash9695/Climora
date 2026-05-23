'use client';

import { Sunrise, Sunset, Moon, Sun } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import type { ForecastDay } from '@/types';

interface Props {
  forecastDay?: ForecastDay;
  isDay: number;
}

export function SunMoonTimes({ forecastDay, isDay }: Props) {
  if (!forecastDay?.astro) return null;

  const { sunrise, sunset } = forecastDay.astro;

  // Calculate day length
  const parseTime = (time: string) => {
    const [timeStr, period] = time.split(' ');
    let [hours, minutes] = timeStr.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const sunriseMinutes = parseTime(sunrise);
  const sunsetMinutes = parseTime(sunset);
  const dayLengthMinutes = sunsetMinutes - sunriseMinutes;
  const dayLengthHours = Math.floor(dayLengthMinutes / 60);
  const dayLengthMins = dayLengthMinutes % 60;

  return (
    <GlassCard>
      <h2 className="mb-4 font-semibold text-white">Sun & Moon</h2>
      
      <div className="space-y-4">
        {/* Current Status */}
        <div className="flex items-center justify-center gap-2 rounded-xl bg-white/5 p-4">
          {isDay ? (
            <>
              <Sun className="h-6 w-6 text-yellow-400" />
              <span className="text-lg font-medium text-white">Daytime</span>
            </>
          ) : (
            <>
              <Moon className="h-6 w-6 text-blue-300" />
              <span className="text-lg font-medium text-white">Nighttime</span>
            </>
          )}
        </div>

        {/* Sunrise & Sunset */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-orange-500/10 p-4 text-center">
            <Sunrise className="mx-auto mb-2 h-6 w-6 text-orange-400" />
            <p className="text-xs text-white/60">Sunrise</p>
            <p className="text-lg font-semibold text-white">{sunrise}</p>
          </div>
          <div className="rounded-xl bg-purple-500/10 p-4 text-center">
            <Sunset className="mx-auto mb-2 h-6 w-6 text-purple-400" />
            <p className="text-xs text-white/60">Sunset</p>
            <p className="text-lg font-semibold text-white">{sunset}</p>
          </div>
        </div>

        {/* Day Length */}
        <div className="rounded-xl bg-white/5 p-4 text-center">
          <p className="text-xs text-white/60">Day Length</p>
          <p className="text-2xl font-semibold text-white">
            {dayLengthHours}h {dayLengthMins}m
          </p>
        </div>

        {/* Visual Timeline */}
        <div className="relative h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-400 via-yellow-300 to-purple-500"
            style={{
              width: `${(dayLengthMinutes / (24 * 60)) * 100}%`,
              marginLeft: `${(sunriseMinutes / (24 * 60)) * 100}%`,
            }}
          />
        </div>
      </div>
    </GlassCard>
  );
}
