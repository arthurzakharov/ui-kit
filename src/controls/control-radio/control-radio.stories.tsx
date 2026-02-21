import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlRadio } from '@controls/control-radio';
import { fn } from 'storybook/test';

const meta = {
  title: 'Controls/ControlRadio',
  component: ControlRadio,
  tags: ['autodocs'],
  args: {
    id: 'options-radio',
    value: 'a',
    choices: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
    ],
    onChange: fn(),
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <ControlRadio
        {...args}
        value={value}
        onChange={(v, i) => {
          setValue(v);
          args.onChange(v, i);
        }}
      />
    );
  },
  argTypes: {
    value: {
      control: 'select',
      options: ['a', 'b'],
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    state: {
      control: 'select',
      options: ['idle', 'error', 'success'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    message: {
      control: 'text',
    },
  },
} satisfies Meta<typeof ControlRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OrientationVertical: Story = {
  args: {
    orientation: 'vertical',
  },
};

export const OrientationHorizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};

export const ErrorState: Story = {
  args: {
    state: 'error',
  },
};

export const ErrorStateWithMessage: Story = {
  args: {
    state: 'error',
    message: 'This field has some error',
  },
};

export const SuccessState: Story = {
  args: {
    state: 'success',
  },
};
