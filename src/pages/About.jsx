import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import SectionHeading from '../components/ui/SectionHeading';
import Icon from '../components/ui/Icon';
import { COMPANY, MISSION, VISION, PILLARS, VALUE_PROPOSITION } from '../data/company';
import { useRevealOnScroll } from '../hooks/useReveal';

export default function About() {
  const reveal = useRevealOnScroll();
  return (
    <div ref={reveal}>
      <PageHeader
        breadcrumb={[{ label: 'About' }]}
        title="Integrated Security & IT Solutions"
        subtitle={COMPANY.description}
      />

      <section className="section">
        <div className="container split">
          <div className="split-visual" aria-hidden="true">
            <Icon name="eye" size={110} />
          </div>
          <div>
            <h2 className="section-title">Who we are</h2>
            <p style={{ marginBottom: 'var(--space-4)' }}>
              A-Eye System Technologies Inc. is a Philippine-based IT and security solutions
              provider specializing in <strong>CCTV systems, electronic security, networking,
              and structured IT infrastructure</strong>.
            </p>
            <p style={{ marginBottom: 'var(--space-4)' }}>
              From site survey to design, installation, testing and turnover, we deliver
              quality products with professional installation — and back them with continuous
              after-sales support.
            </p>
            <div className="card" style={{ flexDirection: 'column', gap: '0.5rem', padding: 'var(--space-4)' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <Icon name="mapPin" size={16} />
                <span style={{ fontSize: 'var(--text-sm)' }}>{COMPANY.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Icon name="phone" size={16} />
                <span style={{ fontSize: 'var(--text-sm)' }}>{COMPANY.phones.join(' / ')}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Icon name="mail" size={16} />
                <span style={{ fontSize: 'var(--text-sm)' }}>{COMPANY.emails.join(' / ')}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Icon name="userCheck" size={16} />
                <span style={{ fontSize: 'var(--text-sm)' }}>
                  Authorized Contact: <strong>{COMPANY.authorizedContact.name}</strong> ({COMPANY.authorizedContact.role})
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-label="Office location map">
        <div className="container">
          <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
            <iframe
              title="A-Eye System Technology office — Sinocan Corporate Center, ASEANA Business Park, Parañaque City"
              src={COMPANY.mapEmbed}
              width="100%"
              height="360"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--c-slate-50)' }}>
        <div className="container">
          <div className="svc-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            <article className="card svc-card">
              <span className="svc-icon">
                <Icon name="target" size={24} />
              </span>
              <h3 className="svc-title">Our Mission</h3>
              <p className="svc-desc">{MISSION}</p>
            </article>
            <article className="card svc-card">
              <span className="svc-icon">
                <Icon name="star" size={24} />
              </span>
              <h3 className="svc-title">Our Vision</h3>
              <p className="svc-desc">{VISION}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What drives us"
            title="Our Core Pillars"
            sub="The four commitments behind every project we deliver."
            centered
          />
          <div className="svc-grid">
            {PILLARS.map((v) => (
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

      <section className="section" style={{ background: 'var(--c-navy-900)', color: 'var(--c-white)' }}>
        <div className="container">
          <h2 className="section-title" style={{ color: 'var(--c-white)' }}>Why choose A-Eye</h2>
          <p style={{ marginBottom: 'var(--space-6)', color: 'rgba(255,255,255,0.75)', maxWidth: 640 }}>
            Our value proposition — everything you get when you partner with A-Eye System
            Technologies Inc.
          </p>
          <div
            className="svc-grid"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}
          >
            {VALUE_PROPOSITION.map((item, i) => (
              <div
                key={item}
                className="card"
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: 'var(--space-4)',
                  background: 'var(--c-navy-800)',
                  borderColor: 'rgba(255,255,255,0.15)',
                }}
              >
                <span
                  style={{
                    color: 'var(--c-cyan)',
                    fontFamily: 'var(--font-accent)',
                    fontWeight: 700,
                    fontSize: 'var(--text-lg)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
