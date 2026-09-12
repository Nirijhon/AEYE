import React from 'react';

/**
 * Generic card. `pad` adds default padding, `hover` enables lift effect.
 */
export default function Card({ pad = false, hover = false, className = '', as = 'div', ...rest }) {
  const cls = ['card', pad ? 'card-pad' : '', hover ? 'card-hover' : '', className]
    .filter(Boolean)
    .join(' ');
  return React.createElement(as, { className: cls, ...rest });
}