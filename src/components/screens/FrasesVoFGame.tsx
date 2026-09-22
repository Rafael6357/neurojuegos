import React, { useState } from 'react';
import { FRASES_VOF_LEVELS } from '../../data/gamesData';
import { CheckCircle2, ArrowLeft, RotateCcw } from 'lucide-react';
import { playClick, playCorrect, playError } from '../../utils/sound';

interface FrasesVoFGameProps {
  levelNumber: number;
  onWin: (points: number) => void;
  onReturnToLevels: () => void;
}

export const FrasesVoFGame: React.FC<FrasesVoFGameProps> = ({
  levelNumber,
  onWin,
  onReturnToLevels,
}) => {
  // Select level data (modulo wrapped if level > predefined)
  const levelIndex = (levelNumber - 1) % FRASES_VOF_LEVELS.length;
  const levelData = FRASES_VOF_LEVELS[levelIndex];

  const [ans1, setAns1] = useState<boolean | null>(null);
  const [ans2, setAns2] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<{ text: string; success: boolean } | null>(null);

  const handleVerify = () => {
    playClick();
    if (ans1 === null || ans2 === null) {
      playError();
      setFeedback({ text: 'Por favor responde a ambas preguntas (Verdadero o Falso).', success: false });
      return;
    }

    const correct1 = ans1 === levelData.answer1;
    const correct2 = ans2 === levelData.answer2;

    if (correct1 && correct2) {
      playCorrect();
      setFeedback({ text: `¡Correcto! Has ganado ${levelData.points} puntos.`, success: true });
      setTimeout(() => {
        onWin(levelData.points);
      }, 700);
    } else {
      playError();
      setFeedback({ text: 'Lo siento, alguna respuesta es incorrecta. ¡Observa con atención e intenta de nuevo!', success: false });
    }
  };

  const handleReset = () => {
    playClick();
    setAns1(null);
    setAns2(null);
    setFeedback(null);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-6 bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200">
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Navigation & Level indicator */}
        <div className="flex items-center justify-between">
          <button
            id="btn_frases_back_levels"
            onClick={() => { playClick(); onReturnToLevels(); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-amber-50 text-amber-950 font-bold text-sm shadow-sm border border-amber-300 active:scale-95 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Niveles</span>
          </button>

          <div className="px-4 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-sm shadow-sm">
            Nivel {levelNumber}
          </div>

          <button
            id="btn_frases_reset"
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-white hover:bg-amber-50 text-amber-950 font-bold text-xs shadow-sm border border-amber-300 active:scale-95 transition"
            title="Reiniciar respuestas"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>

        {/* Game Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-amber-950">
            Frases Verdaderas o Falsas
          </h1>
          <p className="text-xs sm:text-sm text-amber-900/80 font-semibold mt-0.5">
            Observa atentamente la imagen y responde a cada afirmación
          </p>
        </div>

        {/* Images Display Card */}
        <div className="bg-white/95 rounded-3xl border-3 border-amber-400 p-4 sm:p-6 shadow-md">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300 bg-amber-50 shadow-inner max-w-xs max-h-56">
              <img
                src={levelData.image1}
                alt="Imagen para observación"
                className="w-full h-full object-contain max-h-52"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/fondo_pantalla_carga.jpg';
                }}
              />
            </div>
            {levelData.image2 && (
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300 bg-amber-50 shadow-inner max-w-xs max-h-56">
                <img
                  src={levelData.image2}
                  alt="Imagen 2 para observación"
                  className="w-full h-full object-contain max-h-52"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/fondo_pantalla_carga.jpg';
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Feedback alert */}
        {feedback && (
          <div
            id="frases_feedback_banner"
            className={`p-3.5 rounded-2xl text-sm font-bold text-center border-2 transition ${
              feedback.success
                ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                : 'bg-rose-100 border-rose-400 text-rose-900'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* Questions and True/False controls */}
        <div className="space-y-4">
          {/* Statement 1 */}
          <div className="bg-white/90 rounded-3xl border-2 border-amber-300 p-4 sm:p-5 shadow-xs">
            <p className="font-extrabold text-slate-800 text-base sm:text-lg mb-3">
              1. {levelData.statement1}
            </p>
            <div className="flex gap-4">
              <button
                id="btn_s1_true"
                type="button"
                onClick={() => { playClick(); setAns1(true); }}
                className={`flex-1 py-3 px-4 rounded-2xl font-black text-base transition border-2 active:scale-95 flex items-center justify-center gap-2 ${
                  ans1 === true
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300'
                    : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Verdadero</span>
              </button>

              <button
                id="btn_s1_false"
                type="button"
                onClick={() => { playClick(); setAns1(false); }}
                className={`flex-1 py-3 px-4 rounded-2xl font-black text-base transition border-2 active:scale-95 flex items-center justify-center gap-2 ${
                  ans1 === false
                    ? 'bg-rose-500 text-white border-rose-600 shadow-md ring-2 ring-rose-300'
                    : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                }`}
              >
                <span>Falso</span>
              </button>
            </div>
          </div>

          {/* Statement 2 */}
          <div className="bg-white/90 rounded-3xl border-2 border-amber-300 p-4 sm:p-5 shadow-xs">
            <p className="font-extrabold text-slate-800 text-base sm:text-lg mb-3">
              2. {levelData.statement2}
            </p>
            <div className="flex gap-4">
              <button
                id="btn_s2_true"
                type="button"
                onClick={() => { playClick(); setAns2(true); }}
                className={`flex-1 py-3 px-4 rounded-2xl font-black text-base transition border-2 active:scale-95 flex items-center justify-center gap-2 ${
                  ans2 === true
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300'
                    : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Verdadero</span>
              </button>

              <button
                id="btn_s2_false"
                type="button"
                onClick={() => { playClick(); setAns2(false); }}
                className={`flex-1 py-3 px-4 rounded-2xl font-black text-base transition border-2 active:scale-95 flex items-center justify-center gap-2 ${
                  ans2 === false
                    ? 'bg-rose-500 text-white border-rose-600 shadow-md ring-2 ring-rose-300'
                    : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                }`}
              >
                <span>Falso</span>
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          id="btn_verificar_frases_vof"
          onClick={handleVerify}
          className="w-full py-4 px-6 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-lg shadow-xl active:scale-95 transition border-b-6 border-amber-800"
        >
          VERIFICAR RESPUESTAS
        </button>
      </div>
    </div>
  );
};
