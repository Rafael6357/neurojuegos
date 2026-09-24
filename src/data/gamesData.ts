import type { AreaId, GameMeta, GameType } from '../types';

/* ============================================================================
 * Contenido 100% autocontenido (emoji + texto): cero fotos, cero red.
 * Las fotos anteriores (/assets/*.jpg…) no existen en public/ y rompían
 * Frases, Identifica, Recuerda y Patrones. El sistema emoji+gradiente las
 * sustituye con una estética coherente y a prueba de fallos offline.
 * ========================================================================== */

export interface FrasesVoFLevel {
  level: number;
  /** Escena observable construida con emojis (sustituye a las fotos). */
  emojis: string[];
  statement1: string;
  answer1: boolean; // true = Verdadero, false = Falso
  statement2: string;
  answer2: boolean;
  points: number;
}

export interface IdentificaItem {
  id: string;
  label: string;
  emoji: string;
  isCorrect: boolean; // does the label match what the child should check
}

export interface IdentificaLevel {
  level: number;
  taskText: string;
  items: IdentificaItem[];
  points: number;
}

export interface PatronesLevel {
  level: number;
  items: { id: string; name: string; emoji: string }[];
  correctOrder: number[]; // e.g. [1, 2, 0] order in which they disappear
  options: { id: string; label: string; isCorrect: boolean }[];
  points: number;
}

export interface AdivinaLevel {
  level: number;
  word: string;
  hint: string;
  maxAttempts: number;
  points: number;
}

export interface RecuerdaLevel {
  level: number;
  items: { id: string; name: string; emoji: string }[];
  targetItemIndex: number;
  targetItemName: string;
  previewSeconds: number;
  points: number;
}

export const FRASES_VOF_LEVELS: FrasesVoFLevel[] = [
  {
    level: 1,
    emojis: ['🐶', '🦴', '🐱', '🐟'],
    statement1: 'El perro dice «guau» y le encantan los huesos',
    answer1: true,
    statement2: 'Se pueden ver 5 animales en la escena',
    answer2: false,
    points: 2,
  },
  {
    level: 2,
    emojis: ['🚗', '🛞', '🚦'],
    statement1: 'El carro tiene ruedas redondas para poder rodar',
    answer1: true,
    statement2: 'El semáforo solo tiene luces de color azul',
    answer2: false,
    points: 2,
  },
  {
    level: 3,
    emojis: ['🌳', '🍎', '🐦'],
    statement1: 'El pájaro está posado en el árbol junto a la manzana',
    answer1: true,
    statement2: 'El tronco del árbol es de color morado',
    answer2: false,
    points: 2,
  },
  {
    level: 4,
    emojis: ['🧒', '⚽', '🎒'],
    statement1: 'El niño lleva su mochila para ir a jugar',
    answer1: true,
    statement2: 'El balón es cuadrado y no puede rodar',
    answer2: false,
    points: 2,
  },
  {
    level: 5,
    emojis: ['🍌', '🍎', '🍇', '🧺'],
    statement1: 'En la canasta hay plátano, manzana y uvas',
    answer1: true,
    statement2: 'Todas las frutas de la canasta son de color azul',
    answer2: false,
    points: 2,
  },
  {
    level: 6,
    emojis: ['👧', '👦', '🪁', '☀️'],
    statement1: 'Los niños juegan con la cometa en un día soleado',
    answer1: true,
    statement2: 'La cometa vuela bajo el agua del mar',
    answer2: false,
    points: 2,
  },
  {
    level: 7,
    emojis: ['🐘', '🦒', '🦁', '🌿'],
    statement1: 'El elefante, la jirafa y el león son animales salvajes',
    answer1: true,
    statement2: 'La jirafa tiene el cuello más corto que el elefante',
    answer2: false,
    points: 2,
  },
  {
    level: 8,
    emojis: ['🛏️', '🧸', '💡'],
    statement1: 'El osito de peluche acompaña a dormir en la cama',
    answer1: true,
    statement2: 'La lámpara sirve para regar las plantas',
    answer2: false,
    points: 2,
  },
  {
    level: 9,
    emojis: ['🚲', '🛞', '⛑️'],
    statement1: 'La bicicleta tiene dos ruedas y se usa con casco',
    answer1: true,
    statement2: 'La bicicleta vuela con un motor de avión',
    answer2: false,
    points: 2,
  },
  {
    level: 10,
    emojis: ['🚗', '⚽', '🏁'],
    statement1: 'El balón tiene forma redonda para rodar y rebotar',
    answer1: true,
    statement2: 'El carro tiene ruedas cuadradas de madera',
    answer2: false,
    points: 2,
  },
];

