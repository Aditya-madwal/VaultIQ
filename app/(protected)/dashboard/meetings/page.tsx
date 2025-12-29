"use client";

import React, { useState } from "react";
import { Meeting } from "../../../types";
import MeetingsView from "../../../views/MeetingsView";
import { MOCK_MEETINGS } from "../../../constants";
import { useRouter } from "next/navigation";

export default function MeetingsPage() {
  const router = useRouter();
  const [meetings] = useState<Meeting[]>(MOCK_MEETINGS);

  const navigateToMeeting = (id: string) => {
    router.push(`/dashboard/meetings/${id}`);
  };

  return (
    <MeetingsView
      meetings={meetings}
      onNavigateToMeeting={navigateToMeeting}
    />
  );
}

