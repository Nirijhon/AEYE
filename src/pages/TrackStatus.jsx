import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import Icon from '../components/ui/Icon';
import Card from '../components/ui/Card';
import { Field, Input } from '../components/forms/Fields';
import { lookupApplication, lookupDemoApplication } from '../services/applicationsService';
import { DemoNotice } from '../components/ui/Toast';
import { required } from '../utils/validate';
import EmptyState from '../components/ui/States';

export default function TrackStatus() {
  const [code, setCode] = useState('');
  const [state, setState] = useState('idle'); // idle | loading | found | notfound | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const search = async (ref) => {
    setCode(code || ref);
    setState('loading');
    try {
      const res = await lookupApplication(ref || code);
      if (res) {
        setResult(res);
        setState('found');
      } else {
        setState('notfound');
      }
    } catch {
      setState('error');
    }
  };

  const tryDemo = async () => {
    setState('loading');
    try {
      setResult(await lookupDemoApplication());
      setState('found');
    } catch {
      setState('error');
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const err = required(code, 'Reference code');
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    search();
  };

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Track application' }]}
        title="Track your application"
        subtitle="Enter the reference code you received after applying to see where your application stands."
      />

      <section className="section">
        <div className="container">
          <Card className="form-panel" style={{ maxWidth: 560 }}>
            <form onSubmit={submit} noValidate>
              <Field label="Reference code" htmlFor="refCode" required hint="Looks like APP-12345" error={error}>
                <Input id="refCode" name="refCode" value={code} onChange={(e) => setCode(e.target.value)} placeholder="APP-" style={{ textTransform: 'uppercase' }} />
              </Field>
              <div className="form-actions">
                <Button type="submit" variant="primary" loading={state === 'loading'}>
                  Track status
                </Button>
              </div>
            </form>
            <DemoNotice>
              Haven't applied yet? Try the demo below to preview how tracking works.
            </DemoNotice>
            <Button variant="outline" size="sm" onClick={tryDemo} disabled={state === 'loading'}>
              <Icon name="info" size={15} /> Try with a demo application
            </Button>
          </Card>
        </div>
      </section>

      <section className="section" aria-live="polite">
        <div className="container" style={{ maxWidth: 720 }}>
          {state === 'loading' && (
            <div className="spinner-center" role="status" aria-label="Looking up application">
              <div className="spinner spinner-lg" />
              <p>Looking up your application…</p>
            </div>
          )}

          {state === 'error' && (
            <EmptyState
              icon="alert"
              title="Couldn't reach the tracking service"
              sub="This is the simulated error state. Please try again in a moment."
              action={<Button variant="outline" onClick={() => setState('idle')}>Try again</Button>}
            />
          )}

          {state === 'notfound' && (
            <EmptyState
              icon="search"
              title="No application found with that code"
              sub="Check the code you entered — it should look like APP-12345. If you applied from a different device or browser, this demo cannot see it."
              action={<Button variant="outline" onClick={tryDemo}>Try the demo application instead</Button>}
            />
          )}

          {state === 'found' && result && (
            <TrackerCard result={result} />
          )}
        </div>
      </section>
    </>
  );
}

function TrackerCard({ result }) {
  return (
    <div className="card card-pad">
      <div className="dash-section-head" style={{ marginBottom: 'var(--space-3)' }}>
        <h2 className="dash-section-title">{result.jobTitle}</h2>
        <Button variant="outline" size="sm" onClick={() => window.print()}>
          <Icon name="download" size={14} /> Save
        </Button>
      </div>
      <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>
        <strong style={{ color: 'var(--c-navy-800)' }}>{result.applicant}</strong> · Ref {result.ref} · Submitted{' '}
        {new Date(result.submittedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
      </p>
      <ul className="tracker">
        {result.milestones.map((m) => (
          <li key={m.key} className={`tracker-item ${m.status}`}>
            <span className="tracker-dot">
              {m.status === 'done' ? <Icon name="check" size={15} /> : m.key === 'submitted' ? 1 : ''}
            </span>
            <div className="tracker-body">
              <p className="tracker-title">{m.label}</p>
              <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>{m.hint}</p>
              {m.date && <p className="tracker-date">{new Date(m.date).toLocaleDateString()}</p>}
            </div>
          </li>
        ))}
      </ul>
      <DemoNotice>
        Status shown is simulated for the prototype. A real implementation would read from the hiring system.
      </DemoNotice>
    </div>
  );
}