const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8081';

function getToken() {
  return localStorage.getItem('am_token');
}

export async function apiRequest(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const error = new Error(data?.mensaje || `Error HTTP ${response.status}`);
    error.status = response.status;
    error.codigo = data?.codigo;
    throw error;
  }

  return data;
}

export const api = {
  get: (path) => apiRequest(path),
  post: (path, body) => apiRequest(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => apiRequest(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: (path) => apiRequest(path, { method: 'DELETE' }),
};
