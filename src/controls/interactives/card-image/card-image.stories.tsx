import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';
import { CardImage } from '@controls/interactives';

const meta = {
  title: 'Controls/Interactives/CardImage',
  component: CardImage,
  args: {
    // Interactive props
    id: 'card-image',
    value: 'a',
    disabled: false,
    state: 'idle',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    // CardImage props
    sprite: '',
    choices: [
      { label: 'Option A', value: 'a', icon: '0 0 100 100' },
      { label: 'Option B', value: 'b', icon: '0 0 100 100' },
      { label: 'Option C (With exta long text)', value: 'c' },
    ],
    iconSize: 'md',
    textSize: 'body-small',
    // Base props
    className: '',
    'data-testid': '',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <CardImage
        {...args}
        value={value}
        onChange={(v, i, s) => {
          setValue(v);
          args.onChange(v, i, s);
        }}
      />
    );
  },
} satisfies Meta<typeof CardImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Checkbox',
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'custom-class-name',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const component = canvas.getByTestId(String(args['data-testid']));

    await step('Component has the custom test id', async () => {
      await expect(component).toBeInTheDocument();
    });

    await step('Component has the custom class name', async () => {
      await expect(component).toHaveClass(String(args.className));
    });
  },
};