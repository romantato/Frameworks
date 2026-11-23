import ResourceCrud from '../components/ResourceCrud';

export default function ClientesPage() {
  return (
    <ResourceCrud
      title="Clientes"
      description="Administración de clientes del servicio de agua."
      resourceKey="clientes"
      endpoint="/api/clientes"
      emptyForm={{ nombre: '', aliasUbicacion: '', esAntiguo: false }}
      columns={[
        { key: 'nombre', label: 'Nombre' },
        { key: 'aliasUbicacion', label: 'Ubicación' },
        { key: 'esAntiguo', label: 'Antiguo', render: (i) => (i.esAntiguo ? 'Sí' : 'No') },
      ]}
      fields={[
        { name: 'nombre', label: 'Nombre', required: true },
        { name: 'aliasUbicacion', label: 'Alias ubicación', required: true },
        { name: 'esAntiguo', label: 'Cliente antiguo', type: 'checkbox' },
      ]}
    />
  );
}
