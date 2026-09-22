import React, { useState } from 'react';
import { STROOP_LEVELS, StroopLevel } from '../../data/gamesData';
import { playClick, playCorrect, playError } from '../../utils/sound';
import { ArrowLeft, Sparkles, AlertCircle, Eye } from 'lucide-react';

interface StroopGameProps {
  levelNumber: number;
  onWin: (points: number) => void;
  onReturnToLevels: () => void;
}

export const StroopGame: React.FC<StroopGameProps> = ({
  levelNumber,
  onWin,
  onReturnToLevels,
}) => {
  const currentLevelData: StroopLevel =
    STROOP_LEVELS[(levelNumber - 1) % STROOP_LEVELS.length] || STROOP_LEVELS[0];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const currentQ = currentLevelData.questions[questionIndex];

  const handleSelectOption = (isCorrect: boolean, optionName: string) => {
    if (feedback !== 'idle') return;

    if (isCorrect) {
      playCorrect();
      setFeedback('correct');
      setFeedbackMsg(`¡Muy bien! El color de la tinta es ${currentQ.inkColorName}.`);

      setTimeout(() => {
        setFeedback('idle');
        setFeedbackMsg('');
        if (questionIndex + 1 < currentLevelData.questions.length) {
          setQuestionIndex(prev => prev + 1);
        } else {
          onWin(currentLevelData.points);
        }
      }, 1100);
    } else {
      playError();
      setFeedback('error');
      setFeedbackMsg(`¡Cuidado! Marcaste "${optionName}". Fíjate en la tinta, no en lo que lees.`);

      setTimeout(() => {
        setFeedback('idle');
        setFeedbackMsg('');
      }, 1400);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-6 bg-[#FAF8F5] flex flex-col justify-between">
      <div className="max-w-2xl mx-auto w-full space-y-5">
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
            <span className="px-3 py-1 rounded-xl bg-white border border-stone-200 text-stone-700 text-xs font-bold shadow-2xs">
              Pregunta {questionIndex + 1} de {currentLevelData.questions.length}
            </span>
            <span className="px-3.5 py-1 rounded-xl bg-stone-900 text-white font-extrabold text-xs shadow-2xs">
              Nivel {levelNumber}
            </span>
          </div>
        </div>

        {/* Instruction box */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-stone-500">
              Desafío de Atención (Efecto Stroop)
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 font-medium mt-0.5">
              {currentLevelData.instruction}
            </p>
          </div>
        </div>

        {/* Word Display Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-stone-200 shadow-xs text-center flex flex-col items-center justify-center min-h-[170px] sm:min-h-[200px] relative overflow-hidden">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
            Observa el color de las letras:
          </div>

          <div
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-wider sm:tracking-widest transition-transform select-none drop-shadow-2xs py-2 sm:py-4 max-w-full break-all"
            style={{ color: currentQ.inkHex }}
          >
            {currentQ.word}
          </div>

          {/* Feedback message banner */}
          {feedback !== 'idle' && (
            <div
              className={`mt-4 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 ${
                feedback === 'correct'
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                  : 'bg-rose-50 text-rose-900 border border-rose-300'
              }`}
            >
              {feedback === 'correct' ? (
                <Sparkles className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              )}
              <span>{feedbackMsg}</span>
            </div>
          )}
        </div>

        {/* Color Options */}
        <div className="space-y-2.5">
          <div className="text-center text-xs font-black uppercase text-stone-500 tracking-wider">
            ¿De qué color es la tinta?
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {currentQ.options.map((opt, i) => (
              <button
                key={i}
                disabled={feedback !== 'idle'}
                onClick={() => handleSelectOption(opt.isCorrect, opt.name)}
                className="p-3 sm:p-4 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 hover:border-amber-400 shadow-xs active:scale-95 transition flex items-center justify-center gap-2 sm:gap-3 cursor-pointer"
              >
                <div
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-stone-300 shadow-2xs shrink-0"
                  style={{ backgroundColor: opt.hex }}
                />
                <span className="text-sm sm:text-base font-extrabold text-stone-800">
                  {opt.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
