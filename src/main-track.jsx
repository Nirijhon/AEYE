import React from 'react';
import { createRoot } from 'react-dom/client';
import PageShell from './components/layout/PageShell';
import TrackStatus from './pages/TrackStatus';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PageShell>
      <TrackStatus />
    </PageShell>
  </React.StrictMode>
);
