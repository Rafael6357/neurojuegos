export interface Player {
  id: string;
  nombre: string;
  edad: number;
  avatarColor: string;
  puntuacionFrasesVoF: number;
  puntuacionIdentifica: number;
  puntuacionPatrones: number;
  puntuacionCadenaNum: number; // Adivina la palabra
  puntuacionMemo: number;      // Recuerda
  puntuacionStroop?: number;   // Desafío de colores
  puntuacionParejas?: number;  // Parejas de cartas
  puntuacionOrdenar?: number;  // Ordena la frase
  puntuacionIntruso?: number;  // Encuentra el intruso
  puntuacionDigitos?: number;  // Dígitos inversos
  nivelFrasesVoF: number;      // Max level unlocked (starts at 1)
  nivelIdentifica: number;
  nivelPatrones: number;
  nivelAdivina: number;
  nivelRecuerda: number;
  nivelStroop?: number;
  nivelParejas?: number;
  nivelOrdenar?: number;
  nivelIntruso?: number;
  nivelDigitos?: number;
  createdAt: number;
}

export type GameType = 
  | 'frases_vof'
  | 'identifica'
  | 'patrones'
  | 'adivina_palabra'
  | 'recuerda'
  | 'stroop'
  | 'parejas'
  | 'ordenar'
  | 'intruso'
  | 'digitos';

export type CognitiveArea = 'todos' | 'lenguaje' | 'memoria' | 'atencion';

export type ScreenType =
  | 'inicio'
  | 'gestion_jugadores'
  | 'panel_minijuegos'
  | 'niveles'
  | 'juego_frases_vof'
  | 'juego_identifica'
  | 'juego_patrones'
  | 'juego_adivina'
  | 'juego_recuerda'
  | 'juego_stroop'
  | 'juego_parejas'
  | 'juego_ordenar'
  | 'juego_intruso'
  | 'juego_digitos'
  | 'victoria'
  | 'ajustes'
  | 'ranking';

/** Área cognitiva con identidad visual propia (lenguaje=teal, memoria=violeta, atención=ámbar). */
export type AreaId = 'lenguaje' | 'memoria' | 'atencion';

/** Ficha única de verdad por minijuego: elimina la duplicación entre Panel/Niveles/Gestión/App. */
export interface GameMeta {
  id: GameType;
  /** Título corto para tarjetas (textos fijados por tests E2E: no renombrar). */
  title: string;
  /** Subtítulo visible en la tarjeta del panel. */
  subtitle: string;
  description: string;
  area: AreaId;
  areaLabel: string;
  /** Título largo usado en la pantalla de niveles. */
  levelsTitle: string;
  /** Pantalla de juego correspondiente. */
  screen: ScreenType;
  /** Emoji-planeta que identifica al juego (sistema visual sin fotos). */
  emoji: string;
  /** Gradiente del planeta: clases literales Tailwind (deben existir como literales). */
  planetGradient: string;
  /** Acento brillante del planeta para anillos y brillos. */
  planetGlow: string;
}

/** Estado de retroalimentación compartido por todos los juegos y pantallas. */
export interface FeedbackState {
  text: string;
  kind: 'info' | 'success' | 'error';
}

