import React from 'react';
import { Star } from 'lucide-react';

/* Anchos cuantizados en pasos del 5%: clases literales para que Tailwind los genere. */
const WIDTHS = [
  'w-0', 'w-[5%]', 'w-[10%]', 'w-[15%]', 'w-[20%]', 'w-[25%]', 'w-[30%]',
  'w-[35%]', 'w-[40%]', 'w-[45%]', 'w-[50%]', 'w-[55%]', 'w-[60%]',
  'w-[65%]', 'w-[70%]', 'w-[75%]', 'w-[80%]', 'w-[85%]', 'w-[90%]',
  'w-[95%]', 'w-full',
];

export function widthClassFor(fraction: number): string {
  const clamped = Math.max(0, Math.min(1, fraction));
  return WIDTHS[Math.round(clamped * 20)];
}

interface ProgressBarProps {
  id?: string;
  value: number;
  max: number;
  gradient?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  id,
  value,
  max,
  gradient = 'from-amber-300 to-orange-500',
  className = '',
}) => {
  return (
    <div
      id={id}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.min(value, max)}
      className={`h-2.5 rounded-full bg-white/10 border border-white/10 overflow-hidden ${className}`}
    >
      <div className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-500 ${widthClassFor(max > 0 ? value / max : 0)}`} />
    </div>
  );
};

interface ProgressRingProps {
  id?: string;
  value: number;
  max: number;
  size?: 'sm' | 'md' | 'lg';
  stroke?: string;
  track?: string;
  children?: React.ReactNode;
}

const RING_SIZES = {
  sm: { box: 'w-10 h-10', px: 40 },
  md: { box: 'w-14 h-14', px: 56 },
  lg: { box: 'w-[72px] h-[72px]', px: 72 },
} as const;

/** Anillo SVG (atributos de presentación, sin estilos en línea). */
export const ProgressRing: React.FC<ProgressRingProps> = ({
  id,
  value,
  max,
  size = 'md',
  stroke = '#fbbf24',
  track = 'rgba(255,255,255,0.12)',
  children,
}) => {
  const r = 22;
  const c = 2 * Math.PI * r;
  const frac = max > 0 ? Math.max(0, Math.min(1, value / max)) : 0;
  const px = RING_SIZES[size].px;
  return (
    <div id={id} className={`relative inline-flex items-center justify-center ${RING_SIZES[size].box}`}>
      <svg width={px} height={px} viewBox="0 0 56 56" className="-rotate-90">
        <circle cx="28" cy="28" r={r} fill="none" stroke={track} strokeWidth="7" />
        <circle
          cx="28" cy="28" r={r} fill="none" stroke={stroke}
          strokeWidth="7" strokeLinecap="round"
          strokeDasharray={c.toFixed(1)} strokeDashoffset={(c * (1 - frac)).toFixed(1)}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
};

interface StarsProps {
  id?: string;
  count?: 1 | 2 | 3;
  className?: string;
}

export const Stars: React.FC<StarsProps> = ({ id, count = 3, className = '' }) => {
  return (
    <div id={id} className={`flex items-center justify-center gap-1.5 ${className}`} aria-label={`${count} de 3 estrellas`}>
      {[1, 2, 3].map(i => (
        <Star
          key={i}
          className={i <= count ? 'w-7 h-7 text-amber-300 fill-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'w-6 h-6 text-slate-600'}
        />
      ))}
    </div>
  );
};
