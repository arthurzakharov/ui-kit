import type { Meta, StoryObj } from '@storybook/react-vite';
import { Status } from './status.component';

const meta: Meta<typeof Status> = {
  title: 'Components/Control/Status',
  component: Status,
  tags: ['autodocs'],
  args: {
    className: '',
  },
};

export default meta;
type Story = StoryObj<typeof Status>;

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
