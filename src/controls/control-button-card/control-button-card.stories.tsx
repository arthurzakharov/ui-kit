import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlButtonCard } from '@controls/control-button-card';

const meta = {
  title: 'Controls/ControlButtonCard',
  component: ControlButtonCard,
  args: {
    active: false,
    disabled: false,
    iconPosition: 'top',
    className: '',
    children: 'Option A',
    onClick: () => {},
  },
} satisfies Meta<typeof ControlButtonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
