import type { Meta, StoryObj } from '@storybook/react-vite';
import { InfoPanel } from '../../main';

const meta = {
  title: 'Components/InfoPanel',
  component: InfoPanel,
  tags: ['autodocs'],
} satisfies Meta<typeof InfoPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ListOfTwo: Story = {
  args: {
    data: [
      ['Key One', 'Some information'],
      ['Key Two', 'Some other information'],
    ],
  },
};

export const ListOfFour: Story = {
  args: {
    data: [
      ['Key One', 'Some information'],
      ['Key Two', 'Some other information'],
      ['Key Three', 'Some information'],
      ['Key Four', 'Some other information'],
    ],
  },
};
