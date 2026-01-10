
'use client';
import React, { useEffect, useState } from 'react';
import { Meeting } from '../types';
import { getAllMeetings, deleteMeeting } from '../services/api/meetings';
import { Loader, Trash2, Calendar, ArrowUpRight, Search } from 'lucide-react';

import { toast } from 'sonner';
import { useRefresh } from '../context/RefreshContext';

interface MeetingsTableProps {
  onSelectMeeting: (meeting: Meeting) => void;
}

const MeetingsTable: React.FC<MeetingsTableProps> = ({ onSelectMeeting }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { refreshKey } = useRefresh();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMeetings = meetings.filter(meeting => {
    const query = searchQuery.toLowerCase();
    return (
      meeting.title.toLowerCase().includes(query) ||
      meeting.summary.toLowerCase().includes(query) ||
      meeting.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

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
  }, [refreshKey]);

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    
    try {
      await deleteMeeting(id);
      setMeetings(prev => prev.filter(m => m.id !== id));
      toast.success('Meeting deleted successfully');
    } catch (err) {
      console.error('Failed to delete meeting:', err);
      toast.error('Failed to delete meeting');
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
         <Loader className="animate-spin text-neutral-500" size={20} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-32 items-center justify-center text-rose-500/80 font-medium text-sm">
        {error}
      </div>
    );
  }

  return (
    <>
     <div className="flex items-center justify-between pt-2 mb-6">
        <div>
           <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Analyzed Meetings</h1>
           <p className="text-zinc-500 text-xs font-medium">Archived meeting intelligence and transcripts.</p>
        </div>
        <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-green-400 transition-colors w-4 h-4" />
            <input 
                type="text"
                placeholder="Search meetings..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-green-500/50 focus:bg-white/[0.05] hover:bg-white/[0.05] w-64 transition-all"
            />
        </div>
      </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 animate-in fade-in zoom-in-95 duration-500">
      {filteredMeetings.map((meeting) => (
        <div 
          key={meeting.id} 
          onClick={() => onSelectMeeting(meeting)}
          className="group relative flex flex-col justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer overflow-hidden"
        >
          {/* Subtle Glow Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 space-y-3">
             {/* Header */}
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-400 group-hover:text-neutral-300 transition-colors">
                   <Calendar className="w-3 h-3 text-neutral-500 group-hover:text-green-400" />
                   {new Date(meeting.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded-md border ${
                    meeting.category === 'Client' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    meeting.category === 'Internal' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    'bg-green-500/10 text-green-400 border-green-500/20'
                }`}>
                  {meeting.category}
                </span>
             </div>

             {/* Content */}
             <div>
                <h3 className="text-sm font-semibold text-neutral-200 leading-tight group-hover:text-white transition-colors pr-2">
                  {meeting.title}
                </h3>
                <p className="text-[11px] text-neutral-500 mt-1.5 line-clamp-2 leading-relaxed group-hover:text-neutral-400 transition-colors">
                   {meeting.summary}
                </p>
             </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5 flex-wrap">
                 {meeting.tags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-neutral-500 font-medium group-hover:bg-white/10 group-hover:text-neutral-400 transition-colors">
                        #{tag}
                    </span>
                 ))}
                 {meeting.tags.length > 2 && (
                    <span className="text-[10px] text-neutral-600">+{meeting.tags.length - 2}</span>
                 )}
              </div>
              
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                   <button 
                      onClick={(e) => handleDelete(e, meeting.id)}
                      className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-white/5 rounded-md transition-colors"
                      title="Delete Meeting"
                   >
                      <Trash2 size={13} />
                   </button>
                   <div className="w-px h-3 bg-white/10" />
                   <div className="p-1 text-neutral-500 group-hover:text-green-400 transition-colors">
                       <ArrowUpRight size={14} />
                   </div>
              </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default MeetingsTable;
