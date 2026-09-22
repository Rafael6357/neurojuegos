import React from 'react';
import { Player, ScreenType } from '../../types';
import { getTotalScore } from '../../services/storage';
import { Play, Users, Trophy, Settings, Sparkles, Award } from 'lucide-react';
import { playClick } from '../../utils/sound';

interface InicioScreenProps {
  player: Player | null;
  players: Player[];
  onNavigate: (screen: ScreenType) => void;
  onOpenRanking: () => void;
}

export const InicioScreen: React.FC<InicioScreenProps> = ({
  player,
  players,
  onNavigate,
  onOpenRanking,
}) => {
  // Check if player is #1
  const sortedPlayers = [...players].sort((a, b) => getTotalScore(b) - getTotalScore(a));
  const isChampion = player && sortedPlayers.length > 0 && sortedPlayers[0].id === player.id;
  const currentTotal = player ? getTotalScore(player) : 0;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-b from-amber-100 via-orange-100 to-amber-200 relative overflow-hidden">
      {/* Background playful floating shapes */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-yellow-300/30 blur-xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-orange-400/20 blur-2xl pointer-events-none" />

      {/* Top Banner / Branding */}
      <div className="w-full max-w-md text-center pt-2 sm:pt-6 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-900 border border-amber-500/30 text-xs sm:text-sm font-bold mb-3 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
          <span>Estimulación Cognitiva Infantil</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-amber-950 tracking-tight drop-shadow-sm flex items-center justify-center gap-2">
          <span>Neuro</span>
          <span className="text-amber-600">Juegos</span>
        </h1>
        <p className="text-sm sm:text-base text-amber-900/80 font-medium mt-1">
          Aprende, observa, recuerda y diviértete
        </p>

        {/* Current Active Player Card */}
        {player ? (
          <div 
            id="inicio_player_card"
            className="mt-6 p-4 rounded-3xl bg-white/90 border-3 border-amber-400 shadow-lg backdrop-blur-xs flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${player.avatarColor || 'from-amber-400 to-orange-500'} flex items-center justify-center text-white font-black text-2xl shadow-md ring-4 ring-amber-200`}>
                {player.nombre.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-extrabold text-amber-600 tracking-wider">
                    Jugador Activo
                  </span>
                  {isChampion && (
                    <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 border border-yellow-300">
                      <Award className="w-3 h-3 text-yellow-600" />
                      #1 Líder
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-black text-slate-800 leading-tight">
                  {player.nombre}
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {player.edad} años
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 font-semibold block">Puntos</span>
              <div className="flex items-center gap-1 text-xl font-black text-amber-600 justify-end">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>{currentTotal}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 p-4 rounded-3xl bg-amber-500/20 border-2 border-dashed border-amber-500 text-amber-900 font-bold text-sm">
            Ningún jugador seleccionado. Presiona &quot;Gestión de Jugadores&quot; para registrar uno.
          </div>
        )}
      </div>

      {/* Main Action Buttons */}
      <div className="w-full max-w-sm space-y-4 my-6 sm:my-8 z-10">
        {/* Play Button */}
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
          className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 text-white font-black text-xl shadow-xl hover:shadow-2xl active:scale-95 transition-all border-b-6 border-amber-800 ring-4 ring-amber-300/50"
        >
          <div className="p-2 bg-white/20 rounded-xl">
            <Play className="w-6 h-6 fill-white" />
          </div>
          <span>JUGAR / MINIJUEGOS</span>
        </button>

        {/* Players Management Button */}
        <button
          id="btn_inicio_gestion_jugadores"
          onClick={() => { playClick(); onNavigate('gestion_jugadores'); }}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-3xl bg-white hover:bg-amber-50 text-amber-950 font-bold text-base shadow-md active:scale-95 transition border-2 border-amber-300 border-b-4 border-b-amber-400"
        >
          <Users className="w-5 h-5 text-amber-600" />
          <span>Gestión de Jugadores</span>
        </button>

        {/* Ranking Button */}
        <button
          id="btn_inicio_ranking"
          onClick={() => { playClick(); onOpenRanking(); }}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-3xl bg-white hover:bg-amber-50 text-amber-950 font-bold text-base shadow-md active:scale-95 transition border-2 border-amber-300 border-b-4 border-b-amber-400"
        >
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>Ranking de Jugadores</span>
        </button>

        {/* Settings Button */}
        <button
          id="btn_inicio_ajustes"
          onClick={() => { playClick(); onNavigate('ajustes'); }}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-3xl bg-white hover:bg-amber-50 text-amber-950 font-bold text-base shadow-md active:scale-95 transition border-2 border-amber-300 border-b-4 border-b-amber-400"
        >
          <Settings className="w-5 h-5 text-amber-600" />
          <span>Ajustes y Acerca de</span>
        </button>
      </div>

      {/* Footer info */}
      <footer className="w-full text-center text-xs text-amber-900/70 font-semibold py-2">
        NeuroJuegos • Diseñado para la estimulación de lenguaje, memoria y atención
      </footer>
    </div>
  );
};
