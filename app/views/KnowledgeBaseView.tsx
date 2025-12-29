
import React, { useState } from 'react';
import { Meeting } from '../types';
import { Search, Hash, Star, Clock, Filter, MapPin, Brain, ChevronRight } from 'lucide-react';

interface KnowledgeBaseViewProps {
  meetings: Meeting[];
  onNavigateToMeeting: (id: string) => void;
}

const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({ meetings, onNavigateToMeeting }) => {
  const [query, setQuery] = useState("");
  const tags = ["Design", "Tech", "HR", "Finance", "Strategy", "Onboarding"];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4 animate-in fade-in duration-500">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-white">Workspace Brain</h2>
        <p className="text-slate-400">Ask anything about your past meetings, decisions, and discussions.</p>
        <div className="relative max-w-2xl mx-auto">
          <Search size={24} className="absolute left-6 top-5 text-blue-500" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. What did we decide about onboarding flow?" 
            className="w-full pl-16 pr-8 py-5 bg-slate-900 border border-slate-800 rounded-3xl text-lg shadow-2xl focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-white placeholder-slate-600"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {tags.map(tag => (
          <button key={tag} className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-xs font-bold text-slate-400 hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/20 transition-all flex items-center gap-1.5 shadow-sm">
            <Hash size={14} className="text-slate-500" /> {tag}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Search Results</h3>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
            <button className="flex items-center gap-1.5 text-blue-400 transition-colors"><Star size={14} /> Relevance</button>
            <button className="flex items-center gap-1.5 hover:text-slate-300 transition-colors"><Clock size={14} /> Recency</button>
          </div>
        </div>

        {query.length > 2 ? (
          <div className="space-y-4">
             {meetings.map(m => (
               <div key={m.id} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm hover:border-slate-700 transition-all flex flex-col md:flex-row gap-6 group cursor-pointer" onClick={() => onNavigateToMeeting(m.id)}>
                 <div className="md:w-48 space-y-2">
                    <div className="bg-blue-500/10 text-blue-400 text-[10px] font-bold px-2 py-1 rounded inline-block uppercase tracking-wider border border-blue-500/20">{m.date}</div>
                    <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{m.title}</h4>
                 </div>
                 <div className="flex-1 space-y-4">
                    <div className="bg-slate-950/40 p-4 rounded-2xl border border-slate-800 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
                      <p className="text-sm text-slate-400 line-clamp-3">
                        "...we discussed the <strong className="text-blue-400">onboarding flow</strong> for the new customer success team. The main consensus was to <strong className="text-emerald-400">automate the email sequences</strong>..."
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
                         <MapPin size={12} /> Jump to 04:22
                       </span>
                       <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1.5">
                         <Star size={12} /> Pinned Decision
                       </span>
                    </div>
                 </div>
               </div>
             ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-blue-600 text-white space-y-4 relative overflow-hidden group shadow-xl shadow-blue-900/10">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                 <Brain size={120} />
               </div>
               <h4 className="text-xl font-bold">AI Summaries</h4>
               <p className="text-blue-100 text-sm opacity-80 leading-relaxed">Catch up on all discussions about product architecture from the last 30 days.</p>
               <button className="px-6 py-2.5 bg-white text-blue-600 rounded-xl text-sm font-bold shadow-lg hover:bg-slate-100 transition-colors">Generate Digest</button>
            </div>
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 relative overflow-hidden group">
               <h4 className="text-xl font-bold text-white">Quick Filters</h4>
               <div className="space-y-3">
                 <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all group">
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white">Decision Logs</span>
                    <ChevronRight size={16} className="text-slate-600" />
                 </button>
                 <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all group">
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white">Action Item History</span>
                    <ChevronRight size={16} className="text-slate-600" />
                 </button>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBaseView;
