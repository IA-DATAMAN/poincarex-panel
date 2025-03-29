import { memo } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
      title={`Tema actual: ${isDark ? 'Oscuro' : 'Claro'}`}
      className={`
        p-2 rounded-full border border-divider
        bg-surface dark:bg-surface-dark
        text-text dark:text-text-dark
        hover:bg-secondary/20 transition
      `}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default memo(ThemeToggle);
