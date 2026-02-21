import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlButton } from '@controls/control-button';
import { expect, fn, within } from 'storybook/test';

const meta = {
  title: 'Controls/ControlButton',
  component: ControlButton,
  tags: ['autodocs'],
  args: {
    color: 'primary',
    size: 'md',
    type: 'button',
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
  render: (args) => <ControlButton {...args}>Go next step</ControlButton>,
} satisfies Meta<typeof ControlButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onBlur: fn(),
    onFocus: fn(),
  },
  play: async ({ args, canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('control-button');
    await userEvent.click(button);
    await expect(args.onFocus).toHaveBeenCalledOnce();
    await expect(args.onClick).toHaveBeenCalledOnce();
    await expect(args.onBlur).toHaveBeenCalledOnce();
  },
};

export const WithInfo: Story = {
  args: {
    info: 'get <u>more</u> inormation',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ args, canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('control-button');
    await userEvent.click(button);
    await expect(args.onClick).not.toBeCalled();
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  play: async ({ args, canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('control-button');
    await userEvent.click(button);
    await expect(args.onClick).not.toBeCalled();
  },
};

export const WithCustomClassName: Story = {
  args: {
    className: 'story-custom-class',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('control-button');
    await expect(button).toHaveClass(String(args.className));
  },
};
