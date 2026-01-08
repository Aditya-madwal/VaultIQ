
import React, { useState } from 'react';
import { Task, TaskStatus } from '../types';
import KanbanColumn from '../microcomponents/KanbanColumn';
import { Search, Filter } from 'lucide-react';
import { Plus } from 'lucide-react';
import StatusBadge from '../microcomponents/StatusBadge';

interface KanbanViewProps {
  tasks: Task[];
  onUpdateStatus: (id: string, status: TaskStatus) => void;
}

const KanbanView: React.FC<KanbanViewProps> = ({ tasks, onUpdateStatus }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');

  const columns: { title: TaskStatus; accent: string; bg: string }[] = [
    { title: 'Backlog', accent: 'bg-gray-300', bg: 'bg-brand-surface' },
    { title: 'In Progress', accent: 'bg-indigo-500', bg: 'bg-brand-lavender/50' },
    { title: 'Review', accent: 'bg-orange-500', bg: 'bg-brand-sky/50' },
    { title: 'Completed', accent: 'bg-emerald-500', bg: 'bg-brand-mint/50' }
  ];

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="space-y-10 pt-4">
      {/* 1. Protocol Metadata Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between px-2 gap-6 pb-8 mb-4">
        <div className="space-y-2">
          {/* <div className="flex items-center gap-3">
             <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">PIPELINE_ORBIT</span>
             <div className="h-3 w-px bg-brand-border"></div>
             <span className="text-[10px] font-black text-indigo-600 uppercase">ACTIVE_NODES</span>
          </div> */}
          <h1 className="text-4xl font-extrabold text-gray-100 tracking-tighter leading-none">Stuff ToDo</h1>
        </div>
        <div className="flex items-center gap-3">
           <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" size={14} />
              <input 
                type="text" 
                placeholder="SEARCH_PROTOCOL..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-bold text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all w-48 uppercase tracking-widest"
              />
           </div>

           <div className="relative">
             <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Filter size={12} className="text-gray-500" />
             </div>
             <select 
               value={priorityFilter}
               onChange={(e) => setPriorityFilter(e.target.value)}
               className="pl-9 pr-8 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black text-gray-300 uppercase tracking-widest focus:outline-none focus:border-indigo-500 hover:bg-zinc-800 transition-all appearance-none cursor-pointer"
             >
               <option value="All">All Priorities</option>
               <option value="High">High Priority</option>
               <option value="Medium">Medium Priority</option>
               <option value="Low">Low Priority</option>
             </select>
           </div>

           <button 
            className="px-5 py-2.5 bg-blue-900/30 text-blue-500 rounded-xl text-[12px] font-black uppercase tracking-wider hover:bg-blue-800 hover:text-white transition-all active:scale-95 flex items-center gap-2"
          >
            <Plus size={16} strokeWidth={2.5} />New Task
          </button>
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
            tasks={filteredTasks.filter(t => t.status === col.title)}
            onUpdateStatus={onUpdateStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanView;
