import React, { useEffect, useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import EmptyState from '../components/ui/States';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import JobCard from '../components/jobs/JobCard';
import { listJobPosts, getCareersEnabled } from '../services/adminService';

/**
 * Careers page.
 * Controlled by the admin console's master switch: when careers are
 * OFF the page shows the “coming soon” placeholder; when ON, only
 * job posts the admin has set to “Published” appear.
 */
export default function Careers() {
  const [state, setState] = useState(null); // null = loading, else { enabled, published }

  useEffect(() => {
    let live = true;
    Promise.all([getCareersEnabled(), listJobPosts()]).then(([enabled, all]) => {
      if (live) setState({ enabled, published: all.filter((p) => p.postStatus === 'Published') });
    });
    return () => {
      live = false;
    };
  }, []);

  const hasOpen = Boolean(state && state.enabled && state.published.length);

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Careers' }]}
        title={hasOpen ? 'Work that matters — join the A.eye team' : 'Careers — coming soon'}
        subtitle={
          hasOpen
            ? 'Licensed officers, monitoring specialists and technicians. Full training for the right attitude.'
            : 'Our careers portal is being prepared. Openings published by our team will appear here.'
        }
      />

      <section className="section">
        <div className="container">
          {state === null ? (
            <div className="spinner-center" role="status" aria-label="Loading job listings">
              <div className="spinner spinner-lg" />
              <p>Loading job listings…</p>
            </div>
          ) : hasOpen ? (
            <>
              <p className="jobs-count" aria-live="polite">
                <strong>{state.published.length}</strong> open position{state.published.length === 1 ? '' : 's'}
              </p>
              <div className="jobs-list">
                {state.published.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              icon="clock"
              title="For future updates"
              sub="We are not posting openings just yet. New roles across security operations, CCTV installation and networking will be announced on this page in a future update — check back soon."
              action={
                <div
                  style={{
                    marginTop: 'var(--space-3)',
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <Button to="/" variant="primary" size="md">
                    <Icon name="arrowRight" size={16} />
                    Back to Home
                  </Button>
                  <Button to="/request-personnel" variant="outline" size="md">
                    Request Personnel
                  </Button>
                </div>
              }
            />
          )}
        </div>
      </section>
    </>
  );
}


