import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';

/* ============================================================
   Layout shell: skip link + navbar + main + scroll-to-top + footer.
   ============================================================ */

export function PageHeader({ breadcrumb = [], title, subtitle = null, hero = true }) {
  const Trail = () => (
    <nav className="page-breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {breadcrumb.map((b, i) => (
        <React.Fragment key={b.label}>
          <span aria-hidden="true">/</span>
          {b.to && i < breadcrumb.length - 1 ? (
            <Link to={b.to}>{b.label}</Link>
          ) : (
            <span aria-current={i === breadcrumb.length - 1 ? 'page' : undefined}>{b.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
  if (!hero) {
    return (
      <div className="container" style={{ paddingBottom: 'var(--space-6)' }}>
        <Trail />
        <h1 className="section-title">{title}</h1>
        {subtitle && <p className="section-sub">{subtitle}</p>}
      </div>
    );
  }
  return (
    <div className="page-hero">
      <div className="container">
        <Trail />
        <h1 className="page-heading">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}

export function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 640);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <button
      type="button"
      className={`scroll-top ${show ? 'visible' : ''}`.trim()}
      aria-label="Scroll back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <Icon name="arrowUp" size={20} />
    </button>
  );
}