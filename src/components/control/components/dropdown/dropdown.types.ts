import type { QuestionChoice } from '../../types';

export interface DropdownProps {
  choices: QuestionChoice[];
  value: QuestionChoice[];
  label?: string;
  placeholder?: string;
  noResult?: string;
  isSearchHidden?: boolean;
  multiple?: boolean;
  closeButton?: string;
  onChange: (values: QuestionChoice[]) => void;
  onOpen?: (height: number, width: number) => void;
  onClose?: () => void;
}
