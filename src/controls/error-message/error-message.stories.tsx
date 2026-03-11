import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ErrorMessage } from '@controls/error-message/error-message.component';
import cn from '@controls/error-message/error-message.module.css';

const meta = {
  title: 'Controls/Primitives/ErrorMessage',
  component: ErrorMessage,
  args: {
    text: 'This <u>field</u> is required &trade;.',
    // Base props
    className: '',
    'data-testid': '',
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'ErrorMessage',
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const errorMessage = canvas.getByTestId('error-message');

    await step('ErrorMessage is rendered with correct content and class', async () => {
      await expect(errorMessage).toBeInTheDocument();
      await expect(errorMessage).toContainHTML(args.text);
      await expect(errorMessage).toHaveClass(cn.ErrorMessage);
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
