import { delay, storage, KEYS } from './api';

/* ============================================================
   Client request service.
   ============================================================ */

const REQ_STATUS = ['Received', 'Under Review'];

function makeReference() {
  const n = 1050 + Math.floor(Math.random() * 9000);
  return `RQ-${n}`;
}

/**
 * Submit a request for security personnel.
 * @param {object} payload  normalised request data
 * @returns {Promise<object>} { ref, submittedAt, status }
 */
export async function submitRequest(payload) {
  // DEMO: simulate network + (eventually) server-side persistence.
  await delay(900);

  const record = {
    id: makeReference(),
    status: 'Received',
    ...payload,
    submittedAt: new Date().toISOString(),
  };

  const existing = storage.get(KEYS.REQUESTS) || [];
  existing.push(record);
  storage.set(KEYS.REQUESTS, existing);

  return { ref: record.id, submittedAt: record.submittedAt, status: record.status };
}

/**
 * List requests the client submitted during this browser session.
 * Combined with canned demo rows for a realistic dashboard.
 */
export async function listRequests() {
  await delay();
  return storage.get(KEYS.REQUESTS) || [];
}

/**
 * Simulated server failure — used to demonstrate the error state UI.
 */
export async function requestThatFails() {
  await delay(700, { fail: true });
  return null;
}