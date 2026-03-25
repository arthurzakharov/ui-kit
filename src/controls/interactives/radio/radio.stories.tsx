import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';
import { Radio } from '@controls/interactives';

const meta = {
  title: 'Controls/Interactives/Radio',
  component: Radio,
  args: {
    // Interactive props
    id: 'options-radio',
    value: 'a',
    disabled: false,
    state: 'idle',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    // Radio props
    choices: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
      { label: 'Option C', value: 'c' },
    ],
    orientation: 'horizontal',
    iconSize: 'md',
    textSize: 'body',
    message: '',
    // Base props
    className: '',
    'data-testid': '',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <Radio
        {...args}
        value={value}
        onChange={(v, i, s) => {
          setValue(v);
          args.onChange(v, i, s);
        }}
      />
    );
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Radio',
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
