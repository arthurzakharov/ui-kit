import type { State } from '../../types';
import clsx from 'clsx';
import { useBoolean, useToggle } from 'usehooks-ts';
import { Input, type InputProps } from '../input/input.component';
import { Label } from '../label/label.component';
import { Box } from '../box/box.component';
import cn from './text.module.css';

export interface TextProps extends InputProps {
  label: string;
  state?: State;
}

export const Text = (props: TextProps) => {
  // TODO: onAutofill onAutofillCancel are passed but are not used anywhere
  const { label, state = 'idle', type = 'text', id, value, disabled = false, onChange, onFocus, onBlur } = props;
  const { value: isIdle, setTrue: makeIdle, setFalse: makeActive } = useBoolean(true);
  const [focused, toggleFocused] = useToggle();

  const onAutofill = () => {
    makeActive();
  };

  const onAutofillCancel = () => {
    if (value) return;
    makeIdle();
  };

  const onInputFocus = (id: string) => {
    if (!value) makeActive();
    toggleFocused();
    onFocus?.call(null, id);
  };

  const onInputBlur = (id: string) => {
    if (!value) makeIdle();
    toggleFocused();
    onBlur?.call(null, id);
  };

  return (
    <Box state={state} focused={focused}>
      <label htmlFor={id} className={cn.Text}>
        <div
          data-testid="text-label"
          className={clsx(cn.TextLabel, !isIdle || value ? cn.TextLabelActive : cn.TextLabelIdle)}
        >
          <Label position={isIdle ? 'idle' : 'active'} state={isIdle ? 'idle' : state}>
            {label}
          </Label>
        </div>
        <Input
          disabled={disabled}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          onAutofill={onAutofill}
          onAutofillCancel={onAutofillCancel}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
        />
      </label>
    </Box>
  );
};
