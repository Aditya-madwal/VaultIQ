
import React, { useState } from 'react';
import { Meeting, Task } from '../types';
import SuggestedTask from '../microcomponents/SuggestedTask';
import { Calendar, Clock, BarChart3, Shield, Play, Download, Share2, MoreHorizontal, Layers, FileText, Activity } from 'lucide-react';

interface MeetingViewProps {
  meeting: Meeting;
  onAddTask: (task: Omit<Task, 'id' | 'status'>) => void;
}

const MeetingView: React.FC<MeetingViewProps> = ({ meeting, onAddTask }) => {
  const [activeContent, setActiveContent] = useState<'Summary' | 'Transcript' | 'MOM'>('Summary');

  const suggestedTasks = [
    {
      title: 'Infrastructure Sync: AWS Lambda',
      description: 'Align the serverless migration with the Q2 DevOps roadmap specifically for us-east-1 region.',
      priority: 'High' as const,
      tags: ['Engineering', 'DevOps'],
      suggested: true
    },
    {
      title: 'Hifi Prototyping: Analytics V2',
      description: 'Review the latest high-fidelity dashboard mockups with focus on real-time data streaming.',
      priority: 'Medium' as const,
      tags: ['UI/UX', 'Research'],
      suggested: true
    }
  ];

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
                  {meeting.date}
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
          <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl overflow-hidden min-h-[400px] flex flex-col md:mr-4">
            {/* Tabs Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60 bg-zinc-900/60 backdrop-blur-sm sticky top-0 z-10">
                 <div className="flex gap-1 p-1 bg-zinc-950/40 rounded-lg border border-zinc-800/40">
                   {(['Summary', 'Transcript', 'MOM'] as const).map(tab => (
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
                 <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-indigo-900/10 border border-indigo-500/20 rounded-full">
                    <Activity size={12} className="text-indigo-400" />
                    <span className="text-[10px] font-bold text-indigo-300">HIGH_CONFIDENCE_SCORING</span>
                 </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
              {activeContent === 'Summary' && (
                <div className="animate-in fade-in duration-300">
                  <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="flex-1 space-y-6">
                      <div>
                        <h3 className="text-sm font-bold text-zinc-200 mb-3 flex items-center gap-2">
                           <FileText size={14} className="text-zinc-500" />
                           Executive Synthesis
                        </h3>
                        <div className="space-y-4 text-zinc-400 font-medium leading-[1.7] text-[15px]">
                          {meeting.summary.split('. ').map((s, i) => (
                             s.length > 5 && <p key={i}>{s.trim()}.</p>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-64 shrink-0 space-y-3">
                      <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-900/10 to-transparent border border-emerald-800/20">
                        <span className="block text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1.5">Sentiment</span>
                        <p className="text-xs font-bold text-emerald-200/90 leading-relaxed">Constructive focus on Q2 scalability optimization.</p>
                      </div>
                      <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900/10 to-transparent border border-indigo-800/20">
                        <span className="block text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1.5">Vector</span>
                        <p className="text-xs font-bold text-indigo-200/90 leading-relaxed">AWS Architecture Optimization.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeContent === 'Transcript' && (
                <div className="animate-in fade-in duration-300 space-y-3">
                  {meeting.transcript.map((item, i) => (
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
                    {meeting.mom.map((item, i) => {
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
          
          {/* Video Player Card */}
          <div className="group rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 relative shadow-lg">
            <div className="aspect-video relative cursor-pointer">
              <img 
                src={meeting.videoUrl} 
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

          {/* Action Items Panel */}
          <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-5 flex flex-col h-fit max-h-[500px]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-zinc-500"/>
                <h2 className="text-sm font-bold text-zinc-200">Intelligence Layers</h2>
              </div>
              <span className="text-[10px] font-bold text-zinc-600 bg-zinc-900 px-2 py-1 rounded-full border border-zinc-800">
                AUTO-DETECTED
              </span>
            </div>

            <div className="space-y-4 overflow-y-auto pr-1 -mr-2 custom-scrollbar">
              {suggestedTasks.map((task, idx) => (
                <SuggestedTask 
                  key={idx}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  tags={task.tags}
                  onAdd={() => onAddTask({ ...task, sourceMeeting: meeting.title })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingView;
