'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import QRCode from 'qrcode';
import { Dog } from '@/lib/types';
import { VerificationBadge } from './verification-badge';
import { CheckCircle2, Shield, Plane } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QRBadgeProps {
  dog: Dog;
  mode?: 'default' | 'flight' | 'rideshare' | 'restaurant' | 'allergy';
  className?: string;
  showDetails?: boolean;
}

export function QRBadge({
  dog,
  mode = 'default',
  className,
  showDetails = true,
}: QRBadgeProps) {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const [qrReady, setQrReady] = useState(false);

  useEffect(() => {
    if (!qrCanvasRef.current) return;

    const qrData = JSON.stringify({
      dogId: dog.id,
      name: dog.name,
      verified: dog.verificationStatus !== 'pending',
      checkmarkStatus: dog.checkmarkStatus,
      mode: mode,
      timestamp: new Date().toISOString(),
      serviceDogId: dog.serviceDogId,
    });

    QRCode.toCanvas(qrCanvasRef.current, qrData, {
      width: 300,
      margin: 2,
      color: { dark: '#1E3A8A', light: '#FFFFFF' },
      errorCorrectionLevel: 'M',
    })
      .then(() => setQrReady(true))
      .catch(console.error);
  }, [dog, mode]);

  const modeConfig = {
    default: {
      title: 'Service Dog Verification',
      icon: Shield,
      color: 'text-navy-600',
    },
    flight: {
      title: 'TSA & DOT Compliant',
      icon: Plane,
      color: 'text-blue-600',
    },
    rideshare: {
      title: 'Rideshare Verified',
      icon: Shield,
      color: 'text-forest-600',
    },
    restaurant: {
      title: 'ADA Compliant',
      icon: Shield,
      color: 'text-forest-600',
    },
    allergy: {
      title: 'Hypoallergenic Info',
      icon: Shield,
      color: 'text-amber-600',
    },
  };

  const config = modeConfig[mode];
  const ModeIcon = config.icon;

  return (
    <div
      className={cn(
        'relative bg-gradient-to-br from-white to-ice-50 rounded-3xl p-6 shadow-xl border border-gray-200',
        'animate-scale-in',
        className
      )}
    >
      {/* Header */}
      {showDetails && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ModeIcon className={cn('w-5 h-5', config.color)} />
            <h3 className="font-semibold text-navy-900 text-sm">
              {config.title}
            </h3>
          </div>
          <VerificationBadge status={dog.checkmarkStatus} size="sm" />
        </div>
      )}

      {/* Dog Photo & Info */}
      {showDetails && (
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <Image
              src={dog.photo || '/placeholder.jpg'}
              alt={dog.name}
              width={64}
              height={64}
              className="rounded-full border-2 border-white shadow-md"
            />
            {dog.badges.vetVerified && (
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-1 border-2 border-white">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg text-navy-900">{dog.name}</h2>
            <p className="text-sm text-gray-600">{dog.breed}</p>
            {dog.isServiceDog && dog.taskType && (
              <p className="text-xs text-gray-500 mt-1">
                {dog.taskType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Service Dog
              </p>
            )}
          </div>
        </div>
      )}

      {/* QR Code */}
      <div className="bg-white p-4 rounded-2xl shadow-inner mb-4">
        <canvas
          ref={qrCanvasRef}
          className={cn(
            'w-full h-auto transition-opacity',
            qrReady ? 'opacity-100' : 'opacity-0'
          )}
        />
        {!qrReady && (
          <div className="w-full aspect-square bg-gray-100 rounded-xl animate-pulse" />
        )}
        <p className="text-center text-xs text-gray-500 mt-2 font-medium">
          Scan to verify • Never expires
        </p>
      </div>

      {/* Badges */}
      {showDetails && (
        <div className="flex flex-wrap gap-2">
          {dog.badges.adaCompliant && (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" />
              ADA
            </span>
          )}
          {dog.badges.tsaApproved && (
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium border border-blue-200">
              <Plane className="w-3 h-3" />
              TSA
            </span>
          )}
          {dog.badges.vetVerified && (
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" />
              Vet Verified
            </span>
          )}
          {dog.badges.hypoallergenic && (
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-full text-xs font-medium border border-amber-200">
              <Shield className="w-3 h-3" />
              Hypoallergenic
            </span>
          )}
        </div>
      )}
    </div>
  );
}

