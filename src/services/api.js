/* ============================================================
   MOCK API layer.
   -----------------------------------------------------------------
   IMPORTANT
   This prototype has NO backend. All functions below simulate
   asynchronous network calls (latency + localStorage persistence)
   so the UI behaves like the real system will.

   To connect a real backend later:
     1. Keep the same function signatures used by the pages.
     2. Replace each `mockX` implementation with `fetch('/api/...')`.
     3. Delete or bypass `storage.js`.
   The pages (react UI) never touch localStorage or HTTP directly —
   they only talk to this layer.
   ============================================================ */

const DEFAULT_DELAY = 420; // ms of simulated network latency

/** Simulated network delay. Remove when replacing with real fetch(). */
export function delay(ms = DEFAULT_DELAY, { fail = false } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error('Simulated server failure for demo purposes'));
      else resolve(null);
    }, ms);
  });
}

/** In-memory cache so refresh keeps last-in-session state consistent. */
const mem = new Map();

export const storage = {
  /** Read a JSON value from localStorage (parsed). Returns null when absent. */
  get(key) {
    if (mem.has(key)) return mem.get(key);
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  /** Persist a JSON value to localStorage (demo-only persistence). */
  set(key, value) {
    mem.set(key, value);
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable — memory cache still works */
    }
  },
  remove(key) {
    mem.delete(key);
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

export const KEYS = {
  REQUESTS: 'aeye.requests',
  APPLICATIONS: 'aeye.applications',
};

/** Pick fields from an object (small helper to shape API responses). */
export const pick = (obj, keys) => Object.fromEntries(keys.map((k) => [k, obj[k]]));