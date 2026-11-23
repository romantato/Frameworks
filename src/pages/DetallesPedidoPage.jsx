import ResourceCrud from '../components/ResourceCrud';

export default function DetallesPedidoPage() {
  return (
    <ResourceCrud
      title="Detalles de pedido"
      description="Líneas de productos asociadas a cada pedido."
      resourceKey="detalles-pedido"
      endpoint="/api/detalles-pedido"
      emptyForm={{ cantidad: 1, precioUnitario: 0, pedidoId: '', tipoBotellonId: '' }}
      columns={[
        { key: 'pedidoId', label: 'Pedido' },
        { key: 'tipoBotellonId', label: 'Tipo botellón' },
        { key: 'cantidad', label: 'Cantidad' },
        { key: 'precioUnitario', label: 'Precio unitario' },
      ]}
      fields={[
        { name: 'pedidoId', label: 'Pedido ID', type: 'number', valueType: 'number', required: true },
        { name: 'tipoBotellonId', label: 'Tipo botellón ID', type: 'number', valueType: 'number', required: true },
        { name: 'cantidad', label: 'Cantidad', type: 'number', valueType: 'number', required: true },
        {
          name: 'precioUnitario',
          label: 'Precio unitario',
          type: 'number',
          valueType: 'number',
          step: '0.01',
          required: true,
        },
      ]}
    />
  );
}
