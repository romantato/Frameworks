import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ClientesPage from './pages/ClientesPage';
import RepartidoresPage from './pages/RepartidoresPage';
import TiposBotellonPage from './pages/TiposBotellonPage';
import PedidosPage from './pages/PedidosPage';
import DetallesPedidoPage from './pages/DetallesPedidoPage';
import PagosPage from './pages/PagosPage';
import BotellonesClientePage from './pages/BotellonesClientePage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="clientes" element={<ClientesPage />} />
            <Route path="repartidores" element={<RepartidoresPage />} />
            <Route path="tipos-botellon" element={<TiposBotellonPage />} />
            <Route path="pedidos" element={<PedidosPage />} />
            <Route path="detalles-pedido" element={<DetallesPedidoPage />} />
            <Route path="pagos" element={<PagosPage />} />
            <Route path="botellones-cliente" element={<BotellonesClientePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
