# PRD — NeuroJuegos 🧠✨
**Producto:** NeuroJuegos — Estimulación Cognitiva Infantil
**Versión:** 1.0.0
**Fecha:** 23/09/2026
**Plataformas:** Web + Android (Capacitor)
**Repositorio raíz:** `D:\SALVA NO BORRAR NEUROJUEGOS`
**Fuentes verificadas:** `README.md`, `ARCHITECTURE.md`, `DESIGN.md`, `AGENTS.md`, `package.json`, `capacitor.config.ts`, `src/App.tsx`, `src/types.ts`, `src/data/gamesData.ts`, `src/services/storage.ts`, `src/utils/sound.ts`, `src/components/screens/*`, `tests/e2e/*`

---

## 1. Resumen Ejecutivo

**NeuroJuegos** es una aplicación multiplataforma (Web & Android) de estimulación cognitiva infantil diseñada para niños de 0 a 6 años (código permite 1–12 años). A través de **10 minijuegos interactivos y adaptativos**, fortalece **Lenguaje, Memoria y Atención / Control Ejecutivo**.

Desarrollada bajo **Spec-Driven Development (SDD)**, arquitectura **offline-first**, motor de audio sintetizado con **Web Audio API** (sin MP3/WAV) y suite E2E automatizada con **Vitest + Testing Library**.

**Propuesta de valor:** intervención lúdica segura, sin internet, sin publicidad, sin tracking, con refuerzo positivo no punitivo, ergonomía para motricidad fina y música adaptativa por área cognitiva.

---

## 2. Objetivos

### 2.1 Objetivo General
Plataforma interactiva especializada en el neurodesarrollo del lenguaje, la memoria operativa y el control atencional en ambiente seguro y alegre.

### 2.2 Objetivos Específicos
1. Comprensión verbal e inferencia visual (Frases V/F, Identifica).
2. Conciencia fonológica, vocabulario y sintaxis (Adivina, Ordena).
3. Memoria visual-espacial, secuencial, a corto plazo y de trabajo operativa (Recuerda, Patrones, Parejas, Dígitos).
4. Inhibición cognitiva, flexibilidad mental y atención selectiva (Stroop, Intruso).
5. Operar 100% offline en Web y APK Android incluso en gama baja.
6. Soportar múltiples perfiles locales con progresión, desbloqueo y ranking.

---

## 3. Alcance

### In-Scope
- 17 tipos de pantalla (`ScreenType` en `src/types.ts:43-60`): `inicio, gestion_jugadores, panel_minijuegos, niveles, juego_frases_vof, juego_identifica, juego_patrones, juego_adivina, juego_recuerda, juego_stroop, juego_parejas, juego_ordenar, juego_intruso, juego_digitos, victoria, ajustes, ranking`.
- Componentes globales: `HeaderBar, RankingModal, VictoriaModal, WalkingDonutLoader`.
- 54 niveles reales de contenido autocontenido (emoji + texto).
- Persistencia `localStorage` versionada + perfiles + ranking.
- Audio sintetizado + música por área.
- Sincronización Capacitor a `android/`.
- Tests E2E: `player-flow, gameplay-flow, ranking-flow, audio-settings`.

### Out-of-Scope
- Backend, cuentas cloud, analíticas, publicidad, multiplayer online, compras integradas.
- Llamadas `fetch` externas para recursos o sonidos (prohibido por `AGENTS.md`).
- Carga de `.mp3/.wav` locales (prohibido; usar `src/utils/sound.ts`).

---

## 4. Usuarios y Personas

| Persona | Descripción | Necesidades clave |
|---|---|---|
| Niño 0–6 (usuario primario, prelector) | Motricidad fina en desarrollo, lector incipiente | Targets 48–64px, icono+texto, feedback sonoro inmediato, sin castigo, confeti |
| Padre / Educador / Terapeuta | Acompaña y supervisa | Crear/cambiar perfiles, ver ranking/puntos, ajustar volumen, resetear demo, leer Acerca De |
| Desarrollador / Agente IA | Mantiene el repo bajo SDD | Tipos estrictos, `id` DOM estables, `npm test` + `npm run build` en verde |

---

## 5. Stack y Configuración Verificada

