import React from 'react';
import { GameType, Player, ScreenType } from '../../types';
import { getGameLevel, getGameScore, getTotalScore } from '../../services/storage';
import { AREA_META, GAME_ORDER, GAMES_META, getLevelCount } from '../../data/gamesData';
import { Play, Users, Trophy, Music, Award, ArrowRight, Rocket, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { playClick } from '../../utils/sound';
import { CosmicBackground } from '../ui/CosmicBackground';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { Mascot } from '../ui/Mascot';
import { ProgressBar } from '../ui/Progress';

interface InicioScreenProps {
  player: Player | null;
  players: Player[];
  onNavigate: (screen: ScreenType) => void;
  onOpenRanking: () => void;
  onQuickPlay: (game: GameType) => void;
}

const AREA_IDS = ['lenguaje', 'memoria', 'atencion'] as const;

const AREA_TILE: Record<string, string> = {
  lenguaje: 'bg-teal-500/20 text-teal-200 shadow-[0_0_20px_rgba(13,148,136,0.35)]',
  memoria: 'bg-violet-500/20 text-violet-200 shadow-[0_0_20px_rgba(139,92,246,0.35)]',
  atencion: 'bg-amber-500/20 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.35)]',
};

const AREA_TEXT: Record<string, string> = {
  lenguaje: 'text-teal-200',
  memoria: 'text-violet-200',
  atencion: 'text-amber-200',
};

const AREA_BAR: Record<string, string> = {
  lenguaje: 'from-teal-300 to-emerald-500',
  memoria: 'from-violet-300 to-fuchsia-500',
  atencion: 'from-amber-300 to-orange-500',
};

export const InicioScreen: React.FC<InicioScreenProps> = ({
  player,
  players,
  onNavigate,
  onOpenRanking,
  onQuickPlay,
}) => {
  // Check if player is #1
  const sortedPlayers = [...players].sort((a, b) => getTotalScore(b) - getTotalScore(a));
  const isChampion = player && sortedPlayers.length > 0 && sortedPlayers[0].id === player.id;
  const currentTotal = player ? getTotalScore(player) : 0;

  // "Próxima misión": el juego con menos puntos.
  const recommended: GameType | null = player
    ? [...GAME_ORDER].sort((a, b) => getGameScore(player, a) - getGameScore(player, b))[0]
    : null;
  const recommendedMeta = recommended ? GAMES_META[recommended] : null;

  const areaProgress = AREA_IDS.map(area => {
    const list = GAME_ORDER.filter(g => GAMES_META[g].area === area);
    const done = player
      ? list.reduce((s, g) => s + Math.min(getGameLevel(player, g) - 1, getLevelCount(g)), 0)
      : 0;
    const total = list.reduce((s, g) => s + getLevelCount(g), 0);
    return { area, list, done, total };
  });

  return (
    <CosmicBackground className="flex flex-col">
      <div className="max-w-2xl mx-auto w-full space-y-5 px-4 sm:px-6 py-6 flex-1">
        {/* Badge superior */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/20 text-violet-200 text-xs font-black tracking-wide border border-violet-400/30 shadow-[0_0_16px_rgba(139,92,246,0.35)] anim-glow">
            <Award className="w-4 h-4 text-amber-300" />
            Estimulación de 0 a 6 años
            <Award className="w-4 h-4 text-amber-300" />
          </span>
        </div>

        {/* Encabezado + mascota */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="anim-floaty relative">
            <div className="absolute inset-0 rounded-full bg-teal-400/25 blur-2xl anim-glow" aria-hidden="true" />
            <Mascot mood="cheer" className="relative w-36 h-36 sm:w-44 sm:h-44 drop-shadow-[0_0_28px_rgba(45,212,191,0.45)]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-50 tracking-tight leading-tight drop-shadow-md">
            Estimulación Cognitiva Infantil
          </h1>
          <p className="text-sm text-slate-400 font-semibold max-w-xs">
            ¡Tu misión cósmica diaria para entrenar la mente jugando! ✨
          </p>
        </div>

        {/* Tarjeta jugador activo */}
        {player ? (
          <Card id="inicio_player_card" className="p-4 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-teal-400/15 blur-2xl pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-violet-500/20 blur-xl pointer-events-none" aria-hidden="true" />
            <div className="relative flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative shrink-0 rounded-full p-1 bg-gradient-to-tr from-teal-300 via-amber-300 to-fuchsia-400 shadow-[0_0_16px_rgba(45,212,191,0.4)]">
                  <Avatar name={player.nombre} color={player.avatarColor} size="lg" className="ring-0 rounded-full" />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-indigo-950 text-xs font-black">
                    ✓
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-base font-black text-slate-50 leading-tight">
                      {player.nombre}
                    </span>
                    {isChampion && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-black">
                        #1 Campeón
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-400">{player.edad} años</span>
                  <span className="text-xs font-bold text-amber-300 block">★ {currentTotal} pts acumulados</span>
                </div>
              </div>
              <button
                id="btn_inicio_cambiar_perfil"
                onClick={() => { playClick(); onNavigate('gestion_jugadores'); }}
                className="shrink-0 px-3 py-2 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-95 transition text-teal-200 text-[11px] font-black cursor-pointer border border-white/10"
              >
                Cambiar
              </button>
            </div>
          </Card>
        ) : (
          <div className="p-3 rounded-2xl bg-white/[0.05] border border-dashed border-amber-400/40 text-amber-300 font-semibold text-xs text-center">
            Ningún jugador seleccionado. Presiona &quot;Gestión de Jugadores&quot; para registrar uno.
          </div>
        )}

        {/* CTA gigante táctil */}
        <div className="w-full">
          <button
            id="btn_inicio_jugar"
            onClick={() => {
              playClick();
              if (!player) {
                onNavigate('gestion_jugadores');
              } else {
                onNavigate('panel_minijuegos');
              }
            }}
            className="btn-chunky-teal group w-full min-h-[68px] py-4 px-6 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span className="animate-bounce" aria-hidden="true">
              <Rocket className="w-8 h-8" />
            </span>
            <span className="font-black text-xl tracking-wide uppercase">JUGAR / MINIJUEGOS</span>
            <ArrowRight className="w-7 h-7" aria-hidden="true" />
          </button>
        </div>

        {/* Próxima misión */}
        {player && recommendedMeta && (
          <button
            id="btn_inicio_quickplay"
            onClick={() => { playClick(); onQuickPlay(recommendedMeta.id); }}
            className="w-full text-left rounded-3xl border border-teal-400/30 bg-gradient-to-r from-teal-400/15 via-white/[0.04] to-transparent p-4 flex items-center gap-4 hover:border-teal-400/60 active:scale-[0.99] transition cursor-pointer"
          >
            <span className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-300 to-emerald-500 flex items-center justify-center text-3xl shadow-lg border border-white/30 shrink-0" aria-hidden="true">
              {recommendedMeta.emoji}
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-200 flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5" /> Tu próxima misión
              </span>
              <span className="text-base font-black text-slate-50 truncate block">
                {recommendedMeta.title}: {recommendedMeta.subtitle}
              </span>
            </span>
            <span className="shrink-0 px-4 py-2.5 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 text-indigo-950 font-black text-sm">
              ¡Vamos!
            </span>
          </button>
        )}

        {/* Áreas de desarrollo */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-black text-slate-100 tracking-wide uppercase">
              3 Áreas de Desarrollo
            </h2>
            <span className="text-xs text-slate-400 font-semibold">10 Juegos</span>
          </div>

          <div className="flex flex-col gap-4">
            {areaProgress.map(({ area, list, done, total }) => {
              const meta = AREA_META[area];
              return (
                <button
                  key={area}
                  id={`game_area_${area}`}
                  onClick={() => { playClick(); onNavigate('panel_minijuegos'); }}
                  className="w-full text-left rounded-3xl bg-[#0b112c] border border-white/10 p-4 flex flex-col gap-3 shadow-md transition-all active:scale-[0.98] cursor-pointer hover:border-white/25"
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-3 min-w-0">
                      <span className={`w-14 h-14 rounded-2xl flex items-center justify-center text-[32px] shrink-0 ${AREA_TILE[area]}`} aria-hidden="true">
                        {meta.emoji}
                      </span>
                      <span className="min-w-0">
                        <span className={`text-base font-black block ${AREA_TEXT[area]}`}>
                          {meta.label}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold block">
                          {meta.tagline} • {list.length} Minijuegos
                        </span>
                      </span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 text-[11px] font-black shrink-0">
                      {done} / {total} Listos
                    </span>
                  </span>
                  <span className="flex flex-wrap gap-1.5">
                    {list.map(g => {
                      const played = player ? getGameScore(player, g) > 0 : false;
                      return (
                        <span key={g} className="px-2.5 py-1 rounded-xl bg-black/30 text-slate-300 text-[12px] font-semibold flex items-center gap-1">
                          {played ? (
                            <CheckCircle2 className={`w-3.5 h-3.5 ${AREA_TEXT[area]}`} />
                          ) : (
                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                          )}
                          {GAMES_META[g].title}
                        </span>
                      );
                    })}
                  </span>
                  <ProgressBar value={done} max={Math.max(total, 1)} gradient={AREA_BAR[area]} className="h-3.5" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Accesos rápidos */}
        <div className="grid grid-cols-2 gap-3">
          <button
            id="btn_inicio_ranking"
            onClick={() => { playClick(); onOpenRanking(); }}
            className="min-h-[58px] p-3.5 rounded-2xl bg-[#1a1f31] border border-white/10 flex items-center gap-3 active:scale-95 transition-all cursor-pointer hover:border-white/25 text-left"
          >
            <span className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center shrink-0" aria-hidden="true">
              <Trophy className="w-6 h-6 text-amber-300" />
            </span>
            <span className="min-w-0">
              <span className="text-[15px] font-extrabold text-slate-50 leading-tight truncate block">Clasificación</span>
              <span className="text-xs text-amber-300 font-semibold truncate block">Ver Logros 🏆</span>
            </span>
          </button>
          <button
            id="btn_inicio_ajustes"
            onClick={() => { playClick(); onNavigate('ajustes'); }}
            className="min-h-[58px] p-3.5 rounded-2xl bg-[#1a1f31] border border-white/10 flex items-center gap-3 active:scale-95 transition-all cursor-pointer hover:border-white/25 text-left"
          >
            <span className="w-10 h-10 rounded-xl bg-teal-400/20 flex items-center justify-center shrink-0" aria-hidden="true">
              <Music className="w-6 h-6 text-teal-200" />
            </span>
            <span className="min-w-0">
              <span className="text-[15px] font-extrabold text-slate-50 leading-tight truncate block">Música y Audio</span>
              <span className="text-xs text-teal-200 font-semibold truncate block">Calibrar 🎵</span>
            </span>
          </button>
          <button
            id="btn_inicio_gestion_jugadores"
            onClick={() => { playClick(); onNavigate('gestion_jugadores'); }}
            className="col-span-2 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white/[0.05] hover:bg-white/10 text-slate-100 font-bold text-sm border border-white/10 active:scale-95 transition cursor-pointer"
          >
            <Users className="w-4 h-4 text-teal-200" />
            <span>Gestión de Jugadores</span>
          </button>
        </div>

        {/* Espacio seguro */}
        <div className="w-full rounded-2xl bg-black/30 p-4 flex items-center gap-3 border border-white/10">
          <span className="w-10 h-10 rounded-full bg-teal-400/10 flex items-center justify-center shrink-0 text-teal-200" aria-hidden="true">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-teal-200 block">Espacio Seguro para Infancias</span>
            <p className="text-xs text-slate-400 font-semibold leading-snug">
              Desarrollado bajo neuroeducación infantil. Seguro, sin anuncios y 100% offline.
            </p>
          </div>
        </div>

        <div className="anim-rise-in">
          <Badge tone="slate" className="w-full justify-center">Intervención lúdica • Neurodesarrollo 0 a 6 años</Badge>
        </div>
      </div>

      <footer className="w-full text-center text-xs text-slate-500 font-semibold py-3 border-t border-white/10 mt-2">
        Intervención lúdica y estimulación cognitiva infantil • Neurodesarrollo 0 a 6 años
      </footer>
    </CosmicBackground>
  );
};
