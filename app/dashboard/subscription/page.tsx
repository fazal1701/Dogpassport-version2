'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockUser, mockDog } from '@/lib/mock-data';
import { CheckCircle2, Shield, Plane, Car, Sparkles, X } from 'lucide-react';

export default function SubscriptionPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'monthly'>('annual');
  const isPremium = mockUser.subscriptionTier === 'premium';

  const plans = {
    annual: {
      price: 99,
      period: 'year',
      savings: 'Save $21/year',
      popular: true,
    },
    monthly: {
      price: 10,
      period: 'month',
      savings: null,
      popular: false,
    },
  };

  const currentPlan = plans[selectedPlan];

  const freeFeatures = [
    'Yellow Checkmark (temporary, 7 days)',
    'Green Checkmark (after vet records uploaded)',
    'Basic QR code badge',
    'Document storage',
    'Expiration alerts',
  ];

  const premiumFeatures = [
    'Blue Checkmark - Most trusted verification',
    'Accepted by airlines, rideshares, hotels',
    'Instant DOT form generation',
    'Priority vet verification review',
    'NFC tap verification',
    'Flight mode with TSA pre-approval',
    'Rideshare mode optimization',
    'Allergy transparency mode',
    'Staff education access',
    'Priority customer support',
    'Advanced document AI sorting',
    'Multi-dog profiles (coming soon)',
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center gap-3 z-10">
        <button onClick={() => router.back()} className="text-gray-600 hover:text-navy-900">
          ← Back
        </button>
        <h1 className="text-lg font-bold text-navy-900">Subscription</h1>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Current Status */}
        {isPremium && (
          <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    <p className="font-bold text-lg text-navy-900">Premium Active</p>
                  </div>
                  <p className="text-sm text-gray-700">
                    Your Blue Checkmark is active until {mockUser.subscriptionExpiresAt?.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                  <p className="text-xs text-gray-600 mt-1">Blue Checkmark</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Checkmark Comparison */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Yellow Checkmark */}
          <Card className="border-2 border-yellow-300">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">Y</span>
                </div>
                <CardTitle className="text-base">Yellow</CardTitle>
              </div>
              <CardDescription className="text-xs">Free - Temporary</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                Service dog info submitted. Valid for 7 days until vet records uploaded.
              </p>
            </CardContent>
          </Card>

          {/* Green Checkmark */}
          <Card className="border-2 border-emerald-300">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-base">Green</CardTitle>
              </div>
              <CardDescription className="text-xs">Free - Complete</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                All information uploaded and verified. Basic verification status.
              </p>
            </CardContent>
          </Card>

          {/* Blue Checkmark */}
          <Card className="border-2 border-blue-500 bg-blue-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-base">Blue</CardTitle>
              </div>
              <CardDescription className="text-xs">Premium - Verified</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-700 font-semibold">
                Vet-verified and trusted by airlines, rideshares, and businesses. The gold standard.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Plans */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-navy-900 mb-2">Choose Your Plan</h2>
            <p className="text-gray-600">Upgrade to Premium for Blue Checkmark verification</p>
          </div>

          {/* Plan Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedPlan('annual')}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedPlan === 'annual'
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'text-gray-700 hover:text-navy-900'
                }`}
              >
                Annual
                {selectedPlan === 'annual' && (
                  <span className="ml-2 text-xs text-emerald-300">Save $21</span>
                )}
              </button>
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                  selectedPlan === 'monthly'
                    ? 'bg-navy-900 text-white shadow-md'
                    : 'text-gray-700 hover:text-navy-900'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Plan Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>Basic verification</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-navy-900">$0</span>
                  <span className="text-gray-600">/forever</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {freeFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={!isPremium}
                >
                  {isPremium ? 'Current Plan' : 'Current Plan'}
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className={`border-2 ${currentPlan.popular ? 'border-blue-500 bg-blue-50' : ''}`}>
              {currentPlan.popular && (
                <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Premium
                  {isPremium && (
                    <span className="text-xs bg-emerald-500 text-white px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </CardTitle>
                <CardDescription>Blue Checkmark verification</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-navy-900">${currentPlan.price}</span>
                  <span className="text-gray-600">/{currentPlan.period}</span>
                  {currentPlan.savings && (
                    <p className="text-sm text-emerald-600 font-semibold mt-1">
                      {currentPlan.savings}
                    </p>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {premiumFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    isPremium
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-forest-600 hover:bg-forest-700 text-white'
                  }`}
                  disabled={isPremium}
                >
                  {isPremium ? 'Current Plan' : `Upgrade to Premium - $${currentPlan.price}/${currentPlan.period}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Badges */}
        <Card className="bg-ice-50">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Plane className="w-8 h-8 text-navy-900 mx-auto mb-2" />
                <p className="font-semibold text-navy-900">Airlines</p>
                <p className="text-xs text-gray-600 mt-1">Accepted by major carriers</p>
              </div>
              <div>
                <Car className="w-8 h-8 text-navy-900 mx-auto mb-2" />
                <p className="font-semibold text-navy-900">Rideshares</p>
                <p className="text-xs text-gray-600 mt-1">Uber & Lyft verified</p>
              </div>
              <div>
                <Shield className="w-8 h-8 text-navy-900 mx-auto mb-2" />
                <p className="font-semibold text-navy-900">Businesses</p>
                <p className="text-xs text-gray-600 mt-1">Restaurants & hotels</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-navy-900 mb-1">What's the difference between checkmarks?</p>
              <p className="text-sm text-gray-600">
                Yellow is temporary (7 days), Green means all info is uploaded, and Blue means vet-verified and trusted by businesses.
              </p>
            </div>
            <div>
              <p className="font-semibold text-navy-900 mb-1">Can I cancel anytime?</p>
              <p className="text-sm text-gray-600">
                Yes, you can cancel your Premium subscription at any time. You'll retain access until the end of your billing period.
              </p>
            </div>
            <div>
              <p className="font-semibold text-navy-900 mb-1">Is my information secure?</p>
              <p className="text-sm text-gray-600">
                Absolutely. All data is encrypted and we follow strict authentication protocols to prevent false records.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

