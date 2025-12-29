
import React from 'react';
import { View } from '../types';
import { 
  Home, 
  Video, 
  CheckSquare, 
  BarChart2, 
  Search, 
  Calendar, 
  Settings, 
  PlusCircle,
  Brain
} from 'lucide-react';

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
  onNewMeeting: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, onNewMeeting }) => {
  const navItems = [
    { id: View.HOME, label: 'Overview', icon: Home },
    { id: View.MEETINGS, label: 'Meetings archive', icon: Video },
    { id: View.TASKS, label: 'Action center', icon: CheckSquare },
    { id: View.CALENDAR, label: 'Schedule', icon: Calendar },
    { id: View.INSIGHTS, label: 'Intelligence', icon: BarChart2 },
    { id: View.KNOWLEDGE, label: 'Knowledge base', icon: Search },
  ];

  return (
    <aside className="w-60 glass-sidebar h-full flex flex-col text-zinc-400">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-lg">
          <Brain size={18} className="text-black" />
        </div>
        <span className="text-sm font-bold text-white tracking-tight font-poppins">MeetingBrain</span>
      </div>

      <div className="px-4 mb-6">
        <button 
          onClick={onNewMeeting}
          className="w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black py-2.5 rounded-md text-[11px] font-bold uppercase tracking-wider transition-all shadow-xl"
        >
          <PlusCircle size={14} />
          Record meeting
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-semibold transition-all ${
              activeView === item.id 
                ? 'bg-white/10 text-white border border-white/5 shadow-inner' 
                : 'hover:bg-white/5 hover:text-zinc-200'
            }`}
          >
            <item.icon size={16} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-2">
        <button 
          onClick={() => onViewChange(View.SETTINGS)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-semibold transition-all ${
            activeView === View.SETTINGS ? 'text-white' : 'hover:bg-white/5 hover:text-zinc-200'
          }`}
        >
          <Settings size={16} />
          Settings
        </button>
        <div className="mt-4 px-3 py-3 bg-white/[0.02] rounded-md border border-white/5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Workspace quota</span>
            <span className="text-[10px] text-zinc-400">72%</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[72%]"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
