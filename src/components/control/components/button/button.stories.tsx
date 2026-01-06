import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect } from 'storybook/test';
import { Button } from '@/components/control/components/button';
import cn from '@/components/control/components/button/button.module.css';

const meta = {
  title: 'Components/Control/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The content of the label',
      type: {
        name: 'function',
        required: true,
      },
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    color: {
      control: 'radio',
      options: ['next', 'previous'],
      type: {
        name: 'union',
        value: [],
        required: true,
      },
      table: {
        type: { summary: 'ButtonColor' },
      },
      description: 'Button color schema',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      type: {
        name: 'union',
        value: [],
        required: true,
      },
      table: {
        type: { summary: 'ButtonSize' },
      },
      description: 'Button size schema',
    },
    type: {
      control: 'radio',
      options: ['submit', 'reset', 'button', undefined],
      type: {
        name: 'union',
        value: [],
        required: true,
      },
      table: {
        type: { summary: 'ButtonType' },
      },
      description: 'Button type',
    },
    disabled: {
      control: 'boolean',
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        type: { summary: 'boolean' },
      },
      description: 'Whether button is disabled',
    },
    info: {
      control: 'text',
      type: {
        name: 'string',
        required: false,
      },
      table: {
        type: { summary: 'string' },
      },
      description: 'Text that is placed under main text',
    },
    fullWidth: {
      control: 'boolean',
      type: {
        name: 'boolean',
        required: false,
      },
      table: {
        type: { summary: 'boolean' },
      },
      description: 'Whether button is full width',
    },
    onClick: {
      type: {
        name: 'function',
      },
      description: 'On button is clicked',
    },
    onFocus: {
      type: {
        name: 'function',
      },
      description: 'On button is focused',
    },
    onBlur: {
      type: {
        name: 'function',
      },
      description: 'On button is blurred',
    },
  },
  args: {
    color: 'next',
    size: 'md',
    type: 'button',
    disabled: false,
    info: '',
    fullWidth: false,
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  render: (args) => (
    <Button {...args}>
      Custom button with or without <b>info</b>
    </Button>
  ),
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: undefined,
    fullWidth: undefined,
    onClick: undefined,
    onFocus: undefined,
    onBlur: undefined,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByTestId('button');
    const infoHtml = canvas.queryByTestId('button-info-html');
    const infoText = canvas.getByTestId('button-info-text');
    await expect(button).toContainHTML('Custom button with or without <b>info</b>');
    await expect(button).not.toBeDisabled();
    await expect(button).not.toHaveClass(cn.ButtonFullWidth);
    await expect(infoHtml).toBeNull();
    await expect(infoText).toHaveTextContent('');
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
