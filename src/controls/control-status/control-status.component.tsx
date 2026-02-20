import { Check, Circle, X } from 'lucide-react';
import clsx from 'clsx';
import type { State } from '@controls/utils/types';
import { AnimationFadeScale } from '@animations/animation-fade-scale';
import cn from '@controls/control-status/control-status.module.css';

export interface ControlStatusProps {
  state: State;
  className?: string;
}

export const ControlStatus = (props: ControlStatusProps) => {
  const { className, state = 'idle' } = props;

  return (
    <div className={clsx(cn.Status, className)}>
      <Circle
        size={24}
        className={clsx(cn.StatusCircle, {
          [cn.StatusCircleIdle]: state === 'idle',
          [cn.StatusCircleSuccess]: state === 'success',
          [cn.StatusCircleError]: state === 'error',
        })}
      />
      <div className={cn.StatusIconContent}>
        <AnimationFadeScale name="icon-x" condition={state === 'error'} className={cn.StatusIconAnimate}>
          <X size={14} className={cn.StatusX} />
        </AnimationFadeScale>
        <AnimationFadeScale name="icon-check" condition={state === 'success'} className={cn.StatusIconAnimate}>
          <Check size={14} className={cn.StatusCheck} />
        </AnimationFadeScale>
      </div>
    </div>
  );
};
