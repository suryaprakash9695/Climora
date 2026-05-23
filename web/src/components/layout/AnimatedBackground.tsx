'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900" />
      <motion.div
        className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-32 top-40 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/30"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 100}%`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -20, 0] }}
          transition={{
            duration: 3 + (i % 5),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}
