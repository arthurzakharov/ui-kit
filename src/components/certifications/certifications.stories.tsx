import type { Meta, StoryObj } from '@storybook/react-vite';
import { Certifications } from '@components/certifications/certifications.component';

const meta = {
  title: 'Components/Certifications',
  component: Certifications,
  tags: ['autodocs'],
} satisfies Meta<typeof Certifications>;

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
