import { delay, storage, KEYS } from './api';
import { db, isFirebaseEnabled } from './firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { requests as cannedRequests } from '../data/dashboard';
import {
  cannedApplications,
  deployments,
  JOB_STATUS_SEED,
  APPLICANT_COUNTS,
  personnel,
  adminStats,
  adminNotifications,
  applicationVolume,
} from '../data/admin';
import { jobs } from '../data/jobs';
import { REQUEST_STATUSES, APPLICATION_STAGES, nextStage } from '../data/statuses';

/* ============================================================
   ADMIN service.
   DUAL MODE:
   - Firebase configured → live data from Firestore: requests,
     applications, job-post overrides, the careers switch and the
     audit trail. Admin writes require a signed-in user (see
     firestore.rules).
   - Otherwise → canned demo data + localStorage demo store,
     exactly as before.
   ============================================================ */

const K = {
  REQUEST_STATUS: 'aeye.admin.requestStatus',
  APP_STAGE: 'aeye.admin.appStage',
  JOB_STATUS: 'aeye.admin.jobStatus',
  JOB_DELETED: 'aeye.admin.jobDeleted',
  CAREERS: 'aeye.admin.careers',
  ASSIGN: 'aeye.admin.assign',
  AUDIT: 'aeye.admin.audit',
};

function overrides(key) {
  return storage.get(key) || {};
}

/**
 * True once "Delete all data" wiped the demo store. While it is set, the
 * canned sample records stay hidden everywhere and only data submitted
 * in this browser is shown — so deleted data is never re-added.
 * (Demo mode only — with Firebase the real collections are the source.)
 */
export function isDemoCleared() {
  return !isFirebaseEnabled && storage.get(KEYS.DEMO_CLEARED) === true;
}

/* ---------------- Firestore helpers (Firebase mode) ---------------- */

/** Firestore Timestamp | ISO string → ISO string. */
const tsToISO = (v) =>
  v?.toDate ? v.toDate().toISOString() : typeof v === 'string' ? v : new Date().toISOString();

/** Append to the audit trail (same record shape the future DB needs). */
async function fbAudit(entity, id, from, to) {
  await addDoc(collection(db, 'audit'), {
    entity,
    id: String(id),
    from: from || null,
    to,
    at: new Date().toISOString(),
    actor: 'admin',
  });
}

/* ---------------- Audit trail ---------------- */

/** Audit history for one record, newest first. */
export async function getAudit(id) {
  if (isFirebaseEnabled) {
    const snap = await getDocs(query(collection(db, 'audit'), where('id', '==', String(id))));
    return snap.docs
      .map((d) => d.data())
      .sort((a, b) => new Date(b.at) - new Date(a.at));
  }
  await delay(120);
  return (storage.get(K.AUDIT) || []).filter((h) => h.id === id);
}

/* ---------------- Requests ---------------- */

/** Shape a raw submitted-request record into a table row. */
function submittedRequestRow(r) {
  return {
    id: r.id,
    service: r.service || 'Security personnel',
    site: r.siteType || 'Client site',
    city: r.city || '—',
    guards: r.headcount || 1,
    start: r.startDate || 'TBD',
    status: r.status === 'Received' ? 'New' : r.status || 'New',
    officer: r.officer || '—',
    daysAgo: r.submittedAt
      ? Math.max(0, Math.round((Date.now() - new Date(tsToISO(r.submittedAt)).getTime()) / 86400000))
      : 0,
    submitted: true,
  };
}

/**
 * All staffing requests. SINGLE source the client dashboard also
 * reads, so both views always agree on status.
 */
export async function listAdminRequests() {
  if (isFirebaseEnabled) {
    const snap = await getDocs(query(collection(db, 'requests'), orderBy('submittedAt', 'desc')));
    return snap.docs.map((d) => submittedRequestRow({ id: d.id, ...d.data() }));
  }
  await delay();
  const mine = (storage.get(KEYS.REQUESTS) || []).map(submittedRequestRow);
  // "Delete all data": canned demo rows stay hidden until "Restore demo data".
  if (isDemoCleared()) return mine;
  const statusMap = overrides(K.REQUEST_STATUS);
  const assignMap = overrides(K.ASSIGN);
  const canned = cannedRequests.map((r) => ({
    ...r,
    status: statusMap[r.id] || r.status,
    officer: assignMap[r.id] || r.officer || '—',
  }));
  return [...mine, ...canned];
}

/** Allowed next pipeline statuses for a request (forward-only). */
export const nextRequestStatuses = (current) => nextStage(REQUEST_STATUSES, current);

