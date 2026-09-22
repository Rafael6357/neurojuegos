import React, { useState } from 'react';
import { Player, ScreenType } from '../../types';
import { createPlayer, getTotalScore, setActivePlayerId } from '../../services/storage';
import { UserPlus, Check, Trophy, ArrowLeft, Star, Sparkles, Smile } from 'lucide-react';
import { playClick, playCorrect, playError } from '../../utils/sound';

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
    if (!ageNum || ageNum < 1 || ageNum > 16) {
      playError();
      setMessage({ text: 'Por favor ingresa una edad válida (1 a 16 años).', type: 'error' });
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
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-8 bg-[#131722] text-slate-100">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            id="btn_gestion_volver_inicio"
            onClick={() => { playClick(); onNavigate('inicio'); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1C212E] hover:bg-[#252B3B] text-slate-200 font-bold text-xs sm:text-sm shadow-xs border border-slate-700 active:scale-95 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-400" />
            <span>Volver a Inicio</span>
          </button>

          <button
            id="btn_gestion_ranking"
            onClick={() => { playClick(); onOpenRanking(); }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs sm:text-sm shadow-xs active:scale-95 transition cursor-pointer border border-amber-500"
          >
            <Trophy className="w-4 h-4 text-amber-200" />
            <span>Ver Ranking</span>
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Gestión de Jugadores
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
            Registra nuevos perfiles y selecciona al jugador activo
          </p>
        </div>

        {/* Message banner */}
        {message && (
          <div
            id="gestion_feedback_message"
            className={`p-3 rounded-2xl text-xs sm:text-sm font-bold text-center border shadow-2xs transition ${
              message.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left Column: Register New Player Form */}
          <div className="bg-[#1C212E] border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-center gap-2 text-slate-100 font-extrabold text-base mb-4">
              <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <UserPlus className="w-4 h-4" />
              </div>
              <h2>Registrar Nuevo Jugador</h2>
            </div>

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
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. Mateo, Sofía, Lucas..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#23293A] border border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none text-slate-100 font-bold placeholder:text-slate-500 transition text-sm"
                    maxLength={24}
                  />
                  <Smile className="w-4 h-4 text-slate-500 absolute right-3.5 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="input_player_age" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Edad del Jugador (Años)
                </label>
                <input
                  id="input_player_age"
                  type="number"
                  min="1"
                  max="16"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="5"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#23293A] border border-slate-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 outline-none text-slate-100 font-bold placeholder:text-slate-500 transition text-sm"
                />
              </div>

              <button
                id="btn_submit_registrar_jugador"
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 active:scale-[0.98] text-white font-extrabold text-sm shadow-xs transition cursor-pointer border border-amber-500"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Registrar Jugador</span>
              </button>
            </form>
          </div>

          {/* Right Column: Active Player Summary */}
          {activePlayer && (
            <div className="bg-[#1C212E] border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 block mb-2">
                  Jugador Seleccionado
                </span>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${activePlayer.avatarColor || 'from-amber-400 to-orange-500'} flex items-center justify-center text-white font-black text-xl shadow-xs ring-2 ring-slate-700`}>
                    {activePlayer.nombre.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-100">
                      {activePlayer.nombre}
                    </h3>
                    <p className="text-xs font-semibold text-slate-400">
                      {activePlayer.edad} años
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#23293A] rounded-xl border border-slate-700 shadow-2xs mb-3">
                  <div className="flex items-center justify-between text-amber-400 font-extrabold text-xs">
                    <span>Puntuación Total Acumulada</span>
                    <div className="flex items-center gap-1 text-sm text-amber-400 font-black">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{getTotalScore(activePlayer)} pts</span>
                    </div>
                  </div>
                </div>

                {/* Breakdown per game */}
                <div className="space-y-1 text-xs text-slate-300 font-medium bg-[#171C28] p-3 rounded-xl border border-slate-800">
                  <div className="flex justify-between py-0.5 border-b border-slate-800">
                    <span>Frases Verdadero o Falso:</span>
                    <span className="font-bold text-amber-400">{activePlayer.puntuacionFrasesVoF} pts (Nivel {activePlayer.nivelFrasesVoF})</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-800">
                    <span>Identifica:</span>
                    <span className="font-bold text-amber-400">{activePlayer.puntuacionIdentifica} pts (Nivel {activePlayer.nivelIdentifica})</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-800">
                    <span>Patrones:</span>
                    <span className="font-bold text-amber-400">{activePlayer.puntuacionPatrones} pts (Nivel {activePlayer.nivelPatrones})</span>
                  </div>
                  <div className="flex justify-between py-0.5 border-b border-slate-800">
                    <span>Adivina la Palabra:</span>
                    <span className="font-bold text-amber-400">{activePlayer.puntuacionCadenaNum} pts (Nivel {activePlayer.nivelAdivina})</span>
                  </div>
                  <div className="flex justify-between py-0.5">
                    <span>Recuerda:</span>
                    <span className="font-bold text-amber-400">{activePlayer.puntuacionMemo} pts (Nivel {activePlayer.nivelRecuerda})</span>
                  </div>
                </div>
              </div>

              <button
                id="btn_jugar_con_este_perfil"
                onClick={() => { playClick(); onNavigate('panel_minijuegos'); }}
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-xs active:scale-[0.98] transition text-center cursor-pointer border border-emerald-500"
              >
                JUGAR CON ESTE PERFIL
              </button>
            </div>
          )}
        </div>

        {/* Players List to Switch */}
        <div className="bg-[#1C212E] border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xs">
          <h2 className="text-base font-black text-slate-100 mb-1">
            Lista de Jugadores ({players.length})
          </h2>
          <p className="text-xs text-slate-400 font-medium mb-3.5">
            Toca a un jugador para seleccionarlo como jugador activo
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {players.map((p) => {
              const isSelected = activePlayer?.id === p.id;
              const total = getTotalScore(p);

              return (
                <button
                  key={p.id}
                  id={`btn_select_player_${p.id}`}
                  onClick={() => handleSelectPlayer(p.id)}
                  className={`p-3 rounded-2xl border text-left flex items-center justify-between gap-3 transition active:scale-95 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-500/50 shadow-xs'
                      : 'bg-[#23293A] border-slate-700 hover:border-slate-600 hover:bg-[#2B3245] shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${p.avatarColor || 'from-amber-400 to-orange-500'} flex items-center justify-center text-white font-black text-sm shadow-2xs shrink-0`}>
                      {p.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-slate-100 text-xs sm:text-sm truncate">
                        {p.nombre}
                      </h4>
                      <span className="text-[11px] text-slate-400 font-semibold block truncate">
                        {p.edad} años • {total} pts
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="p-1 rounded-full bg-emerald-500 text-white shadow-2xs shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
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
