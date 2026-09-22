export interface FrasesVoFLevel {
  level: number;
  image1: string;
  image2?: string;
  statement1: string;
  answer1: boolean; // true = Verdadero, false = Falso
  statement2: string;
  answer2: boolean;
  points: number;
}

export interface IdentificaItem {
  id: string;
  label: string;
  image: string;
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
  items: { id: string; name: string; image: string }[];
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
  items: { id: string; name: string; image: string }[];
  targetItemIndex: number;
  targetItemName: string;
  previewSeconds: number;
  points: number;
}

export const FRASES_VOF_LEVELS: FrasesVoFLevel[] = [
  {
    level: 1,
    image1: '/assets/perro1_1nivel.jpg',
    image2: '/assets/gato1_1nivel.jpg',
    statement1: 'Las orejas del perro son de color negro',
    answer1: true,
    statement2: 'Se pueden ver 5 animales en la pantalla',
    answer2: false,
    points: 2,
  },
  {
    level: 2,
    image1: '/assets/perro1_1nivel.jpg',
    image2: '/assets/carro1_2nivel.jpg',
    statement1: 'El perro es de color blanco y tiene la nariz de color negro',
    answer1: true,
    statement2: 'El color del carro es amarillo y se observan dos carros',
    answer2: false,
    points: 2,
  },
  {
    level: 3,
    image1: '/assets/arbol1_3nivel.jpg',
    image2: '/assets/carro2_nivel3.jpg',
    statement1: 'El tronco del árbol es de color verde y las hojas son marrones',
    answer1: false,
    statement2: 'En el dibujo se muestra una casa y un carro azul',
    answer2: false,
    points: 2,
  },
  {
    level: 4,
    image1: '/assets/kid_4nivel.jpg',
    statement1: 'El niño tiene puesto un suéter de rayas',
    answer1: true,
    statement2: 'Hay juguetes y bloques de colores en el suelo',
    answer2: true,
    points: 2,
  },
  {
    level: 5,
    image1: '/assets/frutas_nivel5.webp',
    statement1: 'Se observan frutas como plátano, manzana y uvas',
    answer1: true,
    statement2: 'Todas las frutas de la canasta son de color azul',
    answer2: false,
    points: 2,
  },
  {
    level: 6,
    image1: '/assets/kids_nivel6.jpg',
    statement1: 'Los niños están caminando sobre la arena en una playa',
    answer1: false,
    statement2: 'En el semáforo se muestran los colores rojo, blanco y negro',
    answer2: false,
    points: 2,
  },
  {
    level: 7,
    image1: '/assets/animales_nivel7.jpg',
    statement1: 'En el barco se observan varios animales como el elefante y la jirafa',
    answer1: true,
    statement2: 'El barco tiene 3 ventanas de forma circular',
    answer2: true,
    points: 2,
  },
  {
    level: 8,
    image1: '/assets/cama_nivel10.webp',
    statement1: 'La cama tiene sábanas y almohadas ordenadas',
    answer1: true,
    statement2: 'Hay 4 pizarras escolares en la habitación',
    answer2: false,
    points: 2,
  },
  {
    level: 9,
    image1: '/assets/bicicleta_nivel16.webp',
    statement1: 'La bicicleta tiene dos ruedas y un manillar',
    answer1: true,
    statement2: 'La bicicleta funciona con un motor de avión',
    answer2: false,
    points: 2,
  },
  {
    level: 10,
    image1: '/assets/carro.png',
    image2: '/assets/balon.png',
    statement1: 'El balón tiene forma redonda para rodar y rebotar',
    answer1: true,
    statement2: 'El carro tiene ruedas cuadradas de madera',
    answer2: false,
    points: 2,
  }
];