**`package.json`:**
- `react ^18.3.1, react-dom ^18.3.1, vite ^6.0.0, typescript ^5.5.3`
- `@capacitor/android, @capacitor/cli, @capacitor/core ^8.5.2`
- `canvas-confetti ^1.9.4, lucide-react ^1.16.0, motion ^12.4.3, clsx, tailwind-merge`
- `tailwindcss ^4.0.0, @tailwindcss/vite ^4.0.0, vitest ^5.0.1, jsdom, @testing-library/react`

**Scripts:**
`dev: vite --host 0.0.0.0 --port 3000` | `build: tsc && vite build` | `lint: tsc --noEmit` | `test: vitest run` | `cap:sync, cap:build`

**`capacitor.config.ts`:**
`appId: com.example.neurojuegos`, `appName: NeuroJuegos`, `webDir: dist`, `server.androidScheme: https`

**`index.html`:** `lang=es`, fuentes `Fredoka + Nunito` (Google Fonts), icono `/assets/icon_neurojuegos-playstore.png`.

---

## 6. Arquitectura del Sistema

Ver `ARCHITECTURE.md` + `src/App.tsx`.

```text
Vistas React (Inicio, Panel, Gestión, Ajustes, Niveles, 10 Juegos)
  -> App.tsx State Machine + RankingModal + VictoriaModal
  -> Storage Service (src/services/storage.ts) + Sound Engine (src/utils/sound.ts)
  -> Window.localStorage + Hardware Audio Output
  -> Capacitor bridge -> android/app/src/main/assets/public
```

Principios:
1. **SDD:** comportamiento regido por specs verificables en E2E.
2. **Offline-First absoluto:** lógica, audio, niveles y persistencia locales.
3. **Desacoplamiento:** pantallas no tocan `localStorage` crudo; audio encapsulado; `android/` aislado.

---

## 7. Modelo de Datos

### 7.1 `Player` (`src/types.ts:1-27`, `src/services/storage.ts:62-86`)
```typescript
id, nombre, edad, avatarColor, createdAt
puntuacionFrasesVoF, puntuacionIdentifica, puntuacionPatrones,
puntuacionCadenaNum, puntuacionMemo,
puntuacionStroop?, puntuacionParejas?, puntuacionOrdenar?,
puntuacionIntruso?, puntuacionDigitos?
nivelFrasesVoF, nivelIdentifica, nivelPatrones, nivelAdivina, nivelRecuerda,
nivelStroop?, nivelParejas?, nivelOrdenar?, nivelIntruso?, nivelDigitos?
```

Mapeo único `SCORE_FIELD` y `LEVEL_FIELD: Record<GameType, keyof Player>` elimina switches gigantes.

### 7.2 Tipos núcleo
`GameType = frases_vof | identifica | patrones | adivina_palabra | recuerda | stroop | parejas | ordenar | intruso | digitos`
`CognitiveArea = todos | lenguaje | memoria | atencion`
`AreaId = lenguaje | memoria | atencion`
`GameMeta = {id, title, subtitle, description, area, areaLabel, levelsTitle, screen, emoji, planetGradient, planetGlow}`
`FeedbackState = {text, kind: info|success|error}`
`AudioSettings = {soundEnabled, musicEnabled}` + volúmenes SFX/BGM 0–1.

### 7.3 Persistencia (`src/services/storage.ts`)
Keys: `neurojuegos_players_v1`, `neurojuegos_active_player_v1`, `neurojuegos_sound_enabled`, `neurojuegos_music_enabled`, `neurojuegos_sfx_volume`, `neurojuegos_music_volume`.
APIs: `getPlayers/savePlayers, getActivePlayerId/setActivePlayerId/getActivePlayer, createPlayer(nombre,edad clamp 1–12), getGameScore/getGameLevel/getTotalScore(sum 10 scores), updatePlayerScoreAndLevel(playerId,game,points,completedLevel), resetAllData`.
Seed por defecto: Mateo 5a, Sofía 6a, Lucas 4a.
Desbloqueo: `nextLevel = min(completed+1, getLevelCount(game))`.

---

## 8. Catálogo de Juegos — Ficha Única de Verdad

`GAMES_META: Record<GameType, GameMeta>` + `GAME_ORDER` + `AREA_META` en `src/data/gamesData.ts:694-844`.

