import React from 'react';
import { createRoot } from 'react-dom/client';
import PageShell from './components/layout/PageShell';
import Dashboard from './pages/dashboard/Dashboard';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PageShell>
      <Dashboard />
    </PageShell>
  </React.StrictMode>
);
