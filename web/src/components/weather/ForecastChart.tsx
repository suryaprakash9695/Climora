'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { GlassCard } from '@/components/ui/GlassCard';
import { formatDate } from '@/utils/weather';
import type { ForecastDay } from '@/types';

interface Props {
  days: ForecastDay[];
}

export function ForecastChart({ days }: Props) {
  const data = days.map((d) => ({
    name: formatDate(d.date),
    high: d.day.maxtemp_c,
    low: d.day.mintemp_c,
    rain: d.day.daily_chance_of_rain,
  }));

  return (
    <GlassCard delay={0.2}>
      <h3 className="mb-4 text-lg font-semibold text-white">7-Day Temperature</h3>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="lowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" fontSize={11} />
          <YAxis stroke="rgba(255,255,255,0.4)" fontSize={11} />
          <Tooltip
            contentStyle={{
              background: 'rgba(15,23,42,0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
            }}
          />
          <Area
            type="monotone"
            dataKey="high"
            stroke="#8b5cf6"
            fill="url(#highGrad)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="low"
            stroke="#06b6d4"
            fill="url(#lowGrad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}
