import { View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '@/components/GradientBackground';
import { GlassCard } from '@/components/GlassCard';
import { useWeatherStore } from '@/store/weatherStore';

export default function ForecastScreen() {
  const forecast = useWeatherStore((s) => s.forecast);
  const days = forecast?.forecast?.forecastday ?? [];

  return (
    <View className="flex-1">
      <GradientBackground />
      <SafeAreaView className="flex-1 px-5">
        <Text className="mb-6 text-2xl font-bold text-white">Forecast Details</Text>
        <ScrollView>
          {days.map((day) => (
            <GlassCard key={day.date} className="mb-3">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="font-semibold text-white">
                    {new Date(day.date).toLocaleDateString([], {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                  <Text className="text-white/50">{day.day.condition.text}</Text>
                  <Text className="mt-1 text-cyan-400">
                    {day.day.daily_chance_of_rain}% chance of rain
                  </Text>
                </View>
                <View className="items-end">
                  <Image
                    source={{ uri: `https:${day.day.condition.icon}` }}
                    style={{ width: 56, height: 56 }}
                  />
                  <Text className="text-xl font-bold text-white">
                    {Math.round(day.day.maxtemp_c)}° / {Math.round(day.day.mintemp_c)}°
                  </Text>
                </View>
              </View>
              <View className="mt-3 flex-row gap-4">
                <Text className="text-sm text-white/50">↑ {day.astro.sunrise}</Text>
                <Text className="text-sm text-white/50">↓ {day.astro.sunset}</Text>
              </View>
            </GlassCard>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
