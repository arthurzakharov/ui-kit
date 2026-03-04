import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, waitFor, within } from 'storybook/test';
import { ControlInput } from '@controls/control-input';
import { BaseArgTypes, BooleanArgType, FnArgType, NumberArgType, StringArgType } from '@utils/story/arg-types';
import cn from '@controls/control-input/control-input.module.css';

const meta = {
  title: 'Controls/ControlInput',
  component: ControlInput,
  args: {
    id: 'input-field',
    value: '',
    disabled: false,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onAnimationStart: fn(),
  },
  argTypes: {
    id: StringArgType({
      required: true,
      description: '<u>id</u> for the input will be used as <u>name</u> attribute.',
    }),
    value: StringArgType({
      required: true,
      description: 'The value of the input field.',
    }),
    disabled: BooleanArgType({
      required: false,
      description: 'Whether the input is disabled.',
    }),
    onChange: FnArgType({
      required: true,
      description: 'Called when the input value changes.',
      summary: '(value: string, id: string, source?: InputChangeSource) => void',
    }),
    onFocus: FnArgType({
      required: false,
      description: 'Called when the input is focused.',
      summary: '(id: string) => void',
    }),
    onBlur: FnArgType({
      required: false,
      description: 'Called when the input is blurred.',
      summary: '(id: string) => void',
    }),
    maxLength: NumberArgType({
      required: false,
      description: 'The maximum length of the input value.',
    }),
    mask: StringArgType({
      required: false,
      description: 'The mask pattern for the input value, Example: `TT/MM/JJJJ`.',
    }),
    onAnimationStart: FnArgType({
      required: false,
      description: 'Called when the input animation starts.',
    }),
    ...BaseArgTypes(),
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <ControlInput
        {...args}
        value={value}
        onChange={(value, id, source) => {
          setValue(value);
          args.onChange(value, id, source);
        }}
      />
    );
  },
} satisfies Meta<typeof ControlInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  name: 'Text - default behavior',
  play: async ({ args, canvasElement, step, userEvent }) => {
    const input = within(canvasElement).getByTestId('input');
    await step('Focus input', async () => {
      await userEvent.click(input);
      await expect(args.onFocus).toHaveBeenCalledWith(args.id);
    });
    await step('Type "Hello"', async () => {
      await userEvent.type(input, 'Max Mustermann');
      await expect(args.onChange).toHaveBeenCalledWith('Max Mustermann', args.id, 'keyboard');
    });
    await step('Blur input', async () => {
      await userEvent.tab();
      await expect(args.onBlur).toHaveBeenCalledWith(args.id);
    });
    await step('Check if callnacks were called correct number of times', async () => {
      await expect(args.onFocus).toHaveBeenCalledTimes(1);
      await expect(args.onChange).toHaveBeenCalledTimes(14);
      await expect(args.onBlur).toHaveBeenCalledTimes(1);
    });
  },
};

export const TextMaxLength: Story = {
  name: 'Text - max length',
  args: {
    maxLength: 10,
  },
  play: async ({ args, canvasElement, step, userEvent }) => {
    const input = within(canvasElement).getByTestId('input');
    await step('Try to type long text', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'Max Mustermann');
    });

    await step('Check if value is truncated to max length', async () => {
      await expect(input).toHaveValue('Max Muster');
      await expect(args.onChange).toBeCalledTimes(10);
    });
  },
};

export const TextDisabled: Story = {
  name: 'Text - disabled',
  args: {
    disabled: true,
  },
  play: async ({ args, canvasElement, step, userEvent }) => {
    const input = within(canvasElement).getByTestId('input');
    await step('Try to focus and type in disabled input', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'Max Mustermann');
    });
    await step('Check if value is not changed and callbacks are not called', async () => {
      await expect(input).toHaveValue('');
      await expect(args.onFocus).not.toHaveBeenCalled();
      await expect(args.onChange).not.toHaveBeenCalled();
    });
  },
};

export const Date: Story = {
  name: 'Date - default behavior with mask',
  args: {
    mask: 'TT/MM/JJJJ',
  },
  play: async ({ args, canvasElement, step, userEvent }) => {
    const input = within(canvasElement).getByTestId('input');
    await step('Check if mask is applied on initial render', async () => {
      await expect(input).toHaveValue('TT/MM/JJJJ');
      await expect(input).toHaveClass(cn.Placeholder);
    });
    await step('Focus input', async () => {
      await userEvent.click(input);
      await expect(args.onFocus).toHaveBeenCalledWith(args.id);
    });
    await step('Type "01012000"', async () => {
      await userEvent.keyboard('0');
      await userEvent.keyboard('1');
      await waitFor(() => expect(input).toHaveValue('01/MM/JJJJ'));
      await userEvent.keyboard('0');
      await userEvent.keyboard('1');
      await waitFor(() => expect(input).toHaveValue('01/01/JJJJ'));
      await userEvent.keyboard('2');
      await userEvent.keyboard('0');
      await userEvent.keyboard('0');
      await userEvent.keyboard('0');
      await waitFor(() => expect(input).toHaveValue('01/01/2000'));
      await expect(input).not.toHaveClass(cn.Placeholder);
    });
    await step('Change year, delete and reenter', async () => {
      await userEvent.keyboard('{Backspace}');
      await userEvent.keyboard('{Backspace}');
      await userEvent.keyboard('{Backspace}');
      await userEvent.keyboard('{Backspace}');
      await expect(input).toHaveValue('01/01/JJJJ');
      await userEvent.keyboard('2');
      await userEvent.keyboard('0');
      await userEvent.keyboard('2');
      await userEvent.keyboard('5');
      await expect(input).toHaveValue('01/01/2025');
    });
    await step('Use arrow keys to navigate and delete', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      await userEvent.keyboard('{ArrowLeft}');
      await userEvent.keyboard('{ArrowLeft}');
      await userEvent.keyboard('{ArrowLeft}');
      await userEvent.keyboard('{Backspace}');
      await expect(input).toHaveValue('01/0M/2025');
      await userEvent.keyboard('2');
      await expect(input).toHaveValue('01/02/2025');
      await userEvent.keyboard('{Backspace}');
      await userEvent.keyboard('{Backspace}');
      await expect(input).toHaveValue('01/02/20JJ');
    });
    await step('Blur input, and click on input again, cursor is on last not entered position', async () => {
      await userEvent.tab();
      await userEvent.click(input);
      await userEvent.keyboard('2');
      await userEvent.keyboard('6');
      await expect(input).toHaveValue('01/02/2026');
      await userEvent.tab();
    });
  },
};

export const DateDisabled: Story = {
  name: 'Date - disabled',
  args: {
    mask: 'TT/MM/JJJJ',
    disabled: true,
  },
  play: async ({ args, canvasElement, step, userEvent }) => {
    const input = within(canvasElement).getByTestId('input');
    await step('Try to focus and type in disabled input', async () => {
      await userEvent.click(input);
      await expect(input).toHaveValue('TT/MM/JJJJ');
      await userEvent.keyboard('0');
    });
    await step('Check if value is not changed and callbacks are not called', async () => {
      await expect(args.onFocus).not.toHaveBeenCalled();
      await expect(args.onChange).not.toHaveBeenCalled();
    });
  },
};
