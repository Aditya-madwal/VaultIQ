'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';
import MeetingModal from '../microcomponents/MeetingModal';
import { AppTab } from '../types';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const activeTab: AppTab = pathname.includes('/kanbans') ? 'Tasks' : 'Meetings';

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = (tab: AppTab) => {
    if (tab === 'Meetings') {
      router.push('/meetings');
    } else {
      router.push('/kanbans');
    }
  };

  return (
    <div className="min-h-screen bg-transparent selection:bg-indigo-900 selection:text-indigo-100">
      <Navbar 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        onNewCapture={() => setIsModalOpen(true)}
      />
      
      <main className="max-w-[1440px] mx-auto px-8 pt-28">
        <div className="animate-in fade-in duration-700">
          {children}
        </div>
      </main>

      <footer className="mt-20 border-t border-zinc-900 py-16 px-8 flex flex-col items-center justify-center gap-4 relative overflow-hidden bg-transparent">
        <div className="flex items-center gap-6">
           <span className="font-mono text-[9px] text-zinc-700 font-bold uppercase tracking-[0.5em]">WorkNest_CORE</span>
           <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
           <span className="font-mono text-[9px] text-zinc-700 font-bold uppercase tracking-[0.5em]">ENV_SYNCED</span>
        </div>
        <p className="text-[10px] font-black text-zinc-700 uppercase tracking-widest opacity-60">
          Eye-Comfort Architecture • 2025
        </p>
      </footer>

      <MeetingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