export const IDENTIFICA_LEVELS: IdentificaLevel[] = [
  {
    level: 1,
    taskText: 'TAREA: Seleccionar si el texto se relaciona correctamente con la imagen.',
    items: [
      { id: '1', label: 'Lápiz', emoji: '✏️', isCorrect: true },
      { id: '2', label: 'Manzana', emoji: '🍎', isCorrect: true },
      { id: '3', label: 'Casa', emoji: '📖', isCorrect: false },
      { id: '4', label: 'Libro', emoji: '🏠', isCorrect: false },
    ],
    points: 2,
  },
  {
    level: 2,
    taskText: 'TAREA: Marca los recuadros donde la palabra corresponda al objeto.',
    items: [
      { id: '1', label: 'Candado', emoji: '🔒', isCorrect: true },
      { id: '2', label: 'Batidora', emoji: '🥤', isCorrect: true },
      { id: '3', label: 'Cepillo dental', emoji: '🪥', isCorrect: true },
      { id: '4', label: 'Teléfono', emoji: '🍽️', isCorrect: false },
    ],
    points: 2,
  },
  {
    level: 3,
    taskText: 'TAREA: Identifica las frutas y objetos correctos.',
    items: [
      { id: '1', label: 'Banana', emoji: '🍌', isCorrect: true },
      { id: '2', label: 'Vaca', emoji: '🐄', isCorrect: true },
      { id: '3', label: 'Pelota', emoji: '⚽', isCorrect: true },
      { id: '4', label: 'Avión', emoji: '🚗', isCorrect: false },
    ],
    points: 2,
  },
  {
    level: 4,
    taskText: 'TAREA: Revisa con atención y selecciona los elementos correctos.',
    items: [
      { id: '1', label: 'Pájaro / Ave', emoji: '🐦', isCorrect: true },
      { id: '2', label: 'Cuchara', emoji: '🥄', isCorrect: true },
      { id: '3', label: 'Mochila', emoji: '🎒', isCorrect: true },
      { id: '4', label: 'Barco', emoji: '🍴', isCorrect: false },
    ],
    points: 2,
  },
  {
    level: 5,
    taskText: 'TAREA: Selecciona las opciones que describen bien la imagen.',
    items: [
      { id: '1', label: 'Mango', emoji: '🥭', isCorrect: true },
      { id: '2', label: 'Tenedor', emoji: '🍴', isCorrect: true },
      { id: '3', label: 'Jabón', emoji: '🧼', isCorrect: true },
      { id: '4', label: 'Zapatos', emoji: '🍽️', isCorrect: false },
    ],
    points: 2,
  },
  {
    level: 6,
    taskText: 'TAREA: Encuentra los objetos cotidianos correctos.',
    items: [
      { id: '1', label: 'Cama', emoji: '🛏️', isCorrect: true },
      { id: '2', label: 'Cepillo y Pasta', emoji: '🪥', isCorrect: true },
      { id: '3', label: 'Mesa', emoji: '🍽️', isCorrect: true },
      { id: '4', label: 'Globo aerostático', emoji: '⚽', isCorrect: false },
    ],
    points: 2,
  },
];

