import React, { useState, useEffect, useRef } from 'react';
import { DIGITOS_LEVELS, DigitosLevel, GAMES_META, getLevelCount } from '../../data/gamesData';
import { playClick, playCorrect, playError, playCountdownTick } from '../../utils/sound';
import { Sparkles, AlertCircle, Delete, RotateCcw, Hash } from 'lucide-react';
import { GameShell } from '../ui/GameShell';
import { Card } from '../ui/Card';
import type { FeedbackState } from '../../types';

interface DigitosGameProps {
  levelNumber: number;
  onWin: (points: number) => void;
  onReturnToLevels: () => void;
}

export const DigitosGame: React.FC<DigitosGameProps> = ({
  levelNumber,
  onWin,
  onReturnToLevels,
}) => {
  const currentLevelData: DigitosLevel =
    DIGITOS_LEVELS[levelNumber - 1] ?? DIGITOS_LEVELS[0];
  const meta = GAMES_META.digitos;

  const [phase, setPhase] = useState<'preview' | 'input'>('preview');
  const [countdown, setCountdown] = useState<number>(currentLevelData.previewSeconds);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const won = feedback?.kind === 'success';

  // Expected reversed sequence
  const targetReversed = [...currentLevelData.sequence].reverse();

  /** Único dueño del intervalo: reintentar NUNCA duplica el tick (bug anterior). */
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearPreviewTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startPreview = () => {
    clearPreviewTimer();
    setPhase('preview');
    setCountdown(currentLevelData.previewSeconds);
    setUserInput([]);
    setFeedback(null);

    let remaining = currentLevelData.previewSeconds;
    intervalRef.current = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearPreviewTimer();
        setCountdown(0);
        setPhase('input');
      } else {
        playCountdownTick();
        setCountdown(remaining);
      }
    }, 1000);
  };

  // Preview countdown timer
  useEffect(() => {
    startPreview();
    return () => clearPreviewTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelNumber]);

  const handleKeyPress = (digit: number) => {
    if (phase !== 'input' || won) return;
    if (userInput.length >= targetReversed.length) return;

    playClick();
    const nextInput = [...userInput, digit];
    setUserInput(nextInput);

    // If filled all digits, check immediately
    if (nextInput.length === targetReversed.length) {
      const isMatch = nextInput.every((num, i) => num === targetReversed[i]);
      if (isMatch) {
        playCorrect();
        setFeedback({ text: '¡Perfecto! Invertiste la serie numérica con éxito.', kind: 'success' });

        setTimeout(() => {
          onWin(currentLevelData.points);
        }, 1200);
      } else {
        playError();
        setFeedback({ text: `No coincide. La serie original era ${currentLevelData.sequence.join(' - ')}. ¡Inténtalo de nuevo!`, kind: 'error' });

        setTimeout(() => {
          setFeedback(current => (current?.kind === 'error' ? null : current));
          setUserInput([]);
        }, 2000);
      }
    }
  };

  const handleDelete = () => {
    if (phase !== 'input' || won) return;
    playClick();
    setUserInput(prev => prev.slice(0, -1));
    setFeedback(null);
  };

  const handleRetryPreview = () => {
    playClick();
    startPreview();
  };

  return (
    <GameShell
      backId="btn_digitos_back_levels"
      feedbackId="digitos_feedback_banner"
      levelNumber={levelNumber}
      totalLevels={getLevelCount('digitos')}
      title="Dígitos Inversos"
      area={meta.area}
      areaLabel="Memoria de Trabajo: Dígitos Inversos"
      instruction={
        phase === 'preview'
          ? 'Memoriza estos números en orden. Desaparecerán pronto.'
          : '¡Ahora ingresa los números al revés! (Desde el último hasta el primero).'
      }
      feedback={feedback}
      onBack={() => { playClick(); onReturnToLevels(); }}
    >
      {/* Display Stage */}
      <Card className="p-6 sm:p-8 text-center min-h-[160px] flex flex-col items-center justify-center relative overflow-hidden">
        {phase === 'preview' ? (
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center justify-center gap-2">
              <Hash className="w-4 h-4" />
              Memoriza los números (quedan {countdown}s):
            </span>
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap" role="status" aria-label={`Memoriza: ${currentLevelData.sequence.join(', ')}`}>
              {currentLevelData.sequence.map((num, i) => (
                <div
                  key={i}
                  className={`anim-pop-in stagger-${(i % 5) + 1} w-11 h-14 sm:w-14 sm:h-16 rounded-2xl bg-gradient-to-b from-violet-300 to-fuchsia-500 text-white font-black text-2xl sm:text-3xl flex items-center justify-center shadow-lg shadow-fuchsia-500/25 border border-white/30`}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3 w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Escribe en orden INVERSO:
            </span>
            <div className="flex items-center justify-center gap-2 sm:gap-2.5 min-h-[56px] sm:min-h-[64px] flex-wrap">
              {targetReversed.map((_, i) => {
                const digitEntered = userInput[i];
                const hasDigit = digitEntered !== undefined;

                return (
                  <div
                    key={i}
                    className={`w-10 h-12 sm:w-12 sm:h-16 rounded-2xl border flex items-center justify-center font-black text-xl sm:text-2xl transition-all ${
                      hasDigit
                        ? 'bg-amber-400/15 border-2 border-amber-300 text-amber-100 shadow-[0_0_14px_rgba(251,191,36,0.2)]'
                        : 'bg-white/[0.04] border-dashed border-white/20 text-slate-600'
                    }`}
                  >
                    {hasDigit ? digitEntered : '?'}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      {/* Keypad during input phase */}
      {phase === 'input' && (
        <Card className="p-4 space-y-2">
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
              <button
                key={digit}
                id={`digitos_key_${digit}`}
                disabled={won}
                onClick={() => handleKeyPress(digit)}
                aria-label={`Número ${digit}`}
                className="py-3 sm:py-3.5 rounded-2xl bg-white/10 hover:bg-amber-400/25 active:bg-amber-400/35 border border-white/15 text-slate-50 font-black text-2xl active:scale-95 transition cursor-pointer disabled:cursor-default"
              >
                {digit}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              id="btn_digitos_retry_preview"
              onClick={handleRetryPreview}
              className="py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs flex flex-col items-center justify-center active:scale-95 transition cursor-pointer border border-white/15"
            >
              <RotateCcw className="w-4 h-4 mb-0.5" />
              <span>Ver de nuevo</span>
            </button>

            <button
              id="digitos_key_0"
              disabled={won}
              onClick={() => handleKeyPress(0)}
              aria-label="Número 0"
              className="py-3 sm:py-3.5 rounded-2xl bg-white/10 hover:bg-amber-400/25 active:bg-amber-400/35 border border-white/15 text-slate-50 font-black text-2xl active:scale-95 transition cursor-pointer disabled:cursor-default"
            >
              0
            </button>

            <button
              id="btn_digitos_delete"
              disabled={userInput.length === 0 || won}
              onClick={handleDelete}
              className="py-3 rounded-2xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 font-bold text-xs flex flex-col items-center justify-center active:scale-95 transition cursor-pointer border border-rose-400/30 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Delete className="w-4 h-4 mb-0.5" />
              <span>Borrar</span>
            </button>
          </div>
        </Card>
      )}

      {/* Feedback icon row (el banner lo pinta GameShell) */}
      {feedback && (
        <div className="flex justify-center" aria-hidden="true">
          {feedback.kind === 'success' ? (
            <Sparkles className="w-6 h-6 text-emerald-300 anim-pop-in" />
          ) : (
            feedback.kind === 'error' && <AlertCircle className="w-6 h-6 text-rose-300 anim-pop-in" />
          )}
        </div>
      )}
    </GameShell>
  );
};
