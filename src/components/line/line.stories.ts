import type { Meta, StoryObj } from '@storybook/react-vite';
import { Line } from '@components/line/line.component';

const meta = {
  title: 'Components/Line',
  component: Line,
  tags: ['autodocs'],
} satisfies Meta<typeof Line>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Line',
};