export const PATRONES_LEVELS: PatronesLevel[] = [
  {
    level: 1,
    items: [
      { id: '1', name: 'Manzana', emoji: '🍎' },
      { id: '2', name: 'Lápiz', emoji: '✏️' },
      { id: '3', name: 'Libro', emoji: '📖' },
    ],
    correctOrder: [0, 1, 2], // 1st Manzana, 2nd Lápiz, 3rd Libro
    options: [
      { id: 'opt1', label: '1° Lápiz → 2° Manzana → 3° Libro', isCorrect: false },
      { id: 'opt2', label: '1° Manzana → 2° Lápiz → 3° Libro', isCorrect: true },
      { id: 'opt3', label: '1° Libro → 2° Manzana → 3° Lápiz', isCorrect: false },
      { id: 'opt4', label: '1° Manzana → 2° Libro → 3° Lápiz', isCorrect: false },
    ],
    points: 5,
  },
  {
    level: 2,
    items: [
      { id: '1', name: 'Balón', emoji: '⚽' },
      { id: '2', name: 'Carro', emoji: '🚗' },
      { id: '3', name: 'Mochila', emoji: '🎒' },
    ],
    correctOrder: [1, 0, 2], // 1st Carro, 2nd Balón, 3rd Mochila
    options: [
      { id: 'opt1', label: '1° Balón → 2° Mochila → 3° Carro', isCorrect: false },
      { id: 'opt2', label: '1° Carro → 2° Balón → 3° Mochila', isCorrect: true },
      { id: 'opt3', label: '1° Mochila → 2° Carro → 3° Balón', isCorrect: false },
      { id: 'opt4', label: '1° Balón → 2° Carro → 3° Mochila', isCorrect: false },
    ],
    points: 5,
  },
  {
    level: 3,
    items: [
      { id: '1', name: 'Banana', emoji: '🍌' },
      { id: '2', name: 'Mango', emoji: '🥭' },
      { id: '3', name: 'Manzana', emoji: '🍎' },
    ],
    correctOrder: [2, 0, 1], // 1st Manzana, 2nd Banana, 3rd Mango
    options: [
      { id: 'opt1', label: '1° Manzana → 2° Banana → 3° Mango', isCorrect: true },
      { id: 'opt2', label: '1° Banana → 2° Mango → 3° Manzana', isCorrect: false },
      { id: 'opt3', label: '1° Mango → 2° Banana → 3° Manzana', isCorrect: false },
      { id: 'opt4', label: '1° Banana → 2° Manzana → 3° Mango', isCorrect: false },
    ],
    points: 5,
  },
  {
    level: 4,
    items: [
      { id: '1', name: 'Casa', emoji: '🏠' },
      { id: '2', name: 'Cama', emoji: '🛏️' },
      { id: '3', name: 'Mesa', emoji: '🍽️' },
    ],
    correctOrder: [1, 2, 0], // 1st Cama, 2nd Mesa, 3rd Casa
    options: [
      { id: 'opt1', label: '1° Casa → 2° Cama → 3° Mesa', isCorrect: false },
      { id: 'opt2', label: '1° Mesa → 2° Casa → 3° Cama', isCorrect: false },
      { id: 'opt3', label: '1° Cama → 2° Mesa → 3° Casa', isCorrect: true },
      { id: 'opt4', label: '1° Cama → 2° Casa → 3° Mesa', isCorrect: false },
    ],
    points: 5,
  },
];

export const ADIVINA_LEVELS: AdivinaLevel[] = [
  { level: 1, word: 'MESA', hint: 'Pista: Mueble con patas para comer o trabajar.', maxAttempts: 4, points: 2 },
  { level: 2, word: 'VASO', hint: 'Pista: Se utiliza comúnmente para beber agua o jugo.', maxAttempts: 4, points: 2 },
  { level: 3, word: 'SILLA', hint: 'Pista: Mueble diseñado para que una persona se siente.', maxAttempts: 4, points: 2 },
  { level: 4, word: 'CAMA', hint: 'Pista: Lugar donde dormimos y soñamos por la noche.', maxAttempts: 4, points: 2 },
  { level: 5, word: 'LIBRO', hint: 'Pista: Contiene páginas con historias y dibujos para leer.', maxAttempts: 4, points: 2 },
  { level: 6, word: 'GATO', hint: 'Pista: Animalito doméstico suave que ronronea y dice miau.', maxAttempts: 4, points: 2 },
  { level: 7, word: 'PERRO', hint: 'Pista: El fiel amigo de cuatro patas que mueve la cola y dice guau.', maxAttempts: 4, points: 2 },
  { level: 8, word: 'MANZANA', hint: 'Pista: Fruta deliciosa y crujiente de color rojo o verde.', maxAttempts: 4, points: 2 },
  { level: 9, word: 'BALON', hint: 'Pista: Esfera inflable para patear y jugar al fútbol.', maxAttempts: 4, points: 2 },
  { level: 10, word: 'CARRO', hint: 'Pista: Vehículo con volante y ruedas para pasear en familia.', maxAttempts: 4, points: 2 },
];

