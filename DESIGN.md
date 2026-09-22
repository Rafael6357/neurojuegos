# Sistema de Diseño y Ergonomía Infantil - NeuroJuegos 🎨👶

Este documento describe las directrices visuales, ergonómicas y pedagógicas aplicadas en **NeuroJuegos**, orientadas a niños en la primera infancia (0 a 6 años).

---

## 1. Psicología del Color y Paleta Cromática

La selección de colores busca un balance entre dinamismo lúdico y prevención de sobreestimulación sensorial:

### Colores Base de Interfaz
* **Fondo Principal**: `Amber 50` / `Orange 50` (`#FFFBEB` / `#FFF7ED`). Un fondo blanco cálido con baja saturación que previene el deslumbramiento y la fatiga visual.
* **Encabezado y Acentos Primarios**: `Amber 500` / `Amber 600` (`#F59E0B` / `#D97706`). Proporciona calidez, confianza y optimismo.
* **Texto y Contraste**: `Amber 950` (`#451A03`) y `Slate 800` (`#1E293B`). Garantiza un ratio de contraste superior a **7:1** (WCAG AAA) contra los fondos claros.

### Codificación Semántica por Dominio Cognitivo
| Dominio Cognitivo | Color Tailwind | Función Pedagógica |
| :--- | :--- | :--- |
| **Lenguaje y Fonética** | `Emerald 500` / `600` | Comunicación, fluidez verbal, vocabulario. |
| **Memoria y Trabajo Operativo**| `Purple 500` / `Indigo 600` | Retención, concentración profunda, orden secuencial. |
| **Atención y Control Ejecutivo**| `Rose 500` / `Red 600` | Alerta visual, inhibición de impulsos, discriminación de figuras. |

---

## 2. Tipografía

Para facilitar la lectura en etapas de alfabetización temprana y prelectura:
* **Títulos y Botones de Acción**: `Fredoka`, sans-serif redondeada de trazo grueso y amigable, con excelente legibilidad en pantallas táctiles.
* **Instrucciones y Párrafos**: `Nunito`, sans-serif geométrica con gran altura de x y espaciado generoso, ideal para la comprensión de oraciones.

---

## 3. Ergonomía para Motricidad Fina Infantil

Los niños de 0 a 6 años tienen una coordinación motriz fina en desarrollo. El diseño aplica estrictamente:

1. **Zonas Táctiles Ampliadas (Touch Targets)**:
   - Todo botón interactivo tiene una altura mínima de **48px a 64px** y un ancho generoso.
   - Espaciado entre botones de al menos **12px a 16px** para evitar toques involuntarios o frustración.
2. **Esquinas Redondeadas Suaves**:
   - `rounded-2xl` y `rounded-3xl` (16px a 24px) en tarjetas y botones. Evita formas punzantes o estresantes.
3. **Profundidad Visual y Feedback Inmediato**:
   - Bordes inferiores engrosados (`border-b-4`, `border-b-6`) para dar sensación de botón físico tridimensional (tactilidad perceptual).
   - Efecto de pulsación `active:scale-95` acompañado de un efecto de sonido inmediato sintetizado (`playClick()`).
4. **Refuerzo Dual (Icono + Texto)**:
   - Toda acción cuenta con un icono semántico representativo (`Lucide Icons`) para que niños prelectores puedan identificar la función sin necesidad de leer.

---

## 4. Accesibilidad y Seguridad Emocional

* **Feedback de Error No Punitivo**:
  - En caso de fallo en una respuesta, no se muestran pantallas rojas de castigo ni sonidos estridentes. Se emite un tono suave y se permite reintentar o reflexionar.
* **Celebración del Éxito**:
  - Victoria celebrada con fanfarria armónica ascendente, confeti animado (`canvas-confetti`) y medallas visuales.
* **Sin Contenido Oculto ni Publicidad**:
  - Cero distracciones o ventanas emergentes externas que interrumpan el foco cognitivo.
