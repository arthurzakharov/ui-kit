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
  argTypes: {
    type: { control: 'select', options: ['radio', 'checkbox'] },
    state: { control: 'select', options: ['idle', 'error', 'success'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
  },
} satisfies Meta<typeof ControlChoice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
