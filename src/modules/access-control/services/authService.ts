// src/modules/access-control/services/authService.ts


// Dummy de usuarios simulados
const dummyUsers = [
  {
    email: 'admin@poincarex.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin',
  },
  {
    email: 'cliente@poincarex.com',
    password: 'cliente123',
    name: 'Cliente PYMES',
    role: 'client',
  },
];

// Función simulada de login
export const login = async (email: string, password: string) => {
  // Emula retardo de red
  await new Promise((resolve) => setTimeout(resolve, 800));

  const user = dummyUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error('Credenciales incorrectas');
  }
  
  // Simula respuesta del backend
  return {
    token: 'fake-jwt-token',
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};


export async function login_api(email: string, password: string) {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }
  
    const data = await response.json();
    saveAuthData(data.token, data.user);
  
    return data.user;
  }

export const saveAuthData = (token: string, user: unknown) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
