import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';
import { CardText } from '@controls/card-text/card-text.component';

const meta = {
  title: 'Controls/Interactives/CardText',
  component: CardText,
  args: {
    // Interactive props
    id: 'card-text',
    value: 'a',
    disabled: false,
    state: 'idle',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    // CardText props
    choices: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
      { label: 'Option C (With exta long text)', value: 'c' },
    ],
    iconSize: 'md',
    textSize: 'body',
    // Base props
    className: '',
    'data-testid': '',
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <CardText
        {...args}
        value={value}
        onChange={(v, i, s) => {
          setValue(v);
          args.onChange(v, i, s);
        }}
      />
    );
  },
} satisfies Meta<typeof CardText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'CardText',
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