
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MOCK_EMPLOYEES } from '../constants';

const InsightsView: React.FC = () => {
  const chartData = [
    { name: 'Mon', completed: 12, total: 15 },
    { name: 'Tue', completed: 18, total: 20 },
    { name: 'Wed', completed: 15, total: 25 },
    { name: 'Thu', completed: 22, total: 24 },
    { name: 'Fri', completed: 28, total: 30 },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-sm">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8">Task Frequency</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#27272a" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#52525b', fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#52525b', fontWeight: 600}} />
                <Tooltip 
                  cursor={{fill: '#27272a'}}
                  contentStyle={{ backgroundColor: '#000000', borderRadius: '12px', border: '1px solid #27272a', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.8)' }}
                  itemStyle={{ color: '#fafafa', fontSize: '12px' }}
                />
                <Bar dataKey="completed" fill="#ffffff" radius={[2, 2, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 shadow-sm">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-8">Follow-through Trend</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#27272a" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#52525b', fontWeight: 600}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#52525b', fontWeight: 600}} />
                <Tooltip contentStyle={{ backgroundColor: '#000000', borderRadius: '12px', border: '1px solid #27272a', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.8)' }} />
                <Line type="monotone" dataKey="total" stroke="#3f3f46" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="completed" stroke="#ffffff" strokeWidth={2} dot={{ r: 4, fill: '#ffffff', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-3xl border border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-black/20">
          <h3 className="text-sm font-bold text-white tracking-tight">Performance Index</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-[10px] font-bold bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors uppercase tracking-widest">7 Days</button>
            <button className="px-3 py-1.5 text-[10px] font-bold text-zinc-600 hover:text-zinc-300 transition-colors uppercase tracking-widest">30 Days</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/40 text-zinc-500 text-[9px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4 text-left">Employee</th>
                <th className="px-6 py-4 text-center">Speaking %</th>
                <th className="px-6 py-4 text-center">Decisions</th>
                <th className="px-6 py-4 text-center">Tasks Done</th>
                <th className="px-6 py-4 text-center">Attendance</th>
                <th className="px-6 py-4 text-right">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {MOCK_EMPLOYEES.map((employee) => (
                <tr key={employee.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <img src={employee.avatar} alt="" className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 shadow-sm" />
                      <div>
                        <p className="text-sm font-semibold text-zinc-200">{employee.name}</p>
                        <p className="text-[9px] text-zinc-600 uppercase font-bold tracking-tight">{employee.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center text-sm text-zinc-400 font-medium">{employee.speakingTime}%</td>
                  <td className="px-6 py-5 text-center text-sm text-zinc-400 font-medium">{employee.decisions}</td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-zinc-100" style={{ width: `${employee.tasksCompleted}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-zinc-500">{employee.tasksCompleted}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center text-sm text-zinc-400 font-medium">{employee.attendance}%</td>
                  <td className="px-6 py-5 text-right">
                    <div className={`w-2 h-2 rounded-full inline-block ${
                      employee.tasksCompleted > 90 ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 
                      employee.tasksCompleted > 80 ? 'bg-zinc-400' : 
                      'bg-zinc-700'
                    }`}></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsightsView;
