import React from 'react';
import { createRoot } from 'react-dom/client';
import PageShell from './components/layout/PageShell';
import About from './pages/About';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PageShell>
      <About />
    </PageShell>
  </React.StrictMode>
);