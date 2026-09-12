import React from 'react';
import Icon from '../../components/ui/Icon';

export default function DetailBody({ request: r }) {
  return (
    <div>
      <p className="muted" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>
        Full details would load from the ops system. Shown here for the demo:
      </p>
      <dl className="review-list">
        <Row label="Service" value={r.service} />
        <Row label="Site" value={`${r.site}, ${r.city}`} />
        <Row label="Officers" value={String(r.guards)} />
        <Row label="Starts" value={r.start} />
        <Row label="Assigned officer" value={r.officer} />
        <Row label="Status" value={r.status} />
        <Row label="Submitted" value={`${r.daysAgo} day${r.daysAgo === 1 ? '' : 's'} ago`} />
      </dl>
      <div className="demo-banner" role="note">
        <Icon name="info" size={16} />
        <span>Records in this prototype are demo data or locally submitted requests.</span>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="review-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}