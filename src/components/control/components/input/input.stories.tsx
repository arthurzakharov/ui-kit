import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, fn } from 'storybook/test';
import { Control } from '@components/control/control.component';
import cn from '@components/control/components/input/input.module.css';

const meta = {
  title: 'Components/Control/Input',
  component: Control.Input,
  tags: ['autodocs'],
  args: {
    id: 'input-default',
    value: '',
    disabled: false,
    maxLength: 20,
    type: 'text',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onAutofill: fn(),
    onAutofillCancel: fn(),
  },
  argTypes: {
    type: {
      control: 'select',
    },
    disabled: {
      control: 'boolean',
    },
  },
  render: (args) => {
    const [value, setValue] = useState<string>(args.value);

    return (
      <Control.Input
        {...args}
        value={value}
        onChange={(...props) => {
          setValue(props[0]);
          args.onChange(...props);
        }}
      />
    );
  },
} satisfies Meta<typeof Control.Input>;

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

export const DateMask: Story = {
  args: {
    dateMask: true,
  },
};

export const Password: Story = {
  args: {
    type: 'password',
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
