import { ArrowRight } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlButtonText } from '@controls/control-button-text';
import {
  ClassNameArgType,
  ControlButtonColorArgType,
  ControlButtonSizeArgType,
  FontWeightArgType,
} from '@story/arg-types';
import { fn } from 'storybook/test';

const meta = {
  title: 'Controls/ControlButtonText',
  component: ControlButtonText,
  args: {
    color: 'text-primary',
    size: 'md',
    type: 'button',
    weight: 'medium',
    icon: <ArrowRight />,
    iconPosition: 'left',
    underlined: false,
    disabled: false,
    preventDefault: false,
    blurAfterClick: false,
    className: '',
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    color: ControlButtonColorArgType({ defaultValue: 'text-primary' }),
    size: ControlButtonSizeArgType({ defaultValue: 'md' }),
    weight: FontWeightArgType({ defaultValue: 'medium' }),
    type: { control: 'select', options: ['button', 'submit', 'reset'], description: 'The type of the button' },
    icon: { control: 'text', description: 'Name of the icon to display (from the SVG sprite)' },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the icon relative to the text',
    },
    underlined: { control: 'boolean', description: 'Whether the button text is underlined' },
    disabled: { control: 'boolean', description: 'Whether the button is disabled' },
    preventDefault: { control: 'boolean', description: 'Whether to prevent default action on click' },
    blurAfterClick: { control: 'boolean', description: 'Whether to remove focus from the button after click' },
    onClick: { action: 'clicked', description: 'Function called when the button is clicked' },
    onFocus: { action: 'focused', description: 'Function called when the button is focused' },
    onBlur: { action: 'blurred', description: 'Function called when the button loses focus' },
    className: ClassNameArgType({ defaultValue: '' }),
  },
  render: (args) => <ControlButtonText {...args}>Button Text</ControlButtonText>,
} satisfies Meta<typeof ControlButtonText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
