import React, { createContext, useContext, useEffect, useState } from 'react';
import { DemoNotice, useToast } from '../../components/ui/Toast';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import Modal from '../../components/ui/Modal';
import { Input } from '../../components/forms/Fields';
import StatCard from '../../components/dashboard/StatCard';
import EmptyState from '../../components/ui/States';
import { NotificationList, ChartCard } from '../dashboard/DashboardData';
import { clearDemoData, restoreDemoData, isDemoCleared, getAdminOverview } from '../../services/adminService';
import { auth, isFirebaseEnabled } from '../../services/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth';
import { RequestsTab, ApplicationsTab } from './AdminTables';
import { DeploymentsTab, JobsTab, EmployeesTab } from './AdminOps';

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'requests', label: 'Requests' },
  { key: 'applications', label: 'Applications' },
  { key: 'deployments', label: 'Deployments' },
  { key: 'employees', label: 'Employees' },
  { key: 'jobs', label: 'Job Posts' },
];

const AUTH_KEY = 'aeye.admin.auth';
const DEMO_PASSCODE = 'aeye-admin';

/* The console header needs to know which mode it runs in: the demo passcode
   gate offers the wipe/restore tools, the Firebase gate offers sign-out. */
const SessionContext = createContext({ mode: 'demo', user: null, signOut: () => {} });
const useSession = () => useContext(SessionContext);

const ERR_STYLE = { color: 'var(--c-danger, #F72585)', fontSize: 'var(--text-sm)', marginTop: '0.5rem' };

/** Sign-in gate — Firebase Auth when configured, demo passcode otherwise. */
function Gate({ children }) {
  return isFirebaseEnabled ? <FirebaseGate>{children}</FirebaseGate> : <DemoGate>{children}</DemoGate>;
}

/* ---------- Firebase mode: real email + password sign-in ---------- */
function FirebaseGate({ children }) {
  const [user, setUser] = useState(undefined); // undefined = still checking
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!auth) return undefined;
    return onAuthStateChanged(auth, (u) => setUser(u || null));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pw);
    } catch (ex) {
      const bad = ['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found', 'auth/invalid-email'];
      setErr(bad.includes(ex?.code) ? 'Incorrect email or password.' : ex?.message || 'Sign-in failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (user === undefined) {
    return (
      <div className="dashboard-shell">
        <div className="container" style={{ maxWidth: 480, paddingTop: 'var(--space-6)' }}>
          <div className="card dash-section">
            <div className="dash-section-head">
              <h2 className="dash-section-title">Checking your session…</h2>
              <Badge variant="brand">Firebase</Badge>
            </div>
            <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>
              Connecting to Firebase Authentication.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard-shell">
        <div className="container" style={{ maxWidth: 480, paddingTop: 'var(--space-6)' }}>
          <form className="card dash-section" aria-label="Admin sign in" onSubmit={submit}>
            <div className="dash-section-head">
              <h2 className="dash-section-title">Admin sign in</h2>
              <Badge variant="brand">Firebase</Badge>
            </div>
            <p className="muted" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
              The operations console is for A•EYE staff. Sign in with an account created in your Firebase
              project (Authentication → Users).
            </p>
            <Input
              type="email"
              placeholder="Email"
              aria-label="Admin email"
              autoComplete="username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErr('');
              }}
              aria-invalid={err ? 'true' : undefined}
            />
            <Input
              type="password"
              placeholder="Password"
              aria-label="Admin password"
              autoComplete="current-password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setErr('');
              }}
              aria-invalid={err ? 'true' : undefined}
            />
            {err && (
              <p role="alert" style={ERR_STYLE}>
                {err}
              </p>
            )}
            <Button type="submit" variant="primary" size="md" loading={busy} style={{ marginTop: 'var(--space-3)' }}>
              {!busy && <Icon name="lock" size={16} />} Enter console
            </Button>
            <p className="muted" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-3)' }}>
              Access is governed by <code>firestore.rules</code> — only signed-in staff can read or change
              operational data.
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <SessionContext.Provider value={{ mode: 'firebase', user, signOut: () => fbSignOut(auth).catch(() => {}) }}>
      {children}
    </SessionContext.Provider>
  );
}

