"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
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
  LogOut,
  X,
} from "lucide-react";
import CreateMeetingModal from "./CreateMeetingModal";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.push("/sign-in");
  };

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
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-semibold transition-all text-red-500 hover:bg-white/5 hover:text-red-400">
            <LogOut size={16} />
            Logout
          </button>
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
        </div>
      </aside>

      {isCreateModalOpen && (
        <CreateMeetingModal onClose={() => setIsCreateModalOpen(false)} />
      )}

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="glass-card w-full max-w-md rounded-md shadow-2xl overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
                  <LogOut size={20} className="text-red-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    Confirm Logout
                  </h2>
                  <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
                    Sign Out
                  </p>
                </div>
              </div>
              <p className="text-sm text-zinc-400 mb-6">
                Are you sure you want to sign out? You'll need to sign in again
                to access your account.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1 py-2.5 text-zinc-400 text-[11px] font-bold hover:text-white transition-colors uppercase tracking-wider border border-white/10 rounded-md hover:bg-white/5">
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 bg-red-500 text-white rounded-md text-[11px] font-bold hover:bg-red-600 transition-all shadow-lg uppercase tracking-wider">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
