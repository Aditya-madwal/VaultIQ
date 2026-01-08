'use client'
import React from 'react';
import { ALL_MEETINGS } from '../../constants';
import MeetingsTable from '../../components/MeetingsTable'; 
import { useRouter } from 'next/navigation';

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

      <MeetingsTable 
        meetings={ALL_MEETINGS} 
        onSelectMeeting={(meeting) => router.push(`/meetings/${meeting.id}`)} 
      />
    </div>
  );
}
