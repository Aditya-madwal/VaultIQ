
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Users, Calendar as CalendarIcon, Video, X, Clock, AlignLeft, Link, AlertCircle } from 'lucide-react';

interface CalendarEvent {
  day: number;
  title: string;
  type: 'internal' | 'external';
  time: string;
  description: string;
  creator: {
    name: string;
    avatar?: string;
  };
  attendees: {
    name: string;
    avatar?: string;
  }[];
  meetLink: string;
  priority: 'High' | 'Medium' | 'Low';
}

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 15));
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth(currentDate.getMonth(), currentDate.getFullYear()); i++) days.push(i);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const events: CalendarEvent[] = [
    { 
      day: 15, 
      title: 'Product Sync', 
      type: 'internal', 
      time: '10:00 AM',
      description: 'Weekly sync to discuss product roadmap and upcoming feature releases. key topics include the new dashboard and user onboarding flow.',
      creator: { name: 'Alice Chen' },
      attendees: [{ name: 'Bob Smith' }, { name: 'Charlie Rose' }, { name: 'David Kim' }],
      meetLink: 'meet.google.com/abc-defg-hij',
      priority: 'Medium'
    },
    { 
      day: 18, 
      title: 'Design Review', 
      type: 'internal', 
      time: '11:00 AM',
      description: 'Reviewing the latest high-fidelity mockups for the settings page. Please prepare your feedback beforehand.',
      creator: { name: 'Sarah Jones' },
      attendees: [{ name: 'Alice Chen' }, { name: 'Mike Ross' }],
      meetLink: 'meet.google.com/xyz-uvw-pqr',
      priority: 'Medium'
    },
  ];

  return (
    <div className="flex h-full gap-4">
      <div className={`bg-black rounded-3xl border border-zinc-800/50 shadow-lg flex flex-col h-full animate-in fade-in duration-500 overflow-hidden relative transition-all duration-300 ease-in-out ${selectedEvent ? 'w-[70%]' : 'w-full'}`}>
        <div className="p-8 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-950/30">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-bold text-white tracking-tight">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <div className="flex gap-1">
              <button className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-600 transition-colors"><ChevronLeft size={18} /></button>
              <button className="p-1.5 hover:bg-zinc-800 rounded-lg text-zinc-600 transition-colors"><ChevronRight size={18} /></button>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-zinc-100 text-zinc-950 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white transition-all shadow-md">
              Schedule Sync
            </button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-7 min-h-0">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="px-4 py-2.5 text-center border-b border-r border-zinc-800/40 bg-black/40">
              <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">{day}</span>
            </div>
          ))}
          {days.map((day, i) => (
            <div key={i} className={`min-h-[100px] p-3 border-b border-r border-zinc-800/40 transition-colors hover:bg-zinc-800/20 group relative ${day === null ? 'bg-zinc-950/40' : ''}`}>
              {day && (
                <>
                  <div className={`text-xs font-bold mb-2 flex items-center justify-center w-6 h-6 rounded-full transition-all ${day === 15 ? 'bg-white text-black shadow-lg' : 'text-zinc-500 group-hover:text-zinc-200'}`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {events.filter(e => e.day === day).map((event, j) => (
                      <button 
                        key={j} 
                        onClick={() => setSelectedEvent(event)}
                        className="w-full text-left text-[9px] p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold border-l-2 border-white truncate transition-all"
                      >
                        {event.time} • {event.title}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel for Event Details */}
      {selectedEvent && (
        <div className="w-[30%] min-w-[350px] bg-black backdrop-blur-xl border border-zinc-900 shadow-2xl rounded-3xl p-6 flex flex-col animate-in slide-in-from-right duration-500">
          <div className="flex items-start justify-between mb-6">
            <h3 className="text-xl font-bold text-white tracking-tight">{selectedEvent.title}</h3>
            <button 
              onClick={() => setSelectedEvent(null)}
              className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6 overflow-y-auto flex-1 pr-2">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Clock size={16} />
              <span>{monthNames[currentDate.getMonth()]} {selectedEvent.day}, {selectedEvent.time}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${selectedEvent.priority === 'High' ? 'bg-red-500/10 border-red-500/20 text-red-500' : selectedEvent.priority === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-500'}`}>
                {selectedEvent.priority} Priority
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-800 border border-zinc-700 text-zinc-400 capitalize">
                {selectedEvent.type}
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider flex items-center gap-2">
                <AlignLeft size={12} /> Description
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

             <div>
              <div className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider flex items-center gap-2">
                <Video size={12} /> Meeting Link
              </div>
              <a href={`https://${selectedEvent.meetLink}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors p-3 bg-blue-500/5 rounded-xl border border-blue-500/10 group">
                <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 group-hover:bg-blue-500/30 transition-colors">
                    <Video size={16} />
                </div>
                <span className="font-medium truncate flex-1">{selectedEvent.meetLink}</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                <div className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider">Created By</div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-800/50 border border-zinc-800">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white">
                        {selectedEvent.creator.name.charAt(0)}
                    </div>
                    <div className="text-xs font-medium text-zinc-200">{selectedEvent.creator.name}</div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-zinc-500 mb-2 uppercase tracking-wider flex items-center gap-2">
                <Users size={12} /> Attendees ({selectedEvent.attendees.length})
              </div>
              <div className="space-y-2">
                {selectedEvent.attendees.map((attendee, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 hover:bg-zinc-800/30 rounded-lg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-400">
                      {attendee.name.charAt(0)}
                    </div>
                    <span className="text-sm text-zinc-300">{attendee.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-zinc-800 flex gap-2">
             <button className="flex-1 bg-white text-black py-2.5 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors">
                Join Meeting
             </button>
             <button className="px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors">
                <Link size={18} />
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
