import type { AreaId } from '../../types';

export interface AreaStyle {
  text: string;
  softBg: string;
  border: string;
  solid: string;
  solidHover: string;
  ring: string;
  gradient: string;
  glow: string;
}

/** Clases literales por área: el escáner de Tailwind las detecta, nada dinámico. */
export const AREA_STYLES: Record<AreaId, AreaStyle> = {
  lenguaje: {
    text: 'text-teal-300',
    softBg: 'bg-teal-400/10',
    border: 'border-teal-400/30',
    solid: 'bg-teal-500',
    solidHover: 'hover:bg-teal-400',
    ring: 'ring-teal-400/40',
    gradient: 'from-teal-400 to-emerald-500',
    glow: 'shadow-teal-400/30',
  },
  memoria: {
    text: 'text-violet-300',
    softBg: 'bg-violet-400/10',
    border: 'border-violet-400/30',
    solid: 'bg-violet-500',
    solidHover: 'hover:bg-violet-400',
    ring: 'ring-violet-400/40',
    gradient: 'from-violet-400 to-fuchsia-500',
    glow: 'shadow-violet-400/30',
  },
  atencion: {
    text: 'text-amber-300',
    softBg: 'bg-amber-400/10',
    border: 'border-amber-400/30',
    solid: 'bg-amber-500',
    solidHover: 'hover:bg-amber-400',
    ring: 'ring-amber-400/40',
    gradient: 'from-amber-400 to-orange-500',
    glow: 'shadow-amber-400/30',
  },
};

export const STAR_GRADIENT = 'from-amber-300 via-amber-400 to-orange-500';
