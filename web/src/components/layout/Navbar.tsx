'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cloud, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { APP_NAME } from '@/constants';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

const navLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/#ai', label: 'AI' },
  { href: '/#screenshots', label: 'Screenshots' },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isLanding = pathname === '/';

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500">
            <Cloud className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">{APP_NAME}</span>
        </Link>

        {isLanding && (
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/dashboard">
            <Button size="sm">Open Dashboard</Button>
          </Link>
        </div>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 bg-slate-950/95 px-6 py-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn('block py-2 text-white/70')}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4">
              <Link href="/dashboard">
                <Button className="w-full">Open Dashboard</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
