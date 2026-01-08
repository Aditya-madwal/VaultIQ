
import { Meeting, Task } from './types';

export const INITIAL_MEETING: Meeting = {
  id: 'm1',
  title: 'Project Phoenix: Q2 Product Roadmap & Strategy Sync',
  date: 'Oct 24, 2024',
  duration: '42:15',
  summary: `The meeting focused on the final alignment for Project Phoenix's Q2 release. Key milestones were discussed, including the transition to a serverless architecture and the implementation of the new AI-driven analytics dashboard. Stakeholders expressed concern over the current timeline for the mobile app redesign, leading to a decision to prioritize the core web features first.`,
  transcript: `Sarah: Alright everyone, let's dive into the Q2 roadmap. We've got a lot on our plate.
James: I think we need to look at the backend first. The current database structure won't handle the expected load.
Emily: Agree with James. We should also consider moving to serverless. It'll save costs in the long run.
Sarah: Good point. What about the frontend? The analytics dashboard?
Marcus: I've got a prototype ready. The AI component is still a bit jittery but the visualization layer is solid.
James: Let's stick to simple visualizations for now. We don't want to overwhelm users...`,
  mom: `• Decision: Database migration to PostgreSQL confirmed for Q2.
• Decision: Prioritize web dashboard over mobile app redesign to ensure Q2 launch.
• Action: James to provide technical specs for serverless transition by Friday.
• Action: Emily to coordinate with Design on the dashboard UX refinement.
• Discussion: Investigated AI component jitter; Marcus to research more stable alternatives.`,
  videoUrl: 'https://picsum.photos/seed/meeting/800/450',
  tags: ['Product', 'Review', 'Q2_Roadmap'],
  category: 'Strategy'
};

export const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Serverless Transition Specs',
    description: 'Document technical requirements for the transition to AWS Lambda.',
    priority: 'High',
    status: 'In Progress',
    tags: ['Backend', 'AWS'],
    sourceMeeting: 'Project Phoenix Q2 Sync'
  },
  {
    id: 't2',
    title: 'Dashboard UX Refinement',
    description: 'Coordinate with Design to finalize the analytics dashboard layout.',
    priority: 'Medium',
    status: 'Backlog',
    tags: ['Design', 'UX'],
    sourceMeeting: 'Project Phoenix Q2 Sync'
  },
  {
    id: 't3',
    title: 'AI Component Research',
    description: 'Explore more stable alternatives for the real-time jitter in AI results.',
    priority: 'High',
    status: 'Backlog',
    tags: ['AI', 'Research'],
    sourceMeeting: 'Project Phoenix Q2 Sync'
  },
  {
    id: 't4',
    title: 'Database Migration Prep',
    description: 'Initial schema design for the new PostgreSQL instance.',
    priority: 'Low',
    status: 'Completed',
    tags: ['Backend', 'Database'],
    sourceMeeting: 'Project Phoenix Q2 Sync'
  }
];

export const ALL_MEETINGS: Meeting[] = [
  INITIAL_MEETING,
  {
    id: 'm2',
    title: 'Design System Handoff',
    date: 'Oct 25, 2024',
    duration: '35:00',
    summary: 'Design team presented the final components for the new dark mode system. Engineering confirmed the feasibility of the token variable approach.',
    transcript: 'Alex: Here are the new tokens. We are using semantic naming... \nDev: Looks good. We can map these directly in Tailwind.',
    mom: '• Decision: Adopt semantic naming for color tokens.\n• Action: Dev team to update tailwind.config.ts by Monday.',
    videoUrl: 'https://picsum.photos/seed/meeting2/800/450',
    tags: ['Design', 'System', 'UI/UX'],
    category: 'Engineering'
  },
  {
    id: 'm3',
    title: 'Weekly Team Sync',
    date: 'Oct 26, 2024',
    duration: '15:30',
    summary: 'Quick sync to discuss blocking issues for the sprint. No major blockers identified.',
    transcript: 'Manager: Any blockers? \nTeam: None.',
    mom: '• Info: Sprint is on track.',
    videoUrl: 'https://picsum.photos/seed/meeting3/800/450',
    tags: ['Sync', 'Weekly', 'Agile'],
    category: 'Management'
  }
];
