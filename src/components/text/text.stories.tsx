import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Text } from '@components/text/text.component';

const meta = {
  title: 'Components/Text',
  component: Text,
  args: {
    tag: 'p',
    align: 'left',
    weight: 'regular',
    size: 'body',
    color: 'text-primary',
    lined: false,
    preset: undefined,
  },
  render: (args) => <Text {...args}>Sample text content</Text>,
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Text',
};

export const WithPreset: Story = {
  args: {
    preset: 'page-title',
    children: 'Title rendered from preset',
  },
};

export const WithBaseBehavior: Story = {
  args: {
    children: 'Text with custom base props',
    className: 'custom-class-name',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByTestId(String(args['data-testid']));

    await step('Then the text has the custom test id', async () => {
      await expect(text).toBeInTheDocument();
    });

    await step('Then the text has the custom class name', async () => {
      await expect(text).toHaveClass(String(args.className));
    });
  },
};
