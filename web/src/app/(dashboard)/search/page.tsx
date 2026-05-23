'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Clock, TrendingUp } from 'lucide-react';
import { searchCities } from '@/services/weather';
import { useWeatherStore } from '@/store/weatherStore';
import { TRENDING_CITIES } from '@/constants';
import { GlassCard } from '@/components/ui/GlassCard';
import type { SearchResult } from '@/types';

export default function SearchPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const recentSearches = useWeatherStore((s) => s.recentSearches);
  const setActiveCity = useWeatherStore((s) => s.setActiveCity);

  const handleSearch = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const data = await searchCities(q);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const selectCity = (city: string) => {
    setActiveCity(city);
    router.push(`/weather/${encodeURIComponent(city)}`);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Search Weather</h1>

      <div className="relative">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-white/40" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search city..."
          className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:border-violet-500/50 focus:outline-none"
        />
      </div>

      {loading && <p className="text-white/50">Searching...</p>}

      {results.length > 0 && (
        <GlassCard>
          <ul className="divide-y divide-white/5">
            {results.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => selectCity(r.name)}
                  className="flex w-full items-center justify-between py-3 text-left hover:text-violet-300"
                >
                  <span className="text-white">
                    {r.name}, {r.region}, {r.country}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </GlassCard>
      )}

      {recentSearches.length > 0 && (
        <div>
          <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-white/60">
            <Clock className="h-4 w-4" />
            Recent Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((city) => (
              <button
                key={city}
                onClick={() => selectCity(city)}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-violet-500/20"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-white/60">
          <TrendingUp className="h-4 w-4" />
          Trending Cities
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {TRENDING_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => selectCity(city)}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-left text-white transition hover:border-violet-500/30 hover:bg-violet-500/10"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
