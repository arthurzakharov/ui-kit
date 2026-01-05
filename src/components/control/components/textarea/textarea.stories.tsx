import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { Control } from '../../index';

const meta = {
  title: 'Control/Textarea',
  component: Control.Textarea,
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <div style={{ maxWidth: 300 }}>
        <Control.Textarea
          {...args}
          value={value}
          onChange={(value, id) => {
            setValue(value);
            args.onChange(value, id);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof Control.Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Textarea: Story = {
  args: {
    state: 'idle',
    placeholder: 'Enter info',
    rows: 10,
    id: 'info',
    value: '',
    disabled: false,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};
