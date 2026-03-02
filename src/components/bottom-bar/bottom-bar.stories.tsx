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
  argTypes: {
    button: { control: false, description: 'Button configuration.' },
    info: { control: false, description: 'Information fields rendered in two rows.' },
    message: { control: 'text', description: 'Optional helper message above the button.' },
    staticFrom: { control: 'number', description: 'Breakpoint from which the bar becomes static.' },
  },
} satisfies Meta<typeof BottomBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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

export const WithCustomClassName: Story = {
  args: {
    className: 'custom-bottom-bar',
  },
  play: async ({ args, canvasElement, step }) => {
    const root = canvasElement.firstElementChild;

    await step('Then the custom class name is applied to the root element', async () => {
      await expect(root).toBeInTheDocument();
      await expect(root).toHaveClass(String(args.className));
    });
  },
};
