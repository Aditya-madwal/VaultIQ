"use client";

import React from "react";
import { usePathname } from "next/navigation";

const DashboardHeader: React.FC = () => {
  const pathname = usePathname();

  const getTitle = () => {
    if (pathname === "/dashboard") return "Overview";
    if (pathname?.startsWith("/dashboard/meetings/")) return "Deep Dive";
    if (pathname === "/dashboard/meetings") return "Meetings archive";
    if (pathname === "/dashboard/tasks") return "Action center";
    if (pathname === "/dashboard/calendar") return "Schedule";
    if (pathname === "/dashboard/insights") return "Intelligence";
    if (pathname === "/dashboard/knowledge") return "Knowledge base";
    if (pathname === "/dashboard/settings") return "Settings";
    return "Dashboard";
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-bold text-white/90 capitalize tracking-tight">
          {getTitle()}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Jump to..."
            className="pl-8 pr-3 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] w-48 focus:w-64 transition-all outline-none text-zinc-200 placeholder-zinc-600"
          />
          <svg
            className="absolute left-2.5 top-1.5 w-3.5 h-3.5 text-zinc-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-bold border border-white/5 cursor-pointer hover:bg-zinc-700">
          JD
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

