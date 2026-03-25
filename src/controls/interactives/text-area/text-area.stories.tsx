import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { TextArea } from '@controls/interactives/text-area/text-area.component';

const meta = {
  title: 'Controls/Interactives/TextArea',
  component: TextArea,
  args: {
    // Interactive props
    id: 'firstName',
    value: '',
    disabled: false,
    state: 'idle',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    // TextArea props
    placeholder: '',
    rows: 5,
    message: '',
    // Base props
    className: '',
    'data-testid': '',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const [state, setState] = useState(args.state);

    return (
      <TextArea
        {...args}
        state={state}
        value={value}
        onChange={(value, id) => {
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
          args.onChange(value, id, 'keyboard');
          setValue(value);
        }}
      />
    );
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'TextArea',
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByTestId('textarea-input');

    await step('Focus the textarea and verify onFocus is called', async () => {
      await userEvent.click(textarea);
      await expect(textarea).toHaveFocus();
      await expect(args.onFocus).toHaveBeenCalledWith(args.id);
      await expect(args.onFocus).toHaveBeenCalledOnce();
    });

    await step('Type some text, check callbacks and texteare vaue', async () => {
      await userEvent.type(textarea, 'Hello, world!');
      await expect(textarea).toHaveValue('Hello, world!');
      await expect(args.onChange).toHaveBeenLastCalledWith('Hello, world!', args.id, 'keyboard');
      await expect(args.onChange).toHaveBeenCalledTimes(13);
    });

    await step('Blur textarea and verify onBlur is called', async () => {
      await userEvent.click(canvasElement);
      await expect(textarea).not.toHaveFocus();
      await expect(args.onBlur).toHaveBeenCalledWith(args.id);
      await expect(args.onBlur).toHaveBeenCalledOnce();
    });
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Enter your text here...',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByTestId('textarea-input');

    await step('The textarea should have the correct placeholder', async () => {
      await expect(textarea).toHaveAttribute('placeholder', String(args.placeholder));
    });
  },
};

export const ErrorStateMessage: Story = {
  args: {
    state: 'idle',
    message: 'This field is required',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByTestId('textarea-input');

    await step('Field is empty and message is not visible', async () => {
      await expect(textarea).toHaveValue('');
      await expect(canvas.queryByTestId('textarea-error-message')).not.toBeInTheDocument();
    });

    await step('Focus field and enter error trigger text', async () => {
      await userEvent.click(textarea);
      await userEvent.type(textarea, 'Wrong value');
      await expect(textarea).toHaveFocus();
      await waitFor(function errorMessageIsVisible() {
        expect(canvas.getByTestId('textarea-error-message')).toBeInTheDocument();
      });
    });

    await step('Blur field remain in error state and message is still visible', async () => {
      await userEvent.click(canvasElement);
      await expect(textarea).not.toHaveFocus();
      await expect(canvas.getByTestId('textarea-error-message')).toBeInTheDocument();
    });

    await step('Focus field again, type not error trigger text', async () => {
      await userEvent.click(textarea);
      await userEvent.clear(textarea);
      await userEvent.type(textarea, 'Hello World!');
      await expect(textarea).toHaveFocus();
      await waitFor(function errorMessageIsHidden() {
        expect(canvas.queryByTestId('textarea-error-message')).not.toBeInTheDocument();
      });
    });

    await step('Blur field and check that it remains in active state without error message', async () => {
      await userEvent.click(canvasElement);
      await expect(textarea).not.toHaveFocus();
      await expect(canvas.queryByTestId('textarea-error-message')).not.toBeInTheDocument();
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
      await expect(canvas.getByTestId('textarea-input')).toBeDisabled();
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
      await expect(canvas.getByTestId('textarea-input')).toHaveAttribute('rows', String(args.rows));
    });
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
