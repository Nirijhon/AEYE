import React from 'react';
import { createRoot } from 'react-dom/client';
import PageShell from './components/layout/PageShell';
import Apply from './pages/apply/Apply';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PageShell>
      <Apply />
    </PageShell>
  </React.StrictMode>
);
