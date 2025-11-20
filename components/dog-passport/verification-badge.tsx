'use client';

import { CheckmarkStatus } from '@/lib/types';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VerificationBadgeProps {
  status: CheckmarkStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const statusConfig = {
  none: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    border: 'border-gray-300',
    label: 'Not Verified',
    icon: null,
  },
  yellow: {
    bg: 'bg-gradient-to-br from-amber-100 to-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-300',
    label: 'Pending Verification',
    icon: CheckCircle2,
    glow: 'shadow-[0_0_20px_rgba(251,191,36,0.3)]',
  },
  green: {
    bg: 'bg-gradient-to-br from-emerald-100 to-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-300',
    label: 'Verified',
    icon: CheckCircle2,
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
  },
  blue: {
    bg: 'bg-gradient-to-br from-blue-100 to-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-300',
    label: 'Premium Verified',
    icon: CheckCircle2,
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
  },
};

const sizeConfig = {
  sm: {
    container: 'px-2 py-1 text-xs gap-1',
    icon: 'w-3 h-3',
    label: 'text-xs',
  },
  md: {
    container: 'px-3 py-1.5 text-sm gap-1.5',
    icon: 'w-4 h-4',
    label: 'text-sm',
  },
  lg: {
    container: 'px-4 py-2 text-base gap-2',
    icon: 'w-5 h-5',
    label: 'text-base',
  },
};

export function VerificationBadge({
  status,
  size = 'md',
  showLabel = true,
  className,
}: VerificationBadgeProps) {
  const config = statusConfig[status];
  const sizeStyles = sizeConfig[size];
  const Icon = config.icon;

  if (status === 'none') {
    return null;
  }

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full border font-semibold transition-all',
        config.bg,
        config.text,
        config.border,
        sizeStyles.container,
        config.glow,
        className
      )}
    >
      {Icon && <Icon className={sizeStyles.icon} />}
      {showLabel && (
        <span className={sizeStyles.label}>{config.label}</span>
      )}
    </div>
  );
}

