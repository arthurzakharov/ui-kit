import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlLabel } from '@controls/control-label';
import { ControlLabelPositionArgType, StateArgType } from '@story/arg-types';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Controls/ControlLabel',
  component: ControlLabel,
  args: {
    position: 'idle',
    state: 'idle',
  },
  argTypes: {
    position: ControlLabelPositionArgType({ defaultValue: 'idle' }),
    state: StateArgType({ defaultValue: 'idle' }),
  },
  render: (args) => <ControlLabel {...args}>Control Label</ControlLabel>,
} satisfies Meta<typeof ControlLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'ControlLabel',
  args: {
    position: 'idle',
  },
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'color-grey-950',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByTestId(String(args['data-testid']));

    await step('Then the label has the custom test id', async () => {
      await expect(label).toBeInTheDocument();
    });

    await step('Then the label has the custom class name', async () => {
      await expect(label).toHaveClass(String(args.className));
    });
  },
};
