import { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Pressable,
  Image,
  ActivityIndicator,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { GradientBackground } from '@/components/GradientBackground';
import { GlassCard } from '@/components/GlassCard';
import { WeatherAlerts } from '@/components/WeatherAlerts';
import { FavoriteCities } from '@/components/FavoriteCities';
import { HourlyForecast } from '@/components/HourlyForecast';
import { SunMoonTimes } from '@/components/SunMoonTimes';
import { shareWeather, copyWeather } from '@/components/ShareWeather';
import { fetchCurrentWeather, fetchForecast } from '@/services/weather';
import { useWeatherStore } from '@/store/weatherStore';

export default function HomeScreen({
  navigation,
}: {
  navigation: { navigate: (s: string, p?: object) => void };
}) {
  const {
    current,
    forecast,
    activeCity,
    temperatureUnit,
    loading,
    setCurrent,
    setForecast,
    setLoading,
    setActiveCity,
    addRecent,
  } = useWeatherStore();

  const load = useCallback(
    async (city?: string) => {
      const q = city ?? activeCity;
      setLoading(true);
      try {
        const [cur, fc] = await Promise.all([fetchCurrentWeather(q), fetchForecast(q)]);
        setCurrent(cur);
        setForecast(fc);
        setActiveCity(q);
        addRecent(q);
      } catch {
        /* handled by UI */
      } finally {
        setLoading(false);
      }
    },
    [activeCity, setCurrent, setForecast, setLoading, setActiveCity, addRecent]
  );

  useEffect(() => {
    useLocation();
  }, []);

  const useLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      load('London'); // Fallback
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    load(`${loc.coords.latitude},${loc.coords.longitude}`);
  };

  const handleShare = () => {
    if (current) {
      shareWeather(current);
    }
  };

  const handleCopy = () => {
    if (current) {
      copyWeather(current);
    }
  };

  const temp =
    current && temperatureUnit === 'fahrenheit'
      ? current.current.temp_f
      : current?.current.temp_c;

  return (
    <View className="flex-1">
      <GradientBackground />
      <SafeAreaView className="flex-1">
        <ScrollView
          className="px-5"
          refreshControl={<RefreshControl refreshing={loading} onRefresh={() => load()} tintColor="#8b5cf6" />}
        >
          {/* Header */}
          <View className="mb-6 flex-row items-center justify-between">
            <View>
              <Text className="text-white/60">Current weather</Text>
              <Text className="text-2xl font-bold text-white">{activeCity}</Text>
            </View>
            <View className="flex-row gap-2">
              {current && (
                <>
                  <Pressable onPress={handleShare} className="rounded-xl bg-white/10 p-3">
                    <Ionicons name="share-social" size={22} color="#a78bfa" />
                  </Pressable>
                  <Pressable onPress={handleCopy} className="rounded-xl bg-white/10 p-3">
                    <Ionicons name="copy" size={22} color="#22d3ee" />
                  </Pressable>
                </>
              )}
              <Pressable onPress={useLocation} className="rounded-xl bg-white/10 p-3">
                <Ionicons name="locate" size={22} color="#a78bfa" />
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate('Forecast')}
                className="rounded-xl bg-white/10 p-3"
              >
                <Ionicons name="calendar" size={22} color="#22d3ee" />
              </Pressable>
            </View>
          </View>

          {loading && !current ? (
            <ActivityIndicator color="#8b5cf6" size="large" className="my-20" />
          ) : current ? (
            <Animated.View entering={FadeInDown}>
              {/* Weather Alerts */}
              <WeatherAlerts current={current.current} />

              {/* Main Weather Card */}
              <GlassCard className="mb-4">
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className="text-7xl font-light text-white">
                      {Math.round(temp ?? 0)}°
                    </Text>
                    <Text className="text-violet-300">{current.current.condition.text}</Text>
                    <Text className="mt-1 text-white/50">
                      {current.location.name}, {current.location.country}
                    </Text>
                  </View>
                  <Image
                    source={{ uri: `https:${current.current.condition.icon}` }}
                    style={{ width: 100, height: 100 }}
                  />
                </View>
                <View className="mt-6 flex-row flex-wrap gap-3">
                  {[
                    { label: 'Humidity', value: `${current.current.humidity}%` },
                    { label: 'Wind', value: `${current.current.wind_kph} km/h` },
                    { label: 'UV', value: `${current.current.uv}` },
                    { label: 'Pressure', value: `${current.current.pressure_mb} mb` },
                  ].map((s) => (
                    <View key={s.label} className="min-w-[45%] flex-1 rounded-xl bg-white/5 p-3">
                      <Text className="text-xs text-white/50">{s.label}</Text>
                      <Text className="font-medium text-white">{s.value}</Text>
                    </View>
                  ))}
                </View>
              </GlassCard>

              {/* Favorite Cities */}
              <FavoriteCities
                currentCity={current.location.name}
                currentCountry={current.location.country}
                onCitySelect={(city) => load(city)}
              />

              {/* Sun & Moon Times */}
              {forecast?.forecast?.forecastday?.[0] && (
                <SunMoonTimes
                  sunrise={forecast.forecast.forecastday[0].astro.sunrise}
                  sunset={forecast.forecast.forecastday[0].astro.sunset}
                  isDay={current.current.is_day === 1}
                />
              )}

              {/* Hourly Forecast */}
              {forecast?.forecast?.forecastday?.[0]?.hour && (
                <HourlyForecast
                  hours={forecast.forecast.forecastday[0].hour}
                  temperatureUnit={temperatureUnit}
                />
              )}

              {/* 7-Day Forecast */}
              {forecast?.forecast?.forecastday && (
                <GlassCard>
                  <Text className="mb-3 font-semibold text-white">7-Day Forecast</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {forecast.forecast.forecastday.map((day) => (
                      <View key={day.date} className="mr-4 items-center">
                        <Text className="text-xs text-white/50">
                          {new Date(day.date).toLocaleDateString([], { weekday: 'short' })}
                        </Text>
                        <Image
                          source={{ uri: `https:${day.day.condition.icon}` }}
                          style={{ width: 48, height: 48, marginVertical: 8 }}
                        />
                        <Text className="text-lg font-semibold text-white">
                          {Math.round(day.day.maxtemp_c)}°
                        </Text>
                        <Text className="text-sm text-white/40">
                          {Math.round(day.day.mintemp_c)}°
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </GlassCard>
              )}
            </Animated.View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