export const RECUERDA_LEVELS: RecuerdaLevel[] = [
  {
    level: 1,
    items: [
      { id: '1', name: 'Libro', emoji: '📖' },
      { id: '2', name: 'Cepillo', emoji: '🪥' },
      { id: '3', name: 'Cuchara', emoji: '🥄' },
      { id: '4', name: 'Plátano', emoji: '🍌' },
    ],
    targetItemIndex: 0,
    targetItemName: 'el Libro',
    previewSeconds: 5,
    points: 2,
  },
  {
    level: 2,
    items: [
      { id: '1', name: 'Carro', emoji: '🚗' },
      { id: '2', name: 'Balón', emoji: '⚽' },
      { id: '3', name: 'Manzana', emoji: '🍎' },
      { id: '4', name: 'Lápiz', emoji: '✏️' },
    ],
    targetItemIndex: 1,
    targetItemName: 'el Balón',
    previewSeconds: 5,
    points: 2,
  },
  {
    level: 3,
    items: [
      { id: '1', name: 'Cama', emoji: '🛏️' },
      { id: '2', name: 'Casa', emoji: '🏠' },
      { id: '3', name: 'Vaca', emoji: '🐄' },
      { id: '4', name: 'Batidora', emoji: '🥤' },
    ],
    targetItemIndex: 2,
    targetItemName: 'la Vaca',
    previewSeconds: 4,
    points: 2,
  },
  {
    level: 4,
    items: [
      { id: '1', name: 'Ave', emoji: '🐦' },
      { id: '2', name: 'Mochila', emoji: '🎒' },
      { id: '3', name: 'Mango', emoji: '🥭' },
      { id: '4', name: 'Candado', emoji: '🔒' },
    ],
    targetItemIndex: 3,
    targetItemName: 'el Candado',
    previewSeconds: 4,
    points: 2,
  },
  {
    level: 5,
    items: [
      { id: '1', name: 'Jabón', emoji: '🧼' },
      { id: '2', name: 'Mesa', emoji: '🍽️' },
      { id: '3', name: 'Tenedor', emoji: '🍴' },
      { id: '4', name: 'Bicicleta', emoji: '🚲' },
    ],
    targetItemIndex: 0,
    targetItemName: 'el Jabón',
    previewSeconds: 3,
    points: 2,
  },
];

export interface StroopQuestion {
  id: string;
  word: string; // Text to show, e.g. "ROJO"
  inkColorName: string; // True color of the font, e.g. "AZUL"
  inkHex: string; // Color hex or tailwind class
  options: { name: string; hex: string; isCorrect: boolean }[];
}

export interface StroopLevel {
  level: number;
  mode: 'color_de_tinta' | 'significado_palabra';
  instruction: string;
  questions: StroopQuestion[];
  points: number;
}

export interface MemoryCard {
  id: string;
  pairId: string;
  label: string;
  emoji: string;
  color: string;
}

export interface ParejasLevel {
  level: number;
  pairsCount: number;
  cards: { pairId: string; label: string; emoji: string; color: string }[];
  points: number;
}

export interface OrdenaFraseLevel {
  level: number;
  fullSentence: string;
  scrambledWords: string[];
  hint: string;
  image?: string;
  points: number;
}

export interface IntrusoItem {
  id: string;
  name: string;
  emoji: string;
  isIntruder: boolean;
}

export interface IntrusoLevel {
  level: number;
  categoryRule: string;
  explanation: string;
  items: IntrusoItem[];
  points: number;
}

export interface DigitosLevel {
  level: number;
  sequence: number[]; // e.g. [4, 7, 2]
  previewSeconds: number;
  points: number;
}

