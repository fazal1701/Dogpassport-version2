'use client';

import { VetRecord } from '@/lib/types';
import { FileText, Calendar, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface RecordCardProps {
  record: VetRecord;
  variant?: 'default' | 'expiring' | 'expired' | 'active';
  onClick?: () => void;
  className?: string;
}

export function RecordCard({
  record,
  variant,
  onClick,
  className,
}: RecordCardProps) {
  // Determine variant from status if not provided
  const cardVariant = variant || record.status;

  const statusConfig = {
    active: {
      border: 'border-l-4 border-emerald-500',
      bg: 'bg-gradient-to-r from-emerald-50/50 to-white',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
      label: 'Active',
      labelColor: 'text-emerald-700',
    },
    'expiring-soon': {
      border: 'border-l-4 border-amber-500',
      bg: 'bg-gradient-to-r from-amber-50/50 to-white',
      icon: Clock,
      iconColor: 'text-amber-600',
      label: 'Expiring Soon',
      labelColor: 'text-amber-700',
    },
    expired: {
      border: 'border-l-4 border-red-500',
      bg: 'bg-gradient-to-r from-red-50/50 to-white',
      icon: AlertCircle,
      iconColor: 'text-red-600',
      label: 'Expired',
      labelColor: 'text-red-700',
    },
    default: {
      border: 'border-l-4 border-gray-300',
      bg: 'bg-white',
      icon: FileText,
      iconColor: 'text-gray-600',
      label: 'Record',
      labelColor: 'text-gray-700',
    },
  };

  const config = statusConfig[cardVariant];
  const StatusIcon = config.icon;

  const daysUntilExpiration = record.daysUntilExpiration ?? 0;
  const expirationText =
    record.expirationDate && daysUntilExpiration > 0
      ? `Expires in ${daysUntilExpiration} days`
      : record.expirationDate && daysUntilExpiration < 0
      ? `Expired ${Math.abs(daysUntilExpiration)} days ago`
      : record.expirationDate
      ? `Expires ${format(record.expirationDate, 'MMM d, yyyy')}`
      : null;

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-xl border border-gray-200 p-4 transition-all',
        config.border,
        config.bg,
        onClick && 'cursor-pointer hover:shadow-md active:scale-[0.98]',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn('flex-shrink-0', config.iconColor)}>
          <StatusIcon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-navy-900 text-sm line-clamp-2">
              {record.fileName}
            </h3>
            <span
              className={cn(
                'text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap',
                config.labelColor,
                'bg-white/80'
              )}
            >
              {config.label}
            </span>
          </div>

          <div className="space-y-1 text-xs text-gray-600">
            {record.vetName && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Vet:</span>
                <span>{record.vetName}</span>
              </div>
            )}
            {record.vetClinic && (
              <div className="flex items-center gap-1">
                <span className="font-medium">Clinic:</span>
                <span>{record.vetClinic}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                Uploaded {format(record.uploadedAt, 'MMM d, yyyy')}
              </span>
            </div>
            {expirationText && (
              <div className={cn(
                'font-medium',
                cardVariant === 'expired' ? 'text-red-600' :
                cardVariant === 'expiring-soon' ? 'text-amber-600' :
                'text-gray-600'
              )}>
                {expirationText}
              </div>
            )}
          </div>

          {record.notes && (
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">
              {record.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

