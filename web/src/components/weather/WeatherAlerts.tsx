'use client';

import { AlertTriangle, Wind, Droplets, Thermometer, Sun } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import type { CurrentWeather } from '@/types';

interface Props {
  current: CurrentWeather;
}

export function WeatherAlerts({ current }: Props) {
  const alerts = [];

  // High temperature alert
  if (current.temp_c > 35) {
    alerts.push({
      icon: Thermometer,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      title: 'Extreme Heat Warning',
      message: 'Temperature is dangerously high. Stay hydrated and avoid outdoor activities.',
    });
  }

  // Low temperature alert
  if (current.temp_c < 0) {
    alerts.push({
      icon: Thermometer,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      title: 'Freezing Temperature',
      message: 'Temperature is below freezing. Dress warmly and watch for ice.',
    });
  }

  // High wind alert
  if (current.wind_kph > 50) {
    alerts.push({
      icon: Wind,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      title: 'High Wind Warning',
      message: 'Strong winds detected. Secure loose objects and avoid exposed areas.',
    });
  }

  // High UV alert
  if (current.uv > 7) {
    alerts.push({
      icon: Sun,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      title: 'High UV Index',
      message: 'UV levels are very high. Use sunscreen and limit sun exposure.',
    });
  }

  // Poor visibility alert
  if (current.vis_km < 2) {
    alerts.push({
      icon: AlertTriangle,
      color: 'text-gray-400',
      bg: 'bg-gray-500/10',
      title: 'Poor Visibility',
      message: 'Visibility is reduced. Drive carefully and use headlights.',
    });
  }

  // High humidity alert
  if (current.humidity > 80) {
    alerts.push({
      icon: Droplets,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      title: 'High Humidity',
      message: 'Humidity levels are high. Stay cool and drink plenty of water.',
    });
  }

  if (alerts.length === 0) {
    return null;
  }

  return (
    <GlassCard>
      <h2 className="mb-4 font-semibold text-white">Weather Alerts</h2>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`flex gap-3 rounded-xl ${alert.bg} p-4`}
          >
            <alert.icon className={`h-5 w-5 flex-shrink-0 ${alert.color}`} />
            <div>
              <p className={`font-medium ${alert.color}`}>{alert.title}</p>
              <p className="mt-1 text-sm text-white/70">{alert.message}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
