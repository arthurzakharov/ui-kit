import type { ControlChoiceType, ChoiceValue, InputChangeSource, Interactive } from '@controls/utils/types';

export const useChoice = (value: ChoiceValue, id: string, cb: Interactive<ChoiceValue>['onChange']) => {
  const type: ControlChoiceType = typeof value === 'string' ? 'radio' : 'checkbox';

  return {
    type,
    onChoiceChange: (newValue: string, source?: InputChangeSource) => {
      if (typeof value === 'string') {
        cb(newValue, id, source);
      } else {
        cb(
          value.includes(newValue)
            ? value.filter((v) => v !== newValue).filter(Boolean)
            : [...value, newValue].filter(Boolean),
          id,
          source,
        );
      }
    },
  };
};
