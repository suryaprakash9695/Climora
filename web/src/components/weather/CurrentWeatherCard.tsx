'use client';

import Image from 'next/image';
import { Droplets, Wind, Gauge, Eye, Sun, Sunrise, Sunset } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { formatTemp, getWeatherIconUrl, getGreeting } from '@/utils/weather';
import { useThemeStore } from '@/store/themeStore';
import type { WeatherData } from '@/types';

interface Props {
  data: WeatherData;
}

export function CurrentWeatherCard({ data }: Props) {
  const unit = useThemeStore((s) => s.temperatureUnit);
  const { location, current } = data;
  const temp = unit === 'fahrenheit' ? current.temp_f : current.temp_c;
  const feels = unit === 'fahrenheit' ? current.feelslike_f : current.feelslike_c;
  const astro = data.forecast?.forecastday?.[0]?.astro;

  const stats = [
    { icon: Droplets, label: 'Humidity', value: `${current.humidity}%` },
    { icon: Wind, label: 'Wind', value: `${current.wind_kph} km/h` },
    { icon: Gauge, label: 'Pressure', value: `${current.pressure_mb} mb` },
    { icon: Eye, label: 'Visibility', value: `${current.vis_km} km` },
    { icon: Sun, label: 'UV Index', value: `${current.uv}` },
  ];

  return (
    <GlassCard className="relative overflow-hidden">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/10 blur-2xl" />
      <p className="text-sm text-white/60">{getGreeting()}</p>
      <h2 className="mt-1 text-2xl font-bold text-white">
        {location.name}, {location.country}
      </h2>
      <p className="text-sm text-white/50">{location.localtime}</p>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-7xl font-light tracking-tighter text-white">
            {formatTemp(temp, unit).replace('°', '')}
            <span className="text-4xl">°</span>
          </p>
          <p className="mt-1 text-white/60">Feels like {formatTemp(feels, unit)}</p>
          <p className="mt-2 text-lg text-violet-300">{current.condition.text}</p>
        </div>
        <Image
          src={getWeatherIconUrl(current.condition.icon)}
          alt={current.condition.text}
          width={120}
          height={120}
          className="drop-shadow-2xl"
          unoptimized
        />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-xl bg-white/5 p-3 text-center"
          >
            <Icon className="mx-auto h-4 w-4 text-cyan-400" />
            <p className="mt-1 text-xs text-white/50">{label}</p>
            <p className="text-sm font-medium text-white">{value}</p>
          </div>
        ))}
      </div>

      {astro && (
        <div className="mt-4 flex gap-6 text-sm text-white/60">
          <span className="flex items-center gap-1">
            <Sunrise className="h-4 w-4 text-amber-400" />
            {astro.sunrise}
          </span>
          <span className="flex items-center gap-1">
            <Sunset className="h-4 w-4 text-orange-400" />
            {astro.sunset}
          </span>
        </div>
      )}
    </GlassCard>
  );
}
