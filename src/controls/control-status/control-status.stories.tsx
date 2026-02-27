import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlStatus } from '@controls/control-status';
import { StateArgType } from '@story/arg-types';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Controls/ControlStatus',
  component: ControlStatus,
  args: {
    state: 'idle',
  },
  argTypes: {
    state: StateArgType({ defaultValue: 'idle' }),
  },
} satisfies Meta<typeof ControlStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'ControlStatus',
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'custom-class-name',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const status = canvas.getByTestId(String(args['data-testid']));

    await step('Then the status has the custom test id', async () => {
      await expect(status).toBeInTheDocument();
    });

    await step('Then the status has the custom class name', async () => {
      await expect(status).toHaveClass(String(args.className));
    });
  },
};
