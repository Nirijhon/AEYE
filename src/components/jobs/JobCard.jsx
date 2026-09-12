import React from 'react';
import { Link } from 'react-router-dom';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';
import Button from '../ui/Button';

/**
 * Job listing card. Renders a role with meta, tags, salary and an Apply CTA.
 */
export default function JobCard({ job }) {
  return (
    <article className="card card-hover job-card" aria-label={`${job.title} — ${job.location}`}>
      <div className="job-card-top">
        <div>
          <p className="job-meta" style={{ marginBottom: '0.3rem' }}>
            <span>
              <Icon name="mapPin" size={14} /> {job.location}
            </span>
            <span>
              <Icon name={job.shift === 'Shifting' ? 'clock' : 'calendar'} size={14} /> {job.shift}
            </span>
          </p>
          <h3 className="job-role">
            <Link to={`/careers/${job.id}`}>{job.title}</Link>
          </h3>
        </div>
        <Badge variant={job.urgent ? 'danger' : 'success'}>{job.urgent ? 'Urgent' : 'Open'}</Badge>
      </div>

      <div className="job-meta">
        <span>
          <Icon name="briefcase" size={14} /> {job.type}
        </span>
        {job.salary && (
          <span className="job-pay">
            <Icon name="dollar" size={14} /> {job.salary}
          </span>
        )}
      </div>

      <div className="job-tags">
        {job.tags.map((t) => (
          <Badge key={t} variant="neutral">
            {t}
          </Badge>
        ))}
      </div>

      <div className="job-card-footer">
        <span className="muted" style={{ fontSize: 'var(--text-xs)' }}>
          Posted {job.postedDaysAgo} day{job.postedDaysAgo === 1 ? '' : 's'} ago · {job.slots} slot{job.slots === 1 ? '' : 's'}
        </span>
        <Button to={`/careers/${job.id}`} variant="outline" size="sm">
          View details
        </Button>
      </div>
    </article>
  );
}