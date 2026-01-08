
export type Priority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Backlog' | 'In Progress' | 'Review' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  tags: string[];
  sourceMeeting: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  summary: string;
  transcript: string;
  mom: string;
  videoUrl?: string;
  tags: string[];
  category: string;
  participants: string[];
  tasks: any[]; // specific Task[] type causes circular dep if not careful, but Task is in same file so Task[] is fine
  status: 'Scheduled' | 'Completed' | 'Cancelled'; // Inferring status types
}

export type AppTab = 'Meetings' | 'Tasks';
