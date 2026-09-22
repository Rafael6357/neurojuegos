import React from 'react';
import { Player, ScreenType } from '../types';
import { getTotalScore } from '../services/storage';
import { Trophy, Volume2, VolumeX, ArrowLeft, Users, Home } from 'lucide-react';
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
    if (
      currentScreen === 'juego_frases_vof' ||
      currentScreen === 'juego_identifica' ||
      currentScreen === 'juego_patrones' ||
      currentScreen === 'juego_adivina' ||
      currentScreen === 'juego_recuerda'
    ) {
      onNavigate('niveles');
    } else if (currentScreen === 'niveles') {
      onNavigate('panel_minijuegos');
    } else {
      onNavigate('inicio');
    }
  };

  return (
    <header className="w-full bg-amber-500/95 backdrop-blur-md text-white shadow-md border-b-4 border-amber-600 sticky top-0 z-30 px-3 sm:px-6 py-2.5">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Back button or Home icon */}
        <div className="flex items-center gap-2">
          {currentScreen !== 'inicio' ? (
            <button
              id="header_btn_back"
              onClick={handleBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-600/90 hover:bg-amber-700 active:scale-95 transition text-white font-medium text-sm shadow-sm"
              title="Volver"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Atrás</span>
            </button>
          ) : (
            <button
              id="header_btn_home"
              onClick={() => { playClick(); onNavigate('inicio'); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-600/90 hover:bg-amber-700 active:scale-95 transition text-white font-bold text-sm shadow-sm"
            >
              <Home className="w-4 h-4" />
              <span>NeuroJuegos</span>
            </button>
          )}

          {title && currentScreen !== 'inicio' && (
            <h1 className="text-base sm:text-lg font-bold truncate max-w-[180px] sm:max-w-xs text-amber-950/90 drop-shadow-xs">
              {title}
            </h1>
          )}
        </div>

        {/* Center / Right: Player Info & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {player && (
            <button
              id="header_btn_player_profile"
              onClick={() => { playClick(); onNavigate('gestion_jugadores'); }}
              className="flex items-center gap-2 bg-amber-600/70 hover:bg-amber-700/80 px-2.5 py-1 rounded-full text-xs sm:text-sm font-semibold transition active:scale-95 border border-amber-400/40"
              title="Gestionar Jugador"
            >
              <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${player.avatarColor || 'from-orange-400 to-amber-500'} flex items-center justify-center text-white text-xs font-bold ring-1 ring-white/50`}>
                {player.nombre.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[70px] sm:max-w-[120px] truncate">{player.nombre}</span>
              <span className="hidden md:inline text-amber-200">({player.edad} años)</span>
            </button>
          )}

          {player && (
            <div
              className="flex items-center gap-1.5 bg-amber-900/30 px-2.5 py-1 rounded-full text-xs sm:text-sm font-bold border border-amber-300/40 shadow-inner"
              title="Puntuación Total"
            >
              <Trophy className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span className="text-yellow-100">{getTotalScore(player)} pts</span>
            </div>
          )}

          {/* Ranking Button */}
          <button
            id="header_btn_ranking"
            onClick={() => { playClick(); onOpenRanking(); }}
            className="p-1.5 rounded-full bg-amber-600/80 hover:bg-amber-700 active:scale-95 transition text-white border border-amber-400/40"
            title="Ranking de Jugadores"
          >
            <Trophy className="w-4 h-4 text-yellow-300" />
          </button>

          {/* Audio toggle */}
          <button
            id="header_btn_sound_toggle"
            onClick={toggleSound}
            className="p-1.5 rounded-full bg-amber-600/80 hover:bg-amber-700 active:scale-95 transition text-white border border-amber-400/40"
            title={soundOn ? 'Sonido Activado' : 'Sonido Silenciado'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-green-200" /> : <VolumeX className="w-4 h-4 text-red-200" />}
          </button>

          {/* Player Management Shortcut */}
          {currentScreen !== 'gestion_jugadores' && (
            <button
              id="header_btn_manage_users"
              onClick={() => { playClick(); onNavigate('gestion_jugadores'); }}
              className="p-1.5 rounded-full bg-amber-600/80 hover:bg-amber-700 active:scale-95 transition text-white border border-amber-400/40"
              title="Gestión de Jugadores"
            >
              <Users className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
