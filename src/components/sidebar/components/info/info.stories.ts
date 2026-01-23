import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info } from '@components/sidebar/components/info/info.component';

const meta = {
  title: 'Components/Sidebar/Info',
  component: Info,
  tags: ['autodocs'],
} satisfies Meta<typeof Info>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Info',
  args: {
    data: [
      ['Key One', 'Some information'],
      ['Key Two', 'Some other information'],
    ],
  },
};
