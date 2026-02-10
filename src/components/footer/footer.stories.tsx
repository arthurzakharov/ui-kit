import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Footer } from './footer.component';

const meta = {
  title: 'Footer',
  component: Footer,
  args: {
    name: 'rightmart',
    links: [
      { text: 'Datenschutz', onClick: fn() },
      { text: 'Impressum', onClick: fn() },
    ],
    className: '',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Footer',
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const year = new Date().getFullYear();
    await expect(canvas.getByTestId('footer-copyright')).toHaveTextContent(`© ${year} ${args.name}`);
    const buttons = canvas.getAllByTestId('footer-button');
    await expect(buttons).toHaveLength(args.links.length);
    for (const button of buttons) {
      await userEvent.click(button);
    }
    for (const link of args.links) {
      await expect(link.onClick).toHaveBeenCalled();
    }
  },
};

export const WithAdditionalClassName: Story = {
  args: {
    className: 'color-grey-950',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const footer = canvas.getByTestId('footer');
    await expect(footer).toHaveClass(args.className || '');
  },
};
