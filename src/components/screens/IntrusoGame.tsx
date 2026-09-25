import React, { useState } from 'react';
import { INTRUSO_LEVELS, IntrusoLevel, GAMES_META, getLevelCount } from '../../data/gamesData';
import { playCorrect, playError, playClick } from '../../utils/sound';
import { shuffleArray } from '../../utils/shuffle';
import { Sparkles, AlertCircle } from 'lucide-react';
import { GameShell } from '../ui/GameShell';
import type { FeedbackState } from '../../types';

interface IntrusoGameProps {
  levelNumber: number;
  onWin: (points: number) => void;
  onReturnToLevels: () => void;
}

export const IntrusoGame: React.FC<IntrusoGameProps> = ({
  levelNumber,
  onWin,
  onReturnToLevels,
}) => {
  const currentLevelData: IntrusoLevel =
    INTRUSO_LEVELS[levelNumber - 1] ?? INTRUSO_LEVELS[0];
  const meta = GAMES_META.intruso;

  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Los candidatos se mezclan en cada partida: el intruso no queda fijo por posición.
  const [shuffledItems] = useState(() => shuffleArray(currentLevelData.items));
  const locked = feedback?.kind === 'success';

  const handleItemClick = (item: { id: string; name: string; isIntruder: boolean }) => {
    if (locked) return;
    playClick();
    setSelectedId(item.id);

    if (item.isIntruder) {
      playCorrect();
      setFeedback({ text: `¡Correcto! ${currentLevelData.explanation}`, kind: 'success' });

      setTimeout(() => {
        onWin(currentLevelData.points);
      }, 1500);
    } else {
      playError();
      setFeedback({ text: `"${item.name}" sí pertenece a la categoría: ${currentLevelData.categoryRule}. ¡Busca el que es diferente!`, kind: 'error' });

      setTimeout(() => {
        setFeedback(current => (current?.kind === 'error' ? null : current));
        setSelectedId(current => current);
      }, 1800);
    }
  };

  return (
    <GameShell
      backId="btn_intruso_back_levels"
      feedbackId="intruso_feedback_banner"
      levelNumber={levelNumber}
      totalLevels={getLevelCount('intruso')}
      title="Encuentra el Intruso"
      area={meta.area}
      areaLabel="Atención y Clasificación: Encuentra el Intruso"
      instruction={`Observa los elementos. Uno no pertenece al grupo: ${currentLevelData.categoryRule}. ¿Cuál es?`}
      feedback={feedback}
      onBack={() => { playClick(); onReturnToLevels(); }}
    >
      {/* Items Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {shuffledItems.map((item) => {
          const isSelected = selectedId === item.id;

          return (
            <button
              key={item.id}
              id={`intruso_item_${item.id}`}
              disabled={locked}
              onClick={() => handleItemClick(item)}
              aria-label={`Elegir ${item.name}`}
              className={`aspect-square sm:aspect-auto sm:min-h-[160px] rounded-3xl p-4 sm:p-5 border transition-all active:scale-95 flex flex-col items-center justify-center cursor-pointer select-none disabled:cursor-default ${
                isSelected && feedback?.kind === 'success'
                  ? 'bg-emerald-400/15 border-2 border-emerald-300 ring-2 ring-emerald-300/50 shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                  : isSelected
                  ? 'bg-rose-400/15 border-2 border-rose-300 ring-2 ring-rose-300/50'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 hover:border-amber-300/60'
              }`}
            >
              <span className="text-5xl sm:text-6xl md:text-7xl drop-shadow mb-1.5 sm:mb-2 transition-transform" role="img" aria-label={item.name}>
                {item.emoji}
              </span>
              <span className="text-sm sm:text-base font-extrabold text-slate-50 tracking-tight leading-tight">
                {item.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-wider">
                Toca para elegir
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback icon row (el banner lo pinta GameShell) */}
      {feedback && (
        <div className="flex justify-center" aria-hidden="true">
          {feedback.kind === 'success' ? (
            <Sparkles className="w-6 h-6 text-emerald-300 anim-pop-in" />
          ) : (
            <AlertCircle className="w-6 h-6 text-rose-300 anim-pop-in" />
          )}
        </div>
      )}
    </GameShell>
  );
};
