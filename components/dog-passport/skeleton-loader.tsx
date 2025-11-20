'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
}: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-gray-200 dark:bg-gray-700';

  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        className
      )}
      style={{
        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      }}
    />
  );
}

// Shimmer effect for loading states
export function ShimmerSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700',
        className
      )}
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"
        style={{
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  );
}

// Record Card Skeleton
export function RecordCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-white">
      <div className="flex items-start gap-3">
        <Skeleton variant="circular" width={20} height={20} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="70%" height={16} />
          <Skeleton variant="text" width="50%" height={12} />
          <Skeleton variant="text" width="60%" height={12} />
        </div>
      </div>
    </div>
  );
}

// Dog Card Skeleton
export function DogCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 p-4 bg-white">
      <div className="flex items-start gap-4">
        <Skeleton variant="circular" width={64} height={64} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="40%" height={14} />
          <Skeleton variant="text" width="50%" height={12} />
        </div>
      </div>
    </div>
  );
}

