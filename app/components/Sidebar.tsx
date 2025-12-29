"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Video,
  CheckSquare,
  BarChart2,
  Search,
  Calendar,
  Settings,
  PlusCircle,
  Brain,
} from "lucide-react";
import CreateMeetingModal from "./CreateMeetingModal";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", label: "Overview", icon: Home },
    { path: "/dashboard/meetings", label: "Meetings archive", icon: Video },
    { path: "/dashboard/tasks", label: "Action center", icon: CheckSquare },
    { path: "/dashboard/calendar", label: "Schedule", icon: Calendar },
    { path: "/dashboard/insights", label: "Intelligence", icon: BarChart2 },
    { path: "/dashboard/knowledge", label: "Knowledge base", icon: Search },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(path);
  };

  return (
    <>
      <aside className="w-60 glass-sidebar h-full flex flex-col text-zinc-400">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-lg">
            <Brain size={18} className="text-black" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight font-poppins">
            MeetingBrain
          </span>
        </div>

        <div className="px-4 mb-6">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black py-2.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all shadow-xl">
            <PlusCircle size={14} />
            Record meeting
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-semibold transition-all ${
                isActive(item.path)
                  ? "bg-white/10 text-white border border-white/5 shadow-inner"
                  : "hover:bg-white/5 hover:text-zinc-200"
              }`}>
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Link
            href="/dashboard/settings"
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-semibold transition-all ${
              isActive("/dashboard/settings")
                ? "text-white"
                : "hover:bg-white/5 hover:text-zinc-200"
            }`}>
            <Settings size={16} />
            Settings
          </Link>
          <div className="mt-4 px-3 py-3 bg-white/2 rounded-md border border-white/5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Workspace quota
              </span>
              <span className="text-[10px] text-zinc-400">72%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[72%]"></div>
            </div>
          </div>
        </div>
      </aside>

      {isCreateModalOpen && (
        <CreateMeetingModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;
