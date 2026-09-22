import React from 'react';
import { createRoot } from 'react-dom/client';
import AdminShell from './components/layout/AdminShell';
import Admin from './pages/admin/Admin';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminShell>
      <Admin />
    </AdminShell>
  </React.StrictMode>
);
