import React from 'react';
import Link from '../ui/Link';
import Icon from '../ui/Icon';
import { COMPANY } from '../../data/company';

const QUICK = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Our Services' },
  { to: '/request-personnel', label: 'Request Personnel' },
  { to: '/careers', label: 'Careers' },
  { to: '/track', label: 'Track Application' },
  { to: '/dashboard', label: 'Client Demo Dashboard' },
];

const SERVICES = ['CCTV & Video Surveillance', 'Networking Infrastructure', 'Access & Security Systems', 'Support & Maintenance'];

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="brand" aria-label="A•EYE — A-Eye System Technology home">
              <span className="brand-mark" aria-hidden="true">
                <span className="brand-mark-core">
                  <img className="brand-mark-img" src="./logo.png" alt="" />
                </span>
              </span>
              <span>
                A•EYE
                <span className="brand-sub">System Technology</span>
              </span>
            </Link>
            <p className="footer-desc">
              {COMPANY.name} — {COMPANY.tagline}. CCTV, electronic security,
              networking and structured IT infrastructure for businesses and homes.
            </p>
            <div className="footer-tagline" style={{ fontFamily: 'var(--font-accent)', color: 'var(--c-cyan)', fontSize: 'var(--text-xs)' }}>
              Home &amp; Business Solutions
            </div>
          </div>

          <div>
            <h2 className="footer-heading">Quick Links</h2>
            <ul className="footer-links">
              {QUICK.map((q) => (
                <li key={q.to}>
                  <Link to={q.to}>{q.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Services</h2>
            <ul className="footer-links">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link to="/services">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Get in Touch</h2>
            <div className="footer-contact">
              <a href={COMPANY.telHref}>
                <Icon name="phone" size={15} /> {COMPANY.phones[0]}
              </a>
              <a href={`mailto:${COMPANY.emails[0]}`}>
                <Icon name="mail" size={15} /> {COMPANY.emails[0]}
              </a>
              <span>
                <Icon name="mapPin" size={15} /> {COMPANY.address}
              </span>
              <span>
                <Icon name="userCheck" size={15} /> {COMPANY.authorizedContact.name} — {COMPANY.authorizedContact.role}
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</span>
          <span className="footer-demo">
            <Icon name="info" size={13} /> Prototype build — no live database connected
          </span>
        </div>
      </div>
    </footer>
  );
}