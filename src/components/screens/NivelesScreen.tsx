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
    case 'stroop':
      title = 'Desafío de Colores (Efecto Stroop)';
      maxLevel = player?.nivelStroop || 1;
      gameScore = player?.puntuacionStroop || 0;
      themeColor = 'from-red-500 to-rose-600';
      break;
    case 'parejas':
      title = 'Parejas de Cartas';
      maxLevel = player?.nivelParejas || 1;
      gameScore = player?.puntuacionParejas || 0;
      themeColor = 'from-blue-500 to-cyan-600';
      break;
    case 'ordenar':
      title = 'Ordena la Frase';
      maxLevel = player?.nivelOrdenar || 1;
      gameScore = player?.puntuacionOrdenar || 0;
      themeColor = 'from-teal-500 to-emerald-600';
      break;
    case 'intruso':
      title = 'Encuentra el Intruso';
      maxLevel = player?.nivelIntruso || 1;
      gameScore = player?.puntuacionIntruso || 0;
      themeColor = 'from-amber-600 to-yellow-600';
      break;
    case 'digitos':
      title = 'Dígitos Inversos';
      maxLevel = player?.nivelDigitos || 1;
      gameScore = player?.puntuacionDigitos || 0;
      themeColor = 'from-violet-500 to-purple-600';
      break;
  }

  const levels = Array.from({ length: TOTAL_LEVELS_COUNT }, (_, i) => i + 1);

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-8 bg-[#131722] text-slate-100">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            id="btn_niveles_back_minijuegos"
            onClick={() => { playClick(); onNavigate('panel_minijuegos'); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1C212E] hover:bg-[#252B3B] text-slate-200 font-bold text-xs sm:text-sm shadow-xs border border-slate-700 active:scale-95 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>Volver a Minijuegos</span>
          </button>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1C212E] border border-slate-700 shadow-xs text-xs sm:text-sm font-black text-amber-400">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Puntos: {gameScore}</span>
          </div>
        </div>

        {/* Title banner */}
        <div className="p-6 rounded-3xl bg-[#1C212E] border border-slate-700/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] text-center">
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold tracking-wide uppercase mb-2 border border-amber-500/30">
            Progresión de Niveles
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight mb-1">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            Selecciona un nivel desbloqueado para ejercitar tus habilidades
          </p>
        </div>

        {/* Level Grid */}
        <div className="bg-[#1C212E] p-5 sm:p-8 rounded-3xl border border-slate-700/80 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-3 sm:gap-5">
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
                  className={`relative aspect-square rounded-2xl flex flex-col items-center justify-center p-3 transition-all ${
                    isUnlocked
                      ? isCurrent
                        ? `bg-amber-600 text-white shadow-md ring-2 ring-amber-400/50 active:scale-95 hover:bg-amber-500 cursor-pointer`
                        : 'bg-[#23293A] hover:bg-[#2C3449] text-slate-200 border border-slate-700 shadow-2xs active:scale-95 cursor-pointer'
                      : 'bg-[#181D2A] text-slate-600 border border-slate-800 cursor-not-allowed opacity-50'
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      {isCurrent && (
                        <span className="absolute -top-2.5 px-2 py-0.5 rounded-full bg-slate-900 border border-amber-500/50 text-amber-300 text-[9px] font-black uppercase shadow-2xs">
                          Actual
                        </span>
                      )}
                      <span className="text-[10px] uppercase font-extrabold opacity-75">Nivel</span>
                      <span className="text-2xl sm:text-3xl font-black tracking-tight">{lvl}</span>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className={`w-3.5 h-3.5 ${isCurrent ? 'fill-amber-300 text-amber-300' : 'fill-amber-400 text-amber-400'}`} />
                        <Play className="w-2.5 h-2.5 fill-current" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 sm:w-6 sm:h-6 mb-1 text-slate-600" />
                      <span className="text-[11px] font-bold uppercase text-slate-500">Nivel {lvl}</span>
                      <span className="text-[10px] text-slate-600 font-medium">Bloqueado</span>
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
