'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CloudRain, Sparkles } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION } from '@/constants';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center px-6 pt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
            <Sparkles className="h-4 w-4" />
            AI-Powered Weather Intelligence
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
            {APP_NAME}
            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              {APP_TAGLINE}
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-white/60">{APP_DESCRIPTION}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/dashboard">
              <Button size="lg">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 to-cyan-500/10 p-8 backdrop-blur-xl">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-white/60">Current Location</p>
                <p className="text-2xl font-bold text-white">San Francisco</p>
              </div>
              <CloudRain className="h-16 w-16 text-cyan-400" />
            </motion.div>
            <p className="mt-6 text-8xl font-light text-white">
              22<span className="text-4xl">°</span>
            </p>
            <p className="text-violet-300">Partly cloudy · Feels like 20°</p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {['Humidity 65%', 'Wind 12 km/h', 'UV Index 4'].map((s) => (
                <div key={s} className="rounded-xl bg-white/5 p-3 text-center text-sm text-white/70">
                  {s}
                </div>
              ))}
            </div>
            <motion.div
              className="absolute -bottom-4 -right-4 rounded-2xl border border-violet-500/30 bg-slate-900/90 p-4 backdrop-blur-xl"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <p className="text-xs text-violet-400">AI Insight</p>
              <p className="mt-1 max-w-[200px] text-sm text-white/80">
                Carry an umbrella. High humidity expected this afternoon.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
