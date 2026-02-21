import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlBox } from '@controls/control-box';

const meta = {
  title: 'Controls/ControlBox',
  component: ControlBox,
  tags: ['autodocs'],
  args: {
    state: 'idle',
    focused: false,
    checked: false,
    className: '',
    children: 'Control box content',
  },
} satisfies Meta<typeof ControlBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