/** Move a request to a new pipeline stage (forward-only, audited). */
export async function setRequestStatus(id, status) {
  if (isFirebaseEnabled) {
    const ref = doc(db, 'requests', String(id));
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error(`Unknown request: ${id}`);
    const d = snap.data();
    const current = d.status === 'Received' ? 'New' : d.status || 'New';
    if (!nextStage(REQUEST_STATUSES, current).includes(status)) {
      throw new Error(`Invalid status move: ${current} → ${status}`);
    }
    await delay(300);
    await updateDoc(ref, { status });
    await fbAudit('request', id, current, status);
    return { id, status };
  }
  await delay(300);
  const map = overrides(K.REQUEST_STATUS);
  const current = map[id] || cannedRequests.find((r) => r.id === id)?.status || 'New';
  map[id] = status;
  storage.set(K.REQUEST_STATUS, map);
  logChange('request', id, current, status);
  return { id, status };
}

/** Assign an officer to a request; moves it to "Assigned" (audited). */
export async function assignRequest(id, officer) {
  if (isFirebaseEnabled) {
    const ref = doc(db, 'requests', String(id));
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error(`Unknown request: ${id}`);
    const d = snap.data();
    const current = d.status === 'Received' ? 'New' : d.status || 'New';
    await delay(300);
    await updateDoc(ref, { officer, status: 'Assigned' });
    await fbAudit('request', id, current, `Assigned → ${officer}`);
    return { id, officer, status: 'Assigned' };
  }
  await delay(300);
  const map = overrides(K.ASSIGN);
  const current = overrides(K.REQUEST_STATUS)[id] || cannedRequests.find((r) => r.id === id)?.status || 'New';
  map[id] = officer;
  storage.set(K.ASSIGN, map);
  const statusMap = overrides(K.REQUEST_STATUS);
  statusMap[id] = 'Assigned';
  storage.set(K.REQUEST_STATUS, statusMap);
  logChange('request', id, current, `Assigned → ${officer}`);
  return { id, officer, status: 'Assigned' };
}

/* ---------------- Applications ---------------- */

function applicationRow(a) {
  const stage = overrides(K.APP_STAGE)[a.id] || a.status || 'Submitted';
  return {
    id: a.id,
    name: `${a.firstName || 'Demo'} ${a.lastName || 'Applicant'}`.trim(),
    jobTitle: a.jobTitle || '—',
    stage,
    email: a.email || '—',
    phone: a.phone || '—',
    city: a.city || '—',
    experience: a.experience || '—',
    resumeFileName: a.resumeFileName || null,
    daysAgo: a.submittedAt ? Math.max(0, Math.round((Date.now() - new Date(tsToISO(a.submittedAt)).getTime()) / 86400000)) : 0,
    note: 'Submitted via the public apply form in this browser.',
  };
}

/** All job applications. */
export async function listApplications() {
  if (isFirebaseEnabled) {
    const snap = await getDocs(query(collection(db, 'applications'), orderBy('submittedAt', 'desc')));
    return snap.docs.map((d) => applicationRow({ status: 'Submitted', ...d.data(), id: d.id }));
  }
  await delay();
  const mine = (storage.get(KEYS.APPLICATIONS) || []).map(applicationRow);
  // "Delete all data": canned demo rows stay hidden until "Restore demo data".
  if (isDemoCleared()) return mine;
  const stageMap = overrides(K.APP_STAGE);
  const canned = cannedApplications.map((a) => ({
    ...a,
    stage: stageMap[a.id] || a.stage,
  }));
  return [...mine, ...canned];
}

/**
 * Move an application to a new stage (forward-only, or the reject
 * branch 'Not Selected' from any active stage).
 */
export async function setApplicationStage(id, stage) {
  if (isFirebaseEnabled) {
    const ref = doc(db, 'applications', String(id));
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error(`Unknown application: ${id}`);
    const current = snap.data().status || 'Submitted';
    const allowed = [...nextStage(APPLICATION_STAGES, current), 'Not Selected'];
    if (!allowed.includes(stage)) {
      throw new Error(`Invalid stage move: ${current} → ${stage}`);
    }
    await delay(300);
    await updateDoc(ref, { status: stage });
    await fbAudit('application', id, current, stage);
    return { id, stage };
  }
  await delay(300);
  const stageMap = overrides(K.APP_STAGE);
  const current = stageMap[id] || cannedApplications.find((a) => a.id === id)?.stage || 'Submitted';
  const allowed = [...nextStage(APPLICATION_STAGES, current), 'Not Selected'];
  if (!allowed.includes(stage)) {
    throw new Error(`Invalid stage move: ${current} → ${stage}`);
  }
  stageMap[id] = stage;
  storage.set(K.APP_STAGE, stageMap);
  logChange('application', id, current, stage);
  return { id, stage };
}

