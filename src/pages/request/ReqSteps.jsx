import React from 'react';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { Field, Input, Select } from '../../components/forms/Fields';
import services from '../../data/services';
import ReqContact from './ReqContact';

const SITE_TYPES = ['Corporate office', 'Retail / mall', 'Warehouse / logistics', 'Condominium', 'Hotel', 'Construction site', 'Event venue', 'Other'];
const SHIFTS = ['Day (06:00–14:00)', 'Swing (14:00–22:00)', 'Night (22:00–06:00)', 'Graveyard + pickup', '24/7 rotation (mix)', 'Business hours only'];
const DURATIONS = ['Under 1 month (temp)', '1–3 months', '3–6 months', '6–12 months', '12+ months / ongoing'];

export default function ReqSteps({ step, values, errors, set, next, back, submit, submitting }) {
  if (step === 0) return needs();
  if (step === 1) return schedule();
  return <ReqContact values={values} errors={errors} set={set} back={back} submit={submit} submitting={submitting} />;

  function needs() {
    return (
      <form className="form-group" onSubmit={(e) => e.preventDefault()} noValidate>
        <Field label="Security service" htmlFor="service" required error={errors.service}>
          <Select id="service" value={values.service} onChange={set('service')}>
            <option value="">Select a service…</option>
            {services.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
          </Select>
        </Field>
        <div className="form-grid">
          <Field label="Site type" htmlFor="siteType" required error={errors.siteType}>
            <Select id="siteType" value={values.siteType} onChange={set('siteType')}>
              <option value="">Site type…</option>
              {SITE_TYPES.map((t) => <option key={t}>{t}</option>)}
            </Select>
          </Field>
          <Field label="City / location" htmlFor="city" required error={errors.city}>
            <Input id="city" value={values.city} onChange={set('city')} placeholder="e.g. Makati" />
          </Field>
        </div>
        <Field label="Number of officers needed" htmlFor="headcount" required hint="For events this can be dozens — we scale crews accordingly." error={errors.headcount}>
          <Input id="headcount" type="number" min={1} max={500} value={values.headcount} onChange={set('headcount')} inputMode="numeric" />
        </Field>
        <div className="form-actions">
          <Button type="submit" variant="primary" fullWidth size="lg" onClick={next}>
            Continue to schedule <Icon name="chevronRight" size={15} />
          </Button>
        </div>
      </form>
    );
  }

  function schedule() {
    return (
      <form className="form-group" onSubmit={(e) => e.preventDefault()} noValidate>
        <div className="form-grid">
          <Field label="Earliest start date" htmlFor="startDate" required error={errors.startDate}>
            <Input id="startDate" type="date" value={values.startDate} onChange={set('startDate')} />
          </Field>
          <Field label="Contract duration" htmlFor="duration" required error={errors.duration}>
            <Select id="duration" value={values.duration} onChange={set('duration')}>
              <option value="">Select…</option>
              {DURATIONS.map((d) => <option key={d}>{d}</option>)}
            </Select>
          </Field>
        </div>
        <Field label="Shift schedule" htmlFor="shift" required error={errors.shift}>
          <Select id="shift" value={values.shift} onChange={set('shift')}>
            <option value="">Select a schedule…</option>
            {SHIFTS.map((s) => <option key={s}>{s}</option>)}
          </Select>
        </Field>
        <Field label="On-site contact (optional)" htmlFor="siteContact" hint="Who reviews post-orders and daily reports.">
          <Input id="siteContact" value={values.siteContact} onChange={set('siteContact')} autoComplete="name" />
        </Field>
        <div className="form-actions">
          <Button variant="outline" onClick={back}>← Back</Button>
          <Button type="submit" variant="primary" onClick={next}>
            Continue to contact <Icon name="chevronRight" size={15} />
          </Button>
        </div>
      </form>
    );
  }
}