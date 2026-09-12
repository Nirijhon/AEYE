import React from 'react';
import SectionHeading from '../../components/ui/SectionHeading';
import Icon from '../../components/ui/Icon';
import testimonials from '../../data/testimonials';

export function WhyUs() {
  const features = [
    { icon: 'shieldCheck', title: 'Rigorous vetting', desc: 'Every officer passes background checks, medical clearance and a licensing review before posting.' },
    { icon: 'layers', title: 'Supervision on the ground', desc: 'Roving supervisors and daily report cards keep quality consistent — not just a photo on a form.' },
    { icon: 'bell', title: '24/7 command center', desc: 'Monitoring, dispatch and escalation never sleep. Alerts reach response teams in minutes.' },
    { icon: 'clipboard', title: 'Transparent reporting', desc: 'Access rosters, incident logs and attendance data through a client dashboard (demo).' },
  ];
  return (
    <section className="section" style={{ background: 'var(--c-slate-50)' }}>
      <div className="container split">
        <div>
          <SectionHeading
            eyebrow="Why A.eye"
            title="Discipline you can audit. Service you can verify."
            sub="We built A.eye around the two things security buyers actually complain about: inconsistent posts and murky reporting."
          />
          <ul className="feature-list" style={{ padding: 0 }}>
            {features.map((f) => (
              <li key={f.title} className="feature-item">
                <span className="feature-icon">
                  <Icon name={f.icon} size={20} />
                </span>
                <div>
                  <h4 className="feature-title">{f.title}</h4>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="split-visual" aria-hidden="true">
          <Icon name="shield" size={110} />
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Client voices"
          title="Trusted by operations, facilities and events teams"
          centered
        />
        <div className="testi-grid">
          {testimonials.map((t) => (
            <article key={t.name} className="card testi-card">
              <span className="testi-stars" aria-label="Rated 5 out of 5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon key={i} name="star" size={15} />
                ))}
              </span>
              <p className="testi-text">“{t.quote}”</p>
              <div className="testi-author">
                <span className="testi-avatar" aria-hidden="true">
                  {t.initials}
                </span>
                <div>
                  <p className="testi-name">{t.name}</p>
                  <p className="testi-role">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}