'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  async function handleLogin() {
    try {
      await login();
      router.push('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-off-white to-white">
      <Card className="w-full max-w-md shadow-xl border-2">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-navy-900 rounded-full flex items-center justify-center">
              <span className="text-3xl">🐾</span>
            </div>
          </div>
          <CardTitle className="text-center text-2xl text-navy-900">Welcome Back</CardTitle>
          <CardDescription className="text-center">Sign in to your Dog Passport account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-navy-900 hover:bg-navy-800 text-white h-12 font-semibold"
          >
            {isLoading ? 'Signing in...' : 'Login'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
