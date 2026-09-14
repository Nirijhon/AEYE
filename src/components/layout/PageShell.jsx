import React from 'react';
import { ToastProvider } from '../ui/Toast';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingContact from './FloatingContact';
import { ScrollTop } from './Shell';
import '../../styles/index.css';

export default function PageShell({ children }) {
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
        <Navbar />
        <main id="main-content" className="page-main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <FloatingContact />
        <ScrollTop />
      </div>
    </ToastProvider>
  );
}