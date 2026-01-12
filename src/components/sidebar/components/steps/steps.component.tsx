import { Step, type StepProps } from '../step/step.component';
import cn from './steps.module.css';

export interface StepsProps {
  data: StepProps[];
}

export const Steps = (props: StepsProps) => {
  const { data } = props;

  return (
    <ul className={cn.Steps}>
      {data.map(({ state, text }) => (
        <li>
          <Step state={state} text={text} />
        </li>
      ))}
    </ul>
  );
};
