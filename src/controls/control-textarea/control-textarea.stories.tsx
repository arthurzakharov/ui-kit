import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlTextarea } from '@controls/control-textarea';

const meta = {
  title: 'Controls/ControlTextarea',
  component: ControlTextarea,
  tags: ['autodocs'],
  args: {
    id: 'textarea',
    value: '',
    state: 'idle',
    rows: 5,
    placeholder: 'Kommentar',
    className: '',
    onChange: () => {},
  },
} satisfies Meta<typeof ControlTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
