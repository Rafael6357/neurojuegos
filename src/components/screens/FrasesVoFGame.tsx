import React, { useState } from 'react';
import { FRASES_VOF_LEVELS, GAMES_META, getLevelCount } from '../../data/gamesData';
import { CheckCircle2, XCircle } from 'lucide-react';
import { playClick, playCorrect, playError } from '../../utils/sound';
import { GameShell } from '../ui/GameShell';
import { Card } from '../ui/Card';
import type { FeedbackState } from '../../types';

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
  // El nivel siempre existe: NivelesScreen solo ofrece contenido real.
  const levelData = FRASES_VOF_LEVELS[levelNumber - 1] ?? FRASES_VOF_LEVELS[0];
  const meta = GAMES_META.frases_vof;

  const [ans1, setAns1] = useState<boolean | null>(null);
  const [ans2, setAns2] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const handleVerify = () => {
    playClick();
    if (ans1 === null || ans2 === null) {
      playError();
      setFeedback({ text: 'Por favor responde a ambas preguntas (Verdadero o Falso).', kind: 'error' });
      return;
    }

    const correct1 = ans1 === levelData.answer1;
    const correct2 = ans2 === levelData.answer2;

    if (correct1 && correct2) {
      playCorrect();
      setFeedback({ text: `¡Correcto! Has ganado ${levelData.points} puntos.`, kind: 'success' });
      setTimeout(() => {
        onWin(levelData.points);
      }, 700);
    } else {
      playError();
      setFeedback({ text: 'Lo siento, alguna respuesta es incorrecta. ¡Observa con atención e intenta de nuevo!', kind: 'error' });
    }
  };

  const handleReset = () => {
    playClick();
    setAns1(null);
    setAns2(null);
    setFeedback(null);
  };

  const renderVfButtons = (
    value: boolean | null,
    setValue: (v: boolean) => void,
    idPrefix: string
  ) => (
    <div className="flex gap-3">
      <button
        id={`${idPrefix}_true`}
        type="button"
        onClick={() => { playClick(); setValue(true); }}
        aria-pressed={value === true}
        className={`flex-1 py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition border active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
          value === true
            ? 'bg-emerald-500 text-white border-emerald-300 ring-2 ring-emerald-300/50 shadow-lg shadow-emerald-500/25'
            : 'bg-white/10 text-slate-100 border-white/15 hover:bg-white/15'
        }`}
      >
        <CheckCircle2 className="w-4 h-4" />
        <span>Verdadero</span>
      </button>

      <button
        id={`${idPrefix}_false`}
        type="button"
        onClick={() => { playClick(); setValue(false); }}
        aria-pressed={value === false}
        className={`flex-1 py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition border active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
          value === false
            ? 'bg-rose-500 text-white border-rose-300 ring-2 ring-rose-300/50 shadow-lg shadow-rose-500/25'
            : 'bg-white/10 text-slate-100 border-white/15 hover:bg-white/15'
        }`}
      >
        <XCircle className="w-4 h-4" />
        <span>Falso</span>
      </button>
    </div>
  );

  return (
    <GameShell
      backId="btn_frases_back_levels"
      resetId="btn_frases_reset"
      feedbackId="frases_feedback_banner"
      levelNumber={levelNumber}
      totalLevels={getLevelCount('frases_vof')}
      title="Frases Verdaderas o Falsas"
      area={meta.area}
      areaLabel={meta.areaLabel}
      instruction="Observa atentamente la escena y responde a cada afirmación"
      feedback={feedback}
      onBack={() => { playClick(); onReturnToLevels(); }}
      onReset={handleReset}
      resetLabel="Reiniciar"
      verify={{ id: 'btn_verificar_frases_vof', label: 'VERIFICAR RESPUESTAS', onClick: handleVerify }}
    >
      {/* Escena observable: sistema emoji (las fotos no existían) */}
      <Card className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4" role="img" aria-label={`Escena con ${levelData.emojis.length} elementos para observar`}>
          {levelData.emojis.map((emoji, i) => (
            <span
              key={i}
              className={`anim-pop-in stagger-${(i % 5) + 1} w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-indigo-400/30 to-teal-400/20 border border-white/15 flex items-center justify-center text-4xl sm:text-5xl shadow-lg`}
            >
              {emoji}
            </span>
          ))}
        </div>
      </Card>

      {/* Questions and True/False controls */}
      <div className="space-y-3.5">
        <Card className="p-4 sm:p-5">
          <p className="font-extrabold text-slate-50 text-sm sm:text-base mb-3">
            1. {levelData.statement1}
          </p>
          {renderVfButtons(ans1, setAns1, 'btn_s1')}
        </Card>

        <Card className="p-4 sm:p-5">
          <p className="font-extrabold text-slate-50 text-sm sm:text-base mb-3">
            2. {levelData.statement2}
          </p>
          {renderVfButtons(ans2, setAns2, 'btn_s2')}
        </Card>
      </div>
    </GameShell>
  );
};
