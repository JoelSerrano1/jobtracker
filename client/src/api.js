const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || `Request failed (${res.status})`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const listApplications = (status) =>
  request(`/applications${status ? `?status=${encodeURIComponent(status)}` : ''}`);

export const createApplication = (data) =>
  request('/applications', { method: 'POST', body: JSON.stringify(data) });

export const updateApplication = (id, data) =>
  request(`/applications/${id}`, { method: 'PATCH', body: JSON.stringify(data) });

export const deleteApplication = (id) =>
  request(`/applications/${id}`, { method: 'DELETE' });