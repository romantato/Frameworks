import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Icon } from '../components/Icons';

const modules = [
  {
    to: '/clientes',
    title: 'Clientes',
    text: 'Altas y consulta de clientes del servicio.',
    icon: 'users',
  },
  {
    to: '/repartidores',
    title: 'Repartidores',
    text: 'Personal de entrega y contacto.',
    icon: 'truck',
  },
  {
    to: '/tipos-botellon',
    title: 'Tipos de botellón',
    text: 'Catálogo de envases (20L, 10L...).',
    icon: 'drop',
  },
  {
    to: '/pedidos',
    title: 'Pedidos',
    text: 'Flujo de solicitud y estado de entrega.',
    icon: 'cart',
  },
  {
    to: '/detalles-pedido',
    title: 'Detalles de pedido',
    text: 'Líneas de botellones por pedido.',
    icon: 'clipboard',
  },
  {
    to: '/pagos',
    title: 'Pagos',
    text: 'Registro de método y estado de pago.',
    icon: 'card',
  },
  {
    to: '/botellones-cliente',
    title: 'Botellones por cliente',
    text: 'Inventario de envases en poder del cliente.',
    icon: 'bottle',
  },
];

export default function HomePage() {
  const { user, can } = useAuth();

  return (
    <section className="page home-page">
      <header className="page-header home-header">
        <div>
          <h1>Panel AquaManager</h1>
          <p>
            Bienvenido, <strong>{user?.username}</strong>. Rol activo:{' '}
            <span className="badge">{user?.rol}</span>
          </p>
        </div>
      </header>

      <div className="home-grid">
        {modules
          .filter((m) => can(m.to.slice(1), 'read'))
          .map((m) => (
            <Link key={m.to} to={m.to} className="home-card">
              <span className="home-icon">
                <Icon name={m.icon} />
              </span>
              <span className="home-copy">
                <h2>{m.title}</h2>
                <p>{m.text}</p>
              </span>
              <span className="home-chevron" aria-hidden="true">
                <Icon name="chevron" />
              </span>
            </Link>
          ))}
      </div>
    </section>
  );
}
