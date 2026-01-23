import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader } from '@components/loader/loader.component';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  args: {
    size: 32,
    color: 'primary',
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Loader',
};
