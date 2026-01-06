import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn } from 'storybook/test';
import { Input } from '@/components/control/components/input';
import cn from '@/components/control/components/input/input.module.css';

const meta = {
  title: 'Components/Control/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      type: {
        name: 'string',
        required: true,
      },
      description: '<b>id</b> for input field',
    },
    value: {
      type: {
        name: 'string',
        required: true,
      },
      description: '<b>value</b> for input field',
    },
    disabled: {
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
      description: 'Whether input is disabled',
    },
    type: {
      control: 'radio',
      options: ['text', 'password', 'email'],
      table: {
        type: { summary: 'HTMLInputTypeAttribute' },
      },
      description: 'The HTML input type',
    },
    onAutofill: {
      type: {
        name: 'function',
      },
      description: 'On browser autofill the input',
    },
    onAutofillCancel: {
      type: {
        name: 'function',
      },
      description: 'On browser autofill is canceled',
    },
    onChange: {
      type: {
        name: 'function',
        required: true,
      },
      description: 'On input value changes',
    },
    onFocus: {
      type: {
        name: 'function',
      },
      description: 'On input is focused',
    },
    onBlur: {
      type: {
        name: 'function',
      },
      description: 'On input is blurred',
    },
  },
  args: {
    id: 'input-default',
    value: '',
    disabled: false,
    type: 'text',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onAutofill: fn(),
    onAutofillCancel: fn(),
  },
  render: (args) => {
    const [value, setValue] = useState<string>(args.value);

    return (
      <Input
        {...args}
        value={value}
        onChange={(...props) => {
          setValue(props[0]);
          args.onChange(...props);
        }}
      />
    );
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: undefined,
    type: undefined,
    onFocus: undefined,
    onBlur: undefined,
    onAutofill: undefined,
    onAutofillCancel: undefined,
  },
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByTestId('input');
    const TEXT = 'Default Value';
    await userEvent.type(input, TEXT);
    await expect(args.onChange).toHaveBeenCalledTimes(TEXT.length);
    await expect(args.onChange).toHaveBeenNthCalledWith(TEXT.length, TEXT, args.id, 'keyboard');
    await expect(input).toHaveValue(TEXT);
    await expect(input).toHaveAttribute('id', args.id);
    await expect(input).toHaveAttribute('name', args.id);
    await expect(input).toHaveAttribute('type', 'text');
    await expect(input).toHaveClass(cn.Input);
    await expect(input).not.toBeDisabled();
  },
};

export const AllKeysPassed: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByTestId('input');
    await userEvent.tab();
    await expect(args.onFocus).toHaveBeenNthCalledWith(1, args.id);
    await expect(args.onFocus).toHaveBeenCalledOnce();
    await userEvent.tab();
    await expect(args.onBlur).toHaveBeenNthCalledWith(1, args.id);
    await expect(args.onBlur).toHaveBeenCalledOnce();
    await expect(input).toHaveValue(args.value);
    await expect(input).toHaveAttribute('type', args.type);
    await expect(input).not.toBeDisabled();
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByTestId('input');
    await userEvent.tab();
    await expect(args.onFocus).not.toHaveBeenCalled();
    await expect(args.onBlur).not.toHaveBeenCalled();
    await expect(input).toBeDisabled();
  },
};

export const Password: Story = {
  args: {
    type: 'password',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByTestId('input');
    await expect(input).toHaveAttribute('type', 'password');
  },
};

export const Autofill: Story = {
  play: async ({ args, canvas }) => {
    const input = canvas.getByTestId('input');

    const animation = (key: string) => new AnimationEvent('animationstart', { animationName: cn[key], bubbles: true });

    input.dispatchEvent(animation('autofill-start'));
    await expect(args.onAutofill).toHaveBeenCalledWith(args.id);
    await expect(args.onAutofill).toHaveBeenCalledOnce();

    input.dispatchEvent(animation('autofill-cancel'));
    await expect(args.onAutofillCancel).toHaveBeenCalledWith(args.id);
    await expect(args.onAutofillCancel).toHaveBeenCalledOnce();
  },
};
