'use client';

import { UserProfile } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openProfile = () => {
    setIsProfileOpen(true);
    setTimeout(() => setIsAnimating(true), 10);
  };

  const closeProfile = () => {
    setIsAnimating(false);
    setTimeout(() => setIsProfileOpen(false), 300); // Match animation duration
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

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        
        <button
          onClick={openProfile}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          Open User Profile
        </button>
      </div>

      {/* Modal Overlay */}
      {isProfileOpen && (
        <div 
          className={`fixed inset-0 bg-black flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
            isAnimating ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={closeProfile}
        >
          <div 
            className={`relative bg-white rounded-lg shadow-2xl transition-all duration-300 ${
              isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeProfile}
              className="absolute -top-4 -right-4 bg-red-500 hover:bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 z-10 hover:scale-110 active:scale-90"
              aria-label="Close profile"
            >
              ✕
            </button>
            
            <UserProfile />
          </div>
        </div>
      )}
    </div>
  );
}
