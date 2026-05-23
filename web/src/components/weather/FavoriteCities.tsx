'use client';

import { useState, useEffect } from 'react';
import { Star, Trash2, Plus } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

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
    const stored = localStorage.getItem('climora_favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const saveFavorites = (cities: FavoriteCity[]) => {
    localStorage.setItem('climora_favorites', JSON.stringify(cities));
    setFavorites(cities);
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
    <GlassCard>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-white">Favorite Cities</h2>
        {currentCity && (
          <Button
            variant={isFavorite ? 'secondary' : 'primary'}
            size="sm"
            onClick={addFavorite}
            disabled={isFavorite}
          >
            {isFavorite ? (
              <>
                <Star className="h-4 w-4 fill-current" />
                Saved
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add Current
              </>
            )}
          </Button>
        )}
      </div>

      {favorites.length === 0 ? (
        <p className="text-center text-sm text-white/50">
          No favorite cities yet. Add your current city to get started!
        </p>
      ) : (
        <div className="space-y-2">
          {favorites.map((city) => (
            <div
              key={city.name}
              className="flex items-center justify-between rounded-xl bg-white/5 p-3 transition-all hover:bg-white/10"
            >
              <button
                onClick={() => onCitySelect(city.name)}
                className="flex-1 text-left"
              >
                <p className="font-medium text-white">{city.name}</p>
                <p className="text-xs text-white/50">{city.country}</p>
              </button>
              <button
                onClick={() => removeFavorite(city.name)}
                className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
