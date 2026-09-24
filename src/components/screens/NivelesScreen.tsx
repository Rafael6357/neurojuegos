import React from 'react';
import { Player, GameType, ScreenType } from '../../types';
import { GAMES_META, getLevelCount } from '../../data/gamesData';
import { getGameLevel, getGameScore } from '../../services/storage';
import { Lock, Star, Trophy, ArrowLeft, Check, Rocket } from 'lucide-react';
import { playClick } from '../../utils/sound';
import { CosmicBackground } from '../ui/CosmicBackground';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/Progress';

interface NivelesScreenProps {
  gameType: GameType;
  player: Player | null;
  onSelectLevel: (level: number) => void;
  onNavigate: (screen: ScreenType) => void;
}

/** Posición serpenteante del sendero (patrón Duolingo): clases literales. */
const LANE = ['justify-start pl-2', 'justify-center', 'justify-end pr-2', 'justify-center'];

export const NivelesScreen: React.FC<NivelesScreenProps> = ({
  gameType,
  player,
  onSelectLevel,
  onNavigate,
}) => {
  const meta = GAMES_META[gameType];
  const totalLevels = getLevelCount(gameType);
  const unlocked = player ? getGameLevel(player, gameType) : 1;
  const gameScore = player ? getGameScore(player, gameType) : 0;

  const levels = Array.from({ length: totalLevels }, (_, i) => i + 1);
  const completed = Math.min(unlocked - 1, totalLevels);

  return (
    <CosmicBackground>
      <div className="max-w-2xl mx-auto space-y-6 p-4 sm:p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-2">
          <button
            id="btn_niveles_back_minijuegos"
            onClick={() => { playClick(); onNavigate('panel_minijuegos'); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-100 font-bold text-xs sm:text-sm border border-white/15 active:scale-95 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-300" />
            <span>Volver a Minijuegos</span>
          </button>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs sm:text-sm font-black text-amber-300">
            <Trophy className="w-4 h-4" />
            <span>Puntos: {gameScore}</span>
          </div>
        </div>

        {/* Title banner */}
        <Card className="p-6 text-center relative overflow-hidden">
          <div className="orbit-ring w-64 h-64 left-1/2 -translate-x-1/2 -top-32 opacity-50" aria-hidden="true" />
          <div className="relative">
            <span className={`inline-flex w-16 h-16 rounded-full bg-gradient-to-br ${meta.planetGradient} items-center justify-center text-3xl shadow-lg ${meta.planetGlow} border border-white/30 mb-2`} aria-hidden="true">
              {meta.emoji}
            </span>
            <div>
              <Badge tone={meta.area === 'lenguaje' ? 'teal' : meta.area === 'memoria' ? 'violet' : 'amber'}>
                Progresión de Niveles
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-50 tracking-tight mt-2 mb-1">
              {meta.levelsTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold">
              {completed} de {totalLevels} estrellas conquistadas • Selecciona un nivel desbloqueado
            </p>
            <ProgressBar value={completed} max={totalLevels} gradient="from-amber-300 to-orange-500" className="mt-3 max-w-xs mx-auto" />
          </div>
        </Card>

        {/* Star path */}
        <Card className="p-5 sm:p-8">
          <div className="flex flex-col gap-1" role="list" aria-label={`Niveles de ${meta.title}`}>
            {levels.map((lvl, i) => {
              const isUnlocked = lvl <= unlocked;
              const isCurrent = lvl === unlocked;
              const isDone = lvl < unlocked;

              return (
                <div key={lvl} role="listitem" className={`flex w-full ${LANE[i % LANE.length]}`}>
                  <div className="flex flex-col items-center">
                    {i > 0 && (
                      <span className={`w-1 h-5 rounded-full mb-1 ${lvl <= unlocked ? 'bg-amber-300/70' : 'bg-white/10'}`} aria-hidden="true" />
                    )}
                    <button
                      id={`btn_level_${lvl}`}
                      disabled={!isUnlocked}
                      onClick={() => {
                        playClick();
                        onSelectLevel(lvl);
                      }}
                      aria-label={`Nivel ${lvl}${isDone ? ' completado' : isCurrent ? ' actual' : ' bloqueado'}`}
                      className={`relative w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center transition-all ${
                        isDone
                          ? 'bg-gradient-to-b from-amber-300 to-amber-500 text-indigo-950 shadow-[0_6px_18px_rgba(251,191,36,0.4)] border-2 border-amber-200/70 hover:brightness-110 active:scale-95 cursor-pointer'
                          : isCurrent
                            ? 'bg-gradient-to-b from-white/20 to-white/5 text-white border-2 border-amber-300 shadow-[0_0_24px_rgba(251,191,36,0.45)] hover:bg-white/15 active:scale-95 cursor-pointer anim-glow'
                            : 'bg-white/[0.04] text-slate-600 border-2 border-white/10 cursor-not-allowed opacity-60'
                      }`}
                    >
                      {isCurrent && (
                        <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-indigo-950 border border-amber-400/60 text-amber-300 text-[9px] font-black uppercase shadow">
                          Actual
                        </span>
                      )}
                      {isDone ? (
                        <Check className="w-7 h-7 stroke-[3]" />
                      ) : isUnlocked ? (
                        <>
                          <span className="text-xl sm:text-2xl font-black leading-none">{lvl}</span>
                          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                        </>
                      ) : (
                        <Lock className="w-6 h-6" />
                      )}
                    </button>
                    {isCurrent && (
                      <span className="mt-1.5 flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-amber-300">
                        <Rocket className="w-3 h-3" /> ¡Juega aquí!
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </CosmicBackground>
  );
};
