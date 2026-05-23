import { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBackground } from '@/components/GradientBackground';
import { GlassCard } from '@/components/GlassCard';
import { searchCities } from '@/services/weather';
import { useWeatherStore } from '@/store/weatherStore';
import { TRENDING_CITIES } from '@/constants';
import type { SearchResult } from '@/types';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const { setActiveCity, addRecent, recentSearches } = useWeatherStore();

  const search = async (q: string) => {
    setQuery(q);
    if (q.length < 2) {
      setResults([]);
      return;
    }
    const data = await searchCities(q);
    setResults(data);
  };

  const select = (name: string) => {
    setActiveCity(name);
    addRecent(name);
  };

  return (
    <View className="flex-1">
      <GradientBackground />
      <SafeAreaView className="flex-1 px-5">
        <Text className="mb-4 text-2xl font-bold text-white">Search</Text>
        <TextInput
          value={query}
          onChangeText={search}
          placeholder="Search city..."
          placeholderTextColor="rgba(255,255,255,0.4)"
          className="mb-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
        />
        <FlatList
          data={results}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Pressable onPress={() => select(item.name)}>
              <GlassCard className="mb-2">
                <Text className="text-white">
                  {item.name}, {item.region}, {item.country}
                </Text>
              </GlassCard>
            </Pressable>
          )}
          ListHeaderComponent={
            <>
              {recentSearches.length > 0 && (
                <View className="mb-4">
                  <Text className="mb-2 text-white/60">Recent</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {recentSearches.map((c) => (
                      <Pressable
                        key={c}
                        onPress={() => select(c)}
                        className="rounded-full bg-white/10 px-4 py-2"
                      >
                        <Text className="text-white">{c}</Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              )}
              <Text className="mb-2 text-white/60">Trending</Text>
              {TRENDING_CITIES.map((city) => (
                <Pressable key={city} onPress={() => select(city)} className="mb-2">
                  <View className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <Text className="text-white">{city}</Text>
                  </View>
                </Pressable>
              ))}
            </>
          }
        />
      </SafeAreaView>
    </View>
  );
}
