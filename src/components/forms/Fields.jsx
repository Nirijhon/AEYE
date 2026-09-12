import React from 'react';
import Icon from '../ui/Icon';

/* ============================================================
   Accessible form controls.
   - Field: label + hint + error wrapper (wires aria-invalid/describedby)
   - Input / Select / Textarea: thin wrappers over native controls
   - CheckRow: checkbox / radio with visible label & accessible state
   ============================================================ */

export function Field({ label, htmlFor, required = false, hint = null, error = null, children, className = '' }) {
  const errorId = `${htmlFor}-err`;
  const hintId = `${htmlFor}-hint`;
  const described = [hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ');
  return (
    <div className={`form-field ${className}`.trim()}>
      <label className="form-label" htmlFor={htmlFor}>
        {label}
        {required && <span className="req" aria-hidden="true">*</span>}
      </label>
      {React.cloneElement(children, { 'aria-invalid': error ? 'true' : undefined, 'aria-describedby': described || undefined })}
      {hint && !error && <p className="form-hint" id={hintId}>{hint}</p>}
      {error && (
        <p className="form-error" id={errorId} role="alert">
          <Icon name="alert" size={13} />
          {error}
        </p>
      )}
    </div>
  );
}

const BASE = { className: 'input' };
export const Input = (p) => <input {...BASE} {...p} />;
export const Select = (p) => <select {...BASE} className="select" {...p} />;
export const Textarea = (p) => <textarea {...BASE} className="textarea" {...p} />;

export function CheckRow({ label, hint = null, ...inputProps }) {
  return (
    <label className="check-row">
      <input type="checkbox" {...inputProps} />
      <span>
        {label}
        {hint && <span className="form-hint"> — {hint}</span>}
      </span>
    </label>
  );
}

export function RadioRow({ label, ...inputProps }) {
  return (
    <label className="check-row">
      <input type="radio" {...inputProps} />
      <span>{label}</span>
    </label>
  );
}