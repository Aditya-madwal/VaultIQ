
import React from 'react';
import { Task } from '../types';
import { MoreVertical, Plus, Calendar } from 'lucide-react';

interface TasksViewProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const TasksView: React.FC<TasksViewProps> = ({ tasks, setTasks }) => {
  const columns = [
    { id: 'new', label: 'Todo queue', color: 'bg-zinc-600' },
    { id: 'in-progress', label: 'In development', color: 'bg-indigo-500' },
    { id: 'pending', label: 'Review required', color: 'bg-zinc-400' },
    { id: 'completed', label: 'Delivered', color: 'bg-emerald-500' }
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-md border border-white/5 shadow-sm">Kanban Board</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest">Real-time sync</span>
          </div>
        </div>
        <button className="bg-white text-black px-5 py-2 rounded-md text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-zinc-200 transition-all shadow-xl">
          <Plus size={14} /> Create task
        </button>
      </div>

      <div className="flex gap-6 flex-1 overflow-x-auto pb-6">
        {columns.map((col) => (
          <div key={col.id} className="flex-1 min-w-[320px] flex flex-col space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${col.color}`}></div>
                <h3 className="font-bold text-zinc-400 uppercase tracking-widest text-[10px]">{col.label}</h3>
                <span className="text-[10px] text-zinc-600 font-bold px-2 py-0.5 rounded-full bg-white/5">
                  {tasks.filter(t => t.status === col.id).length}
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-4 bg-white/[0.01] p-3 rounded-md border border-dashed border-white/5 overflow-y-auto scrollbar-hide">
              {tasks.filter(t => t.status === col.id).map((task) => (
                <div key={task.id} className="glass-card p-5 rounded-md border border-white/5 hover:border-indigo-500/50 transition-all cursor-grab active:cursor-grabbing group relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-tighter ${
                        task.priority === 'high' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 
                        task.priority === 'medium' ? 'bg-zinc-800 text-zinc-400 border-white/5' : 
                        'bg-transparent text-zinc-500 border-white/5'
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-[9px] font-bold text-zinc-500 px-2 py-0.5 bg-white/5 border border-white/5 rounded-md italic">
                        #{task.category}
                      </span>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 hover:text-white">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  
                  <h4 className="font-bold text-zinc-100 text-[13px] mb-5 leading-relaxed group-hover:text-white transition-colors">{task.title}</h4>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">
                      <Calendar size={12} /> {task.dueDate}
                    </div>
                    <div className="flex items-center -space-x-1.5">
                      <div className="relative group/avatar" title={`By ${task.createdBy}`}>
                        <img src={`https://picsum.photos/seed/${task.createdBy}/50`} className="w-6 h-6 rounded-md border border-black grayscale opacity-50 group-hover/avatar:opacity-100 group-hover/avatar:grayscale-0 transition-all" />
                      </div>
                      <div className="w-3 h-[1px] bg-white/10"></div>
                      <div className="relative group/avatar" title={`To ${task.owner}`}>
                        <img src={`https://picsum.photos/seed/${task.owner}/50`} className="w-6 h-6 rounded-md border border-black shadow-lg" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full py-4 rounded-md border border-dashed border-white/10 text-zinc-600 text-[10px] font-bold uppercase tracking-widest hover:text-zinc-400 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-2">
                <Plus size={14} /> Quick add item
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksView;
