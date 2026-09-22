import React, { useState, useEffect } from 'react';
import { DIGITOS_LEVELS, DigitosLevel } from '../../data/gamesData';
import { playClick, playCorrect, playError, playCountdownTick } from '../../utils/sound';
import { ArrowLeft, Sparkles, AlertCircle, Hash, Delete, RotateCcw } from 'lucide-react';

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
    DIGITOS_LEVELS[(levelNumber - 1) % DIGITOS_LEVELS.length] || DIGITOS_LEVELS[0];

  const [phase, setPhase] = useState<'preview' | 'input'>('preview');
  const [countdown, setCountdown] = useState<number>(currentLevelData.previewSeconds);
  const [userInput, setUserInput] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Expected reversed sequence
  const targetReversed = [...currentLevelData.sequence].reverse();

  // Preview countdown timer
  useEffect(() => {
    setPhase('preview');
    setCountdown(currentLevelData.previewSeconds);
    setUserInput([]);
    setFeedback('idle');
    setFeedbackMsg('');

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setPhase('input');
          return 0;
        }
        playCountdownTick();
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [levelNumber]);

  const handleKeyPress = (digit: number) => {
    if (phase !== 'input' || feedback === 'correct') return;
    if (userInput.length >= targetReversed.length) return;

    playClick();
    const nextInput = [...userInput, digit];
    setUserInput(nextInput);

    // If filled all digits, check immediately
    if (nextInput.length === targetReversed.length) {
      const isMatch = nextInput.every((num, i) => num === targetReversed[i]);
      if (isMatch) {
        playCorrect();
        setFeedback('correct');
        setFeedbackMsg('¡Perfecto! Invertiste la serie numérica con éxito.');

        setTimeout(() => {
          onWin(currentLevelData.points);
        }, 1200);
      } else {
        playError();
        setFeedback('error');
        setFeedbackMsg(`No coincide. La serie original era ${currentLevelData.sequence.join(' - ')}. ¡Inténtalo de nuevo!`);

        setTimeout(() => {
          setFeedback('idle');
          setUserInput([]);
        }, 2000);
      }
    }
  };

  const handleDelete = () => {
    if (phase !== 'input' || feedback === 'correct') return;
    playClick();
    setUserInput(prev => prev.slice(0, -1));
    setFeedback('idle');
  };

  const handleRetryPreview = () => {
    playClick();
    setPhase('preview');
    setCountdown(currentLevelData.previewSeconds);
    setUserInput([]);
    setFeedback('idle');

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setPhase('input');
          return 0;
        }
        playCountdownTick();
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-6 bg-[#FAF8F5] flex flex-col justify-between">
      <div className="max-w-md mx-auto w-full space-y-4">
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
            <Hash className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-stone-500">
              Memoria de Trabajo: Dígitos Inversos
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 font-medium mt-0.5">
              {phase === 'preview'
                ? 'Memoriza estos números en orden. Desaparecerán pronto.'
                : '¡Ahora ingresa los números al revés! (Desde el último hasta el primero).'}
            </p>
          </div>
        </div>

        {/* Display Stage */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs text-center min-h-[160px] flex flex-col items-center justify-center relative overflow-hidden">
          {phase === 'preview' ? (
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Memoriza los números (quedan {countdown}s):
              </span>
              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                {currentLevelData.sequence.map((num, i) => (
                  <div
                    key={i}
                    className="w-11 h-14 sm:w-14 sm:h-16 md:w-16 md:h-18 rounded-xl sm:rounded-2xl bg-stone-900 text-white font-black text-2xl sm:text-3xl md:text-4xl flex items-center justify-center shadow-xs animate-pulse"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3 w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Escribe en orden INVERSO:
              </span>
              <div className="flex items-center justify-center gap-2 sm:gap-2.5 min-h-[56px] sm:min-h-[64px] flex-wrap">
                {targetReversed.map((_, i) => {
                  const digitEntered = userInput[i];
                  const hasDigit = digitEntered !== undefined;

                  return (
                    <div
                      key={i}
                      className={`w-10 h-13 sm:w-13 sm:h-16 rounded-xl sm:rounded-2xl border flex items-center justify-center font-black text-xl sm:text-2xl transition-all ${
                        hasDigit
                          ? 'bg-amber-50 border-2 border-amber-500 text-amber-950 shadow-2xs'
                          : 'bg-stone-50 border-dashed border-stone-300 text-stone-400'
                      }`}
                    >
                      {hasDigit ? digitEntered : '?'}
                    </div>
                  );
                })}
              </div>

              {feedback !== 'idle' && (
                <div
                  className={`mt-2 p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 ${
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
            </div>
          )}
        </div>

        {/* Keypad during input phase */}
        {phase === 'input' && (
          <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-xs space-y-2">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <button
                  key={digit}
                  disabled={feedback === 'correct'}
                  onClick={() => handleKeyPress(digit)}
                  className="py-3 sm:py-3.5 rounded-xl bg-stone-50 hover:bg-amber-50 active:bg-amber-100 border border-stone-200 text-stone-900 font-black text-2xl shadow-2xs active:scale-95 transition cursor-pointer"
                >
                  {digit}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleRetryPreview}
                className="py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex flex-col items-center justify-center shadow-2xs active:scale-95 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 mb-0.5" />
                <span>Ver de nuevo</span>
              </button>

              <button
                disabled={feedback === 'correct'}
                onClick={() => handleKeyPress(0)}
                className="py-3 sm:py-3.5 rounded-xl bg-stone-50 hover:bg-amber-50 active:bg-amber-100 border border-stone-200 text-stone-900 font-black text-2xl shadow-2xs active:scale-95 transition cursor-pointer"
              >
                0
              </button>

              <button
                disabled={userInput.length === 0 || feedback === 'correct'}
                onClick={handleDelete}
                className="py-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex flex-col items-center justify-center shadow-2xs active:scale-95 transition cursor-pointer"
              >
                <Delete className="w-4 h-4 mb-0.5" />
                <span>Borrar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
