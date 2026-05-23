import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { DashboardNav } from '@/components/layout/DashboardNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <DashboardNav />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-8 lg:pb-8">{children}</div>
      </main>
    </div>
  );
}
