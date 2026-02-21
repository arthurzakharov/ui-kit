import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlText } from '@controls/control-text';

const meta = {
  title: 'Controls/ControlText',
  component: ControlText,
  tags: ['autodocs'],
  args: {
    id: 'control-text',
    label: 'Vorname',
    value: '',
    state: 'idle',
    placeholder: 'Bitte eingeben',
    className: '',
    onChange: () => {},
  },
} satisfies Meta<typeof ControlText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    state: 'error',
    message: 'Pflichtfeld',
  },
};
