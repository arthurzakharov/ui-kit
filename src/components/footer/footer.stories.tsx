import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Footer } from '@components/footer/footer.component';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  args: {
    name: 'rightmart',
    links: [
      { text: 'Datenschutz', onClick: fn() },
      { text: 'Impressum', onClick: fn() },
    ],
  },
  argTypes: {
    name: { control: 'text', description: 'The name to display in the copyright notice.' },
    links: { control: false, description: 'The links to display in the footer.' },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Footer',
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByTestId('footer-button');
    const year = new Date().getFullYear();

    await step('Then the footer component displays the correct content', async () => {
      await expect(canvas.getByTestId('footer-copyright')).toHaveTextContent(`© ${year} ${args.name}`);
      await expect(buttons).toHaveLength(args.links.length);
    });

    await step('Then the footer component buttons are clickable', async () => {
      for (const button of buttons) {
        await userEvent.click(button);
      }
      for (const link of args.links) {
        await expect(link.onClick).toHaveBeenCalled();
      }
    });
  },
};

export const WithBaseBehavior: Story = {
  args: {
    className: 'color-grey-950',
    'data-testid': 'custom-test-id',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const footer = canvas.getByTestId('custom-test-id');

    await step('Then the footer component has the custom test id', async () => {
      await expect(footer).toBeInTheDocument();
    });

    await step('Then the footer component has the custom class name', async () => {
      await expect(footer).toHaveClass(String(args.className));
    });
  },
};
