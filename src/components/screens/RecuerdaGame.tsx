import React, { useState, useEffect, useRef } from 'react';
import { RECUERDA_LEVELS, GAMES_META, getLevelCount } from '../../data/gamesData';
import { Eye, HelpCircle } from 'lucide-react';
import { playClick, playCorrect, playError, playFlip } from '../../utils/sound';
import { GameShell } from '../ui/GameShell';
import { Card } from '../ui/Card';
import type { FeedbackState } from '../../types';

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
  const levelData = RECUERDA_LEVELS[levelNumber - 1] ?? RECUERDA_LEVELS[0];
  const meta = GAMES_META.recuerda;

  const [phase, setPhase] = useState<'preview' | 'hidden' | 'completed'>('preview');
  const [secondsLeft, setSecondsLeft] = useState<number>(levelData.previewSeconds);
  const [revealedIndex, setRevealedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startMemoryRound = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    setPhase('preview');
    setSecondsLeft(levelData.previewSeconds);
    setRevealedIndex(null);
    setFeedback({
      text: 'Recuerda la posición de todas las imágenes antes de que desaparezcan.',
      kind: 'info',
    });

    let currentSec = levelData.previewSeconds;
    timerRef.current = setInterval(() => {
      currentSec -= 1;
      setSecondsLeft(currentSec);

      if (currentSec <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = null;
        playFlip();
        setPhase('hidden');
        setFeedback({
          text: `¡Toca el recuadro donde se encontraba ${levelData.targetItemName}!`,
          kind: 'info',
        });
      }
    }, 1000);
  };

  useEffect(() => {
    startMemoryRound();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        kind: 'success',
      });
      setTimeout(() => {
        onWin(levelData.points);
      }, 800);
    } else {
      playError();
      setFeedback({
        text: '¡INTENTA DE NUEVO! Esa no es la casilla correcta.',
        kind: 'error',
      });
    }
  };

  return (
    <GameShell
      backId="btn_recuerda_back_levels"
      resetId="btn_recuerda_restart"
      feedbackId="recuerda_feedback_banner"
      levelNumber={levelNumber}
      totalLevels={getLevelCount('recuerda')}
      title="Recuerda"
      area={meta.area}
      areaLabel={meta.areaLabel}
      instruction="Entrenamiento de memoria visual y espacial"
      feedback={feedback}
      onBack={() => { playClick(); onReturnToLevels(); }}
      onReset={() => { playClick(); startMemoryRound(); }}
      resetLabel="Repetir"
    >
      {/* Instructions / Status Banner */}
      <Card className="p-4 text-center">
        {phase === 'preview' ? (
          <div className="flex items-center justify-center gap-2.5">
            <Eye className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="font-extrabold text-slate-50 text-sm sm:text-base">
              Memorizando... Las cartas se ocultarán en {secondsLeft}s
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-300" />
            <span className="font-extrabold text-slate-50 text-base sm:text-lg">
              ¿Dónde estaba <span className="text-amber-300 underline decoration-amber-300/60 underline-offset-4">{levelData.targetItemName}</span>?
            </span>
          </div>
        )}
      </Card>

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
              aria-label={isVisible ? item.name : `Casilla oculta ${index + 1}`}
              className={`aspect-square rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center transition-all duration-300 border select-none ${
                isVisible
                  ? 'bg-gradient-to-br from-indigo-400/25 to-fuchsia-400/15 border-white/20 shadow-lg scale-100'
                  : 'bg-white/[0.04] hover:bg-violet-400/15 border-white/10 hover:border-violet-300/60 shadow active:scale-95 cursor-pointer disabled:cursor-default'
              }`}
            >
              {isVisible ? (
                <span className="flex flex-col items-center justify-center anim-pop-in">
                  <span className="text-6xl sm:text-7xl mb-1.5" role="img" aria-label={item.name}>
                    {item.emoji}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-50 text-center leading-tight">
                    {item.name}
                  </span>
                </span>
              ) : (
                <span className="flex flex-col items-center justify-center">
                  <span className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/15">
                    <span className="text-xl sm:text-2xl font-black text-slate-400">
                      ?
                    </span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400 mt-2 uppercase tracking-wider">
                    Toca aquí
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </GameShell>
  );
};
