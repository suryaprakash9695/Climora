import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '@/components/GradientBackground';
import { GlassCard } from '@/components/GlassCard';
import { useWeatherStore } from '@/store/weatherStore';

export default function SettingsScreen({
  navigation,
}: {
  navigation: { navigate: (s: string) => void };
}) {
  const { temperatureUnit, theme, setTemperatureUnit, setTheme } = useWeatherStore();

  return (
    <View className="flex-1">
      <GradientBackground />
      <SafeAreaView className="flex-1 px-5">
        <Text className="mb-6 text-2xl font-bold text-white">Settings</Text>

        <GlassCard className="mb-4">
          <Text className="mb-3 font-semibold text-white">Theme</Text>
          <View className="flex-row gap-2">
            {(['dark', 'light'] as const).map((t) => (
              <Pressable
                key={t}
                onPress={() => setTheme(t)}
                className={`rounded-xl px-4 py-2 ${theme === t ? 'bg-violet-600' : 'bg-white/10'}`}
              >
                <Text className="capitalize text-white">{t}</Text>
              </Pressable>
            ))}
          </View>
        </GlassCard>

        <GlassCard className="mb-4">
          <Text className="mb-3 font-semibold text-white">Temperature Unit</Text>
          <View className="flex-row gap-2">
            {(['celsius', 'fahrenheit'] as const).map((u) => (
              <Pressable
                key={u}
                onPress={() => setTemperatureUnit(u)}
                className={`rounded-xl px-4 py-2 ${temperatureUnit === u ? 'bg-violet-600' : 'bg-white/10'}`}
              >
                <Text className="text-white">°{u === 'celsius' ? 'C' : 'F'}</Text>
              </Pressable>
            ))}
          </View>
        </GlassCard>

        <Pressable onPress={() => navigation.navigate('Notifications')}>
          <GlassCard>
            <Text className="text-white">Notification preferences →</Text>
          </GlassCard>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}
