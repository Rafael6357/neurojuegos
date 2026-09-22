import React, { useEffect, useState } from 'react';

interface WalkingDonutLoaderProps {
  message?: string;
  submessage?: string;
  duration?: number; // duration in ms, default 1500ms
  onComplete?: () => void;
  fullScreen?: boolean;
}

export const WalkingDonutLoader: React.FC<WalkingDonutLoaderProps> = ({
  message = 'Cargando el juego...',
  submessage = '¡Preparando diversión para tu mente!',
  duration = 1400,
  onComplete,
  fullScreen = true,
}) => {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // In test environment, complete immediately
    if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
      if (onComplete) onComplete();
      return;
    }

    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 100);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [duration, onComplete]);

  return (
    <div
      id="screen_simulated_loading"
      className={`${
        fullScreen
          ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#131722]'
          : 'w-full py-12 flex flex-col items-center justify-center bg-[#131722]'
      } text-slate-100 select-none p-6`}
      role="status"
      aria-label="Cargando juego con dona animada"
    >
      {/* Walking Donut Character Visual Container */}
      <div className="relative flex flex-col items-center justify-center mb-6">
        {/* Glow behind donut */}
        <div className="absolute w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* SVG Walking Donut */}
        <div className="relative w-44 h-48 sm:w-52 sm:h-56 flex items-center justify-center">
          <svg
            viewBox="0 0 200 240"
            className="w-full h-full overflow-visible drop-shadow-xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ground Shadow */}
            <ellipse
              cx="100"
              cy="218"
              rx="48"
              ry="9"
              fill="#0A0D14"
              opacity="0.6"
              className="donut-shadow-anim"
            />

            {/* Walking Dust Puff Particles */}
            <circle cx="58" cy="214" r="4" fill="#334155" opacity="0.5" className="dust-puff-1" />
            <circle cx="50" cy="218" r="3" fill="#475569" opacity="0.4" className="dust-puff-2" />
            <circle cx="146" cy="216" r="3.5" fill="#334155" opacity="0.4" className="dust-puff-3" />

            {/* LEFT LEG (Back / swings back & forth) */}
            <g className="donut-leg-left-anim" style={{ transformOrigin: '76px 165px' }}>
              {/* Leg limb */}
              <path
                d="M 76 165 C 74 182, 70 196, 68 206"
                stroke="#E2E8F0"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Sock stripe */}
              <path
                d="M 70 197 L 68 203"
                stroke="#F59E0B"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Shoe (Red/Amber sneaker) */}
              <ellipse cx="64" cy="210" rx="14" ry="7" fill="#EF4444" />
              <path d="M 54 210 L 76 210 L 74 214 L 54 214 Z" fill="#FFFFFF" />
              <circle cx="70" cy="208" r="2" fill="#FFFFFF" />
            </g>

            {/* RIGHT LEG (Front / swings oppositely) */}
            <g className="donut-leg-right-anim" style={{ transformOrigin: '124px 165px' }}>
              {/* Leg limb */}
              <path
                d="M 124 165 C 126 182, 130 196, 132 206"
                stroke="#E2E8F0"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Sock stripe */}
              <path
                d="M 130 197 L 132 203"
                stroke="#F59E0B"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Shoe (Red/Amber sneaker) */}
              <ellipse cx="136" cy="210" rx="14" ry="7" fill="#EF4444" />
              <path d="M 126 210 L 148 210 L 146 214 L 126 214 Z" fill="#FFFFFF" />
              <circle cx="132" cy="208" r="2" fill="#FFFFFF" />
            </g>

            {/* MAIN DONUT BODY (Bobs up and down with walking rhythm) */}
            <g className="donut-body-anim" style={{ transformOrigin: '100px 105px' }}>
              {/* Dough (Golden Brown base) */}
              <circle
                cx="100"
                cy="105"
                r="64"
                fill="#E89A3C"
                stroke="#B4691B"
                strokeWidth="4"
              />
              {/* Dough bottom shading */}
              <path
                d="M 42 135 C 55 162, 145 162, 158 135 C 164 125, 164 105, 164 105 C 164 140, 136 168, 100 168 C 64 168, 36 140, 36 105 C 36 105, 36 125, 42 135 Z"
                fill="#C97A24"
                opacity="0.6"
              />

              {/* Frosting (Delicious Strawberry Pink with wavy drips) */}
              <path
                d="M 40 100 
                   C 38 72, 60 48, 100 48 
                   C 140 48, 162 72, 160 100 
                   C 158 116, 148 118, 142 110 
                   C 136 102, 130 126, 122 124 
                   C 114 122, 108 112, 100 114 
                   C 92 116, 86 128, 76 126 
                   C 66 124, 62 108, 54 112 
                   C 46 116, 42 114, 40 100 Z"
                fill="#FB7185"
                stroke="#E11D48"
                strokeWidth="3.5"
              />
              {/* Glossy frosting highlight */}
              <path
                d="M 64 62 C 80 54, 120 54, 136 62"
                stroke="#FDA4AF"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* DONUT HOLE */}
              {/* Hole Dough Backing */}
              <ellipse cx="100" cy="105" rx="20" ry="18" fill="#131722" stroke="#B4691B" strokeWidth="3" />
              {/* Hole inner shade */}
              <path
                d="M 80 105 C 80 96, 120 96, 120 105 C 120 100, 80 100, 80 105 Z"
                fill="#0A0D14"
                opacity="0.7"
              />

              {/* COLORFUL SPRINKLES */}
              {/* Yellow sprinkles */}
              <rect x="62" y="78" width="10" height="4" rx="2" fill="#FDE047" transform="rotate(-25 62 78)" />
              <rect x="130" y="80" width="10" height="4" rx="2" fill="#FDE047" transform="rotate(30 130 80)" />
              <rect x="74" y="112" width="9" height="3.5" rx="1.7" fill="#FDE047" transform="rotate(15 74 112)" />

              {/* Blue sprinkles */}
              <rect x="85" y="60" width="10" height="4" rx="2" fill="#38BDF8" transform="rotate(10 85 60)" />
              <rect x="138" y="104" width="9" height="3.5" rx="1.7" fill="#38BDF8" transform="rotate(-40 138 104)" />

              {/* White sprinkles */}
              <rect x="110" y="62" width="10" height="3.5" rx="1.7" fill="#FFFFFF" transform="rotate(-15 110 62)" />
              <rect x="52" y="96" width="9" height="3.5" rx="1.7" fill="#FFFFFF" transform="rotate(50 52 96)" />

              {/* Mint green sprinkles */}
              <rect x="122" y="68" width="9" height="3.5" rx="1.7" fill="#34D399" transform="rotate(45 122 68)" />
              <rect x="70" y="92" width="9" height="3.5" rx="1.7" fill="#34D399" transform="rotate(-60 70 92)" />

              {/* KAWAII EYES & FACE */}
              {/* Left Eye */}
              <circle cx="82" cy="94" r="5" fill="#1E293B" />
              <circle cx="80.5" cy="92.5" r="1.8" fill="#FFFFFF" />
              <circle cx="83.5" cy="95.5" r="0.8" fill="#FFFFFF" />

              {/* Right Eye */}
              <circle cx="118" cy="94" r="5" fill="#1E293B" />
              <circle cx="116.5" cy="92.5" r="1.8" fill="#FFFFFF" />
              <circle cx="119.5" cy="95.5" r="0.8" fill="#FFFFFF" />

              {/* Rosy Cheeks */}
              <ellipse cx="74" cy="100" rx="4" ry="2.5" fill="#F43F5E" opacity="0.65" />
              <ellipse cx="126" cy="100" rx="4" ry="2.5" fill="#F43F5E" opacity="0.65" />

              {/* Cheerful Smile */}
              <path
                d="M 95 101 Q 100 106 105 101"
                stroke="#1E293B"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />

              {/* LEFT ARM (Swinging excitedly) */}
              <g className="donut-arm-left-anim" style={{ transformOrigin: '42px 105px' }}>
                <path
                  d="M 42 105 C 32 98, 26 104, 22 100"
                  stroke="#E89A3C"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="99" r="4.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
              </g>

              {/* RIGHT ARM (Swinging excitedly) */}
              <g className="donut-arm-right-anim" style={{ transformOrigin: '158px 105px' }}>
                <path
                  d="M 158 105 C 168 98, 174 104, 178 100"
                  stroke="#E89A3C"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                />
                <circle cx="180" cy="99" r="4.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Loading Text & Status */}
      <div className="w-full max-w-xs sm:max-w-sm text-center space-y-3">
        <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
          {message}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-medium">
          {submessage}
        </p>

        {/* Progress Bar with Eye-Friendly Amber/Emerald Glow */}
        <div className="w-full bg-slate-800/90 rounded-full h-3.5 p-0.5 border border-slate-700/80 shadow-inner overflow-hidden relative">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(245,158,11,0.5)]"
            style={{ width: `${Math.min(100, Math.max(8, progress))}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 px-1">
          <span>Preparando estímulos</span>
          <span className="text-amber-400 font-extrabold">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
};
