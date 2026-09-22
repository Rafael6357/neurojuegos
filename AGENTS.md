# Guía Operativa para Agentes de Desarrollo - NeuroJuegos 🤖

Este archivo contiene las directrices, reglas de arquitectura y convenciones de código para agentes de IA y desarrolladores automatizados que trabajen sobre el repositorio de **NeuroJuegos**.

---

## 1. Convenciones de Código y TypeScript

* **TypeScript Estricto**: Todo nuevo componente o función debe tener tipos e interfaces explícitos en `src/types.ts`.
* **Sin `any` implícito**: Tipar eventos (`React.MouseEvent`, `React.ChangeEvent`), props y retornos de funciones.
* **Componentes Funcionales con Hooks**: Usar siempre componentes funcionales y hooks estándar de React.
* **Tailwind CSS Utility Classes**: No crear archivos `.css` adicionales ni estilos en línea. Usar las clases utilitarias de Tailwind configuradas en `src/index.css`.

---

## 2. Identificadores DOM Únicos (`id`)

Para asegurar la robustez de las pruebas E2E automatizadas y accesibilidad:
* Todo elemento interactivo (botones, inputs, tarjetas de minijuegos) **DEBE** contar con un atributo `id` único y semántico (ej: `btn_inicio_jugar`, `btn_level_1`, `input_player_name`).
* Formato estándar de nombres:
  - Botones de acción: `btn_<pantalla>_<accion>`
  - Inputs de formulario: `input_<entidad>_<campo>`
  - Tarjetas de juego: `game_card_<id_juego>`

---

## 3. Compatibilidad con Capacitor y Web Audio

* **No asumir disponibilidad de red**: No agregar llamadas `fetch` a APIs externas para recursos o sonidos.
* **Motor de Audio**: No cargar archivos locales `.mp3` o `.wav` que puedan fallar en entornos sandbox o paths relativos de Android. Usar siempre las funciones exportadas por `src/utils/sound.ts`.
* **Sincronización Android**: Tras modificar código de frontend (`src/` o `public/`), ejecutar `npm run build && npx cap sync android` para mantener la carpeta `android/` al día.

---

## 4. Estructura de Carpetas

* `src/`: Todo el código de la aplicación moderna.
* `public/assets/`: Recursos gráficos accesibles mediante rutas `/assets/...`.
* `tests/e2e/`: Pruebas de integración de flujos de usuario.
* `android/`: Proyecto nativo de Capacitor para compilar el APK.

---

## 5. Comandos de Verificación Requeridos

Antes de dar por concluida cualquier tarea:
1. `npm test`: Verificar que la suite de pruebas E2E pase al 100%.
2. `npm run build`: Verificar que la compilación de producción termine sin errores ni advertencias de tipos.
