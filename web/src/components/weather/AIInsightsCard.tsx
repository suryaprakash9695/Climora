'use client';

import { Sparkles, Shirt, Dumbbell, Plane, AlertTriangle, Droplets } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import type { AIInsight } from '@/types';

interface Props {
  insights: AIInsight;
}

export function AIInsightsCard({ insights }: Props) {
  const items = [
    { icon: Sparkles, label: 'Summary', value: insights.summary },
    { icon: Shirt, label: 'Outfit', value: insights.outfit },
    { icon: Dumbbell, label: 'Fitness', value: insights.fitness },
    { icon: Plane, label: 'Travel', value: insights.travel },
    { icon: Droplets, label: 'Hydration', value: insights.hydration },
  ];

  return (
    <GlassCard delay={0.25} className="border-violet-500/20">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-violet-400" />
        <h3 className="text-lg font-semibold text-white">AI Weather Intelligence</h3>
      </div>
      <p className="mb-4 rounded-xl bg-violet-500/10 p-4 text-white/90">{insights.summary}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.slice(1).map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl bg-white/5 p-3">
            <div className="mb-1 flex items-center gap-2 text-violet-300">
              <Icon className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-sm text-white/80">{value}</p>
          </div>
        ))}
      </div>
      {insights.alerts?.length > 0 && (
        <div className="mt-4 space-y-2">
          {insights.alerts.map((alert, i) => (
            <div
              key={i}
              className="flex items-start gap-2 rounded-lg bg-amber-500/10 p-3 text-sm text-amber-200"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              {alert}
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}