export const STROOP_LEVELS: StroopLevel[] = [
  {
    level: 1,
    mode: 'color_de_tinta',
    instruction: '¡Toca el botón con el COLOR DE LA TINTA con la que está escrita la palabra!',
    points: 3,
    questions: [
      {
        id: 'q1', word: 'AZUL', inkColorName: 'Rojo', inkHex: '#ef4444',
        options: [
          { name: 'Rojo', hex: '#ef4444', isCorrect: true },
          { name: 'Azul', hex: '#3b82f6', isCorrect: false },
          { name: 'Verde', hex: '#22c55e', isCorrect: false },
        ],
      },
      {
        id: 'q2', word: 'VERDE', inkColorName: 'Amarillo', inkHex: '#eab308',
        options: [
          { name: 'Verde', hex: '#22c55e', isCorrect: false },
          { name: 'Amarillo', hex: '#eab308', isCorrect: true },
          { name: 'Azul', hex: '#3b82f6', isCorrect: false },
        ],
      },
      {
        id: 'q3', word: 'ROJO', inkColorName: 'Azul', inkHex: '#3b82f6',
        options: [
          { name: 'Rojo', hex: '#ef4444', isCorrect: false },
          { name: 'Azul', hex: '#3b82f6', isCorrect: true },
          { name: 'Negro', hex: '#1e293b', isCorrect: false },
        ],
      },
    ],
  },
  {
    level: 2,
    mode: 'color_de_tinta',
    instruction: '¡Concéntrate! Selecciona el color de la tinta, no lo que lees.',
    points: 3,
    questions: [
      {
        id: 'q4', word: 'NEGRO', inkColorName: 'Verde', inkHex: '#22c55e',
        options: [
          { name: 'Negro', hex: '#1e293b', isCorrect: false },
          { name: 'Verde', hex: '#22c55e', isCorrect: true },
          { name: 'Rojo', hex: '#ef4444', isCorrect: false },
          { name: 'Morado', hex: '#a855f7', isCorrect: false },
        ],
      },
      {
        id: 'q5', word: 'AMARILLO', inkColorName: 'Morado', inkHex: '#a855f7',
        options: [
          { name: 'Amarillo', hex: '#eab308', isCorrect: false },
          { name: 'Morado', hex: '#a855f7', isCorrect: true },
          { name: 'Azul', hex: '#3b82f6', isCorrect: false },
          { name: 'Rojo', hex: '#ef4444', isCorrect: false },
        ],
      },
      {
        id: 'q6', word: 'ROJO', inkColorName: 'Negro', inkHex: '#1e293b',
        options: [
          { name: 'Rojo', hex: '#ef4444', isCorrect: false },
          { name: 'Verde', hex: '#22c55e', isCorrect: false },
          { name: 'Negro', hex: '#1e293b', isCorrect: true },
          { name: 'Naranja', hex: '#f97316', isCorrect: false },
        ],
      },
    ],
  },
  {
    level: 3,
    mode: 'color_de_tinta',
    instruction: '¡Mayor velocidad! Toca rápidamente el color real de la tinta.',
    points: 4,
    questions: [
      {
        id: 'q7', word: 'VERDE', inkColorName: 'Naranja', inkHex: '#f97316',
        options: [
          { name: 'Verde', hex: '#22c55e', isCorrect: false },
          { name: 'Naranja', hex: '#f97316', isCorrect: true },
          { name: 'Azul', hex: '#3b82f6', isCorrect: false },
          { name: 'Amarillo', hex: '#eab308', isCorrect: false },
        ],
      },
      {
        id: 'q8', word: 'AZUL', inkColorName: 'Rosa', inkHex: '#ec4899',
        options: [
          { name: 'Azul', hex: '#3b82f6', isCorrect: false },
          { name: 'Rosa', hex: '#ec4899', isCorrect: true },
          { name: 'Morado', hex: '#a855f7', isCorrect: false },
          { name: 'Rojo', hex: '#ef4444', isCorrect: false },
        ],
      },
      {
        id: 'q9', word: 'NARANJA', inkColorName: 'Azul', inkHex: '#3b82f6',
        options: [
          { name: 'Naranja', hex: '#f97316', isCorrect: false },
          { name: 'Azul', hex: '#3b82f6', isCorrect: true },
          { name: 'Verde', hex: '#22c55e', isCorrect: false },
          { name: 'Rosa', hex: '#ec4899', isCorrect: false },
        ],
      },
    ],
  },
];

