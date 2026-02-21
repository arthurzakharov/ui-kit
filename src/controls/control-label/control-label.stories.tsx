import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlLabel } from '@controls/control-label';

const meta = {
  title: 'Controls/ControlLabel',
  component: ControlLabel,
  tags: ['autodocs'],
  args: {
    position: 'idle',
    state: 'idle',
    className: '',
    children: 'Name',
  },
} satisfies Meta<typeof ControlLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
