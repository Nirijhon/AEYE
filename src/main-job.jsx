import React from 'react';
import { createRoot } from 'react-dom/client';
import PageShell from './components/layout/PageShell';
import JobDetail from './pages/JobDetail';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PageShell>
      <JobDetail />
    </PageShell>
  </React.StrictMode>
);
