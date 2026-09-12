import React from 'react';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { CheckRow } from '../../components/forms/Fields';
import { DemoNotice } from '../../components/ui/Toast';
import { EXP_OPTIONS } from './Step2';

export default function Step3({ job, values, errors, set, back, submit, submitting }) {
  return (
    <>
      <dl className="review-list">
        <ReviewRow label="Role" value={job.title} />
        <ReviewRow label="Full name" value={`${values.firstName} ${values.lastName}`} />
        <ReviewRow label="Email" value={values.email} />
        <ReviewRow label="Mobile" value={values.phone} />
        <ReviewRow label="City" value={values.city} />
        <ReviewRow label="Experience" value={EXP_OPTIONS.find(([v]) => v === values.experience)?.[1] || '—'} />
        <ReviewRow label="Education" value={values.eduLevel} />
        {values.resume && <ReviewRow label="Resume" value={values.resume.name} />}
      </dl>

      <fieldset className="fieldset">
        <legend className="form-label">Confirmations</legend>
        <CheckRow id="consent" checked={values.consent} onChange={set('consent')}
          label="I confirm the information I provided is complete and accurate, and I consent to A.eye processing it for recruitment purposes." />
        {errors.consent && (
          <p className="form-error" role="alert">
            <Icon name="alert" size={13} /> {errors.consent}
          </p>
        )}
      </fieldset>

      <DemoNotice>
        Submitting stores your application in this browser only (demo). No database is connected.
      </DemoNotice>

      <div className="form-actions">
        <Button variant="outline" onClick={back}>← Back</Button>
        <Button type="submit" variant="primary" size="lg" loading={submitting} onClick={submit}>
          Submit application
        </Button>
      </div>
    </>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="review-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}