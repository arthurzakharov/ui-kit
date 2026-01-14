import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { UserPanel } from './user-panel.component';

const meta = {
  title: 'Components/UserPanel',
  component: UserPanel,
  tags: ['autodocs'],
} satisfies Meta<typeof UserPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'User Panel',
  args: {
    title: 'Ihre Angaben',
    button: 'Ändern',
    data: ['Maximilian Mustermann', 'Geb 11/11/1999 in Musterland', 'Haupstr. 123, 12345 Berlin'],
    onClick: fn(),
  },
};
