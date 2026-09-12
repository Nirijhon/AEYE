import React from 'react';

/**
 * Horizontal step indicator for multi-step forms.
 * steps: [{ key, label, hint }], current: index (0-based).
 */
export default function Stepper({ steps = [], current = 0 }) {
  return (
    <ol className="stepper" aria-label="Form progress">
      {steps.map((s, i) => (
        <React.Fragment key={s.key}>
          {i > 0 && <li className={`stepper-line ${i <= current ? 'is-done' : ''}`} aria-hidden="true" />}
          <li
            className={`stepper-step ${i === current ? 'is-active' : ''} ${i < current ? 'is-done' : ''}`}
            aria-current={i === current ? 'step' : undefined}
          >
            <span className="stepper-dot" aria-hidden="true">
              {i < current ? '✓' : i + 1}
            </span>
            <span className="stepper-label">
              {s.label}
              {s.hint && <small>{s.hint}</small>}
            </span>
          </li>
        </React.Fragment>
      ))}
    </ol>
  );
}