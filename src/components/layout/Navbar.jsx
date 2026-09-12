import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import { useLockBodyScroll } from '../../hooks/useReveal';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/careers', label: 'Careers' },
  { to: '/track', label: 'Track Application' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const btnRef = useRef(null);
  useLockBodyScroll(open);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isActive = (to) => {
    const on = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
    return on ? 'active' : '';
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" aria-label="A•EYE Systems Technology Inc. — home">
          <span className="brand-mark" aria-hidden="true">
            <span className="brand-mark-core">
              <img className="brand-mark-img" src="./logo.png" alt="" />
            </span>
          </span>
          <span>
            A•EYE
            <span className="brand-sub">Systems Technology Inc.</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className={`nav-link ${isActive(l.to)}`.trim()}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-ctas">
          <Button to="/request-personnel" variant="primary" size="sm" className="nav-cta">
            Hire Personnel
          </Button>
          <Button to="/careers" variant="outline" size="sm" className="nav-cta">
            Apply Now
          </Button>
        </div>

        <button
          ref={btnRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? 'x' : 'menu'} size={22} />
        </button>
      </div>

      <nav id="mobile-nav" className={`mobile-nav ${open ? 'open' : ''}`.trim()} aria-label="Mobile">
        <div className="mobile-nav-links">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} className={`mobile-nav-link ${isActive(l.to)}`.trim()}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="mobile-nav-ctas">
          <Button to="/request-personnel" variant="primary" fullWidth>
            Hire Personnel
          </Button>
          <Button to="/careers" variant="outline" fullWidth>
            Apply for Jobs
          </Button>
        </div>
      </nav>
    </header>
  );
}