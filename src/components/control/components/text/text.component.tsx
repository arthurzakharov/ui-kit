import clsx from 'clsx';
import { useBoolean, useToggle } from 'usehooks-ts';
import type { State } from '@components/control/control.types';
import { Control, type InputProps } from '@components/control/control.component';
import cn from '@components/control/components/text/text.module.css';

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
    <Control.Box state={state} focused={focused}>
      <label htmlFor={id} className={cn.Text}>
        <div
          data-testid="text-label"
          className={clsx(cn.TextLabel, !isIdle || value ? cn.TextLabelActive : cn.TextLabelIdle)}
        >
          <Control.Label position={isIdle ? 'idle' : 'active'} state={isIdle ? 'idle' : state}>
            {label}
          </Control.Label>
        </div>
        <Control.Input
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
    </Control.Box>
  );
};
