'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { generateMeetingSummary } from './actions';

// --- Types ---

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

interface SummaryResult {
  summary: string;
  mom: { type: 'action' | 'decision' | 'info'; content: string }[];
  tasks: string[];
  schedule: {
    event: string;
    time: string;
  }[];
}
// --- Sub-Components ---

const Navbar: React.FC = () => (
  <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[80%] max-w-7xl border border-white/10 bg-black/70 backdrop-blur-xl rounded-full shadow-2xl transition-all">
    <div className="w-full px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-xl text-black">W</div> */}
        <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
               <svg className="w-4 h-4 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
        <span className="text-lg font-bold tracking-tight">WorkNest</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#demo" className="hover:text-white transition-colors">Demo</a>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/sign-in" className="text-neutral-300 hover:text-white text-xs font-semibold transition-colors">
          Login
        </Link>
        <Link href="/sign-up" className="bg-white text-black px-5 py-2 rounded-full text-xs font-semibold hover:bg-neutral-200 transition-colors">
          Sign Up
        </Link>
      </div>
    </div>
  </nav>
);

const FeatureCard: React.FC<FeatureProps> = ({ title, description, icon, className }) => (
  <div className={`relative p-8 rounded-3xl bg-white/[0.03] border border-white/5 overflow-hidden group hover:bg-white/[0.06] transition-all duration-500 ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div>
        <div className="mb-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-white/90 group-hover:scale-110 group-hover:text-white transition-all duration-500 shadow-lg shadow-black/20">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 tracking-tight text-white/90 group-hover:text-white transition-colors">{title}</h3>
        <p className="text-neutral-500 group-hover:text-neutral-400 text-sm leading-relaxed font-medium transition-colors">{description}</p>
      </div>
    </div>
  </div>
);

const Footer: React.FC = () => (
    <footer className="border-t border-white/5 py-12 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
               <svg className="w-4 h-4 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-base font-bold tracking-tight text-white/80">WorkNest</span>
          </div>
          <div className="flex items-center gap-8 text-xs font-medium text-neutral-500">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <a href="#" className="hover:text-white transition-colors">Twitter</a>
             <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <p className="text-neutral-600 text-xs">
            &copy; {new Date().getFullYear()} WorkNest Inc.
          </p>
      </div>
    </footer>
  );

// --- Main Application ---

const App: React.FC = () => {
  const [transcript, setTranscript] = useState<string>("John: We need to finalize the Q3 budget by Thursday morning. \nSarah: I can have the draft ready by tomorrow afternoon. \nMike: Let's schedule a follow-up for Wednesday at 4 PM to review Sarah's draft. \nJohn: Perfect, I'll also assign the resource allocation task to Kevin.");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<SummaryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    setError(null);
    
    try {
      const data = await generateMeetingSummary(transcript);
      setResult(data);
    } catch (err) {
      console.error("AI Error:", err);
      setError("Unable to process transcript. Please ensure the API key is active and configured correctly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen dotted-bg selection:bg-neutral-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-0 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-neutral-300 mb-8 animate-fade-in shadow-2xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-500"></span>
            </span>
            Turn Your Meeting into Action.
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter gradient-text mb-2 leading-tight md:px-20 pb-4">
            Meetings into Action.
          </h1>
          <p className="text-lg md:text-2xl text-neutral-400 max-w-4xl mx-auto mb-10 leading-relaxed font-light">
            AI-powered summaries, automated MOM generation, and smart task extraction. Stop taking notes, start taking action.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button className="w-full sm:w-auto px-8 py-3 bg-green-500/20 hover:bg-green-600/20 border border-green-500/40 rounded-full text-lg font-bold transition-all backdrop-blur-md flex items-center justify-center gap-2 text-green-400 cursor-pointer">
              Try For Free <span className="text-lg">›</span>
            </button>
          </div>

          {/* Dashboard Preview */}
          <div className="relative mx-auto max-w-6xl animate-fade-in">
             <div className="rounded-xl border border-white/10 p-2 bg-neutral-900/50 backdrop-blur-xl shadow-2xl">
                <img 
                  src="/dashboard-preview.png" 
                  alt="App Dashboard" 
                  className="rounded-lg w-full h-auto shadow-inner"
                />
             </div>
             {/* Fade gradient */}
             <div className="absolute -bottom-2 left-0 right-0 h-64 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent z-20"></div>
          </div>
        </div>
        
        {/* Background glow for the dashboard */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-white/5 blur-[120px] -z-10 rounded-full pointer-events-none"></div>
      </section>

{/* Features & Tech Stack */}
      <section id="features" className="py-20 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-white">Intelligence, refined.</h2>
              <p className="text-neutral-400 max-w-xl text-sm md:text-base leading-relaxed">
                Powered by <span className="text-white font-semibold">Gemini 1.5 Flash</span> and built on <span className="text-white font-semibold">Next.js 14</span>, 
                Chronos transforms raw audio into structured business intelligence in milliseconds.
              </p>
            </div>
            {/* Tech Stack Badges */}
            <div className="flex gap-3 flex-wrap">
               {['Next.js 14', 'Gemini AI', 'Tailwind', 'TypeScript'].map(tech => (
                 <span key={tech} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-wider text-neutral-300 uppercase">
                    {tech}
                 </span>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
              title="MOM Generator" 
              description="Instantly draft minutes with distinct separation of actions, decisions, and informational nodes."
              icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
            />
            <FeatureCard 
              title="Smart Scheduler" 
              description="Context-aware scheduling suggestions based on discussed timelines and deadlines."
              icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            />
            <FeatureCard 
              title="Task Extraction" 
              description="Zero-shot task identification and assignment from natural language conversations."
              icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
            />
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="demo" className="py-20 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:h-[600px]">
            
            {/* Left Col: Input */}
            <div className="lg:col-span-5 flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
                Live Demo
              </h3>
              <div className="flex-1 flex flex-col p-1 rounded-3xl bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden relative group hover:border-white/20 transition-colors">
                <textarea 
                  className="flex-1 w-full bg-transparent p-6 text-neutral-300 resize-none outline-none font-mono text-sm leading-relaxed scrollbar-hide"
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Paste your meeting transcript here..."
                />
                <div className="p-4 bg-black/40 backdrop-blur-md border-t border-white/5 flex justify-between items-center">
                   <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span className="text-[10px] font-bold text-neutral-500 tracking-wider">GEMINI FLASH</span>
                   </div>
                   <button 
                    onClick={handleSummarize}
                    disabled={loading || !transcript.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-full font-bold transition-all shadow-lg text-xs"
                  >
                    {loading ? 'Processing...' : 'Analyze Text'}
                    {!loading && <span className="text-xs">→</span>}
                  </button>
                </div>
              </div>
              {error && (
                <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium flex items-center gap-2">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                   {error}
                </div>
              )}
            </div>

            {/* Right Col: Output */}
            <div className="lg:col-span-7 h-full flex flex-col">
              <div className="h-full rounded-3xl bg-neutral-900/50 border border-white/5 p-1 relative overflow-hidden">
                 
                 {!result && !loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-600">
                      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                      </div>
                      <p className="text-sm font-medium">Awaiting Input</p>
                    </div>
                 )}

                 {loading && (
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="flex flex-col items-center gap-3">
                       <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                       <p className="text-xs text-neutral-500 font-medium tracking-wide animate-pulse">EXTRACTING INSIGHTS</p>
                     </div>
                   </div>
                 )}
                 
                 {result && (
                   <div className="h-full overflow-y-auto custom-scrollbar p-6 space-y-6">
                      {/* Summary Block */}
                      <div className="animate-fade-in">
                        <h4 className="text-[10px] items-center flex gap-2 font-bold text-neutral-500 uppercase tracking-widest mb-3">
                           <span className="w-1 h-1 rounded-full bg-white"></span>
                           Executive Summary
                        </h4>
                        <p className="text-sm text-neutral-200 leading-relaxed font-light">{result.summary}</p>
                      </div>
                      
                      <div className="h-px bg-white/5 w-full"></div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in delay-75">
                         {/* MOM */}
                         <div>
                            <h4 className="text-[10px] items-center flex gap-2 font-bold text-neutral-500 uppercase tracking-widest mb-3">
                               <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                               Minutes & Points
                            </h4>
                            <div className="space-y-2">
                               {result.mom.map((item, i) => (
                                 <div key={i} className="flex gap-3 text-xs p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                                    <span className={`shrink-0 mt-0.5 w-1.5 h-1.5 rounded-sm ${
                                      item.type === 'decision' ? 'bg-indigo-400' : 
                                      item.type === 'action' ? 'bg-emerald-400' : 'bg-neutral-500'
                                    }`} />
                                    <span className="text-neutral-300 leading-snug">{item.content}</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                         
                         {/* Tasks */}
                         <div>
                            <h4 className="text-[10px] items-center flex gap-2 font-bold text-neutral-500 uppercase tracking-widest mb-3">
                               <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                               Detected Tasks
                            </h4>
                            <div className="space-y-2">
                               {result.tasks.map((task, i) => (
                                 <div key={i} className="group flex items-start justify-between gap-3 text-xs p-3 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all cursor-default">
                                    <div className="flex gap-2">
                                        <div className="mt-0.5 w-3 h-3 rounded border border-neutral-600 group-hover:border-emerald-500 transition-colors flex items-center justify-center">
                                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <span className="text-neutral-300 line-clamp-2">{task}</span>
                                    </div>
                                    
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                 )}
              </div>
              
            </div>

          </div>
        </div>
      </section>

      {/* Simplified CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
         <div className="max-w-3xl mx-auto text-center relative z-10">
           <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8">Stop organizing.<br/>Start executing.</h2>
           <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-neutral-950 transition-all duration-300 hover:bg-white/90 hover:w-40 hover:px-0 w-auto">
              <span className="mr-2">Get Started</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
           </button>
           <p className="mt-6 text-xs text-neutral-500 uppercase tracking-widest font-semibold">No credit card required</p>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default App;
