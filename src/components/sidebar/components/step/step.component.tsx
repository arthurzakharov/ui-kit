import { Animation } from '../../../animation/animation.component';
import type { State } from '../../../control/types';
import { Check, Circle, X } from 'lucide-react';
import clsx from 'clsx';
import cn from './step.module.css';

export interface StepProps {
  state: State;
  text: string;
}

export const Step = (props: StepProps) => {
  const { state = 'idle', text = '' } = props;

  return (
    <div className={cn.Step}>
      <div className={cn.StepIcon}>
        <Circle
          size={24}
          className={clsx(cn.StepCircle, {
            [cn.StepCircleIdle]: state === 'idle',
            [cn.StepCircleSuccess]: state === 'success',
            [cn.StepCircleError]: state === 'error',
          })}
        />
        <div className={cn.StepIconContent}>
          <Animation.FadeScale
            name="icon-x"
            condition={state === 'error'}
            duration={0.2}
            delay={0.2}
            className={cn.StepIconAnimate}
          >
            <X size={14} className={cn.StepX} />
          </Animation.FadeScale>
          <Animation.FadeScale
            name="icon-check"
            condition={state === 'success'}
            duration={0.2}
            delay={0.2}
            className={cn.StepIconAnimate}
          >
            <Check size={14} className={cn.StepCheck} />
          </Animation.FadeScale>
        </div>
      </div>
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
