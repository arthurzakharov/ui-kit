import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Status } from '@controls/primitives/status/status.component';
import cn from '@controls/primitives/status/status.module.css';

const meta = {
  title: 'Controls/Primitives/Status',
  component: Status,
  args: {
    state: 'idle',
    // Base props
    className: '',
    'data-testid': '',
  },
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Status',
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const status = canvas.getByTestId('status');

    await step('Status is rendered with correct state and classes', async () => {
      await expect(status).toBeInTheDocument();

      switch (args.state) {
        case 'idle':
          await expect(status).toHaveClass(cn.Idle);
          await expect(status).not.toHaveClass(cn.Success);
          await expect(status).not.toHaveClass(cn.Error);
          break;
        case 'success':
          await expect(status).not.toHaveClass(cn.Idle);
          await expect(status).toHaveClass(cn.Success);
          await expect(status).not.toHaveClass(cn.Error);
          break;
        case 'error':
          await expect(status).not.toHaveClass(cn.Idle);
          await expect(status).not.toHaveClass(cn.Success);
          await expect(status).toHaveClass(cn.Error);
          break;
      }
    });
  },
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
