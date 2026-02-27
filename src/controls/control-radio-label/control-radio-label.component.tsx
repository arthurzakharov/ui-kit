import type { ReactNode } from 'react';
import { useToggle } from 'usehooks-ts';
import clsx from 'clsx';
import type { ChoiceValue, RadioChoice, State } from '@controls/utils/types';
import { baseProps } from '@utils/functions';
import type { Base } from '@utils/types';
import cn from '@controls/control-radio-label/control-radio-label.module.css';

interface ControlRadioLabelProps<T extends ChoiceValue> extends Base {
  id: string;
  value: T;
  choice: RadioChoice;
  choices?: RadioChoice[];
  state?: State;
  children: (props: { focused: boolean; hovered: boolean; checked: boolean; state?: State }) => ReactNode;
}

/**
 * `ControlRadioLabel` provides a stateful wrapper for individual radio choices using the render props pattern.
 * It manages hover, focus, and checked states, passing them to child components. Use it to build custom radio UI implementations with consistent interaction behavior.
 */
export const ControlRadioLabel = <T extends ChoiceValue>(props: ControlRadioLabelProps<T>) => {
  const { children, id, value, choice, choices = [], state = 'idle', ...base } = props;
  const [focused, toggleFocused] = useToggle(false);
  const [hovered, toggleHovered] = useToggle(false);

  return (
    <label
      data-testid={baseProps(base, 'data-testid', 'control-radio-label')}
      htmlFor={id}
      className={clsx(cn.ControlRadioLabel, baseProps(base, 'className'))}
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
