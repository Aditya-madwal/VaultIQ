'use client'
import React, { useState } from 'react';
import KanbanView from '../../components/KanbanView';
import { Task } from '../../types';

export default function KanbanPage() {

  const handleUpdateStatus = (id: string, status: Task['status']) => {
    // This function will need to be updated to call an API to update status in the future
    console.log('Updating task status', id, status);
  };

  return (
    <KanbanView 
      onUpdateStatus={handleUpdateStatus} 
    />
  );
}
