import { Check, Circle, X } from 'lucide-react';
import clsx from 'clsx';
import { AnimationFadeScale } from '@animations/animation-fade-scale';
import type { State } from '@controls/utils/types';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/control-status/control-status.module.css';

interface ControlStatusProps extends Base {
  state: State;
}

/**
 * `ControlStatus` renders a compact visual marker that communicates validation result near a field.
 * Use it to show neutral (`idle`), success (`success`), or error (`error`) state consistently across form controls.
 */
export const ControlStatus = ({ state = 'idle', ...base }: ControlStatusProps) => (
  <div
    data-testid={baseProps(base, 'data-testid', 'control-status')}
    className={clsx(cn.ControlStatus, baseProps(base, 'className'))}
  >
    <Circle
      size={24}
      className={clsx(cn.Circle, {
        [cn.Idle]: state === 'idle',
        [cn.Success]: state === 'success',
        [cn.Error]: state === 'error',
      })}
    />
    <div className={cn.IconContent}>
      <AnimationFadeScale name="icon-x" condition={state === 'error'} className={cn.IconAnimate}>
        <X size={14} className={cn.X} />
      </AnimationFadeScale>
      <AnimationFadeScale name="icon-check" condition={state === 'success'} className={cn.IconAnimate}>
        <Check size={14} className={cn.Check} />
      </AnimationFadeScale>
    </div>
  </div>
);
