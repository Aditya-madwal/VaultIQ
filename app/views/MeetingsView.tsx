
import React from 'react';
import { Meeting } from '../types';
import { MoreHorizontal, PlayCircle, Search, Filter } from 'lucide-react';

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
            className="w-full pl-11 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs focus:ring-1 focus:ring-zinc-600 outline-none shadow-sm text-zinc-200 placeholder-zinc-700"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-bold text-zinc-500 hover:text-white transition-all">
            <Filter size={14} /> FILTERS
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-3xl border border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black text-zinc-600 text-[9px] font-bold uppercase tracking-widest border-b border-zinc-800">
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
                      <div className="w-9 h-9 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 group-hover:bg-white group-hover:text-black transition-all border border-zinc-700">
                        <PlayCircle size={18} />
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
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                      meeting.status === 'processed' ? 'bg-zinc-100 text-black border-zinc-100 shadow-[0_0_8px_rgba(255,255,255,0.2)]' : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                    }`}>
                      {meeting.status}
                    </span>
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
