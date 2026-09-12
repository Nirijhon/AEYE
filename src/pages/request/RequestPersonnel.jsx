import React, { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Stepper from '../../components/ui/Stepper';
import Icon from '../../components/ui/Icon';
import Step from './ReqSteps';
import { validateForm, required, email as emailRule, phone as phoneRule, minNum, pastDate } from '../../utils/validate';
import { submitRequest } from '../../services/requestsService';
import { useToast, DemoNotice } from '../../components/ui/Toast';

const STEPS = [
  { key: 'needs', label: 'Your needs', hint: 'Service & site' },
  { key: 'schedule', label: 'Schedule', hint: 'Shifts & start' },
  { key: 'contact', label: 'Contact', hint: 'Who we reach' },
];

const EMPTY = {
  service: '', siteType: '', city: '', headcount: 1,
  startDate: '', shift: '', duration: '', siteContact: '',
  company: '', contactName: '', email: '', phone: '', notes: '', consent: false,
};

const RULES_1 = {
  service: [(v) => required(v, 'Service type')],
  siteType: [(v) => required(v, 'Site type')],
  city: [(v) => required(v, 'City / location')],
  headcount: [(v) => minNum(v, 1, 'Headcount')],
};

const RULES_2 = {
  startDate: [(v) => pastDate(v, 'Start date')],
  shift: [(v) => required(v, 'Shift schedule')],
  duration: [(v) => required(v, 'Contract duration')],
};

const RULES_3 = {
  company: [(v) => required(v, 'Company name')],
  contactName: [(v) => required(v, 'Your full name')],
  email: [(v) => emailRule(v, { required: true })],
  phone: [(v) => phoneRule(v, { required: true })],
  consent: [(v) => (v ? null : 'Please accept the privacy note to continue.')],
};

export default function RequestPersonnel() {
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const set = (key) => (e) => {
    const { type, checked, value } = e.target;
    setValues((prev) => ({ ...prev, [key]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateStep = () => {
    const rules = [RULES_1, RULES_2, RULES_3][step];
    const { errors: errs, hasError, firstError } = validateForm(values, rules);
    setErrors(hasError ? errs : {});
    return { hasError, firstError };
  };

  const next = () => {
    const { hasError, firstError } = validateStep();
    if (hasError) {
      toast.error('A few fields need attention', `Please check “${firstError}”.`);
      return;
    }
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async () => {
    const all = { ...RULES_1, ...RULES_2, ...RULES_3 };
    const { hasError } = validateForm(values, all);
    setErrors(hasError ? validateForm(values, all).errors : {});
    if (hasError) {
      toast.error('Please review the form', 'A few fields need attention before we can submit.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await submitRequest({
        service: values.service,
        siteType: values.siteType,
        city: values.city,
        headcount: Number(values.headcount),
        startDate: values.startDate,
        shift: values.shift,
        duration: values.duration,
        siteContact: values.siteContact,
        company: values.company,
        contactName: values.contactName,
        email: values.email,
        phone: values.phone,
        notes: values.notes,
      });
      setResult(res);
      toast.success('Request received', `Reference ${res.ref} — a representative will contact you.`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      toast.error('Submission failed', 'This is the simulated error state. Please try again.');
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <section className="section">
        <div className="container">
          <div className="success-panel">
            <span className="success-icon"><Icon name="checkCircle" size={44} /></span>
            <h1>Request received — we'll call you</h1>
            <p className="section-sub">
              Your request is in our operations queue. An A.eye representative will contact{' '}
              <strong>{values.contactName.split(' ')[0]}</strong> at <strong>{values.phone}</strong>{' '}
              within 4 business hours.
            </p>
            <span className="ref-code">{result.ref}</span>
            <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>
              Reference {result.ref} — keep it for the client dashboard demo. This prototype does not connect
              to a real backend, so no message was actually delivered.
            </p>
            <Button to="/dashboard" variant="primary" size="lg">
              <Icon name="clipboard" size={17} /> Open the client dashboard demo
            </Button>
            <Button to="/" variant="outline">Back to home</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Request personnel' }]}
        title="Request security personnel"
        subtitle="Tell us what your site needs. We respond with a plan and quote within 4 business hours (demo)."
      />
      <section className="form-page">
        <div className="container">
          <Card className="form-panel">
            <Stepper steps={STEPS} current={step} />
            <Step
              step={step}
              values={values}
              errors={errors}
              set={set}
              next={next}
              back={() => setStep(Math.max(0, step - 1))}
              submit={submit}
              submitting={submitting}
            />
          </Card>
        </div>
      </section>
    </>
  );
}