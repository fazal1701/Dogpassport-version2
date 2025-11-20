'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';
import { getDogsByUserId } from '@/lib/mock-data/dogs';

interface NavItem {
  href: string;
  icon: string;
  label: string;
  badge?: number | null;
}

const navItems: NavItem[] = [
  { href: '/dashboard', icon: '🏠', label: 'Home' },
  { href: '/dashboard/wallet', icon: '🐾', label: 'Wallet' },
  { href: '/dashboard/health', icon: '❤️', label: 'Health' },
  { href: '/dashboard/community', icon: '👥', label: 'Connect' },
  { href: '/dashboard/blog', icon: '📝', label: 'Blog' },
  { href: '/dashboard/records', icon: '📋', label: 'Records' },
  { href: '/dashboard/travel', icon: '✈️', label: 'Travel' },
  { href: '/dashboard/resources', icon: '🤝', label: 'Partners' },
  { href: '/dashboard/education', icon: '🎓', label: 'Learn' },
  { href: '/dashboard/support', icon: '❓', label: 'Support' },
];

export function EnhancedBottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, users, switchUser } = useAuth();
  const [showUserSelector, setShowUserSelector] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);

  // Close selector when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setShowUserSelector(false);
      }
    }

    if (showUserSelector) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showUserSelector]);

  const userDogs = user ? getDogsByUserId(user.id) : [];

  const getSubscriptionBadge = (tier: string) => {
    switch (tier) {
      case 'blue':
        return { text: 'Blue', color: 'bg-blue-600 text-white' };
      case 'premium':
        return { text: 'Premium', color: 'bg-navy-900 text-white' };
      case 'family':
        return { text: 'Family', color: 'bg-emerald-600 text-white' };
      default:
        return { text: 'Free', color: 'bg-gray-500 text-white' };
    }
  };

  return (
    <>
      {/* User Selector Dropdown */}
      {showUserSelector && (
        <div className="fixed inset-0 bg-black/20 z-[1300]" onClick={() => setShowUserSelector(false)} />
      )}
      <div className="fixed bottom-20 left-0 right-0 z-[1300] max-w-md mx-auto px-4" ref={selectorRef}>
        {showUserSelector && (
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 max-h-[60vh] overflow-y-auto mb-2">
            <div className="p-3 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h3 className="font-bold text-navy-900 text-sm flex items-center gap-2">
                <Users className="w-4 h-4" />
                Switch User (Demo)
              </h3>
              <p className="text-xs text-gray-600 mt-1">Select a user to view their profile</p>
            </div>
            <div className="divide-y divide-gray-100">
              {users.map((u) => {
                const badge = getSubscriptionBadge(u.subscriptionTier);
                const isActive = user?.id === u.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      setShowUserSelector(false);
                      router.refresh();
                    }}
                    className={`w-full p-3 text-left hover:bg-gray-50 transition-colors ${
                      isActive ? 'bg-emerald-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Image
                          src={u.avatar || '/placeholder-user.jpg'}
                          alt={u.name}
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-white"
                        />
                        {isActive && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-navy-900 text-sm truncate">{u.name}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${badge.color}`}>
                            {badge.text}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 truncate">{u.email}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500">
                            {u.stats.dogsManaged} dog{u.stats.dogsManaged !== 1 ? 's' : ''}
                          </span>
                          {u.location && (
                            <span className="text-xs text-gray-500">📍 {u.location}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Bar */}
      <nav 
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-white via-white to-gray-50/50 border-t border-gray-200 shadow-lg z-[1200]"
        style={{
          paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
        }}
      >
        <div className="max-w-md mx-auto">
          {/* User Switcher Button */}
          <div className="px-4 py-2 border-b border-gray-200 bg-white">
            <button
              onClick={() => setShowUserSelector(!showUserSelector)}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {user && (
                  <>
                    <Image
                      src={user.avatar || '/placeholder-user.jpg'}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="rounded-full border border-gray-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-xs font-semibold text-navy-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {getSubscriptionBadge(user.subscriptionTier).text} • {userDogs.length} dog{userDogs.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </>
                )}
              </div>
              {showUserSelector ? (
                <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex overflow-x-auto scrollbar-hide">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex-shrink-0 flex flex-col items-center justify-center py-3 px-4 min-w-[80px] transition-all ${
                    isActive
                      ? 'text-forest-600 bg-emerald-50/80'
                      : 'text-gray-700 hover:text-navy-900 hover:bg-gray-50/50'
                  }`}
                >
                  <div className="text-2xl mb-1 relative">
                    {item.icon}
                    {item.badge && item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                        {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </div>
                  <div className={`text-xs font-semibold whitespace-nowrap ${
                    isActive ? 'text-forest-700' : 'text-gray-600'
                  }`}>
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}


