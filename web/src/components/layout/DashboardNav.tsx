'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Cloud,
  Home,
  Search,
  Settings,
  MessageCircle,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { APP_NAME } from '@/constants';

const links = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/search', icon: Search, label: 'Search' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-white/10 bg-slate-950/80 p-6 backdrop-blur-xl lg:flex">
        <Link href="/dashboard" className="mb-10 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500">
            <Cloud className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">{APP_NAME}</span>
        </Link>

        <nav className="flex flex-1 flex-col gap-1">
          {links.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all',
                pathname === href || pathname.startsWith(href + '/')
                  ? 'bg-violet-600/20 text-violet-300'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
          <Link
            href="/dashboard#chat"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/60 hover:bg-white/5 hover:text-white"
          >
            <MessageCircle className="h-5 w-5" />
            AI Chat
          </Link>
        </nav>

        <div className="border-t border-white/10 pt-4">
          <p className="text-xs text-white/50">
            Climora Weather App
          </p>
          <p className="text-xs text-white/30">
            Powered by OpenWeather & Groq AI
          </p>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-white/10 bg-slate-950/90 backdrop-blur-xl lg:hidden">
        {links.map(({ href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-1 flex-col items-center py-3 text-xs',
              pathname === href ? 'text-violet-400' : 'text-white/50'
            )}
          >
            <Icon className="h-5 w-5" />
          </Link>
        ))}
      </nav>
    </>
  );
}
