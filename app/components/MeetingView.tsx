
'use client';
import React, { useState, useEffect } from 'react';
import { Meeting, Task } from '../types';
import SuggestedTask from '../microcomponents/SuggestedTask';
import { Calendar, Clock, BarChart3, Shield, Play, Download, Share2, MoreHorizontal, Layers, FileText, Activity, Loader, HardDrive, FileVideo, ArrowRight } from 'lucide-react';
import { getMeetingById } from '../services/api/meetings';

interface MeetingViewProps {
  meetingId: string;
  onAddTask: (task: Omit<Task, 'id' | 'status'>) => void;
}

const MeetingView: React.FC<MeetingViewProps> = ({ meetingId, onAddTask }) => {
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeContent, setActiveContent] = useState<'Transcript' | 'MOM'>('Transcript');

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

  useEffect(() => {
    if (meetingId) fetchMeeting();
  }, [meetingId]);

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
           <button className="p-2 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors border border-transparent hover:border-zinc-700">
             <Share2 size={16} />
           </button>
           <button className="p-2 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors border border-transparent hover:border-zinc-700">
             <Download size={16} />
           </button>
           <button className="p-2 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg transition-colors border border-transparent hover:border-zinc-700">
             <MoreHorizontal size={16} />
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
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              
              {activeContent === 'Transcript' && (
                <div className="animate-in fade-in duration-300 space-y-3">
                  {meeting.transcript && meeting.transcript.map((item, i) => (
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
          {!meeting.videoUrl && meeting.transcriptUrl && (
            <div className="space-y-3">
              <div className="group rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950/50 p-6 relative shadow-lg transition-all hover:bg-zinc-900/50">
                <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-900 shadow-xl flex items-center justify-center border border-zinc-800 group-hover:border-zinc-700 group-hover:scale-105 transition-all">
                      <FileText size={28} className="text-zinc-400 group-hover:text-zinc-200" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-sm font-bold text-zinc-200">Raw Transcript</h3>
                        <p className="text-xs text-zinc-500 max-w-[200px] mx-auto leading-relaxed">
                            Full conversation logs available for viewing.
                        </p>
                    </div>
                    
                    {meeting.confidenceLevel && (
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 rounded border border-emerald-500/20">
                            <Activity size={12} className="text-emerald-500" />
                            <span className="text-[10px] font-bold text-emerald-400">
                                {meeting.confidenceLevel}% AI Confidence
                            </span>
                        </div>
                    )}
                </div>
              </div>
              
              <div className="flex items-center justify-between px-1">
                 <div className="flex items-center gap-2">
                    <FileText size={14} className="text-zinc-500" />
                    <span className="text-xs font-bold text-zinc-400">Standard Text File</span>
                 </div>
                 <a 
                   href={meeting.transcriptUrl} 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all"
                 >
                   Open
                   <ArrowRight size={12} /> 
                 </a>
              </div>
            </div>
          )}

          {/* Video Player Card */}
          {meeting.videoUrl && (
            <div className="space-y-3">
              <div className="group rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 relative shadow-lg">
                <div className="aspect-video relative cursor-pointer">
                  <img 
                    src={meeting.videoUrl || `https://picsum.photos/seed/${meeting.id}/800/450`} 
                    alt="Thumbnail" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-zinc-100/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-all shadow-xl">
                      <Play size={20} className="text-white fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-bold text-white border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                      REC
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 text-[10px] font-mono font-bold text-zinc-300 bg-black/60 px-1.5 py-0.5 rounded">
                    1080p
                  </div>
                </div>
              </div>
              
              <div className="px-1 space-y-2">
                 <div className="flex items-center gap-2">
                    <FileVideo size={14} className="text-zinc-500" />
                    <h3 className="text-sm font-bold text-zinc-300 line-clamp-1" title={meeting.title + '.mp4'}>
                        {meeting.title}.mp4
                    </h3>
                 </div>
                 <div className="flex items-center gap-4 text-[11px] font-bold text-zinc-500 uppercase tracking-wider pl-6">
                    <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-zinc-600"/>
                        <span>{meeting.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <HardDrive size={12} className="text-zinc-600"/>
                        <span>854 MB</span>
                    </div>
                 </div>
              </div>
            </div>
          )}

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
    </div>
  );
};

export default MeetingView;
