import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../ui/Icon';

const QUICK = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Our Services' },
  { to: '/request-personnel', label: 'Request Personnel' },
  { to: '/careers', label: 'Careers' },
  { to: '/track', label: 'Track Application' },
  { to: '/dashboard', label: 'Client Demo Dashboard' },
];

const SERVICES = ['CCTV Systems', 'Security Systems', 'Networking'];

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
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
            <p className="footer-desc">
              A•EYE SYSTEMS TECHNOLOGY INC. — Smart Security. Reliable Technology.
              CCTV, security systems and networking for homes and businesses.
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
              <span>
                <Icon name="phone" size={15} /> +63 2 8888 4455
              </span>
              <span>
                <Icon name="mail" size={15} /> ops@aeye.security
              </span>
              <span>
                <Icon name="mapPin" size={15} /> 14F One Rockwell, BGC, Taguig 1630, PH
              </span>
              <span>
                <Icon name="clock" size={15} /> Dispatch: 24/7 · Office: Mon–Sat 8:00–18:00
              </span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} A.eye Security Services. All rights reserved.</span>
          <span className="footer-demo">
            <Icon name="info" size={13} /> Prototype build — no live database connected
          </span>
        </div>
      </div>
    </footer>
  );
}