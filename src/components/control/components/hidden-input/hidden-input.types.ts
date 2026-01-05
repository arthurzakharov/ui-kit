import type { ChangeEvent } from 'react';
import type { InputChangeSource } from '../../types';

export interface HiddenInputProps {
  id: string;
  value: string;
  name: string;
  type: 'radio' | 'checkbox';
  checked: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>, source?: InputChangeSource) => void;
}
