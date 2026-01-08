
import React from 'react';
import { Meeting } from '../types';
import StatusBadge from '../microcomponents/StatusBadge';

interface MeetingsTableProps {
  meetings: Meeting[];
  onSelectMeeting: (meeting: Meeting) => void;
}

const MeetingsTable: React.FC<MeetingsTableProps> = ({ meetings, onSelectMeeting }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden transition-colors duration-300">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-950/50">
            <th className="px-6 py-4 font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Title</th>
            <th className="px-6 py-4 font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Date</th>
            <th className="px-6 py-4 font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Duration</th>
            <th className="px-6 py-4 font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Category</th>
            <th className="px-6 py-4 font-mono text-[10px] text-zinc-500 uppercase tracking-[0.2em]">Tags</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {meetings.map((meeting) => (
            <tr 
              key={meeting.id} 
              onClick={() => onSelectMeeting(meeting)}
              className="group cursor-pointer hover:bg-zinc-800/50 transition-colors"
            >
              <td className="px-6 py-5">
                <span className="text-sm font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                  {meeting.title}
                </span>
              </td>
              <td className="px-6 py-5">
                <span className="text-xs font-medium text-zinc-400">
                  {meeting.date}
                </span>
              </td>
              <td className="px-6 py-5">
                <StatusBadge label={meeting.duration} variant="default" />
              </td>
              <td className="px-6 py-5">
                <span className="px-2 py-1 bg-indigo-900/20 text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded border border-indigo-800/30">
                  {meeting.category}
                </span>
              </td>
              <td className="px-6 py-5">
                <div className="flex flex-wrap gap-1.5">
                  {meeting.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[8px] font-black uppercase tracking-tighter text-zinc-500 border border-zinc-800 px-1.5 py-0.5 rounded bg-zinc-900 group-hover:bg-zinc-950 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingsTable;
