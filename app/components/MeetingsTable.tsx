
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in zoom-in-95 duration-500">
      {meetings.map((meeting) => (
        <div 
          key={meeting.id} 
          onClick={() => onSelectMeeting(meeting)}
          className="group relative h-[220px] w-full overflow-hidden rounded-3xl cursor-pointer"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src={meeting.thumbnail || `https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} 
              alt={meeting.title}
              className="h-full w-full object-cover transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-medium text-white shadow-lg">
              {new Date(meeting.date).toLocaleDateString()}
            </div>
            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-lg uppercase tracking-wider">
              {meeting.category}
            </div>
          </div>

          {/* Bottom Blur Content */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-5 bg-zinc-950/40 backdrop-blur-md border-t border-white/5 flex flex-col gap-3 transition-all duration-300 group-hover:bg-zinc-950/60 rounded-xl">
            
            {/* Title & Info */}
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold text-white leading-tight line-clamp-1 group-hover:text-indigo-300 transition-colors">
                {meeting.title}
              </h3>
              <p className="text-xs text-zinc-400 font-medium line-clamp-1 flex items-center gap-2">
                <span>{meeting.duration}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                <span>{meeting.tags.slice(0, 2).join(', ')}</span>
              </p>
            </div>

            {/* Action Button */}
            <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black font-semibold text-xs transition-all flex items-center justify-center gap-2 group/btn border border-white/5">
              View Details
              <svg 
                className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MeetingsTable;
