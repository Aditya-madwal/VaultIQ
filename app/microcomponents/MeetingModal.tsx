
import React from 'react';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MeetingModal: React.FC<MeetingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-zinc-950/80" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold tracking-tighter text-white">NEW_SESSION_CAPTURE</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-xl transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Meeting Title</label>
            <input 
              type="text" 
              placeholder="e.g. Protocol Alignment Q3"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold text-zinc-100 focus:outline-none focus:border-indigo-900 transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Date</label>
              <input type="date" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold text-zinc-100" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Priority</label>
              <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold text-zinc-100">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          
          <div className="p-6 bg-indigo-900/10 rounded-2xl border border-indigo-800/30 flex items-center justify-center gap-4 cursor-pointer hover:bg-indigo-900/20 transition-all">
            <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-indigo-800/50">
              <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">Upload_Recording_Feed</span>
          </div>

          <button className="w-full py-4 bg-zinc-100 text-zinc-900 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all">
            Initiate AI Processing
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingModal;
