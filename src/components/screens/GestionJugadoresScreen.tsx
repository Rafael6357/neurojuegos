import React, { useState } from 'react';
import { Player, ScreenType } from '../../types';
import { createPlayer, getTotalScore, setActivePlayerId, MAX_PLAYER_AGE, MIN_PLAYER_AGE } from '../../services/storage';
import { GAME_ORDER, GAMES_META, getLevelCount } from '../../data/gamesData';
import { getGameLevel, getGameScore } from '../../services/storage';
import { UserPlus, Check, Trophy, ArrowLeft, Star, Sparkles, Smile, ShieldCheck, Rocket } from 'lucide-react';
import { playClick, playCorrect, playError } from '../../utils/sound';
import { CosmicBackground } from '../ui/CosmicBackground';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';

interface GestionJugadoresScreenProps {
  players: Player[];
  activePlayer: Player | null;
  onRefreshPlayers: () => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenRanking: () => void;
}

export const GestionJugadoresScreen: React.FC<GestionJugadoresScreenProps> = ({
  players,
  activePlayer,
  onRefreshPlayers,
  onNavigate,
  onOpenRanking,
}) => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState<number | ''>(5);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) {
      playError();
      setMessage({ text: 'Por favor ingresa el nombre del jugador.', type: 'error' });
      return;
    }
    const ageNum = Number(edad);
    if (!ageNum || ageNum < MIN_PLAYER_AGE || ageNum > MAX_PLAYER_AGE) {
      playError();
      setMessage({ text: `Por favor ingresa una edad válida (${MIN_PLAYER_AGE} a ${MAX_PLAYER_AGE} años).`, type: 'error' });
      return;
    }

    createPlayer(nombre, ageNum);
    playCorrect();
    setMessage({ text: `¡Jugador ${nombre.trim()} registrado con éxito!`, type: 'success' });
    setNombre('');
    setEdad(5);
    onRefreshPlayers();
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSelectPlayer = (id: string) => {
    playClick();
    setActivePlayerId(id);
    onRefreshPlayers();
  };

  return (
    <CosmicBackground>
      <div className="max-w-2xl mx-auto space-y-5 p-4 sm:p-6">
        {/* Header */}
        <div className="text-center">
          <Badge tone="violet" className="mb-2">Tripulación de la Nave</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-50 tracking-tight">
            Gestión de Jugadores
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-1">
            Astronautas y Jugadores • {players.length} {players.length === 1 ? 'perfil' : 'perfiles'} a bordo
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            id="btn_gestion_volver_inicio"
            onClick={() => { playClick(); onNavigate('inicio'); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-slate-100 font-bold text-xs sm:text-sm border border-white/15 active:scale-95 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-300" />
            <span>Volver a la Misión Principal</span>
          </button>

          <button
            id="btn_gestion_ranking"
            onClick={() => { playClick(); onOpenRanking(); }}
            className="btn-chunky-amber flex items-center gap-2 px-4 py-2 font-extrabold text-xs sm:text-sm cursor-pointer"
          >
            <Trophy className="w-4 h-4" />
            <span>Ver Ranking</span>
          </button>
        </div>

        {/* Message banner */}
        {message && (
          <div
            id="gestion_feedback_message"
            role="status"
            className={`anim-pop-in p-3 rounded-2xl text-xs sm:text-sm font-bold text-center border ${
              message.type === 'success'
                ? 'bg-emerald-400/10 border-emerald-400/40 text-emerald-200'
                : 'bg-rose-400/10 border-rose-400/40 text-rose-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Active player summary */}
        {activePlayer && (
          <Card className="p-5 flex flex-col gap-3">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-200">
              Astronauta en misión
            </span>
            <div className="flex items-center gap-3.5">
              <Avatar name={activePlayer.nombre} color={activePlayer.avatarColor} size="xl" />
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-black text-slate-50 truncate">
                  {activePlayer.nombre}
                </h3>
                <p className="text-xs font-semibold text-slate-400">
                  {activePlayer.edad} años • ★ {getTotalScore(activePlayer)} pts acumulados
                </p>
              </div>
              <button
                id="btn_jugar_con_este_perfil"
                onClick={() => { playClick(); onNavigate('panel_minijuegos'); }}
                className="btn-chunky-teal shrink-0 px-5 py-2.5 font-black text-xs sm:text-sm cursor-pointer"
              >
                JUGAR CON ESTE PERFIL
              </button>
            </div>

            {/* Breakdown per game: los 10 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-semibold bg-black/30 p-3 rounded-2xl border border-white/10 max-h-56 overflow-y-auto">
              {GAME_ORDER.map(g => {
                const meta = GAMES_META[g];
                return (
                  <div key={g} className="flex justify-between items-center gap-2 py-1 px-2 rounded-xl bg-white/[0.03]">
                    <span className="truncate text-slate-300">
                      <span aria-hidden="true">{meta.emoji} </span>{meta.title}
                    </span>
                    <span className="font-bold text-teal-200 shrink-0">
                      {getGameScore(activePlayer, g)} pts • Nv. {Math.min(getGameLevel(activePlayer, g), getLevelCount(g))}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Players List */}
        <Card className="p-5">
          <h2 className="text-base font-black text-slate-50 mb-1">
            Tripulación Registrada ({players.length})
          </h2>
          <p className="text-xs text-slate-400 font-semibold mb-3.5">
            Toca «Elegir» para poner a un astronauta al mando
          </p>

          <div className="flex flex-col gap-2.5">
            {players.map((p) => {
              const isSelected = activePlayer?.id === p.id;
              const total = getTotalScore(p);

              return (
                <div
                  key={p.id}
                  id={`btn_select_player_${p.id}`}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 transition ${
                    isSelected
                      ? 'bg-teal-400/10 border-teal-300/50 shadow-[0_0_16px_rgba(45,212,191,0.15)]'
                      : 'bg-white/[0.04] border-white/10'
                  }`}
                >
                  <button
                    onClick={() => handleSelectPlayer(p.id)}
                    aria-pressed={isSelected}
                    className="flex items-center gap-2.5 min-w-0 flex-1 text-left cursor-pointer"
                  >
                    <Avatar name={p.nombre} color={p.avatarColor} size="md" />
                    <span className="min-w-0">
                      <span className="font-extrabold text-slate-50 text-sm truncate block">
                        {p.nombre}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold block truncate">
                        {p.edad} años • {total} pts
                      </span>
                    </span>
                  </button>

                  {isSelected ? (
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-[11px] border border-emerald-400/40 shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" /> Al mando
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSelectPlayer(p.id)}
                      className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-teal-400/25 text-slate-100 hover:text-teal-100 font-black text-[11px] border border-white/15 active:scale-95 transition cursor-pointer shrink-0"
                    >
                      Elegir
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Register form */}
        <Card className="p-5 sm:p-6 relative overflow-hidden">
          <div className="flex items-start gap-4">
            <img
              src="/assets/avatar_astronauta.jpg"
              alt=""
              aria-hidden="true"
              className="hidden sm:block w-24 h-24 rounded-3xl object-cover border border-white/15 shadow-lg shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-slate-50 font-extrabold text-base mb-1">
                <span className="p-2 rounded-2xl bg-teal-400/10 text-teal-200 border border-teal-400/30">
                  <UserPlus className="w-4 h-4" />
                </span>
                <h2>Nuevo Explorador</h2>
              </div>
              <p className="text-xs text-slate-400 font-semibold mb-4">¿Cómo se llama el pequeño explorador?</p>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label htmlFor="input_player_name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Nombre del Jugador
                  </label>
                  <div className="relative">
                    <input
                      id="input_player_name"
                      type="text"
                      value={nombre}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)}
                      placeholder="Ej. Mateo, Sofía, Lucas..."
                      className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/15 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/30 outline-none text-slate-50 font-bold placeholder:text-slate-500 transition text-sm"
                      maxLength={24}
                    />
                    <Smile className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="input_player_age" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Edad del explorador (1 a 12 años)
                  </label>
                  <input
                    id="input_player_age"
                    type="number"
                    min={MIN_PLAYER_AGE}
                    max={MAX_PLAYER_AGE}
                    value={edad}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEdad(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="5"
                    className="w-full px-4 py-3 rounded-2xl bg-black/30 border border-white/15 focus:border-teal-300 focus:ring-2 focus:ring-teal-300/30 outline-none text-slate-50 font-bold placeholder:text-slate-500 transition text-sm"
                  />
                </div>

                <button
                  id="btn_submit_registrar_jugador"
                  type="submit"
                  className="btn-chunky-teal w-full flex items-center justify-center gap-2 py-3.5 px-5 font-black text-sm cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Registrar Jugador</span>
                </button>
              </form>
            </div>
          </div>
        </Card>

        {/* Safe banner */}
        <div className="w-full rounded-2xl bg-black/30 p-4 flex items-center gap-3 border border-white/10">
          <span className="w-10 h-10 rounded-full bg-teal-400/10 flex items-center justify-center shrink-0 text-teal-200" aria-hidden="true">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-teal-200 block">100% Seguro y Privado</span>
            <p className="text-xs text-slate-400 font-semibold leading-snug">
              Los perfiles se guardan solo en este dispositivo. Sin cuentas, sin anuncios.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            id="btn_gestion_jugar"
            onClick={() => { playClick(); onNavigate('panel_minijuegos'); }}
            className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-teal-200 hover:text-teal-100 transition cursor-pointer"
          >
            <Rocket className="w-4 h-4" /> Volver a la Misión Principal
          </button>
        </div>
      </div>
    </CosmicBackground>
  );
};
