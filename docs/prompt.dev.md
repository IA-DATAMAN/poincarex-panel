## 🧠 Reglas de Codificación – Prompt de Recordatorio Experto

Todo el desarrollo del sistema debe seguir las siguientes reglas **de forma estricta**:

### 🔧 Buenas prácticas de desarrollo

- Código limpio, modular, reusable, sin duplicaciones.
- Aplicar principios **DRY (Don't Repeat Yourself)**, **KISS (Keep It Simple)** y **SOLID**.
- Separación de responsabilidades: lógica en hooks o contextos cuando aplique.

### 🎨 Sistema de diseño y temas

- Usar **tokens semánticos extendidos** de Tailwind definidos en `tailwind.config.js` y `themes.css`:
  - `bg-surface`, `text-primary`, `border-divider`, `text-title`, etc.
- **No usar valores CSS directos** (`bg-[#1f1f1f]` o `bg-[var(--color-bg)]`), solo clases semánticas.
- Compatible con **modo claro / oscuro** activado con `class="dark"` en el `<html>`.

```tsx
// ✅ Correcto
<div className="bg-surface text-text dark:bg-surface-dark dark:text-text-dark" />

// ❌ Incorrecto
<div className="bg-[var(--color-bg)] text-[var(--color-text)]" />
```
