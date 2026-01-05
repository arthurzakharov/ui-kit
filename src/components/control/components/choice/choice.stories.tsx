import type { Meta, StoryObj } from '@storybook/react-vite';
import { Choice } from './choice.component';

const meta = {
  title: 'Control/Choice',
  component: Choice,
} satisfies Meta<typeof Choice>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Radio: Story = {
  args: {
    checked: false,
    focused: false,
    hovered: false,
    disabled: false,
    state: 'idle',
    type: 'radio',
  },
};

export const Checkbox: Story = {
  args: {
    checked: false,
    focused: false,
    hovered: false,
    disabled: false,
    state: 'idle',
    type: 'checkbox',
  },
};
