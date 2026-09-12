import React from 'react';
import EmptyState, { ErrorState } from '../ui/States';

/* ============================================================
   Reusable data table.
   columns: [{ key, header, render(row), className }]
   Handles loading / empty / error states.
   ============================================================ */

export default function DataTable({
  columns = [],
  rows = [],
  keyField = 'id',
  loading = false,
  emptyTitle = 'No records found',
  emptySub = 'Try adjusting your filters, or check back later.',
  error = null,
  onRetry = null,
  emptyIcon = 'layers',
  caption = null,
}) {
  if (error) {
    return <ErrorState title="Failed to load data" sub={error} onRetry={onRetry} />;
  }
  if (loading) {
    return (
      <div className="spinner-center" role="status" aria-label="Loading records">
        <div className="spinner spinner-lg" />
        <p>Loading records…</p>
      </div>
    );
  }
  if (!rows.length) {
    return <EmptyState icon={emptyIcon} title={emptyTitle} sub={emptySub} />;
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col">
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[keyField] ?? JSON.stringify(row)}>
              {columns.map((c) => (
                <td key={c.key} className={c.className || ''}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}