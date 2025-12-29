import React from "react";
import { Task } from "../../types";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="p-4 rounded-md border border-white/5 bg-white/[0.02] hover:border-white/20 transition-all group">
      <div className="flex justify-between items-start mb-3">
        <span
          className={`text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-widest ${
            task.priority === "high"
              ? "bg-white text-black border-white"
              : "bg-zinc-800 text-zinc-400 border-white/5"
          }`}>
          {task.priority}
        </span>
        <span className="text-[9px] font-bold text-zinc-500 uppercase">
          #{task.category}
        </span>
      </div>
      <h5 className="text-[13px] font-bold text-zinc-200 mb-4 leading-snug group-hover:text-white transition-colors">
        {task.title}
      </h5>
      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex items-center gap-2">
          <img
            src={`https://picsum.photos/seed/${task.owner}/50`}
            className="w-6 h-6 rounded-md border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity"
            alt=""
          />
          <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-tighter">
            {task.owner}
          </span>
        </div>
        <span className="text-[10px] text-zinc-600 font-bold">
          {task.dueDate}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
