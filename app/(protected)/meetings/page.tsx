'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import MeetingsTable from '../../components/MeetingsTable';
import { Meeting } from '../../types';

export default function MeetingsPage() {
  const router = useRouter();

  const handleSelectMeeting = (meeting: Meeting) => {
    router.push(`/meetings/${meeting.id}`);
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between pt-2">
        <div>
           <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Analyzed Meetings</h1>
           <p className="text-zinc-500 text-xs font-medium">Archived meeting intelligence and transcripts.</p>
        </div>
      </div>

      <MeetingsTable onSelectMeeting={handleSelectMeeting} />
    </div>
  );
}
