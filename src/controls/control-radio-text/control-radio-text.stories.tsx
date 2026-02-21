import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlRadioText } from '@controls/control-radio-text';

const meta = {
  title: 'Controls/ControlRadioText',
  component: ControlRadioText,
  tags: ['autodocs'],
  args: {
    size: 'lg',
    checked: false,
    oneLine: false,
    color: 'primary',
    className: '',
    children: 'Radio text',
  },
} satisfies Meta<typeof ControlRadioText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
