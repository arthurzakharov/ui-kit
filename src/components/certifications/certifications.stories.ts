import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Certifications as Component } from './certifications';

const meta = {
  title: 'Certifications',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Certifications: Story = {
  play: async ({ canvas }) => {
    const icons = canvas.getByTestId('certifications');
    await expect(icons.children).toHaveLength(3);
    await expect(icons.children[0]).toHaveAttribute('data-testid', 'free-icon');
    await expect(icons.children[1]).toHaveAttribute('data-testid', 'gdpr-icon');
    await expect(icons.children[2]).toHaveAttribute('data-testid', 'ssl-icon');
  },
};
