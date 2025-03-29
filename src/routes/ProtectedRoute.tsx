import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../modules/access-control/context/AuthContext';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user } = useAuth();
  const location = useLocation();

  if (user === undefined) {
    return <div className="p-6">Cargando sesión...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
