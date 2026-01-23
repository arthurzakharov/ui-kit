import type { Meta, StoryObj } from '@storybook/react-vite';
import { Control } from '@components/control/control.component';

const meta = {
  title: 'Components/Control/Label',
  component: Control.Label,
  tags: ['autodocs'],
  args: {
    state: 'idle',
    position: 'idle',
    children: (
      <>
        <b>Label</b> text
      </>
    ),
  },
  // TODO: In Strorybook controls are not displayed correctly for some reason
  argTypes: {
    state: {
      control: 'select',
    },
    position: {
      control: 'select',
    },
    children: {
      type: {
        name: 'function',
        required: true,
      },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
} satisfies Meta<typeof Control.Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: undefined,
    state: undefined,
  },
};

export const PositionIdle: Story = {
  args: {
    position: 'idle',
  },
};

export const PositionActive: Story = {
  args: {
    position: 'active',
  },
};

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
