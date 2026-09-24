import React, { useEffect, useState } from 'react';
import { Mascot } from './ui/Mascot';
import { ProgressBar } from './ui/Progress';

interface CosmicLoaderProps {
  message?: string;
  submessage?: string;
  duration?: number; // duration in ms, default 1500ms
  onComplete?: () => void;
  fullScreen?: boolean;
}

/** Pantalla de carga cósmica con Nebo: sustituye al WalkingDonutLoader. */
export const CosmicLoader: React.FC<CosmicLoaderProps> = ({
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
      setProgress(prev => {
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
          ? 'fixed inset-0 z-50 flex flex-col items-center justify-center cosmos'
          : 'w-full py-12 flex flex-col items-center justify-center cosmos'
      } text-slate-100 select-none p-6`}
      role="status"
      aria-label="Cargando juego"
    >
      <div className="anim-floaty relative mb-6">
        <div className="absolute inset-0 rounded-full bg-amber-400/25 blur-2xl anim-glow" aria-hidden="true" />
        <Mascot mood="happy" className="relative w-28 h-28 drop-shadow-[0_0_24px_rgba(251,191,36,0.45)]" />
      </div>

      <h2 className="text-xl sm:text-2xl font-black tracking-tight text-center">{message}</h2>
      <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1 text-center">{submessage}</p>

      <div className="w-full max-w-xs mt-6">
        <ProgressBar value={Math.min(progress, 100)} max={100} gradient="from-amber-300 to-orange-500" />
        <p className="text-center text-xs font-black text-amber-300 mt-2">{Math.round(Math.min(progress, 100))}%</p>
      </div>
    </div>
  );
};
