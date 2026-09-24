import React, { useState } from 'react';
import { ADIVINA_LEVELS, GAMES_META, getLevelCount } from '../../data/gamesData';
import { Heart, Lightbulb } from 'lucide-react';
import { playClick, playCorrect, playError } from '../../utils/sound';
import { GameShell } from '../ui/GameShell';
import { Card } from '../ui/Card';
import type { FeedbackState } from '../../types';

interface AdivinaPalabraGameProps {
  levelNumber: number;
  onWin: (points: number) => void;
  onReturnToLevels: () => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

export const AdivinaPalabraGame: React.FC<AdivinaPalabraGameProps> = ({
  levelNumber,
  onWin,
  onReturnToLevels,
}) => {
  const levelData = ADIVINA_LEVELS[levelNumber - 1] ?? ADIVINA_LEVELS[0];
  const meta = GAMES_META.adivina_palabra;
  const targetWord = levelData.word.toUpperCase();

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  // Compute wrong guesses
  const wrongGuesses = guessedLetters.filter(l => !targetWord.includes(l));
  const remainingAttempts = Math.max(0, levelData.maxAttempts - wrongGuesses.length);

  // Check if won
  const isWordGuessed = targetWord.split('').every(char => guessedLetters.includes(char));
  const isGameOver = remainingAttempts === 0 && !isWordGuessed;

  const handleGuessLetter = (letter: string) => {
    if (guessedLetters.includes(letter) || isGameOver || isWordGuessed) return;

    playClick();
    const nextGuessed = [...guessedLetters, letter];
    setGuessedLetters(nextGuessed);

    if (targetWord.includes(letter)) {
      // Check if winning move
      const nowWon = targetWord.split('').every(char => nextGuessed.includes(char));
      if (nowWon) {
        playCorrect();
        setFeedback({ text: `¡Correcto! Has ganado ${levelData.points} puntos.`, kind: 'success' });
        setTimeout(() => {
          onWin(levelData.points);
        }, 800);
      }
    } else {
      playError();
      const newWrongCount = nextGuessed.filter(l => !targetWord.includes(l)).length;
      if (newWrongCount >= levelData.maxAttempts) {
        setFeedback({
          text: `Se agotaron los intentos. La palabra era "${targetWord}". ¡Inténtalo de nuevo!`,
          kind: 'error',
        });
      }
    }
  };

  const handleReset = () => {
    playClick();
    setGuessedLetters([]);
    setFeedback(null);
  };

  return (
    <GameShell
      backId="btn_adivina_back_levels"
      resetId="btn_adivina_reset"
      feedbackId="adivina_feedback_banner"
      levelNumber={levelNumber}
      totalLevels={getLevelCount('adivina_palabra')}
      title="Adivina la Palabra"
      area={meta.area}
      areaLabel={meta.areaLabel}
      instruction="Descubre las letras que forman la palabra oculta"
      feedback={feedback}
      onBack={() => { playClick(); onReturnToLevels(); }}
      onReset={handleReset}
      resetLabel="Reiniciar"
    >
      {/* Hint banner */}
      <Card className="p-4 sm:p-5 flex items-center gap-3.5">
        <div className="p-2.5 rounded-2xl bg-amber-400/10 text-amber-300 border border-amber-400/30 shrink-0">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <span className="text-[11px] font-black uppercase text-amber-300 tracking-wider block">
            Pista Semántica
          </span>
          <p className="text-base sm:text-lg font-extrabold text-slate-50 mt-0.5">
            {levelData.hint}
          </p>
        </div>
      </Card>

      {/* Attempts indicator */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] rounded-2xl border border-white/10">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Intentos Restantes:
        </span>
        <div className="flex items-center gap-1.5" role="status" aria-label={`${remainingAttempts} intentos restantes`}>
          {Array.from({ length: levelData.maxAttempts }).map((_, i) => (
            <Heart
              key={i}
              className={`w-4 h-4 transition-all ${
                i < remainingAttempts
                  ? 'text-rose-400 fill-rose-400'
                  : 'text-slate-700 fill-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Word Blanks Card */}
      <Card className="p-6 sm:p-8 flex justify-center items-center gap-2 sm:gap-3 flex-wrap min-h-[110px]">
        {targetWord.split('').map((letter, idx) => {
          const isRevealed = guessedLetters.includes(letter) || isGameOver;

          return (
            <div
              key={idx}
              className={`w-10 h-12 sm:w-14 sm:h-16 rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl transition-all ${
                isRevealed
                  ? 'bg-amber-400/15 border-2 border-amber-300 text-amber-100 shadow-[0_0_14px_rgba(251,191,36,0.2)]'
                  : 'bg-white/[0.04] border border-dashed border-white/20 text-transparent'
              }`}
            >
              {isRevealed ? letter : '_'}
            </div>
          );
        })}
      </Card>

      {/* On-screen alphabet keyboard */}
      <Card className="p-3 sm:p-5">
        <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5 sm:gap-2">
          {ALPHABET.map((char) => {
            const isUsed = guessedLetters.includes(char);
            const isCorrect = isUsed && targetWord.includes(char);
            const isWrong = isUsed && !targetWord.includes(char);

            return (
              <button
                key={char}
                id={`key_${char}`}
                disabled={isUsed || isGameOver || isWordGuessed}
                onClick={() => handleGuessLetter(char)}
                aria-label={`Letra ${char}`}
                className={`aspect-square rounded-xl font-black text-xs sm:text-sm transition active:scale-95 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed ${
                  isCorrect
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : isWrong
                    ? 'bg-white/[0.03] text-slate-700 border border-white/10'
                    : 'bg-white/10 hover:bg-amber-400/25 text-slate-50 border border-white/15'
                }`}
              >
                {char}
              </button>
            );
          })}
        </div>
      </Card>
    </GameShell>
  );
};
