import React, { useEffect, useState } from 'react';
import DataTable from '../../components/dashboard/DataTable';
import Modal from '../../components/ui/Modal';
import Badge, { STATUS_TO_BADGE } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { useToast } from '../../components/ui/Toast';
import { Input, Select } from '../../components/forms/Fields';
import { personnel } from '../../data/admin';
import { APPLICATION_STAGES } from '../../data/statuses';
import {
  listAdminRequests,
  nextRequestStatuses,
  setRequestStatus,
  assignRequest,
  getAudit,
  listApplications,
  setApplicationStage,
  nextApplicationStages,
} from '../../services/adminService';

/* Shared filter-chip row. */
export function FilterChips({ options, value, onChange, label }) {
  return (
    <div className="dash-tabs" role="group" aria-label={label} style={{ marginBottom: 0 }}>
      {options.map((o) => (
        <button
          key={o}
          type="button"
          className={`dash-tab ${value === o ? 'active' : ''}`.trim()}
          aria-pressed={value === o}
          onClick={() => onChange(o)}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function DetailRow({ label, children }) {
  return (
    <div style={{ display: 'flex', gap: '0.5rem', padding: '0.35rem 0', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
      <span className="muted" style={{ minWidth: 110, fontSize: 'var(--text-sm)' }}>{label}</span>
      <span style={{ fontSize: 'var(--text-sm)' }}>{children}</span>
    </div>
  );
}

/** Audit trail for one record, newest first. */
function History({ entries = [] }) {
  if (!entries.length) return null;
  return (
    <div style={{ marginTop: 'var(--space-3)' }}>
      <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: '0.35rem' }}>History</p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {entries.map((h, i) => (
          <li
            key={`${h.at}-${i}`}
            className="muted"
            style={{ fontSize: 'var(--text-xs)', padding: '0.25rem 0', borderBottom: '1px solid rgba(255,255,255,.08)' }}
          >
            {new Date(h.at).toLocaleString()} — {h.from || '—'} → {h.to}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* =================== REQUESTS TAB =================== */

const REQUEST_FILTERS = ['All', 'New', 'Under Review', 'Quoted', 'Assigned', 'On Site', 'Completed'];

export function RequestsTab() {
  const toast = useToast();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [assignee, setAssignee] = useState('');
  const [audit, setAudit] = useState([]);
  const [auditTick, setAuditTick] = useState(0);
  const [detail, setDetail] = useState(null);

  const load = async (simulateError = false) => {
    setLoading(true);
    setFailed(false);
    try {
      if (simulateError) throw new Error('demo');
      setRows(await listAdminRequests());
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Audit history follows the record open in the modal.
  useEffect(() => {
    if (!detail) {
      setAudit([]);
      return undefined;
    }
    let live = true;
    getAudit(detail.id).then((a) => {
      if (live) setAudit(a);
    });
    return () => {
      live = false;
    };
  }, [detail, auditTick]);

  const advance = async (row, status) => {
    await setRequestStatus(row.id, status);
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status } : r)));
    setDetail((d) => (d && d.id === row.id ? { ...d, status } : d));
    setAuditTick((t) => t + 1);
    toast.success('Pipeline updated (demo)', `${row.id} moved to “${status}”. Saved in this browser only.`);
  };

  const doAssign = async () => {
    if (!detail || !assignee) return;
    await assignRequest(detail.id, assignee);
    setRows((prev) => prev.map((r) => (r.id === detail.id ? { ...r, status: 'Assigned', officer: assignee } : r)));
    setDetail((d) => (d && d.id === detail.id ? { ...d, status: 'Assigned', officer: assignee } : d));
    setAssignee('');
    setAuditTick((t) => t + 1);
    toast.success('Officer assigned (demo)', `${assignee} assigned to ${detail.id}. Saved in this browser only.`);
  };

  const q = query.trim().toLowerCase();
  const visible = rows
    .filter((r) => filter === 'All' || r.status === filter)
    .filter((r) => !q || [r.id, r.service, r.site, r.city].join(' ').toLowerCase().includes(q));

  const columns = [
    { key: 'id', header: 'Reference', render: (r) => <span className="cell-title">{r.id}</span> },
    {
      key: 'service',
      header: 'Service',
      render: (r) => (
        <span>
          {r.service}
          <br />
          <span className="cell-muted">{r.site} · {r.city}</span>
        </span>
      ),
    },
    { key: 'guards', header: 'Officers', render: (r) => <strong>{r.guards}</strong> },
    { key: 'start', header: 'Starts', render: (r) => <span className="cell-muted">{r.start}</span> },
    { key: 'status', header: 'Stage', render: (r) => <Badge variant={STATUS_TO_BADGE[r.status] || 'neutral'}>{r.status}</Badge> },
    {
      key: 'actions',
      header: '',
      render: (r) => (
        <span className="table-actions">
          <button type="button" className="icon-btn" aria-label={`Manage request ${r.id}`} title="Manage" onClick={() => setDetail(r)}>
            <Icon name="settings" size={16} />
          </button>
        </span>
      ),
    },
  ];

  const nexts = detail ? nextRequestStatuses(detail.status) : [];

  return (
    <div className="card dash-section">
      <div className="dash-section-head">
        <h2 className="dash-section-title">Request pipeline</h2>
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
          <span className="badge badge-neutral">{rows.length} total</span>
          <Button variant="ghost" size="sm" onClick={() => void load()}>
            <Icon name="arrowRight" size={14} /> Refresh
          </Button>
        </div>
      </div>
      <p className="muted" style={{ fontSize: 'var(--text-xs)', marginBottom: 'var(--space-3)' }}>
        Every staffing request from the “Request Personnel” form, including ones submitted in this browser.
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
        <Input
          type="search"
          placeholder="Search reference, site, city…"
          aria-label="Search requests"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <FilterChips options={REQUEST_FILTERS} value={filter} onChange={setFilter} label="Filter requests by stage" />
      </div>

      <div aria-live="polite">
        <DataTable
          columns={columns}
          rows={visible}
          loading={loading}
          error={failed ? 'Simulated server error — use Retry to reload.' : null}
          onRetry={() => void load()}
          emptyTitle="No requests match"
          emptySub="Try another filter or search term, or submit one via Request Personnel."
        />
      </div>

      <p style={{ marginTop: 'var(--space-3)' }}>
        <button type="button" className="filter-reset" onClick={() => void load(true)}>
          Demo: trigger an error state
        </button>
      </p>

      <Modal
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        title={detail ? `Manage ${detail.id}` : 'Request'}
        footer={
          <>
            {nexts.length === 0 && <span className="muted" style={{ fontSize: 'var(--text-sm)' }}>No further stages.</span>}
            {nexts.map((s) => (
              <Button key={s} variant={s === 'Completed' ? 'primary' : 'outline'} size="sm" onClick={() => void advance(detail, s)}>
                <Icon name="arrowRight" size={14} /> {s}
              </Button>
            ))}
          </>
        }
      >
        {detail && (
          <>
            <DetailRow label="Service">{detail.service}</DetailRow>
            <DetailRow label="Site">{detail.site} · {detail.city}</DetailRow>
            <DetailRow label="Officers">{detail.guards}</DetailRow>
            <DetailRow label="Start">{detail.start}</DetailRow>
            <DetailRow label="Stage">
              <Badge variant={STATUS_TO_BADGE[detail.status] || 'neutral'}>{detail.status}</Badge>
            </DetailRow>
            <DetailRow label="Assigned">{detail.officer || '—'}</DetailRow>

            <div style={{ marginTop: 'var(--space-3)' }}>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: '0.35rem' }}>Assign personnel</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Select
                  aria-label="Select officer to assign"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  style={{ minWidth: 240 }}
                >
                  <option value="">Select officer…</option>
                  {personnel.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} — {p.role} ({p.status})
                    </option>
                  ))}
                </Select>
                <Button variant="outline" size="sm" disabled={!assignee} onClick={() => void doAssign()}>
                  <Icon name="userCheck" size={14} /> Assign
                </Button>
              </div>
            </div>
            <History entries={audit} />
          </>
        )}
      </Modal>
    </div>
  );
}

/* =================== APPLICATIONS TAB =================== */

export function ApplicationsTab() {
  const toast = useToast();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [audit, setAudit] = useState([]);
  const [auditTick, setAuditTick] = useState(0);
  const [detail, setDetail] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      setRows(await listApplications());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Audit history follows the record open in the modal.
  useEffect(() => {
    if (!detail) {
      setAudit([]);
      return undefined;
    }
    let live = true;
    getAudit(detail.id).then((a) => {
      if (live) setAudit(a);
    });
    return () => {
      live = false;
    };
  }, [detail, auditTick]);

  const moveTo = async (row, stage) => {
    await setApplicationStage(row.id, stage);
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, stage } : r)));
    setDetail((d) => (d && d.id === row.id ? { ...d, stage } : d));
    setAuditTick((t) => t + 1);
    toast.success('Stage updated (demo)', `${row.id} moved to “${stage}”. Saved in this browser only.`);
  };

  const q = query.trim().toLowerCase();
  const visible = rows
    .filter((r) => filter === 'All' || r.stage === filter)
    .filter((r) => !q || [r.id, r.name, r.jobTitle, r.city].join(' ').toLowerCase().includes(q));
  const nextApp = detail ? nextApplicationStages(detail.stage) : [];

  const columns = [
    { key: 'id', header: 'Reference', render: (r) => <span className="cell-title">{r.id}</span> },
    {
      key: 'name',
      header: 'Applicant',
      render: (r) => (
        <span>
          {r.name}
          <br />
          <span className="cell-muted">{r.email}</span>
        </span>
      ),
    },
    { key: 'jobTitle', header: 'Applied for' },
    { key: 'city', header: 'City', render: (r) => <span className="cell-muted">{r.city}</span> },
    { key: 'stage', header: 'Stage', render: (r) => <Badge variant={STATUS_TO_BADGE[r.stage] || 'neutral'}>{r.stage}</Badge> },
    {
      key: 'actions',
      header: '',
      render: (r) => (
        <span className="table-actions">
          <button type="button" className="icon-btn" aria-label={`Review application ${r.id}`} title="Review" onClick={() => setDetail(r)}>
            <Icon name="userCheck" size={16} />
          </button>
        </span>
      ),
    },
  ];

  return (
    <div className="card dash-section">
      <div className="dash-section-head">
        <h2 className="dash-section-title">Application review</h2>
        <span className="badge badge-amber">
          {rows.filter((r) => r.stage === 'Submitted' || r.stage === 'Under Review').length} need screening
        </span>
      </div>
      <p className="muted" style={{ fontSize: 'var(--text-xs)', marginBottom: 'var(--space-3)' }}>
        Applications from the public apply form, tracked through screening → interview → background check → decision.
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
        <Input
          type="search"
          placeholder="Search reference, name, role…"
          aria-label="Search applications"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: 300 }}
        />
        <FilterChips options={['All', ...APPLICATION_STAGES]} value={filter} onChange={setFilter} label="Filter applications by stage" />
      </div>

      <div aria-live="polite">
        <DataTable
          columns={columns}
          rows={visible}
          loading={loading}
          emptyTitle="No applications match"
          emptySub="Try another filter or search term, or submit one via the public apply form."
        />
      </div>

      <Modal open={Boolean(detail)} onClose={() => setDetail(null)} title={detail ? `Review ${detail.id}` : 'Application'} large>
        {detail && (
          <>
            <DetailRow label="Applicant">{detail.name}</DetailRow>
            <DetailRow label="Applied for">{detail.jobTitle}</DetailRow>
            <DetailRow label="Contact">{detail.email} · {detail.phone}</DetailRow>
            <DetailRow label="City">{detail.city}</DetailRow>
            <DetailRow label="Experience">{detail.experience}</DetailRow>
            <DetailRow label="Résumé">{detail.resumeFileName || 'No file attached (demo)'}</DetailRow>
            <DetailRow label="Current stage">
              <Badge variant={STATUS_TO_BADGE[detail.stage] || 'neutral'}>{detail.stage}</Badge>
            </DetailRow>
            <p className="muted" style={{ fontSize: 'var(--text-sm)', margin: 'var(--space-3) 0 var(--space-2)' }}>{detail.note}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {nextApp.length > 0 && (
                <Button variant="primary" size="sm" onClick={() => void moveTo(detail, nextApp[0])}>
                  <Icon name="arrowRight" size={14} /> Advance to “{nextApp[0]}”
                </Button>
              )}
              {!['Hired', 'Not Selected'].includes(detail.stage) && (
                <Button variant="outline" size="sm" onClick={() => void moveTo(detail, 'Not Selected')}>
                  <Icon name="x" size={14} /> Reject
                </Button>
              )}
            </div>
            <History entries={audit} />
          </>
        )}
      </Modal>
    </div>
  );
}

