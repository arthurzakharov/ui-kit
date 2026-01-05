import type { AnimationEvent } from 'react';
import type { TextareaProps } from './textarea.types';
import { useBoolean, useToggle } from 'usehooks-ts';
import { Control } from '../../index';
import './textarea.css';

export const Textarea = (props: TextareaProps) => {
  const { setTrue: makeIdle, setFalse: makeActive } = useBoolean(true);
  const [focused, toggleFocused] = useToggle();

  const onAnimationStart = (e: AnimationEvent) => {
    if (e.animationName === 'autofill-start') makeActive();
    if (e.animationName === 'autofill-cancel' && !props.value) makeIdle();
  };

  const onFocus = (id: string) => {
    if (!props.value) makeActive();
    toggleFocused();
    props.onFocus?.call(null, id);
  };

  const onBlur = (id: string) => {
    if (!props.value) makeIdle();
    toggleFocused();
    props.onBlur?.call(null, id);
  };

  return (
    <Control.Box state={props.state} focused={focused}>
      <textarea
        disabled={props.disabled}
        id={props.id}
        rows={props.rows || 5}
        placeholder={props.placeholder}
        value={props.value}
        className="control-textarea"
        onChange={(e) => props.onChange(e.target.value, props.id, 'keyboard')}
        onAnimationStart={onAnimationStart}
        onFocus={() => onFocus(props.id)}
        onBlur={() => onBlur(props.id)}
      />
    </Control.Box>
  );
};
