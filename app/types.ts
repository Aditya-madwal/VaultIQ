export enum View {
  HOME = "home",
  MEETINGS = "meetings",
  TASKS = "tasks",
  INSIGHTS = "insights",
  MEMBERS = "members",
  KNOWLEDGE = "knowledge",
  CALENDAR = "calendar",
  SETTINGS = "settings",
  MEETING_DETAIL = "meeting-detail",
}

export interface Task {
  id: string;
  title: string;
  status: "new" | "in-progress" | "pending" | "completed";
  owner: string; // Assigned to
  createdBy: string;
  category: string;
  dueDate: string;
  meetingId: string;
  priority: "low" | "medium" | "high";
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: string;
  participants: string[];
  summary: string[];
  tasks: Task[];
  transcript: TranscriptLine[];
  status: "processed" | "analyzing" | "transcribing";
}

export interface TranscriptLine {
  speaker: string;
  timestamp: string;
  text: string;
  highlight?: "task" | "decision" | "question";
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  speakingTime: number; // percentage
  decisions: number;
  tasksCompleted: number;
  attendance: number; // percentage
}
