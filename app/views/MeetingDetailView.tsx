import React, { useState } from "react";
import { Meeting } from "../types";
import {
  ChevronLeft,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  List,
  Share2,
  CheckCircle,
  Clock,
  Brain,
  Plus,
} from "lucide-react";
import SpeakerMappingModal from "../components/SpeakerMappingModal";
import TaskCard from "../components/microcomponents/TaskCard";

interface MeetingDetailViewProps {
  meeting: Meeting;
  onBack: () => void;
}

const MeetingDetailView: React.FC<MeetingDetailViewProps> = ({
  meeting,
  onBack,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"transcript" | "mom">(
    "transcript"
  );
  const [showMappingModal, setShowMappingModal] = useState(false);

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 text-zinc-100">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-all">
            <ChevronLeft size={18} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {meeting.title}
            </h2>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-[11px] text-zinc-400 font-bold uppercase tracking-[0.15em] flex items-center gap-1.5">
                <Clock size={12} /> {meeting.date} • {meeting.duration}
              </span>
              <div className="flex -space-x-2">
                {meeting.participants.map((p, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-md border border-black bg-zinc-800 overflow-hidden shadow-sm"
                    title={p}>
                    <img
                      src={`https://picsum.photos/seed/${p}/100`}
                      alt={p}
                      className="opacity-80 rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-md text-[11px] font-bold bg-white/5 text-zinc-300 hover:text-white transition-all uppercase tracking-widest">
            <Share2 size={14} /> Share result
          </button>
          <button
            onClick={() => setShowMappingModal(true)}
            className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-md text-[11px] font-bold hover:bg-zinc-200 transition-all shadow-md uppercase tracking-widest">
            Speaker Mapping
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-160px)] overflow-hidden">
        {/* Left Column: Video, Summary, Tabs */}
        <div className="lg:w-[65%] flex flex-col gap-6 overflow-y-auto pr-2 scrollbar-hide">
          {/* Video Player */}
          <div className="relative group bg-black rounded-md aspect-video w-full overflow-hidden border border-white/10 shadow-2xl flex-shrink-0">
            <img
              src={`https://picsum.photos/seed/${meeting.id}/1280/720`}
              className="w-full h-full object-cover opacity-20"
              alt="Video Thumbnail"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 bg-white rounded-md flex items-center justify-center text-black transition-transform hover:scale-110 shadow-[0_0_32px_rgba(255,255,255,0.2)]">
                {isPlaying ? (
                  <Pause size={28} />
                ) : (
                  <Play size={28} className="ml-1.5" />
                )}
              </button>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 to-transparent">
              <div className="w-full h-1 bg-white/10 rounded-full mb-3 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-indigo-500 w-[45%] shadow-[0_0_12px_rgba(99,102,241,0.8)]"></div>
              </div>
              <div className="flex items-center justify-between text-zinc-300 text-[10px] font-mono font-bold tracking-widest">
                <span>12:45 / 45:00</span>
                <div className="flex gap-6">
                  <SkipBack
                    size={18}
                    className="cursor-pointer hover:text-white"
                  />
                  <SkipForward
                    size={18}
                    className="cursor-pointer hover:text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Executive Summary */}
          <div className="glass-card p-6 rounded-md border border-white/5">
            <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Brain size={16} className="text-indigo-400" /> Intelligence
              report
            </h3>
            <div className="space-y-3">
              {meeting.summary.map((point, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></div>
                  <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs Section: Transcript and M.O.M */}
          <div className="glass-card rounded-md overflow-hidden flex flex-col min-h-[400px] border border-white/5">
            <div className="flex border-b border-white/5 bg-white/[0.02]">
              <button
                onClick={() => setActiveTab("transcript")}
                className={`flex-1 py-4 text-[11px] font-bold uppercase tracking-widest relative transition-colors ${
                  activeTab === "transcript"
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}>
                Full Transcript
                {activeTab === "transcript" && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-500"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("mom")}
                className={`flex-1 py-4 text-[11px] font-bold uppercase tracking-widest relative transition-colors ${
                  activeTab === "mom"
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}>
                Minutes of Meeting
                {activeTab === "mom" && (
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-indigo-500"></div>
                )}
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              {activeTab === "transcript" ? (
                <div className="space-y-8">
                  {meeting.transcript.map((line, i) => (
                    <div
                      key={i}
                      className={`flex gap-5 group ${
                        line.highlight
                          ? "bg-white/[0.03] -mx-6 px-6 py-4 border-y border-white/5"
                          : ""
                      }`}>
                      <div className="w-10 h-10 rounded-md bg-zinc-900 flex-shrink-0 overflow-hidden border border-white/10">
                        <img
                          src={`https://picsum.photos/seed/${line.speaker}/50`}
                          alt=""
                          className="opacity-80 rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-zinc-100">
                            {line.speaker}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">
                            {line.timestamp}
                          </span>
                        </div>
                        <p
                          className={`text-[13px] leading-relaxed font-medium ${
                            line.highlight ? "text-zinc-100" : "text-zinc-400"
                          }`}>
                          {line.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6 text-zinc-300 p-2">
                  <div>
                    <h4 className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-3">
                      Core Outcomes
                    </h4>
                    <ul className="list-disc list-inside space-y-3 text-sm leading-relaxed">
                      <li>
                        Strategic alignment on Q3 vision for engineering
                        velocity.
                      </li>
                      <li>
                        Postponed internal analytics migration to focus on
                        customer-facing dashboards.
                      </li>
                      <li>Quarterly review scheduled for June 22nd.</li>
                    </ul>
                  </div>
                  <div className="p-5 bg-indigo-500/5 border border-indigo-500/10 rounded-md">
                    <h4 className="text-[11px] font-bold text-white uppercase tracking-widest mb-3">
                      Key Decisions
                    </h4>
                    <div className="flex gap-3">
                      <CheckCircle
                        size={18}
                        className="text-emerald-400 mt-0.5 flex-shrink-0"
                      />
                      <p className="text-sm leading-relaxed font-medium">
                        Approved immediate shift from mobile wireframes to full
                        fidelity prototyping to reduce stakeholder feedback
                        loops.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Action Items */}
        <div className="lg:w-[35%] flex flex-col h-full gap-4">
          <div className="glass-card rounded-md flex flex-col h-full overflow-hidden border border-white/5">
            <div className="p-5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <h3 className="text-[11px] font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
                <List size={16} className="text-indigo-400" /> Extracted tasks
              </h3>
              <span className="text-[9px] font-bold bg-indigo-500 text-white px-2 py-0.5 rounded-md uppercase tracking-tighter shadow-indigo-500/20 shadow-lg">
                AI Detect
              </span>
            </div>
            <div className="p-5 flex-1 overflow-y-auto space-y-4">
              {meeting.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
              <button className="w-full py-4 rounded-md border border-dashed border-white/10 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-zinc-400 hover:border-white/30 transition-all flex items-center justify-center gap-2">
                <Plus size={14} /> Manually add task
              </button>
            </div>
          </div>
        </div>
      </div>

      {showMappingModal && (
        <SpeakerMappingModal onClose={() => setShowMappingModal(false)} />
      )}
    </div>
  );
};

export default MeetingDetailView;
