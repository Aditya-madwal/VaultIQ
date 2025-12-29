"use client";

import React, { useState, useMemo } from "react";
import { View, Meeting, Task } from "../../types";
import Sidebar from "../../components/Sidebar";
import HomeView from "../../views/HomeView";
import MeetingsView from "../../views/MeetingsView";
import TasksView from "../../views/TasksView";
import InsightsView from "../../views/InsightsView";
import KnowledgeBaseView from "../../views/KnowledgeBaseView";
import SettingsView from "../../views/SettingsView";
import CalendarView from "../../views/CalendarView";
import MeetingDetailView from "../../views/MeetingDetailView";
import ChatWidget from "../../components/ChatWidget";
import CreateMeetingModal from "../../components/CreateMeetingModal";
import { MOCK_MEETINGS, MOCK_TASKS } from "../../constants";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<View>(View.HOME);
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(
    null
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [meetings] = useState<Meeting[]>(MOCK_MEETINGS);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const navigateToMeeting = (id: string) => {
    setSelectedMeetingId(id);
    setActiveView(View.MEETING_DETAIL);
  };

  const currentMeeting = useMemo(
    () => meetings.find((m) => m.id === selectedMeetingId) || null,
    [meetings, selectedMeetingId]
  );

  const renderContent = () => {
    switch (activeView) {
      case View.HOME:
        return (
          <HomeView
            meetings={meetings}
            tasks={tasks}
            onNavigateToMeeting={navigateToMeeting}
            onOpenUpload={() => setIsCreateModalOpen(true)}
          />
        );
      case View.MEETINGS:
        return (
          <MeetingsView
            meetings={meetings}
            onNavigateToMeeting={navigateToMeeting}
          />
        );
      case View.TASKS:
        return <TasksView tasks={tasks} setTasks={setTasks} />;
      case View.INSIGHTS:
        return <InsightsView />;
      case View.KNOWLEDGE:
        return (
          <KnowledgeBaseView
            meetings={meetings}
            onNavigateToMeeting={navigateToMeeting}
          />
        );
      case View.CALENDAR:
        return <CalendarView />;
      case View.SETTINGS:
        return <SettingsView />;
      case View.MEETING_DETAIL:
        return currentMeeting ? (
          <MeetingDetailView
            meeting={currentMeeting}
            onBack={() => setActiveView(View.MEETINGS)}
          />
        ) : (
          <HomeView
            meetings={meetings}
            tasks={tasks}
            onNavigateToMeeting={navigateToMeeting}
            onOpenUpload={() => setIsCreateModalOpen(true)}
          />
        );
      default:
        return (
          <HomeView
            meetings={meetings}
            tasks={tasks}
            onNavigateToMeeting={navigateToMeeting}
            onOpenUpload={() => setIsCreateModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-black text-zinc-100 selection:bg-zinc-700 selection:text-white overflow-hidden">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        onNewMeeting={() => setIsCreateModalOpen(true)}
      />

      <main className="flex-1 overflow-y-auto relative h-screen">
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-black/40 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-white/90 capitalize tracking-tight">
              {activeView === View.MEETING_DETAIL
                ? "Deep Dive"
                : activeView.replace("-", " ")}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Jump to..."
                className="pl-8 pr-3 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] w-48 focus:w-64 transition-all outline-none text-zinc-200 placeholder-zinc-600"
              />
              <svg
                className="absolute left-2.5 top-1.5 w-3.5 h-3.5 text-zinc-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-bold border border-white/5 cursor-pointer hover:bg-zinc-700">
              JD
            </div>
          </div>
        </header>

        <div className="p-5 max-w-7xl mx-auto">{renderContent()}</div>

        <ChatWidget
          context={
            activeView === View.MEETING_DETAIL
              ? `Meeting: ${currentMeeting?.title}`
              : "General Workspace"
          }
        />
      </main>

      {isCreateModalOpen && (
        <CreateMeetingModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
}
