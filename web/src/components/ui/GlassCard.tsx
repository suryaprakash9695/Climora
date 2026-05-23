'use client';

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
  id?: string;
}

export function GlassCard({ children, className, delay = 0, hover = true, id }: GlassCardProps) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      className={cn(
        'rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl',
        'shadow-xl shadow-black/10 dark:border-white/10 dark:bg-white/5',
        'light:border-sky-200/50 light:bg-white/60',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
