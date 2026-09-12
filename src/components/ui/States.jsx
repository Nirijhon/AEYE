import React from 'react';
import Icon from './Icon';

/** Friendly empty state for lists, tables and filtered results. */
export default function EmptyState({ icon = 'layers', title, sub = null, action = null, className = '' }) {
  return (
    <div className={`empty-state ${className}`.trim()}>
      <span className="empty-state-icon">
        <Icon name={icon} size={28} />
      </span>
      <h3 className="empty-state-title">{title}</h3>
      {sub && <p className="empty-state-sub">{sub}</p>}
      {action}
    </div>
  );
}

/** Page-level failure state with a retry action. */
export function ErrorState({ title = 'Something went wrong', sub = 'Please try again in a moment.', onRetry = null }) {
  return (
    <div className="error-state" role="alert">
      <Icon name="alert" size={34} />
      <h3 className="error-state-title">{title}</h3>
      <p className="error-state-sub">{sub}</p>
      {onRetry && (
        <button type="button" className="btn btn-outline" onClick={onRetry}>
          <Icon name="arrowRight" size={16} /> Retry
        </button>
      )}
    </div>
  );
}