import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlRadio } from '@controls/control-radio';

const meta = {
  title: 'Controls/ControlRadio',
  component: ControlRadio,
  tags: ['autodocs'],
  args: {
    id: 'radio',
    value: 'a',
    orientation: 'vertical',
    state: 'idle',
    className: '',
    choices: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
    ],
    onChange: () => {},
  },
} satisfies Meta<typeof ControlRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
