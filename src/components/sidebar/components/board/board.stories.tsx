import type { Meta, StoryObj } from '@storybook/react-vite';
import { Board } from '@components/sidebar/components/board/board.component';

const meta = {
  title: 'Components/Sidebar/Board',
  component: Board,
  tags: ['autodocs'],
  render: (args) => (
    <Board {...args}>
      <div style={{ height: 450, background: 'var(--rm-ui-grey-200)' }} />
    </Board>
  ),
} satisfies Meta<typeof Board>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Board',
};
