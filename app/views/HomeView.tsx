
import React from 'react';
import { Meeting, Task } from '../types';
import { UploadCloud, CheckCircle2, Clock, Zap, BarChart3 } from 'lucide-react';

interface HomeViewProps {
  meetings: Meeting[];
  tasks: Task[];
  onNavigateToMeeting: (id: string) => void;
  onOpenUpload: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ meetings, tasks, onNavigateToMeeting, onOpenUpload }) => {
  const stats = [
    { label: 'Analysed', value: meetings.length, icon: Clock },
    { label: 'Tasks', value: tasks.length, icon: CheckCircle2 },
    { label: 'Pending', value: tasks.filter(t => t.status !== 'completed').length, icon: Zap },
    { label: 'Resolution', value: '84%', icon: BarChart3 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-5 rounded-md group hover:border-white/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-md bg-white/5 border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                <stat.icon size={16} />
              </div>
              <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase">Metrics</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div 
          onClick={onOpenUpload}
          className="lg:col-span-2 group cursor-pointer relative overflow-hidden glass-card rounded-md p-10 flex flex-col items-center justify-center text-center space-y-4 hover:border-white/20 transition-all active:scale-[0.99]"
        >
          <div className="w-14 h-14 bg-white/5 rounded-md flex items-center justify-center text-white border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
            <UploadCloud size={24} />
          </div>
          <div className="max-w-md">
            <h3 className="text-xl font-bold text-white mb-2 leading-none tracking-tight">Intelligence capture</h3>
            <p className="text-zinc-400 text-sm leading-relaxed font-medium">
              Upload video or audio. Our AI will handle diarization, summary extraction, and task assignment instantly.
            </p>
          </div>
          <span className="px-6 py-2 bg-indigo-600 rounded-md border border-indigo-500 text-[11px] font-bold uppercase tracking-widest text-white group-hover:bg-indigo-500 transition-colors shadow-lg">Upload recording</span>
        </div>

        <div className="glass-card rounded-md p-6 flex flex-col border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">High Priority Tasks</h3>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto pr-1">
            {tasks.filter(t => t.priority === 'high').slice(0, 4).map((task) => (
              <div key={task.id} className="flex items-start gap-3 p-3 hover:bg-white/5 rounded-md transition-all group border border-transparent hover:border-white/5 bg-white/[0.01]">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-zinc-200 leading-tight group-hover:text-white transition-colors">{task.title}</p>
                  <p className="text-[10px] text-zinc-500 mt-1 uppercase font-bold tracking-widest">#{task.category} • {task.owner}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-5 px-1">
          <h2 className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.3em]">Recent Workspace Brain</h2>
          <div className="h-[1px] flex-1 bg-white/5 mx-6"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetings.slice(0, 3).map((meeting) => (
            <div key={meeting.id} className="glass-card rounded-md p-6 border border-white/5 hover:border-white/20 transition-all group active:scale-[0.98]">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-indigo-500/10 text-indigo-400 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border border-indigo-500/20">
                  {meeting.duration}
                </span>
                <span className="text-[10px] text-zinc-500 font-bold uppercase">{meeting.date}</span>
              </div>
              <h4 className="text-base font-bold text-white mb-2 group-hover:text-zinc-300 transition-colors leading-tight">{meeting.title}</h4>
              <p className="text-xs text-zinc-400 line-clamp-2 mb-6 italic leading-relaxed font-medium">
                "{meeting.summary[0]}"
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <div className="flex -space-x-1.5">
                  {meeting.participants.map((p, i) => (
                    <img key={i} src={`https://picsum.photos/seed/${p}/100`} className="w-6 h-6 rounded-md border border-black grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100" />
                  ))}
                </div>
                <button 
                  onClick={() => onNavigateToMeeting(meeting.id)}
                  className="px-4 py-1.5 bg-white text-black text-[10px] font-bold hover:bg-zinc-200 rounded-md transition-all uppercase tracking-widest"
                >
                  Analyze
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeView;
