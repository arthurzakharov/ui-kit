import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { TextField } from '@controls/interactives';
import cn from '@controls/interactives/text-field/text-field.module.css';

const meta = {
  title: 'Controls/Interactives/TextField',
  component: TextField,
  args: {
    id: 'text',
    value: '',
    disabled: false,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    mask: '',
    maxLength: -1,
    label: 'Label',
    message: '',
    placeholder: '',
    state: 'idle',
    // Base props
    className: '',
    'data-testid': '',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const [state, setState] = useState(args.state);

    return (
      <TextField
        {...args}
        // state={state}
        value={value}
        onChange={(value, id, source) => {
          switch (value) {
            case 'Wrong value':
              setState('error');
              break;
            case 'Correct value':
              setState('success');
              break;
            default:
              setState('idle');
          }
          setValue(value);
          args.onChange(value, id, source);
        }}
      />
    );
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const TypeText: Story = {
  args: {
    label: 'First name',
    maxLength: 20,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('text-input');
    const label = canvas.getByTestId('text-label');

    await step('Verify initial idle label position and neutral state before focus', async () => {
      await expect(input).not.toHaveFocus();
      await expect(label).toHaveClass(cn.Idle);
    });

    await step('Focus input and verify onFocus callback plus active error label state', async () => {
      await userEvent.click(input);
      await expect(input).toHaveFocus();
      await expect(args.onFocus).toHaveBeenCalledTimes(1);
      await expect(args.onFocus).toHaveBeenLastCalledWith(args.id);
      await expect(label).toHaveClass(cn.Active);
    });

    await step('Click fields in focus state, onFocus callback is not called, label is still active', async () => {
      await userEvent.click(label);
      await expect(input).toHaveFocus();
      await expect(args.onFocus).toHaveBeenCalledTimes(1);
      await expect(label).toHaveClass(cn.Active);
    });

    await step('Blur input and verify onBlur callback plus return to idle label state', async () => {
      await userEvent.click(canvasElement);
      await expect(input).not.toHaveFocus();
      await expect(args.onBlur).toHaveBeenCalledTimes(1);
      await expect(args.onBlur).toHaveBeenLastCalledWith(args.id);
      await expect(label).toHaveClass(cn.Idle);
    });

    await step('Click field one more time and type text', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'Max Mustermann');
      await expect(args.onChange).toHaveBeenLastCalledWith('Max Mustermann', args.id, 'keyboard');
      await expect(args.onChange).toHaveBeenCalledTimes(14);
    });

    await step('Blur input and check that label remains in active state while is not empty anymore', async () => {
      await userEvent.click(canvasElement);
      await expect(input).not.toHaveFocus();
      await expect(args.onBlur).toHaveBeenCalledTimes(2);
      await expect(args.onBlur).toHaveBeenLastCalledWith(args.id);
      await expect(label).toHaveClass(cn.Active);
    });
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Enter your first name',
    message: 'This field is required.',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('text-input');

    await step('Verify placeholder is not visible when input is empty but not focused', async () => {
      await expect(canvas.queryByTestId('text-placeholder')).not.toBeInTheDocument();
    });

    await step('Verify placeholder visibility when input is empty and focused', async () => {
      await userEvent.click(input);
      await expect(input).toHaveFocus();
      await waitFor(function placeholderIsVisible() {
        expect(canvas.getByTestId('text-placeholder')).toBeInTheDocument();
      });
    });

    await step('Blur input and verify placeholder is hidden again', async () => {
      await userEvent.click(canvasElement);
      await expect(input).not.toHaveFocus();
      await waitFor(function placeholderIsHidden() {
        expect(canvas.queryByTestId('text-placeholder')).not.toBeInTheDocument();
      });
    });

    await step('Focus input, type text and verify placeholder is hidden while value is not empty', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'Max Mustermann');
      await expect(input).toHaveValue('Max Mustermann');
      await waitFor(function placeholderIsHidden() {
        expect(canvas.queryByTestId('text-placeholder')).not.toBeInTheDocument();
      });
    });

    await step('Blur input and check that placeholder is still hidden while value is not empty', async () => {
      await userEvent.click(canvasElement);
      await expect(input).not.toHaveFocus();
      await expect(input).toHaveValue('Max Mustermann');
      await waitFor(function placeholderIsHidden() {
        expect(canvas.queryByTestId('text-placeholder')).not.toBeInTheDocument();
      });
    });
  },
};

export const ErrorStateWithMessage: Story = {
  args: {
    state: 'idle',
    message: 'This field is required.',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId('text-input');
    const label = canvas.getByTestId('text-label');

    await step('Field is in idle state and message is not visible', async () => {
      await expect(label).toHaveClass(cn.Idle);
      await waitFor(function errorMessageIsHidden() {
        expect(canvas.queryByTestId('text-error-message')).not.toBeInTheDocument();
      });
    });

    await step('Focus field and enter error trigger text', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'Wrong value');
      await expect(input).toHaveFocus();
      await expect(label).toHaveClass(cn.Active);
      await waitFor(function errorMessageIsVisible() {
        expect(canvas.getByTestId('text-error-message')).toBeInTheDocument();
      });
    });

    await step('Blur field remain in error state and message is still visible', async () => {
      await userEvent.click(canvasElement);
      await expect(input).not.toHaveFocus();
      await expect(label).toHaveClass(cn.Active);
      await waitFor(function errorMessageIsVisible() {
        expect(canvas.getByTestId('text-error-message')).toBeInTheDocument();
      });
    });

    await step('Focus field again and not error trigger text', async () => {
      await userEvent.click(input);
      await userEvent.clear(input);
      await userEvent.type(input, 'Max Mustermann');
      await expect(input).toHaveFocus();
      await expect(label).toHaveClass(cn.Active);
      await waitFor(function errorMessageIsHidden() {
        expect(canvas.queryByTestId('text-error-message')).not.toBeInTheDocument();
      });
    });

    await step('Blur field and check that it remains in active state without error message', async () => {
      await userEvent.click(canvasElement);
      await expect(input).not.toHaveFocus();
      await expect(label).toHaveClass(cn.Active);
      await waitFor(function errorMessageIsHidden() {
        expect(canvas.queryByTestId('text-error-message')).not.toBeInTheDocument();
      });
    });
  },
};

export const TypeDate: Story = {
  args: {
    label: 'Date of birth',
    mask: 'DD/MM/YYYY',
  },
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'custom-class-name',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByTestId(String(args['data-testid']));

    await step('Component has the custom test id', async () => {
      await expect(component).toBeInTheDocument();
    });

    await step('Component has the custom class name', async () => {
      await expect(component).toHaveClass(String(args.className));
    });
  },
};
