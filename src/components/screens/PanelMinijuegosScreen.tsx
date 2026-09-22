import React, { useState } from 'react';
import { Player, GameType, ScreenType, CognitiveArea } from '../../types';
import {
  CheckCircle2,
  Eye,
  Brain,
  HelpCircle,
  Grid,
  ArrowRight,
  Trophy,
  Star,
  Sparkles,
  Palette,
  Layers,
  BookOpen,
  Search,
  Hash,
  Flame
} from 'lucide-react';
import { playClick } from '../../utils/sound';

interface PanelMinijuegosScreenProps {
  player: Player | null;
  onSelectGame: (game: GameType) => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenRanking: () => void;
}

interface GameDefinition {
  id: GameType;
  title: string;
  subtitle: string;
  description: string;
  category: 'lenguaje' | 'memoria' | 'atencion';
  categoryLabel: string;
  image: string;
  color: string;
  badgeBg: string;
  unlockedLevel: number;
  score: number;
}

export const PanelMinijuegosScreen: React.FC<PanelMinijuegosScreenProps> = ({
  player,
  onSelectGame,
  onOpenRanking,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<CognitiveArea>('todos');

  const allGames: GameDefinition[] = [
    // --- LENGUAJE ---
    {
      id: 'frases_vof',
      title: 'Frases V o F',
      subtitle: 'Verdadero o Falso',
      description: 'Observa las imágenes y determina si las afirmaciones son verdaderas o falsas.',
      category: 'lenguaje',
      categoryLabel: 'Lenguaje y Comprensión',
      image: '/assets/category_lenguaje.jpg',
      color: 'from-emerald-600 to-teal-700',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      unlockedLevel: player?.nivelFrasesVoF || 1,
      score: player?.puntuacionFrasesVoF || 0,
    },
    {
      id: 'identifica',
      title: 'Identifica',
      subtitle: 'Asociación Palabra - Objeto',
      description: 'Relaciona palabras con imágenes reales y evalúa si coinciden con precisión.',
      category: 'lenguaje',
      categoryLabel: 'Vocabulario y Asociación',
      image: '/assets/category_lenguaje.jpg',
      color: 'from-emerald-600 to-teal-700',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      unlockedLevel: player?.nivelIdentifica || 1,
      score: player?.puntuacionIdentifica || 0,
    },
    {
      id: 'adivina_palabra',
      title: 'Adivina la Palabra',
      subtitle: 'Deducción con Pistas',
      description: 'Descubre palabras secretas ingresando letras guiado por pistas semánticas.',
      category: 'lenguaje',
      categoryLabel: 'Conciencia Fonológica',
      image: '/assets/category_lenguaje.jpg',
      color: 'from-emerald-600 to-teal-700',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      unlockedLevel: player?.nivelAdivina || 1,
      score: player?.puntuacionCadenaNum || 0,
    },
    {
      id: 'ordenar',
      title: 'Ordena la Frase',
      subtitle: 'Sintaxis y Estructura',
      description: 'Organiza las fichas de palabras desordenadas para formar oraciones con sentido.',
      category: 'lenguaje',
      categoryLabel: 'Sintaxis y Gramática',
      image: '/assets/category_lenguaje.jpg',
      color: 'from-emerald-600 to-teal-700',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      unlockedLevel: player?.nivelOrdenar || 1,
      score: player?.puntuacionOrdenar || 0,
    },

    // --- MEMORIA ---
    {
      id: 'recuerda',
      title: 'Recuerda',
      subtitle: 'Memoria Espacial',
      description: 'Memoriza dónde estaba cada objeto en la cuadrícula antes de que se volteen.',
      category: 'memoria',
      categoryLabel: 'Memoria Visual Espacial',
      image: '/assets/category_memoria.jpg',
      color: 'from-purple-600 to-indigo-700',
      badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
      unlockedLevel: player?.nivelRecuerda || 1,
      score: player?.puntuacionMemo || 0,
    },
    {
      id: 'patrones',
      title: 'Patrones',
      subtitle: 'Memoria Secuencial',
      description: 'Observa atentamente el orden de desaparición de las figuras y reordénalas.',
      category: 'memoria',
      categoryLabel: 'Memoria de Secuencia',
      image: '/assets/category_memoria.jpg',
      color: 'from-purple-600 to-indigo-700',
      badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
      unlockedLevel: player?.nivelPatrones || 1,
      score: player?.puntuacionPatrones || 0,
    },
    {
      id: 'parejas',
      title: 'Parejas de Cartas',
      subtitle: 'Memory Clásico',
      description: 'Voltea las cartas de dos en dos y encuentra los pares de figuras idénticas.',
      category: 'memoria',
      categoryLabel: 'Memoria a Corto Plazo',
      image: '/assets/category_memoria.jpg',
      color: 'from-purple-600 to-indigo-700',
      badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
      unlockedLevel: player?.nivelParejas || 1,
      score: player?.puntuacionParejas || 0,
    },
    {
      id: 'digitos',
      title: 'Dígitos Inversos',
      subtitle: 'Memoria de Trabajo',
      description: 'Memoriza secuencias numéricas e ingrésalas en el orden exactamente inverso.',
      category: 'memoria',
      categoryLabel: 'Manipulación Operativa',
      image: '/assets/category_memoria.jpg',
      color: 'from-purple-600 to-indigo-700',
      badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
      unlockedLevel: player?.nivelDigitos || 1,
      score: player?.puntuacionDigitos || 0,
    },

    // --- ATENCIÓN Y CONTROL EJECUTIVO ---
    {
      id: 'stroop',
      title: 'Desafío de Colores',
      subtitle: 'Efecto Stroop',
      description: 'Inhibe la lectura automática y toca el color de la tinta de las letras.',
      category: 'atencion',
      categoryLabel: 'Control Inhibitorio',
      image: '/assets/category_atencion.jpg',
      color: 'from-amber-600 to-orange-700',
      badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
      unlockedLevel: player?.nivelStroop || 1,
      score: player?.puntuacionStroop || 0,
    },
    {
      id: 'intruso',
      title: 'Encuentra el Intruso',
      subtitle: 'Discriminación Visual',
      description: 'Detecta rápidamente el elemento que no comparte la categoría con los demás.',
      category: 'atencion',
      categoryLabel: 'Atención Selectiva',
      image: '/assets/category_atencion.jpg',
      color: 'from-amber-600 to-orange-700',
      badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
      unlockedLevel: player?.nivelIntruso || 1,
      score: player?.puntuacionIntruso || 0,
    },
  ];

  const filteredGames = selectedFilter === 'todos'
    ? allGames
    : allGames.filter(g => g.category === selectedFilter);

  // Statistics calculation for cognitive stimulation
  const countLenguaje = allGames.filter(g => g.category === 'lenguaje').length;
  const countMemoria = allGames.filter(g => g.category === 'memoria').length;
  const countAtencion = allGames.filter(g => g.category === 'atencion').length;

  const totalScoreLenguaje = allGames
    .filter(g => g.category === 'lenguaje')
    .reduce((sum, g) => sum + g.score, 0);

  const totalScoreMemoria = allGames
    .filter(g => g.category === 'memoria')
    .reduce((sum, g) => sum + g.score, 0);

  const totalScoreAtencion = allGames
    .filter(g => g.category === 'atencion')
    .reduce((sum, g) => sum + g.score, 0);

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 sm:p-8 bg-[#131722] text-slate-100">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#1C212E] p-5 sm:p-6 rounded-3xl border border-slate-700/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)]">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold tracking-wide uppercase mb-1 border border-amber-500/30">
              Catálogo de Actividades
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              Panel de Estimulación Cognitiva
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
              10 Minijuegos diseñados para potenciar el Lenguaje, la Memoria y la Atención
            </p>
          </div>

          <button
            id="btn_panel_ver_ranking"
            onClick={() => { playClick(); onOpenRanking(); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-500 active:scale-95 text-white font-black text-sm shadow-xs transition cursor-pointer border border-amber-500 shrink-0"
          >
            <Trophy className="w-4 h-4 text-amber-200" />
            <span>Ver Ranking</span>
          </button>
        </div>

        {/* Cognitive Summary Badges with Real Illustrations */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="bg-[#1C212E] p-3.5 rounded-2xl border border-slate-700/80 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-emerald-950/40 border border-emerald-500/30 shrink-0">
                <img
                  src="/assets/category_lenguaje.jpg"
                  alt="Lenguaje"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-black block uppercase tracking-wider text-emerald-400">
                  Lenguaje
                </span>
                <span className="text-xs text-slate-400 font-medium">4 Minijuegos</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-emerald-300 bg-emerald-950/50 px-2.5 py-1 rounded-xl border border-emerald-500/40 block">
                {totalScoreLenguaje} pts
              </span>
            </div>
          </div>

          <div className="bg-[#1C212E] p-3.5 rounded-2xl border border-slate-700/80 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-purple-950/40 border border-purple-500/30 shrink-0">
                <img
                  src="/assets/category_memoria.jpg"
                  alt="Memoria"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-black block uppercase tracking-wider text-purple-400">
                  Memoria
                </span>
                <span className="text-xs text-slate-400 font-medium">4 Minijuegos</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-purple-300 bg-purple-950/50 px-2.5 py-1 rounded-xl border border-purple-500/40 block">
                {totalScoreMemoria} pts
              </span>
            </div>
          </div>

          <div className="bg-[#1C212E] p-3.5 rounded-2xl border border-slate-700/80 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-amber-950/40 border border-amber-500/30 shrink-0">
                <img
                  src="/assets/category_atencion.jpg"
                  alt="Atención"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-black block uppercase tracking-wider text-amber-400">
                  Atención
                </span>
                <span className="text-xs text-slate-400 font-medium">2 Minijuegos</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-amber-300 bg-amber-950/50 px-2.5 py-1 rounded-xl border border-amber-500/40 block">
                {totalScoreAtencion} pts
              </span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-[#1C212E] p-2 rounded-2xl border border-slate-700/80 shadow-xs">
          <button
            onClick={() => { playClick(); setSelectedFilter('todos'); }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedFilter === 'todos'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-[#23293A] hover:bg-[#2C3449] text-slate-300'
            }`}
          >
            Todos ({allGames.length})
          </button>

          <button
            onClick={() => { playClick(); setSelectedFilter('lenguaje'); }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedFilter === 'lenguaje'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-[#23293A] hover:bg-[#2C3449] text-slate-300'
            }`}
          >
            <span>Lenguaje ({countLenguaje})</span>
          </button>

          <button
            onClick={() => { playClick(); setSelectedFilter('memoria'); }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedFilter === 'memoria'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'bg-[#23293A] hover:bg-[#2C3449] text-slate-300'
            }`}
          >
            <span>Memoria ({countMemoria})</span>
          </button>

          <button
            onClick={() => { playClick(); setSelectedFilter('atencion'); }}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedFilter === 'atencion'
                ? 'bg-amber-700 text-white shadow-xs'
                : 'bg-[#23293A] hover:bg-[#2C3449] text-slate-300'
            }`}
          >
            <span>Atención ({countAtencion})</span>
          </button>
        </div>

        {/* Minigames Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGames.map((g) => {
            return (
              <div
                key={g.id}
                id={`game_card_${g.id}`}
                className="bg-[#1C212E] rounded-3xl border border-slate-700/80 hover:border-amber-500/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Top card visual illustration banner */}
                <div className="relative aspect-[16/8] overflow-hidden bg-slate-900 border-b border-slate-800">
                  <img
                    src={g.image}
                    alt={g.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C212E] via-black/30 to-transparent flex items-end p-4">
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase mb-1 backdrop-blur-md ${
                        g.category === 'lenguaje'
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                          : g.category === 'memoria'
                          ? 'bg-purple-950/80 text-purple-300 border border-purple-500/40'
                          : 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                      }`}>
                        {g.categoryLabel}
                      </span>
                      <h2 className="text-lg font-black text-white tracking-tight leading-tight drop-shadow-sm">
                        {g.title}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block mb-1">
                      {g.subtitle}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mb-4">
                      {g.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-400 font-bold mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>{g.score} Puntos</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-xl bg-[#23293A] text-slate-200 border border-slate-700">
                      Nivel {g.unlockedLevel} / 16
                    </div>
                  </div>

                  <button
                    id={`btn_play_${g.id}`}
                    onClick={() => {
                      playClick();
                      onSelectGame(g.id);
                    }}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r ${g.color} hover:brightness-110 active:scale-95 text-white font-extrabold text-sm shadow-xs transition cursor-pointer`}
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
