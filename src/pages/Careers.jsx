import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import EmptyState from '../components/ui/States';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';

/**
 * Careers placeholder — the careers portal is not open yet.
 * Job listings will return in a future update.
 */
export default function Careers() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Careers' }]}
        title="Careers — coming soon"
        subtitle="Our careers portal is being prepared. Job openings will be posted here in a future update."
      />

      <section className="section">
        <div className="container">
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
        </div>
      </section>
    </>
  );
}

