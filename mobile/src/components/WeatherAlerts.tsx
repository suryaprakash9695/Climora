import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';

interface CurrentWeather {
  temp_c: number;
  wind_kph: number;
  uv: number;
  vis_km: number;
  humidity: number;
}

interface Props {
  current: CurrentWeather;
}

interface Alert {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
  title: string;
  message: string;
}

export function WeatherAlerts({ current }: Props) {
  const alerts: Alert[] = [];

  // High temperature alert
  if (current.temp_c > 35) {
    alerts.push({
      icon: 'thermometer',
      color: '#f87171',
      bg: 'rgba(248, 113, 113, 0.1)',
      title: 'Extreme Heat Warning',
      message: 'Temperature is dangerously high. Stay hydrated and avoid outdoor activities.',
    });
  }

  // Low temperature alert
  if (current.temp_c < 0) {
    alerts.push({
      icon: 'snow',
      color: '#60a5fa',
      bg: 'rgba(96, 165, 250, 0.1)',
      title: 'Freezing Temperature',
      message: 'Temperature is below freezing. Dress warmly and watch for ice.',
    });
  }

  // High wind alert
  if (current.wind_kph > 50) {
    alerts.push({
      icon: 'flag',
      color: '#fb923c',
      bg: 'rgba(251, 146, 60, 0.1)',
      title: 'High Wind Warning',
      message: 'Strong winds detected. Secure loose objects and avoid exposed areas.',
    });
  }

  // High UV alert
  if (current.uv > 7) {
    alerts.push({
      icon: 'sunny',
      color: '#fbbf24',
      bg: 'rgba(251, 191, 36, 0.1)',
      title: 'High UV Index',
      message: 'UV levels are very high. Use sunscreen and limit sun exposure.',
    });
  }

  // Poor visibility alert
  if (current.vis_km < 2) {
    alerts.push({
      icon: 'eye-off',
      color: '#9ca3af',
      bg: 'rgba(156, 163, 175, 0.1)',
      title: 'Poor Visibility',
      message: 'Visibility is reduced. Drive carefully and use headlights.',
    });
  }

  // High humidity alert
  if (current.humidity > 80) {
    alerts.push({
      icon: 'water',
      color: '#22d3ee',
      bg: 'rgba(34, 211, 238, 0.1)',
      title: 'High Humidity',
      message: 'Humidity levels are high. Stay cool and drink plenty of water.',
    });
  }

  if (alerts.length === 0) {
    return null;
  }

  return (
    <GlassCard className="mb-4">
      <Text className="mb-3 text-lg font-semibold text-white">Weather Alerts</Text>
      {alerts.map((alert, index) => (
        <View
          key={index}
          className="mb-3 flex-row rounded-xl p-4"
          style={{ backgroundColor: alert.bg }}
        >
          <Ionicons name={alert.icon} size={20} color={alert.color} style={{ marginRight: 12 }} />
          <View className="flex-1">
            <Text className="font-medium" style={{ color: alert.color }}>
              {alert.title}
            </Text>
            <Text className="mt-1 text-sm text-white/70">{alert.message}</Text>
          </View>
        </View>
      ))}
    </GlassCard>
  );
}
