import React from 'react';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';

const CLIENT_STEPS = [
  { title: 'Tell us what you need', desc: 'Service type, site, headcount and schedule — a 2-minute form, no obligation.' },
  { title: 'Get a staffing plan', desc: 'Our ops desk responds within 4 business hours with a proposal and quote.' },
  { title: 'Approve & deploy', desc: 'Officers are screened, uniformed and on site by your agreed start date.' },
  { title: 'Track everything', desc: 'Daily reports, guard rosters and an incident dashboard you can audit anytime.' },
];

const APPLICANT_STEPS = [
  { title: 'Browse open roles', desc: 'Filter by location, shift and specialty to find your fit.' },
  { title: 'Apply in minutes', desc: 'One streamlined application — no accounts, no paperwork maze.' },
  { title: 'Interview & screening', desc: 'Shortlisted candidates are invited for a quick interview and checks.' },
  { title: 'Track your status', desc: 'Use your reference code to follow your application at every stage.' },
];

function FlowSection({ eyebrow, title, sub, steps, ctaLabel, ctaTo, note, icon, tint }) {
  return (
    <div className="section">
      <div className="container">
        <SectionHeading eyebrow={eyebrow} title={title} sub={sub} centered />
        <div className="steps-grid">
          {steps.map((s, i) => (
            <article key={s.title} className="card step-card">
              <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
            </article>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 'var(--space-8)' }}>
          <Button to={ctaTo} variant={tint === 'primary' ? 'primary' : 'secondary'} size="lg">
            <Icon name={icon} size={18} />
            {ctaLabel}
          </Button>
        </div>
        {note && (
          <p className="text-center muted" style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-3)' }}>
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

export function ClientFlow() {
  return (
    <FlowSection
      eyebrow="For clients"
      title="Request personnel in four simple steps"
      sub="The shortest path between “we need guards” and “they're on site”."
      steps={CLIENT_STEPS}
      ctaLabel="Request security personnel"
      ctaTo="/request-personnel"
      icon="shield"
      tint="primary"
    />
  );
}

export function ApplicantFlow() {
  return (
    <FlowSection
      eyebrow="For applicants"
      title="Find a security job that fits your life"
      sub="Full-time, part-time and event roles across the country — apply and track everything from your phone."
      steps={APPLICANT_STEPS}
      ctaLabel="Browse open jobs"
      ctaTo="/careers"
      icon="user"
      tint="secondary"
      note="Track your application anytime with the reference code you receive after applying."
    />
  );
}