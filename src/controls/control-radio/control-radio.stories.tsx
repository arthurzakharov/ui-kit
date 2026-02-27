import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlRadio } from '@controls/control-radio';
import { fn } from 'storybook/test';
import { ControlRadioTextSizeArgType, SizeArgType, StateArgType } from '@story/arg-types';

const meta = {
  title: 'Controls/ControlRadio',
  component: ControlRadio,
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
    state: StateArgType({ defaultValue: 'idle', description: 'State of the control' }),
    iconSize: SizeArgType({ defaultValue: 'md', description: 'Size of the radio icon' }),
    textSize: ControlRadioTextSizeArgType({ defaultValue: 'body', description: 'Size of the radio label text' }),
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
