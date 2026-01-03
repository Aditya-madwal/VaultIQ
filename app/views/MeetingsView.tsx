
import React from 'react';
import { Meeting } from '../types';
import { MoreHorizontal, Video, Search, Filter } from 'lucide-react';
import { MeetingStatusBadge } from '../components/Badges';

interface MeetingsViewProps {
  meetings: Meeting[];
  onNavigateToMeeting: (id: string) => void;
}

const MeetingsView: React.FC<MeetingsViewProps> = ({ meetings, onNavigateToMeeting }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-4 top-3 text-zinc-600" />
          <input 
            type="text" 
            placeholder="Search archive..." 
            className="w-full pl-11 pr-4 py-2 bg-black/50 border border-zinc-800 rounded-xl text-xs focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 outline-none shadow-sm text-zinc-200 placeholder-zinc-600"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
            <Filter size={14} /> FILTERS
          </button>
        </div>
      </div>

      <div className="bg-black rounded-xl border border-zinc-800/50 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-950/50 text-zinc-500 text-[9px] font-bold uppercase tracking-widest border-b border-zinc-800/50">
              <tr>
                <th className="px-6 py-4 text-left">TITLE</th>
                <th className="px-6 py-4 text-left">DATE</th>
                <th className="px-6 py-4 text-left">PARTICIPANTS</th>
                <th className="px-6 py-4 text-left">TASKS</th>
                <th className="px-6 py-4 text-left">STATUS</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {meetings.map((meeting) => (
                <tr 
                  key={meeting.id} 
                  className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                  onClick={() => onNavigateToMeeting(meeting.id)}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 border border-zinc-700">
                        <Video size={18} />
                      </div>
                      <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{meeting.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs text-zinc-500 font-bold uppercase tracking-tighter">{meeting.date}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex -space-x-1.5">
                      {meeting.participants.map((p, i) => (
                        <div key={i} className="w-6 h-6 rounded-full border border-zinc-900 bg-zinc-800 overflow-hidden" title={p}>
                          <img src={`https://picsum.photos/seed/${p}/100`} alt={p} />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{meeting.tasks.length} ITEMS</span>
                  </td>
                  <td className="px-6 py-5">
                    <MeetingStatusBadge status={meeting.status} />
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-zinc-700 hover:text-zinc-300">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MeetingsView;
