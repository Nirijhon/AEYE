import React, { useRef, useState } from 'react';
import Button from '../../components/ui/Button';
import Icon from '../../components/ui/Icon';
import { Field, Select, CheckRow, RadioRow } from '../../components/forms/Fields';

export const EXP_OPTIONS = [
  ['none', 'No formal experience yet', 'Training is provided for most entry posts'],
  ['1-3', '1–3 years in security roles', 'Comfortable on post and with reporting'],
  ['3plus', '3+ years (or law-enforcement)', 'Ready for senior or armed assignments'],
];

const CREDENTIALS = [
  'Security license (licensed officer roles)',
  'First-aid / BLS certificate',
  'Fire-safety / BOSH certificate',
  'Driving license (patrol & escort roles)',
  'Private Investigator license',
];

export default function Step2({ values, errors, set, next, back, upload }) {
  return (
    <form className="form-group" onSubmit={(e) => e.preventDefault()} noValidate>
      <fieldset className="fieldset">
        <legend className="form-label">Security experience</legend>
        <div className="radio-group">
          {EXP_OPTIONS.map(([val, label, hint]) => (
            <RadioRow key={val} name="experience" value={val} checked={values.experience === val} onChange={set('experience')}
              label={<span><strong>{label}</strong>{hint ? <span className="form-hint"> — {hint}</span> : null}</span>} />
          ))}
        </div>
        {errors.experience && <ErrorNote text={errors.experience} />}
      </fieldset>

      <Field label="Highest education" htmlFor="eduLevel" required error={errors.eduLevel}>
        <Select id="eduLevel" name="eduLevel" value={values.eduLevel} onChange={set('eduLevel')}>
          <option value="">Select your highest level…</option>
          <option>Some high school</option>
          <option>High school graduate</option>
          <option>Vocational / technical diploma</option>
          <option>Some college</option>
          <option>College graduate</option>
          <option>Post-graduate</option>
        </Select>
      </Field>

      <div className="form-group">
        <p className="form-label">Credentials you hold (optional)</p>
        {CREDENTIALS.map((c) => (
          <CheckRow key={c} name="credentials" value={c} checked={values.credentials.includes(c)} onChange={set('credentials')} label={c} />
        ))}
      </div>

      <UploadZone onFile={upload} />
      {errors.resume && <ErrorNote text={errors.resume} />}

      <Field label="Earliest availability" htmlFor="preferredStart">
        <input className="input" id="preferredStart" type="date" value={values.preferredStart} onChange={set('preferredStart')} />
      </Field>

      <div className="form-actions">
        <Button variant="outline" onClick={back}>← Back</Button>
        <Button type="submit" variant="primary" onClick={next}>
          Review your application <Icon name="chevronRight" size={15} />
        </Button>
      </div>
    </form>
  );
}

function ErrorNote({ text }) {
  return <p className="form-error" role="alert"><Icon name="alert" size={13} /> {text}</p>;
}

/** Upload zone — demo only: captures metadata, nothing is transmitted. */
function UploadZone({ onFile }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  return (
    <div
      className={`upload-zone ${dragging ? 'is-dragging' : ''}`.trim()}
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click();
      }}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files?.[0]) onFile(e.dataTransfer.files[0]);
      }}
      aria-label="Upload your résumé (demo — file is not actually sent)"
    >
      <Icon name="upload" size={20} />
      <span>
        <strong>Drop your résumé here</strong> or click to browse — PDF, DOC, PNG (max 5MB, demo only)
      </span>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
        className="sr-only"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        tabIndex={-1}
      />
    </div>
  );
}