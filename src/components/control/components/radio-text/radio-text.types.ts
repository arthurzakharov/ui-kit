type RadioTextSize = 'md' | 'lg';

export interface RadioTextProps {
  children: string;
  size: RadioTextSize;
  checked: boolean;
  oneLine?: boolean;
}
