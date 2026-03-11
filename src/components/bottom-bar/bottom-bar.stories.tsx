import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { BottomBar } from '@components/bottom-bar/bottom-bar.component';

const meta = {
  title: 'Components/BottomBar',
  component: BottomBar,
  args: {
    button: {
      text: 'Weiter',
      onClick: fn(),
      loading: false,
      disabled: false,
    },
    info: {
      topLeft: 'Monatliche Rate',
      topRight: '39,99 €',
      bottomLeft: 'Laufzeit',
      bottomRight: '24 Monate',
    },
    message: '',
    staticFrom: 768,
  },
} satisfies Meta<typeof BottomBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutMessage: Story = {
  name: 'BottomBar',
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Then the info values are rendered', async () => {
      await expect(canvas.getByText(String(args.info.topLeft))).toBeInTheDocument();
      await expect(canvas.getByText(String(args.info.topRight))).toBeInTheDocument();
      await expect(canvas.getByText(String(args.info.bottomLeft))).toBeInTheDocument();
      await expect(canvas.getByText(String(args.info.bottomRight))).toBeInTheDocument();
    });

    await step('Then the button is rendered and clickable', async () => {
      const button = canvas.getByRole('button', { name: args.button.text });
      await userEvent.click(button);
      await expect(args.button.onClick).toHaveBeenCalled();
    });
  },
};

export const WithMessage: Story = {
  args: {
    message: 'Sie können den Vorgang jederzeit abbrechen.',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Then the optional message is rendered above the button', async () => {
      await expect(canvas.getByText(String(args.message))).toBeInTheDocument();
    });
  },
};

export const WithBaseBehavior: Story = {
  args: {
    'data-testid': 'custom-test-id',
    className: 'custom-class-name',
  },
  play: async ({ args, canvasElement, step }) => {
    await step('Base interface is implemented correctly', async () => {
      await expect(within(canvasElement).getByTestId(String(args['data-testid']))).toBeInTheDocument();
      await expect(within(canvasElement).getByTestId(String(args['data-testid']))).toHaveClass(String(args.className));
    });
  },
};
