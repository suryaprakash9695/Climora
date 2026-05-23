'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Code, Download } from 'lucide-react';
import type { WeatherData } from '@/types';

interface Props {
  weather: WeatherData;
}

export function WeatherWidget({ weather }: Props) {
  const [showCode, setShowCode] = useState(false);

  const widgetCode = `<!-- Climora Weather Widget -->
<div style="font-family: system-ui; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 24px; color: white; max-width: 300px;">
  <h3 style="margin: 0 0 16px 0; font-size: 20px;">${weather.location.name}</h3>
  <div style="display: flex; align-items: center; gap: 16px;">
    <img src="https:${weather.current.condition.icon}" alt="${weather.current.condition.text}" width="64" height="64">
    <div>
      <div style="font-size: 48px; font-weight: 300;">${Math.round(weather.current.temp_c)}°</div>
      <div style="opacity: 0.8;">${weather.current.condition.text}</div>
    </div>
  </div>
  <div style="margin-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 14px;">
    <div>💧 ${weather.current.humidity}%</div>
    <div>💨 ${Math.round(weather.current.wind_kph)} km/h</div>
  </div>
  <div style="margin-top: 16px; font-size: 12px; opacity: 0.6; text-align: center;">
    Powered by Climora
  </div>
</div>`;

  const downloadWidget = () => {
    const blob = new Blob([widgetCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'climora-widget.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <GlassCard>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-white">Weather Widget</h2>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setShowCode(!showCode)}>
            <Code className="h-4 w-4" />
            {showCode ? 'Hide' : 'Show'} Code
          </Button>
          <Button variant="secondary" size="sm" onClick={downloadWidget}>
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Widget Preview */}
      <div className="mb-4 flex justify-center">
        <div
          style={{
            fontFamily: 'system-ui',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white',
            maxWidth: '300px',
            width: '100%',
          }}
        >
          <h3 style={{ margin: '0 0 16px 0', fontSize: '20px' }}>
            {weather.location.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img
              src={`https:${weather.current.condition.icon}`}
              alt={weather.current.condition.text}
              width="64"
              height="64"
            />
            <div>
              <div style={{ fontSize: '48px', fontWeight: '300' }}>
                {Math.round(weather.current.temp_c)}°
              </div>
              <div style={{ opacity: 0.8 }}>{weather.current.condition.text}</div>
            </div>
          </div>
          <div
            style={{
              marginTop: '16px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              fontSize: '14px',
            }}
          >
            <div>💧 {weather.current.humidity}%</div>
            <div>💨 {Math.round(weather.current.wind_kph)} km/h</div>
          </div>
          <div
            style={{
              marginTop: '16px',
              fontSize: '12px',
              opacity: 0.6,
              textAlign: 'center',
            }}
          >
            Powered by Climora
          </div>
        </div>
      </div>

      {/* Widget Code */}
      {showCode && (
        <div className="rounded-xl bg-slate-900 p-4">
          <pre className="overflow-x-auto text-xs text-green-400">
            <code>{widgetCode}</code>
          </pre>
        </div>
      )}
    </GlassCard>
  );
}
