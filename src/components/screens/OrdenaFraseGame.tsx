import React, { useState, useEffect } from 'react';
import { ORDENAR_LEVELS, OrdenaFraseLevel } from '../../data/gamesData';
import { playClick, playCorrect, playError } from '../../utils/sound';
import { ArrowLeft, Sparkles, AlertCircle, BookOpen, RotateCcw, Check } from 'lucide-react';

interface OrdenaFraseGameProps {
  levelNumber: number;
  onWin: (points: number) => void;
  onReturnToLevels: () => void;
}

export const OrdenaFraseGame: React.FC<OrdenaFraseGameProps> = ({
  levelNumber,
  onWin,
  onReturnToLevels,
}) => {
  const currentLevelData: OrdenaFraseLevel =
    ORDENAR_LEVELS[(levelNumber - 1) % ORDENAR_LEVELS.length] || ORDENAR_LEVELS[0];

  // Pool of available word chips
  const [availableWords, setAvailableWords] = useState<{ id: string; word: string }[]>([]);
  // Words placed into the sentence by the child
  const [selectedWords, setSelectedWords] = useState<{ id: string; word: string }[]>([]);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  // Setup words when level changes
  useEffect(() => {
    const pool = currentLevelData.scrambledWords.map((w, idx) => ({
      id: `${w}-${idx}-${Date.now()}`,
      word: w,
    }));
    setAvailableWords(pool);
    setSelectedWords([]);
    setFeedback('idle');
    setFeedbackMsg('');
  }, [levelNumber]);

  const handleWordSelect = (item: { id: string; word: string }) => {
    if (feedback === 'correct') return;
    playClick();
    setAvailableWords(prev => prev.filter(w => w.id !== item.id));
    setSelectedWords(prev => [...prev, item]);
    setFeedback('idle');
  };

  const handleWordRemove = (item: { id: string; word: string }) => {
    if (feedback === 'correct') return;
    playClick();
    setSelectedWords(prev => prev.filter(w => w.id !== item.id));
    setAvailableWords(prev => [...prev, item]);
    setFeedback('idle');
  };

  const handleReset = () => {
    playClick();
    const pool = currentLevelData.scrambledWords.map((w, idx) => ({
      id: `${w}-${idx}-${Date.now()}`,
      word: w,
    }));
    setAvailableWords(pool);
    setSelectedWords([]);
    setFeedback('idle');
    setFeedbackMsg('');
  };

  const handleCheck = () => {
    if (selectedWords.length === 0) return;

    const builtSentence = selectedWords.map(w => w.word).join(' ');
    if (builtSentence.trim().toLowerCase() === currentLevelData.fullSentence.trim().toLowerCase()) {
      playCorrect();
      setFeedback('correct');
      setFeedbackMsg('¡Excelente trabajo! Has formado la oración correctamente.');

      setTimeout(() => {
        onWin(currentLevelData.points);
      }, 1200);
    } else {
      playError();
      setFeedback('error');
      setFeedbackMsg('El orden no es el correcto todavía. ¡Lee de nuevo y reorganiza!');

      setTimeout(() => {
        setFeedback('idle');
      }, 2000);
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
            <span className="px-3.5 py-1.5 rounded-xl bg-stone-900 text-white font-extrabold text-xs shadow-2xs">
              Nivel {levelNumber}
            </span>
          </div>
        </div>

        {/* Instruction box */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xs font-black uppercase tracking-wider text-stone-500">
              Lenguaje: Ordena la Frase
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 font-medium mt-0.5">
              Toca las palabras en orden para construir una oración que tenga sentido completo.
            </p>
            <div className="mt-2 text-xs font-semibold text-amber-800 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200 inline-block">
              {currentLevelData.hint}
            </div>
          </div>
        </div>

        {/* Built Sentence Drop Area */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs min-h-[140px] flex flex-col justify-center">
          <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 text-center">
            Tu frase organizada (Toca una palabra para quitarla):
          </div>

          <div className="flex flex-wrap gap-2.5 items-center justify-center min-h-[52px] p-3.5 rounded-2xl bg-stone-50 border border-dashed border-stone-300">
            {selectedWords.length === 0 ? (
              <span className="text-xs sm:text-sm text-stone-400 italic">
                Toca las palabras de abajo para colocarlas aquí...
              </span>
            ) : (
              selectedWords.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleWordRemove(item)}
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-rose-600 text-white font-extrabold text-sm sm:text-base shadow-2xs active:scale-95 transition cursor-pointer"
                >
                  <span>{item.word}</span>
                </button>
              ))
            )}
          </div>

          {/* Feedback banner */}
          {feedback !== 'idle' && (
            <div
              className={`mt-4 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 ${
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

        {/* Word Chips Available */}
        <div className="space-y-2.5">
          <div className="text-center text-xs font-black uppercase text-stone-500 tracking-wider">
            Palabras disponibles:
          </div>

          <div className="flex flex-wrap gap-2.5 justify-center">
            {availableWords.map((item) => (
              <button
                key={item.id}
                onClick={() => handleWordSelect(item)}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 hover:border-amber-400 text-stone-800 font-extrabold text-sm sm:text-base shadow-xs active:scale-95 transition cursor-pointer"
              >
                {item.word}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 font-bold text-xs sm:text-sm shadow-xs hover:bg-stone-50 active:scale-95 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-stone-600" />
            <span>Reiniciar</span>
          </button>

          <button
            disabled={selectedWords.length === 0 || feedback === 'correct'}
            onClick={handleCheck}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-xs sm:text-sm shadow-xs active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Comprobar Frase</span>
          </button>
        </div>
      </div>
    </div>
  );
};
