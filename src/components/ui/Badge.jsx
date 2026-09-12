import React from 'react';

/**
 * Status badge used across tables, job cards and dashboards.
 * Variants: neutral | brand | amber | success | danger | info
 */
export default function Badge({ variant = 'neutral', children, className = '', icon = null }) {
  return (
    <span className={`badge badge-${variant} ${className}`.trim()}>
      {icon}
      {children}
    </span>
  );
}

export const STATUS_TO_BADGE = {
  Active: 'success',
  'On Site': 'success',
  Received: 'info',
  'Under Review': 'amber',
  Assigned: 'brand',
  Complete: 'success',
  Completed: 'success',
  Open: 'success',
  Filled: 'neutral',
  Pending: 'amber',
  Hired: 'success',
  'Not Selected': 'danger',
  Closed: 'neutral',
  'Follow-up': 'danger',
};