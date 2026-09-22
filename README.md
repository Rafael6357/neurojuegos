# NeuroJuegos 🧠✨

**NeuroJuegos** es una aplicación multiplataforma (Web & Android) de estimulación cognitiva infantil diseñada para niños de 0 a 6 años. A través de 10 minijuegos interactivos y adaptativos, fortalece las habilidades esenciales de **Lenguaje**, **Memoria** y **Atención / Control Ejecutivo**.

Desarrollada bajo el enfoque **Spec-Driven Development (SDD)**, con arquitectura offline-first, motor de audio sintetizado y suite de pruebas E2E automatizadas.

---

## 🎮 Catálogo de Minijuegos (10 Minijuegos)

### 🗣️ Área de Lenguaje y Lectoescritura
1. **Frases V o F** (`frases_vof`): Comprensión lectora e inferencia visual identificando afirmaciones verdaderas o falsas sobre una imagen.
2. **Adivina la Palabra** (`adivina`): Descubrimiento fonético y de vocabulario mediante pistas gráficas y teclado adaptado para niños.
3. **Identifica la Imagen** (`identifica`): Asociación palabra-objeto discriminando entre opciones visuales.
4. **Ordena la Frase** (`ordena_frase`): Conciencia sintáctica y estructuración gramatical arrastrando y organizando palabras.

### 🧩 Área de Memoria y Trabajo Operativo
5. **Recuerda la Cuadrícula** (`recuerda`): Memoria visual-espacial recordando la ubicación de objetos antes de voltearse.
6. **Patrones Secuenciales** (`patrones`): Memoria secuencial observando y reproduciendo órdenes de aparición/desaparición.
7. **Parejas de Cartas** (`parejas`): Memory clásico a corto plazo volteando pares de figuras idénticas.
8. **Dígitos Inversos** (`digitos`): Memoria de trabajo operativa ingresando secuencias numéricas en orden exactamente inverso.

### ⚡ Área de Atención y Control Ejecutivo
9. **Desafío de Colores / Efecto Stroop** (`stroop`): Inhibición cognitiva y flexibilidad mental seleccionando el color de la tinta ignorando el texto.
10. **Encuentra el Intruso** (`intruso`): Atención selectiva y categorización semántica identificando el elemento anómalo.

---

## 🏗️ Arquitectura y Tecnologías

* **Frontend**: React 18 + TypeScript + Vite.
* **Estilos**: Tailwind CSS con sistema de diseño ergonómico infantil.
* **Audio**: Síntesis procedural en tiempo real mediante **Web Audio API** (sin dependencias de archivos MP3/WAV pesados ni latencia).
* **Persistencia**: LocalStorage estructurado con versionado de esquema, perfiles de múltiples jugadores y ranking local.
* **Móvil / APK**: **Capacitor** (`@capacitor/android`) para compilación nativa en Android.
* **Testing**: Vitest + Testing Library con suite completa de pruebas E2E.

---

## 📂 Estructura del Proyecto

```text
/
├── src/                          # Código fuente TypeScript + React
│   ├── components/               # Componentes UI (Header, Modales, Botones)
│   │   └── screens/              # 10 Pantallas de Minijuegos + Inicio + Ajustes
│   ├── services/                 # Servicios (Almacenamiento Local, Perfiles)
│   ├── utils/                    # Motor de Sonido Web Audio API (sound.ts)
│   ├── types.ts                  # Definiciones e interfaces TypeScript
│   ├── App.tsx                   # Enrutador de pantallas y estado global
│   └── main.tsx                  # Punto de entrada de la aplicación
├── public/                       # Recursos estáticos (imágenes de juegos, iconos)
├── tests/                        # Pruebas automatizadas E2E con Vitest
│   ├── setup.ts                  # Mocks de Web Audio API y entorno JSDOM
│   └── e2e/                      # Especificaciones de flujos de usuario
├── android/                      # Proyecto nativo Android generado por Capacitor
├── README.md                     # Documentación general del proyecto
├── ARCHITECTURE.md               # Especificación de arquitectura y diseño técnico
├── DESIGN.md                     # Design System y ergonomía infantil
├── AGENTS.md                     # Directrices para agentes y colaboradores
├── capacitor.config.ts           # Configuración del paquete y scheme de Capacitor
├── vite.config.ts                # Configuración de compilación Vite
└── package.json                  # Scripts y dependencias del proyecto
```

---

## 🚀 Instalación y Ejecución

### 1. Clonar e instalar dependencias
```bash
npm install
```

### 2. Modo Desarrollo (Web)
```bash
npm run dev
```
La aplicación se iniciará en `http://localhost:3000`.

### 3. Ejecución de Pruebas Automatizadas (E2E)
```bash
npm test
```

### 4. Compilación de Producción
```bash
npm run build
```

### 5. Sincronización y Compilación Android (Capacitor)
```bash
npm run build
npx cap sync android
```
Para abrir el proyecto en Android Studio:
```bash
npx cap open android
```
O para compilar directamente el APK desde terminal:
```bash
cd android && ./gradlew assembleDebug
```
El archivo APK generado se ubicará en:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🔒 Privacidad y Seguridad

* **100% Offline-First**: No requiere conexión a internet para funcionar.
* **Zero Tracking**: Sin analíticas invasivas ni recolección de datos personales de menores.
* **Sin Publicidad**: Entorno seguro y protegido para la primera infancia.

---

## 📄 Licencia

Desarrollado para fines académicos, terapéuticos y educativos.
