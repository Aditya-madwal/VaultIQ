"use client";

import React, { useState } from "react";
import { Meeting, Task } from "../../types";
import HomeView from "../../views/HomeView";
import CreateMeetingModal from "../../components/CreateMeetingModal";
import { MOCK_MEETINGS, MOCK_TASKS } from "../../constants";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [meetings] = useState<Meeting[]>(MOCK_MEETINGS);
  const [tasks] = useState<Task[]>(MOCK_TASKS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const navigateToMeeting = (id: string) => {
    router.push(`/dashboard/meetings/${id}`);
  };

  return (
    <>
      <HomeView
        meetings={meetings}
        tasks={tasks}
        onNavigateToMeeting={navigateToMeeting}
        onOpenUpload={() => setIsCreateModalOpen(true)}
      />
      {isCreateModalOpen && (
        <CreateMeetingModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </>
  );
}
