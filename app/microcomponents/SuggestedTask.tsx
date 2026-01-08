
import React from 'react';
import { Priority } from '../types';

interface SuggestedTaskProps {
  title: string;
  description: string;
  priority: Priority;
  tags: string[];
  onAdd: () => void;
}

const SuggestedTask: React.FC<SuggestedTaskProps> = ({ title, description, priority, tags, onAdd }) => {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 group transition-colors hover:bg-zinc-800/80">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-1.5">
          {tags.map(tag => (
            <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-900/50">
              {tag}
            </span>
          ))}
        </div>
        <div className={`w-1.5 h-1.5 rounded-full ${priority === 'High' ? 'bg-red-400' : 'bg-orange-400'}`}></div>
      </div>
      <h4 className="font-extrabold text-base text-zinc-100 leading-tight mb-2 group-hover:text-indigo-400 transition-colors">
        {title}
      </h4>
      <p className="text-[11px] font-medium text-zinc-500 leading-relaxed mb-6 line-clamp-2 italic">
        "{description}"
      </p>
      <button 
        onClick={onAdd}
        className="w-full py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] text-white hover:bg-zinc-100 hover:text-zinc-900 hover:border-black transition-all active:scale-95"
      >
        Map to Kanban
      </button>
    </div>
  );
};

export default SuggestedTask;
