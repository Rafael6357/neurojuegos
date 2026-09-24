import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, RotateCcw, LayoutGrid, Sparkles } from 'lucide-react';
import { playClick, playVictory } from '../utils/sound';
import { Modal } from './ui/Modal';
import { Mascot } from './ui/Mascot';
import { Stars } from './ui/Progress';

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
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#fbbf24', '#2dd4bf', '#a78bfa', '#fb7185', '#f97316'],
        });
      } catch {
        // Safe fallback
      }
    }
  }, [isOpen]);

  return (
    <Modal
      id="victoria_modal_card"
      open={isOpen}
      onClose={onReturnToLevels}
      title="¡VICTORIA!"
      subtitle={`¡Completaste el Nivel ${levelNumber}! Nebo está orgulloso de ti.`}
      icon={<Mascot mood="cheer" className="w-10 h-10" />}
      closeId="btn_victoria_close"
    >
      <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-center overflow-y-auto">
        <div className="anim-floaty mx-auto w-fit mb-3">
          <Mascot mood="cheer" className="w-24 h-24 drop-shadow-[0_0_24px_rgba(251,191,36,0.5)]" />
        </div>

        <Stars count={3} className="mb-3" />

        {/* Points box */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-amber-400/10 border border-amber-400/40 text-amber-300 font-black text-base mb-6 shadow-[0_0_20px_rgba(251,191,36,0.2)]">
          <Sparkles className="w-4 h-4" />
          <span>+{pointsEarned} Puntos Ganados</span>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          {hasNextLevel && (
            <button
              id="btn_victoria_next_level"
              onClick={() => { playClick(); onNextLevel(); }}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-b from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-indigo-950 font-black text-base shadow-[0_6px_20px_rgba(251,191,36,0.35)] active:scale-[0.98] transition cursor-pointer border border-amber-200/60"
            >
              <span>Siguiente Nivel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            <button
              id="btn_victoria_repeat"
              onClick={() => { playClick(); onRepeatLevel(); }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-100 font-bold text-sm active:scale-[0.98] transition border border-white/15 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-300" />
              <span>Repetir</span>
            </button>

            <button
              id="btn_victoria_to_levels"
              onClick={() => { playClick(); onReturnToLevels(); }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-violet-400 to-fuchsia-500 hover:brightness-110 text-white font-bold text-sm shadow-lg shadow-violet-500/30 active:scale-[0.98] transition cursor-pointer border border-white/20"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Niveles</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
