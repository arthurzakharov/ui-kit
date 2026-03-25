
import type { ReactNode } from 'react';
import { useToggle } from 'usehooks-ts';
import clsx from 'clsx';
import type { ChoiceValue, RadioChoice, State} from '@controls/utils';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/primitives/radio-label/radio-label.module.css';

type RadioLabelChildProps = {
  focused: boolean;
  hovered: boolean;
  checked: boolean;
  state?: State;
};

export interface RadioLabelProps<T> extends Base {
  id: string;
  value: T;
  choice: RadioChoice;
  choices?: RadioChoice[];
  state?: State;
  children: (props: RadioLabelChildProps) => ReactNode;
}

export const RadioLabel = <T extends ChoiceValue>({
  // RadioLabel props
  id,
  value,
  choice,
  choices = [],
  state = 'idle',
  children,
  // Base props
  ...base
}: RadioLabelProps<T>) => {
   const [focused, toggleFocused] = useToggle(false);
  const [hovered, toggleHovered] = useToggle(false);

  return (
    <label
      data-testid={baseProps(base, 'data-testid', 'radio-label')}
      htmlFor={id}
      className={clsx(cn.RadioLabel, baseProps(base, 'className'))}
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
