import type { ReactNode } from 'react';
import { useToggle } from 'usehooks-ts';
import type { ChoiceValue, RadioChoice, State } from '@controls/utils/types';
import type { Base } from '@utils/types';
import clsx from 'clsx';
import cn from '@controls/control-radio-label/control-radio-label.module.css';

type ControlRadioLabelChild = {
  focused: boolean;
  hovered: boolean;
  checked: boolean;
  state?: State;
};

export type ControlRadioLabelProps<T extends ChoiceValue> = {
  id: string;
  value: T;
  choice: RadioChoice;
  choices?: RadioChoice[];
  state?: State;
  children: (props: ControlRadioLabelChild) => ReactNode;
} & Base;

export const ControlRadioLabel = <T extends ChoiceValue>(props: ControlRadioLabelProps<T>) => {
  const { children, id, value, choice, choices = [], state = 'idle', className } = props;
  const [focused, toggleFocused] = useToggle(false);
  const [hovered, toggleHovered] = useToggle(false);

  return (
    <label
      data-testid="radio-label"
      htmlFor={id}
      className={clsx(cn.RadioLabel, className)}
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
