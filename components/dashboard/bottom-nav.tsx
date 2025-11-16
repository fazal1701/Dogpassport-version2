'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const nav = [
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

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border overflow-x-auto">
      <div className="max-w-md mx-auto flex min-w-max md:min-w-fit gap-1 md:gap-2">
        {nav.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-shrink-0 md:flex-1 py-4 px-3 md:px-4 text-center text-xs md:text-sm font-semibold transition-colors ${
              pathname === item.href || pathname.startsWith(item.href + '/')
                ? 'text-forest-600 bg-emerald-50'
                : 'text-gray-700 hover:text-navy-900'
            }`}
          >
            <div className="text-lg md:text-xl mb-1">{item.icon}</div>
            <div className="text-xs">{item.label}</div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
