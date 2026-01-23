import type { ReactNode } from 'react';
import { useToggle } from 'usehooks-ts';
import type { ChoiceValue, RadioChoice, State } from '@components/control/control.types';
import cn from '@components/control/components/radio-label/radio-label.module.css';

export interface RadioLabelChild {
  focused: boolean;
  hovered: boolean;
  checked: boolean;
  state?: State;
}

export interface RadioLabelProps<T extends ChoiceValue> {
  id: string;
  value: T;
  choice: RadioChoice;
  choices?: RadioChoice[];
  state?: State;
  children: (props: RadioLabelChild) => ReactNode;
}

export const RadioLabel = <T extends ChoiceValue>(props: RadioLabelProps<T>) => {
  const { children, id, value, choice, choices = [], state = 'idle' } = props;
  const [focused, toggleFocused] = useToggle(false);
  const [hovered, toggleHovered] = useToggle(false);

  return (
    <label
      data-testid="radio-label"
      htmlFor={id}
      className={cn.RadioLabel}
      onFocus={() => toggleFocused()}
      onBlur={() => toggleFocused()}
      onMouseEnter={() => toggleHovered()}
      onMouseLeave={() => toggleHovered()}
    >
      {children({
        focused,
        hovered,
        checked: (() => {
          if (typeof value === 'string') {
            return value === choice.value;
          } else {
            return value.includes(choice.value);
          }
        })(),
        state: (() => {
          switch (state) {
            case 'success':
              return 'idle';
            case 'error':
              return choices.some((c) => c.value === value) ? (value === choice.value ? 'error' : 'idle') : 'error';
            case 'idle':
              return 'idle';
          }
        })(),
      })}
    </label>
  );
};
