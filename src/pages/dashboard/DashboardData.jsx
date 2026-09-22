import React from 'react';
import Icon from '../../components/ui/Icon';

const NOTIF_STYLE = {
  success: ['success', 'checkCircle'],
  info: ['info', 'info'],
  danger: ['danger', 'alert'],
  amber: ['amber', 'bell'],
};

export function NotificationList({ items = [], title = 'Notifications' }) {
  return (
    <div className="card dash-section">
      <div className="dash-section-head">
        <h2 className="dash-section-title">{title}</h2>
        <span className="badge badge-danger">{items.filter((n) => n.type === 'danger').length} alerts</span>
      </div>
      <ul className="notif-list">
        {items.map((n, i) => {
          const [variant, icon] = NOTIF_STYLE[n.type] || NOTIF_STYLE.info;
          return (
            <li key={i} className="notif-item">
              <span className={`notif-icon stat-icon-${variant}`}>
                <Icon name={icon} size={15} />
              </span>
              <div>
                <p className="notif-text">{n.text}</p>
                <span className="notif-time">{n.time}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: 'var(--space-3)' }}>
        <Icon name="bell" size={15} /> Mark all as read (demo)
      </button>
    </div>
  );
}

export function ChartCard({ data = [] }) {
  // Guard against an empty feed (division by zero when demo data is cleared).
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="chart" role="img" aria-label="Bar chart of deployed guards this week">
      {data.map((d) => (
        <div key={d.label} className="chart-col">
          <span
            className="chart-bar"
            style={{ height: `${Math.max(6, Math.round((d.value / max) * 100))}%` }}
            title={`${d.label}: ${d.value} guards`}
          />
          <span className="chart-label">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function EmptyCell() {
  return null;
}