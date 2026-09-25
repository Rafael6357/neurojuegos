import React, { useEffect, useState } from 'react';
import { STROOP_LEVELS, StroopLevel, GAMES_META, getLevelCount } from '../../data/gamesData';
import { playClick, playCorrect, playError } from '../../utils/sound';
import { shuffleArray } from '../../utils/shuffle';
import { Sparkles, AlertCircle, Eye } from 'lucide-react';
import { GameShell } from '../ui/GameShell';
import { Card } from '../ui/Card';
import type { FeedbackState } from '../../types';

interface StroopGameProps {
  levelNumber: number;
  onWin: (points: number) => void;
  onReturnToLevels: () => void;
}

/* Mapa fijo hex → clases literales (sin estilos en línea, apto para Tailwind). */
const INK_TEXT: Record<string, string> = {
  '#ef4444': 'text-red-500',
  '#3b82f6': 'text-blue-500',
  '#22c55e': 'text-green-500',
  '#eab308': 'text-yellow-500',
  '#1e293b': 'text-slate-900',
  '#a855f7': 'text-purple-500',
  '#f97316': 'text-orange-500',
  '#ec4899': 'text-pink-500',
};

const DOT_BG: Record<string, string> = {
  '#ef4444': 'bg-red-500',
  '#3b82f6': 'bg-blue-500',
  '#22c55e': 'bg-green-500',
  '#eab308': 'bg-yellow-500',
  '#1e293b': 'bg-slate-900',
  '#a855f7': 'bg-purple-500',
  '#f97316': 'bg-orange-500',
  '#ec4899': 'bg-pink-500',
};

export const StroopGame: React.FC<StroopGameProps> = ({
  levelNumber,
  onWin,
  onReturnToLevels,
}) => {
  const currentLevelData: StroopLevel =
    STROOP_LEVELS[levelNumber - 1] ?? STROOP_LEVELS[0];
  const meta = GAMES_META.stroop;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const currentQ = currentLevelData.questions[questionIndex];

  // Opciones mezcladas por pregunta: la tinta correcta no queda fija (casi siempre era la 2ª).
  const [shuffledOptions, setShuffledOptions] = useState(() => shuffleArray(currentQ.options));

  useEffect(() => {
    setShuffledOptions(shuffleArray(currentLevelData.questions[questionIndex].options));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex]);

  const handleSelectOption = (isCorrect: boolean, optionName: string) => {
    if (feedback !== null) return;

    if (isCorrect) {
      playCorrect();
      setFeedback({ text: `¡Muy bien! El color de la tinta es ${currentQ.inkColorName}.`, kind: 'success' });

      setTimeout(() => {
        setFeedback(null);
        if (questionIndex + 1 < currentLevelData.questions.length) {
          setQuestionIndex(prev => prev + 1);
        } else {
          onWin(currentLevelData.points);
        }
      }, 1100);
    } else {
      playError();
      setFeedback({ text: `¡Cuidado! Marcaste "${optionName}". Fíjate en la tinta, no en lo que lees.`, kind: 'error' });

      setTimeout(() => {
        setFeedback(null);
      }, 1400);
    }
  };

  return (
    <GameShell
      backId="btn_stroop_back_levels"
      feedbackId="stroop_feedback_banner"
      levelNumber={levelNumber}
      totalLevels={getLevelCount('stroop')}
      title="Desafío de Colores"
      area={meta.area}
      areaLabel="Desafío de Atención (Efecto Stroop)"
      instruction={currentLevelData.instruction}
      feedback={feedback}
      onBack={() => { playClick(); onReturnToLevels(); }}
    >
      {/* Progress */}
      <div className="flex items-center justify-center gap-1.5" aria-label={`Pregunta ${questionIndex + 1} de ${currentLevelData.questions.length}`}>
        {currentLevelData.questions.map((q, i) => (
          <span
            key={q.id}
            className={`h-2 rounded-full transition-all ${i < questionIndex ? 'w-8 bg-emerald-400' : i === questionIndex ? 'w-8 bg-amber-300 anim-glow' : 'w-4 bg-white/15'}`}
          />
        ))}
      </div>

      {/* Word Display Card: papel claro para que la tinta negra se lea */}
      <div className="rounded-[1.75rem] p-6 sm:p-10 bg-gradient-to-b from-slate-50 to-slate-200 border border-white/40 shadow-[0_14px_40px_rgba(0,0,0,0.45)] text-center flex flex-col items-center justify-center min-h-[170px] sm:min-h-[200px] relative overflow-hidden">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Observa el color de las letras:
        </div>

        <div
          className={`text-5xl sm:text-6xl md:text-7xl font-black tracking-wider transition-transform select-none py-2 sm:py-4 max-w-full break-all ${INK_TEXT[currentQ.inkHex] ?? 'text-slate-900'}`}
        >
          {currentQ.word}
        </div>
      </div>

      {/* Color Options */}
      <div className="space-y-2.5">
        <div className="text-center text-xs font-black uppercase text-slate-300 tracking-wider flex items-center justify-center gap-2">
          <Eye className="w-4 h-4 text-amber-300" />
          ¿De qué color es la tinta?
        </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {shuffledOptions.map((opt, i) => (
            <button
              key={i}
              id={`stroop_opt_${i}`}
              disabled={feedback !== null}
              onClick={() => handleSelectOption(opt.isCorrect, opt.name)}
              className="p-3 sm:p-4 rounded-2xl bg-white/[0.06] hover:bg-white/10 border border-white/15 hover:border-amber-300/60 active:scale-95 transition flex items-center justify-center gap-2 sm:gap-3 cursor-pointer disabled:cursor-default"
            >
              <span
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white/50 shadow shrink-0 ${DOT_BG[opt.hex] ?? 'bg-slate-500'}`}
                aria-hidden="true"
              />
              <span className="text-sm sm:text-base font-extrabold text-slate-50">
                {opt.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Feedback icon row (el banner lo pinta GameShell) */}
      {feedback && (
        <div className="flex justify-center" aria-hidden="true">
          {feedback.kind === 'success' ? (
            <Sparkles className="w-6 h-6 text-emerald-300 anim-pop-in" />
          ) : (
            <AlertCircle className="w-6 h-6 text-rose-300 anim-pop-in" />
          )}
        </div>
      )}
    </GameShell>
  );
};
