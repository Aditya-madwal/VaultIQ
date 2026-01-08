
import React from 'react';

interface StatusBadgeProps {
  label: string;
  type?: 'priority' | 'status' | 'default';
  variant?: 'High' | 'Medium' | 'Low' | string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ label, type = 'default', variant }) => {
  const getStyles = () => {
    if (type === 'priority') {
      switch (variant) {
        case 'High': return 'text-red-500 bg-zinc-900 border-red-900/30';
        case 'Medium': return 'text-orange-500 bg-zinc-900 border-orange-900/30';
        case 'Low': return 'text-blue-500 bg-zinc-900 border-blue-900/30';
        default: return 'text-gray-500 bg-zinc-900 border-zinc-800';
      }
    }
    return 'text-gray-400 bg-zinc-900 border-zinc-800';
  };

  return (
    <span className={`px-1.5 py-0.5 rounded font-mono text-[8px] font-black uppercase border ${getStyles()} transition-colors`}>
      {label}
    </span>
  );
};

export default StatusBadge;
