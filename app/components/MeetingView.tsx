
import React, { useState } from 'react';
import { Meeting, Task } from '../types';
import SuggestedTask from '../microcomponents/SuggestedTask';

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
      tags: ['Engineering', 'DevOps']
    },
    {
      title: 'Hifi Prototyping: Analytics V2',
      description: 'Review the latest high-fidelity dashboard mockups with focus on real-time data streaming.',
      priority: 'Medium' as const,
      tags: ['UI/UX', 'Research']
    }
  ];

  return (
    <div className="grid grid-cols-12 gap-6 pb-20 pt-4">
      
      {/* 1. Header Protocol Information */}
      <div className="col-span-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-900 pb-8 mb-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-indigo-400 font-bold tracking-widest uppercase bg-indigo-900/20 px-2 py-0.5 rounded border border-indigo-800/30">ID: {meeting.id}_PHX</span>
            <div className="h-4 w-px bg-zinc-900"></div>
            <span className="flex items-center gap-1.5 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
              Live Protocol
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-zinc-100 tracking-tighter leading-none">
            {meeting.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
             {['Sync', 'Q2_Roadmap', 'Strategy'].map(tag => (
               <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-zinc-500 border border-zinc-800 bg-zinc-900 px-2 py-0.5 rounded transition-colors cursor-default">#{tag}</span>
             ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">TIMESTAMP</span>
             <span className="text-sm font-bold text-zinc-300">{meeting.date}</span>
          </div>
          <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800">
             <svg className="w-5 h-5 text-zinc-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
          </div>
        </div>
      </div>

      {/* 2. Main Intelligence Core (Center Bento) */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <div className="bg-zinc-900 rounded-3xl p-8 min-h-[580px] border border-zinc-800 relative overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-10">
            <div className="flex gap-10">
              {(['Summary', 'Transcript', 'MOM'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveContent(tab)}
                  className={`pb-3 text-[10px] font-black uppercase tracking-[0.25em] transition-all relative
                    ${activeContent === tab 
                      ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-indigo-500 after:rounded-full' 
                      : 'text-zinc-600 hover:text-zinc-400'
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded-xl border border-zinc-700">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Acc_Rate</span>
              <span className="text-[9px] font-mono font-bold text-indigo-400">98.2%</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-4 scroll-smooth">
            {activeContent === 'Summary' && (
              <div className="animate-in fade-in duration-500">
                <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                  <div className="flex-1">
                    <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">Synthesis Analysis</h3>
                    <div className="space-y-6 text-zinc-400 font-medium leading-[1.8] text-base">
                      {meeting.summary.split('. ').map((s, i) => (
                        <p key={i}>{s}.</p>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 space-y-4">
                    <div className="p-5 rounded-2xl bg-emerald-900/10 border border-emerald-800/20">
                      <span className="block text-[8px] font-black text-emerald-400 uppercase tracking-widest mb-2">Sentiment_Logic</span>
                      <p className="text-xs font-bold text-emerald-300/80">Constructive focus on Q2 scalability.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-indigo-900/10 border border-indigo-800/20">
                      <span className="block text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-2">Primary_Vector</span>
                      <p className="text-xs font-bold text-indigo-300/80">AWS Architecture Optimization.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeContent === 'Transcript' && (
              <div className="animate-in fade-in duration-500 space-y-4">
                {meeting.transcript.split('\n').map((line, i) => {
                  const [name, text] = line.split(': ');
                  return (
                    <div key={i} className="flex gap-6 group hover:bg-zinc-800 p-3 rounded-xl transition-colors border border-transparent hover:border-zinc-700">
                      <div className="w-20 shrink-0">
                        <span className="text-[9px] font-black uppercase text-zinc-500 group-hover:text-indigo-400 transition-colors tracking-widest">{name}</span>
                        <div className="text-[8px] font-mono text-zinc-700 mt-1">00:0{i+1}:4{i}</div>
                      </div>
                      <p className="text-sm font-medium text-zinc-300 leading-relaxed">{text}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {activeContent === 'MOM' && (
              <div className="animate-in fade-in duration-500 grid grid-cols-1 md:grid-cols-2 gap-4">
                 {meeting.mom.split('\n').map((point, i) => {
                   const isDecision = point.includes('Decision');
                   const isAction = point.includes('Action');
                   return (
                    <div key={i} className={`p-5 rounded-2xl border transition-all hover:bg-zinc-800/50 
                      ${isDecision ? 'bg-indigo-900/10 border-indigo-800/50' : isAction ? 'bg-emerald-900/10 border-emerald-800/50' : 'bg-zinc-800/30 border-zinc-800'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full
                          ${isDecision ? 'bg-zinc-900 text-indigo-400 border border-indigo-900' : isAction ? 'bg-zinc-900 text-emerald-400 border border-emerald-900' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}>
                          {isDecision ? 'DECISION' : isAction ? 'ACTION' : 'INFO'}
                        </span>
                        <span className="font-mono text-[9px] text-zinc-700">#NODE_{i+102}</span>
                      </div>
                      <p className="text-sm font-bold text-zinc-200 leading-tight">{point.replace('• ', '')}</p>
                    </div>
                   );
                 })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Multimedia & Extracted Output (Right Bento) */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        
        {/* Media Player Node */}
        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
          <div className="aspect-video relative group cursor-pointer bg-zinc-950">
            <img 
              src={meeting.videoUrl} 
              alt="Thumbnail" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-800 group-hover:scale-110 transition-all">
                 <svg className="w-5 h-5 text-zinc-100 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </div>
            </div>
            <div className="absolute top-4 left-4">
               <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900/80 backdrop-blur rounded-lg border border-zinc-800">
                 <div className="w-1 h-1 rounded-full bg-red-500"></div>
                 <span className="text-[9px] font-black text-zinc-200 uppercase tracking-widest">SOURCE_STREAM</span>
               </div>
            </div>
          </div>
          <div className="p-5 flex items-center justify-between border-t border-zinc-800 bg-zinc-900/30">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Quality</span>
              <span className="text-[10px] font-mono font-bold text-zinc-400">Adaptive_HD</span>
            </div>
            <button className="text-[9px] font-black text-indigo-400 uppercase tracking-widest hover:underline px-3 py-1 bg-zinc-800 rounded-lg border border-zinc-700">Export</button>
          </div>
        </div>

        {/* Intelligence Tasks List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold tracking-tight text-zinc-100">Intelligence Feed</h2>
            </div>
            <span className="text-[10px] font-black text-zinc-600 uppercase">SYNCHRONIZED</span>
          </div>

          <div className="space-y-4">
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
  );
};

export default MeetingView;
