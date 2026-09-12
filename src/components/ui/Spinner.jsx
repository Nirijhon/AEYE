import React from 'react';

export default function Spinner({ size = 'md', light = false, className = '', label = null }) {
  const cls = ['spinner', light ? 'spinner-light' : '', size === 'lg' ? 'spinner-lg' : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={cls} role="status" aria-label={label || 'Loading'} />
  );
}

/** Centered loading region used by async data sections. */
export function LoadingRegion({ label = 'Loading data…', minHeight = 220 }) {
  return (
    <div className="spinner-center" style={{ minHeight }}>
      <div className="spinner spinner-lg" role="status" aria-label={label} />
      <p>{label}</p>
    </div>
  );
}