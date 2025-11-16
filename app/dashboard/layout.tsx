'use client';

import { BottomNav } from '@/components/dashboard/bottom-nav';
import { AuthProvider } from '@/lib/auth-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-off-white pb-20">
        {children}
        <BottomNav />
      </div>
    </AuthProvider>
  );
}

