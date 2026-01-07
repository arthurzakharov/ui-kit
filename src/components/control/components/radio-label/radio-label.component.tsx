import type { ChoiceValue } from '@/components/control/types';
import type { RadioLabelProps } from '@/components/control/components/radio-label/radio-label.types';
import { useToggle } from 'usehooks-ts';
import '@/components/control/components/radio-label/radio-label.css';

export const RadioLabel = <T extends ChoiceValue>(props: RadioLabelProps<T>) => {
  const { children, id, value, choice, choices = [], state = 'idle' } = props;
  const [focused, toggleFocused] = useToggle(false);
  const [hovered, toggleHovered] = useToggle(false);

  return (
    <label
      htmlFor={id}
      className="control-radio-label"
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
