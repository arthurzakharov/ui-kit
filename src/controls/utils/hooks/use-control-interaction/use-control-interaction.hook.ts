import { useBoolean } from 'usehooks-ts';
import type { InputChangeSource, Interactive } from '@controls/utils';

export const useControlInteraction = <V>({
  id,
  disabled = false,
  onChange,
  onFocus,
  onBlur,
}: Pick<Interactive<V>, 'id' | 'disabled' | 'onChange' | 'onFocus' | 'onBlur'>) => {
  const { value: focused, setTrue: focus, setFalse: blur } = useBoolean(false);

  const emitChange = (value: V, source: InputChangeSource) => {
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
