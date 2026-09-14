import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import services from '../data/services';
import { COMPANY, TIMELINE, PAYMENT_TERMS, WARRANTY, SECTORS } from '../data/company';
import PortfolioGallery from '../components/sections/PortfolioGallery';
import { useRevealOnScroll } from '../hooks/useReveal';
import { useToast } from '../components/ui/Toast';

export default function ServicesPage() {
  const reveal = useRevealOnScroll();
  const toast = useToast();

  return (
    <div ref={reveal}>
      <PageHeader
        breadcrumb={[{ label: 'Services' }]}
        title="Products & Services"
        subtitle={COMPANY.tagline + ' — CCTV, electronic security, networking and structured IT infrastructure for businesses and homes.'}
      />

      <section className="section" aria-label="Service catalog">
        <div className="container">
          <SectionHeading
            eyebrow="What we offer"
            title="Integrated Security & IT Solutions"
            sub={COMPANY.description}
            centered
          />
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

      <PortfolioGallery />

      <section className="section" style={{ background: 'var(--c-slate-50)' }} aria-label="Project execution and timeline">
        <div className="container">
          <SectionHeading
            eyebrow="How we work"
            title="Project Execution & Timeline"
            sub="A clear, phased delivery process — from site survey to turnover."
            centered
          />
          <div className="card" style={{ maxWidth: 720, margin: '0 auto', padding: 'var(--space-6)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--c-slate-200)' }}>
                  <th style={{ padding: '0.5rem 0.75rem' }}>Phase / Activity</th>
                  <th style={{ padding: '0.5rem 0.75rem', textAlign: 'right' }}>Estimated Duration</th>
                </tr>
              </thead>
              <tbody>
                {TIMELINE.map((t) => (
                  <tr
                    key={t.phase}
                    style={{
                      borderBottom: '1px solid var(--c-slate-100)',
                      ...(t.total ? { fontWeight: 700, background: 'var(--c-slate-50)' } : {}),
                    }}
                  >
                    <td style={{ padding: '0.6rem 0.75rem' }}>{t.phase}</td>
                    <td style={{ padding: '0.6rem 0.75rem', textAlign: 'right', color: t.total ? 'var(--c-cyan)' : 'inherit' }}>
                      {t.duration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Payment terms and warranty">
        <div className="container">
          <div className="svc-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            <article className="card svc-card">
              <span className="svc-icon">
                <Icon name="wallet" size={24} />
              </span>
              <h3 className="svc-title">Payment Terms & Costs</h3>
              <p className="svc-desc">{PAYMENT_TERMS.pricing}</p>
              <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: 'var(--space-4)' }}>
                {PAYMENT_TERMS.schedule.map((p) => (
                  <li key={p.term} style={{ display: 'flex', gap: '0.75rem', alignItems: 'baseline' }}>
                    <strong style={{ minWidth: 48, color: 'var(--c-cyan)' }}>{p.pct}</strong>
                    <span>
                      <strong>{p.term}:</strong> {p.desc}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>{PAYMENT_TERMS.terms}</p>
            </article>

            <article className="card svc-card">
              <span className="svc-icon">
                <Icon name="shieldCheck" size={24} />
              </span>
              <h3 className="svc-title">Warranty & Client Terms</h3>
              <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <Icon name="badgeCheck" size={16} />
                  <span><strong>Workmanship Warranty:</strong> {WARRANTY.workmanship}</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <Icon name="award" size={16} />
                  <span><strong>Equipment Warranty:</strong> {WARRANTY.equipment}</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <Icon name="phone" size={16} />
                  <span><strong>Support Coverage:</strong> {WARRANTY.coverage}</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem' }}>
                  <Icon name="users" size={16} />
                  <span><strong>Client Obligations:</strong> {WARRANTY.obligations}</span>
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--c-slate-50)' }} aria-label="Target client sectors">
        <div className="container">
          <SectionHeading
            eyebrow="Who we serve"
            title="Target Client Sectors"
            centered
          />
          <div className="svc-grid" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
            {SECTORS.map((sec) => (
              <div key={sec.label} className="card svc-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem', padding: 'var(--space-4)' }}>
                <Icon name={sec.icon} size={20} />
                <span style={{ fontWeight: 600 }}>{sec.label}</span>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-10)' }}>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Ready to secure your site?</h3>
            <p className="muted" style={{ maxWidth: 520, margin: '0 auto var(--space-4)' }}>
              Tell us about your site and requirements. We will survey, propose a custom design,
              and deliver a standard-compliant installation — typically within 5–10 working days.
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
