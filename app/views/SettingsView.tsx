
import React from 'react';
import { Bell, Shield, Cloud, CreditCard, Mail, Sliders, Globe, Code } from 'lucide-react';

const SettingsView: React.FC = () => {
  const settingsSections = [
    { label: 'Integrations', icon: Cloud, description: 'Connect Cloud tools.' },
    { label: 'Notifications', icon: Bell, description: 'Manage post-meeting alerts.' },
    { label: 'Privacy', icon: Shield, description: 'Diarization data retention.' },
    { label: 'Billing', icon: CreditCard, description: 'Pro subscription & usage.' },
    { label: 'Workspace', icon: Sliders, description: 'Roles & branding.' },
    { label: 'API', icon: Code, description: 'Keys & webhooks.' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section) => (
          <div key={section.label} className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 shadow-sm hover:border-zinc-500 transition-all cursor-pointer group">
            <div className="flex flex-col gap-4">
              <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center text-zinc-500 group-hover:text-white transition-all border border-zinc-800">
                <section.icon size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-100 group-hover:text-white transition-colors">{section.label}</h3>
                <p className="text-[11px] text-zinc-500 mt-0.5 font-medium leading-relaxed">{section.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 rounded-3xl border border-zinc-800 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-zinc-800 bg-black/10">
          <h3 className="text-sm font-bold text-white tracking-tight">Post-Meeting Automation</h3>
          <p className="text-xs text-zinc-500 mt-1">Global workspace automation triggers.</p>
        </div>
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-bold text-zinc-200">Post Summary to Slack</label>
              <p className="text-xs text-zinc-500">Automatically push AI summaries to linked channels.</p>
            </div>
            <div className="w-10 h-5 bg-zinc-100 rounded-full relative p-0.5 cursor-pointer">
              <div className="w-4 h-4 bg-black rounded-full absolute right-0.5"></div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-bold text-zinc-200">Email All Participants</label>
              <p className="text-xs text-zinc-500">Send follow-up emails immediately after processing.</p>
            </div>
            <div className="w-10 h-5 bg-zinc-800 rounded-full relative p-0.5 cursor-pointer border border-zinc-700">
              <div className="w-4 h-4 bg-zinc-600 rounded-full absolute left-0.5"></div>
            </div>
          </div>
        </div>
        <div className="p-8 bg-black/20 border-t border-zinc-800 flex justify-end">
          <button className="px-6 py-2 bg-white text-black rounded-xl text-xs font-bold hover:bg-zinc-200 transition-all shadow-lg">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
