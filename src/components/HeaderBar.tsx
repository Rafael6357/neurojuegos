import React from 'react';
import { Player, ScreenType } from '../types';
import { getTotalScore } from '../services/storage';
import { Trophy, Volume2, VolumeX, ArrowLeft, Users, Home, Settings } from 'lucide-react';
import { playClick, getSoundEnabled, setSoundEnabled } from '../utils/sound';

interface HeaderBarProps {
  player: Player | null;
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenRanking: () => void;
  title?: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  player,
  currentScreen,
  onNavigate,
  onOpenRanking,
  title,
}) => {
  const [soundOn, setSoundOn] = React.useState(getSoundEnabled());

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    playClick();
  };

  const handleBack = () => {
    playClick();
    if (currentScreen.startsWith('juego_')) {
      onNavigate('niveles');
    } else if (currentScreen === 'niveles') {
      onNavigate('panel_minijuegos');
    } else {
      onNavigate('inicio');
    }
  };

  return (
    <header className="w-full bg-[#181C26]/95 backdrop-blur-md text-slate-100 shadow-sm border-b border-slate-800 sticky top-0 z-30 px-3 sm:px-6 py-2.5">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Back button or Home icon */}
        <div className="flex items-center gap-2">
          {currentScreen !== 'inicio' ? (
            <button
              id="header_btn_back"
              onClick={handleBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#23293A] hover:bg-[#2D354B] active:scale-95 transition text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 cursor-pointer"
              title="Volver"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Atrás</span>
            </button>
          ) : (
            <button
              id="header_btn_home"
              onClick={() => { playClick(); onNavigate('inicio'); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 active:scale-95 transition text-amber-300 font-black text-sm border border-amber-500/30 cursor-pointer"
              title="Ir al inicio"
            >
              <Home className="w-4 h-4 text-amber-400" />
              <span>Inicio</span>
            </button>
          )}

          {title && currentScreen !== 'inicio' && (
            <h1 className="hidden sm:inline-block text-xs sm:text-sm font-extrabold truncate max-w-[140px] md:max-w-xs text-slate-200">
              {title}
            </h1>
          )}
        </div>

        {/* Center / Right: Player Info & Controls */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {player && (
            <button
              id="header_btn_player_profile"
              onClick={() => { playClick(); onNavigate('gestion_jugadores'); }}
              className="flex items-center gap-1.5 bg-[#23293A] hover:bg-[#2D354B] px-2.5 py-1 rounded-xl text-xs font-bold transition active:scale-95 border border-slate-700 text-slate-200 cursor-pointer"
              title="Gestionar Jugador"
            >
              <div className={`w-5 h-5 rounded-lg bg-gradient-to-tr ${player.avatarColor || 'from-amber-500 to-orange-500'} flex items-center justify-center text-white text-[10px] font-black shrink-0 shadow-xs`}>
                {player.nombre.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[50px] sm:max-w-[100px] truncate">{player.nombre}</span>
              <span className="hidden md:inline text-slate-400 text-[11px]">({player.edad}a)</span>
            </button>
          )}

          {player && (
            <div
              className="hidden xs:flex items-center gap-1 bg-amber-500/15 px-2.5 py-1 rounded-xl text-xs font-black border border-amber-500/30 text-amber-300"
              title="Puntuación Total"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{getTotalScore(player)} pts</span>
            </div>
          )}

          {/* Ranking Button */}
          <button
            id="header_btn_ranking"
            onClick={() => { playClick(); onOpenRanking(); }}
            className="p-2 rounded-xl bg-[#23293A] hover:bg-[#2D354B] active:scale-95 transition text-slate-300 border border-slate-700 cursor-pointer"
            title="Ranking de Jugadores"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
          </button>

          {/* Audio toggle */}
          <button
            id="header_btn_sound_toggle"
            onClick={toggleSound}
            className="p-2 rounded-xl bg-[#23293A] hover:bg-[#2D354B] active:scale-95 transition text-slate-300 border border-slate-700 cursor-pointer"
            title={soundOn ? 'Sonido Activado' : 'Sonido Silenciado'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
          </button>

          {/* Settings Shortcut */}
          {currentScreen !== 'ajustes' && (
            <button
              id="header_btn_ajustes"
              onClick={() => { playClick(); onNavigate('ajustes'); }}
              className="p-2 rounded-xl bg-[#23293A] hover:bg-[#2D354B] active:scale-95 transition text-slate-300 border border-slate-700 cursor-pointer"
              title="Ajustes y Música"
            >
              <Settings className="w-4 h-4 text-slate-400" />
            </button>
          )}

          {/* Player Management Shortcut */}
          {currentScreen !== 'gestion_jugadores' && (
            <button
              id="header_btn_manage_users"
              onClick={() => { playClick(); onNavigate('gestion_jugadores'); }}
              className="hidden sm:inline-flex p-2 rounded-xl bg-[#23293A] hover:bg-[#2D354B] active:scale-95 transition text-slate-300 border border-slate-700 cursor-pointer"
              title="Gestión de Jugadores"
            >
              <Users className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
