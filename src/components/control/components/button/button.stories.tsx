import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from './button.component';

const meta = {
  title: 'Control/Button',
  component: Button,
  render: (args) => <Button {...args}>Ergebnis anfordern</Button>,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutInfo: Story = {
  args: {
    type: 'button',
    color: 'next',
    size: 'md',
    disabled: false,
    fullWidth: false,
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export const WithInfo: Story = {
  args: {
    type: 'button',
    info: '100% kostenlos',
    color: 'next',
    size: 'md',
    disabled: false,
    fullWidth: false,
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};
