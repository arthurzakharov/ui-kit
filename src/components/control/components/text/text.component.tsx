import type { TextProps } from './text.types';
import clsx from 'clsx';
import { useBoolean, useToggle } from 'usehooks-ts';
import { Box } from '../box';
import { Input } from '../input';
import { Label } from '../label';
import './text.css';

export const Text = (props: TextProps) => {
  const { value: isIdle, setTrue: makeIdle, setFalse: makeActive } = useBoolean(true);
  const [focused, toggleFocused] = useToggle();

  const onAutofill = () => {
    makeActive();
  };

  const onAutofillCancel = () => {
    if (props.value) return;
    makeIdle();
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
    <Box state={props.state} focused={focused}>
      <label htmlFor={props.id} className="control-text">
        <div
          className={clsx(
            'control-text__label',
            !isIdle || props.value ? 'control-text__label--active' : 'control-text__label--idle',
          )}
        >
          <Label position={isIdle ? 'idle' : 'active'} state={isIdle ? 'idle' : props.state}>
            {props.label}
          </Label>
        </div>
        <Input
          disabled={props.disabled}
          type={props.type}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onAutofill={onAutofill}
          onAutofillCancel={onAutofillCancel}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </label>
    </Box>
  );
};
