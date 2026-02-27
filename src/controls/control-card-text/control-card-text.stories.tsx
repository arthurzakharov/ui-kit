import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlCardText } from '@controls/control-card-text';

const meta = {
  title: 'Controls/ControlCardText',
  component: ControlCardText,
  args: {
    id: 'card-text',
    value: 'a',
    state: 'idle',
    className: '',
    choices: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
    ],
    onChange: () => {},
  },
} satisfies Meta<typeof ControlCardText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