export const IDENTIFICA_LEVELS: IdentificaLevel[] = [
  {
    level: 1,
    taskText: 'TAREA: Seleccionar si el texto se relaciona correctamente con la imagen.',
    items: [
      { id: '1', label: 'Lápiz', image: '/assets/lapiz_identifica.png', isCorrect: true },
      { id: '2', label: 'Manzana', image: '/assets/manzana_identifica.png', isCorrect: true },
      { id: '3', label: 'Casa', image: '/assets/libro_identifica.png', isCorrect: false },
      { id: '4', label: 'Libro', image: '/assets/casa_identifica.png', isCorrect: false },
    ],
    points: 2,
  },
  {
    level: 2,
    taskText: 'TAREA: Marca los recuadros donde la palabra corresponda al objeto.',
    items: [
      { id: '1', label: 'Candado', image: '/assets/candado_identifica_nivel2.png', isCorrect: true },
      { id: '2', label: 'Batidora', image: '/assets/batidora_identifica_nivel2.png', isCorrect: true },
      { id: '3', label: 'Cepillo dental', image: '/assets/cepillo_identifica_nivel2.png', isCorrect: true },
      { id: '4', label: 'Teléfono', image: '/assets/mesa.png', isCorrect: false },
    ],
    points: 2,
  },
  {
    level: 3,
    taskText: 'TAREA: Identifica las frutas y objetos correctos.',
    items: [
      { id: '1', label: 'Banana', image: '/assets/banana_identifica_nivel3.png', isCorrect: true },
      { id: '2', label: 'Vaca', image: '/assets/vaca.png', isCorrect: true },
      { id: '3', label: 'Pelota', image: '/assets/balon.png', isCorrect: true },
      { id: '4', label: 'Avión', image: '/assets/carro.png', isCorrect: false },
    ],
    points: 2,
  },
  {
    level: 4,
    taskText: 'TAREA: Revisa con atención y selecciona los elementos correctos.',
    items: [
      { id: '1', label: 'Pájaro / Ave', image: '/assets/ave_identifica_nivel4.png', isCorrect: true },
      { id: '2', label: 'Cuchara', image: '/assets/cuchara.png', isCorrect: true },
      { id: '3', label: 'Mochila', image: '/assets/mochila.png', isCorrect: true },
      { id: '4', label: 'Barco', image: '/assets/tenedor.png', isCorrect: false },
    ],
    points: 2,
  },
  {
    level: 5,
    taskText: 'TAREA: Selecciona las opciones que describen bien la imagen.',
    items: [
      { id: '1', label: 'Mango', image: '/assets/mango.png', isCorrect: true },
      { id: '2', label: 'Tenedor', image: '/assets/tenedor.png', isCorrect: true },
      { id: '3', label: 'Jabón', image: '/assets/jabon.png', isCorrect: true },
      { id: '4', label: 'Zapatos', image: '/assets/mesa.png', isCorrect: false },
    ],
    points: 2,
  },
  {
    level: 6,
    taskText: 'TAREA: Encuentra los objetos cotidianos correctos.',
    items: [
      { id: '1', label: 'Cama', image: '/assets/cama.png', isCorrect: true },
      { id: '2', label: 'Cepillo y Pasta', image: '/assets/cepilloypasta.png', isCorrect: true },
      { id: '3', label: 'Mesa', image: '/assets/mesa.png', isCorrect: true },
      { id: '4', label: 'Globo aerostático', image: '/assets/balon.png', isCorrect: false },
    ],
    points: 2,
  }
];

export const PATRONES_LEVELS: PatronesLevel[] = [
  {
    level: 1,
    items: [
      { id: '1', name: 'Manzana', image: '/assets/manzana_identifica.png' },
      { id: '2', name: 'Lápiz', image: '/assets/lapiz_identifica.png' },
      { id: '3', name: 'Libro', image: '/assets/libro_identifica.png' },
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
      { id: '1', name: 'Balón', image: '/assets/balon.png' },
      { id: '2', name: 'Carro', image: '/assets/carro.png' },
      { id: '3', name: 'Mochila', image: '/assets/mochila.png' },
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
      { id: '1', name: 'Banana', image: '/assets/banana_identifica_nivel3.png' },
      { id: '2', name: 'Mango', image: '/assets/mango.png' },
      { id: '3', name: 'Manzana', image: '/assets/manzana_identifica.png' },
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
      { id: '1', name: 'Casa', image: '/assets/casa_identifica.png' },
      { id: '2', name: 'Cama', image: '/assets/cama.png' },
      { id: '3', name: 'Mesa', image: '/assets/mesa.png' },
    ],
    correctOrder: [1, 2, 0], // 1st Cama, 2nd Mesa, 3rd Casa
    options: [
      { id: 'opt1', label: '1° Casa → 2° Cama → 3° Mesa', isCorrect: false },
      { id: 'opt2', label: '1° Mesa → 2° Casa → 3° Cama', isCorrect: false },
      { id: 'opt3', label: '1° Cama → 2° Mesa → 3° Casa', isCorrect: true },
      { id: 'opt4', label: '1° Cama → 2° Casa → 3° Mesa', isCorrect: false },
    ],
    points: 5,
  }
];

