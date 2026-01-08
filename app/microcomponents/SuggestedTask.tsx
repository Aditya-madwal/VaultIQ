
import React from 'react';
import { Priority } from '../types';
import StatusBadge from './StatusBadge';
import { Plus } from 'lucide-react';

interface SuggestedTaskProps {
  title: string;
  description: string;
  priority: Priority;
  tags: string[];
  onAdd: () => void;
}

const SuggestedTask: React.FC<SuggestedTaskProps> = ({ title, description, priority, tags, onAdd }) => {
  return (
    <div className="group relative p-4 bg-zinc-950/40 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex flex-col gap-2">
      {/* Header: Title + Badges + Add Button */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <h4 className="text-sm font-bold text-zinc-200 truncate group-hover:text-white transition-colors">
            {title}
          </h4>
          <StatusBadge label={priority} type="priority" variant={priority} />
        </div>

        <button 
            onClick={(e) => {
                e.stopPropagation();
                onAdd();
            }}
            className="text-zinc-600 hover:text-white transition-colors p-1 rounded-lg hover:bg-zinc-800 cursor-pointer"
        >
            <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>
      
      {/* Content: Description */}
      <p className="text-[11px] text-zinc-500 line-clamp-2 font-medium leading-relaxed mb-1">
        {description}
      </p>

      {/* Footer: Tags */}
      <div className="flex items-center justify-between pt-2">
         <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, i) => (
                <span key={i} className="text-[9px] font-bold text-zinc-600 px-2 py-0.5 bg-zinc-900 rounded-full border border-zinc-800">
                    #{tag}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestedTask;
