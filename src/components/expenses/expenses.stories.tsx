import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Expenses } from '@components/expenses/expenses.component';

const meta = {
  title: 'Components/Expenses',
  component: Expenses,
  args: {
    title: 'Expenses',
    content:
      'Total spending this month includes all purchases, subscriptions, utilities, and other expenses. Review your spending patterns and adjust your budget accordingly to meet your financial goals and maintain healthy finances.',
    amountTitle: 'Amount:',
    amountNumber: ['€', '1,500.00'],
    subContent: 'Last updated today',
  },
  argTypes: {
    title: { control: 'text', description: 'The title.' },
    content: { control: 'text', description: 'The content.' },
    subContent: { control: 'text', description: 'Optional sub-content.' },
    amountTitle: { control: 'text', description: 'The amount label.' },
    amountNumber: { control: false, description: 'Amount as [**left-part**, **right-part**].' },
  },
} satisfies Meta<typeof Expenses>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Expenses',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Then the expenses component displays the title', async () => {
      await expect(canvas.getByTestId('expenses-title')).toBeInTheDocument();
    });

    await step('Then the expenses component displays the content', async () => {
      await expect(canvas.getByTestId('expenses-content')).toBeInTheDocument();
    });

    await step('Then the expenses component displays the amount', async () => {
      await expect(canvas.getByTestId('expenses-amount')).toBeInTheDocument();
    });

    await step('Then the expenses component displays the sub-content', async () => {
      await expect(canvas.getByTestId('expenses-sub-content')).toBeInTheDocument();
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
    const expenses = canvas.getByTestId('custom-test-id');

    await step('Then the expenses component has the custom test id', async () => {
      await expect(expenses).toBeInTheDocument();
    });

    await step('Then the expenses component has the custom class name', async () => {
      await expect(expenses).toHaveClass(String(args.className));
    });
  },
};
