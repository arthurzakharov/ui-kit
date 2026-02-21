import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlButton } from '@controls/control-button';
import { fn } from 'storybook/test';

const meta = {
  title: 'Controls/ControlButton',
  component: ControlButton,
  tags: ['autodocs'],
  args: {
    color: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    fullWidth: false,
    className: '',
    children: 'Go next step',
    onClick: fn(),
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['submit', 'reset', 'button'],
    },
  },
} satisfies Meta<typeof ControlButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInfo: Story = {
  args: {
    info: 'get <u>more</u> inormation',
  },
};
