import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Info } from '../info/info.component';
import { User } from '../user/user.component';
import { DataBoard } from './data-board.component';

const meta = {
  title: 'Components/Sidebar/DataBoard',
  component: DataBoard,
  tags: ['autodocs'],
  args: {
    info: (
      <Info
        data={[
          ['Key One', 'Some information'],
          ['Key Two', 'Some other information'],
        ]}
      />
    ),
    user: (
      <User
        title="Ihre Angaben"
        button="ändern"
        data={['Tester Testman', 'Blaustraße 7, 01061 Dresden']}
        onClick={() => fn()}
      />
    ),
  },
} satisfies Meta<typeof DataBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithUserInfo: Story = {
  args: {
    isUserOpen: true,
  },
};

export const WithoutUserInfo: Story = {
  args: {
    isUserOpen: false,
  },
};
