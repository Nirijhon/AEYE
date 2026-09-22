import React, { useEffect, useState } from 'react';
import DataTable from '../../components/dashboard/DataTable';
import Modal from '../../components/ui/Modal';
import Badge, { STATUS_TO_BADGE } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { useToast } from '../../components/ui/Toast';
import { Input } from '../../components/forms/Fields';
import StatCard from '../../components/dashboard/StatCard';
import { deploymentVolume } from '../../data/admin';
import { ChartCard } from '../dashboard/DashboardData';
import EmptyState from '../../components/ui/States';
import { listDeployments, listJobPosts, setJobPostStatus, deleteJobPost, getCareersEnabled, setCareersEnabled, listEmployees, isDemoCleared } from '../../services/adminService';
import { FilterChips } from './AdminTables';

/* =================== DEPLOYMENTS TAB =================== */

export function DeploymentsTab() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let live = true;
    listDeployments().then((d) => {
      if (live) {
        setRows(d);
        setLoading(false);
      }
    });
    return () => {
      live = false;
    };
  }, []);

  const onsite = rows.filter((r) => r.status === 'On Site').length;
  const scheduled = rows.filter((r) => r.status === 'Scheduled').length;
  const gaps = rows.filter((r) => r.status.includes('Gap')).length;

  const columns = [
    {
      key: 'officer',
      header: 'Officer / Team',
      render: (r) => <span className="cell-title">{r.officer}</span>,
    },
    { key: 'role', header: 'Assignment' },
    {
      key: 'site',
      header: 'Site',
      render: (r) => (
        <span>
          {r.site}
          <br />
          <span className="cell-muted">{r.city}</span>
        </span>
      ),
    },
    { key: 'shift', header: 'Shift', render: (r) => <span className="cell-muted">{r.shift}</span> },
    { key: 'until', header: 'Until' },
    { key: 'status', header: 'Status', render: (r) => <Badge variant={STATUS_TO_BADGE[r.status] || (r.status.includes('Gap') ? 'danger' : 'neutral')}>{r.status}</Badge> },
  ];

  return (
    <>
      <div className="stat-grid">
        <StatCard title="On Site Today" value={String(onsite)} icon="shield" variant="green" note="active posts" />
        <StatCard title="Scheduled" value={String(scheduled)} icon="calendar" variant="blue" note="upcoming deployments" />
        <StatCard title="Staffing Gaps" value={String(gaps)} icon="alert" variant="amber" note="need officers now" trend={{ dir: 'up', text: 'see Vista Tower' }} />
      </div>
      <div className="card dash-section" style={{ marginTop: 'var(--space-4)' }}>
        <div className="dash-section-head">
          <h2 className="dash-section-title">Deployment board</h2>
          <span className="badge badge-neutral">{rows.length} tracked</span>
        </div>
        <p className="muted" style={{ fontSize: 'var(--text-xs)', marginBottom: 'var(--space-3)' }}>
          Who is deployed where, shift schedules and coverage gaps (demo records).
        </p>
        <DataTable
          columns={columns}
          rows={rows}
          loading={loading}
          emptyTitle="No deployments tracked"
          emptySub="Assign personnel from the Requests pipeline to fill this board."
        />
      </div>
      {isDemoCleared() ? (
        <div className="card dash-section" style={{ marginTop: 'var(--space-4)' }}>
          <EmptyState
            icon="layers"
            title="No deployment activity"
            sub="The weekly volume chart appears once demo data is restored."
          />
        </div>
      ) : (
        <div className="card dash-section" style={{ marginTop: 'var(--space-4)' }}>
          <div className="dash-section-head">
            <h2 className="dash-section-title">Staff deployed this week</h2>
            <span className="badge badge-amber">Daily peak</span>
          </div>
          <ChartCard data={deploymentVolume} />
        </div>
      )}
    </>
  );
}

/* =================== EMPLOYEES TAB =================== */

