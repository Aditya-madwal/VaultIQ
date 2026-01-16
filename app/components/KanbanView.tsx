

import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Task, TaskStatus } from '../types';
import KanbanColumn from '../microcomponents/KanbanColumn';
import TaskModal from '../microcomponents/TaskModal';
import { Search, Filter, Loader, Plus } from 'lucide-react';
import { getAllTasks, createTask, updateTask, deleteTask } from '../services/api/tasks';

interface KanbanViewProps {
  onUpdateStatus: (id: string, status: TaskStatus) => void;
}

const KanbanView: React.FC<KanbanViewProps> = ({ onUpdateStatus }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const data = await getAllTasks();
      const activeTasks = data.filter((t: any) => t.suggested === false);
      setTasks(activeTasks);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handlers
  const handleCreateTask = async (taskData: Partial<Task>) => {
    try {
      setIsSubmitting(true);
      const newTask = await createTask(taskData as any);
      setTasks(prev => [newTask, ...prev]);
      setIsModalOpen(false);
      toast.success('Task created successfully');
    } catch (err) {
      console.error('Failed to create task:', err);
      toast.error('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTask = async (taskData: Partial<Task>) => {
    if (!currentTask) return;
    try {
      setIsSubmitting(true);
      const updatedTask = await updateTask(currentTask.id, taskData);
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
      setIsModalOpen(false);
      setCurrentTask(null);
      setIsEditing(false);
      toast.success('Task updated successfully');
    } catch (err) {
      console.error('Failed to update task:', err);
      toast.error('Failed to update task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      toast.success('Task deleted successfully');
    } catch (err) {
      console.error('Failed to delete task:', err);
      toast.error('Failed to delete task');
    }
  };

  // Move Status Handler (Internal + Prop)
  const handleMoveStatus = async (id: string, status: TaskStatus) => {
      try {
          // Optimistic update locally
          setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
          await updateTask(id, { status });
          
          // Optionally call parent handler if needed, though we handled it here 
          // onUpdateStatus(id, status); 
      } catch (err) {
          console.error("Failed to update status", err);
          fetchTasks(); // Revert on failure
      }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const columns: { title: TaskStatus; accent: string; bg: string }[] = [
    { title: 'Backlog', accent: 'bg-gray-300', bg: 'bg-brand-surface' },
    { title: 'In Progress', accent: 'bg-indigo-500', bg: 'bg-brand-lavender/50' },
    { title: 'Review', accent: 'bg-orange-500', bg: 'bg-brand-sky/50' },
    { title: 'Completed', accent: 'bg-emerald-500', bg: 'bg-brand-mint/50' }
  ];

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader className="animate-spin text-zinc-500" size={24} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center text-red-500 text-sm font-bold">
        {error}
      </div>
    );
  }

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  return (
    <>
      <div className="space-y-10 pt-4 h-full px-8">
        {/* 1. Protocol Metadata Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between px-2 gap-6 pb-4 mb-2 md:pb-8 md:mb-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-gray-100 tracking-tighter leading-none">Stuff ToDo</h1>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
             <div className="relative group w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" size={14} />
                <input 
                  type="text" 
                  placeholder="SEARCH TASKS" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-bold text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all uppercase tracking-widest"
                />
             </div>

             <div className="relative w-full sm:w-auto">
               <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Filter size={12} className="text-gray-500" />
               </div>
               <select 
                 value={priorityFilter}
                 onChange={(e) => setPriorityFilter(e.target.value)}
                 className="w-full sm:w-auto pl-9 pr-8 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black text-gray-300 uppercase tracking-widest focus:outline-none focus:border-indigo-500 hover:bg-zinc-800 transition-all appearance-none cursor-pointer"
               >
                 <option value="All">All Priorities</option>
                 <option value="High">High Priority</option>
                 <option value="Medium">Medium Priority</option>
                 <option value="Low">Low Priority</option>
               </select>
             </div>

             <button 
              onClick={openCreateModal}
              className="w-full sm:w-auto justify-center px-5 py-2.5 bg-blue-900/30 text-blue-500 rounded-xl text-[12px] font-black uppercase tracking-wider hover:bg-blue-800 hover:text-white transition-all active:scale-95 flex items-center gap-2"
            >
              <Plus size={16} strokeWidth={2.5} />New Task
            </button>
          </div>
        </div>

        {/* 2. Horizontal Scrollable Layout */}
        <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory">
          {columns.map(col => (
            <div key={col.title} className="shrink-0 grow snap-center first:pl-2 last:pr-2">
              <KanbanColumn 
                title={col.title}
                accent={col.accent}
                bg={col.bg}
                tasks={filteredTasks.filter(t => t.status === col.title)}
                onUpdateStatus={handleMoveStatus}
                onEdit={openEditModal}
                onDelete={handleDeleteTask}
              />
            </div>
          ))}
        </div>
      </div>
      
      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={isEditing ? handleUpdateTask : handleCreateTask}
        task={currentTask}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default KanbanView;
