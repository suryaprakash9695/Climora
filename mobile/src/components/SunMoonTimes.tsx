import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlassCard } from './GlassCard';

interface Props {
  sunrise?: string;
  sunset?: string;
  isDay: boolean;
}

export function SunMoonTimes({ sunrise, sunset, isDay }: Props) {
  if (!sunrise || !sunset) return null;

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
    <GlassCard className="mb-4">
      <Text className="mb-3 text-lg font-semibold text-white">Sun & Moon</Text>
      
      {/* Current Status */}
      <View className="mb-4 flex-row items-center justify-center gap-2 rounded-xl bg-white/5 p-4">
        <Ionicons
          name={isDay ? 'sunny' : 'moon'}
          size={24}
          color={isDay ? '#fbbf24' : '#93c5fd'}
        />
        <Text className="text-lg font-medium text-white">
          {isDay ? 'Daytime' : 'Nighttime'}
        </Text>
      </View>

      {/* Sunrise & Sunset */}
      <View className="mb-4 flex-row gap-3">
        <View className="flex-1 items-center rounded-xl bg-orange-500/10 p-4">
          <Ionicons name="sunny-outline" size={24} color="#fb923c" />
          <Text className="mt-2 text-xs text-white/60">Sunrise</Text>
          <Text className="text-lg font-semibold text-white">{sunrise}</Text>
        </View>
        <View className="flex-1 items-center rounded-xl bg-purple-500/10 p-4">
          <Ionicons name="moon-outline" size={24} color="#a78bfa" />
          <Text className="mt-2 text-xs text-white/60">Sunset</Text>
          <Text className="text-lg font-semibold text-white">{sunset}</Text>
        </View>
      </View>

      {/* Day Length */}
      <View className="items-center rounded-xl bg-white/5 p-4">
        <Text className="text-xs text-white/60">Day Length</Text>
        <Text className="text-2xl font-semibold text-white">
          {dayLengthHours}h {dayLengthMins}m
        </Text>
      </View>
    </GlassCard>
  );
}
