
'use client'
import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import MeetingView from '../../../components/MeetingView';
import { ALL_MEETINGS } from '../../../constants';
import { Task } from '../../../types';

export default function MeetingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  // Find the meeting by ID from the constant data (or fetch from API in real app)
  const meeting = ALL_MEETINGS.find(m => m.id === id);

  const handleAddTask = (task: Omit<Task, 'id' | 'status'>) => {
    console.log('Adding task for meeting', id, task);
    // Logic to add task would go here
  };

  if (!meeting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold text-zinc-400">Meeting Not Found</h2>
        <p className="text-zinc-600">The protocol session ID "{id}" could not be retrieved.</p>
        <button 
          onClick={() => router.back()}
          className="px-6 py-2 bg-zinc-800 text-white rounded-xl text-sm font-bold hover:bg-zinc-700 transition-colors"
        >
          Return to Console
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest pl-1"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Sessions
      </button>

      <MeetingView 
        meeting={meeting} 
        onAddTask={handleAddTask} 
      />
    </div>
  );
}
