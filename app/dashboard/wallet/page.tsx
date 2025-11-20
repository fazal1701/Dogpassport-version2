'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { QRBadge, VerificationBadge } from '@/components/dog-passport';
import { mockDog, mockRecords } from '@/lib/mock-data';
import { Shield, Plane, Car, UtensilsCrossed, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

type PassportMode = 'default' | 'flight' | 'rideshare' | 'restaurant' | 'allergy';

export default function WalletPage() {
  const router = useRouter();
  const [mode, setMode] = useState<PassportMode>('default');
  const [showNFCAnimation, setShowNFCAnimation] = useState(false);

  const modeInfo: Record<PassportMode, { 
    title: string; 
    desc: string; 
    icon: React.ReactNode;
    badges: string[];
    documents?: string[];
  }> = {
    default: { 
      title: 'Standard Badge', 
      desc: 'General public access verification', 
      icon: <Shield className="w-6 h-6" />,
      badges: ['ADA Compliant', 'Public Access Authorized']
    },
    flight: { 
      title: 'Flight Mode', 
      desc: 'TSA-ready documents and verification', 
      icon: <Plane className="w-6 h-6" />,
      badges: ['TSA Approved', 'DOT Compliant', 'Health Certificate Valid'],
      documents: ['Service Dog Task Attestation', 'Rabies Vaccination', 'Health Certificate']
    },
    rideshare: { 
      title: 'Rideshare Mode', 
      desc: 'Uber/Lyft optimized verification', 
      icon: <Car className="w-6 h-6" />,
      badges: ['ADA Compliant', 'Rideshare Verified'],
      documents: ['Service Dog Certification', 'Vaccination Records']
    },
    restaurant: { 
      title: 'Restaurant Mode', 
      desc: 'Public access cleared for dining', 
      icon: <UtensilsCrossed className="w-6 h-6" />,
      badges: ['ADA Compliant', 'Public Access Authorized']
    },
    allergy: { 
      title: 'Allergy Mode', 
      desc: 'Hypoallergenic transparency', 
      icon: <Shield className="w-6 h-6" />,
      badges: ['Hypoallergenic Rating: High', 'Last Groomed: 2 weeks ago']
    },
  };

  const activeRecords = mockRecords.filter(r => r.status === 'active');
  const expiringRecords = mockRecords.filter(r => r.status === 'expiring-soon');

  const handleNFC = () => {
    setShowNFCAnimation(true);
    setTimeout(() => setShowNFCAnimation(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header - CLEAR Style Minimalist */}
      <div className="flex justify-between items-center p-4 sticky top-0 z-20 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50">
        <button 
          onClick={() => router.back()} 
          className="text-white/90 hover:text-white transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-lg font-semibold">Dog Passport</h1>
        <button 
          onClick={() => {/* Share functionality */}}
          className="text-white/90 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center px-4 py-6 space-y-6 pb-32">
        {/* QR Badge Component */}
        <QRBadge dog={mockDog} mode={mode} />

        {/* Mode Selector - Tesla Style Big Buttons */}
        <div className="w-full max-w-sm space-y-3">
          <p className="text-center text-sm text-ice-100/80 font-medium">Passport Mode</p>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(modeInfo).map(([modeKey, info]) => (
              <button
                key={modeKey}
                onClick={() => setMode(modeKey as PassportMode)}
                className={`p-4 rounded-xl transition-all text-left border-2 ${
                  mode === modeKey
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-lg scale-105'
                    : 'bg-navy-700/50 text-ice-100 border-navy-600 hover:bg-navy-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {info.icon}
                  <p className="text-sm font-semibold">{info.title}</p>
                </div>
                <p className="text-xs opacity-90">{info.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Mode-Specific Information */}
        <Card className="w-full max-w-sm bg-navy-700/30 border-navy-600/50">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              {modeInfo[mode].icon}
              <h3 className="font-semibold text-ice-100">{modeInfo[mode].title}</h3>
            </div>
            <p className="text-sm text-ice-100/80">{modeInfo[mode].desc}</p>
            
            {modeInfo[mode].badges && modeInfo[mode].badges.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-navy-600/50">
                {modeInfo[mode].badges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {badge}
                  </div>
                ))}
              </div>
            )}

            {mode === 'flight' && modeInfo[mode].documents && (
              <div className="pt-2 border-t border-navy-600/50">
                <p className="text-xs font-semibold text-ice-100 mb-2">Required Documents:</p>
                {modeInfo[mode].documents!.map((doc, idx) => {
                  const hasDoc = activeRecords.some(r => 
                    r.fileName.toLowerCase().includes(doc.toLowerCase().split(' ')[0])
                  );
                  return (
                    <div key={idx} className="flex items-center gap-2 text-xs mb-1">
                      {hasDoc ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      <span className={hasDoc ? 'text-emerald-200' : 'text-amber-200'}>
                        {doc}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {mode === 'rideshare' && (
              <div className="pt-2 border-t border-navy-600/50 bg-navy-800/30 rounded-lg p-3">
                <p className="text-xs font-semibold text-ice-100 mb-2">ADA 2-Question Rule:</p>
                <div className="space-y-1.5 text-xs text-ice-100/80">
                  <p>1. Is this a service dog?</p>
                  <p>2. What task does it perform?</p>
                </div>
                <p className="text-xs text-ice-100/60 mt-2 italic">
                  Drivers cannot ask for documentation or deny service
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* NFC Tap Zone - Apple Wallet Style */}
        <div 
          className="w-full max-w-sm bg-navy-700/30 border-2 border-dashed border-navy-500/50 rounded-2xl p-6 text-center cursor-pointer hover:bg-navy-700/50 transition-all"
          onClick={handleNFC}
        >
          <div className={`text-5xl mb-3 ${showNFCAnimation ? 'animate-bounce' : ''}`}>
            📱
          </div>
          <p className="text-sm font-semibold text-ice-100 mb-1">NFC Tap Verification</p>
          <p className="text-xs text-ice-100/70">Tap phone to NFC reader for instant verification</p>
          {showNFCAnimation && (
            <p className="text-xs text-emerald-400 mt-2 animate-pulse">✓ Verified</p>
          )}
        </div>

        {/* Expiration Alerts */}
        {expiringRecords.length > 0 && (
          <Card className="w-full max-w-sm bg-white border-gray-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-black" />
                <p className="text-sm font-semibold text-black">
                  {expiringRecords.length} record{expiringRecords.length > 1 ? 's' : ''} expiring soon
                </p>
              </div>
              <p className="text-xs text-black">
                Review your records to ensure continuous verification
              </p>
            </CardContent>
          </Card>
        )}

        {/* Last Verified Date */}
        <p className="text-xs text-ice-100/60 text-center">
          Last verified: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} • QR never expires
        </p>
      </div>

      {/* Bottom Actions - Fixed */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-700/50 flex gap-3">
        <Button 
          variant="outline" 
          className="flex-1 text-white border-ice-100/30 hover:bg-navy-800 hover:border-ice-100/50"
          onClick={() => router.push('/dashboard/records')}
        >
          View Records
        </Button>
        <Button 
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
          onClick={() => {/* Share functionality */}}
        >
          Share Badge
        </Button>
      </div>
    </div>
  );
}
