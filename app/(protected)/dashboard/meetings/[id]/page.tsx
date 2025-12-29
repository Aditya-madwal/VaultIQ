"use client";

import React, { useMemo } from "react";
import { Meeting } from "../../../../types";
import MeetingDetailView from "../../../../views/MeetingDetailView";
import { MOCK_MEETINGS } from "../../../../constants";
import { useRouter, useParams } from "next/navigation";

export default function MeetingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const meetingId = params?.id as string;

  const meeting = useMemo(
    () => MOCK_MEETINGS.find((m) => m.id === meetingId) || null,
    [meetingId]
  );

  if (!meeting) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">Meeting not found</h2>
          <button
            onClick={() => router.push("/dashboard/meetings")}
            className="px-4 py-2 bg-white text-black rounded-md text-sm font-bold hover:bg-zinc-200 transition-all"
          >
            Back to Meetings
          </button>
        </div>
      </div>
    );
  }

  return (
    <MeetingDetailView
      meeting={meeting}
      onBack={() => router.push("/dashboard/meetings")}
    />
  );
}

