import ResourceCrud from '../components/ResourceCrud';

export default function TiposBotellonPage() {
  return (
    <ResourceCrud
      title="Tipos de botellón"
      description="Catálogo de envases disponibles."
      resourceKey="tipos-botellon"
      endpoint="/api/tipos-botellon"
      emptyForm={{ nombreEnvase: '' }}
      columns={[{ key: 'nombreEnvase', label: 'Nombre envase' }]}
      fields={[{ name: 'nombreEnvase', label: 'Nombre envase', required: true }]}
    />
  );
}
