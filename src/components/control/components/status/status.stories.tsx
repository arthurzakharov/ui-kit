import type { Meta, StoryObj } from '@storybook/react-vite';
import { Control } from '@components/control/control.component';

const meta = {
  title: 'Components/Control/Status',
  component: Control.Status,
  tags: ['autodocs'],
  args: {
    className: '',
  },
} satisfies Meta<typeof Control.Status>;

export default meta;
type Story = StoryObj<typeof Control.Status>;

export const StateIdle: Story = {
  args: {
    state: 'idle',
  },
};

export const StateError: Story = {
  args: {
    state: 'error',
  },
};

export const StateSuccess: Story = {
  args: {
    state: 'success',
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: 'xxx',
  },
};
