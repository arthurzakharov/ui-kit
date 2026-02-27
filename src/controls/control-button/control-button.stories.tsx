import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlButton } from '@controls/control-button';
import { expect, fn, within } from 'storybook/test';
import {
  ClassNameArgType,
  ControlButtonColorArgType,
  ControlButtonSizeArgType,
  ControlButtonTypeArgType,
} from '@story/arg-types';

const meta = {
  title: 'Controls/ControlButton',
  component: ControlButton,
  args: {
    color: 'primary',
    size: 'md',
    type: 'button',
    onClick: fn(),
  },
  argTypes: {
    color: ControlButtonColorArgType({ defaultValue: 'primary' }),
    size: ControlButtonSizeArgType({ defaultValue: 'md' }),
    type: ControlButtonTypeArgType({ defaultValue: 'button' }),
    disabled: { control: 'boolean', description: 'Disable the button' },
    info: { control: 'text', description: 'Additional information displayed below the button main text' },
    fullWidth: { control: 'boolean', description: 'Make the button take the full width of its container' },
    loading: { control: 'boolean', description: 'Show a loading spinner and disable the button' },
    preventDefault: { control: 'boolean', description: 'Prevent default action on click' },
    blurAfterClick: { control: 'boolean', description: 'Remove focus from the button after click' },
    onClick: { action: 'clicked', description: 'Function called when the button is clicked' },
    onFocus: { action: 'focused', description: 'Function called when the button is focused' },
    onBlur: { action: 'blurred', description: 'Function called when the button loses focus' },
    className: ClassNameArgType({ defaultValue: '' }),
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('control-button');
    await expect(button).toBeInTheDocument();
  },
};

export const WithBlurAfterClick: Story = {
  args: {
    blurAfterClick: true,
    onBlur: fn(),
    onFocus: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('control-button');
    await expect(button).toBeInTheDocument();
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('control-button');
    await expect(button).toBeDisabled();
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('control-button');
    await expect(button).toBeDisabled();
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
