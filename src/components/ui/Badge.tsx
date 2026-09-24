import React from 'react';

export type BadgeTone = 'amber' | 'teal' | 'violet' | 'rose' | 'slate';

interface BadgeProps {
  id?: string;
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}

const TONES: Record<BadgeTone, string> = {
  amber: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
  teal: 'bg-teal-400/10 text-teal-300 border-teal-400/30',
  violet: 'bg-violet-400/10 text-violet-300 border-violet-400/30',
  rose: 'bg-rose-400/10 text-rose-300 border-rose-400/30',
  slate: 'bg-white/10 text-slate-300 border-white/15',
};

export const Badge: React.FC<BadgeProps> = ({ id, tone = 'slate', className = '', children }) => {
  return (
    <span
      id={id}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
};
