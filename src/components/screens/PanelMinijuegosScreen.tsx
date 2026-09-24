import React, { useState } from 'react';
import { Player, GameType, ScreenType, CognitiveArea } from '../../types';
import { Trophy, Star, Rocket } from 'lucide-react';
import { playClick } from '../../utils/sound';
import { CosmicBackground } from '../ui/CosmicBackground';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/Progress';
import { AREA_META, GAME_ORDER, GAMES_META, getLevelCount } from '../../data/gamesData';
import { getGameLevel, getGameScore } from '../../services/storage';

interface PanelMinijuegosScreenProps {
  player: Player | null;
  onSelectGame: (game: GameType) => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenRanking: () => void;
}

const FILTERS: { id: CognitiveArea; label: string; activeClass: string }[] = [
  { id: 'todos', label: 'Todos', activeClass: 'bg-teal-300 text-indigo-950 shadow-[0_0_14px_rgba(45,212,191,0.45)]' },
  { id: 'lenguaje', label: 'Lenguaje', activeClass: 'bg-teal-300 text-indigo-950 shadow-[0_0_14px_rgba(45,212,191,0.45)]' },
  { id: 'memoria', label: 'Memoria', activeClass: 'bg-violet-300 text-indigo-950 shadow-[0_0_14px_rgba(167,139,250,0.45)]' },
  { id: 'atencion', label: 'Atención', activeClass: 'bg-amber-300 text-indigo-950 shadow-[0_0_14px_rgba(251,191,36,0.45)]' },
];

/** Planetas Stitch por área: teal lenguaje, violeta memoria, ámbar atención. */
const PLANET: Record<string, { badge: 'teal' | 'violet' | 'amber'; gradient: string; glow: string; bar: string }> = {
  lenguaje: {
    badge: 'teal',
    gradient: 'from-teal-300 via-teal-400 to-emerald-600',
    glow: 'shadow-teal-400/40',
    bar: 'from-teal-300 to-emerald-500',
  },
  memoria: {
    badge: 'violet',
    gradient: 'from-violet-300 via-purple-500 to-fuchsia-600',
    glow: 'shadow-violet-400/40',
    bar: 'from-violet-300 to-fuchsia-500',
  },
  atencion: {
    badge: 'amber',
    gradient: 'from-amber-200 via-orange-400 to-rose-500',
    glow: 'shadow-amber-400/40',
    bar: 'from-amber-300 to-orange-500',
  },
};