export const PAREJAS_LEVELS: ParejasLevel[] = [
  {
    level: 1,
    pairsCount: 3,
    points: 3,
    cards: [
      { pairId: 'p1', label: 'Perro', emoji: '🐶', color: 'from-amber-400 to-orange-500' },
      { pairId: 'p2', label: 'Gato', emoji: '🐱', color: 'from-emerald-400 to-teal-500' },
      { pairId: 'p3', label: 'León', emoji: '🦁', color: 'from-yellow-400 to-amber-500' },
    ],
  },
  {
    level: 2,
    pairsCount: 4,
    points: 4,
    cards: [
      { pairId: 'p1', label: 'Manzana', emoji: '🍎', color: 'from-red-400 to-rose-500' },
      { pairId: 'p2', label: 'Plátano', emoji: '🍌', color: 'from-yellow-400 to-amber-500' },
      { pairId: 'p3', label: 'Uvas', emoji: '🍇', color: 'from-purple-400 to-indigo-500' },
      { pairId: 'p4', label: 'Fresa', emoji: '🍓', color: 'from-pink-400 to-rose-500' },
    ],
  },
  {
    level: 3,
    pairsCount: 6,
    points: 5,
    cards: [
      { pairId: 'p1', label: 'Auto', emoji: '🚗', color: 'from-blue-400 to-indigo-500' },
      { pairId: 'p2', label: 'Avión', emoji: '✈️', color: 'from-sky-400 to-cyan-500' },
      { pairId: 'p3', label: 'Barco', emoji: '⛵', color: 'from-teal-400 to-emerald-500' },
      { pairId: 'p4', label: 'Bicicleta', emoji: '🚲', color: 'from-orange-400 to-amber-500' },
      { pairId: 'p5', label: 'Tren', emoji: '🚂', color: 'from-purple-400 to-fuchsia-500' },
      { pairId: 'p6', label: 'Cohete', emoji: '🚀', color: 'from-red-400 to-rose-600' },
    ],
  },
];

export const ORDENAR_LEVELS: OrdenaFraseLevel[] = [
  {
    level: 1,
    fullSentence: 'El gato toma leche',
    scrambledWords: ['leche', 'El', 'toma', 'gato'],
    hint: 'Pista: Comienza con la mayúscula "El" y termina en "leche".',
    points: 3,
  },
  {
    level: 2,
    fullSentence: 'El perro corre en el parque',
    scrambledWords: ['parque', 'en', 'corre', 'El', 'el', 'perro'],
    hint: 'Pista: ¿Quién realiza la acción y hacia dónde va?',
    points: 3,
  },
  {
    level: 3,
    fullSentence: 'Los pájaros cantan por la mañana',
    scrambledWords: ['mañana', 'Los', 'por', 'cantan', 'la', 'pájaros'],
    hint: 'Pista: Una frase sobre el amanecer y los animales que vuelan.',
    points: 4,
  },
  {
    level: 4,
    fullSentence: 'Mi hermana lee un libro interesante',
    scrambledWords: ['interesante', 'libro', 'Mi', 'un', 'lee', 'hermana'],
    hint: 'Pista: Comienza con "Mi" y habla sobre lectura.',
    points: 4,
  },
];

export const INTRUSO_LEVELS: IntrusoLevel[] = [
  {
    level: 1,
    categoryRule: 'Todos son animales',
    explanation: 'La guitarra es un instrumento musical, no un animal.',
    points: 3,
    items: [
      { id: '1', name: 'Elefante', emoji: '🐘', isIntruder: false },
      { id: '2', name: 'Jirafa', emoji: '🦒', isIntruder: false },
      { id: '3', name: 'Guitarra', emoji: '🎸', isIntruder: true },
      { id: '4', name: 'León', emoji: '🦁', isIntruder: false },
    ],
  },
  {
    level: 2,
    categoryRule: 'Todos son medios de transporte',
    explanation: 'La manzana es una fruta comestible, no un transporte.',
    points: 3,
    items: [
      { id: '1', name: 'Avión', emoji: '✈️', isIntruder: false },
      { id: '2', name: 'Manzana', emoji: '🍎', isIntruder: true },
      { id: '3', name: 'Autobús', emoji: '🚌', isIntruder: false },
      { id: '4', name: 'Bicicleta', emoji: '🚲', isIntruder: false },
    ],
  },
  {
    level: 3,
    categoryRule: 'Todos son alimentos saludables o frutas',
    explanation: 'El martillo es una herramienta de carpintería.',
    points: 4,
    items: [
      { id: '1', name: 'Plátano', emoji: '🍌', isIntruder: false },
      { id: '2', name: 'Naranja', emoji: '🍊', isIntruder: false },
      { id: '3', name: 'Zanahoria', emoji: '🥕', isIntruder: false },
      { id: '4', name: 'Martillo', emoji: '🔨', isIntruder: true },
    ],
  },
  {
    level: 4,
    categoryRule: 'Todos vuelan en el cielo',
    explanation: 'El pez nada en el agua marina o de río.',
    points: 4,
    items: [
      { id: '1', name: 'Águila', emoji: '🦅', isIntruder: false },
      { id: '2', name: 'Pez payaso', emoji: '🐠', isIntruder: true },
      { id: '3', name: 'Mariposa', emoji: '🦋', isIntruder: false },
      { id: '4', name: 'Paloma', emoji: '🕊️', isIntruder: false },
    ],
  },
];

