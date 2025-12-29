import React from "react";
import { Task } from "../../types";
import { Calendar } from "lucide-react";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="group flex flex-col p-3 rounded-xl border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-700 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h5 className="text-sm font-medium text-zinc-100 leading-snug line-clamp-2">
          {task.title}
        </h5>
        
        {/* Priority Indicator */}
        <div className={`shrink-0 w-2 h-2 mt-1.5 rounded-full ${
            task.priority === 'high' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 
            task.priority === 'medium' ? 'bg-amber-500' : 'bg-zinc-600'
        }`} />
      </div>

      {/* Footer Info */}
      <div className="mt-auto flex items-center justify-between pt-3 border-t border-zinc-800/50">
        
        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
          <Calendar className="w-3.5 h-3.5" />
          <span>{task.dueDate}</span>
        </div>

        {/* Owner */}
        <div className="flex items-center gap-1.5">
           <div className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-medium text-zinc-300">
              {task.owner.charAt(0)}
           </div>
           <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors truncate max-w-[80px]">
             {task.owner}
           </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
