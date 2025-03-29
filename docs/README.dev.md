# 📘 README.dev.md – Configuración de Desarrollo para PoincareX Panel

Este documento contiene todos los pasos necesarios para dejar listo el entorno de desarrollo del proyecto **PoincareX Panel**, con soporte para TailwindCSS, Vite, React y una arquitectura limpia y escalable.

---

## 🧱 Arquitectura General de PoincareX Panel

### 🎯 Objetivo de la Plataforma

PoincareX Panel es una plataforma de control, visualización e inteligencia para empresas, orientada a consultoras de datos, pymes tecnológicas y equipos científicos.
Su propósito es ofrecer un panel donde los usuarios puedan:

- Gestionar datos, fuentes y procesos.
- Crear y monitorear modelos predictivos.
- Visualizar insights mediante dashboards.
- Acceder a servicios según el tipo de cuenta (planes y roles).
- Configurar preferencias personales, temas y accesos.

### 🧩 Módulos Funcionales Principales (por dominio)

| Módulo            | Descripción                                                    |
| ----------------- | -------------------------------------------------------------- |
| `dashboards/`     | Gráficas, KPIs, resultados de IA, reportes dinámicos           |
| `ingestion/`      | Subida de datos (CSV, APIs externas, bases de datos)           |
| `processing/`     | Definición de pipelines, ETL visual, preprocesamiento de datos |
| `ml/`             | Creación, entrenamiento, despliegue y monitoreo de modelos     |
| `access-control/` | Login, logout, gestión de sesiones, roles y permisos           |
| `user/`           | Perfil, preferencia, actividad y seguridad del usuario         |
| `settings/`       | Configuraciones generales, temas, idioma, notificaciones       |

---

## 🎨 Interfaz Principal & Funciones Cross

### 💡 Responsividad

La plataforma está diseñada bajo el enfoque **mobile-first**, 100% responsiva con:

- TailwindCSS (`sm`, `md`, `lg`, `xl`, `2xl`)
- Layout flexible: Sidebar colapsable, header fijo, panel fluido

### 🌙 Sistema de Temas (Claro/Oscuro)

Se gestiona vía contexto global + CSS variables + Tailwind.

📁 Asegurar en `tailwind.config.js`:

```js
darkMode: "class";
```

📁 En `global.css` usar clases base para tema:

```css
html {
  @apply font-sans text-gray-800 bg-gray-50 dark:text-gray-100 dark:bg-gray-900;
}
```

### 🖋 Tipografía Profesional

Se recomienda usar **Inter** por su legibilidad y elegancia moderna:

```bash
npm install @fontsource/inter
```

📁 En `main.tsx`:

```ts
import "@fontsource/inter/variable.css";
```

📁 En `tailwind.config.js`:

```js
extend: {
  fontFamily: {
    sans: ['InterVariable', 'sans-serif'],
  },
},
```

#### 🎨 Paleta de colores sugerida (inspirada en IA, confianza y descubrimiento):

**Tema Claro:**

- Fondo base: `#f9fafb`
- Texto primario: `#1f2937`
- Primario: `#3b82f6`
- Secundario: `#10b981`
- Tarjetas: `#ffffff`

**Tema Oscuro:**

- Fondo base: `#111827`
- Texto primario: `#f3f4f6`
- Primario: `#60a5fa`
- Secundario: `#34d399`
- Tarjetas: `#1f2937`

🎯 Los iconos de `lucide-react` deben seguir el estilo del texto:

```tsx
<Icon className="text-blue-600 dark:text-blue-400" size={18} />
```

---

### 🔐 Gestión de Cuentas y Accesos

- Roles (Admin, Analista, Viewer, Cliente)
- Planes escalables (Free, Pro, Enterprise)
- Claims por token (JWT): plan, rol, tenant
- Protección de rutas y features por `usePermissions()`

### ⚙️ Configuraciones Cross-Platform

- Preferencias por usuario (tema, idioma, formato)
- Configuración de módulos disponibles según plan
- Interfaz multi-tenant-ready

### 📦 Módulos compartidos (Cross Cutting Concerns)

| Carpeta     | Funcionalidad                                     |
| ----------- | ------------------------------------------------- |
| `layout/`   | Sidebar, header, theme switcher                   |
| `hooks/`    | Hooks reutilizables (`useTheme`, `useUser`, etc.) |
| `store/`    | Zustand slices por dominio                        |
| `services/` | Conexión a APIs, adapters                         |
| `routes/`   | Configuración de rutas protegidas                 |
| `styles/`   | Tailwind global, tokens CSS                       |

---

## 🔑 Página de Autenticación (Login)

### 📋 Funcionalidad

- Autenticación por correo y contraseña
- Validación de campos
- Feedback visual en caso de error
- Redirección automática al panel una vez logueado
- Preparado para conectar a API externa (FastAPI / Rust)

### 🎨 Diseño sugerido

- Fondo limpio con sección de login centrado
- Tarjeta con sombra y bordes redondeados
- Logo + nombre del sistema en parte superior
- Input para email y contraseña con íconos
- Botón principal con estilo de tema (azul tecnología)
- Soporte para tema claro/oscuro
- Tipografía `Inter`, íconos `lucide-react`, esquema consistente

### 📁 Ruta del módulo de login

```
src/modules/access-control/pages/Login.tsx
```

### 🧱 Estructura futura para autenticación y autorización

| Archivo              | Descripción                              |
| -------------------- | ---------------------------------------- |
| `Login.tsx`          | Pantalla de login                        |
| `AuthContext.tsx`    | Contexto global de usuario/autenticación |
| `authService.ts`     | Cliente para login/logout con API        |
| `ProtectedRoute.tsx` | Componente para proteger rutas privadas  |

Este módulo será la puerta de acceso principal al panel. Una vez logueado, el usuario es redirigido a `/dashboard` y se monta el layout general del sistema.

### 🧭 Configurar la ruta por defecto al login

📄 `src/routes/index.tsx`

```tsx
<Route path="/" element={<Navigate to="/login" />} />
```

Esto asegura que cuando el usuario no esté logueado y acceda al sitio sin ruta específica, se le redirige automáticamente al login.

También se recomienda validar el token en `localStorage` o `AuthContext` y usar `ProtectedRoute` para evitar acceso a panel sin autenticación.

---

## 🔒 Componente `ProtectedRoute`

📄 `src/routes/ProtectedRoute.tsx`

```tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../modules/access-control/context/AuthContext";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
```

📌 Úsalo para envolver cualquier ruta que requiera sesión activa:

```tsx
<Route
  path="/"
  element={
    <ProtectedRoute>
      <AppLayout />
    </ProtectedRoute>
  }
>
  <Route path="dashboard" element={<Dashboard />} />
</Route>
```

Esto protege el layout completo para que solo usuarios autenticados puedan navegar dentro del panel.

---

## ⚙️ Configuración del Proyecto - Setup Inicial

...
