import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import services from '../data/services';
import { useRevealOnScroll } from '../hooks/useReveal';
import { useToast } from '../components/ui/Toast';

const SHORTLIST = [
  {
    icon: 'badgeCheck',
    title: 'Clean, proper installation',
    desc: 'Every system is planned, mounted, wired and configured the right way — then tested before handover.',
  },
  {
    icon: 'pulse',
    title: 'Fast, honest repair',
    desc: 'Faulty cameras, alarms or networks are diagnosed and fixed quickly to keep you protected.',
  },
  {
    icon: 'settings',
    title: 'Dependable maintenance',
    desc: 'Scheduled check-ups keep your security and network systems reliable all year round.',
  },
];

export default function ServicesPage() {
  const reveal = useRevealOnScroll();
  const toast = useToast();

  return (
    <div ref={reveal}>
      <PageHeader
        breadcrumb={[{ label: 'Services' }]}
        title="Security services"
        subtitle="Smart Security. Reliable Technology. — CCTV, security systems and networking for homes and businesses."
      />

      <section className="section" aria-label="Service catalog">
        <div className="container">
          <div className="svc-grid">
            {services.map((s) => (
              <article key={s.id} className="card card-hover svc-card">
                <span className="svc-icon">
                  <Icon name={s.icon} size={24} />
                </span>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.desc}</p>
                <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {s.features.map((f) => (
                    <li key={f} className="side-fact">
                      <Icon name="check" size={14} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button to="/request-personnel" variant="outline" size="sm" className="svc-cta">
                  {s.cta}
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--c-slate-50)' }}>
        <div className="container">
          <SectionHeading
            eyebrow="How we work"
            title="Installation • Repair • Maintenance"
          />
          <div className="svc-grid">
            {SHORTLIST.map((s) => (
              <article key={s.title} className="card svc-card">
                <span className="svc-icon">
                  <Icon name={s.icon} size={24} />
                </span>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.desc}</p>
              </article>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-10)' }}>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Need something not listed?</h3>
            <p className="muted" style={{ maxWidth: 520, margin: '0 auto var(--space-4)' }}>
              Tell us about the site and the threat. Our ops desk drafts custom staffing plans
              for unusual or multi-location requirements.
            </p>
            <Button
              to="/request-personnel"
              variant="primary"
              size="lg"
              onClick={() => toast.info('Ready to help', 'The request form is pre-filled for custom needs.')}
            >
              <Icon name="clipboard" size={18} />
              Request a custom plan
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}