export const DIGITOS_LEVELS: DigitosLevel[] = [
  { level: 1, sequence: [3, 8], previewSeconds: 3, points: 3 },
  { level: 2, sequence: [5, 2, 9], previewSeconds: 4, points: 3 },
  { level: 3, sequence: [4, 7, 1], previewSeconds: 4, points: 4 },
  { level: 4, sequence: [6, 3, 8, 2], previewSeconds: 5, points: 4 },
  { level: 5, sequence: [9, 1, 5, 8], previewSeconds: 5, points: 5 },
];

/* ============================================================================
 * Niveles REALES por juego (el contenido manda: adiós al "Nivel 7/16" falso).
 * ========================================================================== */

export const LEVEL_COUNT: Record<GameType, number> = {
  frases_vof: FRASES_VOF_LEVELS.length,
  identifica: IDENTIFICA_LEVELS.length,
  patrones: PATRONES_LEVELS.length,
  adivina_palabra: ADIVINA_LEVELS.length,
  recuerda: RECUERDA_LEVELS.length,
  stroop: STROOP_LEVELS.length,
  parejas: PAREJAS_LEVELS.length,
  ordenar: ORDENAR_LEVELS.length,
  intruso: INTRUSO_LEVELS.length,
  digitos: DIGITOS_LEVELS.length,
};

export function getLevelCount(game: GameType): number {
  return LEVEL_COUNT[game];
}

/* ============================================================================
 * Ficha única de verdad por minijuego (Panel / Niveles / Gestión / App).
 * Los títulos fijados por los tests E2E se conservan intactos.
 * ========================================================================== */

const TEAL_PLANET = 'from-teal-300 via-emerald-400 to-emerald-600';
const VIOLET_PLANET = 'from-violet-300 via-purple-400 to-fuchsia-600';
const AMBER_PLANET = 'from-amber-200 via-orange-400 to-rose-500';

export const AREA_META: Record<AreaId, { label: string; tagline: string; emoji: string }> = {
  lenguaje: { label: 'Lenguaje', tagline: 'Palabras y Oraciones', emoji: '💬' },
  memoria: { label: 'Memoria', tagline: 'Visual y Operativa', emoji: '🧠' },
  atencion: { label: 'Atención', tagline: 'Foco y Control', emoji: '🎯' },
};

