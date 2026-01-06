import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Certifications as Component } from '@/components/certifications';

const meta = {
  title: 'Components/Certifications',
  component: Component,
  args: {
    icons: ['free', 'gdpr', 'ssl'],
  },
  argTypes: {
    icons: {
      control: 'object',
      table: {
        type: { summary: 'CertificationIcon[]' },
      },
      description: 'Array that define order of icons to show',
    },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultOrder: Story = {
  args: {
    icons: undefined,
  },
  argTypes: {
    icons: {
      control: false,
    },
  },
  play: async ({ canvas }) => {
    const icons = canvas.getAllByTestId('icon');
    await expect(icons).toHaveLength(3);
    await expect(icons[0]).toHaveAttribute('data-icon', 'free');
    await expect(icons[1]).toHaveAttribute('data-icon', 'gdpr');
    await expect(icons[2]).toHaveAttribute('data-icon', 'ssl');
  },
};

export const CustomOrder: Story = {
  args: {
    icons: ['free', 'ssl'],
  },
  play: async ({ canvas }) => {
    const icons = canvas.getAllByTestId('icon');
    await expect(icons).toHaveLength(2);
    await expect(icons[0]).toHaveAttribute('data-icon', 'free');
    await expect(icons[1]).toHaveAttribute('data-icon', 'ssl');
  },
};
