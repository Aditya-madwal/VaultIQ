
import React, { useState } from 'react';
import { X, Upload, Calendar, Plus, CheckCircle, FileAudio } from 'lucide-react';

interface CreateMeetingModalProps {
  onClose: () => void;
}

const CreateMeetingModal: React.FC<CreateMeetingModalProps> = ({ onClose }) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-xl rounded-xl shadow-2xl overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
              <Plus size={20} className="text-zinc-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">New Capture</h2>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Process Meeting Stream</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-600 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Title</label>
              <input 
                type="text" 
                placeholder="e.g. Stakeholder Sync" 
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium focus:ring-1 focus:ring-white/20 outline-none transition-all text-white placeholder-zinc-700 shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Timestamp</label>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-2.5 text-zinc-700" />
                <input 
                  type="datetime-local" 
                  className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium focus:ring-1 focus:ring-white/20 outline-none transition-all text-white shadow-inner"
                />
              </div>
            </div>
          </div>

          <div 
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center space-y-5 transition-all ${
              file ? 'border-white/20 bg-white/[0.05]' : 'border-white/10 hover:border-white/20 bg-black/20 hover:bg-black/40'
            }`}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all border border-white/10 shadow-inner ${file ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-700'}`}>
              {file ? <CheckCircle size={28} /> : <Upload size={28} />}
            </div>
            <div className="text-center space-y-1.5">
              <p className="text-sm font-bold text-zinc-300">{file ? file.name : 'Select Recording'}</p>
              <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">MP4 • MP3 • 500MB Limit</p>
            </div>
            <input 
              type="file" 
              id="file-upload" 
              className="hidden" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            {!file && (
              <label 
                htmlFor="file-upload"
                className="px-5 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-zinc-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer uppercase tracking-widest shadow-sm"
              >
                Browse Files
              </label>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-white/[0.02] border-t border-white/5 flex justify-end gap-3 items-center">
          <button 
            onClick={onClose}
            className="text-[11px] font-bold text-zinc-600 hover:text-zinc-400 uppercase tracking-widest transition-colors px-3"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            disabled={!file}
            className={`px-5 py-2 rounded-lg text-[11px] font-bold transition-all shadow-md uppercase tracking-widest flex items-center gap-2 ${
              file 
                ? 'bg-white text-black hover:bg-zinc-200' 
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            <FileAudio size={14} /> Analyze Stream
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMeetingModal;
