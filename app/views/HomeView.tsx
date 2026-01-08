
import React from 'react';
import { Meeting, Task } from '../types';
import { UploadCloud, CheckCircle2, Clock, Zap, BarChart3, MoreHorizontal, Video } from 'lucide-react';
import TaskCard from '../microcomponents/TaskCard';
import { MeetingStatusBadge } from '../components/Badges';

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
    { label: 'Pending', value: tasks.filter(t => t.status !== 'Completed').length, icon: Zap },
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

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div 
            onClick={onOpenUpload}
            className="group cursor-pointer relative overflow-hidden glass-card rounded-md p-10 flex flex-col items-center justify-center text-center space-y-4 hover:border-white/20 transition-all active:scale-[0.99]"
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

          <div className="bg-black rounded-xl border border-zinc-800/50 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-950/50 text-zinc-500 text-[9px] font-bold uppercase tracking-widest border-b border-zinc-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left">TITLE</th>
                    <th className="px-6 py-4 text-left">DATE</th>
                    <th className="px-6 py-4 text-left">PARTICIPANTS</th>
                    <th className="px-6 py-4 text-left">TASKS</th>
                    <th className="px-6 py-4 text-left">STATUS</th>
                    <th className="px-6 py-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/40">
                  {meetings.slice(0, 5).map((meeting) => (
                    <tr 
                      key={meeting.id} 
                      className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                      onClick={() => onNavigateToMeeting(meeting.id)}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-9 h-9 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 border border-zinc-700">
                            <Video size={18} />
                          </div>
                          <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">{meeting.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-xs text-zinc-500 font-bold uppercase tracking-tighter">{meeting.date}</span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex -space-x-1.5">
                          {meeting.participants.map((p, i) => (
                            <div key={i} className="w-6 h-6 rounded-full border border-zinc-900 bg-zinc-800 overflow-hidden" title={p}>
                              <img src={`https://picsum.photos/seed/${p}/100`} alt={p} />
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{meeting.tasks.length} ITEMS</span>
                      </td>
                      <td className="px-6 py-5">
                        <MeetingStatusBadge status={meeting.status} />
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="p-2 text-zinc-700 hover:text-zinc-300">
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="glass-card rounded-md p-6 flex flex-col border border-white/5 overflow-hidden h-full">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Recent Tasks</h3>
            </div>
            <div className="space-y-4 flex-1 overflow-y-auto pr-1">
              {tasks.slice(0, 5).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
