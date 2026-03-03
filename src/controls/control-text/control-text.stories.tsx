import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlText } from '@controls/control-text';
import { fn } from 'storybook/test';
import { useState } from 'react';

const meta = {
  title: 'Controls/ControlText',
  component: ControlText,
  args: {
    id: 'control-text',
    label: 'Vorname',
    value: '',
    state: 'idle',
    placeholder: 'Bitte eingeben',
    className: '',
    onChange: fn(),
    onBlur: fn(),
    onFocus: fn(),
  },
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['idle', 'error', 'success'],
    },
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <ControlText
        {...args}
        value={value}
        onChange={(value, id, source) => {
          setValue(value);
          args.onChange(value, id, source);
        }}
      />
    );
  },
} satisfies Meta<typeof ControlText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    label: 'Vorname',
    placeholder: 'Bitte geben Sie Ihren Vornamen ein',
    masked: false,
  },
};

export const Date: Story = {
  args: {
    label: 'Geburtsdatum',
    placeholder: 'Bitte geben Sie Ihr Geburtsdatum ein',
    masked: true,
    mask: 'TT/MM/JJJJ',
    value: '',
  },
};

export const WithError: Story = {
  args: {
    state: 'error',
    message: 'Pflichtfeld',
  },
};
