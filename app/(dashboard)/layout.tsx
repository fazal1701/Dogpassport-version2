'use client';

import { BottomNav } from '@/components/dashboard/bottom-nav';
import { TopNav } from '@/components/dashboard/top-nav';
import { AuthProvider } from '@/lib/auth-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-ice-50 via-white to-gray-50">
        <TopNav />
        <div className="pt-16 pb-20">
          {children}
        </div>
        <BottomNav />
      </div>
    </AuthProvider>
  );
}
