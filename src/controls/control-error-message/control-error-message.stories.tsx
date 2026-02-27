import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ControlErrorMessage } from '@controls/control-error-message';

const meta = {
  title: 'Controls/ControlErrorMessage',
  component: ControlErrorMessage,
  render: (args) => <ControlErrorMessage {...args}>This field is required</ControlErrorMessage>,
} satisfies Meta<typeof ControlErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'ControlErrorMessage',
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'color-grey-950',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const errorMessage = canvas.getByTestId(String(args['data-testid']));

    await step('Then the error message component has the custom test id', async () => {
      await expect(errorMessage).toBeInTheDocument();
    });

    await step('Then the error message component has the custom class name', async () => {
      await expect(errorMessage).toHaveClass(String(args.className));
    });
  },
};
