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
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-6 bg-gradient-to-b from-purple-50 via-amber-50 to-indigo-100">
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Navigation & Level indicator */}
        <div className="flex items-center justify-between">
          <button
            id="btn_patrones_back_levels"
            onClick={() => { playClick(); onReturnToLevels(); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-purple-50 text-slate-800 font-bold text-sm shadow-sm border border-purple-300 active:scale-95 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Niveles</span>
          </button>

          <div className="px-4 py-1.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black text-sm shadow-sm">
            Nivel {levelNumber}
          </div>

          <button
            id="btn_patrones_repeat"
            onClick={() => { playClick(); startSequence(); }}
            className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white hover:bg-purple-50 text-slate-800 font-bold text-xs shadow-sm border border-purple-300 active:scale-95 transition"
            title="Repetir observación del patrón"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Repetir Patrón</span>
          </button>
        </div>

        {/* Title & Instructions */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Patrones de Secuencia
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-1">
            {phase === 'countdown' && `¡Prepárate! El juego comienza en ${countdown}...`}
            {phase === 'sequencing' && '¡Mira atentamente el orden en que desaparecen las figuras!'}
            {phase === 'reappeared' && 'Selecciona el orden correcto en el que las imágenes desaparecieron:'}
          </p>
        </div>

        {/* Countdown overlay or items display */}
        <div className="bg-white/95 rounded-3xl border-3 border-purple-300 p-6 shadow-md relative min-h-[220px] flex items-center justify-center">
          {phase === 'countdown' ? (
            <div className="flex flex-col items-center justify-center space-y-2 py-6 animate-pulse">
              <Clock className="w-10 h-10 text-purple-600 animate-spin" />
              <span className="text-5xl font-black text-purple-700">{countdown}</span>
              <span className="text-sm font-bold text-purple-900">Observa con atención</span>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 w-full">
              {levelData.items.map((item, idx) => {
                const isHidden = hiddenIndexes.includes(idx);

                return (
                  <div
                    key={item.id}
                    className={`aspect-square rounded-2xl p-3 flex flex-col items-center justify-center border-2 transition-all duration-300 ${
                      isHidden
                        ? 'opacity-0 scale-75 bg-slate-100 border-dashed border-slate-300'
                        : 'opacity-100 scale-100 bg-purple-50/80 border-purple-300 shadow-sm'
                    }`}
                  >
                    {!isHidden && (
                      <>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-2"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/lapiz_identifica.png';
                          }}
                        />
                        <span className="text-xs sm:text-sm font-black text-slate-800">
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
            className={`p-3.5 rounded-2xl text-sm font-bold text-center border-2 transition ${
              feedback.success
                ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                : 'bg-rose-100 border-rose-400 text-rose-900'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* Reappeared Phase: Options Selection */}
        {phase === 'reappeared' && (
          <div className="space-y-3">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-purple-900 text-center">
              ¿Cuál fue el orden de desaparición?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {levelData.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;

                return (
                  <button
                    key={opt.id}
                    id={`btn_opt_${opt.id}`}
                    onClick={() => { playClick(); setSelectedOptionId(opt.id); }}
                    className={`p-4 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition active:scale-95 flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-100 border-purple-600 shadow-md ring-2 ring-purple-400 text-purple-950 font-black'
                        : 'bg-white border-purple-200 text-slate-800 hover:border-purple-300 hover:bg-purple-50/50'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Sparkles className="w-5 h-5 text-purple-600" />}
                  </button>
                );
              })}
            </div>

            <button
              id="btn_verificar_patrones"
              onClick={handleVerify}
              className="w-full py-4 px-6 rounded-3xl bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black text-lg shadow-xl active:scale-95 transition border-b-6 border-indigo-800 mt-4"
            >
              VERIFICAR RESPUESTA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