/* ---------- Demo mode: the passcode gate (UI-only, no backend) ---------- */
function DemoGate({ children }) {
  const [ok, setOk] = useState(() => {
    try {
      return window.sessionStorage.getItem(AUTH_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');

  if (ok) {
    const signOut = () => {
      try {
        window.sessionStorage.removeItem(AUTH_KEY);
      } catch {
        /* ignore */
      }
      window.location.reload();
    };
    return (
      <SessionContext.Provider value={{ mode: 'demo', user: null, signOut }}>{children}</SessionContext.Provider>
    );
  }

  return (
    <div className="dashboard-shell">
      <div className="container" style={{ maxWidth: 480, paddingTop: 'var(--space-6)' }}>
        <form
          className="card dash-section"
          aria-label="Admin sign in"
          onSubmit={(e) => {
            e.preventDefault();
            if (pw === DEMO_PASSCODE) {
              try {
                window.sessionStorage.setItem(AUTH_KEY, '1');
              } catch {
                /* ignore */
              }
              setOk(true);
            } else {
              setErr('Incorrect passcode. For this demo, use: aeye-admin');
            }
          }}
        >
          <div className="dash-section-head">
            <h2 className="dash-section-title">Admin sign in</h2>
            <Badge variant="amber">Demo</Badge>
          </div>
          <p className="muted" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)' }}>
            The operations console is for A•EYE staff. Sign in to manage requests,
            applications, deployments and job posts.
          </p>
          <Input
            type="password"
            placeholder="Passcode"
            aria-label="Admin passcode"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              setErr('');
            }}
            aria-invalid={err ? 'true' : undefined}
          />
          {err && (
            <p role="alert" style={{ color: 'var(--c-danger, #F72585)', fontSize: 'var(--text-sm)', marginTop: '0.5rem' }}>
              {err}
            </p>
          )}
          <Button type="submit" variant="primary" size="md" style={{ marginTop: 'var(--space-3)' }}>
            <Icon name="lock" size={16} /> Enter console
          </Button>
          <p className="muted" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-3)' }}>
            Demo passcode: <code>aeye-admin</code> — real authentication arrives with the backend.
          </p>
        </form>
      </div>
    </div>
  );
}

/**
 * ADMIN operations console.
 * Manages everything the public site collects: client requests, job
 * applications, deployments and job posts. Runs in two modes — the
 * localStorage demo store, or live Firestore once Firebase is configured.
 */
export default function Admin() {
  const [tab, setTab] = useState('overview');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const toast = useToast();
  const { mode, user, signOut } = useSession();
  const demoMode = mode === 'demo';
  const cleared = isDemoCleared();

  /** Permanently wipe every record (localStorage demo store or Firestore). */
  const deleteAll = async () => {
    setConfirmDelete(false);
    setBusy(true);
    try {
      await clearDemoData();
      toast.success('All data deleted', 'Every record and admin change was wiped. The console now starts empty.');
      setTimeout(() => window.location.reload(), 900);
    } catch (err) {
      toast.error('Delete failed', err?.message || 'Please try again.');
    } finally {
      setBusy(false);
    }
  };

  /** Bring the sample records back after "Delete all data". */
  const restoreDemo = async () => {
    setBusy(true);
    try {
      const res = await restoreDemoData();
      toast.success(
        res.mode === 'demo' ? 'Demo data restored' : 'Sample data seeded',
        res.mode === 'demo' ? 'The sample records are back.' : `Wrote ${res.seeded} sample records to Firestore.`
      );
      setTimeout(() => window.location.reload(), 900);
    } catch (err) {
      toast.error('Restore failed', err?.message || 'Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Gate>
      <div className="dashboard-shell">
        <div className="container">
          {/* Prototype data controls + session actions, pinned to the very top */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 'var(--space-2)',
              paddingTop: 'var(--space-3)',
              flexWrap: 'wrap',
            }}
          >
            {!demoMode && user && (
              <span className="muted" style={{ fontSize: 'var(--text-xs)' }}>
                {user.email}
              </span>
            )}
            {(demoMode ? cleared : true) && (
              <Button variant="outline" size="sm" onClick={restoreDemo} disabled={busy}>
                <Icon name="layers" size={14} /> {demoMode ? 'Restore demo data' : 'Seed sample data'}
              </Button>
            )}
            <Button variant="danger" size="sm" onClick={() => setConfirmDelete(true)} disabled={busy}>
              <Icon name="trash" size={14} /> Delete all data
            </Button>
            <Button variant="outline" size="sm" onClick={signOut} disabled={busy}>
              <Icon name="lock" size={14} /> Sign out
            </Button>
          </div>


          <div className="dash-top">
            <div>
              <h1 className="dash-title">Admin Console</h1>
              <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>
                A•EYE Operations · staff view {demoMode ? '(demo — this browser)' : '(live — Firebase)'}
              </p>
            </div>
            <div className="dash-tabs" role="tablist" aria-label="Admin sections" style={{ flexWrap: 'wrap' }}>
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.key}
                  className={`dash-tab ${tab === t.key ? 'active' : ''}`.trim()}
                  onClick={() => setTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {demoMode ? (
            <DemoNotice>
              Demo mode — no Firebase keys found. Status changes are saved only in this browser
              (localStorage) so you can explore the full workflow. Add the VITE_FIREBASE_* keys from
              .env.example to switch to Firestore.
            </DemoNotice>
          ) : (
            <DemoNotice>
              Connected to Firebase. Requests, applications, job-post status, the careers switch and the
              audit trail live in Firestore, shared by every signed-in admin. Deployments and the employee
              roster are still seeded samples from src/data/admin.js.
            </DemoNotice>
          )}

          {tab === 'overview' && <Overview />}
          {tab === 'requests' && <RequestsTab />}
          {tab === 'applications' && <ApplicationsTab />}
          {tab === 'deployments' && <DeploymentsTab />}
          {tab === 'employees' && <EmployeesTab />}
          {tab === 'jobs' && <JobsTab />}

          {/* Confirmation before permanently deleting all data */}
          <Modal
            open={confirmDelete}
            onClose={() => setConfirmDelete(false)}
            title="Delete all data"
            footer={
              <>
                <Button variant="outline" size="sm" onClick={() => setConfirmDelete(false)}>
                  Cancel
                </Button>
                <Button variant="danger" size="sm" loading={busy} onClick={deleteAll}>
                  <Icon name="trash" size={14} /> Delete all data
                </Button>
              </>
            }
          >
            <p style={{ fontSize: 'var(--text-sm)' }}>
              This will <strong>permanently delete every record</strong>
              {demoMode
                ? ' saved in this browser — every client request, application, deployment, job post and admin change.'
                : ' in Firestore — every client request, application, job-post status, the careers switch and the audit trail.'}{' '}
              This cannot be undone.
            </p>
            <p className="muted" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-2)' }}>
              {demoMode
                ? 'The sample records can be re-shown afterwards with “Restore demo data”, but your submissions and admin changes are gone for good.'
                : '“Seed sample data” can write the sample records in again, but real submissions and admin changes are gone for good.'}
            </p>
          </Modal>
        </div>
      </div>
    </Gate>
  );
}

