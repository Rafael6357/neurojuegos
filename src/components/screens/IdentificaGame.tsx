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
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-6 bg-gradient-to-b from-sky-50 via-amber-50 to-blue-100">
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Navigation & Level indicator */}
        <div className="flex items-center justify-between">
          <button
            id="btn_identifica_back_levels"
            onClick={() => { playClick(); onReturnToLevels(); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-sky-50 text-slate-800 font-bold text-sm shadow-sm border border-sky-300 active:scale-95 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Niveles</span>
          </button>

          <div className="px-4 py-1.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-sm shadow-sm">
            Nivel {levelNumber}
          </div>

          <button
            id="btn_identifica_reset"
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white hover:bg-sky-50 text-slate-800 font-bold text-xs shadow-sm border border-sky-300 active:scale-95 transition"
            title="Reiniciar selecciones"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>

        {/* Title & Instructions */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Identifica
          </h1>
          <div className="mt-2 inline-block px-4 py-2 rounded-2xl bg-amber-100 border-2 border-amber-300 text-amber-950 font-bold text-xs sm:text-sm">
            {levelData.taskText}
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            id="identifica_feedback_banner"
            className={`p-3.5 rounded-2xl text-sm font-bold text-center border-2 transition ${
              feedback.success
                ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                : 'bg-rose-100 border-rose-400 text-rose-900'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          {levelData.items.map((item) => {
            const isChecked = !!checkedItems[item.id];

            return (
              <div
                key={item.id}
                id={`identifica_item_${item.id}`}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-3xl border-3 transition-all cursor-pointer select-none flex flex-col items-center justify-between text-center active:scale-95 ${
                  isChecked
                    ? 'bg-sky-100/90 border-sky-500 shadow-md ring-2 ring-sky-300'
                    : 'bg-white border-amber-200 hover:border-sky-300 shadow-sm'
                }`}
              >
                {/* Item Image */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-amber-50/60 p-2 flex items-center justify-center border border-amber-100 mb-3">
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
                    <CheckSquare className="w-6 h-6 text-sky-600 fill-sky-100" />
                  ) : (
                    <Square className="w-6 h-6 text-slate-400" />
                  )}
                  <span className="text-base sm:text-lg font-black text-slate-800">
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
          className="w-full py-4 px-6 rounded-3xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-black text-lg shadow-xl active:scale-95 transition border-b-6 border-blue-800"
        >
          VERIFICAR RESPUESTAS
        </button>
      </div>
    </div>
  );
};
