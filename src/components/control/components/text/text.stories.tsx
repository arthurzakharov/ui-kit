import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { expect, fn, fireEvent, waitFor } from 'storybook/test';
import { Text } from './text.component';
import cn from '../text/text.module.css';
import inputCn from '../input/input.module.css';

const meta = {
  title: 'Components/Control/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    label: 'Text label',
    state: 'idle',
    type: 'text',
    id: 'text-input',
    value: 'Some value',
    disabled: false,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'error', 'success', 'warning'],
    },
    type: {
      control: 'text',
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
        <Text
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
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultValues: Story = {
  args: {
    state: undefined,
    type: undefined,
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
  play: async ({ args, canvas, step, userEvent }) => {
    const input = canvas.getByTestId('input');
    const label = canvas.getByTestId('text-label');

    await step('Initial state should be idle', async () => {
      await expect(input).toHaveValue(args.value);
      await expect(label).toHaveClass(cn.TextLabelIdle);
    });

    await step('Focusing input should activate label', async () => {
      await userEvent.click(input);
      await expect(label).toHaveClass(cn.TextLabelActive);
      await expect(input).toHaveFocus();
    });

    await step('Blurring empty input should return to idle', async () => {
      await userEvent.tab();
      await expect(label).toHaveClass(cn.TextLabelIdle);
      await expect(input).not.toHaveFocus();
    });

    await step('Autofill start should activate label', async () => {
      fireEvent.animationStart(input, { animationName: inputCn['autofill-start'] });
      await waitFor(() => expect(label).toHaveClass(cn.TextLabelActive));
    });

    await step('Autofill cancel should deactivate label', async () => {
      fireEvent.animationStart(input, { animationName: inputCn['autofill-cancel'] });
      await waitFor(() => expect(label).toHaveClass(cn.TextLabelIdle));
    });

    await step('Typing should keep label active', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'Hello World');
      await expect(input).toHaveValue('Hello World');
      await expect(label).toHaveClass(cn.TextLabelActive);
    });

    await step('Blurring with value should keep label active', async () => {
      await userEvent.tab();
      await expect(label).toHaveClass(cn.TextLabelActive);
    });

    await step('Autofill cancel with value should keep label active', async () => {
      fireEvent.animationStart(input, { animationName: inputCn['autofill-cancel'] });
      await waitFor(() => expect(label).toHaveClass(cn.TextLabelActive));
    });
  },
};
