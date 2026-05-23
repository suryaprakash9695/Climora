'use client';

import { motion } from 'framer-motion';
import { Sparkles, Shirt, Dumbbell, Plane } from 'lucide-react';

const insights = [
  { icon: Shirt, title: 'Outfit Suggestions', desc: 'Dress smart for any forecast' },
  { icon: Dumbbell, title: 'Fitness Tips', desc: 'Indoor or outdoor workout advice' },
  { icon: Plane, title: 'Travel Advice', desc: 'Plan trips with confidence' },
  { icon: Sparkles, title: 'Smart Alerts', desc: 'Rain, heat, and storm warnings' },
];

export function AISection() {
  return (
    <section id="ai" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium text-violet-400">Powered by Groq AI</span>
            <h2 className="mt-4 text-4xl font-bold text-white">
              Weather intelligence that thinks ahead
            </h2>
            <p className="mt-4 text-white/60">
              Climora analyzes real-time conditions to deliver personalized outfit,
              fitness, travel, and hydration recommendations — so you always know what to expect.
            </p>
            <blockquote className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-6 italic text-white/80">
              &ldquo;High humidity and chances of rain expected today. Carry an umbrella and stay
              hydrated.&rdquo;
            </blockquote>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {insights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <item.icon className="h-8 w-8 text-cyan-400" />
                <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-white/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
