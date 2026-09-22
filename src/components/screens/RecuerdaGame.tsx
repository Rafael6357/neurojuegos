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
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-6 bg-gradient-to-b from-pink-50 via-amber-50 to-rose-100">
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Navigation & Level indicator */}
        <div className="flex items-center justify-between">
          <button
            id="btn_recuerda_back_levels"
            onClick={() => { playClick(); onReturnToLevels(); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-pink-50 text-slate-800 font-bold text-sm shadow-sm border border-pink-300 active:scale-95 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Niveles</span>
          </button>

          <div className="px-4 py-1.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black text-sm shadow-sm">
            Nivel {levelNumber}
          </div>

          <button
            id="btn_recuerda_restart"
            onClick={() => { playClick(); startMemoryRound(); }}
            className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white hover:bg-pink-50 text-slate-800 font-bold text-xs shadow-sm border border-pink-300 active:scale-95 transition"
            title="Volver a memorizar"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Repetir</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Recuerda
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
            Entrenamiento de memoria visual y espacial
          </p>
        </div>

        {/* Instructions / Status Banner */}
        <div className="bg-white/95 rounded-3xl border-3 border-pink-300 p-4 shadow-sm text-center">
          {phase === 'preview' ? (
            <div className="flex items-center justify-center gap-3">
              <Eye className="w-6 h-6 text-pink-600 animate-pulse" />
              <span className="font-extrabold text-pink-950 text-base sm:text-lg">
                Memorizando... Las cartas se ocultarán en {secondsLeft}s
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-pink-600 animate-bounce" />
              <span className="font-black text-pink-950 text-lg sm:text-xl">
                ¿Dónde estaba {levelData.targetItemName}?
              </span>
            </div>
          )}
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            id="recuerda_feedback_banner"
            className={`p-3.5 rounded-2xl text-sm font-bold text-center border-2 transition ${
              feedback.success
                ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                : 'bg-rose-100 border-rose-400 text-rose-900'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* 2x2 Grid of Memory Cards */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {levelData.items.map((item, index) => {
            const isVisible = phase === 'preview' || phase === 'completed' || revealedIndex === index;

            return (
              <button
                key={item.id}
                id={`recuerda_card_${index}`}
                disabled={phase !== 'hidden'}
                onClick={() => handleCardClick(index)}
                className={`aspect-square rounded-3xl p-4 flex flex-col items-center justify-center transition-all duration-300 border-4 select-none ${
                  isVisible
                    ? 'bg-white border-pink-400 shadow-md scale-100'
                    : 'bg-gradient-to-tr from-pink-400 via-rose-400 to-amber-400 border-pink-500 shadow-xl hover:scale-102 active:scale-95 cursor-pointer'
                }`}
              >
                {isVisible ? (
                  <div className="flex flex-col items-center justify-center animate-in zoom-in-75 duration-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-2"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/lapiz_identifica.png';
                      }}
                    />
                    <span className="text-sm sm:text-base font-black text-slate-800">
                      {item.name}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/30 flex items-center justify-center shadow-inner">
                      <span className="text-3xl sm:text-4xl font-black text-white drop-shadow-md">
                        ?
                      </span>
                    </div>
                    <span className="text-xs font-bold text-white/90 mt-2 uppercase tracking-wider">
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
