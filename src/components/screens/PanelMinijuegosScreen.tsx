import React from 'react';
import { Player, GameType, ScreenType } from '../../types';
import { CheckCircle2, Eye, Brain, HelpCircle, Grid, ArrowRight, Trophy, Star } from 'lucide-react';
import { playClick } from '../../utils/sound';

interface PanelMinijuegosScreenProps {
  player: Player | null;
  onSelectGame: (game: GameType) => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenRanking: () => void;
}

export const PanelMinijuegosScreen: React.FC<PanelMinijuegosScreenProps> = ({
  player,
  onSelectGame,
  onNavigate,
  onOpenRanking,
}) => {
  const games = [
    {
      id: 'frases_vof' as GameType,
      title: 'Frases V o F',
      subtitle: 'Verdadero o Falso',
      description: 'Observa las imágenes y determina si las afirmaciones son verdaderas o falsas.',
      category: 'Lenguaje y Comprensión',
      icon: CheckCircle2,
      color: 'from-amber-500 to-orange-600',
      badgeBg: 'bg-orange-100 text-orange-800',
      unlockedLevel: player?.nivelFrasesVoF || 1,
      score: player?.puntuacionFrasesVoF || 0,
    },
    {
      id: 'identifica' as GameType,
      title: 'Identifica',
      subtitle: 'Asociación Palabra - Objeto',
      description: 'Relaciona palabras con imágenes reales y marca los elementos correctos.',
      category: 'Vocabulario y Atención',
      icon: Eye,
      color: 'from-sky-500 to-blue-600',
      badgeBg: 'bg-blue-100 text-blue-800',
      unlockedLevel: player?.nivelIdentifica || 1,
      score: player?.puntuacionIdentifica || 0,
    },
    {
      id: 'patrones' as GameType,
      title: 'Patrones',
      subtitle: 'Memoria Secuencial',
      description: 'Observa atentamente el orden en que desaparecen las figuras y reordénalas.',
      category: 'Memoria de Trabajo',
      icon: Brain,
      color: 'from-purple-500 to-indigo-600',
      badgeBg: 'bg-purple-100 text-purple-800',
      unlockedLevel: player?.nivelPatrones || 1,
      score: player?.puntuacionPatrones || 0,
    },
    {
      id: 'adivina_palabra' as GameType,
      title: 'Adivina la Palabra',
      subtitle: 'Juego de Palabras con Pistas',
      description: 'Descubre la palabra secreta ingresando letras con la ayuda de pistas divertidas.',
      category: 'Conciencia Fonológica',
      icon: HelpCircle,
      color: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      unlockedLevel: player?.nivelAdivina || 1,
      score: player?.puntuacionCadenaNum || 0,
    },
    {
      id: 'recuerda' as GameType,
      title: 'Recuerda',
      subtitle: 'Memoria Espacial',
      description: 'Memoriza dónde estaba cada objeto antes de que se oculten en la cuadrícula.',
      category: 'Memoria Visual Espacial',
      icon: Grid,
      color: 'from-pink-500 to-rose-600',
      badgeBg: 'bg-pink-100 text-pink-800',
      unlockedLevel: player?.nivelRecuerda || 1,
      score: player?.puntuacionMemo || 0,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-8 bg-gradient-to-b from-amber-100 via-orange-50 to-amber-200">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-xs p-5 rounded-3xl border-3 border-amber-400 shadow-md">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-amber-950">
              Panel de Minijuegos
            </h1>
            <p className="text-sm text-slate-600 font-semibold mt-0.5">
              Selecciona un juego para ejercitar lenguaje, memoria y atención
            </p>
          </div>

          <button
            id="btn_panel_ver_ranking"
            onClick={() => { playClick(); onOpenRanking(); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-sm shadow-md transition border-b-3 border-amber-700"
          >
            <Trophy className="w-4 h-4 text-yellow-200" />
            <span>Ver Ranking</span>
          </button>
        </div>

        {/* Minigames Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {games.map((g) => {
            const Icon = g.icon;

            return (
              <div
                key={g.id}
                id={`game_card_${g.id}`}
                className="bg-white/95 rounded-3xl border-3 border-amber-300 hover:border-amber-500 shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Top card banner */}
                <div className={`p-4 bg-gradient-to-r ${g.color} text-white flex items-center justify-between`}>
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-white/20 rounded-2xl backdrop-blur-xs ring-2 ring-white/30">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black tracking-tight leading-tight">
                        {g.title}
                      </h2>
                      <span className="text-xs text-white/80 font-medium">
                        {g.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-2.5 ${g.badgeBg}`}>
                      {g.category}
                    </span>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">
                      {g.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs text-slate-500 font-bold mb-4">
                    <div className="flex items-center gap-1 text-amber-700">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>{g.score} Puntos</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
                      Nivel {g.unlockedLevel} / 16
                    </div>
                  </div>

                  <button
                    id={`btn_play_${g.id}`}
                    onClick={() => {
                      playClick();
                      onSelectGame(g.id);
                    }}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r ${g.color} hover:brightness-110 active:scale-95 text-white font-extrabold text-sm shadow-md transition`}
                  >
                    <span>SELECCIONAR NIVELES</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
