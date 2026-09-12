import { delay, storage, KEYS } from './api';

/* ============================================================
   Job application service.
   ============================================================ */

const MILESTONES = [
  { key: 'submitted', label: 'Application received', hint: 'Our talent desk confirms receipt of your application.' },
  { key: 'review', label: 'Under review', hint: 'Our recruiters screen applications against the role requirements.' },
  { key: 'interview', label: 'Interview scheduled', hint: 'Shortlisted candidates are invited for a screening interview.' },
  { key: 'background', label: 'Background check', hint: 'We verify credentials, licenses and character references.' },
  { key: 'decision', label: 'Final decision', hint: 'Approved candidates are hired; others are kept in our talent pool.' },
];

export { MILESTONES };

function makeReference() {
  const n = 3000 + Math.floor(Math.random() * 90000);
  return `APP-${n}`;
}

/**
 * Persist a job application submitted through the apply form.
 * @returns {Promise<{ref, status, submittedAt, milestones}>}
 */
export async function submitApplication(payload) {
  // DEMO: simulate network + client-side persistence.
  await delay(1000);

  const record = {
    id: makeReference(),
    status: 'Submitted',
    submittedAt: new Date().toISOString(),
    ...payload,
  };

  const existing = storage.get(KEYS.APPLICATIONS) || [];
  existing.push(record);
  storage.set(KEYS.APPLICATIONS, existing);

  const ref = record.id;
  const milestones = MILESTONES.map((m) => ({
    ...m,
    status: m.key === 'submitted' ? 'done' : 'pending',
  }));

  return { ref, status: 'Submitted', submittedAt: record.submittedAt, milestones };
}

/**
 * Look up an application by its reference code.
 * Returns null when no reference matches.
 */
export async function lookupApplication(ref) {
  if (!ref) return null;
  await delay(650);

  const all = storage.get(KEYS.APPLICATIONS) || [];
  const found = all.find((a) => a.id === String(ref).trim().toUpperCase());

  if (!found) return null;

  // Simulated progression: recent applications advance over time.
  const stageIndex = Math.min(Date.now() - new Date(found.submittedAt).getTime() >= 60000 ? 2 : 1, MILESTONES.length - 1);
  const milestones = MILESTONES.map((m, i) => {
    if (i < stageIndex) return { ...m, status: 'done', date: found.submittedAt };
    if (i === stageIndex) return { ...m, status: 'active' };
    return { ...m, status: 'pending' };
  });

  return {
    ref: found.id,
    jobTitle: found.jobTitle,
    applicant: `${found.firstName} ${found.lastName}`,
    submittedAt: found.submittedAt,
    milestones,
  };
}

/**
 * A canned application used only by the DEMO status tracker so
 * visitors can try the feature without submitting a form first.
 */
export async function lookupDemoApplication() {
  await delay();
  const base = new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString();
  return {
    ref: 'DEMO-APP00',
    jobTitle: 'CCTV Control Room Operator',
    applicant: 'Demo Applicant',
    submittedAt: base,
    milestones: MILESTONES.map((m, i) => {
      if (i < 3) return { ...m, status: 'done', date: base };
      if (i === 3) return { ...m, status: 'active' };
      return { ...m, status: 'pending' };
    }),
  };
}