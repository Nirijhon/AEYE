import React, { useState } from 'react';
import { DemoNotice } from '../../components/ui/Toast';
import StatCard from '../../components/dashboard/StatCard';
import Icon from '../../components/ui/Icon';
import { stats, chart, notifications, documentFeed } from '../../data/dashboard';
import { NotificationList, ChartCard } from './DashboardData';
import TableCard from './TablesCard';

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'requests', label: 'Requests' },
  { key: 'documents', label: 'Documents' },
];

export default function Dashboard() {
  const [tab, setTab] = useState('overview');

  return (
    <div className="dashboard-shell">
      <div className="container">
        <div className="dash-top">
          <div>
            <h1 className="dash-title">Good morning, Marites</h1>
            <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>
              ACME Corporation · Client portal (demo)
            </p>
          </div>
          <div className="dash-tabs" role="tablist" aria-label="Dashboard sections">
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

        <DemoNotice>
          This is a demonstration dashboard for the prototype. Rows shown combine sample records with
          anything you submitted in this browser — no real data or back-end connection.
        </DemoNotice>

        {tab === 'overview' && <Overview />}
        {tab === 'requests' && <RequestsTab />}
        {tab === 'documents' && <DocumentsTab />}
      </div>
    </div>
  );
}

function Overview() {
  return (
    <div className="stat-grid">
      {stats.map((s) => (
        <StatCard key={s.key} title={s.label} value={s.value} icon={s.icon} variant={s.variant} trend={s.trend} note={s.note} />
      ))}
    </div>
  );
}

function RequestsTab() {
  return (
    <div className="dash-grid">
      <TableCard title="Request pipeline" sub="Every staffing request and its current status" />
      <NotificationList items={notifications} />
    </div>
  );
}

function DocumentsTab() {
  return (
    <div className="dash-grid">
      <TableCard title="Security documents" sub="Reports and logs available for download (demo)" documentsOnly documentFeed={documentFeed} />
      <div className="card dash-section">
        <div className="dash-section-head">
          <h2 className="dash-section-title">Weekly activity</h2>
          <span className="badge badge-amber">Last 7 days</span>
        </div>
        <ChartCard data={chart} />
      </div>
    </div>
  );
}