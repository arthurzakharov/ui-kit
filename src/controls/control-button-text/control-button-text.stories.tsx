import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlButtonText } from '@controls/control-button-text';

const meta = {
  title: 'Controls/ControlButtonText',
  component: ControlButtonText,
  tags: ['autodocs'],
  args: {
    size: 'md',
    color: 'primary',
    weight: 'medium',
    underlined: false,
    disabled: false,
    className: '',
    children: 'Mehr erfahren',
    onClick: () => {},
  },
} satisfies Meta<typeof ControlButtonText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
