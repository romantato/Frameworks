import ResourceCrud from '../components/ResourceCrud';

export default function PedidosPage() {
  return (
    <ResourceCrud
      title="Pedidos"
      description="Solicitudes de entrega y su estado. Regla: no se actualiza/elimina un pedido ENTREGADO."
      resourceKey="pedidos"
      endpoint="/api/pedidos"
      emptyForm={{ estadoEntrega: 'PENDIENTE', clienteId: '', repartidorId: '', fecha: '' }}
      columns={[
        { key: 'fecha', label: 'Fecha' },
        { key: 'estadoEntrega', label: 'Estado' },
        { key: 'clienteId', label: 'Cliente ID' },
        { key: 'repartidorId', label: 'Repartidor ID' },
      ]}
      fields={[
        {
          name: 'estadoEntrega',
          label: 'Estado entrega',
          type: 'select',
          required: true,
          options: [
            { value: 'PENDIENTE', label: 'PENDIENTE' },
            { value: 'EN_CAMINO', label: 'EN_CAMINO' },
            { value: 'ENTREGADO', label: 'ENTREGADO' },
            { value: 'CANCELADO', label: 'CANCELADO' },
          ],
        },
        { name: 'clienteId', label: 'Cliente ID', type: 'number', valueType: 'number', required: true },
        { name: 'repartidorId', label: 'Repartidor ID', type: 'number', valueType: 'number', required: true },
        { name: 'fecha', label: 'Fecha (opcional, ISO)', type: 'datetime-local' },
      ]}
    />
  );
}
