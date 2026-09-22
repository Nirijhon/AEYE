import React, { useEffect, useState } from 'react';
import SectionHeading from '../../components/ui/SectionHeading';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import JobCard from '../../components/jobs/JobCard';
import { listJobPosts, getCareersEnabled } from '../../services/adminService';

/**
 * Home careers teaser — driven by the admin console master switch.
 * ON + published posts → “Now hiring” preview with the latest roles.
 * OFF (default) → “coming soon” announcement only.
 */
export function JobsPreview() {
  const [state, setState] = useState(null); // null = loading

  useEffect(() => {
    let live = true;
    Promise.all([getCareersEnabled(), listJobPosts()]).then(([enabled, all]) => {
      if (live) setState({ enabled, published: all.filter((p) => p.postStatus === 'Published') });
    });
    return () => {
      live = false;
    };
  }, []);

  return (
    <section className="section" style={{ background: 'var(--c-slate-50)' }}>
      <div className="container">
        {state === null ? (
          <div className="spinner-center" role="status" aria-label="Loading careers info">
            <div className="spinner spinner-lg" />
          </div>
        ) : state.enabled && state.published.length ? (
          <>
            <SectionHeading
              eyebrow="Now hiring"
              title="We are expanding our ranks"
              sub={`Open roles across Metro Manila and Cebu. No experience? Most guard posts include full training.`}
              centered
              action={
                <div style={{ marginTop: 'var(--space-3)' }}>
                  <Button to="/careers" variant="outline" size="md">
                    View all {state.published.length} openings
                  </Button>
                </div>
              }
            />
            <div className="jobs-list">
              {state.published.slice(0, 3).map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </>
        ) : (
          <SectionHeading
            eyebrow="Careers"
            title="Career opportunities — coming soon"
            sub="We're preparing our new careers portal. Openings across Metro Manila and Cebu will be posted here in a future update."
            centered
            action={
              <div style={{ marginTop: 'var(--space-3)' }}>
                <Button to="/careers" variant="outline" size="md">
                  Learn more
                </Button>
              </div>
            }
          />
        )}
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
                Hiring security? We can draft a plan today. Want to work with us?
                Our careers portal is launching soon — watch that space.
              </p>
            </div>
            <div className="cta-actions">
              <Button to="/request-personnel" variant="white" size="lg">
                <Icon name="shield" size={18} />
                Hire personnel
              </Button>
              <Button to="/careers" variant="outline-light" size="lg">
                <Icon name="clock" size={18} />
                Careers — coming soon
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
