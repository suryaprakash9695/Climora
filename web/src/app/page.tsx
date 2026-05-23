import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { AISection } from '@/components/landing/AISection';
import { Footer } from '@/components/landing/Footer';
import { redirect } from 'next/navigation';

export default function LandingPage() {
  // Redirect directly to dashboard
  redirect('/dashboard');
}
