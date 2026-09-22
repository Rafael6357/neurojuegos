import React, { useState } from 'react';
import { IDENTIFICA_LEVELS } from '../../data/gamesData';
import { ArrowLeft, CheckSquare, Square, RotateCcw } from 'lucide-react';
import { playClick, playCorrect, playError } from '../../utils/sound';

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
  const levelIndex = (levelNumber - 1) % IDENTIFICA_LEVELS.length;
  const levelData = IDENTIFICA_LEVELS[levelIndex];

  // Track checked state for each of the 4 items
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [feedback, setFeedback] = useState<{ text: string; success: boolean } | null>(null);

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
      setFeedback({ text: `¡Perfecto! Has ganado ${levelData.points} puntos.`, success: true });
      setTimeout(() => {
        onWin(levelData.points);
      }, 700);
    } else {
      playError();
      setFeedback({
        text: 'Lo siento, respuesta incorrecta. Revisa con atención las opciones marcadas e intenta de nuevo.',
        success: false,
      });
    }
  };

  const handleReset = () => {
    playClick();
    setCheckedItems({});
    setFeedback(null);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-6 bg-[#131722] text-slate-100">
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Navigation & Level indicator */}
        <div className="flex items-center justify-between">
          <button
            id="btn_identifica_back_levels"
            onClick={() => { playClick(); onReturnToLevels(); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1C212E] hover:bg-[#252B3B] text-slate-200 font-bold text-xs sm:text-sm shadow-xs border border-slate-700 active:scale-95 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>Niveles</span>
          </button>

          <div className="px-3.5 py-1.5 rounded-xl bg-amber-600 text-white font-extrabold text-xs shadow-2xs border border-amber-500">
            Nivel {levelNumber}
          </div>

          <button
            id="btn_identifica_reset"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1C212E] hover:bg-[#252B3B] text-slate-200 font-bold text-xs shadow-xs border border-slate-700 active:scale-95 transition cursor-pointer"
            title="Reiniciar selecciones"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>

        {/* Title & Instructions */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Identifica
          </h1>
          <div className="mt-2 inline-block px-3.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-xs sm:text-sm">
            {levelData.taskText}
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            id="identifica_feedback_banner"
            className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold text-center border transition ${
              feedback.success
                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {levelData.items.map((item) => {
            const isChecked = !!checkedItems[item.id];

            return (
              <div
                key={item.id}
                id={`identifica_item_${item.id}`}
                onClick={() => toggleCheck(item.id)}
                className={`p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer select-none flex flex-col items-center justify-between text-center active:scale-[0.98] ${
                  isChecked
                    ? 'bg-amber-500/20 border-amber-500 shadow-2xs ring-2 ring-amber-500/40'
                    : 'bg-[#1C212E] border-slate-700/80 hover:border-slate-600 hover:bg-[#23293A] shadow-xs'
                }`}
              >
                {/* Item Image */}
                <div className="w-20 h-20 sm:w-26 sm:h-26 md:w-30 md:h-30 rounded-2xl bg-slate-900 p-2 flex items-center justify-center border border-slate-700 mb-2 sm:mb-3">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/lapiz_identifica.png';
                    }}
                  />
                </div>

                {/* Checkbox and Label */}
                <div className="flex items-center gap-2 mt-auto">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-amber-400 fill-amber-950/40 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-slate-500 shrink-0" />
                  )}
                  <span className="text-sm sm:text-base font-extrabold text-slate-100 leading-tight">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <button
          id="btn_verificar_identifica"
          onClick={handleVerify}
          className="w-full py-3 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-sm sm:text-base shadow-xs active:scale-[0.98] transition cursor-pointer border border-amber-500"
        >
          VERIFICAR RESPUESTAS
        </button>
      </div>
    </div>
  );
};
