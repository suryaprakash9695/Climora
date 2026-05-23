'use client';

import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40',
    secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/10',
    ghost: 'text-white/80 hover:text-white hover:bg-white/10',
    outline: 'border border-violet-500/50 text-violet-300 hover:bg-violet-500/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      )}
      {children}
    </button>
  );
}
