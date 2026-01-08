import React from 'react';
import { AppTab } from '../types';
import { UserButton } from "@clerk/nextjs";

interface NavbarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  onNewCapture: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, onNewCapture }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-[60] px-8 pt-6 pointer-events-none">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between bg-zinc-900/90 backdrop-blur-xl py-3 px-6 rounded-2xl border border-zinc-800 pointer-events-auto">
        {/* Brand & Context */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center transform -rotate-2">
               <svg className="w-4 h-4 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tighter text-white leading-none">LUMINA</span>
              <span className="font-mono text-[9px] text-zinc-500 mt-1 uppercase tracking-widest">protocol.v2</span>
            </div>
          </div>
          <div className="hidden lg:flex h-6 w-px bg-zinc-800"></div>
          <div className="hidden lg:flex items-center gap-3">
             <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-900/20 rounded-md border border-emerald-800/30">
               <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
               <span className="text-[9px] font-black text-emerald-400 uppercase">Synced</span>
             </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-zinc-800/50 p-1 rounded-xl border border-zinc-700">
          {(['Meetings', 'Tasks'] as AppTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`
                px-5 py-1.5 rounded-lg text-[10px] font-black transition-all duration-300 uppercase tracking-[0.15em]
                ${activeTab === tab 
                  ? 'bg-zinc-900 text-white border border-zinc-700' 
                  : 'text-zinc-500 hover:text-zinc-300'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Global Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center -space-x-1.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-7 h-7 rounded-lg border border-zinc-800 overflow-hidden bg-zinc-800">
                <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="Avatar" />
              </div>
            ))}
          </div>
          <button 
            onClick={onNewCapture}
            className="px-5 py-2 bg-zinc-100 text-zinc-900 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-white transition-all active:scale-95"
          >
            Capture
          </button>
          <div className="h-8 w-px bg-zinc-800 mx-1"></div>
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: "w-9 h-9 border border-zinc-700 rounded-xl",
                userButtonPopoverCard: "bg-zinc-900 border border-zinc-800 text-white",
                userButtonPopoverActions: "text-zinc-200",
                userButtonPopoverActionButton: "hover:bg-zinc-800 text-zinc-200",
                userButtonPopoverFooter: "hidden"
              }
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
