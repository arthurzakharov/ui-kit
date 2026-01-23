import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, fireEvent } from 'storybook/test';
import { Control } from '../../../../main';

const meta = {
  title: 'Components/Control/HiddenInput',
  component: Control.HiddenInput,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      type: {
        name: 'string',
        required: true,
      },
      description: '<b>id</b> for input field',
    },
    name: {
      control: 'text',
      type: {
        name: 'string',
        required: true,
      },
      description: '<b>name</b> for input field',
    },
    value: {
      control: 'text',
      type: {
        name: 'string',
        required: true,
      },
      description: '<b>value</b> for input field',
    },
    type: {
      control: 'radio',
      options: ['checkbox', 'radio'],
      table: {
        type: { summary: "'radio' | 'checkbox'" },
      },
      type: {
        name: 'boolean',
        required: true,
      },
      description: 'Type of input',
    },
    checked: {
      control: 'boolean',
      type: {
        name: 'boolean',
        required: true,
      },
      description: 'Whether input is checked',
    },
    disabled: {
      control: 'boolean',
      type: {
        name: 'boolean',
        required: false,
      },
      description: 'Whether input is disabled',
    },
    onChange: {
      type: {
        name: 'function',
        required: true,
      },
      description: 'Whether the input is disabled',
    },
  },
  args: {
    id: 'hidden-input',
    value: 'test-value',
    name: 'test-name',
    type: 'checkbox',
    checked: false,
    disabled: false,
    onChange: fn(),
  },
} satisfies Meta<typeof Control.HiddenInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    disabled: undefined,
  },
  play: async ({ args, canvas, userEvent }) => {
    const hiddenInput = canvas.getByTestId('hidden-input');
    await expect(hiddenInput).not.toBeDisabled();

    await userEvent.tab();
    await expect(hiddenInput).toHaveFocus();
    await userEvent.keyboard('[Space]');
    await expect(args.onChange).toHaveBeenNthCalledWith(1, expect.anything(), 'keyboard');
    await userEvent.click(hiddenInput);
    await expect(args.onChange).toHaveBeenNthCalledWith(2, expect.anything(), 'keyboard');
    await expect(hiddenInput).toHaveFocus();

    await fireEvent.click(hiddenInput, { clientX: 100, clientY: 100 });
    await expect(args.onChange).toHaveBeenNthCalledWith(3, expect.anything(), 'mouse');
    await expect(hiddenInput).not.toHaveFocus();
  },
};

export const Radio: Story = {
  args: {
    type: 'radio',
  },
};

export const Checkbox: Story = {
  args: {
    type: 'checkbox',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const NotChecked: Story = {
  args: {
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ args, canvas, userEvent }) => {
    const hiddenInput = canvas.getByTestId('hidden-input');
    await expect(hiddenInput).toBeDisabled();
    await userEvent.click(hiddenInput);
    await fireEvent.click(hiddenInput, { clientX: 100, clientY: 100 });
    await expect(args.onChange).not.toHaveBeenCalled();
    await expect(hiddenInput).not.toHaveFocus();
  },
};
