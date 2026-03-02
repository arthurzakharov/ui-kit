import { useBoolean } from 'usehooks-ts';
import type { InputChangeSource } from '@controls/utils/types';

type UseControlInteractionParams<V> = {
  id: string;
  disabled?: boolean;
  onChange: (value: V, id: string, source?: InputChangeSource) => void;
  onFocus?: (id: string) => void;
  onBlur?: (id: string) => void;
};

export const useControlInteraction = <V>({
  id,
  disabled = false,
  onChange,
  onFocus,
  onBlur,
}: UseControlInteractionParams<V>) => {
  const { value: focused, setTrue: focus, setFalse: blur } = useBoolean(false);

  const emitChange = (value: V, source?: InputChangeSource) => {
    if (disabled) return;
    onChange(value, id, source);
  };

  const handleFocus = () => {
    if (disabled) return;
    focus();
    onFocus?.(id);
  };

  const handleBlur = () => {
    if (disabled) return;
    blur();
    onBlur?.(id);
  };

  return {
    focused,
    emitChange,
    handleFocus,
    handleBlur,
  };
};
