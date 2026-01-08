
import { Meeting, Task } from './types';

export const INITIAL_MEETING: Meeting = {
  id: 'm1',
  title: 'Project Phoenix: Q2 Product Roadmap & Strategy Sync',
  date: 'Oct 24, 2024',
  duration: '42:15',
  summary: `The meeting focused on the final alignment for Project Phoenix's Q2 release. Key milestones were discussed, including the transition to a serverless architecture and the implementation of the new AI-driven analytics dashboard. Stakeholders expressed concern over the current timeline for the mobile app redesign, leading to a decision to prioritize the core web features first.`,
  transcript: [
    { speakername: 'Sarah', content: "Alright everyone, let's dive into the Q2 roadmap. We've got a lot on our plate.", timestamp: '00:05' },
    { speakername: 'James', content: "I think we need to look at the backend first. The current database structure won't handle the expected load.", timestamp: '00:45' },
    { speakername: 'Emily', content: "Agree with James. We should also consider moving to serverless. It'll save costs in the long run.", timestamp: '01:20' },
    { speakername: 'Sarah', content: "Good point. What about the frontend? The analytics dashboard?", timestamp: '02:10' },
    { speakername: 'Marcus', content: "I've got a prototype ready. The AI component is still a bit jittery but the visualization layer is solid.", timestamp: '03:00' },
    { speakername: 'James', content: "Let's stick to simple visualizations for now. We don't want to overwhelm users...", timestamp: '03:45' }
  ],
  mom: [
    { type: 'decision', content: 'Database migration to PostgreSQL confirmed for Q2.' },
    { type: 'decision', content: 'Prioritize web dashboard over mobile app redesign to ensure Q2 launch.' },
    { type: 'action', content: 'James to provide technical specs for serverless transition by Friday.' },
    { type: 'action', content: 'Emily to coordinate with Design on the dashboard UX refinement.' },
    { type: 'info', content: 'Investigated AI component jitter; Marcus to research more stable alternatives.' }
  ],
  videoUrl: 'https://picsum.photos/seed/meeting/800/450',
  tags: ['Product', 'Review', 'Q2_Roadmap'],
  category: 'Strategy',

  tasks: [],

};

export const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Serverless Transition Specs',
    description: 'Document technical requirements for the transition to AWS Lambda.',
    priority: 'High',
    status: 'In Progress',
    tags: ['Backend', 'AWS'],
    sourceMeeting: 'Project Phoenix Q2 Sync',
    suggested: false
  },
  {
    id: 't2',
    title: 'Dashboard UX Refinement',
    description: 'Coordinate with Design to finalize the analytics dashboard layout.',
    priority: 'Medium',
    status: 'Backlog',
    tags: ['Design', 'UX'],
    sourceMeeting: 'Project Phoenix Q2 Sync',
    suggested: false
  },
  {
    id: 't3',
    title: 'AI Component Research',
    description: 'Explore more stable alternatives for the real-time jitter in AI results.',
    priority: 'High',
    status: 'Backlog',
    tags: ['AI', 'Research'],
    sourceMeeting: 'Project Phoenix Q2 Sync',
    suggested: false
  },
  {
    id: 't4',
    title: 'Database Migration Prep',
    description: 'Initial schema design for the new PostgreSQL instance.',
    priority: 'Low',
    status: 'Completed',
    tags: ['Backend', 'Database'],
    sourceMeeting: 'Project Phoenix Q2 Sync',
    suggested: false
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
    transcript: [
      { speakername: 'Alex', content: 'Here are the new tokens. We are using semantic naming...', timestamp: '00:10' },
      { speakername: 'Dev', content: 'Looks good. We can map these directly in Tailwind.', timestamp: '01:30' }
    ],
    mom: [
      { type: 'decision', content: 'Adopt semantic naming for color tokens.' },
      { type: 'action', content: 'Dev team to update tailwind.config.ts by Monday.' }
    ],
    videoUrl: 'https://picsum.photos/seed/meeting2/800/450',
    tags: ['Design', 'System', 'UI/UX'],
    category: 'Engineering',

    tasks: [],

  },
  {
    id: 'm3',
    title: 'Weekly Team Sync',
    date: 'Oct 26, 2024',
    duration: '15:30',
    summary: 'Quick sync to discuss blocking issues for the sprint. No major blockers identified.',
    transcript: [
      { speakername: 'Manager', content: 'Any blockers?', timestamp: '00:30' },
      { speakername: 'Team', content: 'None.', timestamp: '00:35' }
    ],
    mom: [
      { type: 'info', content: 'Sprint is on track.' }
    ],
    videoUrl: 'https://picsum.photos/seed/meeting3/800/450',
    tags: ['Sync', 'Weekly', 'Agile'],
    category: 'Management',

    tasks: [],

  }
];
