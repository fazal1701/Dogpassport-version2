'use client';

import { MobileBottomNav } from '@/components/dog-passport';
import { AuthProvider } from '@/lib/auth-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-off-white" style={{ paddingBottom: 'max(5rem, calc(env(safe-area-inset-bottom) + 3.5rem))' }}>
        {children}
        <MobileBottomNav />
      </div>
    </AuthProvider>
  );
}

