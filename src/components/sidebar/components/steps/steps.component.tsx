import { Step, type StepProps } from '@components/sidebar/components/step/step.component';
import cn from '@components/sidebar/components/steps/steps.module.css';

export interface StepsProps {
  data: StepProps[];
}

export const Steps = (props: StepsProps) => {
  const { data } = props;

  return (
    <ul className={cn.Steps}>
      {data.map(({ state, text }) => (
        <li key={text}>
          <Step state={state} text={text} />
        </li>
      ))}
    </ul>
  );
};
