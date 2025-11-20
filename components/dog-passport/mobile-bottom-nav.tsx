'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, QrCode, Heart, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
  badge?: number | null;
}

const navItems: NavItem[] = [
  {
    id: 'nav-home',
    label: 'Home',
    icon: Home,
    route: '/dashboard',
    badge: null,
  },
  {
    id: 'nav-wallet',
    label: 'Wallet',
    icon: QrCode,
    route: '/dashboard/wallet',
    badge: null,
  },
  {
    id: 'nav-health',
    label: 'Health',
    icon: Heart,
    route: '/dashboard/health',
    badge: 3, // Example: 3 expiring records
  },
  {
    id: 'nav-community',
    label: 'Community',
    icon: Users,
    route: '/dashboard/community',
    badge: 12, // Example: 12 new posts
  },
  {
    id: 'nav-profile',
    label: 'Profile',
    icon: User,
    route: '/dashboard/settings',
    badge: null,
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[1200]"
      style={{
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <div
        className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50"
        style={{
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className="flex justify-around items-center h-14 max-w-md mx-auto px-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.route || pathname.startsWith(item.route + '/');
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.route}
                className={cn(
                  'relative flex flex-col items-center justify-center gap-0.5 flex-1',
                  'min-h-[44px] min-w-[44px]',
                  'transition-all duration-150',
                  'active:scale-95',
                  isActive
                    ? 'text-navy-900'
                    : 'text-gray-500'
                )}
              >
                <div className="relative">
                  <Icon
                    className={cn(
                      'w-6 h-6 transition-transform duration-150',
                      isActive && '-translate-y-0.5'
                    )}
                  />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white shadow-sm">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    'text-[10px] font-medium leading-none',
                    isActive ? 'text-navy-900' : 'text-gray-500'
                  )}
                >
                  {item.label}
                </span>
                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-navy-900 rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

