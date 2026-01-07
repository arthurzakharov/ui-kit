export interface ChoiceProps {
  type: 'radio' | 'checkbox';
  checked: boolean;
  state?: 'idle' | 'error' | 'success';
  focused?: boolean;
  hovered?: boolean;
  disabled?: boolean;
}