/** Next stage a candidate may be advanced to (reject is a separate action). */
export const nextApplicationStages = (current) =>
  nextStage(APPLICATION_STAGES, current).filter((s) => s !== 'Not Selected');

/* ---------------- Deployments ---------------- */

/** Deployment board rows (demo static for now — seed a collection later). */
export async function listDeployments() {
  await delay();
  if (isDemoCleared()) return []; // "Delete all data": board starts empty
  return deployments;
}

/* ---------------- Employees ---------------- */

/** Employee roster (demo static for now — seed a collection later). */
export async function listEmployees() {
  await delay();
  if (isDemoCleared()) return []; // "Delete all data": roster starts empty
  return personnel;
}

/* ---------------- Job posts ---------------- */

/**
 * Job posts merged with admin-set publish status + applicant counts.
 * Firebase mode stores per-post overrides in `jobPosts/<id>`; the
 * base listing still comes from the seeded jobs data.
 */
export async function listJobPosts() {
  if (isFirebaseEnabled) {
    const snap = await getDocs(collection(db, 'jobPosts'));
    const map = {};
    snap.forEach((d) => {
      map[d.id] = d.data();
    });
    return jobs
      .filter((j) => !map[j.id]?.deleted)
      .map((j) => ({
        ...j,
        postStatus: map[j.id]?.postStatus || JOB_STATUS_SEED[j.id] || 'Draft',
        applicants: APPLICANT_COUNTS[j.id] ?? 0,
      }));
  }
  await delay();
  if (isDemoCleared()) return []; // "Delete all data": no posts until restored
  const statusMap = { ...JOB_STATUS_SEED, ...overrides(K.JOB_STATUS) };
  const deleted = deletedIds();
  return jobs
    .filter((j) => !deleted[j.id])
    .map((j) => ({
      ...j,
      postStatus: statusMap[j.id] || 'Draft',
      applicants: APPLICANT_COUNTS[j.id] ?? 0,
    }));
}

/** Publish / unpublish / close a job post (audited). */
export async function setJobPostStatus(id, postStatus) {
  if (isFirebaseEnabled) {
    const current =
      (await getDoc(doc(db, 'jobPosts', String(id)))).data()?.postStatus ||
      JOB_STATUS_SEED[id] ||
      'Draft';
    await delay(300);
    await setDoc(doc(db, 'jobPosts', String(id)), { postStatus }, { merge: true });
    await fbAudit('job', String(id), current, postStatus);
    return { id, postStatus };
  }
  await delay(300);
  const map = overrides(K.JOB_STATUS);
  const current = map[id] || JOB_STATUS_SEED[id] || 'Draft';
  map[id] = postStatus;
  storage.set(K.JOB_STATUS, map);
  logChange('job', String(id), current, postStatus);
  return { id, postStatus };
}

/** Job posts the admin has deleted (hidden from the manager). */
function deletedIds() {
  return overrides(K.JOB_DELETED);
}

/* ---------------- Careers master switch ---------------- */

/**
 * Public careers feature switch. OFF → /careers shows "coming soon".
 */
export async function getCareersEnabled() {
  if (isFirebaseEnabled) {
    const snap = await getDoc(doc(db, 'settings', 'careers'));
    return snap.exists() ? snap.data().enabled === true : false;
  }
  await delay(120);
  return storage.get(K.CAREERS) === true;
}

export async function setCareersEnabled(on) {
  if (isFirebaseEnabled) {
    await delay(200);
    const current = (await getDoc(doc(db, 'settings', 'careers'))).data()?.enabled === true;
    await setDoc(doc(db, 'settings', 'careers'), { enabled: Boolean(on) }, { merge: true });
    await fbAudit('careers', 'public-page', current ? 'On' : 'Off', on ? 'On' : 'Off');
    return on;
  }
  await delay(200);
  storage.set(K.CAREERS, Boolean(on));
  logChange('careers', 'public-page', on ? 'Off' : 'On', on ? 'On' : 'Off');
  return on;
}

