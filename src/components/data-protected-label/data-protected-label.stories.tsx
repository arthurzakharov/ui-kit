import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataProtectedLabel } from './data-protected-label.component';

const meta = {
  title: 'Components/DataProtectedLabel',
  component: DataProtectedLabel,
  tags: ['autodocs'],
  args: {
    text: 'Höchste Datensicherheit',
    align: 'center',
  },
} satisfies Meta<typeof DataProtectedLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AlignLeft: Story = {
  args: {
    align: 'left',
  },
};

export const AlignCenter: Story = {
  args: {
    align: 'center',
  },
};

export const AlignRight: Story = {
  args: {
    align: 'right',
  },
};
