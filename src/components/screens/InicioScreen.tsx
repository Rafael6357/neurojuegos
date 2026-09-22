import React from 'react';
import { Player, ScreenType } from '../../types';
import { getTotalScore } from '../../services/storage';
import { Play, Users, Trophy, Settings, Award, ArrowRight } from 'lucide-react';
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
    <div className="min-h-[calc(100vh-64px)] bg-[#131722] text-slate-100 flex flex-col justify-between py-6 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto w-full space-y-6 sm:space-y-8">
        
        {/* Main Hero Showcase */}
        <div className="bg-[#1C212E] rounded-3xl p-5 sm:p-8 border border-slate-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          
          {/* Left: Professional bespoke illustration */}
          <div className="w-full md:w-1/2 relative group">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-inner">
              <img
                src="/assets/hero_neurojuegos.jpg"
                alt="Estimulación Cognitiva Infantil"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right: Editorial Typography & Actions */}
          <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
            <div>
              {/* Prominently Repositioned: Estimulacion de 0 a 6 anos Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-300 text-xs sm:text-sm font-black tracking-wide border border-amber-500/30 shadow-xs mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Estimulación de 0 a 6 años</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-100 tracking-tight leading-tight">
                Estimulación Cognitiva Infantil
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-2 leading-relaxed">
                Plataforma interactiva especializada en el neurodesarrollo del lenguaje, la memoria operativa y el control atencional.
              </p>
            </div>

            {/* Active Player Status Badge */}
            {player ? (
              <div 
                id="inicio_player_card"
                className="p-3.5 rounded-2xl bg-[#23293A] border border-slate-700 flex items-center justify-between gap-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${player.avatarColor || 'from-amber-400 to-orange-500'} flex items-center justify-center text-white font-black text-lg shadow-sm ring-2 ring-slate-600 shrink-0`}>
                    {player.nombre.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider">
                        Jugador
                      </span>
                      {isChampion && (
                        <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                          <Award className="w-3 h-3 text-yellow-400" />
                          #1
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-black text-slate-100 truncate">
                      {player.nombre} <span className="text-xs font-semibold text-slate-400">({player.edad} años)</span>
                    </h3>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Puntos</span>
                  <div className="flex items-center gap-1 text-base font-black text-amber-400 justify-end">
                    <Trophy className="w-4 h-4 text-amber-400" />
                    <span>{currentTotal}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-[#23293A] border border-dashed border-amber-500/40 text-amber-300 font-semibold text-xs text-center">
                Ningún jugador seleccionado. Presiona &quot;Gestión de Jugadores&quot; para registrar uno.
              </div>
            )}

            {/* Play Primary CTA */}
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
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-lg shadow-[0_4px_16px_rgba(245,158,11,0.4)] active:scale-[0.98] transition-all cursor-pointer border border-amber-500"
            >
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Play className="w-5 h-5 fill-white" />
              </div>
              <span>JUGAR / MINIJUEGOS</span>
              <ArrowRight className="w-5 h-5 ml-1 opacity-80" />
            </button>
          </div>
        </div>

        {/* Cognitive Pillars Showcase (3 Professional Visual Cards) */}
        <div>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-xs sm:text-sm font-extrabold text-slate-300 tracking-wide uppercase">
              Áreas de Estimulación
            </h2>
            <span className="text-xs text-slate-400 font-medium">10 Minijuegos validados</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Lenguaje */}
            <div 
              onClick={() => { playClick(); onNavigate('panel_minijuegos'); }}
              className="group bg-[#1C212E] rounded-2xl p-3 border border-slate-700/80 hover:border-emerald-500/60 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-emerald-950/40 border border-emerald-500/30 shrink-0">
                <img
                  src="/assets/category_lenguaje.jpg"
                  alt="Área de Lenguaje"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-extrabold uppercase text-emerald-400 tracking-wider block">
                  Lenguaje
                </span>
                <h4 className="text-sm font-black text-slate-100 truncate">
                  Palabras y Oraciones
                </h4>
                <span className="text-xs text-slate-400 font-medium">4 Minijuegos</span>
              </div>
            </div>

            {/* Memoria */}
            <div 
              onClick={() => { playClick(); onNavigate('panel_minijuegos'); }}
              className="group bg-[#1C212E] rounded-2xl p-3 border border-slate-700/80 hover:border-purple-500/60 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-purple-950/40 border border-purple-500/30 shrink-0">
                <img
                  src="/assets/category_memoria.jpg"
                  alt="Área de Memoria"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-extrabold uppercase text-purple-400 tracking-wider block">
                  Memoria
                </span>
                <h4 className="text-sm font-black text-slate-100 truncate">
                  Visual y Operativa
                </h4>
                <span className="text-xs text-slate-400 font-medium">4 Minijuegos</span>
              </div>
            </div>

            {/* Atención */}
            <div 
              onClick={() => { playClick(); onNavigate('panel_minijuegos'); }}
              className="group bg-[#1C212E] rounded-2xl p-3 border border-slate-700/80 hover:border-amber-500/60 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-3.5"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-amber-950/40 border border-amber-500/30 shrink-0">
                <img
                  src="/assets/category_atencion.jpg"
                  alt="Área de Atención"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform"
                />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-extrabold uppercase text-amber-400 tracking-wider block">
                  Atención
                </span>
                <h4 className="text-sm font-black text-slate-100 truncate">
                  Foco y Control
                </h4>
                <span className="text-xs text-slate-400 font-medium">2 Minijuegos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Navigation Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Players Management Button */}
          <button
            id="btn_inicio_gestion_jugadores"
            onClick={() => { playClick(); onNavigate('gestion_jugadores'); }}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#1C212E] hover:bg-[#252B3B] text-slate-200 font-bold text-sm shadow-xs border border-slate-700 active:scale-95 transition cursor-pointer"
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>Gestión de Jugadores</span>
          </button>

          {/* Ranking Button */}
          <button
            id="btn_inicio_ranking"
            onClick={() => { playClick(); onOpenRanking(); }}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#1C212E] hover:bg-[#252B3B] text-slate-200 font-bold text-sm shadow-xs border border-slate-700 active:scale-95 transition cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Ranking de Jugadores</span>
          </button>

          {/* Settings Button */}
          <button
            id="btn_inicio_ajustes"
            onClick={() => { playClick(); onNavigate('ajustes'); }}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#1C212E] hover:bg-[#252B3B] text-slate-200 font-bold text-sm shadow-xs border border-slate-700 active:scale-95 transition cursor-pointer"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Ajustes y Acerca de</span>
          </button>
        </div>

      </div>

      {/* Subtle Professional Footer without the forbidden text */}
      <footer className="w-full text-center text-xs text-slate-500 font-medium py-3 border-t border-slate-800 mt-6">
        Intervención lúdica y estimulación cognitiva infantil • Neurodesarrollo 0 a 6 años
      </footer>
    </div>
  );
};

