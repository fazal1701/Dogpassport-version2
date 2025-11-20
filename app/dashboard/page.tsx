'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockUser, mockDog, mockDogBadges, mockRecords, mockAIInsights, mockAppointments } from '@/lib/mock-data';
import { BottomNav } from '@/components/dashboard/bottom-nav';
import { useAuth } from '@/lib/auth-context';
import { CheckCircle2, Clock, Shield, AlertCircle, Calendar, FileText, ArrowRight, Bell, Settings, Plane, Car, UtensilsCrossed, Sparkles, Heart } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [passportMode, setPassportMode] = useState<'default' | 'flight' | 'rideshare' | 'restaurant' | 'allergy'>('default');

  // User is automatically logged in as John Doe

  const expiringRecords = mockRecords.filter(r => r.status === 'expiring-soon').length;

  const getCheckmarkDisplay = () => {
    switch (mockDog.checkmarkStatus) {
      case 'blue':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-blue-600" />,
          text: 'Blue Checkmark',
          bg: 'bg-blue-100',
          border: 'border-blue-500',
          textColor: 'text-blue-800',
          description: 'Premium Verified',
        };
      case 'green':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
          text: 'Green Checkmark',
          bg: 'bg-emerald-100',
          border: 'border-emerald-500',
          textColor: 'text-emerald-800',
          description: 'Complete',
        };
      case 'yellow':
        return {
          icon: <Clock className="w-5 h-5 text-yellow-600" />,
          text: 'Yellow Checkmark',
          bg: 'bg-yellow-100',
          border: 'border-yellow-500',
          textColor: 'text-yellow-800',
          description: 'Temporary',
        };
      default:
        return null;
    }
  };

  const checkmark = getCheckmarkDisplay();

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-border p-4 flex justify-between items-center z-10">
        <h1 className="text-lg font-bold text-navy-900">Dog Passport</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/dashboard/support')}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {expiringRecords > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => {/* Settings */}}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Hero Card */}
        <Card className="bg-gradient-to-br from-ice-100 to-emerald-50 border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-700 mb-1">Welcome back</p>
                <h2 className="text-2xl font-bold text-navy-900">{mockUser.name}</h2>
              </div>
              <Image
                src="/service-dog-labrador.jpg"
                alt={mockDog.name}
                width={60}
                height={60}
                className="rounded-full border-2 border-white shadow-md"
              />
            </div>
            <div className="bg-white bg-opacity-80 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-navy-900">{mockDog.name}</p>
                {checkmark && (
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${checkmark.bg} ${checkmark.border} ${checkmark.textColor}`}>
                    {checkmark.icon}
                    <span className="text-xs font-semibold">{checkmark.text}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-700">{mockDog.breed}</p>
              <div className="flex gap-1 mt-2 flex-wrap">
                {mockDogBadges.adaCompliant && (
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> ADA
                  </span>
                )}
                {mockDogBadges.vetVerified && (
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                )}
                {user.subscriptionTier === 'premium' && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Premium
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Primary Action */}
        <div className="space-y-2">
          <Button
            onClick={() => router.push('/dashboard/wallet')}
            className="w-full bg-navy-900 hover:bg-navy-800 text-white h-12 text-lg font-semibold flex items-center justify-center gap-2"
          >
            <Shield className="w-5 h-5" /> Show My Passport
          </Button>
          {user.subscriptionTier === 'free' && (
            <Button
              onClick={() => router.push('/dashboard/subscription')}
              variant="outline"
              className="w-full border-forest-600 text-forest-600 hover:bg-forest-50"
            >
              <Shield className="w-4 h-4 mr-2" />
              Upgrade to Premium for Blue Checkmark
            </Button>
          )}
          {mockDog.checkmarkStatus !== 'blue' && user.subscriptionTier === 'premium' && (
            <Button
              onClick={() => router.push('/dashboard/verification')}
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Request Vet Verification
            </Button>
          )}
        </div>

        {/* Passport Modes - Quick Access */}
        <div>
          <h3 className="text-sm font-bold text-navy-900 mb-3">Passport Modes</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { mode: 'default', label: 'Standard', component: Shield },
              { mode: 'flight', label: 'Flight', component: Plane },
              { mode: 'rideshare', label: 'Rideshare', component: Car },
              { mode: 'restaurant', label: 'Restaurant', component: UtensilsCrossed },
            ].map(({ mode, label, component: IconComponent }) => (
              <button
                key={mode}
                onClick={() => {
                  setPassportMode(mode as any);
                  router.push('/dashboard/wallet');
                }}
                className={`p-3 rounded-xl text-center transition-all border-2 ${
                  passportMode === mode
                    ? 'bg-forest-600 text-white border-forest-700 shadow-md scale-105'
                    : 'bg-white text-gray-800 border-gray-200 hover:border-forest-300 hover:bg-forest-50'
                }`}
              >
                <IconComponent className={`w-6 h-6 mx-auto mb-1 ${passportMode === mode ? 'text-white' : 'text-navy-900'}`} />
                <p className="text-xs font-semibold">{label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Critical Alerts Section */}
        <div className="space-y-3">
          {/* Expiration Alerts */}
          {expiringRecords > 0 && (
            <Card className="border-2 border-amber-400 bg-amber-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-amber-900 text-sm">
                      {expiringRecords} record{expiringRecords > 1 ? 's' : ''} expiring soon
                    </p>
                    <p className="text-xs text-amber-800 mt-1">
                      Review and renew to maintain verification status
                    </p>
                    <Button
                      onClick={() => router.push('/dashboard/records')}
                      variant="outline"
                      size="sm"
                      className="mt-2 border-amber-600 text-amber-700 hover:bg-amber-100"
                    >
                      View Records
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* AI Health Insights */}
          {mockAIInsights.length > 0 && mockAIInsights[0].priority === 'high' && (
            <Card className="border-2 border-red-300 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-bold text-red-900 text-sm">{mockAIInsights[0].title}</p>
                    <p className="text-xs text-red-800 mt-1">{mockAIInsights[0].message}</p>
                    <button
                      onClick={() => router.push('/dashboard/health')}
                      className="text-xs text-red-700 font-semibold mt-2 hover:underline flex items-center gap-1"
                    >
                      View all insights <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Upcoming Appointments */}
        {mockAppointments.filter(a => a.status === 'scheduled').length > 0 && (
          <Card className="border-2 border-forest-200 bg-forest-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-forest-600" />
                  <p className="font-bold text-navy-900">Upcoming Appointments</p>
                </div>
                <button
                  onClick={() => router.push('/dashboard/health')}
                  className="text-xs text-gray-700 font-semibold hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="space-y-2">
                {mockAppointments
                  .filter(a => a.status === 'scheduled')
                  .slice(0, 2)
                  .map((apt) => (
                    <div key={apt.id} className="bg-white rounded-lg p-3 border border-forest-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-navy-900">{apt.title}</p>
                          <p className="text-xs text-gray-700 mt-1">
                            {new Date(apt.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </p>
                          {apt.vetName && (
                            <p className="text-xs text-gray-600 mt-1">{apt.vetName}</p>
                          )}
                        </div>
                        <span className="text-xs bg-forest-100 text-forest-800 px-2 py-1 rounded-full">
                          {apt.type}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Status Overview Grid */}
        <div>
          <h3 className="text-sm font-bold text-navy-900 mb-3">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card 
              className="border border-border hover:border-forest-600 transition-colors cursor-pointer"
              onClick={() => router.push('/dashboard/records')}
            >
              <CardContent className="p-4 text-center">
                <FileText className="w-6 h-6 text-navy-900 mx-auto mb-2" />
                <p className="text-2xl font-bold text-navy-900">{mockRecords.length}</p>
                <p className="text-xs text-gray-700">Medical Records</p>
                <p className="text-xs text-emerald-600 mt-1 font-semibold">
                  {mockRecords.filter(r => r.verifiedByVet).length} verified
                </p>
              </CardContent>
            </Card>
            <Card 
              className={`border transition-colors cursor-pointer ${
                expiringRecords > 0 
                  ? 'border-amber-400 bg-amber-50 hover:bg-amber-100' 
                  : 'border-border hover:border-forest-600'
              }`}
              onClick={() => router.push('/dashboard/records')}
            >
              <CardContent className="p-4 text-center">
                <AlertCircle className={`w-6 h-6 mx-auto mb-2 ${expiringRecords > 0 ? 'text-amber-600' : 'text-gray-400'}`} />
                <p className="text-2xl font-bold text-navy-900">{expiringRecords}</p>
                <p className="text-xs text-gray-700">Expiring Soon</p>
                {expiringRecords === 0 && (
                  <p className="text-xs text-emerald-600 mt-1 font-semibold">All current</p>
                )}
              </CardContent>
            </Card>
            <Card 
              className="border border-border hover:border-forest-600 transition-colors cursor-pointer"
              onClick={() => router.push('/dashboard/health')}
            >
              <CardContent className="p-4 text-center">
                <Calendar className="w-6 h-6 text-navy-900 mx-auto mb-2" />
                <p className="text-2xl font-bold text-navy-900">
                  {mockAppointments.filter(a => a.status === 'scheduled').length}
                </p>
                <p className="text-xs text-gray-700">Upcoming</p>
                <p className="text-xs text-gray-600 mt-1">
                  {mockAppointments.filter(a => a.status === 'scheduled').length > 0 
                    ? 'Next: ' + new Date(mockAppointments.filter(a => a.status === 'scheduled')[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : 'None scheduled'
                  }
                </p>
              </CardContent>
            </Card>
            <Card 
              className="border border-border hover:border-forest-600 transition-colors cursor-pointer"
              onClick={() => router.push('/dashboard/verification')}
            >
              <CardContent className="p-4 text-center">
                {checkmark?.icon && (
                  <div className="mb-2 flex justify-center">
                    {checkmark.icon}
                  </div>
                )}
                <p className="text-sm font-bold text-navy-900">
                  {checkmark?.text || 'No Checkmark'}
                </p>
                <p className="text-xs text-gray-700 mt-1">
                  {checkmark?.description || 'Get verified'}
                </p>
                {user.subscriptionTier === 'free' && (
                  <p className="text-xs text-blue-600 mt-1 font-semibold">Upgrade for Blue</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions & Navigation */}
        <div>
          <h3 className="text-sm font-bold text-navy-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button
              onClick={() => router.push('/dashboard/records')}
              className="w-full text-left p-4 bg-white border-2 border-border rounded-xl hover:border-forest-600 hover:bg-forest-50 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-forest-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-forest-600" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Health Records</p>
                  <p className="text-xs text-gray-700">Upload & manage documents</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-forest-600 transition-colors" />
            </button>

            <button
              onClick={() => router.push('/dashboard/health')}
              className="w-full text-left p-4 bg-gradient-to-r from-forest-50 to-emerald-50 border-2 border-forest-300 rounded-xl hover:border-forest-600 hover:from-forest-100 hover:to-emerald-100 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-forest-200 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-forest-700" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Health Hub</p>
                  <p className="text-xs text-gray-700">Track meals, appointments & AI insights</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-forest-600 group-hover:text-forest-700 transition-colors" />
            </button>

            <button
              onClick={() => router.push('/dashboard/verification')}
              className="w-full text-left p-4 bg-white border-2 border-border rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Verification Status</p>
                  <p className="text-xs text-gray-700">
                    {mockDog.vetVerificationStatus === 'approved' 
                      ? 'Blue Checkmark active'
                      : mockDog.vetVerificationStatus === 'pending'
                      ? 'Under review'
                      : 'Request vet verification'
                    }
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </button>

            <button
              onClick={() => router.push('/dashboard/education')}
              className="w-full text-left p-4 bg-white border-2 border-border rounded-xl hover:border-forest-600 hover:bg-forest-50 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ice-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-navy-900" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Education Library</p>
                  <p className="text-xs text-gray-700">ADA rights, staff training, legal guides</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-forest-600 transition-colors" />
            </button>

            <button
              onClick={() => router.push('/dashboard/travel')}
              className="w-full text-left p-4 bg-white border-2 border-border rounded-xl hover:border-forest-600 hover:bg-forest-50 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-ice-100 rounded-lg flex items-center justify-center">
                  <Plane className="w-5 h-5 text-navy-900" />
                </div>
                <div>
                  <p className="font-semibold text-navy-900">Travel Guides</p>
                  <p className="text-xs text-gray-700">Flying, hotels, restaurants, events</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-forest-600 transition-colors" />
            </button>

            {user.subscriptionTier === 'free' && (
              <button
                onClick={() => router.push('/dashboard/subscription')}
                className="w-full text-left p-4 bg-gradient-to-r from-blue-50 to-forest-50 border-2 border-blue-300 rounded-xl hover:border-blue-600 hover:from-blue-100 hover:to-forest-100 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">Upgrade to Premium</p>
                    <p className="text-xs text-blue-700">Get Blue Checkmark verification - $99/year</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
              </button>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-sm font-bold text-navy-900 mb-3">Recent Activity</h3>
          <Card className="border border-border">
            <CardContent className="p-4 space-y-3">
              {mockRecords.slice(0, 3).map((record) => (
                <div key={record.id} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-8 h-8 bg-ice-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-navy-900" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-navy-900 truncate">{record.fileName}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(record.uploadedAt).toLocaleDateString()} • {record.category.replace('-', ' ')}
                    </p>
                  </div>
                  {record.verifiedByVet && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  )}
                </div>
              ))}
              <button
                onClick={() => router.push('/dashboard/records')}
                className="w-full text-center text-sm text-forest-600 font-semibold pt-2 hover:underline"
              >
                View all records →
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

