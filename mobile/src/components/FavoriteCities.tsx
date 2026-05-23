import { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlassCard } from './GlassCard';

interface FavoriteCity {
  name: string;
  country: string;
  addedAt: string;
}

interface Props {
  currentCity?: string;
  currentCountry?: string;
  onCitySelect: (city: string) => void;
}

export function FavoriteCities({ currentCity, currentCountry, onCitySelect }: Props) {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem('climora_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (cities: FavoriteCity[]) => {
    try {
      await AsyncStorage.setItem('climora_favorites', JSON.stringify(cities));
      setFavorites(cities);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addFavorite = () => {
    if (!currentCity) return;
    
    const exists = favorites.some((f) => f.name === currentCity);
    if (exists) return;

    const newFavorites = [
      ...favorites,
      {
        name: currentCity,
        country: currentCountry || '',
        addedAt: new Date().toISOString(),
      },
    ];
    saveFavorites(newFavorites);
  };

  const removeFavorite = (name: string) => {
    saveFavorites(favorites.filter((f) => f.name !== name));
  };

  const isFavorite = currentCity && favorites.some((f) => f.name === currentCity);

  return (
    <GlassCard className="mb-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-white">Favorite Cities</Text>
        {currentCity && (
          <Pressable
            onPress={addFavorite}
            disabled={isFavorite}
            className={`flex-row items-center gap-2 rounded-xl px-3 py-2 ${
              isFavorite ? 'bg-white/10' : 'bg-violet-600'
            }`}
          >
            <Ionicons
              name={isFavorite ? 'star' : 'add'}
              size={16}
              color="white"
            />
            <Text className="text-sm text-white">
              {isFavorite ? 'Saved' : 'Add'}
            </Text>
          </Pressable>
        )}
      </View>

      {favorites.length === 0 ? (
        <Text className="text-center text-sm text-white/50">
          No favorite cities yet. Add your current city to get started!
        </Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {favorites.map((city) => (
            <Pressable
              key={city.name}
              onPress={() => onCitySelect(city.name)}
              className="mr-3 rounded-xl bg-white/5 p-4"
              style={{ width: 140 }}
            >
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Text className="font-medium text-white" numberOfLines={1}>
                    {city.name}
                  </Text>
                  <Text className="text-xs text-white/50" numberOfLines={1}>
                    {city.country}
                  </Text>
                </View>
                <Pressable
                  onPress={() => removeFavorite(city.name)}
                  className="ml-2"
                >
                  <Ionicons name="trash-outline" size={16} color="#f87171" />
                </Pressable>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </GlassCard>
  );
}
