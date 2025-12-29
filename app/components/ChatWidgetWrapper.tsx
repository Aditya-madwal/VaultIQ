"use client";

import React from "react";
import { usePathname } from "next/navigation";
import ChatWidget from "./ChatWidget";

const ChatWidgetWrapper: React.FC = () => {
  const pathname = usePathname();

  const getContext = () => {
    if (pathname?.startsWith("/dashboard/meetings/")) {
      // For meeting detail pages, we'd need to fetch the meeting title
      // For now, just return a generic context
      return "Meeting Detail";
    }
    if (pathname === "/dashboard/meetings") return "Meetings Archive";
    if (pathname === "/dashboard/tasks") return "Action Center";
    if (pathname === "/dashboard/calendar") return "Schedule";
    if (pathname === "/dashboard/insights") return "Intelligence";
    if (pathname === "/dashboard/knowledge") return "Knowledge Base";
    if (pathname === "/dashboard/settings") return "Settings";
    return "General Workspace";
  };

  return <ChatWidget context={getContext()} />;
};

export default ChatWidgetWrapper;

