import React from 'react';
import Icon from '../ui/Icon';
import { COMPANY } from '../../data/company';

/* ============================================================
   Floating click-to-contact buttons (Call / Viber / Messenger).
   Fixed bottom-right, above the scroll-to-top button.
   Chat-first contact converts better than forms in the PH market.
   ============================================================ */

const BUTTONS = [
  { href: COMPANY.telHref, icon: 'phone', label: 'Call us', cls: 'fc-call' },
  { href: COMPANY.viberHref, icon: 'message', label: 'Chat on Viber', cls: 'fc-viber' },
  { href: COMPANY.messengerHref, icon: 'send', label: 'Chat on Messenger', cls: 'fc-messenger' },
];

export default function FloatingContact() {
  return (
    <div className="floating-contact" role="complementary" aria-label="Quick contact">
      {BUTTONS.map((b) => (
        <a
          key={b.cls}
          href={b.href}
          className={`fc-btn ${b.cls}`}
          aria-label={b.label}
          title={b.label}
          target={b.href.startsWith('http') ? '_blank' : undefined}
          rel={b.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          <Icon name={b.icon} size={22} />
        </a>
      ))}
    </div>
  );
}