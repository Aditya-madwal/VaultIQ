import { Meeting, Task } from "./types";

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: "1",
    title: "Q4 Planning Session",
    date: "2024-01-15T10:00:00Z",
    duration: 45,
    participants: ["John Doe", "Jane Smith", "Bob Johnson"],
    summary: "Discussed Q4 goals and resource allocation",
    actionItems: ["Finalize budget by Friday", "Schedule follow-up meeting"],
  },
  {
    id: "2",
    title: "Product Review",
    date: "2024-01-14T14:30:00Z",
    duration: 60,
    participants: ["Jane Smith", "Alice Brown"],
    summary: "Reviewed new product features and user feedback",
    actionItems: ["Update roadmap", "Prepare demo for stakeholders"],
  },
];

export const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Finalize Q4 Budget",
    description: "Review and approve budget allocations",
    status: "pending",
    dueDate: "2024-01-20",
    assignedTo: "John Doe",
    meetingId: "1",
  },
  {
    id: "2",
    title: "Update Product Roadmap",
    description: "Incorporate feedback from product review",
    status: "in-progress",
    dueDate: "2024-01-18",
    assignedTo: "Jane Smith",
    meetingId: "2",
  },
  {
    id: "3",
    title: "Schedule Follow-up Meeting",
    description: "Coordinate with team for Q4 planning follow-up",
    status: "pending",
    dueDate: "2024-01-17",
    assignedTo: "Bob Johnson",
    meetingId: "1",
  },
];
