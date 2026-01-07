
import React from 'react';
import { X, UserPlus, Search, Check, Info } from 'lucide-react';
import { MOCK_EMPLOYEES } from '../constants';

interface SpeakerMappingModalProps {
  onClose: () => void;
}

const SpeakerMappingModal: React.FC<SpeakerMappingModalProps> = ({ onClose }) => {
  const unknownSpeakers = [
    { id: 'u1', label: 'Speaker A', confidence: '92%', snippet: "We need to focus on the Q3 priorities first, especially the legacy migration blocks." },
    { id: 'u2', label: 'Speaker B', confidence: '74%', snippet: "Should we invite the engineering lead for the next sync? I feel they are missing context." }
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-300">
      <div className="glass-card w-full max-w-xl rounded-xl shadow-2xl overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
              <UserPlus size={20} className="text-zinc-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Identify Participants</h2>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Map AI Voice Profiles</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-zinc-600 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Info Banner */}
        <div className="mx-6 mt-5 p-3 bg-white/[0.03] border border-white/5 rounded-lg flex items-center gap-3">
          <Info size={14} className="text-zinc-500 flex-shrink-0" />
          <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
            AI detected <span className="text-zinc-200">2 unique signatures</span> that need mapping.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[500px] overflow-y-auto">
          {unknownSpeakers.map((speaker) => (
            <div key={speaker.id} className="p-5 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col md:flex-row gap-5 hover:border-white/10 transition-all group">
              
              {/* Voice Profile Info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-zinc-900 border border-white/10 rounded-lg flex items-center justify-center text-xs font-bold text-zinc-400 group-hover:text-white">
                      {speaker.label.split(' ')[1]}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block">{speaker.label}</span>
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-tighter">ID: {speaker.id}</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold bg-white/5 text-zinc-400 px-2 py-0.5 rounded-md border border-white/5 uppercase">
                    {speaker.confidence} Conf
                  </span>
                </div>
                <div className="p-3 bg-black/40 rounded-lg border border-white/5 text-xs text-zinc-500 italic leading-relaxed">
                  "{speaker.snippet}"
                </div>
              </div>

              {/* Mapping Controls */}
              <div className="md:w-48 flex flex-col gap-2.5">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-2.5 text-zinc-700" />
                  <input 
                    type="text" 
                    placeholder="Search member..." 
                    className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-medium outline-none text-white placeholder-zinc-800" 
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex -space-x-1.5">
                    {MOCK_EMPLOYEES.slice(0, 3).map(e => (
                      <button 
                        key={e.id} 
                        className="w-7 h-7 rounded-md border border-black bg-zinc-900 overflow-hidden grayscale group-hover:grayscale-0"
                        title={e.name}
                      >
                        <img src={e.avatar} alt={e.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                  <button className="h-7 px-3 bg-white/5 border border-white/10 rounded-md text-[9px] font-bold text-zinc-400 hover:text-white transition-all uppercase tracking-widest">
                    Manual
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-5 bg-white/[0.02] border-t border-white/5 flex justify-end gap-3 items-center">
          <button 
            onClick={onClose} 
            className="text-[11px] font-bold text-zinc-600 hover:text-zinc-400 uppercase tracking-widest transition-colors px-3"
          >
            Dismiss
          </button>
          <button 
            onClick={onClose} 
            className="px-5 py-2 bg-white text-black rounded-lg text-[11px] font-bold hover:bg-zinc-200 transition-all shadow-md uppercase tracking-widest flex items-center gap-2"
          >
            <Check size={14} /> Commit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeakerMappingModal;
