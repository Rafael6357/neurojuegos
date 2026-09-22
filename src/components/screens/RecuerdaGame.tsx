import React, { useState, useEffect, useRef } from 'react';
import { RECUERDA_LEVELS } from '../../data/gamesData';
import { ArrowLeft, RotateCcw, HelpCircle, Eye } from 'lucide-react';
import { playClick, playCorrect, playError, playFlip } from '../../utils/sound';

interface RecuerdaGameProps {
  levelNumber: number;
  onWin: (points: number) => void;
  onReturnToLevels: () => void;
}

export const RecuerdaGame: React.FC<RecuerdaGameProps> = ({
  levelNumber,
  onWin,
  onReturnToLevels,
}) => {
  const levelIndex = (levelNumber - 1) % RECUERDA_LEVELS.length;
  const levelData = RECUERDA_LEVELS[levelIndex];

  const [phase, setPhase] = useState<'preview' | 'hidden' | 'completed'>('preview');
  const [secondsLeft, setSecondsLeft] = useState<number>(levelData.previewSeconds);
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; success: boolean } | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startMemoryRound = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    setPhase('preview');
    setSecondsLeft(levelData.previewSeconds);
    setRevealedIndex(null);
    setFeedback({
      text: 'Recuerda la posición de todas las imágenes antes de que desaparezcan.',
      success: true,
    });

    let currentSec = levelData.previewSeconds;
    timerRef.current = setInterval(() => {
      currentSec -= 1;
      setSecondsLeft(currentSec);

      if (currentSec <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        playFlip();
        setPhase('hidden');
        setFeedback({
          text: `¡Toca el recuadro donde se encontraba ${levelData.targetItemName}!`,
          success: true,
        });
      }
    }, 1000);
  };

  useEffect(() => {
    startMemoryRound();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [levelNumber]);

  const handleCardClick = (index: number) => {
    if (phase !== 'hidden') return;

    playClick();
    setRevealedIndex(index);

    if (index === levelData.targetItemIndex) {
      playCorrect();
      setPhase('completed');
      setFeedback({
        text: `¡VICTORIA! Has seleccionado la imagen correcta (+${levelData.points} pts)`,
        success: true,
      });
      setTimeout(() => {
        onWin(levelData.points);
      }, 800);
    } else {
      playError();
      setFeedback({
        text: '¡INTENTA DE NUEVO! Esa no es la casilla correcta.',
        success: false,
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-6 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Navigation & Level indicator */}
        <div className="flex items-center justify-between">
          <button
            id="btn_recuerda_back_levels"
            onClick={() => { playClick(); onReturnToLevels(); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs sm:text-sm shadow-xs border border-stone-200 active:scale-95 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-stone-600" />
            <span>Niveles</span>
          </button>

          <div className="px-3.5 py-1.5 rounded-xl bg-stone-900 text-white font-extrabold text-xs shadow-2xs">
            Nivel {levelNumber}
          </div>

          <button
            id="btn_recuerda_restart"
            onClick={() => { playClick(); startMemoryRound(); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs shadow-xs border border-stone-200 active:scale-95 transition cursor-pointer"
            title="Volver a memorizar"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">Repetir</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Recuerda
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
            Entrenamiento de memoria visual y espacial
          </p>
        </div>

        {/* Instructions / Status Banner */}
        <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs text-center">
          {phase === 'preview' ? (
            <div className="flex items-center justify-center gap-2.5">
              <Eye className="w-5 h-5 text-amber-600 animate-pulse" />
              <span className="font-extrabold text-stone-900 text-sm sm:text-base">
                Memorizando... Las cartas se ocultarán en {secondsLeft}s
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <span className="font-extrabold text-stone-900 text-base sm:text-lg">
                ¿Dónde estaba <span className="text-amber-800 underline decoration-amber-300 underline-offset-4">{levelData.targetItemName}</span>?
              </span>
            </div>
          )}
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            id="recuerda_feedback_banner"
            className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold text-center border transition ${
              feedback.success
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* 2x2 Grid of Memory Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto">
          {levelData.items.map((item, index) => {
            const isVisible = phase === 'preview' || phase === 'completed' || revealedIndex === index;

            return (
              <button
                key={item.id}
                id={`recuerda_card_${index}`}
                disabled={phase !== 'hidden'}
                onClick={() => handleCardClick(index)}
                className={`aspect-square rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center transition-all duration-300 border select-none ${
                  isVisible
                    ? 'bg-white border-stone-200 shadow-xs scale-100'
                    : 'bg-stone-50 hover:bg-amber-50/70 border-stone-200 shadow-2xs hover:border-amber-300 active:scale-95 cursor-pointer'
                }`}
              >
                {isVisible ? (
                  <div className="flex flex-col items-center justify-center animate-in zoom-in-90 duration-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-22 sm:h-22 md:w-26 md:h-26 object-contain mb-1.5"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/lapiz_identifica.png';
                      }}
                    />
                    <span className="text-xs sm:text-sm font-black text-stone-800 text-center leading-tight">
                      {item.name}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200">
                      <span className="text-xl sm:text-2xl font-black text-stone-500">
                        ?
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-stone-400 mt-2 uppercase tracking-wider">
                      Toca aquí
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
