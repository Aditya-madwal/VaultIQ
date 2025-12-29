"use client";

import React, { useState } from "react";
import { Meeting } from "../../../types";
import KnowledgeBaseView from "../../../views/KnowledgeBaseView";
import { MOCK_MEETINGS } from "../../../constants";
import { useRouter } from "next/navigation";

export default function KnowledgePage() {
  const router = useRouter();
  const [meetings] = useState<Meeting[]>(MOCK_MEETINGS);

  const navigateToMeeting = (id: string) => {
    router.push(`/dashboard/meetings/${id}`);
  };

  return (
    <KnowledgeBaseView
      meetings={meetings}
      onNavigateToMeeting={navigateToMeeting}
    />
  );
}
