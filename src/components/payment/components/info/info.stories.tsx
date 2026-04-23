import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { SizeBox } from '@utils/story/size-box';
import { Info } from '@components/payment/components/info/info.component';

const meta = {
  title: 'Payment/Info',
  component: Info,
  args: {
    title: 'WAS WIR BEREITS FÜR SIE ERLEDIGT HABEN',
    list: [
      { type: 'check', text: 'Erfolgsvoraussetzungen validiert' },
      { type: 'check', text: 'Vollmacht erhalten & rechtlich geprüft' },
      { type: 'check', text: 'Mandatsanzeige gestellt — Behörde München, 19.03.2025' },
      { type: 'arrow', text: 'Antrag finalisieren und einreichen — <b>wartet auf Ihre Zahlung</b>' },
    ],
  },
  render: (args) => (
    <SizeBox size={[400]}>
      <Info {...args} />
    </SizeBox>
  ),
} satisfies Meta<typeof Info>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Info',
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'color-grey-950',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByTestId('custom-test-id');

    await step('Then the table has the custom test id', async () => {
      await expect(table).toBeInTheDocument();
    });

    await step('Then the table has the custom class name', async () => {
      await expect(table).toHaveClass(String(args.className));
    });
  },
};
