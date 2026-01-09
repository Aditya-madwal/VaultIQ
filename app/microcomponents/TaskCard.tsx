import React from 'react';
import { Task } from '../types';
import StatusBadge from './StatusBadge';
import { ChevronRight } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  showMoveAction?: boolean;
  onMove?: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, showMoveAction, onMove }) => {
  return (
    <div className="group relative p-4 bg-zinc-950/40 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex flex-col gap-2">
      {/* Header: Title + Badges + Chevron */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <h4 className="text-sm font-bold text-zinc-200 truncate group-hover:text-white transition-colors">
            {task.title}
          </h4>
          <StatusBadge label={task.priority} type="priority" variant={task.priority} />
          {/* Optional: Add status badge if desired to mimic the second badge in the image
          <span className="text-[10px] text-zinc-500 font-medium px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-800">
             {task.status}
          </span>
          */}
        </div>

        <button 
            onClick={(e) => {
                if (showMoveAction && onMove) {
                    e.stopPropagation();
                    onMove(task.id);
                }
            }}
            className={`text-zinc-600 hover:text-white transition-colors p-1 rounded-lg hover:bg-zinc-800 ${showMoveAction ? 'cursor-pointer' : 'cursor-default'}`}
        >
            <ChevronRight size={16} strokeWidth={2.5} />
        </button>
      </div>
      
      {/* Content: Description */}
      <p className="text-[11px] text-zinc-500 line-clamp-2 font-medium leading-relaxed mb-1">
        {task.description}
      </p>

      {/* Footer: Tags (Mimicking elements from the layout) */}
      <div className="flex items-center justify-between pt-2">
         <div className="flex flex-wrap gap-1.5">
            {task.tags.map((tag, i) => (
                <span key={i} className="text-[9px] font-bold text-zinc-600 px-2 py-0.5 bg-zinc-900 rounded-full border border-zinc-800">
                    #{tag}
                </span>
            ))}
        </div>
      </div>
      <span className="font-mono text-[10px] text-indigo-400 font-bold tracking-widest uppercase bg-indigo-900/20 px-2 py-0.5 rounded border border-indigo-800/30">
        Source Meeting: <br />
        {typeof task.sourceMeeting === 'string' ? task.sourceMeeting : task.sourceMeeting?.title || 'Unknown'}
      </span>
    </div>
  );
};

export default TaskCard;
