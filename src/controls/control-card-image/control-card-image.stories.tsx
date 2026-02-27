import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlCardImage } from '@controls/control-card-image';

const meta = {
  title: 'Controls/ControlCardImage',
  component: ControlCardImage,
  args: {
    id: 'card-image',
    value: 'a',
    state: 'idle',
    sprite: '',
    className: '',
    choices: [
      { label: 'Option A', value: 'a', icon: '0 0 100 100' },
      { label: 'Option B', value: 'b', icon: '0 0 100 100' },
    ],
    onChange: () => {},
  },
} satisfies Meta<typeof ControlCardImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
