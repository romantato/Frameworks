import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Icon } from './Icons';

const links = [
  { to: '/', label: 'Inicio', icon: 'home', roles: ['ADMIN', 'REPARTIDOR', 'CLIENTE'] },
  { to: '/clientes', label: 'Clientes', icon: 'users', roles: ['ADMIN', 'REPARTIDOR', 'CLIENTE'] },
  { to: '/repartidores', label: 'Repartidores', icon: 'truck', roles: ['ADMIN', 'REPARTIDOR'] },
  { to: '/tipos-botellon', label: 'Tipos de botellón', icon: 'layers', roles: ['ADMIN', 'REPARTIDOR', 'CLIENTE'] },
  { to: '/pedidos', label: 'Pedidos', icon: 'cart', roles: ['ADMIN', 'REPARTIDOR', 'CLIENTE'] },
  { to: '/detalles-pedido', label: 'Detalles', icon: 'clipboard', roles: ['ADMIN', 'REPARTIDOR', 'CLIENTE'] },
  { to: '/pagos', label: 'Pagos', icon: 'card', roles: ['ADMIN', 'REPARTIDOR', 'CLIENTE'] },
  { to: '/botellones-cliente', label: 'Botellones', icon: 'drop', roles: ['ADMIN', 'REPARTIDOR', 'CLIENTE'] },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">AM</span>
          <div>
            <strong>AquaManager</strong>
            <p>Gestión de agua embotellada</p>
          </div>
        </div>
        <nav>
          {links
            .filter((l) => l.roles.includes(user?.rol))
            .map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}>
                <Icon name={l.icon} />
                <span>{l.label}</span>
              </NavLink>
            ))}
        </nav>
        <div className="sidebar-user">
          <div className="user-row">
            <span className="avatar">
              <Icon name="user" />
            </span>
            <div>
              <strong>{user?.username}</strong>
              <span className="role-pill">{user?.rol}</span>
            </div>
          </div>
          <button type="button" className="logout-btn" onClick={handleLogout}>
            <Icon name="logout" />
            Cerrar sesión
          </button>
        </div>
      </aside>
      <main className="content">
        <div className="content-art" aria-hidden="true">
          <svg className="wave" viewBox="0 0 900 280" preserveAspectRatio="none">
            <path
              d="M0 90 C 140 20, 240 150, 380 90 S 620 10, 760 80 900 40 900 40 L900 0 L0 0 Z"
              fill="rgba(255,255,255,0.45)"
            />
            <path
              d="M0 40 C 180 110, 300 -10, 470 60 S 760 140, 900 50 L900 0 L0 0 Z"
              fill="rgba(186,226,238,0.55)"
            />
          </svg>
          <svg className="jug" viewBox="0 0 180 220">
            <ellipse cx="92" cy="204" rx="46" ry="8" fill="rgba(14,90,112,0.12)" />
            <path d="M62 28h40c4 0 6 3 6 7v10c14 6 24 22 24 42v78c0 16-12 28-28 28H62c-16 0-28-12-28-28V87c0-20 10-36 24-42V35c0-4 2-7 4-7Z" fill="#d7f3fb" stroke="#7ec4d6" strokeWidth="2" />
            <path d="M70 18h28c6 0 10 4 10 10v8H60v-8c0-6 4-10 10-10Z" fill="#b7e4f2" stroke="#6eb6cb" strokeWidth="2" />
            <path d="M48 96h88v62c0 10-8 18-18 18H66c-10 0-18-8-18-18V96Z" fill="#8fd4ea" opacity="0.85" />
            <path d="M58 108c8 6 14 6 22 0" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.7" />
            <path d="M118 40c16 2 28 14 30 30" stroke="#9fd4e4" strokeWidth="3" fill="none" />
          </svg>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