| # | Juego | ID | Área | Pantalla | Emoji-planeta | Descripción funcional |
|---|---|---|---|---|---|---|
| 1 | Frases V o F | `frases_vof` | lenguaje | `juego_frases_vof` | 🪐 teal | Observa escena emoji y decide V/F de 2 afirmaciones |
| 2 | Identifica | `identifica` | lenguaje | `juego_identifica` | 🔍 teal | Asociación palabra-objeto, marca si coincide |
| 3 | Adivina la Palabra | `adivina_palabra` | lenguaje | `juego_adivina` | 🔤 teal | Deducción con pistas + teclado adaptado |
| 4 | Ordena la Frase | `ordenar` | lenguaje | `juego_ordenar` | 🧩 teal | Ordena fichas desordenadas en oración |
| 5 | Recuerda | `recuerda` | memoria | `juego_recuerda` | 👁️ violet | Memoria espacial en cuadrícula antes de ocultar |
| 6 | Patrones | `patrones` | memoria | `juego_patrones` | 🌀 violet | Reproduce orden de desaparición |
| 7 | Parejas de Cartas | `parejas` | memoria | `juego_parejas` | 🃏 violet | Memory clásico por pares |
| 8 | Dígitos Inversos | `digitos` | memoria | `juego_digitos` | 🔢 violet | Ingresa secuencia numérica en orden inverso |
| 9 | Desafío de Colores (Stroop) | `stroop` | atencion | `juego_stroop` | 🎨 amber | Inhibe lectura, toca color de tinta |
| 10 | Encuentra el Intruso | `intruso` | atencion | `juego_intruso` | 🕵️ amber | Detecta elemento de distinta categoría |

### Contenido y niveles reales (`LEVEL_COUNT`)
| Juego | N | Detalle puntos / contenido |
|---|---|---|
| Frases V/F | 10 | 2 pts/nivel. Escenas ej. 🐶🦴🐱🐟, 🚗🛞🚦, 🌳🍎🐦. Cada nivel `statement1 true + statement2 false` |
| Identifica | 6 | 2 pts. 4 items/nivel `{label,emoji,isCorrect}` ej. L1 Lápiz✏️ true, Casa📖 false |
| Patrones | 4 | 5 pts. 3 items + `correctOrder` + 4 opciones texto `1°...→2°...→3°...` |
| Adivina | 10 | 2 pts, `maxAttempts 4`. MESA, VASO, SILLA, CAMA, LIBRO, GATO, PERRO, MANZANA, BALON, CARRO + hint |
| Recuerda | 5 | 2 pts, `preview 5,5,4,4,3s`. 4 items + `targetItemIndex/Name` |
| Stroop | 3 | 3,3,4 pts. `mode color_de_tinta`, 3 questions/nivel `{word, inkColorName, inkHex, options}` |
| Parejas | 3 | 3,4,5 pts. 3 pares animales, 4 pares frutas, 6 pares vehículos `{pairId,label,emoji,color}` |
| Ordena | 4 | 3,3,4,4 pts. `fullSentence, scrambledWords, hint` ej. `El gato toma leche` |
| Intruso | 4 | 3,3,4,4 pts. `categoryRule, explanation, 4 items (1 isIntruder)` ej. animales+Guitarra |
| Dígitos | 5 | 3,3,4,4,5 pts. `[3,8]3s, [5,2,9]4s, [4,7,1]4s, [6,3,8,2]5s, [9,1,5,8]5s` |
| **Total** | **54** |  |

---

## 9. Requisitos Funcionales por Pantalla

### RF-01 App Shell / Navegación (`src/App.tsx:30-227,278-452`)
- Estado: `players, activePlayer, currentScreen, selectedGame, currentLevel, rankingOpen, appLoading(!isTest), gameLoading, victoryState{isOpen,levelNumber,pointsEarned}`.
- `refreshPlayers()` al montar.
- Efecto música por pantalla: juegos lenguaje→`lenguaje`, memoria→`memoria`, atención→`atencion`, resto→`menu`; `ajustes` no sobreescribe preview.
- `handleSelectGame(game)` → `niveles`. `handleSelectLevel(n)` mapea `GameType→ScreenType + gameLoadingTitle` y muestra loader 900ms (no en test).
- `handleWin(points)` mapea a `gameKey FrasesVoF|Identifica|...`, llama `updatePlayerScoreAndLevel`, abre victoria.
- `handleNextLevel/RepeatLevel/ReturnToLevels` con límite `TOTAL_LEVELS_COUNT`.
- `getHeaderTitle()` por pantalla. Layout `min-h-screen bg-slate-900 flex flex-col select-none`.
- Loaders `WalkingDonutLoader` boot 1300ms + juego 900ms.

