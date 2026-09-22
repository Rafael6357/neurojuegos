import React, { useState } from 'react';
import { ADIVINA_LEVELS } from '../../data/gamesData';
import { ArrowLeft, RotateCcw, Heart, Lightbulb, Sparkles } from 'lucide-react';
import { playClick, playCorrect, playError } from '../../utils/sound';

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
  const levelIndex = (levelNumber - 1) % ADIVINA_LEVELS.length;
  const levelData = ADIVINA_LEVELS[levelIndex];
  const targetWord = levelData.word.toUpperCase();

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ text: string; success: boolean } | null>(null);

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
        setFeedback({ text: `¡Correcto! Has ganado ${levelData.points} puntos.`, success: true });
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
          success: false,
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
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-6 bg-gradient-to-b from-emerald-50 via-amber-50 to-teal-100">
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Navigation & Level indicator */}
        <div className="flex items-center justify-between">
          <button
            id="btn_adivina_back_levels"
            onClick={() => { playClick(); onReturnToLevels(); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-emerald-50 text-slate-800 font-bold text-sm shadow-sm border border-emerald-300 active:scale-95 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Niveles</span>
          </button>

          <div className="px-4 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm shadow-sm">
            Nivel {levelNumber}
          </div>

          <button
            id="btn_adivina_reset"
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white hover:bg-emerald-50 text-slate-800 font-bold text-xs shadow-sm border border-emerald-300 active:scale-95 transition"
            title="Reiniciar palabra"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Adivina la Palabra
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
            Descubre las letras que forman la palabra oculta
          </p>
        </div>

        {/* Hint banner */}
        <div className="bg-amber-100/90 border-2 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-xs flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-400 text-amber-950 shrink-0">
            <Lightbulb className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-amber-800 tracking-wider block">
              Pista Semántica
            </span>
            <p className="text-base sm:text-lg font-bold text-amber-950">
              {levelData.hint}
            </p>
          </div>
        </div>

        {/* Attempts indicator */}
        <div className="flex items-center justify-between px-4 py-2 bg-white/80 rounded-2xl border border-emerald-200 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Intentos Restantes:
          </span>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: levelData.maxAttempts }).map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 transition-all ${
                  i < remainingAttempts
                    ? 'text-rose-500 fill-rose-500 animate-pulse'
                    : 'text-slate-300 fill-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Word Blanks Card */}
        <div className="bg-white/95 rounded-3xl border-3 border-emerald-400 p-6 sm:p-8 shadow-md flex justify-center items-center gap-2 sm:gap-3 flex-wrap">
          {targetWord.split('').map((letter, idx) => {
            const isRevealed = guessedLetters.includes(letter) || isGameOver;

            return (
              <div
                key={idx}
                className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl flex items-center justify-center font-black text-2xl sm:text-3xl border-3 transition-all ${
                  isRevealed
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm'
                    : 'bg-slate-50 border-dashed border-slate-300 text-transparent'
                }`}
              >
                {isRevealed ? letter : '_'}
              </div>
            );
          })}
        </div>

        {/* Feedback alert */}
        {feedback && (
          <div
            id="adivina_feedback_banner"
            className={`p-3.5 rounded-2xl text-sm font-bold text-center border-2 transition ${
              feedback.success
                ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                : 'bg-rose-100 border-rose-400 text-rose-900'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* On-screen alphabet keyboard */}
        <div className="bg-white/90 rounded-3xl border-2 border-emerald-300 p-4 shadow-sm">
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
                  className={`aspect-square rounded-xl font-black text-sm sm:text-base transition active:scale-90 flex items-center justify-center ${
                    isCorrect
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : isWrong
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-amber-100 hover:bg-emerald-200 text-slate-800 border border-amber-300/60 shadow-xs cursor-pointer'
                  }`}
                >
                  {char}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
