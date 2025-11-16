'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Fingerprint, Shield, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('john.doe@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [error, setError] = useState('');
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricAuthenticating, setBiometricAuthenticating] = useState(false);
  const [biometricSuccess, setBiometricSuccess] = useState(false);

  useEffect(() => {
    // Check if biometric authentication is available
    // In a real app, this would check WebAuthn API
    const checkBiometric = async () => {
      if (typeof window !== 'undefined') {
        // Check for WebAuthn support
        const isSupported = 
          typeof PublicKeyCredential !== 'undefined' &&
          typeof navigator.credentials !== 'undefined' &&
          typeof navigator.credentials.create !== 'undefined';
        
        // Also check for stored biometric preference
        const hasStoredBiometric = localStorage.getItem('biometric_enabled') === 'true';
        setBiometricAvailable(isSupported && hasStoredBiometric);
      }
    };
    checkBiometric();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  }

  async function handleBiometricLogin() {
    setBiometricAuthenticating(true);
    setError('');
    
    try {
      // Simulate biometric authentication
      // In production, this would use WebAuthn API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful authentication
      setBiometricSuccess(true);
      await login(email, password);
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch (err) {
      setError('Biometric authentication failed. Please use password.');
      setBiometricAuthenticating(false);
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
          {/* Biometric Login - Prominent */}
          {biometricAvailable && (
            <div className="space-y-3">
              <Button
                onClick={handleBiometricLogin}
                disabled={biometricAuthenticating || isLoading}
                className="w-full bg-gradient-to-r from-navy-900 to-navy-800 hover:from-navy-800 hover:to-navy-700 text-white h-14 text-lg font-semibold shadow-lg"
              >
                {biometricAuthenticating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authenticating...</span>
                  </div>
                ) : biometricSuccess ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-5 h-5" />
                    <span>Sign In with Biometrics</span>
                  </div>
                )}
              </Button>
              <div className="flex items-center gap-2">
                <div className="flex-1 border-t border-border"></div>
                <span className="text-xs text-gray-500 px-2">or</span>
                <div className="flex-1 border-t border-border"></div>
              </div>
            </div>
          )}

          {/* Traditional Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-navy-900 mb-1 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-navy-900 mb-1 block">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            <Button
              type="submit"
              disabled={isLoading || biometricAuthenticating}
              className="w-full bg-navy-900 hover:bg-navy-800 text-white h-12 font-semibold"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <p className="text-xs text-gray-600">
              Secure authentication • Your data is protected
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
