import React from 'react';
import { Task } from '../types';
import StatusBadge from './StatusBadge';
import { ChevronRight, Pencil, Trash2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  showMoveAction?: boolean;
  onMove?: (id: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, showMoveAction, onMove, onEdit, onDelete }) => {
  return (
    <div className="group relative p-4 bg-zinc-950/40 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex flex-col gap-2">
      {/* Header: Title + Badges + Actions */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <h4 className="text-sm font-bold text-zinc-200 truncate group-hover:text-white transition-colors">
            {task.title}
          </h4>
          <StatusBadge label={task.priority} type="priority" variant={task.priority} />
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(task);
                    }}
                    className="p-1 text-zinc-600 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                    title="Edit Task"
                >
                    <Pencil size={14} />
                </button>
            )}
             {onDelete && (
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(task.id);
                    }}
                    className="p-1 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                    title="Delete Task"
                >
                    <Trash2 size={14} />
                </button>
            )}
            {showMoveAction && onMove && (
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onMove(task.id);
                    }}
                    className="p-1 text-zinc-600 hover:text-white hover:bg-zinc-800 rounded transition-colors"
                    title="Move to next status"
                >
                    <ChevronRight size={16} strokeWidth={2.5} />
                </button>
            )}
        </div>
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
