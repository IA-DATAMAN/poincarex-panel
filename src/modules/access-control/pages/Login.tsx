import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login } from '../services/authService';

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    try {
      const result = await login(form.email, form.password);
      setUser(result.user);
  
      // 🔐 Guardar token y usuario en localStorage
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
  
      // 🔁 Redirección según rol
      const { role } = result.user;
      switch (role) {
        case 'admin':
          navigate('/dashboard');
          break;
        case 'client':
          navigate('/modelos');
          break;
        case 'analyst':
          navigate('/procesamiento');
          break;
        case 'viewer':
          navigate('/visualizaciones');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex font-sans text-[#1d1d1d]">
      {/* Sección izquierda: formulario */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-20 bg-white">
        <div className="max-w-md w-full mx-auto space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Bienvenido a <span className="text-[#e63946]">PoincareX</span>
          </h2>
          <p className="text-sm text-[#4a4a4a]">
            Inicia sesión para acceder a tu panel de inteligencia.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="Correo electrónico"
                required
                className="w-full pl-10 pr-3 py-2 border border-[#e0e0e0] rounded-md bg-[#f5f7fa] focus:ring-2 focus:ring-[#e63946] outline-none"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Contraseña"
                required
                className="w-full pl-10 pr-3 py-2 border border-[#e0e0e0] rounded-md bg-[#f5f7fa] focus:ring-2 focus:ring-[#e63946] outline-none"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 rounded-md text-white font-semibold bg-[#e63946] hover:bg-red-600 transition"
            >
              Iniciar sesión
            </button>
          </form>

          <p className="text-xs text-center text-[#4a4a4a]">
            ¿No tienes una cuenta? <span className="text-[#e63946] font-semibold cursor-pointer">Regístrate</span>
          </p>
        </div>
      </div>

      {/* Sección derecha: branding */}
      <div className="hidden md:flex w-1/2 bg-[#e63946] text-white items-center justify-center relative">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 text-center px-10">
          <h1 className="text-4xl font-bold tracking-wide">PoincareX</h1>
          <p className="mt-4 text-sm max-w-md mx-auto text-white/90">
            Plataforma avanzada para gestión de datos, modelos predictivos y visualización inteligente.
          </p>
        </div>
      </div>
    </div>
  );
}
