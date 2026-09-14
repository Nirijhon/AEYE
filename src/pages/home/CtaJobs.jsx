import React from 'react';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import JobCard from '../../components/jobs/JobCard';
import { jobs, filterJobs } from '../../data/jobs';

export function JobsPreview({ limit = 3 }) {
  const featured = filterJobs({ categories: ['CCTV Installation', 'Security Operations'], locations: [] }).slice(0, limit);
  return (
    <section className="section" style={{ background: 'var(--c-slate-50)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Now hiring"
          title="We are expanding our ranks"
          sub="Open roles across Metro Manila and Cebu. No experience? Most guard posts include full training."
          centered
          action={
            <div style={{ marginTop: 'var(--space-3)' }}>
              <Button to="/careers" variant="outline" size="md">
                View all {jobs.length} openings
              </Button>
            </div>
          }
        />
        <div className="jobs-list">
          {featured.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-banner">
          <div className="cta-banner-grid">
            <div>
              <h2>Ready when you are — on both sides of the gate.</h2>
              <p>
                Hiring security? We can draft a plan today. Looking for work?
                New posts open every week. Pick your path.
              </p>
            </div>
            <div className="cta-actions">
              <Button to="/request-personnel" variant="white" size="lg">
                <Icon name="shield" size={18} />
                Hire personnel
              </Button>
              <Button to="/careers" variant="outline-light" size="lg">
                <Icon name="user" size={18} />
                Apply to jobs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}