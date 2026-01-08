import type { Interactive, State } from '../../types';
import type { AnimationEvent } from 'react';
import { useBoolean, useToggle } from 'usehooks-ts';
import { Box } from '../box/box.component';
import cn from './textarea.module.css';

export interface TextareaProps extends Interactive<string> {
  state?: State;
  placeholder?: string;
  rows?: number;
  onAutofill?: (id: string) => void;
  onAutofillCancel?: (id: string) => void;
}

export const Textarea = (props: TextareaProps) => {
  const { state = 'idle', placeholder = '', rows = 5, id, value, disabled = false, onChange, onFocus, onBlur } = props;
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
    <Box state={state} focused={focused}>
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
    </Box>
  );
};
