import { useAuth } from '../modules/access-control/context/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-surface border-b border-border dark:bg-surface-dark dark:border-border-dark px-6 flex items-center justify-between">
      <div>
        <h2 className="text-base font-medium">
          Bienvenido, <span className="text-primary">{user?.name}</span>
        </h2>
        <p className="text-xs">{user?.role}</p>
        
      </div>
      <ThemeToggle />
    </header>
  );
}
