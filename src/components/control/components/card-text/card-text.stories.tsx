import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChoiceValue } from '../../types';
import { useEffect, useState } from 'react';
import { fn } from 'storybook/test';
import { CardText } from './card-text.component';

const meta = {
  title: 'Control/CardText',
  component: CardText,
  render: (args) => {
    const [value, setValue] = useState<ChoiceValue>(args.value);

    useEffect(() => setValue(args.value), [args.value]);

    return (
      <div style={{ maxWidth: 400 }}>
        <CardText
          {...args}
          value={value}
          onChange={(value, id) => {
            setValue(value as ChoiceValue);
            args.onChange(value, id);
          }}
        />
      </div>
    );
  },
} satisfies Meta<typeof CardText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Radio: Story = {
  args: {
    state: 'idle',
    choices: [
      {
        label: 'Befristetes Aufenthaltsrecht',
        value: 'v1',
      },
      {
        label: 'Unbefristet Aufenthaltsrecht / Niederlassungserlaubnis',
        value: 'v2',
      },
      {
        label: 'Einbürgerung / deutschen Pass',
        value: 'v3',
      },
      {
        label: 'Familiennachzug',
        value: 'v4',
      },
      {
        label: 'Sonstiges',
        value: 'v5',
      },
    ],
    id: 'familyStatus',
    disabled: false,
    value: '',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export const Checkbox: Story = {
  args: {
    state: 'idle',
    choices: [
      {
        label: 'Befristetes Aufenthaltsrecht',
        value: 'v1',
      },
      {
        label: 'Unbefristet Aufenthaltsrecht / Niederlassungserlaubnis',
        value: 'v2',
      },
      {
        label: 'Einbürgerung / deutschen Pass',
        value: 'v3',
      },
      {
        label: 'Familiennachzug',
        value: 'v4',
      },
      {
        label: 'Sonstiges',
        value: 'v5',
      },
    ],
    id: 'familyStatus',
    disabled: false,
    value: [],
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};
