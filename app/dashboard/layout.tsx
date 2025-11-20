'use client';

import { MobileBottomNav } from '@/components/dog-passport/mobile-bottom-nav';
import { TopNav } from '@/components/dashboard/top-nav';
import { AuthProvider } from '@/lib/auth-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen" style={{ background: 'var(--golden-brown-50)' }}>
        <TopNav />
        <div className="pt-16 pb-20">
          {children}
        </div>
        <MobileBottomNav />
      </div>
    </AuthProvider>
  );
}

