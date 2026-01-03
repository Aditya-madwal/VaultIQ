
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
      <div className="glass-card w-full max-w-xl rounded-md shadow-2xl overflow-hidden border border-white/10 animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center border border-white/10">
              <UserPlus size={14} className="text-zinc-300" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-white tracking-tight">Identify Participants</h2>
              <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">Map AI Voice Profiles</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 text-zinc-600 hover:text-white hover:bg-white/5 rounded-md transition-all"
          >
            <X size={14} />
          </button>
        </div>

        {/* Info Banner */}
        <div className="mx-6 mt-4 p-2.5 bg-white/[0.03] border border-white/5 rounded-md flex items-start gap-2">
          <Info size={12} className="text-zinc-500 mt-0.5 flex-shrink-0" />
          <p className="text-[9px] text-zinc-500 font-medium leading-relaxed">
            AI detected <span className="text-zinc-200">2 unique signatures</span> that need mapping.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
          {unknownSpeakers.map((speaker) => (
            <div key={speaker.id} className="p-4 rounded-md bg-white/[0.02] border border-white/5 flex flex-col md:flex-row gap-4 hover:border-white/10 transition-all group">
              
              {/* Voice Profile Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-zinc-900 border border-white/10 rounded-md flex items-center justify-center text-[10px] font-bold text-zinc-400 group-hover:text-white">
                      {speaker.label.split(' ')[1]}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-white block">{speaker.label}</span>
                      <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-tighter">ID: {speaker.id}</span>
                    </div>
                  </div>
                  <span className="text-[7px] font-bold bg-white/5 text-zinc-400 px-1.5 py-0.5 rounded-md border border-white/5 uppercase">
                    {speaker.confidence} Conf
                  </span>
                </div>
                <div className="p-2 bg-black/40 rounded-md border border-white/5 text-[10px] text-zinc-500 italic leading-relaxed">
                  "{speaker.snippet}"
                </div>
              </div>

              {/* Mapping Controls */}
              <div className="md:w-44 flex flex-col gap-2">
                <div className="relative">
                  <Search size={10} className="absolute left-2.5 top-2 text-zinc-700" />
                  <input 
                    type="text" 
                    placeholder="Search member..." 
                    className="w-full pl-7 pr-2 py-1.5 bg-white/5 border border-white/10 rounded-md text-[10px] font-medium outline-none text-white placeholder-zinc-800" 
                  />
                </div>
                <div className="flex items-center justify-between gap-1">
                  <div className="flex -space-x-1">
                    {MOCK_EMPLOYEES.slice(0, 3).map(e => (
                      <button 
                        key={e.id} 
                        className="w-5 h-5 rounded-md border border-black bg-zinc-900 overflow-hidden grayscale group-hover:grayscale-0"
                        title={e.name}
                      >
                        <img src={e.avatar} alt={e.name} className="rounded-md" />
                      </button>
                    ))}
                  </div>
                  <button className="h-5 px-2 bg-white/5 border border-white/10 rounded-md text-[7px] font-bold text-zinc-400 hover:text-white transition-all uppercase tracking-widest">
                    Manual
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white/[0.02] border-t border-white/5 flex justify-end gap-3 items-center">
          <button 
            onClick={onClose} 
            className="text-[9px] font-bold text-zinc-600 hover:text-zinc-400 uppercase tracking-widest transition-colors px-2"
          >
            Dismiss
          </button>
          <button 
            onClick={onClose} 
            className="px-4 py-1.5 bg-white text-black rounded-md text-[9px] font-bold hover:bg-zinc-200 transition-all shadow-md uppercase tracking-widest flex items-center gap-1.5"
          >
            <Check size={12} /> Commit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeakerMappingModal;
