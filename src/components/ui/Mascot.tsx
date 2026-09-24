import React from 'react';

export type MascotMood = 'happy' | 'cheer' | 'thinking' | 'sleep';

interface MascotProps {
  id?: string;
  mood?: MascotMood;
  className?: string;
}

/**
 * Nebo: la mascota neurona-estrella de NeuroJuegos (SVG 100% propio).
 * El ancla memorable de la marca: aparece en inicio, carga y victoria.
 */
export const Mascot: React.FC<MascotProps> = ({ id, mood = 'happy', className = '' }) => {
  const mouth =
    mood === 'cheer' ? (
      <path d="M42 62 Q58 78 74 62" stroke="#0b1130" strokeWidth="5" strokeLinecap="round" fill="none" />
    ) : mood === 'thinking' ? (
      <path d="M46 68 Q58 62 70 68" stroke="#0b1130" strokeWidth="5" strokeLinecap="round" fill="none" />
    ) : mood === 'sleep' ? (
      <path d="M48 66 L68 66" stroke="#0b1130" strokeWidth="5" strokeLinecap="round" />
    ) : (
      <path d="M44 62 Q58 74 72 62" stroke="#0b1130" strokeWidth="5" strokeLinecap="round" fill="none" />
    );

  const eyes =
    mood === 'sleep' ? (
      <>
        <path d="M38 48 L50 48" stroke="#0b1130" strokeWidth="5" strokeLinecap="round" />
        <path d="M66 48 L78 48" stroke="#0b1130" strokeWidth="5" strokeLinecap="round" />
      </>
    ) : (
      <>
        <circle cx="44" cy="48" r="6.5" fill="#0b1130" />
        <circle cx="72" cy="48" r="6.5" fill="#0b1130" />
        <circle cx="46" cy="46" r="2.2" fill="#fff" />
        <circle cx="74" cy="46" r="2.2" fill="#fff" />
      </>
    );

  return (
    <svg
      id={id}
      viewBox="0 0 116 116"
      role="img"
      aria-label="Nebo, la mascota de NeuroJuegos"
      className={className}
    >
      {/* Dendritas */}
      <g stroke="#a78bfa" strokeWidth="5" strokeLinecap="round" opacity="0.9">
        <line x1="58" y1="10" x2="58" y2="26" />
        <line x1="20" y1="34" x2="32" y2="42" />
        <line x1="96" y1="34" x2="84" y2="42" />
        <line x1="14" y1="80" x2="28" y2="74" />
        <line x1="102" y1="80" x2="88" y2="74" />
      </g>
      <g fill="#2dd4bf">
        <circle cx="58" cy="8" r="5" />
        <circle cx="18" cy="32" r="5" />
        <circle cx="98" cy="32" r="5" />
        <circle cx="12" cy="82" r="5" />
        <circle cx="104" cy="82" r="5" />
      </g>
      {/* Cuerpo estrella */}
      <path
        d="M58 22 L70 48 L98 50 L76 68 L83 96 L58 80 L33 96 L40 68 L18 50 L46 48 Z"
        fill="url(#neboBody)"
        stroke="#fde68a"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="neboBody" x1="18" y1="22" x2="98" y2="96" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fde68a" />
          <stop offset="0.55" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f97316" />
        </linearGradient>
      </defs>
      {/* Mejillas */}
      <circle cx="34" cy="60" r="5" fill="#fb7185" opacity="0.55" />
      <circle cx="82" cy="60" r="5" fill="#fb7185" opacity="0.55" />
      {eyes}
      {mouth}
      {mood === 'cheer' && (
        <g stroke="#fbbf24" strokeWidth="4" strokeLinecap="round">
          <line x1="8" y1="12" x2="14" y2="20" />
          <line x1="108" y1="12" x2="102" y2="20" />
        </g>
      )}
    </svg>
  );
};
