
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Users, Calendar as CalendarIcon, Video } from 'lucide-react';

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 4, 15));

  const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
  for (let i = 1; i <= daysInMonth(currentDate.getMonth(), currentDate.getFullYear()); i++) days.push(i);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const events = [
    { day: 15, title: 'Product Sync', type: 'internal', time: '10:00 AM' },
    { day: 18, title: 'Design Review', type: 'internal', time: '11:00 AM' },
  ];

  return (
    <div className="bg-zinc-900 rounded-3xl border border-zinc-800 shadow-sm flex flex-col h-[calc(100vh-200px)] animate-in fade-in duration-500 overflow-hidden">
      <div className="p-8 border-b border-zinc-800 flex items-center justify-between bg-black/20">
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
                    <div key={j} className="text-[9px] p-1.5 rounded bg-zinc-800 text-zinc-300 font-bold border-l-2 border-white truncate">
                      {event.time} • {event.title}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
