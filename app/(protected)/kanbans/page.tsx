'use client'
import React, { useState } from 'react';
import KanbanView from '../../components/KanbanView';
import { INITIAL_TASKS } from '../../constants';
import { Task } from '../../types';

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const handleUpdateStatus = (id: string, status: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  };

  return (
    <KanbanView 
      tasks={tasks} 
      onUpdateStatus={handleUpdateStatus} 
    />
  );
}
