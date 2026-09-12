/* ============================================================
   Shared validation helpers used by all forms.
   Each returns an error string or null.
   ============================================================ */

export const required = (value, label = 'This field') =>
  value === undefined || value === null || String(value).trim() === '' ? `${label} is required` : null;

export const email = (value, { required: req = false, label = 'Email address' } = {}) => {
  if (!value || !String(value).trim()) return req ? `${label} is required` : null;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())
    ? null
    : 'Enter a valid email address (e.g. name@company.com)';
};

export const phone = (value, { required: req = false, label = 'Phone number' } = {}) => {
  if (!value || !String(value).trim()) return req ? `${label} is required` : null;
  const digits = String(value).replace(/[\s\-()+.]/g, '');
  return /^[0-9]{7,15}$/.test(digits) ? null : 'Enter a valid phone number';
};

export const minLen = (value, n, label = 'This field') =>
  !value || String(value).trim().length < n ? `${label} must be at least ${n} characters` : null;

export const minNum = (value, n, label = 'Value') => {
  const v = Number(value);
  return Number.isFinite(v) && v >= n ? null : `${label} must be ${n} or more`;
};

export const pastDate = (value, label = 'Date') => {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00`);
  return d && d >= new Date(new Date().toDateString()) ? null : `${label} must be today or later`;
};

export const fileName = (value) => {
  if (!value) return null;
  const MAX = 5 * 1024 * 1024;
  const name = value.name || value;
  const size = value.size;
  if (size > MAX) return 'File is larger than the 5 MB demo limit';
  const ok = /\.(pdf|docx?|png|jpe?g)$/i.test(name);
  return ok ? null : 'Accepted formats: PDF, DOC, DOCX, PNG, JPG';
};

/** Validate a whole form against a rules map. Returns { errors, values }. */
export function validateForm(values, rules) {
  const errors = {};
  let firstError = null;
  for (const [key, validators] of Object.entries(rules)) {
    for (const rule of validators) {
      const err = rule(values[key], values);
      if (err) {
        errors[key] = err;
        firstError = firstError || key;
        break;
      }
    }
  }
  return { errors, hasError: Object.keys(errors).length > 0, firstError };
}