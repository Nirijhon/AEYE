import React from 'react';
import { createRoot } from 'react-dom/client';
import PageShell from './components/layout/PageShell';
import RequestPersonnel from './pages/request/RequestPersonnel';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PageShell>
      <RequestPersonnel />
    </PageShell>
  </React.StrictMode>
);
