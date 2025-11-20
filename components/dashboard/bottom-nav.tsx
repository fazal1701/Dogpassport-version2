'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { getDogsByUserId } from '@/lib/mock-data/dogs';
import { mockRecords } from '@/lib/mock-data';

interface NavItem {
  href: string;
  icon: string;
  label: string;
  badge?: number | null;
}

export function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const userDogs = user ? getDogsByUserId(user.id) : [];
  const userDogIds = userDogs.map(d => d.id);
  const expiringRecords = user ? mockRecords.filter(r => 
    userDogIds.includes(r.dogId) && r.status === 'expiring-soon'
  ).length : 0;

  const navItems: NavItem[] = [
    { href: '/dashboard', icon: '🏠', label: 'Home', badge: null },
    { href: '/dashboard/wallet', icon: '🐾', label: 'Wallet', badge: null },
    { href: '/dashboard/health', icon: '❤️', label: 'Health', badge: expiringRecords > 0 ? expiringRecords : null },
    { href: '/dashboard/community', icon: '👥', label: 'Connect', badge: null },
    { href: '/dashboard/blog', icon: '📝', label: 'Blog', badge: null },
    { href: '/dashboard/records', icon: '📋', label: 'Records', badge: expiringRecords > 0 ? expiringRecords : null },
    { href: '/dashboard/travel', icon: '✈️', label: 'Travel', badge: null },
    { href: '/dashboard/resources', icon: '🤝', label: 'Partners', badge: null },
    { href: '/dashboard/education', icon: '🎓', label: 'Learn', badge: null },
    { href: '/dashboard/support', icon: '❓', label: 'Support', badge: null },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-[1200]"
      style={{
        paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
      }}
    >
      <div className="max-w-md mx-auto">
        {/* Navigation Items */}
        <div className="flex overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-shrink-0 flex flex-col items-center justify-center py-3 px-3 min-w-[70px] transition-all relative ${
                  isActive
                    ? 'text-navy-900'
                    : 'text-gray-600 hover:text-navy-900'
                }`}
              >
                <div className="text-2xl mb-1 relative">
                  {item.icon}
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-bold border-2 border-white shadow-sm">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <div className={`text-[10px] font-semibold whitespace-nowrap leading-tight ${
                  isActive ? 'text-navy-900' : 'text-gray-600'
                }`}>
                  {item.label}
                </div>
                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-navy-900 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
