import React from 'react';
import { ToastProvider } from '../ui/Toast';
import Footer from './Footer';
import { ScrollTop } from './Shell';
import '../../styles/index.css';

/**
 * Shell for the admin console — same page furniture as PageShell
 * (skip link, toast provider, scroll-to-top) but WITHOUT the public
 * Navbar, since staff operate the console directly via /admin.html.
 */
export default function AdminShell({ children }) {
  const skipToMain = (e) => {
    e.preventDefault();
    const main = document.getElementById('main-content');
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ToastProvider>
      <div className="page-shell">
        <a className="skip-link" href="#main-content" onClick={skipToMain}>
          Skip to main content
        </a>
        <main id="main-content" className="page-main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ScrollTop />
      </div>
    </ToastProvider>
  );
}
