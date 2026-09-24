import React from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import type { AreaId, FeedbackState } from '../../types';
import { AREA_STYLES } from './accent';
import { Badge } from './Badge';

interface VerifyAction {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface GameShellProps {
  backId: string;
  levelBadgeId?: string;
  resetId?: string;
  feedbackId: string;
  levelNumber: number;
  totalLevels: number;
  title: string;
  area: AreaId;
  areaLabel: string;
  instruction: string;
  feedback: FeedbackState | null;
  onBack: () => void;
  onReset?: () => void;
  resetLabel?: string;
  verify?: VerifyAction;
  children: React.ReactNode;
}

/**
 * Estructura común de los 10 juegos: barra superior (volver/nivel/reiniciar),
 * cabecera con área, instrucción, banner de feedback y CTA de verificación.
 */
export const GameShell: React.FC<GameShellProps> = ({
  backId,
  levelBadgeId,
  resetId,
  feedbackId,
  levelNumber,
  totalLevels,
  title,
  area,
  areaLabel,
  instruction,
  feedback,
  onBack,
  onReset,
  resetLabel = 'Reiniciar',
  verify,
  children,
}) => {
  const accent = AREA_STYLES[area];

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Barra superior */}
        <div className="flex items-center justify-between gap-2">
          <button
            id={backId}
            onClick={onBack}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-100 font-bold text-xs sm:text-sm border border-white/15 active:scale-95 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-300" />
            <span>Niveles</span>
          </button>

          <div
            id={levelBadgeId}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 text-indigo-950 font-black text-xs shadow-[0_4px_14px_rgba(251,191,36,0.35)]"
          >
            Nivel {levelNumber} de {totalLevels}
          </div>

          {onReset ? (
            <button
              id={resetId}
              onClick={onReset}
              title={resetLabel}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-100 font-bold text-xs border border-white/15 active:scale-95 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-300" />
              <span className="hidden sm:inline">{resetLabel}</span>
            </button>
          ) : (
            <span className="w-[52px] sm:w-[110px]" aria-hidden="true" />
          )}
        </div>

        {/* Cabecera del juego */}
        <div className="text-center anim-rise-in">
          <Badge tone={area === 'lenguaje' ? 'teal' : area === 'memoria' ? 'violet' : 'amber'}>
            {areaLabel}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-50 tracking-tight mt-2">
            {title}
          </h1>
          <p className={`text-xs sm:text-sm font-semibold mt-1 ${accent.text}`}>{instruction}</p>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            id={feedbackId}
            role="status"
            className={`anim-pop-in p-3.5 rounded-2xl text-xs sm:text-sm font-bold text-center border ${
              feedback.kind === 'success'
                ? 'bg-emerald-400/10 border-emerald-400/40 text-emerald-200'
                : feedback.kind === 'error'
                  ? 'bg-rose-400/10 border-rose-400/40 text-rose-200'
                  : 'bg-sky-400/10 border-sky-400/40 text-sky-200'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {children}

        {/* CTA de verificación */}
        {verify && (
          <button
            id={verify.id}
            onClick={verify.onClick}
            disabled={verify.disabled}
            className={`w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r ${accent.gradient} text-white font-black text-sm sm:text-base shadow-lg ${accent.glow} hover:brightness-110 active:scale-[0.98] transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border border-white/20`}
          >
            {verify.label}
          </button>
        )}
      </div>
    </div>
  );
};
