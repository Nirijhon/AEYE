import React from 'react';

/**
 * Section heading used consistently across pages.
 */
export default function SectionHeading({
  eyebrow = null,
  title,
  sub = null,
  centered = false,
  action = null,
  className = '',
}) {
  return (
    <div className={`section-head ${centered ? 'is-centered' : ''} ${className}`.trim()}>
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
      {action}
    </div>
  );
}