import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingBlock } from './loading-block.component';

const meta = {
  title: 'Components/LoadingBlock',
  component: LoadingBlock,
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Loading Block',
};
