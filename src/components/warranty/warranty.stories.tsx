import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Warranty } from '@components/warranty/warranty.component';

const meta = {
  title: 'Components/Warranty',
  component: Warranty,
  args: {
    title: '2 Jahre Garantie',
    text: 'Kostenloser Austausch innerhalb von <u>24 Monaten</u>.<br>Keine Fragen gestellt.',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the warranty badge. Can include `HTML`.',
    },
    text: {
      control: 'text',
      description: 'The descriptive text of the warranty badge. Can include `HTML`.',
    },
  },
} satisfies Meta<typeof Warranty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Warranty',
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByTestId('warranty-title');
    const text = canvas.getByTestId('warranty-text');
    const icon = canvas.getByTestId('warranty-icon');

    await step('Then the warranty component is rendered with the correct title, text, and icon', async () => {
      await expect(title).toContainHTML(String(args.title));
      await expect(text).toContainHTML(String(args.text));
      await expect(icon).toBeInTheDocument();
    });
  },
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'bg-color-grey-300',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const warranty = canvas.getByTestId('custom-test-id');

    await step('Then the warranty has the custom test id', async () => {
      await expect(warranty).toBeInTheDocument();
    });

    await step('Then the warranty has the custom class name', async () => {
      await expect(warranty).toHaveClass(String(args.className));
    });
  },
};
