
import React from 'react';
import { Task, TaskStatus } from '../types';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  title: TaskStatus;
  accent: string;
  bg: string;
  tasks: Task[];
  onUpdateStatus: (id: string, status: TaskStatus) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ title, accent, bg, tasks, onUpdateStatus }) => {
  const statuses: TaskStatus[] = ['Backlog', 'In Progress', 'Review', 'Completed'];
  const curIdx = statuses.indexOf(title);
  const nextStatus = curIdx < statuses.length - 1 ? statuses[curIdx + 1] : null;

  return (
    <div className={`flex flex-col gap-6 p-4 rounded-3xl border border-zinc-800 h-fit ${bg} bg-zinc-900/30`}>
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className={`w-1 h-3.5 rounded-full ${accent}`}></div>
          <span className="font-black text-[10px] uppercase tracking-[0.3em] text-zinc-100">
            {title}
          </span>
        </div>
        <div className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 rounded font-mono text-[9px] font-bold text-zinc-600">
          {tasks.length.toString().padStart(2, '0')}
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            showMoveAction={!!nextStatus}
            onMove={nextStatus ? (id) => onUpdateStatus(id, nextStatus) : undefined} 
          />
        ))}

        {tasks.length === 0 && (
          <div className="h-24 border border-dashed border-zinc-800 rounded-2xl flex items-center justify-center bg-zinc-900/20">
            <span className="text-zinc-700 text-[9px] font-black uppercase tracking-[0.4em]">Empty</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
