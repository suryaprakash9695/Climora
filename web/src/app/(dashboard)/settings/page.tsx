'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { useThemeStore } from '@/store/themeStore';
import { LANGUAGES } from '@/constants';

export default function SettingsPage() {
  const {
    theme,
    temperatureUnit,
    language,
    notifications,
    setTheme,
    setTemperatureUnit,
    setLanguage,
    setNotifications,
  } = useThemeStore();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      <GlassCard>
        <h2 className="mb-4 font-semibold text-white">Appearance</h2>
        <div className="flex gap-2">
          {(['dark', 'light', 'system'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`rounded-xl px-4 py-2 text-sm capitalize ${
                theme === t
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="mb-4 font-semibold text-white">Units</h2>
        <div className="flex gap-2">
          {(['celsius', 'fahrenheit'] as const).map((u) => (
            <button
              key={u}
              onClick={() => setTemperatureUnit(u)}
              className={`rounded-xl px-4 py-2 text-sm capitalize ${
                temperatureUnit === u
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/5 text-white/60'
              }`}
            >
              °{u === 'celsius' ? 'C' : 'F'}
            </button>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="mb-4 font-semibold text-white">Language</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white"
        >
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code} className="bg-slate-900">
              {l.label}
            </option>
          ))}
        </select>
      </GlassCard>

      <GlassCard>
        <h2 className="mb-4 font-semibold text-white">Notifications</h2>
        <div className="space-y-3">
          {(
            [
              ['rainAlerts', 'Rain alerts'],
              ['stormWarnings', 'Storm warnings'],
              ['extremeWeather', 'Extreme weather'],
              ['dailySummary', 'Daily summary'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center justify-between">
              <span className="text-white/80">{label}</span>
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={(e) => setNotifications({ [key]: e.target.checked })}
                className="h-5 w-5 rounded accent-violet-600"
              />
            </label>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
