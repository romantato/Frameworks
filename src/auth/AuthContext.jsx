import { createContext, useContext, useMemo, useState } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('am_user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = async (username, password) => {
    const data = await api.post('/api/auth/login', { username, password });
    localStorage.setItem('am_token', data.token);
    const session = {
      userId: data.userId,
      username: data.username,
      rol: data.rol,
      clienteId: data.clienteId,
      repartidorId: data.repartidorId,
    };
    localStorage.setItem('am_user', JSON.stringify(session));
    setUser(session);
    return session;
  };

  const logout = () => {
    localStorage.removeItem('am_token');
    localStorage.removeItem('am_user');
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user),
      hasRole: (...roles) => Boolean(user && roles.includes(user.rol)),
      canWrite: (resource) => {
        if (!user) return false;
        if (user.rol === 'ADMIN') return true;
        const matrix = {
          clientes: [],
          repartidores: [],
          'tipos-botellon': [],
          pedidos: user.rol === 'CLIENTE' ? ['create'] : user.rol === 'REPARTIDOR' ? ['update'] : [],
          'detalles-pedido': user.rol === 'CLIENTE' ? ['create'] : [],
          pagos: user.rol === 'CLIENTE' ? ['create'] : [],
          'botellones-cliente': user.rol === 'CLIENTE' ? ['create', 'update'] : [],
        };
        return (matrix[resource] || []).length > 0;
      },
      can: (resource, action) => {
        if (!user) return false;
        if (user.rol === 'ADMIN') return true;
        const matrix = {
          clientes: { read: true },
          repartidores: { read: user.rol === 'REPARTIDOR' },
          'tipos-botellon': { read: true },
          pedidos: {
            read: true,
            create: user.rol === 'CLIENTE',
            update: user.rol === 'REPARTIDOR',
            delete: false,
          },
          'detalles-pedido': {
            read: true,
            create: user.rol === 'CLIENTE',
            update: false,
            delete: false,
          },
          pagos: {
            read: true,
            create: user.rol === 'CLIENTE',
            update: false,
            delete: false,
          },
          'botellones-cliente': {
            read: true,
            create: user.rol === 'CLIENTE',
            update: user.rol === 'CLIENTE',
            delete: false,
          },
        };
        return Boolean(matrix[resource]?.[action]);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
