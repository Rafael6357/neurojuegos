import React, { useState, useEffect } from 'react';
import { ORDENAR_LEVELS, OrdenaFraseLevel, GAMES_META, getLevelCount } from '../../data/gamesData';
import { playClick, playCorrect, playError } from '../../utils/sound';
import { Sparkles, AlertCircle, Lightbulb, Check } from 'lucide-react';
import { GameShell } from '../ui/GameShell';
import { Card } from '../ui/Card';
import type { FeedbackState } from '../../types';

interface OrdenaFraseGameProps {
  levelNumber: number;
  onWin: (points: number) => void;
  onReturnToLevels: () => void;
}

interface WordChip {
  id: string;
  word: string;
}

let chipSeq = 0;
const makePool = (words: string[]): WordChip[] =>
  words.map(w => ({ id: `${w}-${chipSeq++}`, word: w }));

export const OrdenaFraseGame: React.FC<OrdenaFraseGameProps> = ({
  levelNumber,
  onWin,
  onReturnToLevels,
}) => {
  const currentLevelData: OrdenaFraseLevel =
    ORDENAR_LEVELS[levelNumber - 1] ?? ORDENAR_LEVELS[0];
  const meta = GAMES_META.ordenar;

  // Pool of available word chips
  const [availableWords, setAvailableWords] = useState<WordChip[]>([]);
  // Words placed into the sentence by the child
  const [selectedWords, setSelectedWords] = useState<WordChip[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const won = feedback?.kind === 'success';

  // Setup words when level changes
  useEffect(() => {
    setAvailableWords(makePool(currentLevelData.scrambledWords));
    setSelectedWords([]);
    setFeedback(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelNumber]);

  const handleWordSelect = (item: WordChip) => {
    if (won) return;
    playClick();
    setAvailableWords(prev => prev.filter(w => w.id !== item.id));
    setSelectedWords(prev => [...prev, item]);
    setFeedback(null);
  };

  const handleWordRemove = (item: WordChip) => {
    if (won) return;
    playClick();
    setSelectedWords(prev => prev.filter(w => w.id !== item.id));
    setAvailableWords(prev => [...prev, item]);
    setFeedback(null);
  };

  const handleReset = () => {
    playClick();
    setAvailableWords(makePool(currentLevelData.scrambledWords));
    setSelectedWords([]);
    setFeedback(null);
  };

  const handleCheck = () => {
    if (selectedWords.length === 0) return;

    const builtSentence = selectedWords.map(w => w.word).join(' ');
    if (builtSentence.trim().toLowerCase() === currentLevelData.fullSentence.trim().toLowerCase()) {
      playCorrect();
      setFeedback({ text: '¡Excelente trabajo! Has formado la oración correctamente.', kind: 'success' });

      setTimeout(() => {
        onWin(currentLevelData.points);
      }, 1200);
    } else {
      playError();
      setFeedback({ text: 'El orden no es el correcto todavía. ¡Lee de nuevo y reorganiza!', kind: 'error' });

      setTimeout(() => {
        setFeedback(current => (current?.kind === 'error' ? null : current));
      }, 2000);
    }
  };

  return (
    <GameShell
      backId="btn_ordenar_back_levels"
      resetId="btn_ordenar_reset"
      feedbackId="ordena_feedback_banner"
      levelNumber={levelNumber}
      totalLevels={getLevelCount('ordenar')}
      title="Ordena la Frase"
      area={meta.area}
      areaLabel="Lenguaje: Ordena la Frase"
      instruction="Toca las palabras en orden para construir una oración que tenga sentido completo."
      feedback={feedback}
      onBack={() => { playClick(); onReturnToLevels(); }}
      onReset={handleReset}
      resetLabel="Reiniciar"
    >
      {/* Hint */}
      <div className="flex items-start gap-2.5 text-xs font-semibold text-amber-200 bg-amber-400/10 px-3.5 py-2.5 rounded-2xl border border-amber-400/30">
        <Lightbulb className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
        <span>{currentLevelData.hint}</span>
      </div>

      {/* Built Sentence Drop Area */}
      <Card className="p-6 sm:p-8 min-h-[140px] flex flex-col justify-center">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 text-center">
          Tu frase organizada (Toca una palabra para quitarla):
        </div>

        <div className="flex flex-wrap gap-2.5 items-center justify-center min-h-[52px] p-3.5 rounded-2xl bg-black/30 border border-dashed border-white/20">
          {selectedWords.length === 0 ? (
            <span className="text-xs sm:text-sm text-slate-500 italic">
              Toca las palabras de abajo para colocarlas aquí...
            </span>
          ) : (
            selectedWords.map((item) => (
              <button
                key={item.id}
                id={`ordena_chip_sel_${item.id}`}
                onClick={() => handleWordRemove(item)}
                className="px-4 py-2 rounded-xl bg-gradient-to-b from-teal-300 to-teal-500 hover:from-rose-300 hover:to-rose-500 text-indigo-950 font-extrabold text-sm sm:text-base shadow active:scale-95 transition cursor-pointer border border-white/30"
              >
                <span>{item.word}</span>
              </button>
            ))
          )}
        </div>
      </Card>

      {/* Word Chips Available */}
      <div className="space-y-2.5">
        <div className="text-center text-xs font-black uppercase text-slate-300 tracking-wider">
          Palabras disponibles:
        </div>

        <div className="flex flex-wrap gap-2.5 justify-center">
          {availableWords.map((item) => (
            <button
              key={item.id}
              id={`ordena_chip_avail_${item.id}`}
              onClick={() => handleWordSelect(item)}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-teal-400/25 border border-white/15 hover:border-teal-300/60 text-slate-50 font-extrabold text-sm sm:text-base active:scale-95 transition cursor-pointer"
            >
              {item.word}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          id="btn_ordena_check"
          disabled={selectedWords.length === 0 || won}
          onClick={handleCheck}
          className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-500 hover:brightness-110 text-white font-black text-xs sm:text-sm shadow-lg shadow-teal-500/25 active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer border border-white/20"
        >
          <Check className="w-4 h-4" />
          <span>Comprobar Frase</span>
        </button>
      </div>

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
