'use client';

import { AuthProvider } from '@/lib/auth-context';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-ice-50 to-off-white">
        {children}
      </div>
    </AuthProvider>
  );
}
