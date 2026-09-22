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
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-6 bg-[#131722] text-slate-100">
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Navigation & Level indicator */}
        <div className="flex items-center justify-between">
          <button
            id="btn_frases_back_levels"
            onClick={() => { playClick(); onReturnToLevels(); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1C212E] hover:bg-[#252B3B] text-slate-200 font-bold text-xs sm:text-sm shadow-xs border border-slate-700 active:scale-95 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>Niveles</span>
          </button>

          <div className="px-3.5 py-1.5 rounded-xl bg-amber-600 text-white font-extrabold text-xs shadow-2xs border border-amber-500">
            Nivel {levelNumber}
          </div>

          <button
            id="btn_frases_reset"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1C212E] hover:bg-[#252B3B] text-slate-200 font-bold text-xs shadow-xs border border-slate-700 active:scale-95 transition cursor-pointer"
            title="Reiniciar respuestas"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>

        {/* Game Title */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Frases Verdaderas o Falsas
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
            Observa atentamente la imagen y responde a cada afirmación
          </p>
        </div>

        {/* Images Display Card */}
        <div className="bg-[#1C212E] rounded-3xl border border-slate-700/80 p-4 sm:p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xs max-w-xs max-h-56">
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
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xs max-w-xs max-h-56">
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
            className={`p-3.5 rounded-xl text-xs sm:text-sm font-bold text-center border transition ${
              feedback.success
                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* Questions and True/False controls */}
        <div className="space-y-3.5">
          {/* Statement 1 */}
          <div className="bg-[#1C212E] rounded-2xl border border-slate-700/80 p-4 sm:p-5 shadow-xs">
            <p className="font-extrabold text-slate-100 text-sm sm:text-base mb-3">
              1. {levelData.statement1}
            </p>
            <div className="flex gap-3">
              <button
                id="btn_s1_true"
                type="button"
                onClick={() => { playClick(); setAns1(true); }}
                className={`flex-1 py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition border active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                  ans1 === true
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-2xs ring-2 ring-emerald-400/40'
                    : 'bg-[#23293A] text-slate-200 border-slate-700 hover:bg-[#2B3245]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verdadero</span>
              </button>

              <button
                id="btn_s1_false"
                type="button"
                onClick={() => { playClick(); setAns1(false); }}
                className={`flex-1 py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition border active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                  ans1 === false
                    ? 'bg-rose-600 text-white border-rose-500 shadow-2xs ring-2 ring-rose-400/40'
                    : 'bg-[#23293A] text-slate-200 border-slate-700 hover:bg-[#2B3245]'
                }`}
              >
                <span>Falso</span>
              </button>
            </div>
          </div>

          {/* Statement 2 */}
          <div className="bg-[#1C212E] rounded-2xl border border-slate-700/80 p-4 sm:p-5 shadow-xs">
            <p className="font-extrabold text-slate-100 text-sm sm:text-base mb-3">
              2. {levelData.statement2}
            </p>
            <div className="flex gap-3">
              <button
                id="btn_s2_true"
                type="button"
                onClick={() => { playClick(); setAns2(true); }}
                className={`flex-1 py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition border active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                  ans2 === true
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-2xs ring-2 ring-emerald-400/40'
                    : 'bg-[#23293A] text-slate-200 border-slate-700 hover:bg-[#2B3245]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verdadero</span>
              </button>

              <button
                id="btn_s2_false"
                type="button"
                onClick={() => { playClick(); setAns2(false); }}
                className={`flex-1 py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition border active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                  ans2 === false
                    ? 'bg-rose-600 text-white border-rose-500 shadow-2xs ring-2 ring-rose-400/40'
                    : 'bg-[#23293A] text-slate-200 border-slate-700 hover:bg-[#2B3245]'
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
          className="w-full py-3 px-6 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-sm sm:text-base shadow-xs active:scale-[0.98] transition cursor-pointer border border-amber-500"
        >
          VERIFICAR RESPUESTAS
        </button>
      </div>
    </div>
  );
};
