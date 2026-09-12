import React, { createContext, useContext, useState } from 'react';
import Icon from './Icon';

/* ============================================================
   Toast notifications (context + viewport).
   Usage: const toast = useToast();
          toast.success('Saved', 'Changes were saved.');
   ============================================================ */

const ToastContext = createContext(null);

const T_ICON = { success: 'checkCircle', error: 'alert', info: 'info' };
const T_TITLE = { success: 'Success', error: 'Something went wrong', info: 'Notice' };

let uid = 0;

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);

  const dismiss = (id) => setItems((cur) => cur.filter((t) => t.id !== id));

  const push = (type, title, msg, delay) => {
    const id = ++uid;
    setItems((cur) => [...cur, { id, type, title, msg }]);
    if (delay > 0) setTimeout(() => dismiss(id), delay);
    return id;
  };

  const api = {
    success: (title, msg, delay = 5000) => push('success', title, msg, delay),
    error: (title, msg, delay = 9000) => push('error', title, msg, delay),
    info: (title, msg, delay = 5000) => push('info', title, msg, delay),
    dismiss,
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-viewport" role="region" aria-label="Notifications" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`} role={t.type === 'error' ? 'alert' : 'status'}>
            <span className="toast-icon">
              <Icon name={T_ICON[t.type] || 'info'} size={18} />
            </span>
            <span>
              <span className="toast-title">{t.title || T_TITLE[t.type]}</span>
              {t.msg && <span className="toast-msg"> — {t.msg}</span>}
            </span>
            <button type="button" className="toast-close" aria-label="Dismiss notification" onClick={() => dismiss(t.id)}>
              <Icon name="x" size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const api = useContext(ToastContext);
  if (!api) throw new Error('useToast must be used within a ToastProvider');
  return api;
}

export function DemoNotice({ children }) {
  return (
    <div className="demo-banner" role="note">
      <Icon name="info" size={16} />
      <span>{children}</span>
    </div>
  );
}