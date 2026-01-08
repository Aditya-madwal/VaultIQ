'use client';
import React from 'react';
import { ALL_MEETINGS } from '../../constants';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

export default function MeetingsPage() {
  const router = useRouter();

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between pt-2">
        <div>
           <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Protocol Sessions</h1>
           <p className="text-zinc-500 text-xs font-medium">Archived meeting intelligence and transcripts.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-lg backdrop-blur-sm">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              Total Sessions: <span className="text-white ml-1">{ALL_MEETINGS.length}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ALL_MEETINGS.map((meeting) => (
          <div 
            key={meeting.id}
            onClick={() => router.push(`/meetings/${meeting.id}`)}
            className="group relative flex flex-col p-4 bg-zinc-950/40 hover:bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl transition-all duration-200 cursor-pointer overflow-hidden ring-1 ring-white/0 hover:ring-white/5"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
               {/* Metadata Row */}
               <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex py-0.5 px-1.5 rounded-md bg-zinc-900/80 border border-zinc-800 text-[9px] font-bold text-zinc-400 uppercase tracking-wider">
                      {meeting.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-zinc-500">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono">
                      <Calendar size={10} strokeWidth={2} />
                      <span>{meeting.date}</span>
                    </div>
                  </div>
               </div>

               {/* Title */}
               <h3 className="text-sm font-bold text-zinc-200 group-hover:text-white leading-snug mb-2 line-clamp-1 transition-colors pr-6">
                 {meeting.title}
               </h3>

               {/* Summary */}
               <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed mb-4 flex-1">
                 {meeting.summary}
               </p>

               {/* Footer */}
               <div className="mt-auto pt-3 border-t border-zinc-900/60 flex items-center justify-between">
                 <div className="flex items-center bg-zinc-900/40 rounded-full px-2 py-0.5 border border-zinc-800/50">
                    <Clock size={10} className="text-zinc-500 mr-1.5" />
                    <span className="text-[10px] font-mono font-medium text-zinc-400">{meeting.duration}</span>
                 </div>

                 <div className="flex items-center -space-x-1.5">
                   {/* We could map participants here if we want more detail, or just show tags */}
                   {meeting.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[9px] font-medium text-zinc-500 bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded-full z-0 group-hover:z-10 transition-all">
                        #{tag}
                      </span>
                   ))}
                   {meeting.tags.length > 3 && (
                     <span className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 text-[8px] text-zinc-400 font-bold z-10">
                       +{meeting.tags.length - 3}
                     </span>
                   )}
                 </div>
               </div>
               
               {/* Decorative icon */}
               <div className="absolute top-4 right-4 text-zinc-800 group-hover:text-zinc-600 transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 duration-200">
                  <ArrowUpRight size={14} />
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
