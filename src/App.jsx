import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { ScrollTop } from './components/layout/Shell';
import Home from './pages/home/Home';
import ServicesPage from './pages/Services';
import About from './pages/About';
import Careers from './pages/Careers';
import JobDetail from './pages/JobDetail';
import Apply from './pages/apply/Apply';
import TrackStatus from './pages/TrackStatus';
import RequestPersonnel from './pages/request/RequestPersonnel';
import Dashboard from './pages/dashboard/Dashboard';
import NotFound from './pages/NotFound';

export default function App() {
  const skipToMain = (e) => {
    e.preventDefault(); // keep the URL hash stable under HashRouter
    const main = document.getElementById('main-content');
    if (main) {
      main.focus();
      main.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HashRouter>
      <ToastProvider>
        <div className="page-shell">
          <a className="skip-link" href="#main-content" onClick={skipToMain}>
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="page-main" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:id" element={<JobDetail />} />
              <Route path="/apply/:jobId" element={<Apply />} />
              <Route path="/track" element={<TrackStatus />} />
              <Route path="/request-personnel" element={<RequestPersonnel />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ScrollTop />
        </div>
      </ToastProvider>
    </HashRouter>
  );
}