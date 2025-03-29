import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Database,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAuth } from '../modules/access-control/context/AuthContext';

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Modelos', path: '/modelos', icon: Settings },
  { label: 'Carga de datos', path: '/upload', icon: Database },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        h-screen flex flex-col justify-between 
        border-r border-divider dark:border-divider-dark
        bg-sidebar-light dark:bg-sidebar-dark
        text-sidebarText-light dark:text-sidebarText-dark
        transition-all duration-300 
        ${collapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Logo y botón */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-divider/20 dark:border-divider-dark/20">
        {!collapsed && (
          <span className="font-bold text-lg">PoincareX</span>
        )}
        <button
          onClick={() => setCollapsed((prev) => !prev)}
          className="p-1 rounded hover:bg-white/10 transition"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map(({ label, path, icon: Icon }) => {
          const isActive = pathname.startsWith(path);
          return (
            <NavLink
              key={path}
              to={path}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md transition
                ${collapsed ? 'justify-center' : ''}
                ${isActive
                  ? 'bg-primary text-white font-semibold shadow-sm'
                  : 'hover:bg-white/10'}
              `}
            >
              <Icon size={18} />
              {!collapsed && <span className="text-sm">{label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-divider/20 dark:border-divider-dark/20 px-4 py-3 text-xs">
        {!collapsed && (
          <>
            <div className="truncate mb-1">{user?.email}</div>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-red-300 hover:text-red-500"
            >
              <LogOut size={14} />
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </aside>
  );
}