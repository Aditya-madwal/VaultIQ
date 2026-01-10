
'use client';
import React, { useEffect, useState } from 'react';
import { Meeting } from '../types';
import { getAllMeetings } from '../services/api/meetings';
import { Loader } from 'lucide-react';

interface MeetingsTableProps {
  onSelectMeeting: (meeting: Meeting) => void;
}

const MeetingsTable: React.FC<MeetingsTableProps> = ({ onSelectMeeting }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setIsLoading(true);
        const data = await getAllMeetings();
        setMeetings(data);
      } catch (err) {
        console.error('Failed to fetch meetings:', err);
        setError('Failed to load meetings');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
         <Loader className="animate-spin text-zinc-600" size={24} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-32 items-center justify-center text-red-500 font-bold text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-500">
      {meetings.map((meeting) => (
        <div 
          key={meeting.id} 
          onClick={() => onSelectMeeting(meeting)}
          className="group flex flex-col justify-between bg-zinc-900 border border-zinc-800 hover:border-zinc-700/80 rounded-2xl p-6 cursor-pointer hover:shadow-2xl hover:shadow-black/20 transition-all duration-300"
        >
          <div className="space-y-4">
             {/* Header */}
             <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-wider border border-zinc-700/50">
                  {meeting.category}
                </span>
                <span className="text-xs font-medium text-zinc-500 font-mono">
                  {new Date(meeting.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}
                </span>
             </div>

             {/* Content */}
             <div>
                <h3 className="text-lg font-bold text-zinc-100 leading-snug group-hover:text-indigo-400 transition-colors">
                  {meeting.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-2 line-clamp-2 leading-relaxed">
                   {meeting.summary}
                </p>
             </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
              <div className="flex gap-2">
                 {meeting.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="text-[10px] text-zinc-500 font-medium">#{tag}</span>
                 ))}
              </div>
              
              <div className="flex items-center gap-2 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                   <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
                      <span>View</span>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                   </div>
              </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetingsTable;
