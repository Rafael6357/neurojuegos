import React, { useState, useEffect, useRef } from 'react';
import { PATRONES_LEVELS } from '../../data/gamesData';
import { ArrowLeft, RotateCcw, Clock, Eye, Sparkles } from 'lucide-react';
import { playClick, playCorrect, playError, playFlip } from '../../utils/sound';

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
  const levelIndex = (levelNumber - 1) % PATRONES_LEVELS.length;
  const levelData = PATRONES_LEVELS[levelIndex];

  const [phase, setPhase] = useState<Phase>('countdown');
  const [countdown, setCountdown] = useState<number>(3);
  const [hiddenIndexes, setHiddenIndexes] = useState<number[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; success: boolean } | null>(null);

  const timersRef = useRef<NodeJS.Timeout[]>([]);

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
  }, [levelNumber]);

  const handleVerify = () => {
    playClick();
    if (!selectedOptionId) {
      playError();
      setFeedback({ text: 'Por favor selecciona una opción de orden.', success: false });
      return;
    }

    const chosen = levelData.options.find(o => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      playCorrect();
      setFeedback({ text: `¡EXCELENTE! Te mereces ${levelData.points} puntos.`, success: true });
      setTimeout(() => {
        onWin(levelData.points);
      }, 700);
    } else {
      playError();
      setFeedback({ text: 'Lo siento, respuesta incorrecta. ¡Intenta de nuevo!', success: false });
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-6 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Navigation & Level indicator */}
        <div className="flex items-center justify-between">
          <button
            id="btn_patrones_back_levels"
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
            id="btn_patrones_repeat"
            onClick={() => { playClick(); startSequence(); }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs shadow-xs border border-stone-200 active:scale-95 transition cursor-pointer"
            title="Repetir observación del patrón"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">Repetir Patrón</span>
          </button>
        </div>

        {/* Title & Instructions */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Patrones de Secuencia
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
            {phase === 'countdown' && `¡Prepárate! El juego comienza en ${countdown}...`}
            {phase === 'sequencing' && '¡Mira atentamente el orden en que desaparecen las figuras!'}
            {phase === 'reappeared' && 'Selecciona el orden correcto en el que las imágenes desaparecieron:'}
          </p>
        </div>

        {/* Countdown overlay or items display */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs relative min-h-[220px] flex items-center justify-center">
          {phase === 'countdown' ? (
            <div className="flex flex-col items-center justify-center space-y-2 py-6 animate-pulse">
              <Clock className="w-8 h-8 text-amber-600 animate-spin" />
              <span className="text-5xl font-black text-stone-900">{countdown}</span>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Observa con atención</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full">
              {levelData.items.map((item, idx) => {
                const isHidden = hiddenIndexes.includes(idx);

                return (
                  <div
                    key={item.id}
                    className={`aspect-square rounded-2xl p-2 sm:p-3 flex flex-col items-center justify-center border transition-all duration-300 ${
                      isHidden
                        ? 'opacity-0 scale-75 bg-stone-100 border-dashed border-stone-300'
                        : 'opacity-100 scale-100 bg-stone-50 border-stone-200 shadow-2xs'
                    }`}
                  >
                    {!isHidden && (
                      <>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain mb-1.5"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/lapiz_identifica.png';
                          }}
                        />
                        <span className="text-[11px] sm:text-xs font-black text-stone-800 text-center leading-tight">
                          {item.name}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            id="patrones_feedback_banner"
            className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold text-center border transition ${
              feedback.success
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* Reappeared Phase: Options Selection */}
        {phase === 'reappeared' && (
          <div className="space-y-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-stone-600 text-center">
              ¿Cuál fue el orden de desaparición?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {levelData.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;

                return (
                  <button
                    key={opt.id}
                    id={`btn_opt_${opt.id}`}
                    onClick={() => { playClick(); setSelectedOptionId(opt.id); }}
                    className={`p-3.5 sm:p-4 rounded-xl border text-left font-bold text-xs sm:text-sm transition active:scale-95 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-400 font-black shadow-2xs'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Sparkles className="w-4 h-4 text-amber-600" />}
                  </button>
                );
              })}
            </div>

            <button
              id="btn_verificar_patrones"
              onClick={handleVerify}
              className="w-full py-3 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-sm sm:text-base shadow-xs active:scale-[0.98] transition cursor-pointer mt-2"
            >
              VERIFICAR RESPUESTA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
