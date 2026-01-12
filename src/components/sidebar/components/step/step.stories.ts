import type { Meta, StoryObj } from '@storybook/react-vite';
import { Step } from './step.component';

const meta = {
  title: 'Components/Sidebar/Step',
  component: Step,
  tags: ['autodocs'],
  args: {
    text: 'Step One state with some content',
  },
  argTypes: {
    state: {
      control: 'select',
    },
  },
} satisfies Meta<typeof Step>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StateIdle: Story = {
  args: {
    state: 'idle',
  },
};

export const StateSuccess: Story = {
  args: {
    state: 'success',
  },
};

export const StateError: Story = {
  args: {
    state: 'error',
  },
};
