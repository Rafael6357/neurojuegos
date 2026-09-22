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
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-8 bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            id="btn_gestion_volver_inicio"
            onClick={() => { playClick(); onNavigate('inicio'); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-amber-50 text-amber-950 font-bold text-sm shadow-sm border border-amber-300 active:scale-95 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Inicio</span>
          </button>

          <button
            id="btn_gestion_ranking"
            onClick={() => { playClick(); onOpenRanking(); }}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md active:scale-95 transition border-b-3 border-amber-700"
          >
            <Trophy className="w-4 h-4 text-yellow-200" />
            <span>Ver Ranking</span>
          </button>
        </div>

        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-black text-amber-950 tracking-tight">
            Gestión de Jugadores
          </h1>
          <p className="text-sm text-amber-900/80 font-medium mt-1">
            Registra nuevos perfiles y selecciona al jugador activo
          </p>
        </div>

        {/* Message banner */}
        {message && (
          <div
            id="gestion_feedback_message"
            className={`p-3.5 rounded-2xl text-sm font-bold text-center border-2 shadow-xs transition ${
              message.type === 'success'
                ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                : 'bg-rose-100 border-rose-400 text-rose-900'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Register New Player Form */}
          <div className="bg-white/90 backdrop-blur-xs border-3 border-amber-400 rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-lg mb-4">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-600">
                <UserPlus className="w-5 h-5" />
              </div>
              <h2>Registrar Nuevo Jugador</h2>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label htmlFor="input_player_name" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Nombre del Jugador
                </label>
                <div className="relative">
                  <input
                    id="input_player_name"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. Mateo, Sofía, Lucas..."
                    className="w-full px-4 py-3 rounded-2xl border-2 border-amber-200 focus:border-amber-500 focus:ring-3 focus:ring-amber-200 outline-none text-slate-800 font-bold placeholder:text-slate-400 transition"
                    maxLength={24}
                  />
                  <Smile className="w-5 h-5 text-amber-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label htmlFor="input_player_age" className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
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
                  className="w-full px-4 py-3 rounded-2xl border-2 border-amber-200 focus:border-amber-500 focus:ring-3 focus:ring-amber-200 outline-none text-slate-800 font-bold placeholder:text-slate-400 transition"
                />
              </div>

              <button
                id="btn_submit_registrar_jugador"
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-base shadow-md transition border-b-4 border-amber-700"
              >
                <Sparkles className="w-5 h-5 text-yellow-200" />
                <span>Registrar Jugador</span>
              </button>
            </form>
          </div>

          {/* Right Column: Active Player Summary */}
          {activePlayer && (
            <div className="bg-gradient-to-b from-amber-50 to-orange-100 border-3 border-amber-400 rounded-3xl p-6 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 block mb-2">
                  Jugador Seleccionado
                </span>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${activePlayer.avatarColor || 'from-amber-400 to-orange-500'} flex items-center justify-center text-white font-black text-2xl shadow-md ring-4 ring-white`}>
                    {activePlayer.nombre.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-800">
                      {activePlayer.nombre}
                    </h3>
                    <p className="text-sm font-semibold text-slate-500">
                      {activePlayer.edad} años
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-white/80 rounded-2xl border border-amber-200 shadow-xs mb-4">
                  <div className="flex items-center justify-between text-amber-900 font-extrabold text-sm mb-1">
                    <span>Puntuación Total Acumulada</span>
                    <div className="flex items-center gap-1 text-lg text-amber-600">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>{getTotalScore(activePlayer)} pts</span>
                    </div>
                  </div>
                </div>

                {/* Breakdown per game */}
                <div className="space-y-1.5 text-xs text-slate-600 font-semibold bg-white/60 p-3 rounded-2xl border border-amber-200/60">
                  <div className="flex justify-between py-1 border-b border-amber-100">
                    <span>Frases Verdadero o Falso:</span>
                    <span className="font-bold text-slate-800">{activePlayer.puntuacionFrasesVoF} pts (Nivel {activePlayer.nivelFrasesVoF})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-amber-100">
                    <span>Identifica:</span>
                    <span className="font-bold text-slate-800">{activePlayer.puntuacionIdentifica} pts (Nivel {activePlayer.nivelIdentifica})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-amber-100">
                    <span>Patrones:</span>
                    <span className="font-bold text-slate-800">{activePlayer.puntuacionPatrones} pts (Nivel {activePlayer.nivelPatrones})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-amber-100">
                    <span>Adivina la Palabra:</span>
                    <span className="font-bold text-slate-800">{activePlayer.puntuacionCadenaNum} pts (Nivel {activePlayer.nivelAdivina})</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Recuerda:</span>
                    <span className="font-bold text-slate-800">{activePlayer.puntuacionMemo} pts (Nivel {activePlayer.nivelRecuerda})</span>
                  </div>
                </div>
              </div>

              <button
                id="btn_jugar_con_este_perfil"
                onClick={() => { playClick(); onNavigate('panel_minijuegos'); }}
                className="mt-4 w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm shadow-md active:scale-95 transition border-b-4 border-teal-800 text-center"
              >
                JUGAR CON ESTE PERFIL
              </button>
            </div>
          )}
        </div>

        {/* Players List to Switch */}
        <div className="bg-white/90 border-3 border-amber-400 rounded-3xl p-6 shadow-md">
          <h2 className="text-lg font-black text-amber-950 mb-3">
            Lista de Jugadores ({players.length})
          </h2>
          <p className="text-xs text-slate-500 font-medium mb-4">
            Toca a un jugador para seleccionarlo como jugador activo
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {players.map((p) => {
              const isSelected = activePlayer?.id === p.id;
              const total = getTotalScore(p);

              return (
                <button
                  key={p.id}
                  id={`btn_select_player_${p.id}`}
                  onClick={() => handleSelectPlayer(p.id)}
                  className={`p-3 rounded-2xl border-2 text-left flex items-center justify-between gap-3 transition active:scale-95 ${
                    isSelected
                      ? 'bg-amber-100 border-amber-500 shadow-md ring-2 ring-amber-400/50'
                      : 'bg-white border-amber-200 hover:border-amber-300 hover:bg-amber-50/50 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${p.avatarColor || 'from-amber-400 to-orange-500'} flex items-center justify-center text-white font-black text-base shadow-sm ring-1 ring-white`}>
                      {p.nombre.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm leading-tight">
                        {p.nombre}
                      </h4>
                      <span className="text-xs text-slate-500 font-semibold">
                        {p.edad} años • {total} pts
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="p-1 rounded-full bg-emerald-500 text-white shadow-xs">
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
