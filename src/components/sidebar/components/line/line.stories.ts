import type { Meta, StoryObj } from '@storybook/react-vite';
import { Line } from './line.component';

const meta = {
  title: 'Components/Sidebar/Line',
  component: Line,
  tags: ['autodocs'],
} satisfies Meta<typeof Line>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Line',
};
