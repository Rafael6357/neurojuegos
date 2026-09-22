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
  nivelFrasesVoF: number;      // Max level unlocked (starts at 1)
  nivelIdentifica: number;
  nivelPatrones: number;
  nivelAdivina: number;
  nivelRecuerda: number;
  createdAt: number;
}

export type GameType = 
  | 'frases_vof'
  | 'identifica'
  | 'patrones'
  | 'adivina_palabra'
  | 'recuerda';

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
  | 'victoria'
  | 'ajustes'
  | 'ranking';
