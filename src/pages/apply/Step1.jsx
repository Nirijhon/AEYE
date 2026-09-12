import React from 'react';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { Field, Input } from '../../components/forms/Fields';

export default function Step1({ values, errors, set, next }) {
  return (
    <form className="form-group" onSubmit={(e) => e.preventDefault()} noValidate>
      <div className="form-grid">
        <Field label="First name" htmlFor="firstName" required error={errors.firstName}>
          <Input id="firstName" name="firstName" autoComplete="given-name" value={values.firstName} onChange={set('firstName')} placeholder="Juan" />
        </Field>
        <Field label="Last name" htmlFor="lastName" required error={errors.lastName}>
          <Input id="lastName" name="lastName" autoComplete="family-name" value={values.lastName} onChange={set('lastName')} placeholder="Dela Cruz" />
        </Field>
      </div>
      <div className="form-grid">
        <Field label="Email address" htmlFor="email" required hint="Where we send your application updates." error={errors.email}>
          <Input id="email" type="email" name="email" autoComplete="email" value={values.email} onChange={set('email')} placeholder="you@example.com" />
        </Field>
        <Field label="Mobile number" htmlFor="phone" required error={errors.phone}>
          <Input id="phone" type="tel" name="phone" autoComplete="tel" value={values.phone} onChange={set('phone')} placeholder="+63 9xx xxx xxxx" inputMode="tel" />
        </Field>
      </div>
      <Field label="City of residence" htmlFor="city" required error={errors.city}>
        <Input id="city" name="city" autoComplete="address-level2" value={values.city} onChange={set('city')} placeholder="e.g. Quezon City" />
      </Field>
      <div className="form-actions">
        <Button type="submit" variant="primary" fullWidth size="lg" onClick={next}>
          Continue <Icon name="chevronRight" size={15} />
        </Button>
      </div>
    </form>
  );
}