import { GameType, Player } from '../types';

const PLAYERS_KEY = 'neurojuegos_players_v1';
const ACTIVE_PLAYER_KEY = 'neurojuegos_active_player_v1';

const DEFAULT_PLAYERS: Player[] = [
  {
    id: 'p-1',
    nombre: 'Mateo',
    edad: 5,
    avatarColor: 'from-amber-400 to-orange-500',
    puntuacionFrasesVoF: 8,
    puntuacionIdentifica: 6,
    puntuacionPatrones: 10,
    puntuacionCadenaNum: 6,
    puntuacionMemo: 4,
    nivelFrasesVoF: 4,
    nivelIdentifica: 3,
    nivelPatrones: 3,
    nivelAdivina: 3,
    nivelRecuerda: 2,
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'p-2',
    nombre: 'Sofía',
    edad: 6,
    avatarColor: 'from-pink-400 to-rose-500',
    puntuacionFrasesVoF: 6,
    puntuacionIdentifica: 4,
    puntuacionPatrones: 5,
    puntuacionCadenaNum: 4,
    puntuacionMemo: 2,
    nivelFrasesVoF: 3,
    nivelIdentifica: 2,
    nivelPatrones: 2,
    nivelAdivina: 2,
    nivelRecuerda: 2,
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'p-3',
    nombre: 'Lucas',
    edad: 4,
    avatarColor: 'from-sky-400 to-blue-500',
    puntuacionFrasesVoF: 2,
    puntuacionIdentifica: 2,
    puntuacionPatrones: 0,
    puntuacionCadenaNum: 2,
    puntuacionMemo: 0,
    nivelFrasesVoF: 2,
    nivelIdentifica: 2,
    nivelPatrones: 1,
    nivelAdivina: 2,
    nivelRecuerda: 1,
    createdAt: Date.now() - 86400000,
  },
];

/* Mapa único juego → campos del Player: adiós a los switch gigantes. */
const SCORE_FIELD: Record<GameType, keyof Player> = {
  frases_vof: 'puntuacionFrasesVoF',
  identifica: 'puntuacionIdentifica',
  patrones: 'puntuacionPatrones',
  adivina_palabra: 'puntuacionCadenaNum',
  recuerda: 'puntuacionMemo',
  stroop: 'puntuacionStroop',
  parejas: 'puntuacionParejas',
  ordenar: 'puntuacionOrdenar',
  intruso: 'puntuacionIntruso',
  digitos: 'puntuacionDigitos',
};

const LEVEL_FIELD: Record<GameType, keyof Player> = {
  frases_vof: 'nivelFrasesVoF',
  identifica: 'nivelIdentifica',
  patrones: 'nivelPatrones',
  adivina_palabra: 'nivelAdivina',
  recuerda: 'nivelRecuerda',
  stroop: 'nivelStroop',
  parejas: 'nivelParejas',
  ordenar: 'nivelOrdenar',
  intruso: 'nivelIntruso',
  digitos: 'nivelDigitos',
};

/** Puntos acumulados en un juego concreto. */
export const getGameScore = (p: Player, game: GameType): number => {
  return (p[SCORE_FIELD[game]] as number | undefined) || 0;
};

/** Nivel desbloqueado (1-based) en un juego concreto. */
export const getGameLevel = (p: Player | null | undefined, game: GameType): number => {
  if (!p) return 1;
  return (p[LEVEL_FIELD[game]] as number | undefined) || 1;
};

export const getTotalScore = (p: Player): number => {
  return (
    (p.puntuacionFrasesVoF || 0) +
    (p.puntuacionIdentifica || 0) +
    (p.puntuacionPatrones || 0) +
    (p.puntuacionCadenaNum || 0) +
    (p.puntuacionMemo || 0) +
    (p.puntuacionStroop || 0) +
    (p.puntuacionParejas || 0) +
    (p.puntuacionOrdenar || 0) +
    (p.puntuacionIntruso || 0) +
    (p.puntuacionDigitos || 0)
  );
};