export const GAMES_META: Record<GameType, GameMeta> = {
  frases_vof: {
    id: 'frases_vof',
    title: 'Frases V o F',
    subtitle: 'Verdadero o Falso',
    description: 'Observa la escena espacial y decide si cada afirmación es verdadera o falsa.',
    area: 'lenguaje',
    areaLabel: 'Lenguaje y Comprensión',
    levelsTitle: 'Frases Verdaderas o Falsas',
    screen: 'juego_frases_vof',
    emoji: '🪐',
    planetGradient: TEAL_PLANET,
    planetGlow: 'shadow-teal-400/40',
  },
  identifica: {
    id: 'identifica',
    title: 'Identifica',
    subtitle: 'Asociación Palabra - Objeto',
    description: 'Relaciona palabras con objetos y evalúa si coinciden con precisión.',
    area: 'lenguaje',
    areaLabel: 'Vocabulario y Asociación',
    levelsTitle: 'Identifica',
    screen: 'juego_identifica',
    emoji: '🔍',
    planetGradient: TEAL_PLANET,
    planetGlow: 'shadow-teal-400/40',
  },
  adivina_palabra: {
    id: 'adivina_palabra',
    title: 'Adivina la Palabra',
    subtitle: 'Deducción con Pistas',
    description: 'Descubre palabras secretas ingresando letras guiado por pistas semánticas.',
    area: 'lenguaje',
    areaLabel: 'Conciencia Fonológica',
    levelsTitle: 'Adivina la Palabra',
    screen: 'juego_adivina',
    emoji: '🔤',
    planetGradient: TEAL_PLANET,
    planetGlow: 'shadow-teal-400/40',
  },
  ordenar: {
    id: 'ordenar',
    title: 'Ordena la Frase',
    subtitle: 'Sintaxis y Estructura',
    description: 'Organiza las fichas de palabras desordenadas para formar oraciones con sentido.',
    area: 'lenguaje',
    areaLabel: 'Sintaxis y Gramática',
    levelsTitle: 'Ordena la Frase',
    screen: 'juego_ordenar',
    emoji: '🧩',
    planetGradient: TEAL_PLANET,
    planetGlow: 'shadow-teal-400/40',
  },
  recuerda: {
    id: 'recuerda',
    title: 'Recuerda',
    subtitle: 'Memoria Espacial',
    description: 'Memoriza dónde estaba cada objeto en la cuadrícula antes de que se oculten.',
    area: 'memoria',
    areaLabel: 'Memoria Visual Espacial',
    levelsTitle: 'Recuerda',
    screen: 'juego_recuerda',
    emoji: '👁️',
    planetGradient: VIOLET_PLANET,
    planetGlow: 'shadow-violet-400/40',
  },
  patrones: {
    id: 'patrones',
    title: 'Patrones',
    subtitle: 'Memoria Secuencial',
    description: 'Observa atentamente el orden de desaparición de las figuras y reordénalas.',
    area: 'memoria',
    areaLabel: 'Memoria de Secuencia',
    levelsTitle: 'Patrones',
    screen: 'juego_patrones',
    emoji: '🌀',
    planetGradient: VIOLET_PLANET,
    planetGlow: 'shadow-violet-400/40',
  },
  parejas: {
    id: 'parejas',
    title: 'Parejas de Cartas',
    subtitle: 'Memory Clásico',
    description: 'Voltea las cartas de dos en dos y encuentra los pares de figuras idénticas.',
    area: 'memoria',
    areaLabel: 'Memoria a Corto Plazo',
    levelsTitle: 'Parejas de Cartas',
    screen: 'juego_parejas',
    emoji: '🃏',
    planetGradient: VIOLET_PLANET,
    planetGlow: 'shadow-violet-400/40',
  },
  digitos: {
    id: 'digitos',
    title: 'Dígitos Inversos',
    subtitle: 'Memoria de Trabajo',
    description: 'Memoriza secuencias numéricas e ingrésalas en el orden exactamente inverso.',
    area: 'memoria',
    areaLabel: 'Manipulación Operativa',
    levelsTitle: 'Dígitos Inversos',
    screen: 'juego_digitos',
    emoji: '🔢',
    planetGradient: VIOLET_PLANET,
    planetGlow: 'shadow-violet-400/40',
  },
  stroop: {
    id: 'stroop',
    title: 'Desafío de Colores',
    subtitle: 'Efecto Stroop',
    description: 'Inhibe la lectura automática y toca el color de la tinta de las letras.',
    area: 'atencion',
    areaLabel: 'Control Inhibitorio',
    levelsTitle: 'Desafío de Colores (Efecto Stroop)',
    screen: 'juego_stroop',
    emoji: '🎨',
    planetGradient: AMBER_PLANET,
    planetGlow: 'shadow-amber-400/40',
  },
  intruso: {
    id: 'intruso',
    title: 'Encuentra el Intruso',
    subtitle: 'Discriminación Visual',
    description: 'Detecta rápidamente el elemento que no comparte la categoría con los demás.',
    area: 'atencion',
    areaLabel: 'Atención Selectiva',
    levelsTitle: 'Encuentra el Intruso',
    screen: 'juego_intruso',
    emoji: '🕵️',
    planetGradient: AMBER_PLANET,
    planetGlow: 'shadow-amber-400/40',
  },
};

export const GAME_ORDER: GameType[] = [
  'frases_vof',
  'identifica',
  'adivina_palabra',
  'ordenar',
  'recuerda',
  'patrones',
  'parejas',
  'digitos',
  'stroop',
  'intruso',
];
