// API utilities for Stranger frontend
// Uses VITE_BACKEND_URL as base. Provides simple helpers with retry and abort support.

const BASE_URL = import.meta.env.VITE_BACKEND_URL || ''

const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

async function request(path, { method = 'GET', headers = {}, body, retries = 1, signal } = {}) {
  const url = `${BASE_URL}${path}`
  const common = {
    method,
    headers: {
      Accept: 'application/json',
      ...headers,
    },
    body,
    signal,
    credentials: 'include',
  }
  try {
    const res = await fetch(url, common)
    if (!res.ok) {
      const text = await res.text()
      throw new Error(`${res.status}: ${text || res.statusText}`)
    }
    const ct = res.headers.get('content-type') || ''
    return ct.includes('application/json') ? res.json() : res.text()
  } catch (err) {
    if (retries > 0 && (err.name === 'TypeError' || `${err}`.includes('NetworkError'))) {
      await sleep(400)
      return request(path, { method, headers, body, retries: retries - 1, signal })
    }
    throw err
  }
}

// Feed
export const api = {
  getFeed: ({ cursor } = {}) => request(`/posts${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ''}`),
  likePost: (id) => request(`/posts/${id}/like`, { method: 'POST' }),
  createPost: (formData) => request('/posts', { method: 'POST', body: formData }),
  getExplore: () => request('/explore'),
  search: (q) => request(`/search?q=${encodeURIComponent(q)}`),
  getStories: () => request('/stories'),
  createStory: (formData) => request('/stories', { method: 'POST', body: formData }),
  getProfile: (username) => request(`/users/${encodeURIComponent(username)}`),
  getConversations: () => request('/conversations'),
  getMessages: (id) => request(`/conversations/${encodeURIComponent(id)}/messages`),
  sendMessage: (id, payload) => request(`/conversations/${encodeURIComponent(id)}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }),
}

export function connectWS(path, onMessage) {
  const url = (BASE_URL || window.location.origin).replace(/^http/, 'ws') + path
  const ws = new WebSocket(url)
  ws.addEventListener('message', (ev) => {
    try {
      const data = JSON.parse(ev.data)
      onMessage?.(data)
    } catch {
      // ignore
    }
  })
  return ws
}
