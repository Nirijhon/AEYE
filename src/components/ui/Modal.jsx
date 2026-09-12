import React, { useEffect, useRef } from 'react';
import Icon from './Icon';

/**
 * Accessible modal dialog.
 * Usage: <Modal open onClose title footer={...}>body</Modal>
 * - Closes on ESC / overlay click / close button.
 * - Focus is moved into the dialog and returned to the opener on close.
 * - Body scroll is locked while open.
 */
export default function Modal({ open = false, onClose, title, large = false, footer = null, children, id = 'modal' }) {
  const ref = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement; // element that opened the dialog
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.(e);
      if (e.key === 'Tab') trapFocus(ref.current, e);
    };
    document.addEventListener('keydown', onKey);
    const first = ref.current?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    first?.focus();
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      triggerRef.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  const titleId = `${id}-title`;
  return (
    <div
      className="modal-overlay"
      data-testid="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.(e);
      }}
    >
      <div
        className={`modal-panel ${large ? 'modal-panel-lg' : ''}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={`${id}-desc`}
        ref={ref}
      >
        <div className="modal-header">
          <h3 className="modal-title" id={titleId}>{title}</h3>
          <button type="button" className="modal-close" aria-label="Close dialog" onClick={onClose}>
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="modal-body" id={`${id}-desc`}>
          {children}
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

function trapFocus(el, e) {
  if (!el) return;
  const focusables = el.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}