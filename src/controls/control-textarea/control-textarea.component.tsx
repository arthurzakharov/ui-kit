import type { Interactive, State } from '@controls/utils/types';
import type { AnimationEvent } from 'react';
import { useBoolean, useToggle } from 'usehooks-ts';
import { ControlBox } from '@controls/control-box';
import type { Base } from '@utils/types';
import cn from '@controls/control-textarea/control-textarea.module.css';

export type ControlTextareaProps = {
  state?: State;
  placeholder?: string;
  rows?: number;
  onAutofill?: (id: string) => void;
  onAutofillCancel?: (id: string) => void;
} & Interactive<string> &
  Base;

export const ControlTextarea = (props: ControlTextareaProps) => {
  const {
    state = 'idle',
    placeholder = '',
    rows = 5,
    id,
    value,
    disabled = false,
    onChange,
    onFocus,
    onBlur,
    className,
  } = props;
  const { value: isIdle, setTrue: makeIdle, setFalse: makeActive } = useBoolean(true);
  const [focused, toggleFocused] = useToggle(false);

  const onAnimationStart = (e: AnimationEvent) => {
    if (e.animationName === cn['autofill-start']) makeActive();
    if (e.animationName === cn['autofill-cancel'] && !value) makeIdle();
  };

  const onTextareaFocus = (id: string) => {
    if (!value) makeActive();
    toggleFocused();
    onFocus?.call(null, id);
  };

  const onTextareaBlur = (id: string) => {
    if (!value) makeIdle();
    toggleFocused();
    onBlur?.call(null, id);
  };

  return (
    <ControlBox state={state} focused={focused} className={className}>
      <textarea
        data-testid="textarea"
        data-is-idle={isIdle}
        disabled={disabled}
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        className={cn.Textarea}
        onChange={(e) => onChange(e.target.value, id, 'keyboard')}
        onAnimationStart={onAnimationStart}
        onFocus={() => onTextareaFocus(id)}
        onBlur={() => onTextareaBlur(id)}
      />
    </ControlBox>
  );
};
