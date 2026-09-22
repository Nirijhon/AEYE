import React from 'react';
import { STATUS_TO_BADGE } from '../../data/statuses';

/**
 * Status badge used across tables, job cards and dashboards.
 * Variants: neutral | brand | amber | success | danger | info
 * The status → variant map lives in src/data/statuses.js so every
 * screen renders the same status with the same color.
 */
export default function Badge({ variant = 'neutral', children, className = '', icon = null }) {
  return (
    <span className={`badge badge-${variant} ${className}`.trim()}>
      {icon}
      {children}
    </span>
  );
}

export { STATUS_TO_BADGE };
