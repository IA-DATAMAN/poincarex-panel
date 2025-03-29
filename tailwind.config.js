export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // Usa la clase "dark" para el modo oscuro
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        sidebar: {
          DEFAULT: 'var(--color-sidebar)',
          //text: 'var(--color-sidebar-text)',
          light: 'var(--color-sidebar-light)', // Sidebar en tema claro
          dark: 'var(--color-sidebar-dark)', // Sidebar en tema oscuro
        },
        sidebarText: {
          light: 'var(--color-sidebar-text-light)', // Texto del sidebar en tema claro
          dark: 'var(--color-sidebar-text-dark)', // Texto del sidebar en tema oscuro
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          dark: 'var(--color-surface-dark)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          dark: 'var(--color-text-dark)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          dark: 'var(--color-border-dark)',
        },
        divider: {
          DEFAULT: 'var(--color-divider)',
          dark: 'var(--color-divider-dark)',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Mejora para formularios accesibles
  ],
};