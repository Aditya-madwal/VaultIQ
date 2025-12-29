
import React, { useState } from 'react';
import { X, Upload, Calendar, Plus, CheckCircle } from 'lucide-react';

interface CreateMeetingModalProps {
  onClose: () => void;
}

const CreateMeetingModal: React.FC<CreateMeetingModalProps> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-2xl animate-in fade-in duration-500">
      <div className="glass-card w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/20 relative animate-in zoom-in-95 duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-zinc-600 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        >
          <X size={18} />
        </button>

        <div className="p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-black shadow-xl">
              <Plus size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight leading-none mb-1">New Capture</h2>
              <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Process Meeting Stream</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] ml-1">Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Stakeholder Sync" 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium focus:ring-1 focus:ring-white/20 outline-none transition-all text-white placeholder-zinc-700 shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] ml-1">Timestamp</label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-4 top-3 text-zinc-700" />
                  <input 
                    type="datetime-local" 
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium focus:ring-1 focus:ring-white/20 outline-none transition-all text-white shadow-inner"
                  />
                </div>
              </div>
            </div>

            <div 
              className={`border border-dashed rounded-[2rem] p-12 flex flex-col items-center justify-center space-y-5 transition-all ${
                file ? 'border-white bg-white/[0.05]' : 'border-white/10 hover:border-white/30 bg-black/40 shadow-inner'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${file ? 'bg-white text-black shadow-2xl scale-110' : 'bg-zinc-900 text-zinc-700'}`}>
                {file ? <CheckCircle size={24} /> : <Upload size={24} />}
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-zinc-300 mb-1">{file ? file.name : 'Select Recording'}</p>
                <p className="text-[9px] text-zinc-700 uppercase font-bold tracking-[0.1em]">MP4 • MP3 • 500MB Limit</p>
              </div>
              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <label 
                htmlFor="file-upload"
                className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-bold text-zinc-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer uppercase tracking-widest shadow-xl"
              >
                BROWSE FILES
              </label>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-3 text-zinc-600 text-[10px] font-bold hover:text-white transition-colors uppercase tracking-[0.2em]"
            >
              Cancel
            </button>
            <button 
              onClick={onClose}
              className="flex-[2] py-3 bg-white text-black rounded-2xl text-[10px] font-bold hover:bg-zinc-200 transition-all shadow-[0_16px_48px_rgba(255,255,255,0.1)] uppercase tracking-[0.2em]"
            >
              Analyze Stream
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMeetingModal;
