import React, { useState } from 'react';
import { IDENTIFICA_LEVELS, GAMES_META, getLevelCount } from '../../data/gamesData';
import { CheckSquare, Square } from 'lucide-react';
import { playClick, playCorrect, playError } from '../../utils/sound';
import { shuffleArray } from '../../utils/shuffle';
import { GameShell } from '../ui/GameShell';
import type { FeedbackState } from '../../types';

interface IdentificaGameProps {
  levelNumber: number;
  onWin: (points: number) => void;
  onReturnToLevels: () => void;
}

export const IdentificaGame: React.FC<IdentificaGameProps> = ({
  levelNumber,
  onWin,
  onReturnToLevels,
}) => {
  const levelData = IDENTIFICA_LEVELS[levelNumber - 1] ?? IDENTIFICA_LEVELS[0];
  const meta = GAMES_META.identifica;

  // Track checked state for each of the 4 items
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  // Las tarjetas se mezclan en cada partida para variar la posición de cada objeto.
  const [shuffledItems] = useState(() => shuffleArray(levelData.items));

  const toggleCheck = (itemId: string) => {
    playClick();
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleVerify = () => {
    playClick();
    const allCorrect = levelData.items.every(item => {
      const isChecked = !!checkedItems[item.id];
      return isChecked === item.isCorrect;
    });

    if (allCorrect) {
      playCorrect();
      setFeedback({ text: `¡Perfecto! Has ganado ${levelData.points} puntos.`, kind: 'success' });
      setTimeout(() => {
        onWin(levelData.points);
      }, 700);
    } else {
      playError();
      setFeedback({
        text: 'Lo siento, respuesta incorrecta. Revisa con atención las opciones marcadas e intenta de nuevo.',
        kind: 'error',
      });
    }
  };

  const handleReset = () => {
    playClick();
    setCheckedItems({});
    setFeedback(null);
  };

  return (
    <GameShell
      backId="btn_identifica_back_levels"
      resetId="btn_identifica_reset"
      feedbackId="identifica_feedback_banner"
      levelNumber={levelNumber}
      totalLevels={getLevelCount('identifica')}
      title="Identifica"
      area={meta.area}
      areaLabel={meta.areaLabel}
      instruction={levelData.taskText}
      feedback={feedback}
      onBack={() => { playClick(); onReturnToLevels(); }}
      onReset={handleReset}
      resetLabel="Reiniciar"
      verify={{ id: 'btn_verificar_identifica', label: 'VERIFICAR RESPUESTAS', onClick: handleVerify }}
    >
      {/* 4 Cards Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {shuffledItems.map((item) => {
          const isChecked = !!checkedItems[item.id];

          return (
            <button
              key={item.id}
              id={`identifica_item_${item.id}`}
              onClick={() => toggleCheck(item.id)}
              aria-pressed={isChecked}
              className={`p-3.5 sm:p-5 rounded-3xl border transition-all cursor-pointer select-none flex flex-col items-center justify-between text-center active:scale-[0.98] ${
                isChecked
                  ? 'bg-amber-400/15 border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.25)] ring-2 ring-amber-300/50'
                  : 'bg-white/[0.04] border-white/10 hover:border-white/30 hover:bg-white/[0.07]'
              }`}
            >
              {/* Item visual */}
              <span className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-indigo-400/25 to-teal-400/15 border border-white/15 mb-2 sm:mb-3 flex items-center justify-center text-5xl sm:text-6xl" aria-hidden="true">
                {item.emoji}
              </span>

              {/* Checkbox and Label */}
              <span className="flex items-center gap-2 mt-auto">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-amber-300 shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-slate-500 shrink-0" />
                )}
                <span className="text-sm sm:text-base font-extrabold text-slate-50 leading-tight">
                  {item.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </GameShell>
  );
};
