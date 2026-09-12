import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/layout/PageHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Stepper from '../../components/ui/Stepper';
import Icon from '../../components/ui/Icon';
import { validateForm, required, email as emailRule, phone as phoneRule, fileName } from '../../utils/validate';
import { submitApplication } from '../../services/applicationsService';
import { useToast } from '../../components/ui/Toast';
import { getJob } from '../../data/jobs';
import EmptyState from '../../components/ui/States';
import StepContent from './StepContent';

const STEPS = [
  { key: 'personal', label: 'Personal info', hint: 'Name & contact' },
  { key: 'qualifications', label: 'Qualifications', hint: 'Experience & education' },
  { key: 'review', label: 'Review & submit', hint: 'Confirm details' },
];

const EMPTY = {
  firstName: '', lastName: '', email: '', phone: '', city: '',
  experience: '', eduLevel: '', credentials: [], resume: null,
  preferredStart: '', consent: false,
};

const RULES_1 = {
  firstName: [(v) => required(v, 'First name')],
  lastName: [(v) => required(v, 'Last name')],
  email: [(v) => emailRule(v, { required: true })],
  phone: [(v) => phoneRule(v, { required: true })],
  city: [(v) => required(v, 'City')],
};

const RULES_2 = {
  experience: [(v) => required(v, 'Experience level')],
  eduLevel: [(v) => required(v, 'Highest education')],
  resume: [fileName],
};

export default function Apply() {
  const { jobId } = useParams();
  const job = getJob(jobId);

  if (!job) {
    return (
      <div className="container section">
        <EmptyState icon="search" title="Application closed"
          sub="We couldn't find the position you're applying for. Browse current openings and pick another role."
          action={<Button to="/careers" variant="primary">Browse open jobs</Button>} />
      </div>
    );
  }

  const toast = useToast();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const set = (key) => (e) => {
    const { type, value, checked } = e.target;
    setValues((prev) => {
      if (type === 'checkbox') {
        if (key === 'credentials') {
          const cur = prev.credentials || [];
          const credentials = checked ? [...cur, value] : cur.filter((c) => c !== value);
          return { ...prev, credentials };
        }
        return { ...prev, [key]: checked };
      }
      return { ...prev, [key]: value };
    });
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const next = () => {
    const rules = step === 0 ? RULES_1 : RULES_2;
    const { errors: errs, hasError, firstError } = validateForm(values, rules);
    setErrors(errs);
    if (hasError) {
      toast.error('Check the highlighted fields', `Please fix “${firstError}” to continue.`);
      return;
    }
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async () => {
    const allRules = { ...RULES_1, ...RULES_2, consent: [(v) => (v ? null : 'Please accept the data consent to continue.')] };
    const { errors: errs, hasError } = validateForm(values, allRules);
    setErrors(errs);
    if (hasError) {
      toast.error('Please review the form', 'Make sure every required field is filled correctly.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await submitApplication({
        jobTitle: job.title, jobId,
        firstName: values.firstName, lastName: values.lastName,
        email: values.email, phone: values.phone, city: values.city,
        experience: values.experience, eduLevel: values.eduLevel,
        credentials: values.credentials, resumeFileName: values.resume?.name,
        preferredStart: values.preferredStart,
      });
      setResult(res);
      toast.success('Application submitted', `Reference ${res.ref} — keep it to track your status.`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      toast.error('Submission failed', 'This is the simulated error state. Nothing was lost — please try again.');
      setSubmitting(false);
    }
  };

  if (result) {
    return (
      <section className="section">
        <div className="container">
          <div className="success-panel">
            <span className="success-icon"><Icon name="checkCircle" size={44} /></span>
            <h1>Application received</h1>
            <p className="section-sub">
              Your application for <strong>{job.title}</strong> is in our talent queue. Save this code to track progress:
            </p>
            <span className="ref-code">{result.ref}</span>
            <p className="muted" style={{ fontSize: 'var(--text-sm)' }}>
              A confirmation email would normally be sent to {values.email}. This is a prototype, so your
              application is only stored in this browser.
            </p>
            <Button to="/track" variant="primary" size="lg">
              <Icon name="search" size={17} /> Track your application
            </Button>
            <Button to="/careers" variant="outline">Browse more jobs</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: 'Careers', to: '/careers' }, { label: job.title, to: `/careers/${job.id}` }, { label: 'Apply' }]}
        title="Apply for a security role"
        subtitle="Three short steps. Your details go straight to our talent desk (demo)."
      />
      <section className="form-page">
        <div className="container">
          <Card className="form-panel">
            <Stepper steps={STEPS} current={step} />
            <StepContent
              step={step}
              job={job}
              values={values}
              errors={errors}
              set={set}
              next={next}
              back={() => setStep(Math.max(0, step - 1))}
              submit={submit}
              submitting={submitting}
              upload={(file) => {
                setValues((prev) => ({ ...prev, resume: file }));
                setErrors((prev) => ({ ...prev, resume: undefined }));
              }}
            />
          </Card>
        </div>
      </section>
    </>
  );
}