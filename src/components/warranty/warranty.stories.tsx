import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Warranty } from '@components/warranty/warranty.component';

const meta = {
  title: 'Warranty',
  component: Warranty,
  args: {
    title: '2 Jahre Garantie',
    text: 'Kostenloser Austausch innerhalb von 24 Monaten.<br>Keine Fragen gestellt.',
    className: '',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Warranty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Warranty',
  play: async ({ args, canvasElement }) => {
    const title = within(canvasElement).getByTestId('warranty-title');
    const text = within(canvasElement).getByTestId('warranty-text');
    const icon = within(canvasElement).getByTestId('warranty-icon');

    await expect(title).toContainHTML(String(args.title));
    await expect(text).toContainHTML(String(args.text));
    await expect(icon).toBeInTheDocument();
  },
};

export const WithAdditionalClassName: Story = {
  args: {
    className: 'bg-color-grey-300',
  },
  play: async ({ args, canvasElement }) => {
    const warranty = within(canvasElement).getByTestId('warranty');

    await expect(warranty).toHaveClass(String(args.className));
  },
};
