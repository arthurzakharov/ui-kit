import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlRadioLabel } from '@controls/control-radio-label';

const meta = {
  title: 'Controls/ControlRadioLabel',
  component: ControlRadioLabel,
  tags: ['autodocs'],
  args: {
    id: 'radio-label',
    value: 'a',
    choice: { label: 'Option A', value: 'a' },
    choices: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
    ],
    state: 'idle',
    className: '',
    children: ({ checked }: { checked: boolean }) => <div>{checked ? 'Checked' : 'Unchecked'}</div>,
  },
} satisfies Meta<typeof ControlRadioLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
