import Link from 'next/link';
import { Cloud } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from '@/constants';

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500">
            <Cloud className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="font-bold text-white">{APP_NAME}</p>
            <p className="text-xs text-white/50">{APP_TAGLINE}</p>
          </div>
        </div>
        <div className="flex gap-6 text-sm text-white/50">
          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
        </div>
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
