import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlInput } from '@controls/control-input';

const meta = {
  title: 'Controls/ControlInput',
  component: ControlInput,
  args: {
    id: 'input',
    value: 'Max Mustermann',
    type: 'text',
    dateMask: false,
    disabled: false,
    className: '',
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <ControlInput
        {...args}
        value={value}
        onChange={(value, id, source) => {
          setValue(value);
          args.onChange(value, id, source);
        }}
      />
    );
  },
} satisfies Meta<typeof ControlInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DateMask: Story = {
  args: {
    value: '12/12/2026',
    dateMask: true,
  },
};
