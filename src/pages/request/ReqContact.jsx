import React from 'react';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { Field, Input, Textarea, CheckRow } from '../../components/forms/Fields';
import { DemoNotice } from '../../components/ui/Toast';

export default function ReqContact({ values, errors, set, back, submit, submitting }) {
  return (
    <form className="form-group" onSubmit={(e) => e.preventDefault()} noValidate>
      <div className="form-grid">
        <Field label="Company name" htmlFor="company" required error={errors.company}>
          <Input id="company" value={values.company} onChange={set('company')} autoComplete="organization" placeholder="Acme Corp" />
        </Field>
        <Field label="Your full name" htmlFor="contactName" required error={errors.contactName}>
          <Input id="contactName" value={values.contactName} onChange={set('contactName')} autoComplete="name" />
        </Field>
      </div>
      <div className="form-grid">
        <Field label="Work email" htmlFor="email" required error={errors.email}>
          <Input id="email" type="email" value={values.email} onChange={set('email')} autoComplete="email" placeholder="you@company.com" />
        </Field>
        <Field label="Phone / mobile" htmlFor="phone" required error={errors.phone}>
          <Input id="phone" type="tel" value={values.phone} onChange={set('phone')} autoComplete="tel" inputMode="tel" />
        </Field>
      </div>
      <Field label="Anything else we should know?" htmlFor="notes" hint="Access hours, hazards, special equipment, current provider situation…">
        <Textarea id="notes" rows={3} value={values.notes} onChange={set('notes')} />
      </Field>

      <CheckRow id="consent" checked={values.consent} onChange={set('consent')}
        label="I agree to be contacted about this request and accept the demo privacy note (no data leaves this browser)." />
      {errors.consent && (
        <p className="form-error" role="alert">
          <Icon name="alert" size={13} /> {errors.consent}
        </p>
      )}

      <DemoNotice>
        This prototype doesn't send the request anywhere. It stores it locally so you can see the demo dashboard.
      </DemoNotice>

      <div className="form-actions">
        <Button variant="outline" onClick={back}>← Back</Button>
        <Button type="submit" variant="primary" size="lg" loading={submitting} onClick={submit}>
          <Icon name="shield" size={17} /> Submit request
        </Button>
      </div>
    </form>
  );
}