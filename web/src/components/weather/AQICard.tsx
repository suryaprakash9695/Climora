'use client';

import { Wind } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { getAqiInfo } from '@/utils/weather';
import type { AirQuality } from '@/types';

interface Props {
  aqi?: AirQuality;
}

export function AQICard({ aqi }: Props) {
  if (!aqi) return null;
  const index = aqi['us-epa-index'] ?? 0;
  const info = getAqiInfo(index);

  return (
    <GlassCard delay={0.15}>
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${info.color}20` }}
        >
          <Wind className="h-6 w-6" style={{ color: info.color }} />
        </div>
        <div>
          <p className="text-sm text-white/60">Air Quality Index</p>
          <p className="text-xl font-bold text-white">{info.label}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-3xl font-bold" style={{ color: info.color }}>
            {index}
          </p>
          <p className="text-xs text-white/50">US EPA</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg bg-white/5 p-2">
          <p className="text-white/50">PM2.5</p>
          <p className="font-medium text-white">{aqi.pm2_5}</p>
        </div>
        <div className="rounded-lg bg-white/5 p-2">
          <p className="text-white/50">PM10</p>
          <p className="font-medium text-white">{aqi.pm10}</p>
        </div>
        <div className="rounded-lg bg-white/5 p-2">
          <p className="text-white/50">O₃</p>
          <p className="font-medium text-white">{aqi.o3}</p>
        </div>
      </div>
    </GlassCard>
  );
}
