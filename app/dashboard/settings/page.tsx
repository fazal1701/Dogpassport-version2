'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { VerificationBadge, DogCard } from '@/components/dog-passport';
import { mockUser, mockDog } from '@/lib/mock-data';
import { getDogsByUserId } from '@/lib/mock-data/dogs';
import { 
  User, 
  Settings, 
  Bell, 
  Moon, 
  Sun, 
  Globe, 
  Shield, 
  LogOut, 
  ChevronRight,
  CreditCard,
  HelpCircle,
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const router = useRouter();
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  const userDogs = getDogsByUserId(mockUser.id);

  const subscriptionTierConfig = {
    free: {
      label: 'Free',
      color: 'text-gray-600',
      bg: 'bg-gray-100',
      description: 'Basic features',
    },
    premium: {
      label: 'Premium',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      description: 'Blue checkmark verification',
    },
    blue: {
      label: 'Blue Tier',
      color: 'text-blue-700',
      bg: 'bg-blue-200',
      description: 'Premium + Priority support',
    },
    family: {
      label: 'Family',
      color: 'text-golden-brown-600',
      bg: 'bg-golden-brown-100',
      description: 'Multiple dogs',
    },
  };

  const tierConfig = subscriptionTierConfig[mockUser.subscriptionTier];

    return (
    <div className="max-w-md mx-auto min-h-screen" style={{ background: 'var(--golden-brown-50)' }}>
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-golden-brown-200 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => router.back()} 
            className="text-gray-600 hover:text-navy-900"
          >
            ←
          </button>
          <h1 className="text-lg font-bold text-navy-900">Profile & Settings</h1>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {/* User Profile Card */}
        <Card className="bg-gradient-to-br from-golden-brown-50 to-golden-brown-100 border border-golden-brown-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <Image
                  src={mockUser.avatar || '/placeholder-user.jpg'}
                  alt={mockUser.name}
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-golden-brown-500 rounded-full p-1.5 border-2 border-white">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-navy-900 mb-1">{mockUser.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{mockUser.email}</p>
                <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${tierConfig.bg} ${tierConfig.color}`}>
                  <Shield className="w-3 h-3" />
                  {tierConfig.label}
                </div>
              </div>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-navy-900">{mockUser.stats.dogsManaged}</p>
                <p className="text-xs text-gray-600">Dogs</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-navy-900">{mockUser.stats.recordsUploaded}</p>
                <p className="text-xs text-gray-600">Records</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* My Dogs Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-navy-900">My Dogs</h3>
            <button 
              onClick={() => router.push('/dashboard')}
              className="text-xs text-navy-900 font-semibold hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {userDogs.slice(0, 2).map((dog) => (
              <DogCard
                key={dog.id}
                dog={dog}
                href={`/dashboard/dogs/${dog.id}`}
                variant="elevated"
              />
            ))}
            {userDogs.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600 text-sm">No dogs added yet</p>
                  <Button
                    onClick={() => {/* Add dog */}}
                    className="mt-3 bg-navy-900 hover:bg-navy-800 text-white"
                    size="sm"
                  >
                    Add Your First Dog
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Account Settings */}
        <div>
          <h3 className="text-sm font-bold text-navy-900 mb-3">Account</h3>
          <Card>
            <CardContent className="p-0">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-golden-brown-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-navy-900" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-navy-900">Email</p>
                    <p className="text-xs text-gray-600">{mockUser.email}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              {mockUser.phone && (
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-golden-brown-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-navy-900" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-navy-900">Phone</p>
                      <p className="text-xs text-gray-600">{mockUser.phone}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              )}
              {mockUser.location && (
                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-golden-brown-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-navy-900" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-navy-900">Location</p>
                      <p className="text-xs text-gray-600">{mockUser.location}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Subscription */}
        <div>
          <h3 className="text-sm font-bold text-navy-900 mb-3">Subscription</h3>
          <Card className="border-2 border-golden-brown-200 bg-golden-brown-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-5 h-5 text-navy-900" />
                    <p className="font-bold text-navy-900">{tierConfig.label} Plan</p>
                  </div>
                  <p className="text-xs text-gray-600">{tierConfig.description}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${tierConfig.bg} ${tierConfig.color}`}>
                  {tierConfig.label}
                </div>
              </div>
              {mockUser.subscriptionExpiresAt && (
                <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Expires {mockUser.subscriptionExpiresAt.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              )}
              <Button
                onClick={() => router.push('/dashboard/subscription')}
                className="w-full bg-navy-900 hover:bg-navy-800 text-white"
                size="sm"
                style={{ backgroundColor: 'var(--navy-900)' }}
              >
                {mockUser.subscriptionTier === 'free' ? 'Upgrade to Premium' : 'Manage Subscription'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preferences */}
        <div>
          <h3 className="text-sm font-bold text-navy-900 mb-3">Preferences</h3>
          <Card>
            <CardContent className="p-0">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-navy-900" />
                  <span className="text-sm font-semibold text-navy-900">Notifications</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button 
                onClick={() => {
                  const themes: ('light' | 'dark' | 'auto')[] = ['light', 'dark', 'auto'];
                  const currentIndex = themes.indexOf(theme);
                  setTheme(themes[(currentIndex + 1) % themes.length]);
                }}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <Moon className="w-5 h-5 text-navy-900" />
                  ) : theme === 'light' ? (
                    <Sun className="w-5 h-5 text-navy-900" />
                  ) : (
                    <Settings className="w-5 h-5 text-navy-900" />
                  )}
                  <div className="text-left">
                    <span className="text-sm font-semibold text-navy-900">Theme</span>
                    <p className="text-xs text-gray-600 capitalize">{theme}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-navy-900" />
                  <div className="text-left">
                    <span className="text-sm font-semibold text-navy-900">Language</span>
                    <p className="text-xs text-gray-600">{mockUser.preferences.language}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Support & Help */}
        <div>
          <h3 className="text-sm font-bold text-navy-900 mb-3">Support</h3>
          <Card>
            <CardContent className="p-0">
              <button 
                onClick={() => router.push('/dashboard/support')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-navy-900" />
                  <span className="text-sm font-semibold text-navy-900">Help Center</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button 
                onClick={() => router.push('/dashboard/education')}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-navy-900" />
                  <span className="text-sm font-semibold text-navy-900">Education Library</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </CardContent>
          </Card>
        </div>

        {/* Danger Zone */}
        <div>
          <h3 className="text-sm font-bold text-red-600 mb-3">Account</h3>
          <Card className="border-red-200">
            <CardContent className="p-0">
              <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-red-600">
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-semibold">Sign Out</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

