import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../auth/AuthContext';

export default function ResourceCrud({
  title,
  description,
  resourceKey,
  endpoint,
  columns,
  emptyForm,
  fields,
}) {
  const { can } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await api.get(endpoint);
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [endpoint]);

  const onChange = (name, value, type) => {
    let parsed = value;
    if (type === 'number') parsed = value === '' ? '' : Number(value);
    if (type === 'checkbox') parsed = Boolean(value);
    setForm((prev) => ({ ...prev, [name]: parsed }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([key, value]) => {
          if (value === '') return [key, null];
          if (typeof value === 'string' && value.includes('T') && !value.includes(':00') && key === 'fecha') {
            return [key, `${value}:00`];
          }
          return [key, value];
        }),
      );
      if (editingId) {
        await api.put(`${endpoint}/${editingId}`, payload);
        setMessage('Registro actualizado.');
      } else {
        await api.post(endpoint, payload);
        setMessage('Registro creado.');
      }
      resetForm();
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const onEdit = (item) => {
    const next = { ...emptyForm };
    Object.keys(emptyForm).forEach((key) => {
      next[key] = item[key] ?? emptyForm[key];
    });
    setForm(next);
    setEditingId(item.id);
    setMessage('');
    setError('');
  };

  const onDelete = async (id) => {
    if (!window.confirm('¿Eliminar este registro?')) return;
    setError('');
    try {
      await api.del(`${endpoint}/${id}`);
      setMessage('Registro eliminado.');
      if (editingId === id) resetForm();
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  const showCreate = can(resourceKey, 'create') || can(resourceKey, 'update');
  const canCreate = can(resourceKey, 'create');
  const canUpdate = can(resourceKey, 'update');
  const canDelete = can(resourceKey, 'delete');

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <button type="button" className="btn secondary" onClick={load}>
          Recargar
        </button>
      </header>

      {error && <div className="alert error">{error}</div>}
      {message && <div className="alert ok">{message}</div>}

      {showCreate && (canCreate || (canUpdate && editingId)) && (
        <form className="card-form" onSubmit={onSubmit}>
          <h2>{editingId ? `Editar #${editingId}` : 'Nuevo registro'}</h2>
          <div className="form-grid">
            {fields.map((field) => (
              <label key={field.name} className={field.type === 'checkbox' ? 'check' : ''}>
                <span>{field.label}</span>
                {field.type === 'select' ? (
                  <select
                    value={form[field.name] ?? ''}
                    onChange={(e) => onChange(field.name, e.target.value, field.valueType || 'text')}
                    required={field.required}
                  >
                    <option value="">Seleccione...</option>
                    {(field.options || []).map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    checked={Boolean(form[field.name])}
                    onChange={(e) => onChange(field.name, e.target.checked, 'checkbox')}
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={form[field.name] ?? ''}
                    onChange={(e) => onChange(field.name, e.target.value, field.valueType || field.type)}
                    required={field.required}
                    step={field.step}
                  />
                )}
              </label>
            ))}
          </div>
          <div className="form-actions">
            {((!editingId && canCreate) || (editingId && canUpdate)) && (
              <button type="submit" className="btn primary">
                {editingId ? 'Guardar cambios' : 'Crear'}
              </button>
            )}
            {editingId && (
              <button type="button" className="btn ghost" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      )}

      <div className="table-wrap">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                {columns.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
                {(canUpdate || canDelete) && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 2}>Sin registros.</td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    {columns.map((c) => (
                      <td key={c.key}>{c.render ? c.render(item) : String(item[c.key] ?? '')}</td>
                    ))}
                    {(canUpdate || canDelete) && (
                      <td className="actions">
                        {canUpdate && (
                          <button type="button" className="btn small" onClick={() => onEdit(item)}>
                            Editar
                          </button>
                        )}
                        {canDelete && (
                          <button type="button" className="btn small danger" onClick={() => onDelete(item.id)}>
                            Eliminar
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
