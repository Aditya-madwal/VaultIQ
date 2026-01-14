
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Meeting, Task } from '../types';
import SuggestedTask from '../microcomponents/SuggestedTask';
import { Calendar, Clock, BarChart3, Shield, Play, Download, Layers, FileText, Activity, Loader, HardDrive, FileVideo, ArrowRight, Trash2 } from 'lucide-react';
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
    <div className="h-full flex flex-col gap-5 max-w-[1600px] mx-auto pt-2 pb-10">
      
      {/* 1. Compact Header */}
      <header className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-zinc-800/60 pb-5">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <span className="bg-zinc-800/40 text-zinc-400 border border-zinc-700/50 rounded px-1.5 py-0.5 text-[10px] font-mono font-medium">
                ID: {meeting.id}
             </span>
             <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                Processed
             </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-zinc-100 tracking-tight leading-tight">
            {meeting.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium pt-1">
              <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-zinc-600"/>
                  {new Date(meeting.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1.5">
                  <Clock size={13} className="text-zinc-600"/>
                  {meeting.duration}
              </div>
              <div className="w-px h-3 bg-zinc-800" />
              <div className="flex gap-2">
                  {meeting.tags.map(tag => (
                      <span key={tag} className="hover:text-zinc-300 transition-colors cursor-pointer">#{tag}</span>
                  ))}
              </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
           <button className="px-5 py-2 bg-blue-900/30 text-blue-500 rounded-xl text-[12px] font-black uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 cursor-pointer">
             <Download size={16} strokeWidth={2.5} />
             Export
           </button>
           <button 
             onClick={handleDeleteClick}
             className="px-5 py-2 bg-red-900/30 text-red-500 rounded-xl text-[12px] font-black uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 cursor-pointer hover:bg-red-900/50"
           >
             <Trash2 size={16} strokeWidth={2.5} />
             Delete
           </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* 2. Main Content Area */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          {/* AI Analysis Section (Always Visible) */}
          <div className="w-full p-4 rounded-xl bg-green-900/20 border border-emerald-800/20">
            <span className="block text-[12px] font-black text-emerald-500 uppercase tracking-widest mb-1.5">
              AI Analysis
            </span>
            <p className="text-sm font-bold text-emerald-200/90 leading-relaxed">
              {meeting.summary}
            </p>
          </div>

          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl overflow-hidden h-fit w-full flex flex-col md:mr-4">
            {/* Tabs Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60 bg-zinc-900/60 backdrop-blur-sm sticky top-0 z-10">
                 <div className="flex gap-1 p-1 bg-zinc-950/40 rounded-lg border border-zinc-800/40">
                   {(['Transcript', 'MOM'] as const).map(tab => (
                     <button
                       key={tab}
                       onClick={() => setActiveContent(tab)}
                       className={`px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all
                         ${activeContent === tab 
                           ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700' 
                           : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                         }
                       `}
                     >
                       {tab}
                     </button>
                   ))}
                 </div>
                 
                 {activeContent === 'Transcript' && meeting?.transcript && (
                    <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider whitespace-nowrap">
                            Count:
                        </label>
                        <div className="flex items-center gap-2 bg-zinc-950/40 rounded-lg border border-zinc-800/40 p-1">
                            <input 
                                type="number" 
                                min="0" 
                                max={meeting.transcript.length}
                                value={transcriptLimit}
                                onChange={(e) => {
                                    const val = Number(e.target.value);
                                    if (val >= 0 && val <= (meeting.transcript?.length || 0)) {
                                        setTranscriptLimit(val);
                                    }
                                }}
                                className="w-12 bg-transparent text-right text-xs font-mono font-bold text-zinc-200 focus:outline-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            <span className="text-[10px] font-medium text-zinc-600 pr-2 border-l border-zinc-800 pl-2">
                                / {meeting.transcript.length}
                            </span>
                        </div>
                    </div>
                 )}
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              
              {activeContent === 'Transcript' && (
                <div className="animate-in fade-in duration-300 space-y-3">
                  {meeting.transcript && meeting.transcript.slice(0, transcriptLimit).map((item, i) => (
                    <div key={i} className="p-4 border border-zinc-800/60 rounded-xl bg-zinc-800/20 hover:border-zinc-700 hover:bg-zinc-800/40 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-zinc-700/50 flex items-center justify-center border border-zinc-600/30 text-[10px] font-black text-zinc-300 shadow-inner">
                             {item.speakername.charAt(0)}
                          </div>
                          <span className="text-[13px] font-bold text-zinc-200">{item.speakername}</span>
                        </div>
                        <span className="text-[10px] font-mono font-medium text-zinc-600 bg-zinc-900/50 px-1.5 py-0.5 rounded">{item.timestamp}</span>
                      </div>
                      <p className="text-[13px] font-medium text-zinc-400 leading-relaxed pl-9">{item.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeContent === 'MOM' && (
                  <div className="animate-in fade-in duration-300 grid grid-cols-1 gap-3">
                    {meeting.mom && meeting.mom.map((item, i) => {
                      const isDecision = item.type === 'decision';
                      const isAction = item.type === 'action';
                      return (
                        <div key={i} className={`px-4 py-3 rounded-xl border flex items-start gap-4 transition-all hover:bg-zinc-800/30
                          ${isDecision ? 'bg-indigo-500/5 border-indigo-500/20' : isAction ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-transparent border-zinc-800/50'}`}>
                          <div className={`mt-0.5 shrink-0 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded
                              ${isDecision ? 'bg-indigo-500/10 text-indigo-400' : isAction ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
                              {item.type}
                          </div>
                          <p className="text-[13px] font-medium text-zinc-300 leading-snug pt-0.5">{item.content}</p>
                        </div>
                      );
                    })}
                  </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Right Sidebar - Utilities */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Transcript File Card (shown if no video but transcript exists) */}
          {!meeting.videoFile && meeting.transcriptFile && (
            <div className="group rounded-xl border border-zinc-800/60 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-zinc-700/80 transition-all overflow-hidden shadow-sm hover:shadow-md">
              <div className="p-3.5 flex items-start gap-3.5">
                {/* Icon Section */}
                <div className="shrink-0 w-10 h-10 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors shadow-inner">
                   <FileText size={18} strokeWidth={2} />
                </div>
                
                {/* Text Info */}
                <div className="min-w-0 flex-1 space-y-0.5 pt-0.5">
                   <h4 className="text-[13px] font-bold text-zinc-200 truncate leading-snug" title={meeting.transcriptFile.gcsobjectkey}>
                      {meeting.transcriptFile.gcsobjectkey}
                   </h4>
                   <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-medium">
                      <span className="font-mono">{meeting.transcriptFile.filesize ? (meeting.transcriptFile.filesize / 1024).toFixed(1) + ' KB' : 'Unknown'}</span>
                   </div>
                </div>
              </div>

              {/* Download Action */}
              {transcriptSignedUrl ? (
                 <a 
                   href={transcriptSignedUrl}
                   target="_blank"
                   rel="noopener noreferrer" 
                   className="flex items-center justify-center gap-2 w-full py-2.5 bg-zinc-950/30 border-t border-zinc-800/50 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20 transition-all active:bg-emerald-500/20"
                 >
                    <Download size={12} strokeWidth={2.5} />
                    Download Transcript
                 </a>
              ) : (
                 <div className="w-full py-2.5 border-t border-zinc-800/50 flex justify-center bg-zinc-950/30">
                    <Loader size={12} className="text-zinc-600 animate-spin" />
                 </div>
              )}
            </div>
          )}

          {/* Video Player Card */}
          {/* {meeting.videoFile && (
            <div className="space-y-3">
              <div className="group rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 relative shadow-lg">
                <div className="aspect-video relative cursor-pointer">
                  {videoSignedUrl ? (
                    <video 
                      src={videoSignedUrl} 
                      className="absolute inset-0 w-full h-full object-cover" 
                      controls
                    />
                  ) : (
                    <>
                      <img 
                        src={`https://picsum.photos/seed/${meeting.id}/800/450`} 
                        alt="Thumbnail" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500" 
                      />
                       <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                       <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-zinc-100/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 animate-pulse shadow-xl">
                          <Loader size={20} className="text-white animate-spin" />
                        </div>
                      </div>
                    </>
                  )}
                 
                  {!videoSignedUrl && (
                    <div className="absolute top-3 left-3">
                       <div className="flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-bold text-white border border-white/10">
                         <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                         LOADING VIDEO...
                       </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="px-1 space-y-2">
                 <div className="flex items-center gap-2">
                    <FileVideo size={14} className="text-zinc-500" />
                    <h3 className="text-sm font-bold text-zinc-300 line-clamp-1" title={meeting.videoFile.gcsobjectkey}>
                        {meeting.videoFile.gcsobjectkey}
                    </h3>
                 </div>
                 <div className="flex items-center gap-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider pl-6">
                    <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-zinc-600"/>
                        <span>{meeting.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <HardDrive size={12} className="text-zinc-600"/>
                        <span>{meeting.videoFile.filesize ? (meeting.videoFile.filesize / (1024 * 1024)).toFixed(1) + ' MB' : 'Unknown Size'}</span>
                    </div>
                 </div>
              </div>
            </div>
          )} */}

          {/* Action Items Panel */}
          <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-5 flex flex-col h-fit">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-zinc-500"/>
                <h2 className="text-sm font-bold text-zinc-200">Suggested Tasks</h2>
              </div>
              <span className="text-[10px] font-bold text-zinc-600 bg-zinc-900 px-2 py-1 rounded-full border border-zinc-800">
                AUTO-DETECTED
              </span>
            </div>

            <div className="space-y-4 overflow-y-auto pr-1 -mr-2 custom-scrollbar">
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
                <div className="text-center text-zinc-500 text-xs py-10">No suggested tasks detected.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && meeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 space-y-6 animate-in zoom-in-95 duration-200 ring-1 ring-white/5">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-4">
                  <Trash2 size={24} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-zinc-100">Delete Meeting?</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Are you sure you want to delete <span className="text-zinc-200 font-semibold">{meeting.title}</span>? This action cannot be undone and all associated data including transcripts and tasks will be permanently removed.
              </p>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-2">
              <button 
                onClick={() => setIsDeleteConfirmOpen(false)}
                disabled={isDeleting}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600/90 hover:bg-red-600 border border-red-500 rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-red-900/20"
              >
                {isDeleting && <Loader size={12} className="animate-spin" />}
                {isDeleting ? 'Deleting...' : 'Delete Meeting'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingView;
