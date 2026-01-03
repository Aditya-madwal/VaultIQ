import React from 'react';
import { CheckCircle2, Loader2, FileAudio, AlertCircle, CircleDollarSign, RefreshCcw } from 'lucide-react';

interface BadgeProps {
  variant?: 'filled' | 'outlined';
  className?: string;
}

export const PaidBadge: React.FC<BadgeProps> = ({ variant = 'filled', className = '' }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-full px-2.5 py-0.5";
  const colors = variant === 'filled' 
    ? "bg-emerald-100 text-emerald-700" 
    : "border border-emerald-500 text-emerald-700";

  return (
    <span className={`${baseClasses} ${colors} ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="-ms-1 me-1.5 size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <p className="text-sm whitespace-nowrap">Paid</p>
    </span>
  );
};

export const RefundedBadge: React.FC<BadgeProps> = ({ variant = 'filled', className = '' }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-full px-2.5 py-0.5";
  const colors = variant === 'filled' 
    ? "bg-amber-100 text-amber-700" 
    : "border border-amber-500 text-amber-700";

  return (
    <span className={`${baseClasses} ${colors} ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="-ms-1 me-1.5 size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"></path>
      </svg>
      <p className="text-sm whitespace-nowrap">Refunded</p>
    </span>
  );
};

export const FailedBadge: React.FC<BadgeProps> = ({ variant = 'filled', className = '' }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-full px-2.5 py-0.5";
  const colors = variant === 'filled' 
    ? "bg-red-100 text-red-700" 
    : "border border-red-500 text-red-700";

  return (
    <span className={`${baseClasses} ${colors} ${className}`}>
      <AlertCircle size={16} className="-ms-1 me-1.5" />
      <p className="text-sm whitespace-nowrap">Failed</p>
    </span>
  );
};

export const MeetingStatusBadge: React.FC<{ status: 'processed' | 'analyzing' | 'transcribing' } & BadgeProps> = ({ status, variant = 'filled', className = '' }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 border";
  
  const styles = {
    processed: {
      filled: "bg-emerald-100 text-emerald-700 border-transparent",
      outlined: "border-emerald-500 text-emerald-700 bg-transparent"
    },
    analyzing: {
      filled: "bg-blue-100 text-blue-700 border-transparent",
      outlined: "border-blue-500 text-blue-700 bg-transparent"
    },
    transcribing: {
      filled: "bg-purple-100 text-purple-700 border-transparent",
      outlined: "border-purple-500 text-purple-700 bg-transparent"
    }
  };

  const icons = {
    processed: <CheckCircle2 size={14} className="-ms-1 me-1.5" />,
    analyzing: <Loader2 size={14} className="-ms-1 me-1.5 animate-spin" />,
    transcribing: <FileAudio size={14} className="-ms-1 me-1.5 animate-pulse" />
  };

  const selectedStyle = styles[status]?.[variant] || styles.processed.filled;
  const selectedIcon = icons[status] || icons.processed;

  return (
    <span className={`${baseClasses} ${selectedStyle} ${className}`}>
      {selectedIcon}
      <p className="text-[10px] font-bold uppercase tracking-widest">{status}</p>
    </span>
  );
};
