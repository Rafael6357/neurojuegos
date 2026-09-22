import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Star, ArrowRight, RotateCcw, ListFilter } from 'lucide-react';
import { playClick, playVictory } from '../utils/sound';

interface VictoriaModalProps {
  isOpen: boolean;
  levelNumber: number;
  pointsEarned: number;
  onNextLevel: () => void;
  onRepeatLevel: () => void;
  onReturnToLevels: () => void;
  hasNextLevel: boolean;
}

export const VictoriaModal: React.FC<VictoriaModalProps> = ({
  isOpen,
  levelNumber,
  pointsEarned,
  onNextLevel,
  onRepeatLevel,
  onReturnToLevels,
  hasNextLevel,
}) => {
  useEffect(() => {
    if (isOpen) {
      playVictory();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#fbbf24']
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in zoom-in-95 duration-200">
      <div 
        id="victoria_modal_card"
        className="w-full max-w-md bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 border-4 border-amber-500 rounded-3xl shadow-2xl p-6 sm:p-8 text-center relative overflow-hidden"
      >
        {/* Background decorative glow */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-yellow-300/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-orange-400/30 rounded-full blur-2xl pointer-events-none" />

        {/* Trophy icon */}
        <div className="relative mx-auto w-24 h-24 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-25" />
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-lg border-4 border-white">
            <Trophy className="w-10 h-10 text-amber-900 drop-shadow-md animate-bounce" />
          </div>
        </div>

        {/* 3 Golden Stars */}
        <div className="flex justify-center gap-2 mb-3">
          <Star className="w-8 h-8 text-amber-400 fill-amber-400 drop-shadow-xs" />
          <Star className="w-10 h-10 text-yellow-400 fill-yellow-400 -mt-2 drop-shadow-sm animate-pulse" />
          <Star className="w-8 h-8 text-amber-400 fill-amber-400 drop-shadow-xs" />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-black text-amber-900 tracking-wide mb-1">
          ¡VICTORIA!
        </h2>
        <p className="text-amber-800 font-bold text-base mb-2">
          ¡Completaste el Nivel {levelNumber}!
        </p>

        {/* Points box */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-amber-200/80 border-2 border-amber-400 text-amber-950 font-black text-lg mb-6 shadow-xs">
          <span>+{pointsEarned} Puntos Ganados</span>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {hasNextLevel && (
            <button
              id="btn_victoria_next_level"
              onClick={() => { playClick(); onNextLevel(); }}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-lg shadow-lg active:scale-95 transition border-b-4 border-teal-800"
            >
              <span>Siguiente Nivel</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              id="btn_victoria_repeat"
              onClick={() => { playClick(); onRepeatLevel(); }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-sm shadow-md active:scale-95 transition border-b-4 border-amber-600"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Repetir</span>
            </button>

            <button
              id="btn_victoria_to_levels"
              onClick={() => { playClick(); onReturnToLevels(); }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md active:scale-95 transition border-b-4 border-amber-700"
            >
              <ListFilter className="w-4 h-4" />
              <span>Niveles</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
