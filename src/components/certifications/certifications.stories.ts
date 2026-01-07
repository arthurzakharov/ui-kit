import type { Meta, StoryObj } from '@storybook/react-vite';
import { Certifications as Component } from '@/components/certifications';

const meta = {
  title: 'Components/Certifications',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icons: undefined,
  },
  argTypes: {
    icons: {
      control: false,
    },
  },
};

export const CustomOrder: Story = {
  args: {
    icons: ['free', 'ssl'],
  },
};
