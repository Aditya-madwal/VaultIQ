
import { Meeting, Employee, Task } from './types';

export const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Alex Rivera', role: 'Product Manager', avatar: 'https://picsum.photos/seed/alex/100', speakingTime: 35, decisions: 12, tasksCompleted: 85, attendance: 98 },
  { id: '2', name: 'Sarah Chen', role: 'UX Designer', avatar: 'https://picsum.photos/seed/sarah/100', speakingTime: 20, decisions: 5, tasksCompleted: 92, attendance: 95 },
  { id: '3', name: 'Jordan Smyth', role: 'Tech Lead', avatar: 'https://picsum.photos/seed/jordan/100', speakingTime: 25, decisions: 18, tasksCompleted: 78, attendance: 90 },
  { id: '4', name: 'Mia Wong', role: 'Frontend Engineer', avatar: 'https://picsum.photos/seed/mia/100', speakingTime: 10, decisions: 2, tasksCompleted: 95, attendance: 100 },
];

export const MOCK_TASKS: Task[] = [
  { id: 't1', title: 'Update onboarding documentation', status: 'new', owner: 'Alex Rivera', createdBy: 'Jordan Smyth', category: 'Operations', dueDate: '2024-05-20', meetingId: 'm1', priority: 'high' },
  { id: 't2', title: 'Finalize mobile wireframes', status: 'in-progress', owner: 'Sarah Chen', createdBy: 'Alex Rivera', category: 'Design', dueDate: '2024-05-18', meetingId: 'm1', priority: 'medium' },
  { id: 't3', title: 'Review API authentication flow', status: 'pending', owner: 'Jordan Smyth', createdBy: 'Mia Wong', category: 'Backend', dueDate: '2024-05-22', meetingId: 'm1', priority: 'high' },
  { id: 't4', title: 'Setup CI/CD for staging', status: 'completed', owner: 'Mia Wong', createdBy: 'Jordan Smyth', category: 'DevOps', dueDate: '2024-05-15', meetingId: 'm2', priority: 'medium' },
];

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: 'm1',
    title: 'Product Roadmap Q3 Sync',
    date: '2024-05-15',
    duration: '45m',
    participants: ['Alex Rivera', 'Sarah Chen', 'Jordan Smyth'],
    status: 'analyzing',
    summary: [
      'Reviewed Q2 deliverables and adjusted the timeline for Q3 based on feedback.',
      'Approved the new dashboard widgets proposal with a focus on real-time data.',
      'Decided to postpone the legacy migration until after the mobile launch.'
    ],
    tasks: MOCK_TASKS.filter(t => t.meetingId === 'm1'),
    transcript: [
      { speaker: 'Alex Rivera', timestamp: '00:12', text: 'Welcome everyone to the Q3 sync. We have a lot to cover today regarding the roadmap.' },
      { speaker: 'Sarah Chen', timestamp: '01:05', text: 'I have the designs ready for the analytics module. I think they meet the new spec.', highlight: 'decision' },
      { speaker: 'Jordan Smyth', timestamp: '02:30', text: 'Can we integrate with the new auth service by then? It might be a blocker.', highlight: 'question' },
      { speaker: 'Alex Rivera', timestamp: '05:45', text: 'Yes, Jordan. Sarah, please share the Figma links after this meeting.', highlight: 'task' },
    ]
  },
  {
    id: 'm2',
    title: 'Daily Standup - Engineering',
    date: '2024-05-14',
    duration: '15m',
    participants: ['Jordan Smyth', 'Mia Wong'],
    status: 'processed',
    summary: ['Reviewed blockers for the release.', 'Mia completed the PR review for the landing page.'],
    tasks: MOCK_TASKS.filter(t => t.meetingId === 'm2'),
    transcript: []
  }
];