/** Permanently remove a job post from the manager (audited). */
export async function deleteJobPost(id) {
  if (isFirebaseEnabled) {
    const status =
      (await getDoc(doc(db, 'jobPosts', String(id)))).data()?.postStatus ||
      JOB_STATUS_SEED[id] ||
      'Draft';
    await delay(300);
    await setDoc(doc(db, 'jobPosts', String(id)), { deleted: true }, { merge: true });
    await fbAudit('job', String(id), status, 'Deleted');
    return { id, deleted: true };
  }
  await delay(300);
  const deleted = deletedIds();
  deleted[id] = true;
  storage.set(K.JOB_DELETED, deleted);
  const status = overrides(K.JOB_STATUS)[id] || JOB_STATUS_SEED[id] || 'Draft';
  logChange('job', String(id), status, 'Deleted');
  return { id, deleted: true };
}

/** Undo a delete — returns the post to Draft (audited). */
export async function restoreJobPost(id) {
  if (isFirebaseEnabled) {
    await delay(300);
    await setDoc(doc(db, 'jobPosts', String(id)), { postStatus: 'Draft', deleted: false }, { merge: true });
    await fbAudit('job', String(id), 'Deleted', 'Draft (restored)');
    return { id, postStatus: 'Draft' };
  }
  await delay(300);
  const deleted = deletedIds();
  delete deleted[id];
  storage.set(K.JOB_DELETED, deleted);
  const map = overrides(K.JOB_STATUS);
  map[id] = 'Draft';
  storage.set(K.JOB_STATUS, map);
  logChange('job', String(id), 'Deleted', 'Draft (restored)');
  return { id, postStatus: 'Draft' };
}

/* ---------------- Demo-mode audit log ---------------- */

/** Demo audit trail: every admin change is appended to localStorage. */
function logChange(entity, id, from, to) {
  const log = storage.get(K.AUDIT) || [];
  log.unshift({ entity, id, from: from || null, to, at: new Date().toISOString(), actor: 'admin (demo)' });
  storage.set(K.AUDIT, log.slice(0, 200));
}

/* ---------------- Overview (live stats in Firebase mode) ---------------- */

/**
 * Everything the Admin → Overview tab renders: stat cards, the weekly
 * applications chart and the action queue. Demo mode returns the canned
 * content; Firebase mode computes it from the real collections.
 */
export async function getAdminOverview() {
  if (!isFirebaseEnabled) {
    await delay();
    // After "Delete all data" there is nothing to show: no stat cards, no
    // chart and no action queue — the console starts completely empty.
    if (isDemoCleared()) return { stats: [], chart: [], notifications: [], appsTotal: 0 };
    return { stats: adminStats, chart: applicationVolume, notifications: adminNotifications, appsTotal: 41 };
  }

  const [reqSnap, appSnap, jobSnap] = await Promise.all([
    getDocs(collection(db, 'requests')),
    getDocs(collection(db, 'applications')),
    getDocs(collection(db, 'jobPosts')),
  ]);

  const requests = reqSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
  const apps = appSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
  const jobDocs = {};
  jobSnap.forEach((d) => {
    jobDocs[d.id] = d.data();
  });

  const statusOf = (r) => (r.status === 'Received' ? 'New' : r.status || 'New');

  // Nothing submitted yet (a fresh project, or right after "Delete all data"):
  // keep the Overview completely empty instead of showing a row of zeros.
  if (requests.length === 0 && apps.length === 0) {
    return { stats: [], chart: [], notifications: [], appsTotal: 0 };
  }

  const newRequests = requests.filter((r) => statusOf(r) === 'New').length;
  const openApps = apps.filter((a) => !['Hired', 'Not Selected'].includes(a.status || 'Submitted')).length;
  const deployed = personnel.filter((p) => p.status === 'On Duty').length;
  const drafts = jobs.filter((j) => {
    if (jobDocs[j.id]?.deleted) return false;
    return (jobDocs[j.id]?.postStatus || JOB_STATUS_SEED[j.id] || 'Draft') === 'Draft';
  }).length;

  const stats = [
    { key: 'newRequests', label: 'New Requests', value: String(newRequests), icon: 'clipboard', variant: 'amber', trend: { dir: 'up', text: 'live data' } },
    { key: 'applications', label: 'Open Applications', value: String(openApps), icon: 'userCheck', variant: 'blue', trend: { dir: 'up', text: 'live data' } },
    { key: 'deployed', label: 'Staff Deployed', value: String(deployed), icon: 'shield', variant: 'green', note: 'on duty now' },
    { key: 'jobPosts', label: 'Job Posts — Draft', value: String(drafts), icon: 'briefcase', variant: 'navy', trend: { dir: 'flat', text: 'careers launch pending' } },
  ];

  // Applications per weekday (last 7 days), Mon → Sun like the demo chart.
  const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const buckets = names.map((label) => ({ label, value: 0 }));
  const now = Date.now();
  apps.forEach((a) => {
    const t = a.submittedAt?.toDate
      ? a.submittedAt.toDate().getTime()
      : typeof a.submittedAt === 'string'
        ? new Date(a.submittedAt).getTime()
        : 0;
    if (t && now - t <= 7 * 86400000) buckets[new Date(t).getDay()].value += 1;
  });
  const chart = [1, 2, 3, 4, 5, 6, 0].map((i) => buckets[i]);

  const notifications = [];
  requests
    .filter((r) => statusOf(r) === 'New')
    .slice(0, 3)
    .forEach((r) => notifications.push({ type: 'danger', text: `${r.id} — ${r.service || 'New request'} needs review.`, time: 'recent' }));
  apps
    .filter((a) => (a.status || 'Submitted') === 'Submitted')
    .slice(0, 3)
    .forEach((a) => notifications.push({ type: 'amber', text: `${a.id} applied for ${a.jobTitle || 'a role'} — screen the application.`, time: 'recent' }));

  return { stats, chart, notifications, appsTotal: apps.length };
}

