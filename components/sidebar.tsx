'use client';

import { useUser, UserProfile } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openProfile = () => {
    setIsProfileOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeProfile = () => {
    setIsAnimating(false);
    setTimeout(() => setIsProfileOpen(false), 300);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isProfileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isProfileOpen]);

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Documents', href: '/documents', icon: '📄' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Documents', href: '/documents', icon: '📄' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Documents', href: '/documents', icon: '📄' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Documents', href: '/documents', icon: '📄' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Documents', href: '/documents', icon: '📄' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
  ];

  return (
    <>
      <aside className="flex h-screen w-64 flex-col">
        {/* Header - Fixed */}
        <div className="flex h-16 items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">VaultIQ</h1>
        </div>

        {/* Body - Scrollable */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer - Fixed */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={openProfile}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-all duration-200 hover:bg-gray-100 active:scale-95"
          >
            <img
              src={user?.imageUrl}
              alt={user?.fullName || 'User'}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-semibold text-gray-900">
                {user?.fullName || 'User'}
              </p>
              <p className="truncate text-xs text-gray-500">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </button>
        </div>
      </aside>

      {/* Profile Modal */}
      {isProfileOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black p-4 transition-opacity duration-300 ${
            isAnimating ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={closeProfile}
        >
          <div
            className={`relative rounded-lg bg-white shadow-2xl transition-all duration-300 ${
              isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeProfile}
              className="absolute -right-4 -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-red-600 active:scale-90 text-white"
              aria-label="Close profile"
            >
              ✕
            </button>

            <UserProfile />
          </div>
        </div>
      )}
    </>
  );
}
