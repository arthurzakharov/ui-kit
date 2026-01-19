import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Control } from '../../../../main';

const meta = {
  title: 'Components/Control/Box',
  component: Control.Box,
  tags: ['autodocs'],
  args: {
    children: <div style={{ width: 200, height: 50 }} />,
    className: '',
    focused: false,
    checked: false,
    state: 'idle',
    onClick: fn(),
  },
  argTypes: {
    className: {
      control: 'text',
    },
    focused: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
    state: {
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
} satisfies Meta<typeof Control.Box>;

export default meta;
type Story = StoryObj<typeof Control.Box>;

export const Default: Story = {
  args: {
    className: undefined,
    focused: undefined,
    checked: undefined,
    state: undefined,
    onClick: undefined,
  },
};

export const Focused: Story = {
  args: {
    focused: true,
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const StateIdle: Story = {
  args: {
    state: 'idle',
  },
  play: async ({ args, canvas, userEvent }) => {
    const box = canvas.getByTestId('box');
    await userEvent.click(box);
    await expect(args.onClick).toHaveBeenCalledOnce();
    await expect(args.onClick).toHaveBeenNthCalledWith(1);
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