function Overview() {
  const { mode } = useSession();
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    let live = true;
    getAdminOverview()
      .then((d) => {
        if (live) setData(d);
      })
      .catch((e) => {
        if (live) setErr(e?.message || 'Could not load the overview.');
      });
    return () => {
      live = false;
    };
  }, []);

  if (err) {
    return (
      <div className="card dash-section">
        <EmptyState icon="alert" title="Could not load the overview" sub={err} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="card dash-section">
        <EmptyState icon="layers" title="Loading…" sub="Fetching the latest figures." />
      </div>
    );
  }

  // "Delete all data" (or a brand-new Firebase project): nothing to report —
  // no stat cards, no chart and no action queue. The console starts empty.
  if (data.stats.length === 0) {
    return (
      <div className="card dash-section">
        <EmptyState
          icon="layers"
          title="No data yet"
          sub={
            mode === 'demo'
              ? 'All demo data was deleted. Bring the samples back with “Restore demo data” (top right), or work through the Requests and Applications pipelines.'
              : 'Nothing has been submitted yet. Send a test request or application from the public site and it will appear here.'
          }
        />
      </div>
    );
  }

  const weekTotal = data.chart.reduce((sum, d) => sum + d.value, 0);

  return (
    <>
      <div className="stat-grid">
        {data.stats.map((s) => (
          <StatCard key={s.key} title={s.label} value={s.value} icon={s.icon} variant={s.variant} trend={s.trend} note={s.note} />
        ))}
      </div>
      <div className="dash-grid" style={{ marginTop: 'var(--space-4)' }}>
        <div className="card dash-section">
          <div className="dash-section-head">
            <h2 className="dash-section-title">Applications this week</h2>
            <span className="badge badge-brand">{weekTotal} this week</span>
          </div>
          {weekTotal === 0 ? (
            <EmptyState icon="trendingUp" title="No applications this week" sub="New applications will show up here." />
          ) : (
            <ChartCard data={data.chart} />
          )}
        </div>
        {data.notifications.length === 0 ? (
          <div className="card dash-section">
            <EmptyState icon="checkCircle" title="Nothing needs action" sub="The queue is clear — review the Requests and Applications tabs." />
          </div>
        ) : (
          <NotificationList items={data.notifications} title="Action queue" />
        )}
      </div>
    </>
  );
}

