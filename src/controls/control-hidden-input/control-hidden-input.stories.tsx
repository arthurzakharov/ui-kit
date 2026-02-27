import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlHiddenInput } from '@controls/control-hidden-input';

const meta = {
  title: 'Controls/ControlHiddenInput',
  component: ControlHiddenInput,
  args: {
    id: 'hidden-input',
    name: 'hidden-input',
    value: 'value-a',
    type: 'radio',
    checked: false,
    className: '',
    onChange: () => {},
  },
} satisfies Meta<typeof ControlHiddenInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
