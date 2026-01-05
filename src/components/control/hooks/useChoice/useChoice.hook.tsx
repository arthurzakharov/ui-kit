import type { ChoiceType, ChoiceValue, InputChangeSource, Interactive } from '../../types';

export default function useChoice(value: ChoiceValue, id: string, cb: Interactive<ChoiceValue>['onChange']) {
  const type: ChoiceType = typeof value === 'string' ? 'radio' : 'checkbox';

  return {
    type,
    onChange: (newValue: string, source?: InputChangeSource) => {
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
}
