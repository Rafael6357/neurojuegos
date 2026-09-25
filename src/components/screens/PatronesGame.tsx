import React, { useState, useEffect, useRef } from 'react';
import { PATRONES_LEVELS, GAMES_META, getLevelCount } from '../../data/gamesData';
import { Clock, Sparkles } from 'lucide-react';
import { playClick, playCorrect, playError, playFlip } from '../../utils/sound';
import { shuffleArray } from '../../utils/shuffle';
import { GameShell } from '../ui/GameShell';
import { Card } from '../ui/Card';
import type { FeedbackState } from '../../types';

interface PatronesGameProps {
  levelNumber: number;
  onWin: (points: number) => void;
  onReturnToLevels: () => void;
}

type Phase = 'countdown' | 'sequencing' | 'reappeared' | 'completed';

export const PatronesGame: React.FC<PatronesGameProps> = ({
  levelNumber,
  onWin,
  onReturnToLevels,
}) => {
  const levelData = PATRONES_LEVELS[levelNumber - 1] ?? PATRONES_LEVELS[0];
  const meta = GAMES_META.patrones;

  const [phase, setPhase] = useState<Phase>('countdown');
  const [countdown, setCountdown] = useState<number>(3);
  const [hiddenIndexes, setHiddenIndexes] = useState<number[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  // Las opciones se mezclan en cada partida: la correcta no queda fija (antes opt2/opt2/...).
  const [shuffledOptions] = useState(() => shuffleArray(levelData.options));

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(t => clearTimeout(t));
    timersRef.current = [];
  };

  const startSequence = () => {
    clearAllTimers();
    setPhase('countdown');
    setCountdown(3);
    setHiddenIndexes([]);
    setSelectedOptionId(null);
    setFeedback(null);

    // 3.. 2.. 1.. Countdown
    const c1 = setTimeout(() => setCountdown(2), 1000);
    const c2 = setTimeout(() => setCountdown(1), 2000);
    const cStart = setTimeout(() => {
      setPhase('sequencing');
      playFlip();

      // Step-by-step disappearing sequence
      levelData.correctOrder.forEach((itemIdx, step) => {
        const t = setTimeout(() => {
          setHiddenIndexes(prev => [...prev, itemIdx]);
          playFlip();
        }, (step + 1) * 1200);
        timersRef.current.push(t);
      });

      // Reappear all items after sequence finishes
      const totalSeqTime = (levelData.correctOrder.length + 1) * 1200;
      const tReappear = setTimeout(() => {
        setHiddenIndexes([]);
        setPhase('reappeared');
        playFlip();
      }, totalSeqTime);
      timersRef.current.push(tReappear);
    }, 3000);

    timersRef.current.push(c1, c2, cStart);
  };

  useEffect(() => {
    startSequence();
    return () => clearAllTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelNumber]);

  const handleVerify = () => {
    playClick();
    if (!selectedOptionId) {
      playError();
      setFeedback({ text: 'Por favor selecciona una opción de orden.', kind: 'error' });
      return;
    }

    const chosen = levelData.options.find(o => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      playCorrect();
      setFeedback({ text: `¡EXCELENTE! Te mereces ${levelData.points} puntos.`, kind: 'success' });
      setTimeout(() => {
        onWin(levelData.points);
      }, 700);
    } else {
      playError();
      setFeedback({ text: 'Lo siento, respuesta incorrecta. ¡Intenta de nuevo!', kind: 'error' });
    }
  };

  return (
    <GameShell
      backId="btn_patrones_back_levels"
      resetId="btn_patrones_repeat"
      feedbackId="patrones_feedback_banner"
      levelNumber={levelNumber}
      totalLevels={getLevelCount('patrones')}
      title="Patrones de Secuencia"
      area={meta.area}
      areaLabel={meta.areaLabel}
      instruction={
        phase === 'countdown'
          ? `¡Prepárate! El juego comienza en ${countdown}...`
          : phase === 'sequencing'
            ? '¡Mira atentamente el orden en que desaparecen las figuras!'
            : 'Selecciona el orden correcto en el que las imágenes desaparecieron:'
      }
      feedback={feedback}
      onBack={() => { playClick(); onReturnToLevels(); }}
      onReset={() => { playClick(); startSequence(); }}
      resetLabel="Repetir Patrón"
    >
      {/* Countdown overlay or items display */}
      <Card className="p-6 relative min-h-[220px] flex items-center justify-center">
        {phase === 'countdown' ? (
          <div className="flex flex-col items-center justify-center space-y-2 py-6" role="status" aria-label={`Comienza en ${countdown}`}>
            <Clock className="w-8 h-8 text-amber-300 animate-spin" />
            <span className="text-5xl font-black text-slate-50">{countdown}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Observa con atención</span>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full">
            {levelData.items.map((item, idx) => {
              const isHidden = hiddenIndexes.includes(idx);

              return (
                <div
                  key={item.id}
                  className={`aspect-square rounded-3xl p-2 sm:p-3 flex flex-col items-center justify-center border transition-all duration-300 ${
                    isHidden
                      ? 'opacity-0 scale-75 bg-white/[0.03] border-dashed border-white/20'
                      : 'opacity-100 scale-100 bg-gradient-to-br from-indigo-400/25 to-fuchsia-400/15 border-white/15 shadow-lg'
                  }`}
                >
                  {!isHidden && (
                    <>
                      <span className="text-5xl sm:text-6xl md:text-7xl mb-1.5" role="img" aria-label={item.name}>
                        {item.emoji}
                      </span>
                      <span className="text-[11px] sm:text-xs font-black text-slate-100 text-center leading-tight">
                        {item.name}
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Reappeared Phase: Options Selection */}
      {phase === 'reappeared' && (
        <div className="space-y-3">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 text-center">
            ¿Cuál fue el orden de desaparición?
          </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {shuffledOptions.map((opt) => {
              const isSelected = selectedOptionId === opt.id;

              return (
                <button
                  key={opt.id}
                  id={`btn_opt_${opt.id}`}
                  onClick={() => { playClick(); setSelectedOptionId(opt.id); }}
                  aria-pressed={isSelected}
                  className={`p-3.5 sm:p-4 rounded-2xl border text-left font-bold text-xs sm:text-sm transition active:scale-95 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400/15 border-amber-300 text-amber-100 ring-2 ring-amber-300/60 font-black shadow-[0_0_16px_rgba(251,191,36,0.2)]'
                      : 'bg-white/[0.04] border-white/10 text-slate-200 hover:border-white/30 hover:bg-white/[0.07]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />}
                </button>
              );
            })}
          </div>

          <button
            id="btn_verificar_patrones"
            onClick={handleVerify}
            className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-violet-400 to-fuchsia-500 hover:brightness-110 text-white font-black text-sm sm:text-base shadow-lg shadow-violet-500/30 active:scale-[0.98] transition cursor-pointer mt-2 border border-white/20"
          >
            VERIFICAR RESPUESTA
          </button>
        </div>
      )}
    </GameShell>
  );
};
