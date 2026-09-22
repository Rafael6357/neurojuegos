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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in zoom-in-95 duration-200">
      <div 
        id="victoria_modal_card"
        className="w-full max-w-sm bg-white border border-stone-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-6 sm:p-8 text-center relative overflow-hidden"
      >
        {/* Trophy icon */}
        <div className="relative mx-auto w-20 h-20 mb-3 flex items-center justify-center">
          <div className="w-18 h-18 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shadow-xs">
            <Trophy className="w-9 h-9 text-amber-600" />
          </div>
        </div>

        {/* 3 Golden Stars */}
        <div className="flex justify-center gap-2 mb-2">
          <Star className="w-6 h-6 text-amber-400 fill-amber-400 drop-shadow-xs" />
          <Star className="w-8 h-8 text-amber-500 fill-amber-500 -mt-1 drop-shadow-xs" />
          <Star className="w-6 h-6 text-amber-400 fill-amber-400 drop-shadow-xs" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mb-1">
          ¡VICTORIA!
        </h2>
        <p className="text-stone-600 font-bold text-sm mb-3">
          ¡Completaste el Nivel {levelNumber}!
        </p>

        {/* Points box */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-black text-base mb-6 shadow-xs">
          <span>+{pointsEarned} Puntos Ganados</span>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          {hasNextLevel && (
            <button
              id="btn_victoria_next_level"
              onClick={() => { playClick(); onNextLevel(); }}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-xs active:scale-[0.98] transition cursor-pointer"
            >
              <span>Siguiente Nivel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            <button
              id="btn_victoria_repeat"
              onClick={() => { playClick(); onRepeatLevel(); }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm shadow-xs active:scale-[0.98] transition border border-stone-200 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-stone-600" />
              <span>Repetir</span>
            </button>

            <button
              id="btn_victoria_to_levels"
              onClick={() => { playClick(); onReturnToLevels(); }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-xs active:scale-[0.98] transition cursor-pointer"
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
