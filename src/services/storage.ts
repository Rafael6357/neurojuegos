import { Player } from '../types';

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
  }
];

export const getTotalScore = (p: Player): number => {
  return (
    (p.puntuacionFrasesVoF || 0) +
    (p.puntuacionIdentifica || 0) +
    (p.puntuacionPatrones || 0) +
    (p.puntuacionCadenaNum || 0) +
    (p.puntuacionMemo || 0)
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
  'from-yellow-400 to-amber-500'
];

export const createPlayer = (nombre: string, edad: number): Player => {
  const players = getPlayers();
  const color = AVATAR_COLORS[players.length % AVATAR_COLORS.length];
  const newPlayer: Player = {
    id: 'p-' + Date.now(),
    nombre: nombre.trim(),
    edad: Math.max(1, Math.min(12, edad)),
    avatarColor: color,
    puntuacionFrasesVoF: 0,
    puntuacionIdentifica: 0,
    puntuacionPatrones: 0,
    puntuacionCadenaNum: 0,
    puntuacionMemo: 0,
    nivelFrasesVoF: 1,
    nivelIdentifica: 1,
    nivelPatrones: 1,
    nivelAdivina: 1,
    nivelRecuerda: 1,
    createdAt: Date.now(),
  };

  const updated = [...players, newPlayer];
  savePlayers(updated);
  setActivePlayerId(newPlayer.id);
  return newPlayer;
};

export const updatePlayerScoreAndLevel = (
  playerId: string,
  gameKey: 'FrasesVoF' | 'Identifica' | 'Patrones' | 'Adivina' | 'Recuerda',
  pointsEarned: number,
  completedLevel: number
): Player | null => {
  const players = getPlayers();
  let updatedPlayer: Player | null = null;

  const nextPlayers = players.map(p => {
    if (p.id !== playerId) return p;

    const copy = { ...p };
    const nextLevel = completedLevel + 1;

    switch (gameKey) {
      case 'FrasesVoF':
        copy.puntuacionFrasesVoF = (copy.puntuacionFrasesVoF || 0) + pointsEarned;
        copy.nivelFrasesVoF = Math.max(copy.nivelFrasesVoF || 1, nextLevel);
        break;
      case 'Identifica':
        copy.puntuacionIdentifica = (copy.puntuacionIdentifica || 0) + pointsEarned;
        copy.nivelIdentifica = Math.max(copy.nivelIdentifica || 1, nextLevel);
        break;
      case 'Patrones':
        copy.puntuacionPatrones = (copy.puntuacionPatrones || 0) + pointsEarned;
        copy.nivelPatrones = Math.max(copy.nivelPatrones || 1, nextLevel);
        break;
      case 'Adivina':
        copy.puntuacionCadenaNum = (copy.puntuacionCadenaNum || 0) + pointsEarned;
        copy.nivelAdivina = Math.max(copy.nivelAdivina || 1, nextLevel);
        break;
      case 'Recuerda':
        copy.puntuacionMemo = (copy.puntuacionMemo || 0) + pointsEarned;
        copy.nivelRecuerda = Math.max(copy.nivelRecuerda || 1, nextLevel);
        break;
    }

    updatedPlayer = copy;
    return copy;
  });

  savePlayers(nextPlayers);
  return updatedPlayer;
};
