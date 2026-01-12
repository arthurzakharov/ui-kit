import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { User } from './user.component';

const meta = {
  title: 'Components/Sidebar/User',
  component: User,
  tags: ['autodocs'],
} satisfies Meta<typeof User>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'User',
  args: {
    title: 'Ihre Angaben',
    button: 'ändern',
    data: ['Tester Testman', 'Blaustraße 7, 01061 Dresden'],
    onClick: fn(),
  },
};
