# Arquitectura de Software - NeuroJuegos 🏛️

Este documento define la arquitectura técnica, flujos de datos, decisiones de diseño y estrategias de persistencia y empaquetado de la aplicación **NeuroJuegos**.

---

## 1. Principios de Diseño

1. **Spec-Driven Development (SDD)**: El comportamiento de los componentes, la navegación, la persistencia y la lógica de juego se rigen por especificaciones declarativas verificables mediante pruebas E2E automatizadas.
2. **Offline-First Absoluto**: El software no depende de ningún servidor o API externa durante su ejecución. Todo el procesamiento de audio, lógica de juego, progresión de niveles y persistencia es local.
3. **Desacoplamiento Estricto**:
   - La capa de presentación (`src/components/screens`) no realiza accesos directos al almacenamiento crudo; interactúa a través de `src/services/storage.ts`.
   - El motor de audio (`src/utils/sound.ts`) encapsula toda la interacción con la Web Audio API y responde a eventos atómicos de la interfaz.
   - El empaquetado nativo (`android/`) se aísla a través del puente de Capacitor sin ensuciar el código web.

---

## 2. Diagrama de Capas del Sistema

```text
+-------------------------------------------------------------------+
|                           Vistas (React)                          |
|  - InicioScreen             - PanelMinijuegosScreen               |
|  - GestionJugadoresScreen   - AjustesScreen                       |
|  - NivelesScreen            - 10 Pantallas de Minijuegos          |
+---------------------------------+---------------------------------+
                                  |
                                  v
+-------------------------------------------------------------------+
|                      Capa de Estado y Lógica                      |
|  - App.tsx (State Machine de Navegación, Jugador Activo)          |
|  - RankingModal, VictoryModal                                     |
+-------------------+-----------------------------+-----------------+
                    |                             |
                    v                             v
+-----------------------------+     +-------------------------------+
|     Servicio de Storage     |     |   Motor de Audio Sintetizado  |
|     (src/services/storage)  |     |   (src/utils/sound.ts)        |
|  - Jugadores & Puntuaciones |     |  - Web Audio API (Osciladores)|
|  - Ajustes de Sonido / BGM  |     |  - SFX (Click, Victoria, Error)
|  - Versionado de Esquema    |     |  - Melodías en Bucle por Área |
+--------------+--------------+     +---------------+---------------+
               |                                    |
               v                                    v
+-----------------------------+     +-------------------------------+
|     Almacenamiento Local    |     |      Hardware Audio Output    |
|     (Window.localStorage)   |     |      (Altavoces / Auriculares)|
+-----------------------------+     +-------------------------------+
```

---

## 3. Capa de Datos y Persistencia (`src/services/storage.ts`)

La persistencia de datos utiliza `localStorage` con validación y tipado estricto definido en `src/types.ts`:

### Modelo de Jugador (`Player`):
```typescript
export interface Player {
  id: string;
  nombre: string;
  edad: number;
  avatarColor: string;
  // Puntuaciones acumuladas por juego
  puntuacionFrasesVoF: number;
  puntuacionIdentifica: number;
  puntuacionPatrones: number;
  puntuacionCadenaNum: number;
  puntuacionMemo: number;
  puntuacionParejas?: number;
  puntuacionDigitos?: number;
  puntuacionStroop?: number;
  puntuacionOrdenaFrase?: number;
  puntuacionIntruso?: number;
  // Niveles desbloqueados (1-16)
  nivelFrasesVoF: number;
  nivelIdentifica: number;
  nivelPatrones: number;
  nivelAdivina: number;
  nivelRecuerda: number;
  nivelParejas?: number;
  nivelDigitos?: number;
  nivelStroop?: number;
  nivelOrdenaFrase?: number;
  nivelIntruso?: number;
  createdAt: number;
}
```

### Modelo de Ajustes de Audio (`AudioSettings`):
```typescript
export interface AudioSettings {
  soundEnabled: boolean;   // Control de efectos de sonido (SFX)
  musicEnabled: boolean;   // Control de música de fondo (BGM)
}
```

---

## 4. Motor de Audio Sintetizado (`src/utils/sound.ts`)

Para evitar problemas de carga de archivos pesados en dispositivos móviles de gama baja y asegurar compatibilidad nativa en Android y Web:
- **Síntesis con Web Audio API**: Se utilizan nodos `OscillatorNode` (ondas `sine`, `triangle`) y `GainNode` para modular envolventes de amplitud (ADSR).
- **Control de Concurrencia**: `safeAudioContext()` gestiona el desbloqueo automático del contexto de audio en el primer gesto del usuario (`user gesture activation policy`).
- **Música de Fondo Procedural**: Las melodías se secuencian con temporizadores precisos (`ctx.currentTime`), permitiendo cambiar de tema según el área cognitiva seleccionada (*Lenguaje*, *Memoria*, *Atención* o *General*).

---

## 5. Plataforma Móvil y Capacitor (`@capacitor/android`)

- **Contenedor Nativo**: En lugar de mantener dos códigos fuente separados, el proyecto web se sincroniza directamente dentro de la carpeta `android/` utilizando Capacitor.
- **Configuración (`capacitor.config.ts`)**:
  - `appId`: `com.example.neurojuegos`
  - `appName`: `NeuroJuegos`
  - `webDir`: `dist`
  - `server.androidScheme`: `https` (evita problemas de contenido mixto y habilita Web Audio y Service Workers).
- **Flujo de Construcción**:
  1. `npm run build` genera los bundles optimizados en `/dist`.
  2. `npx cap sync android` transfiere los activos a `android/app/src/main/assets/public`.
  3. `gradlew assembleDebug` compila el APK nativo.
