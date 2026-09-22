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
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-6 bg-[#FAF8F5]">
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Navigation & Level indicator */}
        <div className="flex items-center justify-between">
          <button
            id="btn_adivina_back_levels"
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
            id="btn_adivina_reset"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs shadow-xs border border-stone-200 active:scale-95 transition cursor-pointer"
            title="Reiniciar palabra"
          >
            <RotateCcw className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Adivina la Palabra
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
            Descubre las letras que forman la palabra oculta
          </p>
        </div>

        {/* Hint banner */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-900 shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase text-amber-800 tracking-wider block">
              Pista Semántica
            </span>
            <p className="text-base sm:text-lg font-extrabold text-stone-900 mt-0.5">
              {levelData.hint}
            </p>
          </div>
        </div>

        {/* Attempts indicator */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white rounded-xl border border-stone-200 shadow-2xs">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
            Intentos Restantes:
          </span>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: levelData.maxAttempts }).map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 transition-all ${
                  i < remainingAttempts
                    ? 'text-rose-500 fill-rose-500'
                    : 'text-stone-300 fill-stone-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Word Blanks Card */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs flex justify-center items-center gap-2 sm:gap-3 flex-wrap min-h-[110px]">
          {targetWord.split('').map((letter, idx) => {
            const isRevealed = guessedLetters.includes(letter) || isGameOver;

            return (
              <div
                key={idx}
                className={`w-10 h-13 sm:w-14 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-xl sm:text-2xl transition-all ${
                  isRevealed
                    ? 'bg-amber-50 border-2 border-amber-500 text-amber-950 shadow-2xs'
                    : 'bg-stone-50 border border-dashed border-stone-300 text-transparent'
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
            className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold text-center border transition ${
              feedback.success
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* On-screen alphabet keyboard */}
        <div className="bg-white rounded-3xl border border-stone-200 p-3 sm:p-5 shadow-xs">
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
                  className={`aspect-square rounded-lg sm:rounded-xl font-black text-xs sm:text-sm transition active:scale-95 flex items-center justify-center cursor-pointer ${
                    isCorrect
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : isWrong
                      ? 'bg-stone-100 text-stone-300 border border-stone-200 cursor-not-allowed'
                      : 'bg-stone-50 hover:bg-amber-100 text-stone-800 border border-stone-200 shadow-2xs'
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