/* ---------------- Demo / sample data controls ---------------- */

/**
 * "Delete all data".
 * Demo mode: wipe every demo store (aeye.*) and remember the wipe so the
 * canned samples are NOT re-added. Firebase mode: wipe the user-generated
 * collections and admin overrides from Firestore instead.
 */
export async function clearDemoData() {
  if (isFirebaseEnabled) {
    for (const name of ['requests', 'applications', 'audit', 'jobPosts']) {
      const snap = await getDocs(collection(db, name));
      await Promise.all(snap.docs.map((d) => deleteDoc(d.ref)));
    }
    await setDoc(doc(db, 'settings', 'careers'), { enabled: false }, { merge: true });
    return;
  }

  const known = Object.values(K).concat([KEYS.REQUESTS, KEYS.APPLICATIONS]);
  known.forEach((k) => storage.remove(k));
  try {
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith('aeye.') && !known.includes(k))
      .forEach((k) => storage.remove(k));
  } catch {
    /* ignore */
  }
  // Remember the wipe (this flag survives it) so the canned demo records
  // are NOT re-added on the next load. "Restore demo data" clears it.
  storage.set(KEYS.DEMO_CLEARED, true);
}

/** Pipeline-safe copy of a canned row (the demo "Follow-up" is not a pipeline status). */
function seededStatus(status) {
  return REQUEST_STATUSES.includes(status) ? status : 'Under Review';
}

/**
 * "Restore demo data" / "Seed sample data".
 * Demo mode: simply un-hide the canned records (they were never deleted).
 * Firebase mode: write those same sample records into Firestore so a fresh
 * project can be explored with realistic content, and switch the Careers page
 * on. Returns { mode, seeded } so the UI can confirm what happened.
 */
export async function restoreDemoData() {
  if (!isFirebaseEnabled) {
    storage.remove(KEYS.DEMO_CLEARED);
    return { mode: 'demo', seeded: 0 };
  }

  const now = Date.now();
  const at = (daysAgo) => new Date(now - (daysAgo || 0) * 86400000).toISOString();

  const requests = cannedRequests.map((r) =>
    setDoc(doc(db, 'requests', r.id), {
      id: r.id,
      service: r.service,
      siteType: r.site,
      city: r.city,
      headcount: r.guards,
      startDate: r.start,
      status: seededStatus(r.status),
      officer: r.officer,
      submittedAt: at(r.daysAgo),
      sample: true,
    })
  );

  const applications = cannedApplications.map((a) => {
    const [firstName, ...rest] = String(a.name).split(' ');
    return setDoc(doc(db, 'applications', a.id), {
      id: a.id,
      firstName,
      lastName: rest.join(' '),
      jobTitle: a.jobTitle,
      status: a.stage,
      email: a.email,
      phone: a.phone,
      city: a.city,
      experience: a.experience,
      resumeFileName: a.resumeFileName,
      resumeUrl: null,
      note: a.note,
      submittedAt: at(a.daysAgo),
      sample: true,
    });
  });

  await Promise.all([...requests, ...applications]);

  // Publish the first few job posts + switch Careers on, so the public
  // careers journey (/careers → /apply/:id → /track) is explorable.
  await Promise.all(
    jobs.slice(0, 4).map((j) => setDoc(doc(db, 'jobPosts', String(j.id)), { postStatus: 'Published' }, { merge: true }))
  );
  await setDoc(doc(db, 'settings', 'careers'), { enabled: true }, { merge: true });

  return { mode: 'firebase', seeded: requests.length + applications.length };
}
