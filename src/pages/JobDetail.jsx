import React from 'react';
import Link from '../components/ui/Link';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Icon from '../components/ui/Icon';
import EmptyState from '../components/ui/States';
import JobCard from '../components/jobs/JobCard';
import { jobs, getJob } from '../data/jobs';

export default function JobDetail({ jobId: propJobId }) {
  const queryId = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('id') : null;
  const id = propJobId || queryId;
  const job = getJob(id);

  if (!job) {
    return (
      <div className="container section">
        <EmptyState
          icon="search"
          title="Job listing not found"
          sub="That opening may have closed or the link is outdated. Browse other current openings instead."
          action={<Button to="/careers" variant="primary">View current openings</Button>}
        />
      </div>
    );
  }

  const related = jobs.filter((j) => j.category === job.category && j.id !== job.id).slice(0, 2);

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Careers', to: '/careers' }, { label: job.title }]}
        title={job.title}
        subtitle={`${job.location} · ${job.type} · ${job.shift} shift`}
      />

      <section className="section">
        <div className="container">
          <div className="job-detail-grid">
            <article className="job-body">
              <h3>About the role</h3>
              <p>{job.summary}</p>

              <h3>Requirements</h3>
              <ul>
                {job.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>

              <h3>Preferred qualifications</h3>
              <ul>
                {job.preferred.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>

              <h3>Education & experience</h3>
              <p>
                <strong>Education:</strong> {job.education}
              </p>
              <p>
                <strong>Experience:</strong> {job.experience}
              </p>

              <h3>What we offer</h3>
              <ul className="benefits">
                {job.benefits.map((b) => (
                  <li key={b}>
                    <Icon name="check" size={14} /> {b}
                  </li>
                ))}
              </ul>

              <p className="muted" style={{ fontSize: 'var(--text-sm)', marginTop: 'var(--space-6)' }}>
                {job.applyNote}
              </p>
            </article>

            <aside className="job-detail-side" aria-label="Job summary">
              <div className="card">
                <div className="job-card-top" style={{ padding: 'var(--space-4)' }}>
                  <div>
                    <h3 style={{ fontSize: 'var(--text-base)' }}>{job.title}</h3>
                    <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>
                      {job.location}
                    </p>
                  </div>
                  <Badge variant={job.urgent ? 'danger' : 'success'}>{job.urgent ? 'Urgent' : 'Open'}</Badge>
                </div>
                <div className="card-pad" style={{ padding: 'var(--space-4)' }}>
                  <dl className="review-list">
                    <SideFact icon="wallet" label="Salary" value={job.salary} />
                    <SideFact icon="briefcase" label="Type" value={job.type} />
                    <SideFact icon="clock" label="Shift" value={job.shift} />
                    <SideFact icon="mapPin" label="Location" value={job.location} />
                    <SideFact icon="users" label="Slots open" value={`${job.slots}`} />
                  </dl>
                  <div style={{ marginTop: 'var(--space-4)' }}>
                    <Button to={`/apply/${job.id}`} variant="primary" fullWidth size="lg">
                      <Icon name="clipboard" size={17} />
                      Apply for this job
                    </Button>
                    <p className="muted" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-2)' }}>
                      Application takes about 3 minutes. You will receive a reference code to track progress.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card card-pad">
                <h4 style={{ marginBottom: 'var(--space-2)' }}>Before you apply</h4>
                <ul style={{ fontSize: 'var(--text-sm)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li>Valid government ID required.</li>
                  <li>Background check & medical clearance are part of hiring.</li>
                  <li>Demo site — your application is stored only in this browser.</li>
                </ul>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: 'var(--space-12)' }}>
              <h2 className="section-title" style={{ fontSize: 'var(--text-xl)' }}>
                Similar openings
              </h2>
              <div className="jobs-list">
                {related.map((r) => (
                  <JobCard key={r.id} job={r} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function SideFact({ icon, label, value }) {
  return (
    <div className="side-fact" style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
      <Icon name={icon} size={16} />
      <div>
        <strong style={{ display: 'block' }}>{value}</strong>
        <span style={{ color: 'var(--c-slate-500)', fontSize: 'var(--text-xs)' }}>{label}</span>
      </div>
    </div>
  );
}