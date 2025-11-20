'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Dog } from '@/lib/types';
import { VerificationBadge } from './verification-badge';
import { cn } from '@/lib/utils';

interface DogCardProps {
  dog: Dog;
  variant?: 'default' | 'elevated' | 'glass' | 'mesh';
  interactive?: boolean;
  className?: string;
  href?: string;
}

export function DogCard({
  dog,
  variant = 'default',
  interactive = true,
  className,
  href,
}: DogCardProps) {
  if (!dog) {
    return null;
  }

  const badges = dog.badges || {
    adaCompliant: false,
    tsaApproved: false,
    vetVerified: false,
    hypoallergenic: false,
    publicAccessCleared: false,
  };

  const cardContent = (
    <div
      className={cn(
        'relative rounded-xl border overflow-hidden transition-all',
        {
          'bg-white border-gray-200 shadow-sm hover:shadow-md': variant === 'default',
          'bg-white border-none shadow-lg hover:shadow-xl hover:-translate-y-1': variant === 'elevated',
          'bg-white/70 backdrop-blur-xl border-white/30 shadow-xl': variant === 'glass',
          'bg-gradient-to-br from-blue-50 to-emerald-50 border-blue-200/50 shadow-md': variant === 'mesh',
          'cursor-pointer active:scale-[0.98]': interactive,
        },
        className
      )}
    >
      {/* Status Border */}
      {dog.verificationStatus === 'blue' && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500" />
      )}
      {dog.verificationStatus === 'green' && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
      )}
      {dog.verificationStatus === 'yellow' && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
      )}

      <div className="p-4">
        <div className="flex items-start gap-4">
          {/* Dog Photo */}
          <div className="relative flex-shrink-0">
            <Image
              src={dog.photo || '/placeholder.jpg'}
              alt={dog.name}
              width={64}
              height={64}
              className="rounded-xl object-cover border-2 border-white shadow-md"
            />
            <div className="absolute -top-1 -right-1">
              <VerificationBadge status={dog.checkmarkStatus} size="sm" showLabel={false} />
            </div>
          </div>

          {/* Dog Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-bold text-lg text-navy-900 truncate">
                {dog.name}
              </h3>
            </div>
            <p className="text-sm text-gray-600 mb-2">{dog.breed}</p>
            
            {dog.isServiceDog && dog.taskType && (
              <p className="text-xs text-gray-500 mb-2">
                {dog.taskType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Service Dog
              </p>
            )}

            <div className="flex items-center gap-2 flex-wrap">
              <VerificationBadge status={dog.checkmarkStatus} size="sm" />
              {badges.vetVerified && (
                <span className="text-xs text-emerald-600 font-medium">
                  ✓ Vet Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (interactive && href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

