import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../layout/AppLayout';

import Login from '../modules/access-control/pages/Login';
import Logout from '../modules/access-control/pages/Logout';
import Dashboard from '../modules/dashboards/pages/Dashboard';
import Modelos from '../modules/modelos/pages/Modelos';
import UploadPage from '../modules/ingestion/pages/UploadPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      {/* Rutas protegidas */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="upload" element={<UploadPage />} />
        <Route path="modelos" element={<Modelos />} />
        {/* Aquí puedes agregar más módulos: /modelos, /datos, etc. */}
      </Route>
    </Routes>
  );
}
