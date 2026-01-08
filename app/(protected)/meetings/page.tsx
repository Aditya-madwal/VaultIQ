'use client'
import React from 'react';
import { ALL_MEETINGS } from '../../constants';
// import MeetingsTable from '../../components/MeetingsTable'; // Deprecated
import { useRouter } from 'next/navigation';
import StatusBadge from '../../microcomponents/StatusBadge';

export default function MeetingsPage() {
  const router = useRouter();

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between">
        <div>
           <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Protocol Sessions</h1>
           <p className="text-zinc-500 font-medium text-sm">Archived meeting intelligence and transcripts.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-bold text-zinc-400">
            Total: {ALL_MEETINGS.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ALL_MEETINGS.map((meeting) => (
          <div 
            key={meeting.id}
            onClick={() => router.push(`/meetings/${meeting.id}`)}
            className="group relative flex flex-col bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 hover:bg-zinc-900/80 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-black/20"
          >
            <div className="flex flex-col flex-1 p-6">
               
               {/* Header: Badges & Meta */}
               <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-zinc-950 border border-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-widest rounded-md">
                      {meeting.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-zinc-500 font-mono">
                      {meeting.date}
                    </span>
                    <StatusBadge label={meeting.duration} variant="default" />
                  </div>
               </div>

               {/* Title */}
               <h3 className="text-xl font-bold text-white leading-tight mb-3 group-hover:text-indigo-400 transition-colors">
                 {meeting.title}
               </h3>
               
               {/* Summary */}
               <p className="text-zinc-500 text-xs line-clamp-3 mb-6 font-medium leading-relaxed">
                 {meeting.summary}
               </p>

               {/* Footer: Tags */}
               <div className="mt-auto pt-5 border-t border-zinc-800/50 flex flex-wrap gap-2">
                 {meeting.tags.slice(0, 4).map(tag => (
                   <span key={tag} className="text-[9px] uppercase font-black tracking-wider text-zinc-500 bg-zinc-950/50 border border-zinc-800/50 px-2.5 py-1 rounded hover:bg-zinc-800 hover:text-zinc-300 transition-colors">
                     #{tag}
                   </span>
                 ))}
                 {meeting.tags.length > 4 && (
                    <span className="text-[9px] uppercase font-black tracking-wider text-zinc-600 px-1 py-1">
                      +{meeting.tags.length - 4}
                    </span>
                 )}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
