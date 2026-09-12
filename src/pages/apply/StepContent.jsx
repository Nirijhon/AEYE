import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

export default function StepContent(props) {
  if (props.step === 0) return <Step1 {...props} />;
  if (props.step === 1) return <Step2 {...props} />;
  return <Step3 {...props} />;
}