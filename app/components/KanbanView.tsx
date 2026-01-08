
import React from 'react';
import { Task, TaskStatus } from '../types';
import KanbanColumn from '../microcomponents/KanbanColumn';

interface KanbanViewProps {
  tasks: Task[];
  onUpdateStatus: (id: string, status: TaskStatus) => void;
}

const KanbanView: React.FC<KanbanViewProps> = ({ tasks, onUpdateStatus }) => {
  const columns: { title: TaskStatus; accent: string; bg: string }[] = [
    { title: 'Backlog', accent: 'bg-gray-300', bg: 'bg-brand-surface' },
    { title: 'In Progress', accent: 'bg-indigo-500', bg: 'bg-brand-lavender/50' },
    { title: 'Review', accent: 'bg-orange-500', bg: 'bg-brand-sky/50' },
    { title: 'Completed', accent: 'bg-emerald-500', bg: 'bg-brand-mint/50' }
  ];

  return (
    <div className="space-y-10 pt-4">
      {/* 1. Protocol Metadata Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between px-2 gap-6 pb-8 mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">PIPELINE_ORBIT</span>
             <div className="h-3 w-px bg-brand-border"></div>
             <span className="text-[10px] font-black text-indigo-600 uppercase">ACTIVE_NODES</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-100 tracking-tighter leading-none">Task Protocol</h1>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-5 py-2.5 bg-white border border-brand-border rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-surface transition-all active:scale-95">Filter</button>
           <button className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all active:scale-95">New Task</button>
        </div>
      </div>

      {/* 2. Fluid Grid System */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map(col => (
          <KanbanColumn 
            key={col.title}
            title={col.title}
            accent={col.accent}
            bg={col.bg}
            tasks={tasks.filter(t => t.status === col.title)}
            onUpdateStatus={onUpdateStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanView;