export const getPlayers = (): Player[] => {
  if (typeof window === 'undefined') return DEFAULT_PLAYERS;
  const raw = localStorage.getItem(PLAYERS_KEY);
  if (!raw) {
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(DEFAULT_PLAYERS));
    return DEFAULT_PLAYERS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PLAYERS;
  }
};

export const savePlayers = (players: Player[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
};

export const getActivePlayerId = (): string => {
  if (typeof window === 'undefined') return DEFAULT_PLAYERS[0].id;
  const id = localStorage.getItem(ACTIVE_PLAYER_KEY);
  if (id) return id;
  const players = getPlayers();
  if (players.length > 0) {
    localStorage.setItem(ACTIVE_PLAYER_KEY, players[0].id);
    return players[0].id;
  }
  return '';
};

export const setActivePlayerId = (id: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACTIVE_PLAYER_KEY, id);
};

export const getActivePlayer = (): Player | null => {
  const players = getPlayers();
  const activeId = getActivePlayerId();
  const found = players.find(p => p.id === activeId);
  return found || players[0] || null;
};

const AVATAR_COLORS = [
  'from-amber-400 to-orange-500',
  'from-pink-400 to-rose-500',
  'from-sky-400 to-blue-500',
  'from-emerald-400 to-teal-500',
  'from-purple-400 to-indigo-500',
  'from-yellow-400 to-amber-500',
];

export const MIN_PLAYER_AGE = 1;
export const MAX_PLAYER_AGE = 12;

export const createPlayer = (nombre: string, edad: number): Player => {
  const players = getPlayers();
  const color = AVATAR_COLORS[players.length % AVATAR_COLORS.length];
  const newPlayer: Player = {
    id: 'p-' + Date.now(),
    nombre: nombre.trim(),
    edad: Math.max(MIN_PLAYER_AGE, Math.min(MAX_PLAYER_AGE, edad)),
    avatarColor: color,
    puntuacionFrasesVoF: 0,
    puntuacionIdentifica: 0,
    puntuacionPatrones: 0,
    puntuacionCadenaNum: 0,
    puntuacionMemo: 0,
    puntuacionStroop: 0,
    puntuacionParejas: 0,
    puntuacionOrdenar: 0,
    puntuacionIntruso: 0,
    puntuacionDigitos: 0,
    nivelFrasesVoF: 1,
    nivelIdentifica: 1,
    nivelPatrones: 1,
    nivelAdivina: 1,
    nivelRecuerda: 1,
    nivelStroop: 1,
    nivelParejas: 1,
    nivelOrdenar: 1,
    nivelIntruso: 1,
    nivelDigitos: 1,
    createdAt: Date.now(),
  };

  const updated = [...players, newPlayer];
  savePlayers(updated);
  setActivePlayerId(newPlayer.id);
  return newPlayer;
};

export const updatePlayerScoreAndLevel = (
  playerId: string,
  game: GameType,
  pointsEarned: number,
  completedLevel: number
): Player | null => {
  const players = getPlayers();
  let updatedPlayer: Player | null = null;

  const scoreField = SCORE_FIELD[game];
  const levelField = LEVEL_FIELD[game];
  // Sin tope: completar el último nivel deja desbloqueado = count+1,
  // que significa "juego 100% terminado" (todos los nodos en check).
  const nextLevel = completedLevel + 1;

  const nextPlayers = players.map(p => {
    if (p.id !== playerId) return p;

    const copy = { ...p };
    copy[scoreField] = (((copy[scoreField] as number | undefined) || 0) + pointsEarned) as never;
    copy[levelField] = Math.max(((copy[levelField] as number | undefined) || 1), nextLevel) as never;

    updatedPlayer = copy;
    return copy;
  });

  savePlayers(nextPlayers);
  return updatedPlayer;
};

/** Borra perfiles y selección sin recargar la página (reset suave). */
export const resetAllData = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PLAYERS_KEY);
  localStorage.removeItem(ACTIVE_PLAYER_KEY);
};
