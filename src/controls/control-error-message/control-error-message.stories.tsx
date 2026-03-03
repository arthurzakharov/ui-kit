import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ControlErrorMessage } from '@controls/control-error-message';
import cn from '@controls/control-error-message/control-error-message.module.css';

const meta = {
  title: 'Controls/ControlErrorMessage',
  component: ControlErrorMessage,
  render: (args) => <ControlErrorMessage {...args}>This field is required</ControlErrorMessage>,
} satisfies Meta<typeof ControlErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'ControlErrorMessage',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const errorMessage = canvas.getByTestId('control-error-message');

    await step('ControlErrorMessage is rendered with correct content and class', async () => {
      await expect(errorMessage).toBeInTheDocument();
      await expect(errorMessage).toHaveTextContent('This field is required');
      await expect(errorMessage).toHaveClass(cn.ControlErrorMessage);
    });
  },
};

export const WithBaseBehavior: Story = {
  args: {
    'data-testid': 'custom-test-id',
    className: 'custom-class-name',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const errorMessage = canvas.getByTestId(String(args['data-testid']));

    await step('Base interface is implemented correctly', async () => {
      await expect(errorMessage).toHaveClass(String(args.className));
    });
  },
};
