import React from 'react';
import Icon from '../ui/Icon';

/**
 * Dashboard statistic card.
 * trend: { dir: 'up'|'down'|'flat', text } — text shown under value.
 */
export default function StatCard({ title, value, icon = 'layers', variant = 'navy', trend = null, note = null }) {
  return (
    <article className="card stat-card">
      <span className={`stat-icon stat-icon-${variant}`}>
        <Icon name={icon} size={22} />
      </span>
      <div>
        <p className="stat-value">{value}</p>
        <p className="stat-label">{title}</p>
        {(trend || note) && (
          <p className="stat-foot">
            {trend && (
              <span className={`stat-trend-${trend.dir === 'down' ? 'down' : 'up'}`}>
                {trend.dir === 'down' ? '↓' : '↑'} {trend.text}
              </span>
            )}
            {note && ` ${note}`}
          </p>
        )}
      </div>
    </article>
  );
}