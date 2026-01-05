import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { fn } from 'storybook/test';
import { Checkbox } from './checkbox.component';

const meta = {
  title: 'Control/Checkbox',
  component: Checkbox,
  render: (args) => {
    const [value, setValue] = useState(args.value);

    useEffect(() => setValue(args.value), [args.value]);

    return (
      <Checkbox
        {...args}
        value={value}
        onChange={(value, id) => {
          setValue(value);
          args.onChange(value, id);
        }}
      >
        Hiermit beauftrage und bevollmächtige ich die rightmart Rechtsanwaltsgesellschaft mbH, Clara-Jaschke-Straße 1,
        28199 Bremen, mit der Vertretung meiner rechtlichen interessen und erteile hierzu der Kanzlei Vollmacht.
      </Checkbox>
    );
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    state: 'idle',
    id: 'agreement',
    disabled: false,
    value: false,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};
