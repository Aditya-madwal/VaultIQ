'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Meeting, Task } from '../types';
import SuggestedTask from '../microcomponents/SuggestedTask';
import { Calendar, Clock, Download, FileText, Loader, ArrowLeft, Trash2, Maximize2, MoreHorizontal } from 'lucide-react';
import { getMeetingById, deleteMeeting } from '../services/api/meetings';

interface MeetingViewProps {
  meetingId: string;
  onAddTask: (task: Omit<Task, 'id' | 'status'>) => void;
}

const MeetingView: React.FC<MeetingViewProps> = ({ meetingId, onAddTask }) => {
  const router = useRouter();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeContent, setActiveContent] = useState<'Transcript' | 'MOM'>('Transcript');
  const [transcriptLimit, setTranscriptLimit] = useState<number>(0);

  const [videoSignedUrl, setVideoSignedUrl] = useState<string | null>(null);
  const [transcriptSignedUrl, setTranscriptSignedUrl] = useState<string | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMeeting = async (showLoading = true) => {
    try {
      if (showLoading) setIsLoading(true);
      const data = await getMeetingById(meetingId);
      setMeeting(data);
    } catch (err) {
      console.error('Failed to fetch meeting:', err);
      setError('Failed to load meeting details');
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!meeting) return;
    setIsDeleting(true);
    try {
      await deleteMeeting(meeting.id);
      router.push('/meetings'); 
      router.refresh();
    } catch (err) {
      console.error('Failed to delete meeting:', err);
      alert('Failed to delete meeting. Please try again.');
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (meetingId) fetchMeeting();
  }, [meetingId]);

  useEffect(() => {
    if (meeting?.transcript) {
      setTranscriptLimit(meeting.transcript.length >= 10 ? 10 : meeting.transcript.length);
    }
    
    // Fetch signed URLs when meeting data is available
    if (meeting?.videoFile?._id) {
        fetch(`/api/documents/download?fileId=${meeting.videoFile._id}`)
            .then(res => res.json())
            .then(data => {
                if (data.url) setVideoSignedUrl(data.url);
            })
            .catch(err => console.error("Failed to fetch video URL", err));
    } else {
        setVideoSignedUrl(null);
    }

    if (meeting?.transcriptFile?._id) {
        fetch(`/api/documents/download?fileId=${meeting.transcriptFile._id}`)
            .then(res => res.json())
            .then(data => {
                if (data.url) setTranscriptSignedUrl(data.url);
            })
            .catch(err => console.error("Failed to fetch transcript URL", err));
    } else {
        setTranscriptSignedUrl(null);
    }

  }, [meeting]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center min-h-[500px]">
        <Loader className="animate-spin text-zinc-600" size={32} />
      </div>
    );
  }

  if (error || !meeting) {
    return (
      <div className="flex h-full items-center justify-center min-h-[500px] text-red-500 font-bold">
        {error || 'Meeting not found'}
      </div>
    );
  }

  const suggestedTasks = meeting.tasks ? meeting.tasks.filter((t: any) => t.suggested === true) : [];

  return (
    <div className="h-[calc(100vh-6rem)] w-full flex flex-col gap-4 pt-2 px-2 md:px-0">
      
      {/* 1. Slim Header */}
      <header className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-3 px-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
             <button onClick={() => router.back()} className="text-zinc-500 hover:text-zinc-300 md:hidden">
               <ArrowLeft size={16} />
             </button>
             <h1 className="text-xl md:text-2xl font-bold text-zinc-100 tracking-tight truncate max-w-md">
               {meeting.title}
             </h1>
             <span className="hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wide border border-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                Processed
             </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-zinc-500 font-medium pl-1 md:pl-0">
              <span className="flex items-center gap-1"><Calendar size={12}/> {new Date(meeting.date).toLocaleDateString()}</span>
              <span className="w-px h-3 bg-zinc-800" />
              <span className="flex items-center gap-1"><Clock size={12}/> {meeting.duration}</span>
              <span className="w-px h-3 bg-zinc-800" />
              <div className="flex gap-2">
                  {meeting.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-zinc-400">#{tag}</span>
                  ))}
              </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 self-end md:self-auto">
           <button 
             onClick={handleDeleteClick}
             className="px-3 md:px-4 py-2 bg-red-950/30 text-red-500 border border-red-900/50 rounded-lg text-[11px] font-black uppercase tracking-wider hover:bg-red-900/50 transition-all flex items-center gap-2"
           >
             <Trash2 size={14} />
             <span className="hidden md:inline">Delete</span>
           </button>
           <button className="px-3 md:px-4 py-2 bg-zinc-800 text-zinc-300 border border-zinc-700/50 rounded-lg text-[11px] font-black uppercase tracking-wider hover:bg-zinc-700 transition-all flex items-center gap-2">
             <Download size={14} />
             <span className="hidden md:inline">Export</span>
           </button>
        </div>
      </header>

      {/* 2. Main Content - Fixed Height with Independent Scroll */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6 px-1 md:px-4 pb-2">
        {/* LEFT COLUMN: Analysis & Transcript */}
        <div className="col-span-1 lg:col-span-8 flex flex-col gap-4 h-full overflow-hidden">
          
          {/* AI Summary - Collapsible or Scrollable if too long, usually short */}
          <div className="shrink-0 p-4 rounded-xl bg-gradient-to-br from-green-900/20 to-emerald-900/10 border border-emerald-800/20 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={14} className="text-emerald-500/50" />
             </div>
             <div className="flex items-center gap-2 mb-2">
                <div className="p-1 rounded bg-emerald-500/10 text-emerald-400">
                   <MoreHorizontal size={14} />
                </div>
                <span className="text-[11px] font-black text-emerald-500 uppercase tracking-widest">Executive Summary</span>
             </div>
             <p className="text-[13px] md:text-sm font-medium text-emerald-100/80 leading-relaxed line-clamp-3 hover:line-clamp-none transition-all cursor-default">
               {meeting.summary}
             </p>
          </div>

          {/* Transcript / MOM Tabs */}
          <div className="flex-1 flex flex-col min-h-0 bg-zinc-900/30 border border-zinc-800/60 rounded-xl overflow-hidden">
            {/* Tab Header */}
            <div className="flex items-center justify-between px-2 md:px-4 py-2 border-b border-zinc-800/60 bg-zinc-950/30">
               <div className="flex gap-1">
                 {(['Transcript', 'MOM'] as const).map(tab => (
                   <button
                     key={tab}
                     onClick={() => setActiveContent(tab)}
                     className={`px-4 py-1.5 text-[10px] md:text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all
                       ${activeContent === tab 
                         ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700' 
                         : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                       }
                     `}
                   >
                     {tab}
                   </button>
                 ))}
               </div>

               {activeContent === 'Transcript' && (
                 <div className="flex items-center gap-2">
                    <span className="text-[10px] hidden md:inline font-bold text-zinc-600 uppercase">Limit:</span>
                    <input 
                      type="number" 
                      value={transcriptLimit}
                      onChange={(e) => setTranscriptLimit(Math.max(0, parseInt(e.target.value)))}
                      className="w-12 bg-zinc-900 border border-zinc-800 rounded text-center text-xs font-mono text-zinc-400 focus:border-zinc-600 focus:outline-none py-1"
                    />
                 </div>
               )}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-black/20">
              {activeContent === 'Transcript' && (
                 <div className="space-y-3">
                   {meeting.transcript && meeting.transcript.slice(0, transcriptLimit).map((item, i) => (
                     <div key={i} className="group p-3 md:p-4 rounded-xl border border-zinc-800/40 bg-zinc-800/10 hover:bg-zinc-800/30 transition-colors">
                       <div className="flex items-baseline gap-3 mb-1">
                         <span className="text-xs font-bold text-indigo-300 min-w-[3rem]">{item.speakername}</span>
                         <span className="text-[10px] font-mono text-zinc-600">{item.timestamp}</span>
                       </div>
                       <p className="text-[13px] text-zinc-300 leading-relaxed">{item.content}</p>
                     </div>
                   ))}
                   {(!meeting.transcript || meeting.transcript.length === 0) && (
                     <div className="text-center py-20 text-zinc-600 font-mono text-xs">No Transcript available</div>
                   )}
                 </div>
              )}

              {activeContent === 'MOM' && (
                  <div className="grid gap-2">
                    {meeting.mom && meeting.mom.map((item, i) => {
                       const colors = item.type === 'decision' 
                         ? 'bg-purple-500/5 border-purple-500/20 hover:border-purple-500/30' 
                         : item.type === 'action'
                         ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/30'
                         : 'bg-zinc-800/20 border-zinc-800/50';
                         
                       const badge = item.type === 'decision'
                         ? 'text-purple-400 bg-purple-500/10'
                         : item.type === 'action'
                         ? 'text-emerald-400 bg-emerald-500/10'
                         : 'text-zinc-400 bg-zinc-800';

                       return (
                        <div key={i} className={`p-3 rounded-xl border ${colors} transition-all flex gap-3`}>
                           <div className={`mt-0.5 shrink-0 px-1.5 py-0.5 text-[9px] font-black uppercase rounded ${badge}`}>
                              {item.type.charAt(0)}
                           </div>
                           <p className="text-sm font-medium text-zinc-300">{item.content}</p>
                        </div>
                       )
                    })}
                  </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Utilities - Independent Scroll */}
        <div className="col-span-1 lg:col-span-4 h-full flex flex-col gap-4 overflow-hidden mt-6 lg:mt-0">
           
           {/* File Attachment Card */}
           {(!meeting.videoFile && meeting.transcriptFile) && (
             <div className="shrink-0 p-3 rounded-xl border border-zinc-800 bg-zinc-900/40 flex items-center justify-between group hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center border border-zinc-800 text-zinc-500 group-hover:text-zinc-300 group-hover:border-zinc-600 transition-all">
                      <FileText size={18} />
                   </div>
                   <div className="space-y-0.5">
                      <div className="text-xs font-bold text-zinc-300 line-clamp-1 max-w-[150px]" title={meeting.transcriptFile.gcsobjectkey}>
                        {meeting.transcriptFile.gcsobjectkey}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono">
                         {(meeting.transcriptFile.filesize ? (meeting.transcriptFile.filesize / 1024).toFixed(1) + ' KB' : 'TXT')}
                      </div>
                   </div>
                </div>
                {transcriptSignedUrl && (
                  <a href={transcriptSignedUrl} target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors">
                     <Download size={16} />
                  </a>
                )}
             </div>
           )}

           {/* Tasks Panel */}
           <div className="flex-1 flex flex-col min-h-0 bg-zinc-900/20 border border-zinc-800/60 rounded-xl overflow-hidden">
              <div className="shrink-0 px-4 py-3 border-b border-zinc-800/60 flex items-center justify-between bg-zinc-950/20">
                 <h3 className="text-xs font-black text-zinc-400 uppercase tracking-wider">Action Items</h3>
                 <span className="text-[10px] font-bold text-zinc-600 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    {suggestedTasks.length} DETECTED
                 </span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                 {suggestedTasks.map((task: any, idx: number) => (
                    <SuggestedTask 
                      key={idx}
                      taskId={task._id || task.id}
                      title={task.title}
                      description={task.description}
                      priority={task.priority}
                      tags={task.tags}
                      onAdd={() => fetchMeeting(false)}
                    />
                 ))}
                 {suggestedTasks.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center opacity-40">
                       <MoreHorizontal size={24} className="mb-2" />
                       <span className="text-xs font-bold">No tasks detected</span>
                    </div>
                 )}
              </div>
           </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && meeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 space-y-6 ring-1 ring-white/10">
            <div className="space-y-2 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-2">
                  <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="text-lg font-bold text-zinc-100">Delete Meeting?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed px-4">
                This will permanently delete <span className="text-zinc-200">{meeting.title}</span> and all associated data.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setIsDeleteConfirmOpen(false)}
                disabled={isDeleting}
                className="py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 rounded-xl transition-colors"
              >
                {isDeleting ? 'Deleting...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingView;
