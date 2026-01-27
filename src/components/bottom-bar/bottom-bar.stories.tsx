import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomBar } from '@components/bottom-bar/bottom-bar.component';
import { fn } from 'storybook/test';

const meta = {
  title: 'Components/BottomBar',
  component: BottomBar,
  tags: ['autodocs'],
} satisfies Meta<typeof BottomBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'BottomBar',
  args: {
    button: {
      text: 'Lorem ipsum dolor sit',
      onClick: fn(),
      loading: false,
      disabled: false,
    },
    info: {
      topLeft: 'Lorem',
      topRight: {
        text: 'Lorem',
        color: 'accent-primary',
      },
      bottomLeft: {
        text: 'Lorem',
      },
      bottomRight: {
        text: 'Lorem',
      },
    },
    message: 'Pulvinar vivamus fringilla lacus nec metus',
    className: '',
    staticFrom: 768,
    visible: true,
  },
};
