import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlCheckbox } from '@controls/control-checkbox';

const meta = {
  title: 'Controls/ControlCheckbox',
  component: ControlCheckbox,
  tags: ['autodocs'],
  args: {
    id: 'checkbox',
    value: false,
    state: 'idle',
    text: 'body-small',
    className: '',
    children: 'Ich akzeptiere die Bedingungen',
    onChange: () => {},
  },
} satisfies Meta<typeof ControlCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
