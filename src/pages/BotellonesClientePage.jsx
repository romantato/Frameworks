import ResourceCrud from '../components/ResourceCrud';

export default function BotellonesClientePage() {
  return (
    <ResourceCrud
      title="Botellones por cliente"
      description="Cantidad de envases que posee cada cliente."
      resourceKey="botellones-cliente"
      endpoint="/api/botellones-cliente"
      emptyForm={{ clienteId: '', tipoBotellonId: '', cantidadPosee: 0 }}
      columns={[
        { key: 'clienteId', label: 'Cliente' },
        { key: 'tipoBotellonId', label: 'Tipo botellón' },
        { key: 'cantidadPosee', label: 'Cantidad' },
      ]}
      fields={[
        { name: 'clienteId', label: 'Cliente ID', type: 'number', valueType: 'number', required: true },
        { name: 'tipoBotellonId', label: 'Tipo botellón ID', type: 'number', valueType: 'number', required: true },
        { name: 'cantidadPosee', label: 'Cantidad posee', type: 'number', valueType: 'number', required: true },
      ]}
    />
  );
}
