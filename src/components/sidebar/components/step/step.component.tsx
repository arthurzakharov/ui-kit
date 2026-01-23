import { Control } from '@components/control/control.component';
import type { State } from '@components/control/control.types';
import clsx from 'clsx';
import cn from '@components/sidebar/components/steps/steps.module.css';

export interface StepProps {
  state: State;
  text: string;
}

export const Step = (props: StepProps) => {
  const { state = 'idle', text = '' } = props;

  return (
    <div className={cn.Step}>
      <Control.Status state={state} />
      <span
        className={clsx(cn.StepText, {
          [cn.StepTextIdle]: state === 'idle',
          [cn.StepTextActive]: state === 'success' || state === 'error',
        })}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};
