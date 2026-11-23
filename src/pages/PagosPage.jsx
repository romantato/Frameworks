import ResourceCrud from '../components/ResourceCrud';

export default function PagosPage() {
  return (
    <ResourceCrud
      title="Pagos"
      description="Un pago por pedido (relación 1:1)."
      resourceKey="pagos"
      endpoint="/api/pagos"
      emptyForm={{ metodoPago: 'EFECTIVO', montoPagado: 0, estadoPago: 'PENDIENTE', pedidoId: '' }}
      columns={[
        { key: 'pedidoId', label: 'Pedido' },
        { key: 'metodoPago', label: 'Método' },
        { key: 'montoPagado', label: 'Monto' },
        { key: 'estadoPago', label: 'Estado' },
      ]}
      fields={[
        { name: 'pedidoId', label: 'Pedido ID', type: 'number', valueType: 'number', required: true },
        {
          name: 'metodoPago',
          label: 'Método de pago',
          type: 'select',
          required: true,
          options: [
            { value: 'EFECTIVO', label: 'EFECTIVO' },
            { value: 'TRANSFERENCIA', label: 'TRANSFERENCIA' },
            { value: 'NEQUI', label: 'NEQUI' },
            { value: 'TARJETA', label: 'TARJETA' },
          ],
        },
        { name: 'montoPagado', label: 'Monto', type: 'number', valueType: 'number', step: '0.01', required: true },
        {
          name: 'estadoPago',
          label: 'Estado',
          type: 'select',
          required: true,
          options: [
            { value: 'PENDIENTE', label: 'PENDIENTE' },
            { value: 'PAGADO', label: 'PAGADO' },
            { value: 'RECHAZADO', label: 'RECHAZADO' },
          ],
        },
      ]}
    />
  );
}
