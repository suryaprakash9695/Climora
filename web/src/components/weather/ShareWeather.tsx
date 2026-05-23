'use client';

import { Share2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import type { WeatherData } from '@/types';

interface Props {
  weather: WeatherData;
}

export function ShareWeather({ weather }: Props) {
  const [copied, setCopied] = useState(false);

  const shareText = `🌤️ Weather in ${weather.location.name}, ${weather.location.country}
🌡️ ${Math.round(weather.current.temp_c)}°C (${Math.round(weather.current.temp_f)}°F)
☁️ ${weather.current.condition.text}
💧 Humidity: ${weather.current.humidity}%
💨 Wind: ${Math.round(weather.current.wind_kph)} km/h

Check weather at: ${typeof window !== 'undefined' ? window.location.origin : ''}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Weather in ${weather.location.name}`,
          text: shareText,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Clipboard API not available
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="secondary" size="sm" onClick={handleShare}>
        <Share2 className="h-4 w-4" />
        Share
      </Button>
      <Button variant="secondary" size="sm" onClick={handleCopy}>
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy
          </>
        )}
      </Button>
    </div>
  );
}
