import React from 'react';
import { Link } from 'react-router-dom';
import services from '../../data/services';
import SectionHeading from '../../components/ui/SectionHeading';
import Icon from '../../components/ui/Icon';
import Button from '../../components/ui/Button';

export function TrustStrip() {
  const items = [
    { icon: 'badgeCheck', label: 'Licensed & Background-Checked' },
    { icon: 'award', label: 'Insured & Bonded' },
    { icon: 'globe', label: 'Nationwide Deployment' },
    { icon: 'clock', label: '24/7 Dispatch Center' },
    { icon: 'heart', label: '98% Client Retention' },
  ];
  return (
    <section className="trust-strip" aria-label="Credentials">
      <div className="container trust-grid">
        {items.map((it) => (
          <div key={it.label} className="trust-item">
            <Icon name={it.icon} size={20} />
            {it.label}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ServicesPreview() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="What we do"
          title="CCTV • Security Systems • Networking"
          sub="Smart security and reliable technology — installed, repaired and maintained for homes and businesses."
          centered
        />
        <div className="svc-grid">
          {services.slice(0, 6).map((s) => (
            <article key={s.id} className="card card-hover svc-card">
              <span className="svc-icon">
                <Icon name={s.icon} size={24} />
              </span>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-desc">{s.desc}</p>
              <Link to="/services" className="svc-link">
                Explore {s.title} <Icon name="chevronRight" size={14} />
              </Link>
            </article>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 'var(--space-8)' }}>
          <Button to="/services" variant="outline" size="lg">
            View all services
          </Button>
        </div>
      </div>
    </section>
  );
}