const EMP_FILTERS = ['All', 'On Duty', 'Available', 'On Leave', 'Off Duty'];

export function EmployeesTab() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    let live = true;
    listEmployees().then((r) => {
      if (live) {
        setRows(r);
        setLoading(false);
      }
    });
    return () => {
      live = false;
    };
  }, []);

  const q = query.trim().toLowerCase();
  const visible = rows
    .filter((r) => filter === 'All' || r.status === filter)
    .filter((r) => !q || [r.id, r.name, r.role, r.city].join(' ').toLowerCase().includes(q));

  const onduty = rows.filter((r) => r.status === 'On Duty').length;
  const available = rows.filter((r) => r.status === 'Available').length;
  const away = rows.filter((r) => r.status === 'On Leave' || r.status === 'Off Duty').length;
  const expiringSoon = rows.filter(
    (r) => r.licenseExpiry !== '—' && /^(Aug|Sep|Oct) 2026$/.test(r.licenseExpiry)
  ).length;

  const columns = [
    { key: 'id', header: 'ID', render: (r) => <span className="cell-title">{r.id}</span> },
    {
      key: 'name',
      header: 'Employee',
      render: (r) => (
        <span>
          {r.name}
          <br />
          <span className="cell-muted">{r.phone}</span>
        </span>
      ),
    },
    { key: 'role', header: 'Role' },
    { key: 'city', header: 'Base city', render: (r) => <span className="cell-muted">{r.city}</span> },
    {
      key: 'license',
      header: 'License / Cert.',
      render: (r) => (
        <span>
          {r.license}
          <br />
          <span className="cell-muted">Exp: {r.licenseExpiry}</span>
        </span>
      ),
    },
    { key: 'site', header: 'Assigned site', render: (r) => <span className="cell-muted">{r.site}</span> },
    { key: 'status', header: 'Status', render: (r) => <Badge variant={STATUS_TO_BADGE[r.status] || 'neutral'}>{r.status}</Badge> },
    {
      key: 'actions',
      header: '',
      render: (r) => (
        <span className="table-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label={`View employee ${r.name}`}
            title="View"
            onClick={() => setDetail(r)}
          >
            <Icon name="user" size={16} />
          </button>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="stat-grid">
        <StatCard title="Total Employees" value={String(rows.length)} icon="users" variant="navy" note="active roster" />
        <StatCard title="On Duty" value={String(onduty)} icon="shield" variant="green" note="deployed now" />
        <StatCard title="Available" value={String(available)} icon="userCheck" variant="blue" note="ready to assign" />
        <StatCard title="Away" value={String(away)} icon="calendar" variant="amber" note="leave / off duty" trend={{ dir: 'down', text: `${expiringSoon} licenses expiring soon` }} />
      </div>

      <div className="card dash-section" style={{ marginTop: 'var(--space-4)' }}>
        <div className="dash-section-head">
          <h2 className="dash-section-title">Employee list</h2>
          <span className="badge badge-neutral">{rows.length} on roster</span>
        </div>
        <p className="muted" style={{ fontSize: 'var(--text-xs)', marginBottom: 'var(--space-3)' }}>
          Personnel roster with assignments, certifications and license expiries (demo records).
          These are the same people offered in the request-assignment picker.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
          <Input
            type="search"
            placeholder="Search name, role, city…"
            aria-label="Search employees"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ maxWidth: 300 }}
          />
          <FilterChips options={EMP_FILTERS} value={filter} onChange={setFilter} label="Filter employees by status" />
        </div>

        <div aria-live="polite">
          <DataTable
            columns={columns}
            rows={visible}
            loading={loading}
            emptyTitle="No employees match"
            emptySub="Try another filter or search term."
          />
        </div>
      </div>

      <Modal open={Boolean(detail)} onClose={() => setDetail(null)} title={detail ? detail.name : 'Employee'}>
        {detail && (
          <>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: 'var(--space-2)' }}>
              <Badge variant={STATUS_TO_BADGE[detail.status] || 'neutral'}>{detail.status}</Badge>
              <Badge variant="neutral">{detail.role}</Badge>
              <Badge variant="neutral">{detail.city}</Badge>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.35rem 0', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
              <span className="muted" style={{ minWidth: 110, fontSize: 'var(--text-sm)' }}>Employee ID</span>
              <span style={{ fontSize: 'var(--text-sm)' }}>{detail.id}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.35rem 0', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
              <span className="muted" style={{ minWidth: 110, fontSize: 'var(--text-sm)' }}>Contact</span>
              <span style={{ fontSize: 'var(--text-sm)' }}>{detail.phone}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.35rem 0', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
              <span className="muted" style={{ minWidth: 110, fontSize: 'var(--text-sm)' }}>License / Cert.</span>
              <span style={{ fontSize: 'var(--text-sm)' }}>
                {detail.license} · expires {detail.licenseExpiry}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.35rem 0', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
              <span className="muted" style={{ minWidth: 110, fontSize: 'var(--text-sm)' }}>Assigned site</span>
              <span style={{ fontSize: 'var(--text-sm)' }}>{detail.site}</span>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}


