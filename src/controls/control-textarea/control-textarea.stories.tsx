import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StateArgType } from '@story/arg-types';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ControlTextarea } from '@controls/control-textarea';

const meta = {
  title: 'Controls/ControlTextarea',
  component: ControlTextarea,
  args: {
    id: 'control-textarea',
    value: '',
    onChange: fn(),
  },
  argTypes: {
    state: StateArgType({ description: 'State of the textarea', defaultValue: 'idle' }),
    placeholder: { control: 'text', description: 'Placeholder text for the textarea' },
    rows: { control: 'number', description: 'Number of rows for the textarea' },
    id: { control: 'text', description: 'Unique identifier for the textarea' },
    value: { control: 'text', description: 'Current value of the textarea' },
    disabled: { control: 'boolean', description: 'Whether the textarea is disabled' },
    message: { control: 'text', description: 'Error message for the textarea' },
    onChange: { control: false, description: 'Event triggered when the textarea value changes' },
    onFocus: { control: false, description: 'Event triggered when the textarea is focused' },
    onBlur: { control: false, description: 'Event triggered when the textarea loses focus' },
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <ControlTextarea
        {...args}
        value={value}
        onChange={(value, id) => {
          args.onChange(value, id, 'keyboard');
          setValue(value);
        }}
      />
    );
  },
} satisfies Meta<typeof ControlTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'ControlTextarea',
  args: {
    onFocus: fn(),
    onBlur: fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByTestId('control-textarea-input');

    await step('Focus the textarea and verify onFocus is called', async () => {
      textarea.focus();
      await expect(textarea).toHaveFocus();
      await expect(textarea).toHaveAttribute('data-is-idle', 'false');
      await expect(args.onFocus).toHaveBeenCalledOnce();
      await expect(args.onFocus).toHaveBeenCalledWith(args.id);
    });

    await step('Blur the textarea and verify onBlur is called', async () => {
      textarea.blur();
      await expect(textarea).not.toHaveFocus();
      await expect(textarea).toHaveAttribute('data-is-idle', 'true');
      await expect(args.onBlur).toHaveBeenCalledOnce();
      await expect(args.onBlur).toHaveBeenCalledWith(args.id);
    });

    await step('Type into the textarea and verify onChange is called with correct value', async () => {
      await userEvent.type(textarea, 'Hello, world!');
      await expect(args.onChange).toHaveBeenCalledTimes(13);
      await expect(args.onChange).toHaveBeenLastCalledWith('Hello, world!', args.id, 'keyboard');
    });
  },
};

export const ErrorStateWithoutMessage: Story = {
  args: {
    state: 'error',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Error message element is not rendered', async () => {
      await expect(canvas.queryByTestId('control-textarea-error')).toBeNull();
    });
  },
};

export const ErrorStateMessage: Story = {
  args: {
    state: 'error',
    message: 'This field is required',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Error message element is rendered', async () => {
      await expect(canvas.getByTestId('control-textarea-error')).toBeInTheDocument();
    });
  },
};

export const WithValue: Story = {
  args: {
    value: 'Some pre-filled content',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('The textarea should have the pre-filled value', async () => {
      await expect(canvas.getByTestId('control-textarea-input')).toHaveValue(args.value);
    });
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('The textarea should be disabled', async () => {
      await expect(canvas.getByTestId('control-textarea-input')).toBeDisabled();
    });
  },
};

export const CustomRows: Story = {
  args: {
    rows: 10,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('The textarea should have the correct number of rows', async () => {
      await expect(canvas.getByTestId('control-textarea-input')).toHaveAttribute('rows', String(args.rows));
    });
  },
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'color-grey-950',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByTestId(String(args['data-testid']));

    await step('Then the textarea component has the custom test id', async () => {
      await expect(textarea).toBeInTheDocument();
    });

    await step('Then the textarea component has the custom class name', async () => {
      await expect(textarea).toHaveClass(String(args.className));
    });
  },
};
