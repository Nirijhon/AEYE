import React from 'react';
import { createRoot } from 'react-dom/client';
import PageShell from './components/layout/PageShell';
import ServicesPage from './pages/Services';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PageShell>
      <ServicesPage />
    </PageShell>
  </React.StrictMode>
);