/* =================== JOB POSTS TAB =================== */

const POST_STATUSES = ['Draft', 'Published', 'Closed'];

export function JobsTab() {
  const toast = useToast();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [careersOn, setCareersOn] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [posts, enabled] = await Promise.all([listJobPosts(), getCareersEnabled()]);
      setRows(posts);
      setCareersOn(enabled);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const setStatus = async (row, postStatus) => {
    await setJobPostStatus(row.id, postStatus);
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, postStatus } : r)));
    setDetail((d) => (d && d.id === row.id ? { ...d, postStatus } : d));
    toast.success(
      postStatus === 'Published' ? 'Job post published (demo)' : 'Job post updated (demo)',
      `“${row.title}” is now ${postStatus.toLowerCase()}. The public Careers page goes live in a future update.`
    );
  };

  const doDelete = async () => {
    if (!confirmDelete) return;
    const { id, title } = confirmDelete;
    await deleteJobPost(id);
    setRows((prev) => prev.filter((r) => r.id !== id));
    setDetail(null);
    setConfirmDelete(null);
    toast.success('Job post deleted (demo)', `“${title}” was removed from the manager and the Careers feed.`);
  };

  const toggleCareers = async () => {
    const next = !careersOn;
    await setCareersEnabled(next);
    setCareersOn(next);
    toast.success(
      next ? 'Careers page is live (demo)' : 'Careers page hidden (demo)',
      next
        ? 'Published job posts are now visible on the public Careers page and the home page.'
        : 'The public Careers page shows “coming soon”. Published posts are kept for when you switch it back on.'
    );
  };

  const columns = [
    {
      key: 'title',
      header: 'Role',
      render: (r) => (
        <span>
          {r.title}
          <br />
          <span className="cell-muted">{r.category}</span>
        </span>
      ),
    },
    { key: 'location', header: 'Location', render: (r) => <span className="cell-muted">{r.location}</span> },
    { key: 'type', header: 'Type', render: (r) => <span className="cell-muted">{r.type}</span> },
    { key: 'applicants', header: 'Applicants', render: (r) => <strong>{r.applicants}</strong> },
    { key: 'postStatus', header: 'Post status', render: (r) => <Badge variant={STATUS_TO_BADGE[r.postStatus] || 'neutral'}>{r.postStatus}</Badge> },
    {
      key: 'actions',
      header: '',
      render: (r) => (
        <span className="table-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label={`Manage job post ${r.title}`}
            title="Manage"
            onClick={() => setDetail(r)}
          >
            <Icon name="settings" size={16} />
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label={`Delete job post ${r.title}`}
            title="Delete"
            onClick={() => setConfirmDelete(r)}
          >
            <Icon name="trash" size={16} />
          </button>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="card dash-section" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="dash-section-head" style={{ flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div>
            <h2 className="dash-section-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Careers page (public):
              <Badge variant={careersOn ? 'success' : 'neutral'}>{careersOn ? 'ON' : 'OFF'}</Badge>
            </h2>
            <p className="muted" style={{ fontSize: 'var(--text-xs)', marginBottom: 0 }}>
              Master switch for the public careers features — the Careers page and the home page
              hiring teaser. Off = visitors see “coming soon”. Your published posts are kept either way.
            </p>
          </div>
          <Button variant={careersOn ? 'outline' : 'primary'} size="sm" onClick={() => void toggleCareers()}>
            <Icon name={careersOn ? 'lock' : 'zap'} size={15} />
            {careersOn ? 'Turn off careers (for future updates)' : 'Open careers features'}
          </Button>
        </div>
      </div>

      <div className="card dash-section">
      <div className="dash-section-head">
        <h2 className="dash-section-title">Job posts manager</h2>
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
          <span className="badge badge-neutral">{rows.filter((r) => r.postStatus === 'Published').length} published</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast.info('Demo action', 'Creating new posts will be wired to the database later.')}
          >
            <Icon name="upload" size={14} /> New job post
          </Button>
        </div>
      </div>
      <div className="demo-banner" role="note" style={{ marginBottom: 'var(--space-3)' }}>
        <Icon name="info" size={16} />
        <span>
          The public Careers page is “coming soon”. Publishing a post here is what will make it
          visible to applicants when that page launches.
        </span>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        emptyTitle="No job posts"
        emptySub="Create a post to get started."
      />

      <Modal
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        title={detail ? detail.title : 'Job post'}
        large
        footer={
          detail && (
            <>
              {POST_STATUSES.map((s) => (
                <Button
                  key={s}
                  variant={detail.postStatus === s ? 'primary' : 'outline'}
                  size="sm"
                  disabled={detail.postStatus === s}
                  onClick={() => void setStatus(detail, s)}
                >
                  {detail.postStatus === s ? <Icon name="check" size={14} /> : null}
                  {s}
                </Button>
              ))}
              <Button variant="outline" size="sm" onClick={() => setConfirmDelete(detail)}>
                <Icon name="trash" size={14} /> Delete
              </Button>
            </>
          )
        }
      >
        {detail && (
          <>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: 'var(--space-2)' }}>
              <Badge variant="neutral">{detail.category}</Badge>
              <Badge variant="neutral">{detail.location}</Badge>
              <Badge variant="neutral">{detail.type}</Badge>
              {detail.urgent && <Badge variant="danger">Urgent</Badge>}
            </div>
            <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>{detail.description}</p>
            <p className="muted" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
              {detail.salary} · {detail.slots} slot{detail.slots === 1 ? '' : 's'} · {detail.experience} experience
            </p>
            <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>
              Current post status:{' '}
              <Badge variant={STATUS_TO_BADGE[detail.postStatus] || 'neutral'}>{detail.postStatus}</Badge>{' '}
              · {detail.applicants} applicant{detail.applicants === 1 ? '' : 's'}
            </p>
          </>
        )}
      </Modal>

      <Modal
        open={Boolean(confirmDelete)}
        onClose={() => setConfirmDelete(null)}
        title="Delete job post"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => void doDelete()}>
              <Icon name="trash" size={14} /> Yes, delete
            </Button>
          </>
        }
      >
        {confirmDelete && (
          <p style={{ fontSize: 'var(--text-sm)' }}>
            Delete <strong>“{confirmDelete.title}”</strong> ({confirmDelete.location})? It will be removed
            from the manager and the public Careers feed. “Delete all data” followed by
            “Restore demo data” brings the demo set back.
          </p>
        )}
      </Modal>
    </div>
    </>
  );
}
