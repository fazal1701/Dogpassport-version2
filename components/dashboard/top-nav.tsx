'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Image from 'next/image';
import { ChevronDown, Users, Bell, Settings } from 'lucide-react';
import { getDogsByUserId } from '@/lib/mock-data/dogs';
import { mockRecords } from '@/lib/mock-data';

export function TopNav() {
  const router = useRouter();
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
  const expiringRecords = user ? mockRecords.filter(r => 
    userDogs.some(dog => dog.id === r.dogId) && r.status === 'expiring-soon'
  ).length : 0;

  const getSubscriptionBadge = (tier: string) => {
    switch (tier) {
      case 'blue':
        return { text: 'Blue', color: 'bg-blue-600 text-white', bgLight: 'bg-blue-50', border: 'border-blue-200' };
      case 'premium':
        return { text: 'Premium', color: 'bg-navy-900 text-white', bgLight: 'bg-navy-50', border: 'border-navy-200' };
      case 'family':
        return { text: 'Family', color: 'bg-emerald-600 text-white', bgLight: 'bg-emerald-50', border: 'border-emerald-200' };
      default:
        return { text: 'Free', color: 'bg-gray-500 text-white', bgLight: 'bg-gray-50', border: 'border-gray-200' };
    }
  };

  return (
    <>
      {/* User Selector Dropdown */}
      {showUserSelector && (
        <div className="fixed inset-0 bg-black/20 z-[1300]" onClick={() => setShowUserSelector(false)} />
      )}
      <div className="fixed top-16 left-0 right-0 z-[1300] max-w-md mx-auto px-4" ref={selectorRef}>
        {showUserSelector && (
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[70vh] overflow-y-auto mt-2">
            <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10 backdrop-blur-sm bg-white/95">
              <h3 className="font-bold text-navy-900 text-base flex items-center gap-2">
                <Users className="w-5 h-5 text-navy-600" />
                Switch User (Demo)
              </h3>
              <p className="text-xs text-gray-600 mt-1">Select a user to view their profile and data</p>
            </div>
            <div className="divide-y divide-gray-100">
              {users.map((u) => {
                const badge = getSubscriptionBadge(u.subscriptionTier);
                const isActive = user?.id === u.id;
                const uDogs = getDogsByUserId(u.id);
                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      setShowUserSelector(false);
                      router.refresh();
                    }}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      isActive ? 'bg-gradient-to-r from-navy-50 to-ice-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Image
                          src={u.avatar || '/placeholder-user.jpg'}
                          alt={u.name}
                          width={48}
                          height={48}
                          className="rounded-full border-2 border-white shadow-md"
                        />
                        {isActive && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-navy-900 text-sm truncate">{u.name}</p>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${badge.color} shadow-sm`}>
                            {badge.text}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 truncate mb-1">{u.email}</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-xs text-gray-500 font-medium">
                            {uDogs.length} dog{uDogs.length !== 1 ? 's' : ''}
                          </span>
                          {u.location && (
                            <span className="text-xs text-gray-500">📍 {u.location}</span>
                          )}
                          <span className="text-xs text-gray-500">
                            {u.stats.recordsUploaded} records
                          </span>
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

      {/* Top Navigation Bar */}
      <nav 
        className="fixed top-0 left-0 right-0 bg-gradient-to-b from-white via-white to-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm z-[1200]"
        style={{
          paddingTop: 'max(0.5rem, env(safe-area-inset-top))',
        }}
      >
        <div className="max-w-md mx-auto">
          <div className="px-4 py-3 flex items-center justify-between">
            {/* User Switcher Button */}
            <button
              onClick={() => setShowUserSelector(!showUserSelector)}
              className="flex items-center gap-2.5 flex-1 min-w-0 hover:bg-gray-50/50 rounded-xl p-2 transition-all active:scale-95"
            >
              {user && (
                <>
                  <div className="relative flex-shrink-0">
                    <Image
                      src={user.avatar || '/placeholder-user.jpg'}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white shadow-md"
                    />
                    {expiringRecords > 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-[8px] text-white font-bold">{expiringRecords}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-bold text-navy-900 truncate">{user.name}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${getSubscriptionBadge(user.subscriptionTier).color}`}>
                        {getSubscriptionBadge(user.subscriptionTier).text}
                      </span>
                      <span className="text-xs text-gray-600 truncate">
                        {userDogs.length} dog{userDogs.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${showUserSelector ? 'rotate-180' : ''}`} />
                </>
              )}
            </button>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={() => router.push('/dashboard/settings')}
                className="p-2 rounded-xl hover:bg-gray-50/50 transition-all active:scale-95 relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {expiringRecords > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
                )}
              </button>
              <button
                onClick={() => router.push('/dashboard/settings')}
                className="p-2 rounded-xl hover:bg-gray-50/50 transition-all active:scale-95"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

