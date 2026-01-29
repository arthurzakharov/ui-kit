import type { Meta, StoryObj } from '@storybook/react-vite';
import { RefreshCcw } from 'lucide-react';
import { fn } from 'storybook/test';
import { Control } from '@components/control/control.component';

const meta = {
  title: 'Components/Control/ButtonText',
  component: Control.ButtonText,
  tags: ['autodocs'],
  args: {
    size: 'md',
    type: 'button',
    disabled: false,
    preventDefault: false,
    blurAfterClick: false,
    icon: <RefreshCcw />,
    children: (
      <>
        Custom button with or without <b>info</b>
      </>
    ),
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    size: {
      control: 'select',
    },
    type: {
      control: 'select',
    },
    disabled: {
      control: 'boolean',
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
} satisfies Meta<typeof Control.ButtonText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithIcon: Story = {
  args: {
    icon: <RefreshCcw />,
  },
};

export const WithoutIcon: Story = {
  args: {
    icon: undefined,
  },
};