export const PanelMinijuegosScreen: React.FC<PanelMinijuegosScreenProps> = ({
  player,
  onSelectGame,
  onOpenRanking,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<CognitiveArea>('todos');

  const games = GAME_ORDER.map(id => GAMES_META[id]);
  const filteredGames = selectedFilter === 'todos'
    ? games
    : games.filter(g => g.area === selectedFilter);

  const areaStats = (['lenguaje', 'memoria', 'atencion'] as const).map(area => {
    const list = games.filter(g => g.area === area);
    const score = player ? list.reduce((s, g) => s + getGameScore(player, g.id), 0) : 0;
    const done = player
      ? list.reduce((s, g) => s + Math.min(getGameLevel(player, g.id) - 1, getLevelCount(g.id)), 0)
      : 0;
    const total = list.reduce((s, g) => s + getLevelCount(g.id), 0);
    return { area, count: list.length, score, done, total };
  });

  return (
    <CosmicBackground>
      <div className="max-w-2xl mx-auto space-y-5 p-4 sm:p-6">
        {/* Header */}
        <div className="text-center">
          <Badge tone="teal" className="mb-2">Catálogo de Actividades</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-50 tracking-tight">
            Panel de Estimulación Cognitiva
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">
            10 Minijuegos diseñados para potenciar el Lenguaje, la Memoria y la Atención
          </p>
          <button
            id="btn_panel_ver_ranking"
            onClick={() => { playClick(); onOpenRanking(); }}
            className="btn-chunky-teal mt-3 inline-flex items-center gap-2 px-6 py-2.5 font-black text-sm cursor-pointer"
          >
            <Trophy className="w-4 h-4" />
            <span>Ver Ranking</span>
          </button>
        </div>

        {/* Cognitive Summary with progress */}
        <div className="grid grid-cols-1 gap-3">
          {areaStats.map((s, i) => {
            const meta = AREA_META[s.area];
            const p = PLANET[s.area];
            return (
              <Card key={s.area} className={`p-4 anim-rise-in stagger-${i + 1}`}>
                <div className="flex items-center gap-3">
                  <span className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.gradient} border border-white/20 shrink-0 flex items-center justify-center text-2xl shadow-lg`} aria-hidden="true">
                    {meta.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-black block tracking-wide text-slate-50">
                      {meta.label}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold block">{meta.tagline}</span>
                  </div>
                  <span className="text-xs font-black text-amber-300 shrink-0">★ {s.score} pts</span>
                </div>
                <ProgressBar value={s.done} max={Math.max(s.total, 1)} gradient={p.bar} className="mt-3 h-3.5" />
              </Card>
            );
          })}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-black/30 p-1.5 shadow-sm" aria-label="Filtrar por área">
          {FILTERS.map(f => {
            const n = f.id === 'todos' ? games.length : games.filter(g => g.area === f.id).length;
            const active = selectedFilter === f.id;
            return (
              <button
                key={f.id}
                aria-pressed={active}
                onClick={() => { playClick(); setSelectedFilter(f.id); }}
                className={`flex-1 min-w-[70px] px-3 py-2 rounded-full text-xs font-black transition-all cursor-pointer ${
                  active ? f.activeClass : 'bg-white/10 hover:bg-white/15 text-slate-200'
                }`}
              >
                {f.label} ({n})
              </button>
            );
          })}
        </div>

        {/* Minigames: planet cards */}
        <div className="flex flex-col gap-4">
          {filteredGames.map((g, i) => {
            const score = player ? getGameScore(player, g.id) : 0;
            const level = player ? getGameLevel(player, g.id) : 1;
            const total = getLevelCount(g.id);
            const done = Math.min(level - 1, total);
            const p = PLANET[g.area];
            return (
              <article
                key={g.id}
                id={`game_card_${g.id}`}
                className={`anim-rise-in stagger-${(i % 5) + 1} rounded-3xl bg-[#0b112c] border border-white/10 hover:border-white/25 shadow-[0_10px_36px_rgba(0,0,0,0.45)] transition-all overflow-hidden`}
              >
                <div className="p-4 flex items-center gap-4">
                  <span
                    className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${p.gradient} ${p.glow} shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center text-4xl border border-white/30 shrink-0`}
                    aria-hidden="true"
                  >
                    <span className="orbit-ring w-24 h-24" aria-hidden="true" />
                    {g.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Badge tone={p.badge}>{g.areaLabel}</Badge>
                    <h2 className="text-lg font-black text-slate-50 tracking-tight leading-tight mt-1">
                      {g.title}
                    </h2>
                    <p className="text-xs text-slate-400 font-semibold">{g.subtitle}</p>
                  </div>
                  {level > total && (
                    <span className="shrink-0 px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-400/15 text-emerald-300 border border-emerald-400/40">
                      Completado
                    </span>
                  )}
                </div>

                <div className="px-4 pb-4">
                  <p className="text-xs text-slate-300 font-medium leading-relaxed mb-2">
                    {g.description}
                  </p>
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="flex items-center gap-1 text-amber-300">
                      <Star className="w-4 h-4 fill-amber-300" />
                      {score} Puntos
                    </span>
                    <span className="text-slate-300">
                      {done}/{total} Niveles
                    </span>
                  </div>
                  <ProgressBar value={done} max={total} gradient={p.bar} className="mb-3 h-3.5" />
                  <button
                    id={`btn_play_${g.id}`}
                    onClick={() => {
                      playClick();
                      onSelectGame(g.id);
                    }}
                    className="btn-chunky-teal w-full flex items-center justify-center gap-2 py-3 px-4 font-black text-sm cursor-pointer"
                  >
                    <Rocket className="w-4 h-4" />
                    <span>JUGAR</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {filteredGames.length === 0 && (
          <Card className="p-10 text-center">
            <Rocket className="w-10 h-10 text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-300">No hay planetas en esta órbita todavía.</p>
          </Card>
        )}
      </div>
    </CosmicBackground>
  );
};
