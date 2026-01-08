import React from 'react';
import { Task } from '../types';
import StatusBadge from './StatusBadge';
import { ArrowRight, MoreHorizontal } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  showMoveAction?: boolean;
  onMove?: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, showMoveAction, onMove }) => {
  return (
    <div className="group relative p-5 bg-zinc-950/40 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <StatusBadge label={task.priority} type="priority" variant={task.priority} />
        <button className="text-zinc-600 hover:text-white transition-colors">
            <MoreHorizontal size={14} />
        </button>
      </div>

      <h4 className="text-sm font-bold text-zinc-200 mb-2 leading-snug group-hover:text-white transition-colors">
        {task.title}
      </h4>
      
      <p className="text-[10px] text-zinc-500 line-clamp-2 mb-4 font-medium leading-relaxed">
        {task.description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-zinc-900/50">
         <div className="flex flex-wrap gap-1.5">
            {task.tags.map((tag, i) => (
                <span key={i} className="text-[9px] font-bold text-zinc-600 px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-800">
                    #{tag}
                </span>
            ))}
         </div>

         {showMoveAction && onMove && (
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onMove(task.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 bg-white text-black rounded-lg hover:bg-zinc-200 transition-all transform translate-x-2 group-hover:translate-x-0 shadow-lg"
                title="Move to next stage"
            >
                <ArrowRight size={12} strokeWidth={3} />
            </button>
         )}
      </div>
    </div>
  );
};

export default TaskCard;