export const ADIVINA_LEVELS: AdivinaLevel[] = [
  {
    level: 1,
    word: 'MESA',
    hint: 'Pista: Mueble con patas para comer o trabajar.',
    maxAttempts: 4,
    points: 2,
  },
  {
    level: 2,
    word: 'VASO',
    hint: 'Pista: Se utiliza comúnmente para beber agua o jugo.',
    maxAttempts: 4,
    points: 2,
  },
  {
    level: 3,
    word: 'SILLA',
    hint: 'Pista: Mueble diseñado para que una persona se siente.',
    maxAttempts: 4,
    points: 2,
  },
  {
    level: 4,
    word: 'CAMA',
    hint: 'Pista: Lugar donde dormimos y soñamos por la noche.',
    maxAttempts: 4,
    points: 2,
  },
  {
    level: 5,
    word: 'LIBRO',
    hint: 'Pista: Contiene páginas con historias y dibujos para leer.',
    maxAttempts: 4,
    points: 2,
  },
  {
    level: 6,
    word: 'GATO',
    hint: 'Pista: Animalito doméstico suave que ronronea y dice miau.',
    maxAttempts: 4,
    points: 2,
  },
  {
    level: 7,
    word: 'PERRO',
    hint: 'Pista: El fiel amigo de cuatro patas que mueve la cola y dice guau.',
    maxAttempts: 4,
    points: 2,
  },
  {
    level: 8,
    word: 'MANZANA',
    hint: 'Pista: Fruta deliciosa y crujiente de color rojo o verde.',
    maxAttempts: 4,
    points: 2,
  },
  {
    level: 9,
    word: 'BALON',
    hint: 'Pista: Esfera inflable para patear y jugar al fútbol.',
    maxAttempts: 4,
    points: 2,
  },
  {
    level: 10,
    word: 'CARRO',
    hint: 'Pista: Vehículo con volante y ruedas para pasear en familia.',
    maxAttempts: 4,
    points: 2,
  }
];

export const RECUERDA_LEVELS: RecuerdaLevel[] = [
  {
    level: 1,
    items: [
      { id: '1', name: 'Libro', image: '/assets/libro_identifica.png' },
      { id: '2', name: 'Cepillo', image: '/assets/cepillo_identifica_nivel2.png' },
      { id: '3', name: 'Cuchara', image: '/assets/cuchara.png' },
      { id: '4', name: 'Plátano', image: '/assets/banana_identifica_nivel3.png' },
    ],
    targetItemIndex: 0,
    targetItemName: 'el Libro',
    previewSeconds: 5,
    points: 2,
  },
  {
    level: 2,
    items: [
      { id: '1', name: 'Carro', image: '/assets/carro.png' },
      { id: '2', name: 'Balón', image: '/assets/balon.png' },
      { id: '3', name: 'Manzana', image: '/assets/manzana_identifica.png' },
      { id: '4', name: 'Lápiz', image: '/assets/lapiz_identifica.png' },
    ],
    targetItemIndex: 1,
    targetItemName: 'el Balón',
    previewSeconds: 5,
    points: 2,
  },
  {
    level: 3,
    items: [
      { id: '1', name: 'Cama', image: '/assets/cama.png' },
      { id: '2', name: 'Casa', image: '/assets/casa_identifica.png' },
      { id: '3', name: 'Vaca', image: '/assets/vaca.png' },
      { id: '4', name: 'Batidora', image: '/assets/batidora_identifica_nivel2.png' },
    ],
    targetItemIndex: 2,
    targetItemName: 'la Vaca',
    previewSeconds: 4,
    points: 2,
  },
  {
    level: 4,
    items: [
      { id: '1', name: 'Ave', image: '/assets/ave_identifica_nivel4.png' },
      { id: '2', name: 'Mochila', image: '/assets/mochila.png' },
      { id: '3', name: 'Mango', image: '/assets/mango.png' },
      { id: '4', name: 'Candado', image: '/assets/candado_identifica_nivel2.png' },
    ],
    targetItemIndex: 3,
    targetItemName: 'el Candado',
    previewSeconds: 4,
    points: 2,
  },
  {
    level: 5,
    items: [
      { id: '1', name: 'Jabón', image: '/assets/jabon.png' },
      { id: '2', name: 'Mesa', image: '/assets/mesa.png' },
      { id: '3', name: 'Tenedor', image: '/assets/tenedor.png' },
      { id: '4', name: 'Bicicleta', image: '/assets/bicicleta_nivel16.webp' },
    ],
    targetItemIndex: 0,
    targetItemName: 'el Jabón',
    previewSeconds: 3,
    points: 2,
  }
];

export const TOTAL_LEVELS_COUNT = 16;
