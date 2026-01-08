'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { GoogleGenAI, Type } from "@google/genai";

// --- Types ---

interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface SummaryResult {
  summary: string;
  mom: string[];
  tasks: string[];
  schedule: {
    event: string;
    time: string;
  }[];
}

import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

// --- Global Styles Injected via Component ---

const GlobalStyles: React.FC = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    body {
        font-family: 'Inter', sans-serif;
        background-color: #050505;
        color: #ffffff;
        margin: 0;
        overflow-x: hidden;
    }
    h1, h2, h3, h4, h5, h6 {
        font-family: ${playfair.style.fontFamily}, serif;
    }
    .dotted-bg {
        background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
        background-size: 24px 24px;
    }
    .gradient-text {
        background: linear-gradient(to right, #ffffff, #a1a1aa);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #050505;
    }
    ::-webkit-scrollbar-thumb {
        background: #222;
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #333;
    }
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fade-in 0.8s ease-out forwards;
    }
  `}} />
);

// --- Sub-Components ---

const Navbar: React.FC = () => (
  <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[80%] max-w-7xl border border-white/10 bg-black/70 backdrop-blur-xl rounded-2xl shadow-2xl transition-all">
    <div className="w-full px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-xl text-black">C</div>
        <span className="text-lg font-bold tracking-tight">Chronos AI</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#demo" className="hover:text-white transition-colors">Demo</a>
        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
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

const FeatureCard: React.FC<FeatureProps> = ({ title, description, icon }) => (
  <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/5 hover:border-white/10 transition-all group">
    <div className="mb-4 w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
    <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const Footer: React.FC = () => (
  <footer className="border-t border-white/5 py-20 px-6 bg-black">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
      <div className="col-span-1 md:col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-xl text-black">C</div>
          <span className="text-xl font-bold tracking-tight text-white">Chronos AI</span>
        </div>
        <p className="text-neutral-400 text-sm max-w-sm leading-relaxed">
          The next generation of meeting intelligence. Automated, accurate, and deeply integrated into your workflow.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-white mb-6 text-sm">Product</h4>
        <ul className="space-y-3 text-sm text-neutral-400">
          <li><a href="#" className="hover:text-white transition-colors">Meeting Summary</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Team Calendar</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Action Items</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-white mb-6 text-sm">Company</h4>
        <ul className="space-y-3 text-sm text-neutral-400">
          <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-neutral-600 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
      <span>&copy; {new Date().getFullYear()} Chronos AI Inc. Crafted for productivity.</span>
      <div className="flex gap-6">
        <a href="#" className="hover:text-neutral-400 transition-colors">Twitter</a>
        <a href="#" className="hover:text-neutral-400 transition-colors">LinkedIn</a>
      </div>
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
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the following meeting transcript. Provide a concise summary, a list of MOM (Minutes of Meeting) points, specific action tasks for team members, and any scheduled events found in the text. \n\n${transcript}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              mom: { type: Type.ARRAY, items: { type: Type.STRING } },
              tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
              schedule: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    event: { type: Type.STRING },
                    time: { type: Type.STRING }
                  },
                  required: ["event", "time"]
                }
              }
            },
            required: ["summary", "mom", "tasks", "schedule"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setResult(data);
    } catch (err) {
      console.error("AI Error:", err);
      setError("Unable to process transcript. Please ensure the API key is active.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen dotted-bg selection:bg-neutral-500 selection:text-white">
      <GlobalStyles />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-0 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-neutral-300 mb-8 animate-fade-in shadow-2xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-500"></span>
            </span>
            Meet Chronos Intelligence v2.0
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter gradient-text mb-2 leading-tight md:px-20 pb-4">
            Meetings into Action.
          </h1>
          <p className="text-lg md:text-2xl text-neutral-400 max-w-4xl mx-auto mb-10 leading-relaxed font-light">
            AI-powered summaries, automated MOM generation, and smart team scheduling. Stop taking notes, start taking action.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button className="w-full sm:w-auto px-8 py-3 bg-white text-black hover:bg-neutral-200 rounded-full text-lg font-bold transition-all shadow-xl shadow-white/10">
              Get Started
            </button>
            <button className="w-full sm:w-auto px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-lg font-bold transition-all backdrop-blur-md flex items-center justify-center gap-2">
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

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">The Modern AI Stack.</h2>
            <p className="text-xl text-neutral-400 max-w-3xl leading-relaxed">Everything your team needs to transform unstructured conversations into clear, actionable data points.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="MOM Generator" 
              description="Automatically generate professional Minutes of Meeting with key decisions and discussion points captured instantly."
              icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
            />
            <FeatureCard 
              title="Smart Scheduler" 
              description="Chronos detects potential follow-ups and automatically suggests the best times for your team to regroup."
              icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
            />
            <FeatureCard 
              title="Task Extraction" 
              description="Action items are intelligently identified and assigned to team members based on the meeting context."
              icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
            />
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section id="demo" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="sticky top-24">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.1]">Experience the intelligence.</h2>
              <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
                Paste a meeting transcript snippet to see our proprietary engine extract meaningful, structured data in seconds.
              </p>
              <div className="p-1 rounded-2xl bg-neutral-900 border border-white/10 shadow-3xl overflow-hidden">
                <textarea 
                  className="w-full h-48 bg-transparent p-6 text-neutral-300 resize-none outline-none font-mono text-base leading-relaxed"
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  placeholder="Paste meeting transcript here..."
                />
                <div className="p-4 border-t border-white/5 bg-neutral-900/50 flex justify-between items-center">
                  <span className="text-[10px] text-neutral-500 font-mono">ENHANCED BY GEMINI FLASH</span>
                  <button 
                    onClick={handleSummarize}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-neutral-200 disabled:opacity-50 rounded-full font-bold transition-all shadow-xl shadow-white/5 text-sm"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </>
                    ) : 'Generate Results'}
                  </button>
                </div>
              </div>
              {error && <p className="mt-4 text-red-400 text-sm font-medium bg-red-400/10 p-3 rounded-xl border border-red-400/20">{error}</p>}
            </div>

            <div className="lg:mt-0 min-h-[400px]">
              {!result && !loading && (
                <div className="h-[400px] flex flex-col items-center justify-center p-10 border-2 border-dashed border-white/5 rounded-3xl text-neutral-600 group hover:border-white/20 transition-colors">
                  <div className="w-16 h-16 bg-white/2 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/5 transition-colors">
                    <svg className="w-8 h-8 opacity-30 group-hover:opacity-60 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="text-center text-lg font-medium">Ready for input. <br/>Paste a transcript to begin extraction.</p>
                </div>
              )}

              {loading && (
                <div className="space-y-6 animate-pulse p-8 border border-white/5 rounded-3xl bg-neutral-900/30">
                  <div className="h-6 bg-white/5 rounded-full w-2/3"></div>
                  <div className="h-4 bg-white/5 rounded-full w-full"></div>
                  <div className="h-4 bg-white/5 rounded-full w-5/6"></div>
                  <div className="h-32 bg-white/5 rounded-xl w-full"></div>
                  <div className="h-6 bg-white/5 rounded-full w-1/2"></div>
                </div>
              )}

              {result && (
                <div className="space-y-6 animate-fade-in p-2">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl">
                    <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-4">Summary Analysis</h4>
                    <p className="text-neutral-300 text-base leading-relaxed font-light italic">"{result.summary}"</p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10">
                      <h4 className="text-neutral-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">Minutes of Meeting</h4>
                      <ul className="space-y-4">
                        {result.mom.map((item, i) => (
                          <li key={i} className="flex gap-3 text-sm text-neutral-300">
                            <span className="text-white text-lg font-bold">•</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10">
                      <h4 className="text-neutral-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">Generated Task Board</h4>
                      <ul className="space-y-3">
                        {result.tasks.map((item, i) => (
                          <li key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                            <div className="w-5 h-5 rounded border-2 border-white/30 group-hover:border-white transition-colors"></div>
                            <span className="text-sm text-neutral-200 font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10">
                    <h4 className="text-neutral-500 text-xs font-bold uppercase tracking-[0.2em] mb-6">Extracted Schedule</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {result.schedule.map((item, i) => (
                        <div key={i} className="flex flex-col gap-1 px-5 py-4 bg-white/5 rounded-xl border border-white/10">
                          <span className="text-neutral-400 font-bold text-xs uppercase tracking-wider">{item.time}</span>
                          <span className="text-sm font-bold text-white leading-tight">{item.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto p-16 rounded-[2.5rem] bg-neutral-900 border border-white/10 text-center relative overflow-hidden shadow-3xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1] text-white">Ready to focus on <br /> the conversation?</h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto leading-relaxed">Join the most efficient teams on the planet using Chronos AI to automate their administrative heavy lifting.</p>
            <button className="px-10 py-4 bg-white text-black hover:bg-neutral-200 rounded-full text-xl font-black transition-all shadow-3xl hover:scale-105 active:scale-95">
              Start Free Trial Now
            </button>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-[80px]"></div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default App;
