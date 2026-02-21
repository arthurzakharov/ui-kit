import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlChoice } from '@controls/control-choice';

const meta = {
  title: 'Controls/ControlChoice',
  component: ControlChoice,
  tags: ['autodocs'],
  args: {
    type: 'radio',
    checked: false,
    state: 'idle',
    size: 'md',
    className: '',
  },
} satisfies Meta<typeof ControlChoice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
