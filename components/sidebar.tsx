'use client';

import { useUser, UserProfile } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  Search,
  LogOut
} from 'lucide-react';

export function Sidebar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Documents', href: '/documents', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      <aside 
        className={`flex h-screen flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-16' : 'w-56'
        }`}
      >
        {/* Header */}
        <div className={`flex h-14 items-center ${isCollapsed ? 'justify-center' : 'justify-between px-4'}`}>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white">
              <Sparkles size={16} fill="currentColor" />
            </div>
            {!isCollapsed && (
              <span className="text-lg font-bold text-gray-900">VaultIQ</span>
            )}
          </div>
          
          {!isCollapsed && (
            <button 
              onClick={() => setIsCollapsed(true)}
              className="flex h-6 w-6 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Search Bar */}
        {!isCollapsed && (
          <div className="px-4 mb-4">
            <div className="flex items-center gap-2 rounded-lg bg-white/50 px-2 py-1.5 border border-gray-200/50 focus-within:bg-white focus-within:border-gray-300 transition-all duration-200">
              <Search size={14} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400"
              />
            </div>
          </div>
        )}

        {/* Body */}
        <nav className="flex-1 overflow-y-auto px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <item.icon size={18} strokeWidth={isActive ? 2 : 1.5} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {/* Collapsed Toggle */}
          {isCollapsed && (
             <div className="mt-4 flex justify-center">
                <button 
                  onClick={() => setIsCollapsed(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
             </div>
          )}
        </nav>

        {/* Footer */}
        <div className="p-2">
          <button
            onClick={openProfile}
            className={`flex w-full items-center gap-2 rounded-lg p-1.5 transition-colors duration-200 hover:bg-gray-100 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <img
              src={user?.imageUrl}
              alt={user?.fullName || 'User'}
              className="h-8 w-8 rounded-lg object-cover"
            />
            {!isCollapsed && (
              <div className="flex-1 overflow-hidden text-left">
                <p className="truncate text-xs font-semibold text-gray-900">
                  {user?.fullName || 'User'}
                </p>
                <p className="truncate text-[10px] text-gray-500">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Profile Modal */}
      {isProfileOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 transition-opacity duration-300 ${
            isAnimating ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeProfile}
        >
          <div
            className={`relative rounded-2xl bg-white shadow-2xl transition-all duration-300 ${
              isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeProfile}
              className="absolute -right-4 -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition-all duration-200 hover:scale-110 active:scale-90"
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
