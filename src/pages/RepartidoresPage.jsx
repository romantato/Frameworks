import ResourceCrud from '../components/ResourceCrud';

export default function RepartidoresPage() {
  return (
    <ResourceCrud
      title="Repartidores"
      description="Personal encargado de las entregas."
      resourceKey="repartidores"
      endpoint="/api/repartidores"
      emptyForm={{ nombre: '', telefono: '' }}
      columns={[
        { key: 'nombre', label: 'Nombre' },
        { key: 'telefono', label: 'Teléfono' },
      ]}
      fields={[
        { name: 'nombre', label: 'Nombre', required: true },
        { name: 'telefono', label: 'Teléfono', required: true },
      ]}
    />
  );
}