### RF-02 Inicio (`InicioScreen.tsx`)
- Hero `hero_neurojuegos.jpg`, badge `Estimulación de 0 a 6 años`, H1 `Estimulación Cognitiva Infantil`.
- Card `inicio_player_card`: inicial avatar, nombre(edad), puntos `getTotalScore()`, badge `#1` si líder.
- CTA `btn_inicio_jugar` `JUGAR / MINIJUEGOS`: sin player→gestión, con player→panel.
- 3 áreas (4/4/2 minijuegos) con `category_*.jpg` → panel.
- Secundarios `btn_inicio_gestion_jugadores`, `btn_inicio_ranking`, `btn_inicio_ajustes`. Footer neurodesarrollo.

### RF-03 Gestión Jugadores (`GestionJugadoresScreen.tsx`)
- Listar, crear (`input_player_name` + edad), seleccionar (`btn_select_player_<id>`), activar automáticamente al crear.
- Validación trim + clamp edad. Avatar rotativo 6 gradientes.

### RF-04 Panel (`PanelMinijuegosScreen.tsx`)
- Título `Panel de Estimulación Cognitiva`.
- 10 tarjetas `game_card_<id>` desde `GAME_ORDER+GAMES_META`.
- Filtros `todos/lenguaje/memoria/atencion`.
- Play `btn_play_<id>` → niveles.

### RF-05 Niveles (`NivelesScreen.tsx`)
- Título `levelsTitle` por juego.
- Botones `btn_level_<n>` 1..`getLevelCount(game)`; bloqueo `n > getGameLevel(player,game)`.

### RF-06–RF-15 Juegos
- Props comunes `{levelNumber, onWin, onReturnToLevels}`.
- IDs estables: `btn_s1_true/false, btn_s2_true/false, btn_verificar_frases_vof`, etc. (ver specs y `AGENTS.md`).
- Acierto → `playCorrect()/playVictory()` + `onWin(points)`; fallo → `playError()` suave + reintento.
- `playFlip/playCardSelect/playCountdownTick` donde aplique.

### RF-16 Victoria (`VictoriaModal.tsx`)
- Muestra `¡VICTORIA!`, nivel, puntos. Botones Siguiente/Repetir/Volver. Confeti + fanfarria. `hasNextLevel = level < TOTAL_LEVELS_COUNT`.

### RF-17 Ranking (`RankingModal.tsx`)
- Orden `getTotalScore()` desc, `nombre + pts`, highlight activo, cerrar `Aceptar`. Apertura desde Header (`Ranking de Jugadores`), Inicio y Ajustes (`btn_open_ranking_from_ajustes`).

### RF-18 Ajustes (`AjustesScreen.tsx`)
- SFX `btn_toggle_sound_setting ACTIVADO/DESACTIVADO` + slider + `Probar Sonido`.
- BGM `btn_toggle_music_setting ACTIVADA/DESACTIVADA` + slider + preview `menu/lenguaje/memoria/atencion`.
- Atajo ranking, modal Acerca De (autor Rafael Nicolas Espinosa Rodríguez, beneficios), reset `btn_request_reset_data → btn_confirm_reset_yes/no` (borra keys + reload), volver `btn_ajustes_back_inicio`.

---

## 10. Requisitos No Funcionales

- **RNF-01 Offline:** cero `fetch`, cero MP3/WAV, contenido emoji+texto. `webDir dist`.
- **RNF-02 Audio (`sound.ts:1-461`):** `AudioContext` lazy + resume, masters `sfxGain/musicGain`, SFX 7 funciones (sine 600→400Hz click, arpegio C5-E5-G5-C6 acierto, fanfarria victoria, sawtooth 220→150Hz error, etc.), BGM 5 patrones 16 pasos melodía+bajo (`menu 320ms, lenguaje 290ms, memoria 350ms, atencion 260ms, juego 300ms`) con `triangle` melodía + `sine` bajo.
- **RNF-03 Performance:** Vite bundle, CSS starfield sin JS, `touch-action manipulation`, animaciones `twinkle/floaty/pop-in/wiggle/orbit/drift/glow-pulse`.
- **RNF-04 Ergonomía/Accesibilidad:** targets 48–64px, gaps 12–16px, `rounded-2xl/3xl`, `border-b-4/6` 3D, `active:scale-95` + click, Lucide icono+texto, contraste AAA >7:1, error no punitivo, `prefers-reduced-motion`, `focus-visible` ámbar.
- **RNF-05 Privacidad:** 100% local, zero tracking, sin ads. Única red: Google Fonts.
- **RNF-06 Código:** TS estricto, tipos en `types.ts`, sin `any`, funcionales+hooks, solo Tailwind, `id` semánticos obligatorios.
- **RNF-07 Móvil:** `androidScheme https`, flujo `npm run build && npx cap sync android && gradlew assembleDebug → app-debug.apk`.
- **RNF-08 Calidad:** `npm test` 100% + `npm run build` sin errores/tipos.

