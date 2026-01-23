import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { expect, fn, fireEvent, userEvent, waitFor, within } from 'storybook/test';
import { Control } from '../../../../main';
import cn from './textarea.module.css';

const meta = {
  title: 'Components/Control/Textarea',
  component: Control.Textarea,
  tags: ['autodocs'],
  args: {
    state: 'idle',
    placeholder: 'Textarea placeholder',
    rows: 5,
    onAutofill: fn(),
    onAutofillCancel: fn(),
    id: 'textarea',
    value: 'Some value',
    disabled: false,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'error', 'success'],
    },
    rows: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
  },
  render: (args) => {
    const [value, setValue] = useState<string>(args.value);

    useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    return (
      <div style={{ maxWidth: 300 }}>
        <Control.Textarea
          {...args}
          value={value}
          onChange={(value, id, source) => {
            setValue(value);
            args.onChange?.(value, id, source);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof Control.Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultValues: Story = {
  args: {
    state: undefined,
    placeholder: undefined,
    rows: undefined,
    onAutofill: undefined,
    onAutofillCancel: undefined,
    disabled: undefined,
    onFocus: undefined,
    onBlur: undefined,
  },
};

export const WithoutValue: Story = {
  args: {
    value: '',
  },
};

export const Enabled: Story = {
  args: {
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const StateIdle: Story = {
  args: {
    state: 'idle',
  },
};

export const StateError: Story = {
  args: {
    state: 'error',
  },
};

export const StateSuccess: Story = {
  args: {
    state: 'success',
  },
};

export const Interactive: Story = {
  args: {
    value: '',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByTestId('textarea');

    await step('Initial state should be idle', async () => {
      await expect(textarea).toHaveValue(args.value);
    });

    await step('Focusing textarea', async () => {
      await userEvent.click(textarea);
      await expect(textarea).toHaveFocus();
    });

    await step('Blurring empty textarea', async () => {
      await userEvent.tab();
      await expect(textarea).not.toHaveFocus();
    });

    await step('Autofill start should trigger onAutofill', async () => {
      fireEvent.animationStart(textarea, { animationName: cn['autofill-start'] });
      await waitFor(() => expect(textarea).toHaveAttribute('data-is-idle', 'false'));
    });

    await step('Autofill cancel should trigger onAutofillCancel', async () => {
      fireEvent.animationStart(textarea, { animationName: cn['autofill-cancel'] });
      await waitFor(() => expect(textarea).toHaveAttribute('data-is-idle', 'true'));
    });

    await step('Typing should update value', async () => {
      await userEvent.click(textarea);
      await userEvent.type(textarea, 'Hello World');
      await expect(textarea).toHaveValue('Hello World');
    });

    await step('Blurring textarea with value', async () => {
      await userEvent.tab();
      await expect(textarea).not.toHaveFocus();
    });

    await step('Autofill cancel with value should trigger onAutofillCancel', async () => {
      fireEvent.animationStart(textarea, { animationName: cn['autofill-cancel'] });
      await waitFor(() => expect(textarea).toHaveAttribute('data-is-idle', 'false'));
    });
  },
};
