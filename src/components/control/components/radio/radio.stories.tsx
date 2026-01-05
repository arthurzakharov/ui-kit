import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { fn } from 'storybook/test';
import { Radio } from './radio.component';

const meta = {
  title: 'Control/Radio',
  component: Radio,
  render: (args) => {
    const [value, setValue] = useState(args.value);

    useEffect(() => setValue(args.value), [args.value]);

    return (
      <Radio
        {...args}
        value={value}
        onChange={(value, id) => {
          setValue(value);
          args.onChange(value, id);
        }}
      />
    );
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    state: 'idle',
    orientation: 'horizontal',
    choices: [
      {
        label: 'Male',
        value: 'v1',
      },
      {
        label: 'Female',
        value: 'v2',
      },
      {
        label: 'Doverse',
        value: 'v3',
      },
    ],
    id: 'gender',
    disabled: false,
    value: '',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export const Vertical: Story = {
  args: {
    state: 'idle',
    orientation: 'vertical',
    choices: [
      {
        label: 'Male',
        value: 'v1',
      },
      {
        label: 'Female',
        value: 'v2',
      },
      {
        label: 'Doverse',
        value: 'v3',
      },
    ],
    id: 'gender',
    disabled: false,
    value: '',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};
