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

