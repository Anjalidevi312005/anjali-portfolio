// Thin API helper.
// - Dev: Vite proxies /api to the Express server (see vite.config.js).
// - Prod: set VITE_API_URL to your deployed backend URL (e.g. https://your-api.onrender.com/api).
const BASE = import.meta.env.VITE_API_URL || '/api';

export async function getProjects() {
  const res = await fetch(`${BASE}/projects`);
  if (!res.ok) throw new Error('Failed to load projects');
  return res.json();
}

export async function getSkills() {
  const res = await fetch(`${BASE}/skills`);
  if (!res.ok) throw new Error('Failed to load skills');
  return res.json();
}

export async function sendMessage(payload) {
  const res = await fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Failed to send message');
  return data;
}
