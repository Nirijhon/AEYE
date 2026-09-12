import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import Icon from '../components/ui/Icon';
import { useRevealOnScroll } from '../hooks/useReveal';

const VALUES = [
  { icon: 'shieldCheck', title: 'Integrity', desc: 'Post-orders are followed, logs are honest, and supervision verifies both.' },
  { icon: 'target', title: 'Alertness', desc: 'Officers are trained to spot, report and act — never to just occupy a chair.' },
  { icon: 'globe', title: 'Coverage', desc: 'Metro, provincial and multi-site coverage from a single accountable partner.' },
  { icon: 'heart', title: 'Service', desc: 'This is a service industry. Clients and applicants are treated with respect.' },
];

const STATS = [
  { value: '15+', label: 'Years securing businesses' },
  { value: '1,200+', label: 'Trained & vetted officers' },
  { value: '350+', label: 'Active client sites' },
  { value: '24/7', label: 'Dispatch & monitoring' },
];

export default function About() {
  const reveal = useRevealOnScroll();
  return (
    <div ref={reveal}>
      <PageHeader
        breadcrumb={[{ label: 'About' }]}
        title="Built by operators, for operators"
        subtitle="A.eye exists because security manpower should feel like a partnership — not a vendor list."
      />

      <section className="section">
        <div className="container split">
          <div className="split-visual" aria-hidden="true">
            <Icon name="eye" size={110} />
          </div>
          <div>
            <h2 className="section-title">Our story</h2>
            <p style={{ marginBottom: 'var(--space-4)' }}>
              A.eye started with a simple observation: most security incidents in commercial buildings
              are caught not by technology, but by a well-placed, well-trained guard paying attention.
            </p>
            <p style={{ marginBottom: 'var(--space-4)' }}>
              We built an agency around that insight — investing in screening, supervision and honest
              reporting instead of just headcount. Today we deploy officers across offices, logistics,
              events and executive protection, backed by a dispatch center that never sleeps.
            </p>
            <p className="muted">
              The site you are viewing is a prototype built for A.eye's management review. All data on
              this site is sample data.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--c-navy-900)', color: 'var(--c-white)' }}>
        <div className="container">
          <div className="stat-grid">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="card stat-card"
                style={{
                  background: 'var(--c-navy-800)',
                  borderColor: 'rgba(255,255,255,0.15)',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}
              >
                <p className="stat-value" style={{ color: 'var(--c-cyan)', fontSize: 'var(--text-2xl)' }}>
                  {s.value}
                </p>
                <p className="stat-label" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 'var(--space-6)', color: 'rgba(255,255,255,0.6)', fontSize: 'var(--text-xs)' }}>
            Company figures shown are sample marketing data for the prototype.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">What we value</h2>
          <div className="svc-grid" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
            {VALUES.map((v) => (
              <article key={v.title} className="card svc-card">
                <span className="svc-icon">
                  <Icon name={v.icon} size={24} />
                </span>
                <h3 className="svc-title">{v.title}</h3>
                <p className="svc-desc">{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}