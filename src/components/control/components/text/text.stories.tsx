import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { Text } from './text.component';

const meta = {
  title: 'Control/Text',
  component: Text,
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <div style={{ maxWidth: 300 }}>
        <Text
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
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: 'idle',
    label: 'First name',
    type: 'text',
    id: 'firstName',
    value: '',
    disabled: false,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};
