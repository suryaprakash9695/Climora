'use client';

import { motion } from 'framer-motion';
import {
  CloudSun,
  Brain,
  Wind,
  Bell,
  MapPin,
  Smartphone,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { FEATURES } from '@/constants';

const icons: Record<string, React.ElementType> = {
  'cloud-sun': CloudSun,
  brain: Brain,
  wind: Wind,
  bell: Bell,
  'map-pin': MapPin,
  smartphone: Smartphone,
};

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white">Everything you need</h2>
          <p className="mt-4 text-white/60">
            A complete weather ecosystem powered by AI and real-time data
          </p>
        </motion.div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = icons[f.icon] ?? CloudSun;
            return (
              <GlassCard key={f.title} delay={i * 0.1}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/30 to-cyan-500/20">
                  <Icon className="h-6 w-6 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-white/60">{f.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
