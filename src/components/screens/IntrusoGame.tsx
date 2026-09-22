import React, { useState } from 'react';
import { INTRUSO_LEVELS, IntrusoLevel } from '../../data/gamesData';
import { playClick, playCorrect, playError } from '../../utils/sound';
import { ArrowLeft, Sparkles, AlertCircle, Search } from 'lucide-react';

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
    INTRUSO_LEVELS[(levelNumber - 1) % INTRUSO_LEVELS.length] || INTRUSO_LEVELS[0];

  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleItemClick = (item: { id: string; name: string; isIntruder: boolean }) => {
    if (feedback !== 'idle') return;
    setSelectedId(item.id);

    if (item.isIntruder) {
      playCorrect();
      setFeedback('correct');
      setFeedbackMsg(`¡Correcto! ${currentLevelData.explanation}`);

      setTimeout(() => {
        onWin(currentLevelData.points);
      }, 1500);
    } else {
      playError();
      setFeedback('error');
      setFeedbackMsg(`"${item.name}" sí pertenece a la categoría: ${currentLevelData.categoryRule}. ¡Busca el que es diferente!`);

      setTimeout(() => {
        setFeedback('idle');
        setSelectedId(null);
      }, 1800);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-6 bg-[#FAF8F5] flex flex-col justify-between">
      <div className="max-w-2xl mx-auto w-full space-y-5">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              playClick();
              onReturnToLevels();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs sm:text-sm shadow-xs border border-stone-200 active:scale-95 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-stone-600" />
            <span>Niveles</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl bg-stone-900 text-white font-extrabold text-xs shadow-2xs">
              Nivel {levelNumber}
            </span>
          </div>
        </div>

        {/* Instruction box */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-stone-500">
              Atención y Clasificación: Encuentra el Intruso
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 font-medium mt-0.5">
              Observa los siguientes elementos. Uno de ellos no pertenece a este grupo. ¿Cuál es?
            </p>
          </div>
        </div>

        {/* Feedback message banner */}
        {feedback !== 'idle' && (
          <div
            className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all ${
              feedback === 'correct'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                : 'bg-rose-50 text-rose-900 border border-rose-300'
            }`}
          >
            {feedback === 'correct' ? (
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Items Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {currentLevelData.items.map((item) => {
            const isSelected = selectedId === item.id;

            return (
              <button
                key={item.id}
                disabled={feedback === 'correct'}
                onClick={() => handleItemClick(item)}
                className={`aspect-square sm:aspect-auto sm:min-h-[160px] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border transition-all transform active:scale-95 flex flex-col items-center justify-center cursor-pointer shadow-xs select-none ${
                  isSelected && feedback === 'correct'
                    ? 'bg-emerald-50 border-2 border-emerald-500 ring-2 ring-emerald-300'
                    : isSelected && feedback === 'error'
                    ? 'bg-rose-50 border-2 border-rose-500 ring-2 ring-rose-300'
                    : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-amber-400'
                }`}
              >
                <span className="text-4xl sm:text-5xl md:text-6xl drop-shadow-2xs mb-1.5 sm:mb-2 transition-transform">
                  {item.emoji}
                </span>
                <span className="text-sm sm:text-base font-extrabold text-stone-800 tracking-tight leading-tight">
                  {item.name}
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-stone-400 mt-1 uppercase tracking-wider">
                  Toca para elegir
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
