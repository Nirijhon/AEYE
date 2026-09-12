import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const VARIANTS = ['primary', 'secondary', 'outline', 'outline-light', 'ghost', 'danger', 'white'];
const SIZES = ['sm', 'md', 'lg'];

/**
 * Reusable button. Renders a <button> by default:
 *   - `to`  -> react-router Link
 *   - `href`-> plain anchor
 * Props: variant, size, loading, disabled, fullWidth, icon, className
 */
export default function Button({
  as,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon = null,
  className = '',
  children,
  ...rest
}) {
  const cls = [
    'btn',
    `btn-${VARIANTS.includes(variant) ? variant : 'primary'}`,
    `btn-${SIZES.includes(size) ? size : 'md'}`,
    fullWidth ? 'btn-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const isDisabled = disabled || loading;
  const inner = (
    <>
      {loading && <Spinner className="btn-spinner" light={variant === 'secondary' || variant === 'danger'} />}
      {!loading && icon}
      <span>{children}</span>
    </>
  );

  if (rest.to) {
    return (
      <Link to={rest.to} className={cls} aria-disabled={isDisabled ? 'true' : 'false'} {...strip(rest)}>
        {inner}
      </Link>
    );
  }
  if (rest.href) {
    return (
      <a href={rest.href} className={cls} aria-disabled={isDisabled ? 'true' : 'false'} {...strip(rest)}>
        {inner}
      </a>
    );
  }
  return (
    <button type={rest.type || 'button'} className={cls} disabled={isDisabled} aria-busy={loading} {...strip(rest, ['type'])}>
      {inner}
    </button>
  );
}

const OWN = new Set(['variant', 'size', 'loading', 'disabled', 'fullWidth', 'icon', 'className', 'children', 'as']);

function strip(props, extra = []) {
  const out = {};
  for (const [k, v] of Object.entries(props)) {
    if (!OWN.has(k) && !extra.includes(k)) out[k] = v;
  }
  return out;
}