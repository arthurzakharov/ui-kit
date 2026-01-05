import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ChoiceValue } from '../../types';
import { useEffect, useState } from 'react';
import { fn } from 'storybook/test';
import { CardImage } from './card-image.component';

const meta = {
  title: 'Control/CardImage',
  component: CardImage,
  render: (args) => {
    const [value, setValue] = useState<ChoiceValue>(args.value);

    useEffect(() => setValue(args.value), [args.value]);

    return (
      <div style={{ width: 500 }}>
        <CardImage
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
} satisfies Meta<typeof CardImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Radio: Story = {
  args: {
    sprite: './card-sprite.svg',
    state: 'idle',
    choices: [
      {
        label: 'Geschwindig­keitsverstoß',
        value: 'v1',
      },
      {
        label: 'Rotlichtverstoß',
        value: 'v2',
      },
      {
        label: 'Abstandsverstoß',
        value: 'v3',
      },
      {
        label: 'Handyverstoß',
        value: 'v4',
      },
      {
        label: 'Alkoholverstoß',
        value: 'v5',
      },
      {
        label: 'Park- / Halteverstoß',
        value: 'v6',
      },
      {
        label: 'Anderer Tatvorwurf',
        value: 'v7',
      },
    ],
    id: 'firstName',
    disabled: false,
    value: '',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export const Checkbox: Story = {
  args: {
    sprite: './card-sprite.svg',
    state: 'idle',
    choices: [
      {
        label: 'Geschwindig­keitsverstoß',
        value: 'v1',
      },
      {
        label: 'Rotlichtverstoß',
        value: 'v2',
      },
      {
        label: 'Abstandsverstoß',
        value: 'v3',
      },
      {
        label: 'Handyverstoß',
        value: 'v4',
      },
      {
        label: 'Alkoholverstoß',
        value: 'v5',
      },
      {
        label: 'Park- / Halteverstoß',
        value: 'v6',
      },
      {
        label: 'Anderer Tatvorwurf',
        value: 'v7',
      },
    ],
    id: 'firstName',
    disabled: false,
    value: [],
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};
