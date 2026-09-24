import React from 'react';
import type { AreaId } from '../../types';
import { AREA_STYLES, STAR_GRADIENT } from './accent';

export type ButtonVariant = 'star' | 'area' | 'soft' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  id?: string;
  variant?: ButtonVariant;
  tone?: AreaId;
  size?: ButtonSize;
  type?: 'button' | 'submit';
  disabled?: boolean;
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'py-2 px-3.5 text-xs gap-1.5 rounded-xl',
  md: 'py-3 px-5 text-sm gap-2 rounded-2xl',
  lg: 'py-3.5 px-6 text-base gap-2.5 rounded-2xl',
};

export const Button: React.FC<ButtonProps> = ({
  id,
  variant = 'soft',
  tone = 'atencion',
  size = 'md',
  type = 'button',
  disabled = false,
  title,
  onClick,
  className = '',
  icon,
  children,
}) => {
  const area = AREA_STYLES[tone];

  const variantClass: string =
    variant === 'star'
      ? `bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-indigo-950 shadow-[0_6px_20px_rgba(251,191,36,0.35)] border border-amber-200/60`
      : variant === 'area'
        ? `bg-gradient-to-r ${area.gradient} text-white shadow-lg ${area.glow} border border-white/20 hover:brightness-110`
        : variant === 'success'
          ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 border border-emerald-300/40'
          : variant === 'danger'
            ? 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 border border-rose-400/40'
            : variant === 'ghost'
              ? 'bg-transparent hover:bg-white/10 text-slate-200 border border-transparent'
              : 'bg-white/10 hover:bg-white/15 text-slate-100 border border-white/15';

  return (
    <button
      id={id}
      type={type}
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-extrabold transition active:scale-[0.97] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${SIZES[size]} ${variantClass} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
};
