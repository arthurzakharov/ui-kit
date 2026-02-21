import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlStatus } from '@controls/control-status';

const meta = {
  title: 'Controls/ControlStatus',
  component: ControlStatus,
  tags: ['autodocs'],
  args: {
    state: 'idle',
    className: '',
  },
} satisfies Meta<typeof ControlStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Success: Story = {
  args: {
    state: 'success',
  },
};

export const Error: Story = {
  args: {
    state: 'error',
  },
};
