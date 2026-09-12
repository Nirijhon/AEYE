import React, { useEffect, useState } from 'react';
import DataTable from '../../components/dashboard/DataTable';
import Modal from '../../components/ui/Modal';
import Badge, { STATUS_TO_BADGE } from '../../components/ui/Badge';
import Icon from '../../components/ui/Icon';
import Button from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { requests as cannedRequests } from '../../data/dashboard';
import { listRequests } from '../../services/requestsService';
import DetailBody from './DetailBody';

export default function TablesCard({ title, sub, documentsOnly = false, documentFeed }) {
  const toast = useToast();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [detail, setDetail] = useState(null);

  const load = async (simulateError = false) => {
    setLoading(true);
    setFailed(false);
    try {
      if (simulateError) throw new Error('demo');
      const mine = await listRequests();
      setRows([...cannedRequests, ...mine.map(dashboardRow)]);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, [documentsOnly]);

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
    { key: 'status', header: 'Status', render: (r) => <Badge variant={STATUS_TO_BADGE[r.status] || 'neutral'}>{r.status}</Badge> },
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

  if (documentsOnly) return <DocumentsTable toast={toast} docs={documentFeed} />;

  return (
    <div className="card dash-section">
      <div className="dash-section-head">
        <h2 className="dash-section-title">{title}</h2>
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
          <Button variant="outline" size="sm"
            onClick={() => toast.info('Demo', 'Use “Request Personnel” in the menu to create a request.')}>
            <Icon name="plus" size={14} /> New request
          </Button>
          <Button variant="ghost" size="sm" onClick={() => void load()}>
            <Icon name="arrowRight" size={14} /> Refresh
          </Button>
        </div>
      </div>
      <p className="muted" style={{ fontSize: 'var(--text-xs)', marginBottom: 'var(--space-3)' }}>{sub}</p>
      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        error={failed ? 'Simulated server error — the demo failed on purpose. Use Retry to reload.' : null}
        onRetry={() => void load()}
        emptyTitle="No requests yet"
        emptySub="Submit a request from the “Request Personnel” page and it will appear here."
      />
      <p style={{ marginTop: 'var(--space-3)' }}>
        <button type="button" className="filter-reset" onClick={() => void load(true)}>
          Demo: trigger an error state
        </button>
      </p>

      <Modal
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        title={detail?.id || 'Request'}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => toast.info('Demo action', 'Assignments are not available in the prototype.')}>
              Assign
            </Button>
            <Button variant="primary" size="sm" onClick={() => { setDetail(null); toast.success('Noted', 'Request marked for follow-up (demo).'); }}>
              <Icon name="check" size={15} /> Follow up
            </Button>
          </>
        }
      >
        {detail && <DetailBody request={detail} />}
      </Modal>
    </div>
  );
}

function DocumentsTable({ toast, docs = [] }) {
  const columns = [
    { key: 'name', header: 'Document', render: (d) => <span className="cell-title">{d.name}</span> },
    { key: 'type', header: 'Type', render: (d) => <Badge variant="neutral">{d.type}</Badge> },
    { key: 'size', header: 'Size' },
    { key: 'date', header: 'Date' },
    {
      key: 'actions',
      header: '',
      render: (d) => (
        <span className="table-actions">
          <button type="button" className="icon-btn" aria-label={`Download ${d.name}`} title="Download"
            onClick={() => toast.success('Download started (demo)', d.name)}>
            <Icon name="download" size={16} />
          </button>
        </span>
      ),
    },
  ];
  return (
    <div className="card dash-section">
      <div className="dash-section-head">
        <h2 className="dash-section-title">Security documents</h2>
        <span className="badge badge-neutral">{docs.length} files</span>
      </div>
      <DataTable columns={columns} rows={docs} emptyTitle="No documents yet" emptySub="Generated reports will appear here." />
      <div className="demo-banner" role="note" style={{ marginTop: 'var(--space-3)' }}>
        <Icon name="info" size={16} />
        <span>Downloads are simulated in this prototype — no file is actually generated or transferred.</span>
      </div>
    </div>
  );
}

function dashboardRow(m) {
  return {
    id: m.id,
    service: m.service || 'Security personnel',
    site: m.siteType || 'Your site',
    city: m.city || '—',
    guards: m.headcount || 1,
    start: m.startDate || 'TBD',
    status: m.status || 'Received',
    officer: '—',
    daysAgo: 0,
  };
}