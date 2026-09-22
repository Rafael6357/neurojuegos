import React from 'react';
import { Player, GameType, ScreenType } from '../../types';
import { TOTAL_LEVELS_COUNT } from '../../data/gamesData';
import { Lock, Star, Trophy, ArrowLeft, Play } from 'lucide-react';
import { playClick } from '../../utils/sound';

interface NivelesScreenProps {
  gameType: GameType;
  player: Player | null;
  onSelectLevel: (level: number) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const NivelesScreen: React.FC<NivelesScreenProps> = ({
  gameType,
  player,
  onSelectLevel,
  onNavigate,
}) => {
  let title = '';
  let maxLevel = 1;
  let gameScore = 0;
  let themeColor = 'from-amber-500 to-orange-600';

  switch (gameType) {
    case 'frases_vof':
      title = 'Frases Verdaderas o Falsas';
      maxLevel = player?.nivelFrasesVoF || 1;
      gameScore = player?.puntuacionFrasesVoF || 0;
      themeColor = 'from-amber-500 to-orange-600';
      break;
    case 'identifica':
      title = 'Identifica';
      maxLevel = player?.nivelIdentifica || 1;
      gameScore = player?.puntuacionIdentifica || 0;
      themeColor = 'from-sky-500 to-blue-600';
      break;
    case 'patrones':
      title = 'Patrones';
      maxLevel = player?.nivelPatrones || 1;
      gameScore = player?.puntuacionPatrones || 0;
      themeColor = 'from-purple-500 to-indigo-600';
      break;
    case 'adivina_palabra':
      title = 'Adivina la Palabra';
      maxLevel = player?.nivelAdivina || 1;
      gameScore = player?.puntuacionCadenaNum || 0;
      themeColor = 'from-emerald-500 to-teal-600';
      break;
    case 'recuerda':
      title = 'Recuerda';
      maxLevel = player?.nivelRecuerda || 1;
      gameScore = player?.puntuacionMemo || 0;
      themeColor = 'from-pink-500 to-rose-600';
      break;
  }

  const levels = Array.from({ length: TOTAL_LEVELS_COUNT }, (_, i) => i + 1);

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-8 bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            id="btn_niveles_back_minijuegos"
            onClick={() => { playClick(); onNavigate('panel_minijuegos'); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-amber-50 text-amber-950 font-bold text-sm shadow-sm border border-amber-300 active:scale-95 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Minijuegos</span>
          </button>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-white border border-amber-300 shadow-sm text-sm font-bold text-amber-900">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Puntos: {gameScore}</span>
          </div>
        </div>

        {/* Title banner */}
        <div className={`p-6 rounded-3xl bg-gradient-to-r ${themeColor} text-white shadow-lg text-center`}>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-1">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-white/90 font-medium">
            Selecciona un nivel para comenzar a jugar
          </p>
        </div>

        {/* Level Grid */}
        <div className="bg-white/90 backdrop-blur-xs p-6 sm:p-8 rounded-3xl border-3 border-amber-400 shadow-md">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-4 sm:gap-6">
            {levels.map((lvl) => {
              const isUnlocked = lvl <= maxLevel;
              const isCurrent = lvl === maxLevel;

              return (
                <button
                  key={lvl}
                  id={`btn_level_${lvl}`}
                  disabled={!isUnlocked}
                  onClick={() => {
                    playClick();
                    onSelectLevel(lvl);
                  }}
                  className={`relative aspect-square rounded-3xl flex flex-col items-center justify-center p-3 transition-all ${
                    isUnlocked
                      ? isCurrent
                        ? `bg-gradient-to-tr ${themeColor} text-white shadow-xl ring-4 ring-amber-300 active:scale-95 hover:brightness-110 cursor-pointer`
                        : 'bg-gradient-to-tr from-amber-400 to-amber-500 text-amber-950 shadow-md hover:shadow-lg active:scale-95 hover:brightness-105 cursor-pointer'
                      : 'bg-slate-100 text-slate-400 border-2 border-slate-200 cursor-not-allowed opacity-75'
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      {isCurrent && (
                        <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-white text-amber-800 text-[10px] font-black shadow-xs ring-1 ring-amber-400 uppercase">
                          Siguiente
                        </span>
                      )}
                      <span className="text-xs uppercase font-extrabold opacity-80">Nivel</span>
                      <span className="text-3xl sm:text-4xl font-black drop-shadow-xs">{lvl}</span>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <Play className="w-3 h-3 fill-current" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Lock className="w-6 h-6 sm:w-8 sm:h-8 mb-1 text-slate-400" />
                      <span className="text-xs font-bold uppercase text-slate-400">Nivel {lvl}</span>
                      <span className="text-[10px] text-slate-400 font-semibold mt-0.5">Bloqueado</span>
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