---

## 11. Diseño UX/UI

- **Tipografías:** Fredoka (títulos/botones), Nunito (instrucciones).
- **Paleta base:** Amber50/Orange50 `#FFFBEB/#FFF7ED`, Amber500/600, Amber950/Slate800 texto.
- **Semántica:** Lenguaje Emerald500/600, Memoria Purple500/Indigo600, Atención Rose500/Red600. Implementación actual: Teal/Emerald planetas lenguaje, Violet/Fuchsia memoria, Amber/Orange/Rose atención + fondo cosmos `#070b1d/#0a1030/#131722/#1C212E`.
- **Seguridad emocional:** sin pantallas rojas de castigo, tono suave + reintento; éxito con fanfarria + confeti + medallas.

---

## 12. Flujos Principales (E2E verificados)

1. **Onboarding:** Inicio → sin player → Gestión → `input_player_name=Valentina` → `Registrar Jugador` → activo.
2. **Juego:** `JUGAR / MINIJUEGOS` → Panel (10 títulos) → filtro Lenguaje/Memoria → `btn_play_frases_vof` → Niveles → `btn_level_1` → responder → `btn_verificar` → `¡VICTORIA!` → puntos + desbloqueo → siguiente/repetir/volver.
3. **Ranking:** Header `Ranking de Jugadores` → modal ordenado (Lucía 400pts > Andrés 150pts) → `Aceptar`.
4. **Audio:** Header `Ajustes y Música` → `Ajustes de la Aplicación / Sonido y Música` → toggles + sliders + preview temas.

---

## 13. Criterios de Aceptación

- [ ] `npm test` pasa 4 specs (`player-flow, gameplay-flow, ranking-flow, audio-settings`).
- [ ] `npm run build` (`tsc && vite build`) sin errores.
- [ ] Los 10 juegos abren su nivel 1 y otorgan puntos persistidos.
- [ ] Desbloqueo nunca supera `getLevelCount(game)`.
- [ ] Audio SFX + BGM conmutan y persisten tras reload.
- [ ] APK debug compila tras `cap sync`.

---

## 14. Riesgos y Mitigaciones

| Riesgo | Mitigación actual |
|---|---|
| Fotos rotas offline (`/assets/*.jpg` inexistentes) | Sistema emoji+gradiente autocontenido en `gamesData.ts:1-8` |
| `Nivel 7/16` falso | `LEVEL_COUNT` real por juego |
| Bloqueo AudioContext en Android | `resume()` en gesto + `androidScheme https` |
| Sobrestimulación 0–6a | Fondos cálidos/bajos, tonos suaves, sin ads/popups |
| Toques involuntarios | Targets grandes + gaps + `manipulation` |

---

## 15. Roadmap Sugerido

1. Cambiar `appId` ejemplo a ID productivo, versionar storage v2 con migración.
2. Unificar `TOTAL_LEVELS_COUNT` global a por-juego + telemetría local opt-in.
3. TTS offline, modo guiado padres, generador local de niveles.
4. Auditoría contraste AAA + pruebas en gama baja Android.

---

## 16. Anexos — Comandos

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # vitest run (E2E)
npm run build      # tsc && vite build -> dist/
npx cap sync android
npx cap open android
cd android; ./gradlew assembleDebug  # app-debug.apk
```

**Estructura:** `src/components/screens/* (15 pantallas), src/services/storage.ts, src/utils/sound.ts, src/data/gamesData.ts, src/types.ts, src/App.tsx, src/main.tsx, tests/e2e/*, public/assets/*, android/*`
