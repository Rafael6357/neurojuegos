import React from 'react';
import { ScreenType } from '../types';
import { Rocket, Gamepad2, Users, Music } from 'lucide-react';
import { playClick } from '../utils/sound';

interface BottomNavProps {
  id?: string;
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  target: ScreenType;
}

export const BottomNav: React.FC<BottomNavProps> = ({ id = 'bottom_nav', currentScreen, onNavigate }) => {
  const inGames = currentScreen.startsWith('juego_') || currentScreen === 'niveles';

  const tabs: Tab[] = [
    {
      id: 'tab_inicio',
      label: 'Inicio',
      icon: <Rocket className="w-6 h-6" />,
      active: currentScreen === 'inicio',
      target: 'inicio',
    },
    {
      id: 'tab_juegos',
      label: 'Juegos',
      icon: <Gamepad2 className="w-6 h-6" />,
      active: currentScreen === 'panel_minijuegos' || inGames,
      target: 'panel_minijuegos',
    },
    {
      id: 'tab_jugadores',
      label: 'Jugadores',
      icon: <Users className="w-6 h-6" />,
      active: currentScreen === 'gestion_jugadores',
      target: 'gestion_jugadores',
    },
    {
      id: 'tab_ajustes',
      label: 'Ajustes',
      icon: <Music className="w-6 h-6" />,
      active: currentScreen === 'ajustes',
      target: 'ajustes',
    },
  ];

  return (
    <nav
      id={id}
      aria-label="Navegación principal"
      className="tab-safe fixed bottom-0 left-0 right-0 z-40 bg-[#0b112c]/90 backdrop-blur-xl border-t border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center justify-around h-20 px-2 gap-1 max-w-2xl mx-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={tab.id}
            onClick={() => { playClick(); onNavigate(tab.target); }}
            aria-current={tab.active ? 'page' : undefined}
            className={`flex-1 min-h-[56px] py-1 px-1 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all active:scale-95 cursor-pointer ${
              tab.active
                ? 'bg-teal-400/20 text-teal-200 font-bold shadow-[0_0_16px_rgba(45,212,191,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.icon}
            <span className="text-[11px] font-extrabold tracking-wide truncate">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
