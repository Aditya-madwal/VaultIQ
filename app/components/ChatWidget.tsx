
import React, { useState, useRef, useEffect } from 'react';
import { Brain, X, Send, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ChatWidgetProps {
  context: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;
      if (!apiKey) {
        throw new Error('Google AI API key not configured');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-pro',
        systemInstruction: "You are MeetingBrain AI assistant. You answer questions about meeting transcripts, action items, and employee performance. Be professional, concise, and helpful."
      });

      const prompt = `Context: ${context}. User asked: ${userMsg}`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiText = response.text() || "I'm having trouble retrieving that data point.";
      
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'ai', text: "Data extraction error." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-80 h-[500px] glass-card rounded-md shadow-2xl mb-4 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 border border-white/20">
          <div className="bg-indigo-900/20 p-4 flex items-center justify-between border-b border-white/10 backdrop-blur-3xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-black shadow-xl">
                <Brain size={18} />
              </div>
              <div>
                <h3 className="text-white text-xs font-bold tracking-widest uppercase">AI Assistant</h3>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 opacity-40">
                <Sparkles size={24} className="text-indigo-400" />
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] leading-relaxed">Intelligence Agent Active<br/>Query the workspace</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-3 rounded-md text-xs font-medium leading-relaxed shadow-xl border ${
                  m.role === 'user' 
                    ? 'bg-white text-black border-white shadow-indigo-500/10' 
                    : 'bg-white/5 text-zinc-300 border-white/10 backdrop-blur-md shadow-black/40'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-2 rounded-md flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse delay-150"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-black border-t border-white/10 flex gap-2 backdrop-blur-3xl">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-xs font-medium outline-none text-white placeholder-zinc-600 focus:border-white/20 transition-all"
            />
            <button 
              onClick={handleSend}
              className="w-10 h-10 bg-indigo-600 text-white rounded-md flex items-center justify-center hover:bg-indigo-500 transition-all shadow-xl active:scale-90"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-md flex items-center justify-center text-black shadow-2xl transition-all transform hover:scale-105 active:scale-95 border border-white/20 ${
          isOpen ? 'bg-zinc-900 text-white' : 'bg-white'
        }`}
      >
        {isOpen ? <X size={20} /> : <Brain size={24} />}
      </button>
    </div>
  );
};

export default ChatWidget;
