import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Certifications } from './certifications.component';

const meta = {
  title: 'Certifications',
  component: Certifications,
  args: {
    icons: ['free', 'gdpr', 'ssl'],
    className: '',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Certifications>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Certifications',
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const argsIcons = args.icons || [];
    const icons = canvas.getAllByTestId('certifications-icon');
    for (const icon of argsIcons) {
      const index = argsIcons.indexOf(icon);
      await expect(icons[index]).toHaveAttribute('data-icon', icon);
    }
  },
};

export const WithAdditionalClassName: Story = {
  args: {
    className: 'color-grey-950',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const certifications = canvas.getByTestId('certifications');
    await expect(certifications).toHaveClass(String(args.className));
  },
};
